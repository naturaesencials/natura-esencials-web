import { NextRequest, NextResponse } from 'next/server';

const SHOP = process.env.JUDGEME_SHOP_DOMAIN ?? 'bdchtj-1p.myshopify.com';
const TOKEN = process.env.JUDGEME_API_TOKEN ?? '';

export interface Review {
  id: number;
  rating: number;
  title: string;
  body: string;
  reviewer: { name: string };
  published_at: string;
  product_handle: string;
  product_title: string;
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

  if (!TOKEN) {
    // Return empty gracefully — will show "no reviews yet" UI
    return NextResponse.json({ reviews: [], total: 0, current_page: 1 });
  }

  const url = new URL('https://judge.me/api/v1/reviews');
  url.searchParams.set('api_token', TOKEN);
  url.searchParams.set('shop_domain', SHOP);
  url.searchParams.set('page', page);
  url.searchParams.set('per_page', perPage);
  if (handle) url.searchParams.set('handle', handle);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 300 }, // cache 5 min
    });
    if (!res.ok) {
      return NextResponse.json({ reviews: [], total: 0, current_page: 1 });
    }
    const data: JudgeMeResponse = await res.json();
    return NextResponse.json({
      reviews: data.reviews ?? [],
      total: data.total ?? 0,
      current_page: data.current_page ?? 1,
    });
  } catch {
    return NextResponse.json({ reviews: [], total: 0, current_page: 1 });
  }
}
