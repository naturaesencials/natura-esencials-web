'use client';

import { useRouter } from 'next/navigation';
import type { Locale, Region } from '@/lib/i18n/config';
import { buildPath } from '@/lib/i18n/paths';
import type { Product, Bundle } from '@/data/types';
import { resolveProductImage, resolveBundleImage } from '@/lib/images';
import { CatalogRatingBadge } from '@/components/reviews/CatalogRatingBadge';
import { CardBuyButton, type TargetFormat } from '@/components/catalog/CardBuyButton';

interface ProductCardProps {
  item: Product | Bundle;
  region: Region;
  locale: Locale;
}

const SENSATION_COLORS: Record<string, string> = {
  Calma:    'bg-blue-50 text-blue-900',
  Energía:  'bg-amber-50 text-amber-900',
  Refugio:  'bg-stone-100 text-stone-800',
  Conexión: 'bg-emerald-50 text-emerald-900',
};

function isBundle(item: Product | Bundle): item is Bundle {
  return 'includes' in item;
}

export function ProductCard({ item, region, locale }: ProductCardProps) {
  const router  = useRouter();
  const translation = item.translations[locale] || item.translations.es;
  if (!translation) return null;

  const itemIsBundle = isBundle(item);
  const linkHref = itemIsBundle
    ? buildPath(region, locale, `rituales/${translation.slug || item.baseSlug}`)
    : buildPath(region, locale, `${item.line}/${translation.slug || item.baseSlug}`);

  // Handle de Shopify para el botón de compra
  const shopifyHandle: string | undefined = itemIsBundle
    ? (region === 'uk' && item.shopifyHandleUK ? item.shopifyHandleUK : item.shopifyHandle)
    : (region === 'uk' && (item as Product).shopifyHandleUK
        ? (item as Product).shopifyHandleUK!
        : (item as Product).shopifyHandle);

  // Formato prioritario según línea — mascota: 300ml, resto: 1l
  const targetFormat: TargetFormat = item.line === 'mascota' ? '300ml' : '1l';

  const { src: imageSrc, fallbackSrc: imageFallback } = itemIsBundle
    ? resolveBundleImage(item.id, region, item.primaryImage)
    : resolveProductImage(item.id, region, item.catalogImage ?? item.primaryImage);

  const sensationClass = SENSATION_COLORS[item.sensation] || 'bg-stone-100 text-stone-800';
  const ariaLabel = translation?.nameAccent
    ? `${translation.nameMain || translation.name} ${translation.nameAccent}`
    : (translation?.nameMain || translation?.name || item.id);

  const ratingHandle = !itemIsBundle
    ? (region === 'uk' && (item as Product).shopifyHandleUK
        ? (item as Product).shopifyHandleUK!
        : (item as Product).shopifyHandle)
    : Object.values((item as Bundle).handles ?? {})[0] ?? item.id;

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={() => router.push(linkHref)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); router.push(linkHref); } }}
      className="group relative flex flex-col bg-paper border border-ink/8 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-ink/15 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40"
    >
      {/* Imagen */}
      <div className="relative aspect-square bg-stone-50 overflow-hidden">
        {/* Placeholder letra N mientras carga */}
        <div className="absolute inset-0 flex items-center justify-center text-stone-300" aria-hidden="true">
          <span className="text-4xl font-display italic opacity-40">N</span>
        </div>

        {/* Wrapper con padding — garantiza que la botella no se corte en ningún dispositivo */}
        <div className="absolute inset-0 flex items-center justify-center p-3 transition-transform duration-500 group-hover:scale-[1.03]">
          <img
            src={imageSrc}
            alt={translation.name}
            loading="lazy"
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              if (el.dataset.fallbackTried) {
                el.style.display = 'none';
              } else {
                el.dataset.fallbackTried = 'true';
                el.src = imageFallback;
              }
            }}
          />
        </div>

        {/* Badges — sin z-index relativo, pointer-events none para no bloquear navegación */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {itemIsBundle && (
            <span className="bg-ink text-paper text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm font-medium">
              Ritual
            </span>
          )}
          <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm font-medium ${sensationClass}`}>
            {item.sensation}
          </span>
        </div>

        {!itemIsBundle && 'isoNaturalPercent' in item && (
          <span className="absolute top-3 right-3 pointer-events-none bg-paper/90 backdrop-blur text-ink text-[10px] tracking-wider px-2 py-1 rounded-sm font-medium border border-ink/10">
            {item.isoNaturalPercent}% natural
          </span>
        )}

        {item.outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/40 backdrop-blur-sm pointer-events-none">
            <span className="bg-paper text-ink px-4 py-2 rounded-sm text-xs uppercase tracking-wider font-medium">
              Próximamente disponible
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 lg:p-5 flex flex-col gap-2 flex-1">
        <h2 className="font-display text-lg lg:text-xl leading-tight">
          {translation.nameMain && translation.nameAccent ? (
            <>
              {translation.nameMain} <em className="font-italic">{translation.nameAccent}</em>
            </>
          ) : (
            translation.name
          )}
        </h2>

        {/* Rating badge — detiene propagación para no navegar al hacer clic en él */}
        {ratingHandle && (
          <div onClick={(e) => e.stopPropagation()}>
            <CatalogRatingBadge
              handle={ratingHandle}
              region={region}
              locale={locale}
              productUrl={linkHref}
            />
          </div>
        )}

        <p className="text-graphite text-xs lg:text-sm line-clamp-2 flex-1">
          {translation.subtitle}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 mt-auto border-t border-ink/8">
          <span className="text-[11px] uppercase tracking-wider text-graphite">
            {itemIsBundle
              ? `${item.includes.length} productos · ${item.format}`
              : item.formats.join(' · ')}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-verde group-hover:underline transition-colors">
            Ver →
          </span>
        </div>

        {/* Botón compra rápida */}
        {shopifyHandle && !item.outOfStock && (
          <CardBuyButton
            handle={shopifyHandle}
            region={region}
            locale={locale}
            targetFormat={targetFormat}
          />
        )}
      </div>
    </article>
  );
}
