import { NextRequest, NextResponse } from 'next/server';

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
}

interface JudgeMeResponse {
  reviews: Review[];
  current_page: number;
  total: number;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get('handle') ?? '';
  const page = searchParams.get('page') ?? '1';
  const perPage = searchParams.get('per_page') ?? '10';
  const regionParam = (searchParams.get('region') ?? 'eu').toLowerCase();
  const region: Region = regionParam === 'uk' ? 'uk' : 'eu';

  const { shop, token } = getConfig(region);

  if (!token) {
    // Return empty gracefully — will show "no reviews yet" UI
    return NextResponse.json({ reviews: [], total: 0, current_page: 1 });
  }

  const url = new URL('https://judge.me/api/v1/reviews');
  url.searchParams.set('api_token', token);
  url.searchParams.set('shop_domain', shop);
  url.searchParams.set('page', page);
  url.searchParams.set('per_page', perPage);
  if (handle) url.searchParams.set('handle', handle);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      return NextResponse.json({ reviews: [], total: 0, current_page: 1 });
    }
    const data: JudgeMeResponse = await res.json();
    let reviews: Review[] = data.reviews ?? [];

    // Si se pidió un producto concreto, filtrar estrictamente por handle.
    // Las "shop reviews" (product_handle: "judgeme-shop-reviews") solo
    // aparecen en la homepage (sin handle), nunca en páginas de producto.
    if (handle) {
      reviews = reviews.filter((r) => r.product_handle === handle);
    }

    return NextResponse.json({
      reviews,
      total: reviews.length,
      current_page: data.current_page ?? 1,
    });
  } catch {
    return NextResponse.json({ reviews: [], total: 0, current_page: 1 });
  }
}
