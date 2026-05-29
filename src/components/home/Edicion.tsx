import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { rituales } from '@/data/rituales';
import productsData from '@/data/products.json';
import { regionCurrency, type Locale, type Region } from '@/lib/i18n/config';
import { buildPath } from '@/lib/i18n/paths';
import bundlesData from '@/data/bundles.json';
import { CardBuyButton, type TargetFormat } from '@/components/catalog/CardBuyButton';

interface Props { region: Region; locale: Locale; }

// EU Verano 2026: cinco productos de la edición limitada verano
const EU_VERANO_PRODUCTS = [
  'champu-verano-2en1',
  'gel-manos-cuerpo-verano',
  'limpiasuelos-verano',
  'multisuperficies-verano',
  'lavavajillas-verano',
];

// UK: rituales (mantener igual)
const SEASON_OFFERS_UK: Array<{ id: number }> = [
  { id: 1  },  // Plenitud
  { id: 9  },  // Caricia
  { id: 7  },  // Cocina Impecable
  { id: 10 },  // Mimo Canino
];

const IMG_UK: Record<number, string> = {
  1:  '/images/landing/card-1.jpg',
  9:  '/images/landing/card-9.jpg',
  7:  '/images/landing/card-7.jpg',
  10: '/images/landing/card-10.jpg',
};

const COLOR: Record<string, string> = {
  cosmetica: 'text-verde',
  hogar:     'text-azul',
  mascota:   'text-citrico',
};

// Mapa slug ES → formato principal del bundle
const VISIBLE_SLUGS = new Map(
  (bundlesData.bundles as Array<{ visible?: boolean; es?: { slug?: string }; format?: string }>)
    .filter(b => b.visible !== false && b.es?.slug)
    .map(b => [b.es!.slug!, b.format ?? ''])
);

type ProductData = typeof productsData.products[number];

function getProductName(product: ProductData, locale: Locale): { main: string; accent?: string; full: string } {
  const t = (product as Record<string, unknown>)[locale] as Record<string, string> | undefined;
  if (!t) return { main: product.id, full: product.id };
  return { main: t.nameMain ?? t.name ?? '', accent: t.nameAccent, full: t.name ?? '' };
}

function getProductSlug(product: ProductData, locale: Locale): string {
  const t = (product as Record<string, unknown>)[locale] as Record<string, string> | undefined;
  return t?.slug ?? product.id;
}

