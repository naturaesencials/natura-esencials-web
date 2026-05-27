'use client';

import { useRouter } from 'next/navigation';
import type { Locale, Region } from '@/lib/i18n/config';
import { buildPath } from '@/lib/i18n/paths';
import type { Product, Bundle } from '@/data/types';
import { resolveProductImage, resolveBundleImage } from '@/lib/images';
import { CatalogRatingBadge } from '@/components/reviews/CatalogRatingBadge';
import { CardBuyButton, type TargetFormat } from '@/components/catalog/CardBuyButton';

// ── Colores por sensación ─────────────────────────────────────────────────────
const SENSATION_STYLE: Record<string, string> = {
  'Calma':    'bg-blue-100   text-blue-900   border-blue-400',
  'Energía':  'bg-amber-100  text-amber-900  border-amber-400',
  'Energia':  'bg-amber-100  text-amber-900  border-amber-400',
  'Refugio':  'bg-orange-100 text-orange-900 border-orange-400',
  'Conexión': 'bg-emerald-100 text-emerald-900 border-emerald-400',
};

function isBundle(item: Product | Bundle): item is Bundle {
  return 'includes' in item;
}

interface ProductCardProps {
  item: Product | Bundle;
  region: Region;
  locale: Locale;
}

export function ProductCard({ item, region, locale }: ProductCardProps) {
  const router = useRouter();
  const translation = item.translations?.[locale] || item.translations?.es;
  if (!translation) return null;

  const itemIsBundle = isBundle(item);
  const linkHref = itemIsBundle
    ? buildPath(region, locale, `rituales/${translation.slug || item.baseSlug}`)
    : buildPath(region, locale, `${item.line}/${translation.slug || item.baseSlug}`);

  const shopifyHandle: string | undefined = itemIsBundle
    ? (region === 'uk' && item.shopifyHandleUK ? item.shopifyHandleUK : item.shopifyHandle)
    : (region === 'uk' && (item as Product).shopifyHandleUK
        ? (item as Product).shopifyHandleUK!
        : (item as Product).shopifyHandle);

  const targetFormat: TargetFormat = item.line === 'mascota' ? '300ml' : '1l';

  const { src: imageSrc, fallbackSrc: imageFallback } = itemIsBundle
    ? resolveBundleImage(item.id, region, item.primaryImage)
    : resolveProductImage(item.id, region, item.catalogImage ?? item.primaryImage);

  const ariaLabel = translation?.nameAccent
    ? `${translation.nameMain || translation.name} ${translation.nameAccent}`
    : (translation?.nameMain || translation?.name || item.id);

  const ratingHandle = !itemIsBundle
    ? (region === 'uk' && (item as Product).shopifyHandleUK
        ? (item as Product).shopifyHandleUK!
        : (item as Product).shopifyHandle)
    : Object.values((item as Bundle).handles ?? {})[0] ?? item.id;

  const sensationStyle = item.sensation ? (SENSATION_STYLE[item.sensation] ?? 'bg-stone-100 text-stone-700 border-stone-300') : null;
  const naturalPct = !itemIsBundle && 'isoNaturalPercent' in item ? (item as Product).isoNaturalPercent : null;

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={() => router.push(linkHref)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); router.push(linkHref); } }}
      className="group flex flex-col bg-paper border border-ink/8 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-ink/15 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40"
    >
      {/* ── Imagen ── */}
      <div
        className="relative bg-stone-50 overflow-hidden"
        style={{ aspectRatio: '1', boxSizing: 'border-box', padding: '12px' }}
      >
        <img
          src={imageSrc}
          alt={translation.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', transition: 'transform 0.5s' }}
          className="group-hover:scale-[1.03]"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            if (el.dataset.fallbackTried) { el.style.display = 'none'; }
            else { el.dataset.fallbackTried = 'true'; el.src = imageFallback; }
          }}
        />

        {/* Out of stock overlay — dentro de la foto */}
        {item.outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/40 backdrop-blur-sm pointer-events-none">
            <span className="bg-paper text-ink px-3 py-1.5 rounded-sm text-[11px] uppercase tracking-wider font-medium">
              Próximamente
            </span>
          </div>
        )}

        {/* Badge ritual — esquina superior izquierda dentro de la foto */}
        {itemIsBundle && (
          <div className="absolute top-2 left-2 pointer-events-none">
            <span className="bg-ink text-paper text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-medium">
              Ritual
            </span>
          </div>
        )}
      </div>

      {/* ── Badges FUERA de la foto ── */}
      {(sensationStyle || naturalPct !== null) && (
        <div className="flex items-center gap-1.5 px-3 pt-3 flex-wrap">
          {sensationStyle && (
            <span className={`border text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-medium ${sensationStyle}`}>
              {item.sensation}
            </span>
          )}
          {naturalPct !== null && (
            <span className="border border-green-400 bg-green-100 text-green-900 text-[10px] px-2 py-0.5 rounded-sm font-medium">
              {naturalPct}% natural
            </span>
          )}
        </div>
      )}

      {/* ── Contenido ── */}
      <div className="px-3 pb-3 pt-2 flex flex-col gap-1.5 flex-1">
        <h2 className="font-display text-base lg:text-lg leading-tight">
          {translation.nameMain && translation.nameAccent ? (
            <>
              {translation.nameMain}{' '}
              <em className="font-italic">{translation.nameAccent}</em>
            </>
          ) : translation.name}
        </h2>

        {ratingHandle && (
          <div onClick={(e) => e.stopPropagation()}>
            <CatalogRatingBadge handle={ratingHandle} region={region} locale={locale} productUrl={linkHref} />
          </div>
        )}

        <p className="text-graphite text-xs line-clamp-2 flex-1">
          {translation.subtitle}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 mt-auto border-t border-ink/8">
          <span className="text-[10px] uppercase tracking-wider text-graphite">
            {itemIsBundle
              ? `${item.includes?.length ?? 0} productos · ${item.format}`
              : (item as Product).formats?.join(' · ')}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-verde group-hover:underline">
            Ver →
          </span>
        </div>

        {shopifyHandle && !item.outOfStock && (
          <CardBuyButton handle={shopifyHandle} region={region} locale={locale} targetFormat={targetFormat} />
        )}
      </div>
    </article>
  );
}
