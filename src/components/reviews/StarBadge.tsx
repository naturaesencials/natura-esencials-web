'use client';

import { useEffect, useState } from 'react';

interface ReviewSummary {
  rating: number;
  count: number;
}

interface Props {
  handle: string;
  className?: string;
}

/**
 * StarBadge — fetches summary rating from Judge.me public API and renders stars.
 * Falls back to nothing if the API fails or returns no reviews.
 */
export function StarBadge({ handle, className = '' }: Props) {
  const [data, setData] = useState<ReviewSummary | null>(null);
  const shopDomain = process.env.NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN ?? 'www.naturaesencials.com';
  const token = process.env.NEXT_PUBLIC_JUDGEME_PUBLIC_TOKEN ?? '';

  useEffect(() => {
    if (!handle || !token) return;
    fetch(`https://judge.me/api/v1/reviews?api_token=${token}&shop_domain=${shopDomain}&handle=${handle}&per_page=0`)
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        if (json?.reviews && json.total_count > 0) {
          const avg = json.reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / json.total_count;
          setData({ rating: Math.round(avg * 10) / 10, count: json.total_count });
        }
      })
      .catch(() => {});
  }, [handle, shopDomain, token]);

  if (!data) return null;

  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(data.rating);
    const half = !filled && i < Math.ceil(data.rating) && data.rating % 1 >= 0.5;
    return { filled, half };
  });

  return (
    <div className={`flex items-center gap-1.5 ${className}`} aria-label={`${data.rating} de 5 estrellas (${data.count} opiniones)`}>
      <span className="flex gap-0.5">
        {stars.map((s, i) => (
          <svg key={i} viewBox="0 0 12 12" className="h-3 w-3" fill="none">
            {s.filled ? (
              <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.7 2.7,10.5 3.5,7 1,4.8 4.5,4.5" fill="#C9A96E" />
            ) : s.half ? (
              <>
                <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.7 2.7,10.5 3.5,7 1,4.8 4.5,4.5" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
                <polygon points="6,1 4.5,4.5 1,4.8 3.5,7 2.7,10.5 6,8.7" fill="#C9A96E" />
              </>
            ) : (
              <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.7 2.7,10.5 3.5,7 1,4.8 4.5,4.5" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
            )}
          </svg>
        ))}
      </span>
      <span className="text-[11px] text-graphite">{data.rating} ({data.count})</span>
    </div>
  );
}
