import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { getRitualBySlug } from '@/data/rituales';
import type { Locale, Region } from '@/lib/i18n/config';
import { regionCurrency } from '@/lib/i18n/config';
import { JsonLd } from '@/components/seo/JsonLd';
import { productSchema, breadcrumbSchema } from '@/lib/seo/schema';
import { getCanonicalUrl, getSlug } from '@/lib/i18n/config';
import { siteConfig } from '@/config/site';

interface Props { params: Promise<{ region: Region; locale: Locale; slug: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale, slug } = await params;
  const ritual = getRitualBySlug(slug, locale);
  if (!ritual || !ritual.availableIn.includes(region)) {
    return buildMetadata({ title: 'Producto no encontrado', description: '', region, locale, noIndex: true });
  }
  return buildMetadata({
    title: ritual.names[locale].full,
    description: ritual.subtitles[locale],
    region,
    locale,
    path: `${getSlug('rituales', locale)}/${slug}`,
    type: 'product',
    keywords: ritual.ingredients.concat([ritual.category[locale]]),
  });
}

export default async function RitualPage({ params }: Props) {
  const { region, locale, slug } = await params;
  setRequestLocale(locale);

  const ritual = getRitualBySlug(slug, locale);
  if (!ritual || !ritual.availableIn.includes(region)) {
    notFound();
  }

  const symbol = regionCurrency[region].symbol;
  const price = region === 'eu' ? ritual.basePriceEUR : ritual.basePriceGBP;
  const currency = regionCurrency[region].code;
  const url = getCanonicalUrl(region, locale, `${getSlug('rituales', locale)}/${slug}`);

  const productData = productSchema({
    name: ritual.names[locale].full,
    description: ritual.subtitles[locale],
    image: [`${siteConfig.url}/images/products/${ritual.shopifyHandle}.jpg`],
    sku: ritual.shopifyHandle,
    category: ritual.category[locale],
    price,
    currency,
    availability: 'InStock',
    url,
  });

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: getCanonicalUrl(region, locale) },
    { name: ritual.category[locale], url: getCanonicalUrl(region, locale, ritual.line) },
    { name: ritual.names[locale].full, url },
  ]);

  return (
    <>
      <JsonLd id="ld-product" data={productData} />
      <JsonLd id="ld-breadcrumb" data={breadcrumbs} />
      <article className="px-pad-x py-pad-y">
        <div className="mx-auto max-w-4xl">
          <div className="text-[11px] uppercase tracking-[0.28em] text-verde-vivo mb-4">{ritual.category[locale]}</div>
          <h1 className="font-display text-h1-fluid leading-[0.96] tracking-[-0.025em]">
            {ritual.names[locale].main} {ritual.names[locale].accent && <em className="font-display-italic text-verde">{ritual.names[locale].accent}</em>}
          </h1>
          <p className="mt-6 text-lg text-graphite max-w-2xl">{ritual.subtitles[locale]}</p>
          <div className="mt-8 flex items-baseline gap-6">
            <span className="font-caption text-3xl">{symbol}{price}</span>
            <span className="text-sm text-graphite">{ritual.formats.join(' · ')}</span>
          </div>
          <p className="mt-12 text-sm text-graphite italic">Ficha completa con foto, vídeo y composición — en preparación.</p>
        </div>
      </article>
    </>
  );
}

export const dynamicParams = true;
