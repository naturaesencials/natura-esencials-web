import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildPath } from '@/lib/i18n/paths';
import type { Locale, Region } from '@/lib/i18n/config';
import { getBundlesForRegion, getProductById } from '@/data';
import { ProductCard } from '@/components/catalog/ProductCard';

interface Props {
  params: Promise<{ region: Region; locale: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const params: Array<{ region: Region; locale: Locale; slug: string }> = [];
  for (const bundle of getBundlesForRegion('eu')) {
    if (!bundle.visible) continue;
    params.push({
      region: 'eu',
      locale: 'es',
      slug: bundle.translations.es?.slug || bundle.baseSlug,
    });
  }
  return params;
}

function findBundle(slug: string, locale: Locale) {
  const all = getBundlesForRegion('eu').concat(getBundlesForRegion('uk'));
  return all.find((b) => {
    if (b.translations[locale]?.slug === slug) return true;
    if (b.baseSlug === slug) return true;
    return false;
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale, slug } = await params;
  const bundle = findBundle(slug, locale);
  if (!bundle) return { title: 'Ritual no encontrado' };

  const t = bundle.translations[locale] || bundle.translations.es;
  if (!t) return { title: 'Ritual no encontrado' };

  return buildMetadata({
    title: t.name,
    description: t.shortDescription,
    region,
    locale,
    path: `rituales/${t.slug || bundle.baseSlug}`,
  });
}

const SENSATION_COLORS: Record<string, string> = {
  Calma: 'bg-blue-50 text-blue-900 border-blue-100',
  Energía: 'bg-amber-50 text-amber-900 border-amber-100',
  Refugio: 'bg-stone-100 text-stone-800 border-stone-200',
  Conexión: 'bg-emerald-50 text-emerald-900 border-emerald-100',
};

export default async function BundlePage({ params }: Props) {
  const { region, locale, slug } = await params;
  setRequestLocale(locale);

  const bundle = findBundle(slug, locale);
  if (!bundle || !bundle.visible) notFound();

  const t = bundle.translations[locale] || bundle.translations.es;
  if (!t) notFound();

  // Productos incluidos en el pack
  const includedProducts = bundle.includes
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const sensationClass = SENSATION_COLORS[bundle.sensation] || 'bg-stone-100 text-stone-800';
  const imageSrc = bundle.primaryImage || `/images/products/${bundle.id}.jpg`;

  // JSON-LD Schema.org
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: t.name,
    description: t.shortDescription,
    brand: { '@type': 'Brand', name: 'Natura Esencials' },
    image: imageSrc,
    category: 'Ritual',
    ...(bundle.basePriceEUR && region === 'eu'
      ? {
          offers: {
            '@type': 'Offer',
            price: bundle.basePriceEUR,
            priceCurrency: 'EUR',
            availability: bundle.outOfStock
              ? 'https://schema.org/OutOfStock'
              : 'https://schema.org/InStock',
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-6xl mx-auto px-pad-x py-pad-y">
        {/* Breadcrumb */}
        <nav
          className="text-[11px] uppercase tracking-wider text-graphite mb-6 flex items-center gap-2"
          aria-label="Breadcrumb"
        >
          <Link href={buildPath(region, locale, '')} className="hover:text-ink">
            Inicio
          </Link>
          <span aria-hidden>·</span>
          <Link href={buildPath(region, locale, bundle.line)} className="hover:text-ink">
            {bundle.line === 'cosmetica' && 'Cosmética'}
            {bundle.line === 'hogar' && 'Hogar'}
            {bundle.line === 'mascota' && 'Mascota'}
          </Link>
          <span aria-hidden>·</span>
          <span className="text-ink">{t.name}</span>
        </nav>

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Imagen principal */}
          <div className="relative aspect-square bg-stone-50 rounded-xl overflow-hidden border border-ink/8">
            <div className="absolute inset-0 flex items-center justify-center text-stone-300">
              <span className="text-7xl font-display italic opacity-40">N</span>
            </div>
            <img
              src={imageSrc}
              alt={t.name}
              className="relative z-10 w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            {bundle.outOfStock && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-ink/40 backdrop-blur-sm">
                <span className="bg-paper text-ink px-4 py-2 rounded-sm text-sm uppercase tracking-wider font-medium">
                  Próximamente disponible
                </span>
              </div>
            )}
          </div>

          {/* Detalles */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="bg-ink text-paper text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-sm">
                Ritual
              </span>
              <span
                className={`text-[11px] uppercase tracking-wider px-3 py-1 rounded-sm border ${sensationClass}`}
              >
                {bundle.sensation}
              </span>
            </div>

            <h1 className="font-display text-4xl lg:text-5xl leading-[1.05]">
              {t.nameMain && t.nameAccent ? (
                <>
                  {t.nameMain} <em className="font-italic">{t.nameAccent}</em>
                </>
              ) : (
                t.name
              )}
            </h1>

            <p className="text-graphite text-lg leading-relaxed -mt-2">
              {t.subtitle}
            </p>

            {/* Promesa destacada */}
            <blockquote className="border-l-2 border-gold pl-4 py-2 italic text-ink text-base">
              «{t.promise}»
            </blockquote>

            <p className="text-ink text-base lg:text-[17px] leading-relaxed">
              {t.shortDescription}
            </p>

            {/* Datos clave */}
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-paper border border-ink/10 text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-sm">
                {bundle.includes.length} productos
              </span>
              <span className="bg-paper border border-ink/10 text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-sm">
                Formato {bundle.format}
              </span>
              {bundle.discountPercent && (
                <span className="bg-emerald-50 text-emerald-900 border border-emerald-100 text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-sm">
                  Ahorro {bundle.discountPercent}%
                </span>
              )}
            </div>

            {/* CTA */}
            <button
              className="mt-4 px-6 py-3.5 bg-ink text-paper text-sm uppercase tracking-wider rounded-sm hover:bg-ink/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={bundle.outOfStock}
            >
              {bundle.outOfStock ? 'Próximamente' : 'Añadir el ritual al carrito'}
            </button>
          </div>
        </div>

        {/* Story narrativa */}
        {t.story && (
          <section className="mb-12 lg:mb-16 max-w-3xl mx-auto text-center">
            <p className="font-display italic text-2xl lg:text-3xl leading-relaxed text-ink">
              «{t.story}»
            </p>
          </section>
        )}

        {/* Productos incluidos */}
        <section className="mb-12 lg:mb-16">
          <h2 className="font-display text-h3-fluid mb-2">
            Productos <em className="font-italic">incluidos</em>
          </h2>
          <p className="text-graphite text-sm mb-6">
            {includedProducts.length} productos pensados para funcionar juntos como un
            mismo ritual.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {includedProducts.map((p) => (
              <ProductCard key={p.id} item={p} region={region} locale={locale} />
            ))}
          </div>
        </section>

        {/* Descripción larga si existe */}
        {t.longDescription && (
          <section className="mb-12 lg:mb-16 max-w-3xl mx-auto">
            <p className="text-ink text-base lg:text-lg leading-relaxed">
              {t.longDescription}
            </p>
          </section>
        )}
      </article>
    </>
  );
}
