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
    title: ({"es": "Cosmética artesanal", "en": "Artisan Skincare", "fr": "Cosmétique artisanale", "de": "Handwerkliche Kosmetik", "it": "Cosmetica artigianale", "nl": "Ambachtelijke cosmetica", "pt": "Cosmética artesanal"} as Record<string, string>)[locale] ?? 'Cosmética',
    description: 'Cosmética artesanal de origen natural elaborada en Andalucía. Cabello, cuerpo, rostro y afeitado en rituales sensoriales con certificación ISO 16128.',
    region,
    noIndex: region === "uk" && process.env.NEXT_PUBLIC_UK_LIVE !== "true",
    locale,
    path: 'cosmetica',
  });
}

export default async function CosmeticaPage({ params }: Props) {
  const { region, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('catalogPages');

  const allProducts = getProductsForRegion(region).filter((p) => p.line === 'cosmetica');
  const allBundles = getBundlesForRegion(region).filter((b) => b.line === 'cosmetica');

  const availableSubcategories = Array.from(
    new Set(allProducts.map((p) => p.subcategory))
  ).sort();

  return (
    <section className="px-pad-x py-pad-y max-w-7xl mx-auto">
      <header className="mb-10 lg:mb-14 text-center">
        <span className="inline-block text-[11px] uppercase tracking-[0.2em] text-graphite mb-3">
          {t('cosmetica.kicker')}
        </span>
        <h1 className="font-display text-h2-fluid leading-tight mb-4">
          <span className="block">
            {t('cosmetica.title')} <em className="font-italic">{t('cosmetica.accent')}</em>
          </span>
          <span className="block mt-2 text-[clamp(14px,1.8vw,18px)] font-sans font-normal text-graphite tracking-normal">
            {t('cosmetica.tagline')}
          </span>
        </h1>
        <p className="font-sans text-base font-normal text-graphite leading-relaxed tracking-normal max-w-2xl mx-auto">
          {t('cosmetica.desc')}
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
