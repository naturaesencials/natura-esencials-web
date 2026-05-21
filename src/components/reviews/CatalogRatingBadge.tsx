'use client';

/**
 * CatalogRatingBadge — versión compacta del badge de valoraciones
 * para las tarjetas de producto en las páginas de categoría.
 *
 * - Sin skeleton (no ocupa espacio si no hay datos aún)
 * - Muestra siempre: stars vacías + "Opinar" cuando no hay reseñas
 * - Estrellas doradas rellenas cuando hay reseñas
 * - z-[2] para ser clicable sobre el overlay link de la tarjeta
 */

import { useEffect, useState } from 'react';
import type { Region } from '@/lib/i18n/config';

const NO_REVIEW_LABEL: Record<string, string> = {
  es: 'Opinar', en: 'Review', fr: 'Noter',
  de: 'Bewerten', it: 'Valuta', nl: 'Beoordelen', pt: 'Avaliar',
};

function MiniStars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-[1.5px]">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half   = !filled && i < Math.ceil(rating) && rating % 1 >= 0.5;
        return (
          <svg key={i} viewBox="0 0 12 12" className="h-[11px] w-[11px]" fill="none">
            {filled ? (
              <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.7 2.7,10.5 3.5,7 1,4.8 4.5,4.5"
                fill="#C9A96E" />
            ) : half ? (
              <>
                <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.7 2.7,10.5 3.5,7 1,4.8 4.5,4.5"
                  fill="none" stroke="#C9A96E" strokeWidth="0.8" />
                <polygon points="6,1 4.5,4.5 1,4.8 3.5,7 2.7,10.5 6,8.7" fill="#C9A96E" />
              </>
            ) : (
              <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.7 2.7,10.5 3.5,7 1,4.8 4.5,4.5"
                fill="none" stroke="#C9A96E" strokeWidth="0.8" />
            )}
          </svg>
        );
      })}
    </span>
  );
}

interface Props {
  handle: string;
  region: Region;
  locale: string;
  /** URL de la página de producto — el click lleva directamente a las reseñas */
  productUrl: string;
}

export function CatalogRatingBadge({ handle, region, locale, productUrl }: Props) {
  const [avg, setAvg]       = useState<number>(0);
  const [total, setTotal]   = useState<number>(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!handle) { setLoaded(true); return; }
    const params = new URLSearchParams({ handle, region, locale, page: '1', per_page: '100' });
    fetch(`/api/reviews?${params}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) return;
        const reviews: Array<{ rating: number }> = data.reviews ?? [];
        if (reviews.length > 0) {
          setAvg(Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10);
        }
        setTotal(data.total ?? reviews.length);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [handle, region, locale]);

  // No mostrar nada mientras carga (la tarjeta no salta)
  if (!loaded) return null;

  const noReviewLabel = NO_REVIEW_LABEL[locale] ?? NO_REVIEW_LABEL.en;
  const href = `${productUrl}#product-reviews`;

  return (
    <a
      href={href}
      onClick={e => e.stopPropagation()}
      className="relative z-[2] inline-flex items-center gap-1.5 group/stars"
      aria-label={total > 0 ? `${avg} — ${total} reseñas` : noReviewLabel}
    >
      <MiniStars rating={avg} />
      {total > 0 ? (
        <span className="text-[11px] text-graphite/70 group-hover/stars:text-verde transition-colors">
          {avg} <span className="text-graphite/50">({total})</span>
        </span>
      ) : (
        <span className="text-[11px] text-graphite/50 group-hover/stars:text-verde transition-colors">
          {noReviewLabel}
        </span>
      )}
    </a>
  );
}
