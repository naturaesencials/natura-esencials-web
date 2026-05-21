'use client';

import { useEffect, useState } from 'react';
import type { Region } from '@/lib/i18n/config';

const LABEL: Record<string, { reviews: string; noReviews: string }> = {
  es: { reviews: 'opiniones',      noReviews: 'Sé el primero en opinar' },
  en: { reviews: 'reviews',        noReviews: 'Be the first to review' },
  fr: { reviews: 'avis',           noReviews: 'Soyez le premier à noter' },
  de: { reviews: 'Bewertungen',    noReviews: 'Erste Bewertung schreiben' },
  it: { reviews: 'recensioni',     noReviews: 'Scrivi la prima recensione' },
  nl: { reviews: 'beoordelingen',  noReviews: 'Eerste beoordeling schrijven' },
  pt: { reviews: 'opiniões',       noReviews: 'Seja o primeiro a avaliar' },
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
  const [avg, setAvg]       = useState<number>(0);
  const [total, setTotal]   = useState<number>(0);
  const [loaded, setLoaded] = useState(false);

  const lb = LABEL[locale] ?? LABEL.en;

  useEffect(() => {
    if (!handle) { setLoaded(true); return; }

    async function load() {
      try {
        const params = new URLSearchParams({
          handle, region, locale, page: '1', per_page: '100',
        });
        if (crossHandle && crossHandle !== handle) params.set('cross_handle', crossHandle);

        const res  = await fetch(`/api/reviews?${params}`);
        if (!res.ok) { setLoaded(true); return; }
        const data = await res.json();

        const reviews: Array<{ rating: number }> = data.reviews ?? [];
        const tot: number = data.total ?? reviews.length;

        if (reviews.length > 0) {
          const sum = reviews.reduce((s: number, r: { rating: number }) => s + r.rating, 0);
          setAvg(Math.round((sum / reviews.length) * 10) / 10);
        }
        setTotal(tot);
      } catch { /* silently fail */ }
      finally { setLoaded(true); }
    }

    load();
  }, [handle, crossHandle, region, locale]);

  // Skeleton mientras carga
  if (!loaded) {
    return (
      <div className="flex items-center gap-2 animate-pulse">
        <span className="flex gap-[2px]">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="h-[13px] w-[13px] rounded-sm bg-ink/10" />
          ))}
        </span>
        <span className="h-3 w-20 rounded bg-ink/10" />
      </div>
    );
  }

  // Con reseñas — mostrar media + total
  if (total > 0 && avg > 0) {
    return (
      <a href="#product-reviews" className="inline-flex items-center gap-2 group"
        aria-label={`${avg} de 5 — ${total} ${lb.reviews}`}>
        <Stars rating={avg} />
        <span className="text-[12px] group-hover:text-verde transition-colors">
          <span className="font-medium text-ink">{avg}</span>
          {' '}
          <span className="text-graphite/70">({total} {lb.reviews})</span>
        </span>
      </a>
    );
  }

  // Sin reseñas — invitar a ser el primero
  return (
    <a href="#product-reviews" className="inline-flex items-center gap-2 group"
      aria-label={lb.noReviews}>
      <Stars rating={0} />
      <span className="text-[12px] text-graphite/60 group-hover:text-verde transition-colors">
        {lb.noReviews}
      </span>
    </a>
  );
}