export function Edicion({ region, locale }: Props) {
  const t = useTranslations('edicion');
  const symbol = regionCurrency[region].symbol;

  // ── EU: productos edición verano 2026 ──────────────────────────────────
  if (region === 'eu') {
    const euProducts = EU_VERANO_PRODUCTS
      .map(pid => productsData.products.find(p => p.id === pid))
      .filter((p): p is ProductData => p !== undefined && p.availableIn.includes('eu') && p.visible !== false);

    if (euProducts.length === 0) return null;

    return (
      <section className="px-pad-x py-pad-y">
        <header className="mb-[clamp(32px,5vw,56px)] grid gap-10 border-b border-rule pb-[clamp(24px,3vw,36px)] lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-[clamp(16px,2vw,22px)] text-[11px] uppercase tracking-[0.35em] text-verde-vivo">— {t('kicker')}</div>
            <h2 className="font-display text-h1-fluid leading-[0.96] tracking-[-0.022em]">
              {t('title1')} <em className="font-display-italic text-verde">{t('titleAccent')}</em>
            </h2>
          </div>
          <div className="text-left text-sm text-graphite lg:text-right">
            {t('metaCount')}<br/>
            <strong className="mt-1 block font-caption text-lg text-ink" style={{ fontWeight: 350 }}>{t('metaDate')}</strong>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-7">
          {euProducts.map((product) => {
            const names = getProductName(product, locale);
            const slug = getProductSlug(product, locale);
            const href = buildPath(region, locale, `${product.line}/${slug}`);
            const price = product.basePriceEUR;
            const format = product.formats?.[0] ?? '';
            const colorClass = COLOR[product.line] ?? 'text-verde';
            const shopifyHandle = (product as Record<string, unknown>).shopifyHandle as string | undefined;
            const targetFormat: TargetFormat =
              product.line === 'mascota' ? '300ml' : '1l';

            const inner = (
              <>
                <div className="relative mb-4 aspect-square overflow-hidden rounded-sm bg-stone-50">
                  <Image
                    src={(product as Record<string, unknown>).catalogImage as string ?? product.primaryImage ?? '/images/landing/card-1.jpg'}
                    alt={names.full}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className={`mb-1.5 text-[10px] uppercase tracking-[0.22em] ${colorClass}`}>
                  {product.collection ?? product.line}
                </div>
                <p className="font-heading text-[clamp(17px,1.8vw,22px)] leading-[1.15] tracking-[-0.008em]">
                  {names.main}{' '}
                  {names.accent && (
                    <em className={`font-heading-italic ${colorClass}`}>{names.accent}</em>
                  )}
                </p>
                <div className="mt-3 flex items-center justify-between gap-1.5 border-t border-rule pt-2.5">
                  {format && <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/60">{format}</span>}
                  {price != null && (
                    <strong className="font-caption text-xl font-black text-ink">{symbol}{price.toFixed(2)}</strong>
                  )}
                </div>
                {shopifyHandle && (
                  <CardBuyButton
                    handle={shopifyHandle}
                    region={region}
                    locale={locale}
                    targetFormat={targetFormat}
                  />
                )}
              </>
            );

            return (
              <div key={product.id} className="group relative transition-opacity hover:opacity-90">
                <Link href={href} aria-label={names.full} className="absolute inset-0 z-[1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40">
                  <span className="sr-only">{names.full}</span>
                </Link>
                {inner}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // ── UK: rituales (igual que antes) ───────────────────────────────────────
  const offers = SEASON_OFFERS_UK
    .map((o) => ({ ritual: rituales.find((r) => r.id === o.id) }))
    .filter((o): o is { ritual: typeof rituales[0] } =>
      Boolean(o.ritual?.availableIn.includes(region))
    );

  if (offers.length === 0) return null;

  return (
    <section className="px-pad-x py-pad-y">
      <header className="mb-[clamp(32px,5vw,56px)] grid gap-10 border-b border-rule pb-[clamp(24px,3vw,36px)] lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="mb-[clamp(16px,2vw,22px)] text-[11px] uppercase tracking-[0.35em] text-verde-vivo">— {t('kicker')}</div>
          <h2 className="font-display text-h1-fluid leading-[0.96] tracking-[-0.022em]">
            {t('title1')} <em className="font-display-italic text-verde">{t('titleAccent')}</em>
          </h2>
        </div>
        <div className="text-left text-sm text-graphite lg:text-right">
          {t('metaCount')}<br/>
          <strong className="mt-1 block font-caption text-lg text-ink" style={{ fontWeight: 350 }}>{t('metaDate')}</strong>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-7">
        {offers.map(({ ritual }) => {
          const basePrice = ritual.basePriceGBP;
          const slugES    = ritual.slugs.es;
          const hasBundle = VISIBLE_SLUGS.has(slugES);
          const format    = VISIBLE_SLUGS.get(slugES) ?? '';
          const href      = hasBundle ? buildPath(region, locale, `rituales/${ritual.slugs[locale]}`) : undefined;
          const ukTargetFormat: TargetFormat = ritual.line === 'mascota' ? '300ml' : '1l';

          const inner = (
            <>
              <div className="relative mb-4 aspect-[3/4] overflow-hidden">
                <Image
                  src={IMG_UK[ritual.id]}
                  alt={ritual.names[locale].full}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className={`mb-1.5 text-[10px] uppercase tracking-[0.22em] ${COLOR[ritual.line]}`}>
                {ritual.category[locale]}
              </div>
              <p className="font-heading text-[clamp(17px,1.8vw,22px)] leading-[1.15] tracking-[-0.008em]">
                {ritual.names[locale].main}{' '}
                {ritual.names[locale].accent && (
                  <em className={`font-heading-italic ${COLOR[ritual.line]}`}>{ritual.names[locale].accent}</em>
                )}
              </p>
              <div className="mt-3 flex items-center justify-between gap-1.5 border-t border-rule pt-2.5">
                {format && <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/60">{format}</span>}
                <strong className="font-caption text-xl font-black text-ink">{symbol}{basePrice}</strong>
              </div>
              <CardBuyButton
                handle={ritual.shopifyHandle}
                region={region}
                locale={locale}
                targetFormat={ukTargetFormat}
              />
            </>
          );

          return href ? (
            <div key={ritual.id} className="group relative transition-opacity hover:opacity-90">
              <Link href={href} aria-label={ritual.names[locale].full} className="absolute inset-0 z-[1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40">
                <span className="sr-only">{ritual.names[locale].full}</span>
              </Link>
              {inner}
            </div>
          ) : (
            <div key={ritual.id}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}
