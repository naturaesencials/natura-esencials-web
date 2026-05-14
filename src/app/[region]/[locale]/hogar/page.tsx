import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import type { Locale, Region } from '@/lib/i18n/config';
import { getProductsForRegion, getBundlesForRegion } from '@/data';
import { CatalogGrid } from '@/components/catalog/CatalogGrid';

interface Props { params: Promise<{ region: Region; locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale } = await params;
  return buildMetadata({
    title: 'Hogar',
    description: 'Limpieza del hogar convertida en ritual. Ropa, cocina, baño y limpieza general con fórmulas suaves y aromas que cuidan el espacio.',
    region,
    locale,
    path: 'hogar',
  });
}

export default async function HogarPage({ params }: Props) {
  const { region, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('catalogPages');

  const allProducts = getProductsForRegion(region).filter((p) => p.line === 'hogar');
  const allBundles = getBundlesForRegion(region).filter((b) => b.line === 'hogar');

  const availableSubcategories = Array.from(
    new Set(allProducts.map((p) => p.subcategory))
  ).sort();

  return (
    <section className="px-pad-x py-pad-y max-w-7xl mx-auto">
      <header className="mb-10 lg:mb-14 text-center">
        <span className="inline-block text-[11px] uppercase tracking-[0.2em] text-graphite mb-3">
          {t('hogar.kicker')}
        </span>
        <h1 className="font-display text-h2-fluid leading-tight mb-4">
          {t('hogar.title')} <em className="font-italic">{t('hogar.accent')}</em>
        </h1>
        <p className="text-graphite text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          {t('hogar.desc')}
        </p>
      </header>

      <CatalogGrid
        products={allProducts}
        bundles={allBundles}
        region={region}
        locale={locale}
        availableSubcategories={availableSubcategories}
      />
    </section>
  );
}
