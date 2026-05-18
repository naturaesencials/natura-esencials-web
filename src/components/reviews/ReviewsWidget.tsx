'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Locale } from '@/lib/i18n/config';
import type { Review } from '@/app/api/reviews/route';

// ─── i18n ───────────────────────────────────────────────────────────────────

const T: Record<string, {
  title: string; noReviews: string; noReviewsSub: string;
  writeReview: string; loadMore: string; loading: string;
  verifiedBuyer: string; showingOf: (shown: number, total: number) => string;
}> = {
  es: { title:'Opiniones', noReviews:'Todavía no hay opiniones', noReviewsSub:'Sé el primero en compartir tu experiencia.', writeReview:'Escribir opinión', loadMore:'Ver más opiniones', loading:'Cargando opiniones…', verifiedBuyer:'Comprador verificado', showingOf:(s,t)=>`Mostrando ${s} de ${t} opiniones` },
  en: { title:'Reviews', noReviews:'No reviews yet', noReviewsSub:'Be the first to share your experience.', writeReview:'Write a review', loadMore:'Load more reviews', loading:'Loading reviews…', verifiedBuyer:'Verified buyer', showingOf:(s,t)=>`Showing ${s} of ${t} reviews` },
  fr: { title:'Avis', noReviews:'Pas encore d\'avis', noReviewsSub:'Soyez le premier à partager votre expérience.', writeReview:'Écrire un avis', loadMore:'Voir plus d\'avis', loading:'Chargement des avis…', verifiedBuyer:'Acheteur vérifié', showingOf:(s,t)=>`Affichage de ${s} sur ${t} avis` },
  de: { title:'Bewertungen', noReviews:'Noch keine Bewertungen', noReviewsSub:'Sei der Erste, der seine Erfahrung teilt.', writeReview:'Bewertung schreiben', loadMore:'Mehr Bewertungen laden', loading:'Bewertungen werden geladen…', verifiedBuyer:'Verifizierter Käufer', showingOf:(s,t)=>`${s} von ${t} Bewertungen` },
  it: { title:'Recensioni', noReviews:'Nessuna recensione ancora', noReviewsSub:'Sii il primo a condividere la tua esperienza.', writeReview:'Scrivi una recensione', loadMore:'Carica altre recensioni', loading:'Caricamento recensioni…', verifiedBuyer:'Acquirente verificato', showingOf:(s,t)=>`Mostrando ${s} di ${t} recensioni` },
  nl: { title:'Beoordelingen', noReviews:'Nog geen beoordelingen', noReviewsSub:'Wees de eerste om je ervaring te delen.', writeReview:'Beoordeling schrijven', loadMore:'Meer beoordelingen laden', loading:'Beoordelingen laden…', verifiedBuyer:'Geverifieerde koper', showingOf:(s,t)=>`${s} van ${t} beoordelingen` },
  pt: { title:'Opiniões', noReviews:'Ainda sem opiniões', noReviewsSub:'Sê o primeiro a partilhar a tua experiência.', writeReview:'Escrever opinião', loadMore:'Ver mais opiniões', loading:'A carregar opiniões…', verifiedBuyer:'Comprador verificado', showingOf:(s,t)=>`A mostrar ${s} de ${t} opiniões` },
};

// Mapa locale app → código BCP47 para Intl
const LOCALE_MAP: Record<string, string> = {
  es: 'es-ES', en: 'en-GB', fr: 'fr-FR', de: 'de-DE',
  it: 'it-IT', nl: 'nl-NL', pt: 'pt-PT',
};

function formatDate(dateStr: string | undefined, locale: string): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString(LOCALE_MAP[locale] ?? 'es-ES', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch {
    return '';
  }
}

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < Math.ceil(rating) && rating % 1 >= 0.5;
        return (
          <svg key={i} viewBox="0 0 12 12" style={{ width: size, height: size }} fill="none">
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

function RatingBar({ rating, count, total }: { rating: number; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-xs text-graphite">
      <span className="w-2 text-right">{rating}</span>
      <div className="h-1.5 flex-1 rounded-full bg-ink/10 overflow-hidden">
        <div className="h-full rounded-full bg-[#C9A96E]" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-6 text-right">{count}</span>
    </div>
  );
}

function ReviewCard({ review, lb, locale }: { review: Review; lb: typeof T.es; locale: string }) {
  const date = formatDate(review.published_at ?? review.created_at, locale);
  return (
    <article className="flex flex-col gap-3 rounded-sm border border-rule bg-paper p-5">
      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <Stars rating={review.rating} />
          {review.title && <p className="text-sm font-medium text-ink leading-tight">{review.title}</p>}
        </div>
        <time className="shrink-0 text-[11px] text-graphite">{date}</time>
      </header>
      {review.body && <p className="text-[13px] leading-[1.7] text-ink/80">{review.body}</p>}
      {review.pictures?.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {review.pictures.slice(0, 4).map((pic, i) => (
            <img key={i} src={pic.urls.original} alt={`Foto de opinión de ${review.reviewer.name}`} className="h-14 w-14 rounded-sm object-cover" loading="lazy" />
          ))}
        </div>
      )}
      <footer className="flex items-center gap-2 pt-1 border-t border-rule">
        <div className="h-6 w-6 rounded-full bg-ink/10 flex items-center justify-center text-[11px] text-ink font-medium uppercase">
          {review.reviewer.name.charAt(0)}
        </div>
        <span className="text-[12px] text-graphite">{review.reviewer.name}</span>
        <span className="ml-auto flex items-center gap-1 text-[10px] text-verde uppercase tracking-[0.15em]">
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor"><path d="M5 8.5L2 5.5l.7-.7L5 7.1l4.3-4.3.7.7z"/></svg>
          {lb.verifiedBuyer}
        </span>
      </footer>
    </article>
  );
}

