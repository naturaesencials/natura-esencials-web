import { NextRequest, NextResponse } from 'next/server';
import { translateReviewField } from '@/lib/reviews/translate';

type Region = 'eu' | 'uk';

interface RegionConfig {
  shop: string;
  token: string;
}

function getConfig(region: Region): RegionConfig {
  if (region === 'uk') {
    return {
      shop:  process.env.JUDGEME_UK_SHOP_DOMAIN ?? 'ughbg0-11.myshopify.com',
      token: process.env.JUDGEME_UK_API_TOKEN ?? '',
    };
  }
  // EU (default)
  return {
    shop:  process.env.JUDGEME_SHOP_DOMAIN ?? 'bdchtj-1p.myshopify.com',
    token: process.env.JUDGEME_API_TOKEN ?? '',
  };
}

export interface Review {
  id: number;
  rating: number;
  title: string | null;
  body: string | null;
  reviewer: { name: string };
  published_at?: string;
  created_at: string;
  updated_at: string;
  product_handle: string;
  product_title: string;
  verified: string;
  pictures: Array<{ urls: { original: string } }>;
  /** True if title/body have been translated to the request locale. */
  translated?: boolean;
}

interface JudgeMeResponse {
  reviews: Review[];
  current_page: number;
  total: number;
}

/**
 * Fetch reviews from a single Judge.me account (one region).
 * Returns up to 100 reviews for the given handle.
 *
 * Cross-store syndication via Judge.me's group feature requires identical SKUs
 * across stores. Since our EU/UK Shopify products have different SKUs, syndication
 * doesn't work natively. We bypass it by querying each region's Judge.me directly
 * and merging on our side (see GET handler).
 */
async function fetchFromJudgeMe(region: Region, handle: string): Promise<Review[]> {
  const { shop, token } = getConfig(region);
  if (!token) return [];

  const url = new URL('https://judge.me/api/v1/reviews');
  url.searchParams.set('api_token', token);
  url.searchParams.set('shop_domain', shop);
  url.searchParams.set('per_page', '100');
  if (handle) url.searchParams.set('handle', handle);

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data: JudgeMeResponse = await res.json();
    let reviews = data.reviews ?? [];
    // Filter strictly by handle ONLY when a handle was specified.
    // Without handle, return all (used for shop-level reviews on homepage).
    if (handle) {
      reviews = reviews.filter((r) => r.product_handle === handle);
    }
    return reviews;
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get('handle') ?? '';
  const crossHandle = searchParams.get('cross_handle') ?? '';
  const page = searchParams.get('page') ?? '1';
  const perPage = searchParams.get('per_page') ?? '10';
  const regionParam = (searchParams.get('region') ?? 'eu').toLowerCase();
  const region: Region = regionParam === 'uk' ? 'uk' : 'eu';
  const otherRegion: Region = region === 'uk' ? 'eu' : 'uk';

  // Parallel fetch: primary region + cross region.
  //
  // Cross-region behavior:
  //   - PRODUCT pages (handle + cross_handle):   primary region with handle, other region with cross_handle
  //   - HOMEPAGE / shop-level (no handle):       BOTH regions without handle (returns shop reviews from both)
  //   - Single region (handle only):             primary region only
  //
  // This bypasses Judge.me cross-store syndication (which only works at widget level, not API)
  // and ensures reviews accumulated across regions are visible everywhere on the site.
  const [primary, cross] = await Promise.all([
    fetchFromJudgeMe(region, handle),
    crossHandle
      ? fetchFromJudgeMe(otherRegion, crossHandle)
      : !handle
        ? fetchFromJudgeMe(otherRegion, '')      // homepage: also fetch other region's shop reviews
        : Promise.resolve([] as Review[]),
  ]);

  // Merge, dedupe by review ID (defensive — same review shouldn't appear in both),
  // sort newest first by created_at.
  const merged = [...primary, ...cross];
  const deduped = Array.from(new Map(merged.map((r) => [r.id, r])).values());
  deduped.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // Server-side pagination over the merged result set.
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(perPage, 10) || 10));
  const start = (pageNum - 1) * limit;
  const paginatedReviews = deduped.slice(start, start + limit);

  // Translate each paginated review's title + body to the requested locale.
  // Each translation is cached 7 days, so repeated requests are nearly free.
  // If ANTHROPIC_API_KEY is missing or the call fails, original text is returned.
  const locale = (searchParams.get('locale') ?? 'es').toLowerCase();
  const reviews = await Promise.all(
    paginatedReviews.map(async (r) => {
      const [translatedTitle, translatedBody] = await Promise.all([
        r.title ? translateReviewField(r.id, r.title, locale, r.updated_at) : Promise.resolve(r.title),
        r.body  ? translateReviewField(r.id, r.body,  locale, r.updated_at) : Promise.resolve(r.body),
      ]);
      const wasTranslated =
        (translatedTitle !== null && translatedTitle !== r.title) ||
        (translatedBody  !== null && translatedBody  !== r.body);
      return {
        ...r,
        title: translatedTitle,
        body:  translatedBody,
        translated: wasTranslated || undefined,
      };
    }),
  );

  return NextResponse.json({
    reviews,
    total: deduped.length,
    current_page: pageNum,
  });
}
