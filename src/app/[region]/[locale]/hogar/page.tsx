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
    title: ({"es": "Cuidado del hogar", "en": "Home Care", "fr": "Entretien maison", "de": "Haushaltspflege", "it": "Cura della casa", "nl": "Huishoudverzorging", "pt": "Cuidado do lar"} as Record<string, string>)[locale] ?? 'Hogar',
    description: ({"es":"Rituales del hogar de origen natural: limpieza transformada en sensación de casa cuidada. Detergente, suavizante, vajilla y limpiadores con fórmulas suaves de origen natural.","en":"Home care as a ritual: of natural origin cleaning transformed into the feeling of a well-kept home. Detergent, softener, dishwashing and cleaners with gentle formulas.","fr":"Entretien maison en rituel : nettoyage d'origine naturelle transformé en sensation de maison soignée. Lessive, assouplissant, vaisselle et nettoyants aux formules douces.","de":"Haushaltspflege als Ritual: natürlichen Ursprungs Reinigungsmittel für Wäsche, Geschirr und alle Oberflächen. Sanfte Formeln aus handwerklicher Herstellung in Andalusien.","it":"Cura della casa come rituale: la pulizia di origine naturale trasformata in sensazione di casa curata. Detersivi, ammorbidenti e detergenti con formule delicate.","nl":"van natuurlijke oorsprong huishoudverzorging als ritueel: schoonmaken omgezet in gevoel van een verzorgd huis. Wasmiddel, wasverzachter, afwasmiddel en reinigingsmiddelen.","pt":"Cuidado do lar como ritual: limpeza de origem natural transformada em sensação de casa cuidada. Detergente, amaciador, loiça e limpadore com fórmulas suaves."} as Record<string,string>)[locale] ?? 'Rituales del hogar de origen natural.',
    region,
    noIndex: region === "uk" && process.env.NEXT_PUBLIC_UK_LIVE !== "true",
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
          <span className="block">
            {t('hogar.title')} <em className="font-italic">{t('hogar.accent')}</em>
          </span>
          {' '}
          <span className="block mt-2 text-[clamp(14px,1.8vw,18px)] font-sans font-normal text-graphite tracking-normal">
            {t('hogar.tagline')}
          </span>
        </h1>
        <p className="font-sans text-base font-normal text-graphite leading-relaxed tracking-normal max-w-2xl mx-auto">
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
