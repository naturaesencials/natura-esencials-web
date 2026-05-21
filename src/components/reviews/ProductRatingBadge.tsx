'use client';

import { useEffect, useState } from 'react';
import type { Region } from '@/lib/i18n/config';

// Etiquetas por locale para "opiniones / reviews"
const LABEL: Record<string, string> = {
  es: 'opiniones', en: 'reviews', fr: 'avis',
  de: 'Bewertungen', it: 'recensioni', nl: 'beoordelingen', pt: 'opiniões',
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-[2px]" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half   = !filled && i < Math.ceil(rating) && rating % 1 >= 0.5;
        return (
          <svg key={i} viewBox="0 0 12 12" className="h-[13px] w-[13px]" fill="none">
            {filled ? (
              <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.7 2.7,10.5 3.5,7 1,4.8 4.5,4.5" fill="#C9A96E" />
            ) : half ? (
              <>
                <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.7 2.7,10.5 3.5,7 1,4.8 4.5,4.5" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
                <polygon points="6,1 4.5,4.5 1,4.8 3.5,7 2.7,10.5 6,8.7" fill="#C9A96E" />
              </>
            ) : (
              <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.7 2.7,10.5 3.5,7 1,4.8 4.5,4.5" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
            )}
          </svg>
        );
      })}
    </span>
  );
}

interface Props {
  handle: string;
  crossHandle?: string;
  region: Region;
  locale: string;
}

export function ProductRatingBadge({ handle, crossHandle, region, locale }: Props) {
  const [avg, setAvg]     = useState<number | null>(null);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (!handle) return;

    async function load() {
      try {
        const params = new URLSearchParams({
          handle, region, locale, page: '1', per_page: '100',
        });
        if (crossHandle && crossHandle !== handle) params.set('cross_handle', crossHandle);

        const res  = await fetch(`/api/reviews?${params}`);
        if (!res.ok) return;
        const data = await res.json();

        const reviews: Array<{ rating: number }> = data.reviews ?? [];
        const tot: number = data.total ?? reviews.length;

        if (reviews.length > 0) {
          const sum = reviews.reduce((s: number, r: { rating: number }) => s + r.rating, 0);
          setAvg(Math.round((sum / reviews.length) * 10) / 10);
        }
        setTotal(tot);
      } catch {
        // silently fail — badge is non-critical
      }
    }

    load();
  }, [handle, crossHandle, region, locale]);

  // No renderizar si no hay reseñas
  if (total === 0 || avg === null) return null;

  const label = LABEL[locale] ?? LABEL.en;

  return (
    <a
      href="#product-reviews"
      className="inline-flex items-center gap-2 group"
      aria-label={`${avg} de 5 — ${total} ${label}`}
    >
      <Stars rating={avg} />
      <span className="text-[12px] text-graphite group-hover:text-verde transition-colors">
        <span className="font-medium text-ink">{avg}</span>
        {' '}
        <span className="text-graphite/70">({total} {label})</span>
      </span>
    </a>
  );
}
