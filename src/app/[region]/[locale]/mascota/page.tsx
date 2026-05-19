import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import type { Locale, Region } from '@/lib/i18n/config';
import { getProductsForRegion, getBundlesForRegion } from '@/data';
import { buildPath } from '@/lib/i18n/paths';
import { CatalogGrid } from '@/components/catalog/CatalogGrid';

interface Props { params: Promise<{ region: Region; locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale } = await params;

  const allProducts = getProductsForRegion(region).filter((p) => p.line === 'mascota');
  const isComingSoon = allProducts.length === 0;

  const titles: Record<string, string> = {
    es: 'Cuidado de mascotas', en: 'Pet Care', fr: 'Soins animaux',
    de: 'Tierpflege', it: 'Cura degli animali',
    nl: 'Huisdierverzorging', pt: 'Cuidado de animais',
  };
  const titlesComingSoon: Record<string, string> = {
    es: 'Cuidado de mascotas · Próximamente',
    en: 'Pet Care · Coming Soon',
    fr: 'Soins animaux · Bientôt',
    de: 'Haustierpflege · Demnächst',
    it: 'Cura degli animali · Prossimamente',
    nl: 'Huisdierverzorging · Binnenkort',
    pt: 'Cuidado de animais · Em breve',
  };
  const baseTitles = isComingSoon ? titlesComingSoon : titles;

  return buildMetadata({
    title: baseTitles[locale] ?? baseTitles.es,
    description: isComingSoon
      ? 'Natura Esencials está preparando su línea de cuidado de origen natural para perros y gatos en Reino Unido. Próximamente disponible.'
      : 'Higiene suave para perros y gatos. Champús, limpiador de oídos y de ojos formulados con respeto al microbioma y aromas hipoalergénicos.',
    region,
    // No-index Coming Soon pages so empty content doesn't get crawled as low quality
    noIndex: isComingSoon || (region === 'uk' && process.env.NEXT_PUBLIC_UK_LIVE !== 'true'),
    locale,
    path: 'mascota',
  });
}

export default async function MascotaPage({ params }: Props) {
  const { region, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('catalogPages');

  const allProducts = getProductsForRegion(region).filter((p) => p.line === 'mascota');
  const allBundles = getBundlesForRegion(region).filter((b) => b.line === 'mascota');

  const isComingSoon = allProducts.length === 0 && allBundles.length === 0;

  // ─────────────────── COMING SOON (vacío en la región) ───────────────────
  if (isComingSoon) {
    return (
      <section className="px-pad-x py-pad-y max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <span className="inline-block text-[11px] uppercase tracking-[0.2em] text-citrico mb-3">
            {t('mascota.comingSoonKicker')}
          </span>
          <h1 className="font-display text-h2-fluid leading-tight mb-4">
            {t('mascota.comingSoonTitle')}{' '}
            <em className="font-display-italic text-citrico">
              {t('mascota.comingSoonAccent')}
            </em>
          </h1>
          <p className="font-sans text-base font-normal text-graphite leading-relaxed tracking-normal max-w-xl mx-auto">
            {t('mascota.comingSoonBody')}
          </p>
        </header>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={buildPath(region, locale, 'cosmetica')}
            className="inline-flex items-center gap-2 bg-verde text-bg px-7 py-3.5 text-[12px] uppercase tracking-[0.22em] font-body-medium hover:bg-verde-vivo transition-colors"
          >
            {t('mascota.comingSoonCTA')} <span aria-hidden="true">→</span>
          </Link>
          <Link
            href={buildPath(region, locale)}
            className="inline-flex items-center gap-2 border border-ink/20 text-ink px-7 py-3.5 text-[12px] uppercase tracking-[0.22em] hover:border-verde hover:text-verde transition-colors"
          >
            {t('mascota.comingSoonCTASecondary')}
          </Link>
        </div>
      </section>
    );
  }

  // ─────────────────── Catálogo normal (productos disponibles) ────────────
  const availableSubcategories = Array.from(
    new Set(allProducts.map((p) => p.subcategory))
  ).sort();

  return (
    <section className="px-pad-x py-pad-y max-w-7xl mx-auto">
      <header className="mb-10 lg:mb-14 text-center">
        <span className="inline-block text-[11px] uppercase tracking-[0.2em] text-graphite mb-3">
          {t('mascota.kicker')}
        </span>
        <h1 className="font-display text-h2-fluid leading-tight mb-4">
          <span className="block">
            {t('mascota.title')} <em className="font-italic">{t('mascota.accent')}</em>
          </span>
          {' '}
          <span className="block mt-2 text-[clamp(14px,1.8vw,18px)] font-sans font-normal text-graphite tracking-normal">
            {t('mascota.tagline')}
          </span>
        </h1>
        <p className="font-sans text-base font-normal text-graphite leading-relaxed tracking-normal max-w-2xl mx-auto">
          {t('mascota.desc')}
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