interface Props {
  handle?: string;
  /** Handle of the same product in the OTHER region. Enables cross-region review merge. */
  crossHandle?: string;
  title?: string;
  locale?: string;
  shopifyHandle?: string;
  region?: 'eu' | 'uk';
}

export function ReviewsWidget({ handle, crossHandle, title, locale = 'es', shopifyHandle, region = 'eu' }: Props) {
  const lb = T[locale] ?? T.es;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const PER_PAGE = 6;

  const fetchReviews = useCallback(async (p: number, append = false) => {
    const params = new URLSearchParams({ page: String(p), per_page: String(PER_PAGE), region });
    if (handle) params.set('handle', handle);
    if (crossHandle && crossHandle !== handle) params.set('cross_handle', crossHandle);
    const res = await fetch(`/api/reviews?${params}`);
    const data = await res.json();
    setTotal(data.total ?? 0);
    setReviews(prev => append ? [...prev, ...(data.reviews ?? [])] : (data.reviews ?? []));
  }, [handle, crossHandle, region]);

  useEffect(() => {
    setLoading(true);
    fetchReviews(1).finally(() => setLoading(false));
  }, [fetchReviews]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const next = page + 1;
    await fetchReviews(next, true);
    setPage(next);
    setLoadingMore(false);
  };

  const avg = reviews.length > 0
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
    : 0;
  const dist = [5, 4, 3, 2, 1].map(n => ({ rating: n, count: reviews.filter(r => r.rating === n).length }));

  // Region-aware "Write a review" link → opens the product page on the correct
  // Shopify storefront where Judge.me's review form is embedded.
  const storefrontBase = region === 'uk'
    ? 'https://natura-esencials.myshopify.com'   // UK Shopify (no custom domain yet)
    : 'https://tienda.naturaesencials.com';      // EU Shopify (custom domain)
  const reviewLink = shopifyHandle
    ? `${storefrontBase}/products/${shopifyHandle}#judgeme_product_reviews`
    : `${storefrontBase}#judgeme_product_reviews`;

  return (
    <section className="mt-12 border-t border-rule pt-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-[clamp(22px,3vw,32px)] tracking-[-0.015em]">{lb.title}</h2>
          {!loading && total > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <Stars rating={avg} size={16} />
              <span className="text-sm text-graphite">{avg} · {total} {lb.title.toLowerCase()}</span>
            </div>
          )}
        </div>
        {reviewLink && (
          <a href={reviewLink} target="_blank" rel="nofollow noopener noreferrer"
            aria-label={`${lb.writeReview}${title ? ` — ${title}` : ''}`}
            className="shrink-0 border border-ink/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-ink hover:border-ink/60 transition-colors">
            {lb.writeReview}
          </a>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16 text-graphite text-sm">{lb.loading}</div>
      )}

      {!loading && reviews.length === 0 && (
        <div className="py-16 text-center">
          <p className="font-display text-lg italic text-ink/60 mb-2">{lb.noReviews}</p>
          <p className="text-sm text-graphite mb-6">{lb.noReviewsSub}</p>
          {reviewLink && (
            <a href={reviewLink} target="_blank" rel="nofollow noopener noreferrer"
              aria-label={`${lb.writeReview}${title ? ` — ${title}` : ''}`}
              className="inline-block border border-ink/20 px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] text-ink hover:border-ink/60 transition-colors">
              {lb.writeReview}
            </a>
          )}
        </div>
      )}

      {!loading && reviews.length > 0 && (
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="lg:w-44 shrink-0">
            <div className="flex flex-col gap-2">
              {dist.map(d => <RatingBar key={d.rating} rating={d.rating} count={d.count} total={reviews.length} />)}
            </div>
          </aside>
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {reviews.map(r => <ReviewCard key={r.id} review={r} lb={lb} locale={locale} />)}
            </div>
            {reviews.length < total && (
              <div className="mt-6 flex flex-col items-center gap-3">
                <p className="text-[11px] text-graphite">{lb.showingOf(reviews.length, total)}</p>
                <button onClick={handleLoadMore} disabled={loadingMore}
                  className="border border-ink/20 px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] text-ink hover:border-ink/60 transition-colors disabled:opacity-40">
                  {loadingMore ? lb.loading : lb.loadMore}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
