import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildPath } from '@/lib/i18n/paths';
import type { Locale, Region } from '@/lib/i18n/config';
import {
  getProductsForRegion,
  getProductById,
  getBundleById,
} from '@/data';
import { ProductCard } from '@/components/catalog/ProductCard';
import { FormatSelector } from '@/components/catalog/FormatSelector';

interface Props {
  params: Promise<{ region: Region; locale: Locale; line: string; slug: string }>;
}

// SSG: pre-genera todas las rutas de productos al build
export async function generateStaticParams() {
  const params: Array<{ region: Region; locale: Locale; line: string; slug: string }> = [];
  // Para no explotar en build, generamos solo region=eu locale=es por ahora.
  // Las demás se generan on-demand con ISR.
  for (const product of getProductsForRegion('eu')) {
    if (!product.visible) continue;
    params.push({
      region: 'eu',
      locale: 'es',
      line: product.line,
      slug: product.translations.es?.slug || product.baseSlug,
    });
  }
  return params;
}

function findProduct(line: string, slug: string, locale: Locale) {
  const all = getProductsForRegion('eu').concat(getProductsForRegion('uk'));
  // Match line + slug (en cualquier locale traducido)
  return all.find((p) => {
    if (p.line !== line) return false;
    if (p.translations[locale]?.slug === slug) return true;
    if (p.baseSlug === slug) return true;
    return false;
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale, line, slug } = await params;
  const product = findProduct(line, slug, locale);
  if (!product) return { title: 'Producto no encontrado' };

  const t = product.translations[locale] || product.translations.es;
  if (!t) return { title: 'Producto no encontrado' };

  return buildMetadata({
    title: t.name,
    description: t.shortDescription,
    region,
    locale,
    path: `${line}/${t.slug || product.baseSlug}`,
  });
}

const SENSATION_COLORS: Record<string, string> = {
  Calma: 'bg-blue-50 text-blue-900 border-blue-100',
  Energía: 'bg-amber-50 text-amber-900 border-amber-100',
  Refugio: 'bg-stone-100 text-stone-800 border-stone-200',
  Conexión: 'bg-emerald-50 text-emerald-900 border-emerald-100',
};

export default async function ProductPage({ params }: Props) {
  const { region, locale, line, slug } = await params;
  setRequestLocale(locale);

  const product = findProduct(line, slug, locale);
  if (!product || !product.visible) notFound();

  const t = product.translations[locale] || product.translations.es;
  if (!t) notFound();

  // Productos complementarios
  const complementProducts = product.complements
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined && p.visible);

  // Pack recomendado
  const recommendedPack = product.recommendedPack
    ? getBundleById(product.recommendedPack)
    : undefined;

  const sensationClass = SENSATION_COLORS[product.sensation] || 'bg-stone-100 text-stone-800';
  const imageSrc = product.primaryImage || `/images/products/${product.id}.jpg`;

  // ─────────────────── JSON-LD Schema.org ───────────────────
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: t.name,
    description: t.shortDescription,
    sku: product.sku,
    brand: { '@type': 'Brand', name: 'Natura Esencials' },
    image: imageSrc,
    category: `${product.line} / ${product.subcategory}`,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'ISO 16128 origen natural',
        value: `${product.isoNaturalPercent}%`,
      },
      ...(product.ph
        ? [{ '@type': 'PropertyValue', name: 'pH', value: product.ph }]
        : []),
    ],
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
          <Link href={buildPath(region, locale, line)} className="hover:text-ink">
            {line === 'cosmetica' && 'Cosmética'}
            {line === 'hogar' && 'Hogar'}
            {line === 'mascota' && 'Mascota'}
          </Link>
          <span aria-hidden>·</span>
          <span className="text-ink">{t.name}</span>
        </nav>

        {/* Header: Galería + Detalles */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Galería de imágenes */}
          <div className="space-y-3">
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
              {product.outOfStock && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-ink/40 backdrop-blur-sm">
                  <span className="bg-paper text-ink px-4 py-2 rounded-sm text-sm uppercase tracking-wider font-medium">
                    Próximamente disponible
                  </span>
                </div>
              )}
            </div>
            {/* Galería adicional si hay */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {product.gallery.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-stone-50 rounded-md overflow-hidden border border-ink/8"
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detalles */}
          <div className="flex flex-col gap-5">
            {/* Sensación */}
            <span
              className={`self-start text-[11px] uppercase tracking-wider px-3 py-1 rounded-sm border ${sensationClass}`}
            >
              {product.sensation}
            </span>

            {/* Nombre */}
            <h1 className="font-display text-4xl lg:text-5xl leading-[1.05]">
              {t.nameMain && t.nameAccent ? (
                <>
                  {t.nameMain} <em className="font-italic">{t.nameAccent}</em>
                </>
              ) : (
                t.name
              )}
            </h1>

            {/* Subtítulo */}
            <p className="text-graphite text-lg leading-relaxed -mt-2">
              {t.subtitle}
            </p>

            {/* Datos clave */}
            <div className="flex flex-wrap gap-2 -mt-1">
              <span className="bg-paper border border-ink/10 text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-sm">
                {product.isoNaturalPercent}% origen natural
              </span>
              <span className="bg-paper border border-ink/10 text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-sm">
                ISO 16128
              </span>
              <span className="bg-paper border border-ink/10 text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-sm">
                Artesanía Andalucía
              </span>
              {product.dermatologicallyTested && (
                <span className="bg-paper border border-ink/10 text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-sm">
                  Dermatológicamente testado
                </span>
              )}
              {product.vegan && (
                <span className="bg-paper border border-ink/10 text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-sm">
                  Vegano
                </span>
              )}
              {product.mapaRegistry && (
                <span className="bg-paper border border-ink/10 text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-sm">
                  Registro MAPA {product.mapaRegistry}
                </span>
              )}
            </div>

            {/* Descripción corta */}
            <p className="text-ink text-base lg:text-[17px] leading-relaxed mt-2">
              {t.shortDescription}
            </p>

            {/* Selector de formato (cliente) */}
            <FormatSelector
              formats={product.formats}
              productId={product.id}
              region={region}
            />

            {/* CTA principal — placeholder hasta integración Shopify */}
            <button
              className="mt-2 px-6 py-3.5 bg-ink text-paper text-sm uppercase tracking-wider rounded-sm hover:bg-ink/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product.outOfStock}
            >
              {product.outOfStock ? 'Próximamente' : 'Añadir al carrito'}
            </button>

            {/* Familia olfativa y momento */}
            <dl className="grid grid-cols-2 gap-4 mt-4 pt-6 border-t border-ink/10 text-sm">
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-graphite mb-1">
                  Familia olfativa
                </dt>
                <dd className="text-ink">{t.olfactiveFamily}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-graphite mb-1">
                  Momento de uso
                </dt>
                <dd className="text-ink">{t.momentOfUse}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Beneficios clave */}
        <section className="mb-12 lg:mb-16">
          <h2 className="font-display text-h3-fluid mb-6">
            Beneficios <em className="font-italic">clave</em>
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {t.benefits.map((b, i) => (
              <li
                key={i}
                className="flex gap-3 p-5 bg-paper border border-ink/8 rounded-lg"
              >
                <span className="text-gold text-2xl leading-none mt-0.5" aria-hidden>
                  +
                </span>
                <span className="text-ink leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Ritual 3 pasos */}
        <section className="mb-12 lg:mb-16">
          <h2 className="font-display text-h3-fluid mb-6">
            Tu ritual en <em className="font-italic">3 pasos</em>
          </h2>
          <ol className="grid md:grid-cols-3 gap-4">
            {t.ritual.map((step, i) => (
              <li
                key={i}
                className="relative p-6 bg-paper border border-ink/8 rounded-lg"
              >
                <span
                  className="absolute -top-3 left-6 bg-ink text-paper text-sm font-display tracking-wider px-3 py-1 rounded-sm"
                  aria-hidden
                >
                  0{i + 1}
                </span>
                <h3 className="font-display text-lg mt-3 mb-2">{step.title}</h3>
                <p className="text-graphite text-sm leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Experiencia sensorial */}
        <section className="mb-12 lg:mb-16">
          <h2 className="font-display text-h3-fluid mb-6">
            Experiencia <em className="font-italic">sensorial</em>
          </h2>
          <dl className="grid md:grid-cols-2 gap-4">
            {(['aroma', 'texture', 'experience', 'sustainability'] as const).map((key) => {
              const labels = {
                aroma: 'Aroma',
                texture: 'Textura',
                experience: 'Experiencia',
                sustainability: 'Sostenibilidad',
              };
              return (
                <div
                  key={key}
                  className="p-5 bg-paper border border-ink/8 rounded-lg"
                >
                  <dt className="text-[11px] uppercase tracking-wider text-gold mb-2">
                    {labels[key]}
                  </dt>
                  <dd className="text-ink text-sm leading-relaxed">
                    {t.sensory[key]}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>

        {/* Información para el cliente — modo de uso, INCI, precauciones */}
        {(t.usage || t.indication || product.inci || t.warnings) && (
          <section className="mb-12 lg:mb-16">
            <h2 className="font-display text-h3-fluid mb-6">
              Información <em className="font-italic">detallada</em>
            </h2>
            <div className="space-y-4">
              {t.indication && (
                <details className="group p-5 bg-paper border border-ink/8 rounded-lg">
                  <summary className="cursor-pointer flex justify-between items-center font-medium">
                    Indicación
                    <span className="text-graphite group-open:rotate-180 transition-transform">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-3 text-ink text-sm leading-relaxed">{t.indication}</p>
                </details>
              )}
              {t.usage && (
                <details className="group p-5 bg-paper border border-ink/8 rounded-lg" open>
                  <summary className="cursor-pointer flex justify-between items-center font-medium">
                    Modo de uso
                    <span className="text-graphite group-open:rotate-180 transition-transform">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-3 text-ink text-sm leading-relaxed">{t.usage}</p>
                </details>
              )}
              {product.inci && (
                <details className="group p-5 bg-paper border border-ink/8 rounded-lg">
                  <summary className="cursor-pointer flex justify-between items-center font-medium">
                    Ingredientes (INCI)
                    <span className="text-graphite group-open:rotate-180 transition-transform">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-3 text-ink text-xs leading-relaxed font-mono">
                    {product.inci}
                  </p>
                </details>
              )}
              {!product.inci && (
                <div className="p-5 bg-paper border border-ink/8 rounded-lg text-sm text-graphite">
                  <strong className="text-ink">Ingredientes:</strong> consulta la lista
                  completa en el envase del producto. Fórmula con {product.isoNaturalPercent}%
                  de ingredientes de origen natural según norma ISO 16128.
                </div>
              )}
              {t.warnings && (
                <details className="group p-5 bg-paper border border-ink/8 rounded-lg">
                  <summary className="cursor-pointer flex justify-between items-center font-medium">
                    Precauciones
                    <span className="text-graphite group-open:rotate-180 transition-transform">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-3 text-ink text-sm leading-relaxed">{t.warnings}</p>
                </details>
              )}
              {(product.ph || product.paoMonths) && (
                <div className="p-5 bg-paper border border-ink/8 rounded-lg flex flex-wrap gap-6 text-sm">
                  {product.ph && (
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-graphite block mb-1">
                        pH
                      </span>
                      <span className="text-ink">{product.ph}</span>
                    </div>
                  )}
                  {product.paoMonths && (
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-graphite block mb-1">
                        PAO (período de uso tras apertura)
                      </span>
                      <span className="text-ink">{product.paoMonths} meses</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Completa el ritual */}
        {(complementProducts.length > 0 || recommendedPack) && (
          <section className="mb-12 lg:mb-16">
            <h2 className="font-display text-h3-fluid mb-6">
              Completa el <em className="font-italic">ritual</em>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
              {complementProducts.slice(0, 2).map((p) => (
                <ProductCard key={p.id} item={p} region={region} locale={locale} />
              ))}
              {recommendedPack && (
                <ProductCard
                  item={recommendedPack}
                  region={region}
                  locale={locale}
                />
              )}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
