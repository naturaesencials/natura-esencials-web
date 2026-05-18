import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { productSchema, breadcrumbSchema } from '@/lib/seo/schema';
import {
  getBundleBySlug,
  getAllBundleRoutes,
  getProductById,
  resolveShopifyHandle,
  resolveBundleHandles,
} from '@/data';
import {
  type Locale,
  type Region,
  getLocaleSlugAlternates,
  regionCurrency,
  getCanonicalUrl,
} from '@/lib/i18n/config';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import { resolveBundleImage } from '@/lib/images';
import { BundleImage } from '@/components/catalog/BundleImage';
import { BuyButton } from '@/components/catalog/BuyButton';
import { MultiFormatBuyButton } from '@/components/catalog/MultiFormatBuyButton';
import { ReviewsWidget } from '@/components/reviews/ReviewsWidget';

interface Props {
  params: Promise<{ region: Region; locale: Locale; slug: string }>;
}

// ─── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllBundleRoutes().map((r) => ({
    region: r.region,
    locale: r.locale,
    slug:   r.slug,
  }));
}

export const dynamicParams = false;

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale, slug } = await params;
  const bundle = getBundleBySlug(slug, locale);
  if (!bundle || !bundle.availableIn.includes(region) || !bundle.visible) {
    return buildMetadata({ title: 'Ritual no encontrado', description: '', region, locale, noIndex: true });
  }
  const tr = bundle.translations[locale];
  if (!tr) return buildMetadata({ title: bundle.translations.es?.name ?? '', description: '', region, locale });

  // Canonical slug for this locale
  const canonicalSlug = bundle.translations[locale]?.slug ?? slug;
  const isNonCanonical = slug !== canonicalSlug;

  // Build correct hreflang: each locale points to its own slug
  const slugsByLocale = Object.fromEntries(
    Object.entries(bundle.translations)
      .filter(([, t]) => t?.slug)
      .map(([loc, t]) => [loc, t!.slug]),
  ) as Partial<Record<Locale, string>>;

  return buildMetadata({
    title: tr.name,
    description: tr.shortDescription || tr.subtitle,
    region,
    locale,
    path: `rituales/${canonicalSlug}`,
    type: 'product',
    noIndex: isNonCanonical,
    keywords: [tr.name, 'ritual', 'Natura Esencials'],
    image: resolveBundleImage(bundle.id, region, bundle.primaryImage).src,
    imageAlt: tr.name,
    customAlternates: getLocaleSlugAlternates('rituales', slugsByLocale, slug),
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function RitualPage({ params }: Props) {
  const { region, locale, slug } = await params;
  setRequestLocale(locale);

  const bundle = getBundleBySlug(slug, locale);
  if (!bundle || !bundle.availableIn.includes(region) || !bundle.visible) {
    notFound();
  }

  const tr = bundle.translations[locale] ?? bundle.translations.es;
  if (!tr) notFound();

  // Slug no canónico para este locale → 404 (evita duplicados y language mismatch)
  const canonicalSlug = tr.slug ?? slug;
  if (slug !== canonicalSlug) notFound();


  const price    = region === 'eu' ? bundle.basePriceEUR : (bundle.basePriceGBP ?? bundle.basePriceEUR);
  const currency = regionCurrency[region].code;
  const url      = getCanonicalUrl(region, locale, `rituales/${slug}`);
  const { src: imgSrc, fallbackSrc: imgFallback } = resolveBundleImage(bundle.id, region, bundle.primaryImage);

  // Line label for breadcrumb
  const lineLabels: Record<string, Record<Locale, string>> = {
    cosmetica: { es: 'Cosmética', en: 'Skincare', fr: 'Cosmétique', de: 'Kosmetik', it: 'Cosmetica', nl: 'Cosmetica', pt: 'Cosmética' },
    hogar:     { es: 'Hogar',     en: 'Home',     fr: 'Maison',     de: 'Haushalt', it: 'Casa',      nl: 'Huishouden', pt: 'Casa'      },
    mascota:   { es: 'Mascotas',  en: 'Pets',     fr: 'Animaux',    de: 'Haustiere',it: 'Animali',   nl: 'Huisdieren', pt: 'Animais'   },
  };
  const lineLabel = lineLabels[bundle.line]?.[locale] ?? bundle.line;

  const jsonLdData = productSchema({
    name: tr.name,
    description: tr.subtitle,
    image: [`${siteConfig.url}/images/bundles/${region}/${bundle.id}.jpg`],
    sku: bundle.id,
    category: lineLabel,
    price,
    currency,
    availability: bundle.outOfStock ? 'OutOfStock' : 'InStock',
    url,
  });

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home',      url: getCanonicalUrl(region, locale) },
    { name: lineLabel,   url: getCanonicalUrl(region, locale, bundle.line) },
    { name: tr.name,     url },
  ]);

  // ── i18n labels ──
  const SAVE_LABEL: Record<string, (pct: number) => string> = {
    es: (p) => `−${p}% de ahorro con el ritual`,
    en: (p) => `Save ${p}% with this ritual`,
    fr: (p) => `−${p}% d'économie avec le rituel`,
    de: (p) => `${p}% Ersparnis mit dem Ritual`,
    it: (p) => `−${p}% di risparmio con il rituale`,
    nl: (p) => `${p}% besparing met dit ritueel`,
    pt: (p) => `−${p}% de poupança com o ritual`,
  };
  const INCLUDES: Record<string, string> = {
    es: 'Incluye', en: 'Includes', fr: 'Comprend', de: 'Enthält',
    it: 'Include', nl: 'Bevat', pt: 'Inclui',
  };

  // Included products (visible ones)
  const includedProducts = (bundle.includes ?? [])
    .map((id: string) => getProductById(id))
    .filter(Boolean);

  return (
    <>
      <JsonLd id="ld-product"    data={jsonLdData} />
      <JsonLd id="ld-breadcrumb" data={breadcrumbs} />

      <article className="px-pad-x pt-8 pb-pad-y">
        <div className="mx-auto max-w-5xl">

          {/* Back button */}
          <div className="mb-6">
            <Link
              href={getCanonicalUrl(region, locale, bundle.line)}
              className="inline-flex items-center gap-2 text-body-fluid text-graphite hover:text-verde transition-colors group"
            >
              <span
                className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center group-hover:border-verde group-hover:bg-verde/10 transition-all"
                aria-hidden="true"
              >
                ←
              </span>
              <span className="uppercase tracking-[0.18em] text-meta-fluid">{lineLabel}</span>
            </Link>
          </div>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-meta-fluid uppercase tracking-[0.22em] text-graphite">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href={getCanonicalUrl(region, locale)} className="hover:text-verde transition-colors">Home</Link></li>
              <li aria-hidden="true">·</li>
              <li><Link href={getCanonicalUrl(region, locale, bundle.line)} className="hover:text-verde transition-colors">{lineLabel}</Link></li>
              <li aria-hidden="true">·</li>
              <li className="text-ink truncate max-w-[180px] sm:max-w-none">{tr.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* Imagen */}
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-paper">
              <Image
                src={imgSrc}
                alt={tr.name}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 95vw"
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              <h1 className="font-display text-h1-fluid leading-[0.96] tracking-[-0.025em]">
                {tr.nameMain ?? tr.name}
                {tr.nameAccent && (
                  <em className="font-display-italic text-accent block">{' '}{tr.nameAccent}</em>
                )}
                {' · '}{{
                  es: 'Natural', en: 'Natural', fr: 'Naturelle',
                  de: 'Natürlich', it: 'Naturale', nl: 'Natuurlijk', pt: 'Natural',
                }[locale] ?? 'Natural'}
              </h1>
              {tr.subtitle && (
                <p className="mt-2 font-caption text-[clamp(14px,1.8vw,18px)] font-normal text-muted leading-relaxed tracking-normal">
                  {tr.subtitle}
                </p>
              )}

              {tr.shortDescription && (
                <p className="text-sm text-muted/80 leading-relaxed">{tr.shortDescription}</p>
              )}

              {tr.longDescription && (
                <p className="text-sm leading-[1.85] text-foreground/75 border-l-2 border-accent pl-4 py-1">
                  {tr.longDescription}
                </p>
              )}

              {tr.story && (
                <p className="text-sm leading-[1.85] text-muted/70 italic">
                  {tr.story}
                </p>
              )}

              {/* Precio + comprar */}
              <div className="flex flex-col gap-5 mt-2">
                {bundle.discountPercent && (
                  <span className="inline-block w-fit text-[11px] uppercase tracking-[0.22em] text-verde border border-verde px-3 py-1">
                    {(SAVE_LABEL[locale] ?? SAVE_LABEL.es)(bundle.discountPercent)}
                  </span>
                )}
                {(() => {
                  const bundleHandles = resolveBundleHandles(bundle, region);
                  const bundleHandle = resolveShopifyHandle(bundle, region);
                  return bundleHandles && Object.keys(bundleHandles).filter(k => bundleHandles[k]).length > 1 ? (
                    <MultiFormatBuyButton
                      handles={bundleHandles as Record<string, string>}
                      region={region}
                      locale={locale}
                    />
                  ) : (
                    <BuyButton
                      handle={bundleHandle}
                      formats={bundle.format ? [bundle.format] : []}
                      region={region}
                      locale={locale}
                      showPricing={true}
                    />
                  );
                })()}
              </div>

              {/* Productos incluidos */}
              {includedProducts.length > 0 && (
                <div className="mt-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted mb-3">
                    {INCLUDES[locale] ?? INCLUDES.es}
                  </p>
                  <ul className="flex flex-col gap-1">
                    {includedProducts.map((p: any) => {
                      const ptr = p.translations[locale] ?? p.translations.es;
                      return ptr ? (
                        <li key={p.id} className="text-sm text-foreground/80 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-accent inline-block shrink-0" />
                          {ptr.name}
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
      {bundle.shopifyHandle && (
        <div className="px-pad-x pb-pad-y">
          <ReviewsWidget handle={resolveShopifyHandle(bundle, region)} title={tr.name} locale={locale} shopifyHandle={resolveShopifyHandle(bundle, region)} region={region} />
        </div>
      )}
    </>
  );
}
