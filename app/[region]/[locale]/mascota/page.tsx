import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import type { Locale, Region } from '@/lib/i18n/config';
import { getProductsForRegion, getBundlesForRegion } from '@/data';
import { CatalogGrid } from '@/components/catalog/CatalogGrid';

interface Props { params: Promise<{ region: Region; locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale } = await params;
  return buildMetadata({
    title: 'Mascota',
    description: 'Higiene suave para perros y gatos. Champús, limpiador de oídos y de ojos formulados con respeto al microbioma y aromas hipoalergénicos.',
    region,
    locale,
    path: 'mascota',
  });
}

export default async function MascotaPage({ params }: Props) {
  const { region, locale } = await params;
  setRequestLocale(locale);

  const allProducts = getProductsForRegion(region).filter((p) => p.line === 'mascota');
  const allBundles = getBundlesForRegion(region).filter((b) => b.line === 'mascota');

  const availableSubcategories = Array.from(
    new Set(allProducts.map((p) => p.subcategory))
  ).sort();

  return (
    <section className="px-pad-x py-pad-y max-w-7xl mx-auto">
      <header className="mb-10 lg:mb-14 text-center">
        <span className="inline-block text-[11px] uppercase tracking-[0.2em] text-graphite mb-3">
          Línea
        </span>
        <h1 className="font-display text-h2-fluid leading-tight mb-4">
          Rituales <em className="font-italic">mascotas</em>
        </h1>
        <p className="text-graphite text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Cuidado suave para perros y gatos: higiene tranquila, calma en casa y
          conexión sin estrés. Productos con registro MAPA y fórmulas hipoalergénicas
          adaptadas al microbioma animal.
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
