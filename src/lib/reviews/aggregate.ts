import { cache } from 'react';

/**
 * Rating agregado por producto para Schema.org AggregateRating.
 *
 * IMPORTANTE (política de Google): solo se emite AggregateRating cuando existen
 * reseñas REALES de producto en Judge.me. Si un producto no tiene reseñas, este
 * helper devuelve null y la página NO emite ningún rating. Nunca se inventan
 * valoraciones — hacerlo es marcado spam y penalizable.
 *
 * Los datos se leen a nivel de tienda (una sola llamada por región, cacheada 1 h)
 * y se agrupan por product_handle, excluyendo las reseñas de tienda
 * ("judgeme-shop-reviews"), que no son de producto.
 */

type Region = 'eu' | 'uk';

interface JudgeMeReview {
  id: number;
  rating: number;
  product_handle: string;
}

export interface ProductRating {
  ratingValue: number; // media, 1 decimal
  ratingCount: number; // nº de reseñas de producto
}

const SHOP_LEVEL_HANDLE = 'judgeme-shop-reviews';

function getConfig(region: Region): { shop: string; token: string } {
  if (region === 'uk') {
    return {
      shop: process.env.JUDGEME_UK_SHOP_DOMAIN ?? 'ughbg0-11.myshopify.com',
      token: process.env.JUDGEME_UK_API_TOKEN ?? '',
    };
  }
  return {
    shop: process.env.JUDGEME_SHOP_DOMAIN ?? 'bdchtj-1p.myshopify.com',
    token: process.env.JUDGEME_API_TOKEN ?? '',
  };
}

/**
 * Devuelve un mapa handle → { ratingValue, ratingCount } para toda la tienda.
 * Cacheado por región: durante el build/ISR solo se hace una llamada HTTP por región.
 */
export const getRatingsMap = cache(async (region: Region): Promise<Map<string, ProductRating>> => {
  const { shop, token } = getConfig(region);
  const out = new Map<string, ProductRating>();
  if (!token) return out; // sin token → sin datos (seguro, no rompe el build)

  const acc = new Map<string, { sum: number; count: number }>();
  const perPage = 100;
  const maxPages = 5; // suficiente para 500 reseñas; se amplía si hiciera falta

  try {
    for (let page = 1; page <= maxPages; page++) {
      const url = new URL('https://judge.me/api/v1/reviews');
      url.searchParams.set('api_token', token);
      url.searchParams.set('shop_domain', shop);
      url.searchParams.set('per_page', String(perPage));
      url.searchParams.set('page', String(page));

      const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
      if (!res.ok) break;

      const data: { reviews?: JudgeMeReview[] } = await res.json();
      const reviews = data.reviews ?? [];
      if (reviews.length === 0) break;

      for (const r of reviews) {
        if (!r.product_handle || r.product_handle === SHOP_LEVEL_HANDLE) continue;
        if (typeof r.rating !== 'number') continue;
        const cur = acc.get(r.product_handle) ?? { sum: 0, count: 0 };
        cur.sum += r.rating;
        cur.count += 1;
        acc.set(r.product_handle, cur);
      }

      if (reviews.length < perPage) break; // última página
    }
  } catch {
    return out;
  }

  for (const [handle, { sum, count }] of acc) {
    if (count <= 0) continue;
    out.set(handle, {
      ratingValue: Math.round((sum / count) * 10) / 10,
      ratingCount: count,
    });
  }
  return out;
});

/**
 * Rating de un producto concreto, fusionando su región y la región cruzada
 * (EU/UK acumulan reseñas por separado por tener SKUs distintos).
 * Devuelve null si no hay ninguna reseña de producto → la página no emite rating.
 */
export async function getProductRating(opts: {
  region: Region;
  handle?: string;
  crossHandle?: string;
}): Promise<ProductRating | null> {
  const { region, handle, crossHandle } = opts;
  if (!handle && !crossHandle) return null;

  const otherRegion: Region = region === 'uk' ? 'eu' : 'uk';
  const [primaryMap, crossMap] = await Promise.all([
    getRatingsMap(region),
    crossHandle ? getRatingsMap(otherRegion) : Promise.resolve(new Map<string, ProductRating>()),
  ]);

  const a = handle ? primaryMap.get(handle) : undefined;
  const b = crossHandle ? crossMap.get(crossHandle) : undefined;

  const count = (a?.ratingCount ?? 0) + (b?.ratingCount ?? 0);
  if (count <= 0) return null;

  const weighted =
    ((a?.ratingValue ?? 0) * (a?.ratingCount ?? 0) +
      (b?.ratingValue ?? 0) * (b?.ratingCount ?? 0)) /
    count;

  return { ratingValue: Math.round(weighted * 10) / 10, ratingCount: count };
}
