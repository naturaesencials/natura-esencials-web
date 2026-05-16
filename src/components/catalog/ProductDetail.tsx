'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ShareButtons } from '@/components/social/ShareButtons';
import type { Product, Bundle } from '@/data/types';
import type { Locale, Region } from '@/lib/i18n/config';
import { buildPath } from '@/lib/i18n/paths';
import { getProductById, getBundleById } from '@/data';
import { ProductImage } from './ProductImage';
import { resolveProductImage } from '@/lib/images';
import { BuyButton } from './BuyButton';
import { ReviewsWidget } from '@/components/reviews/ReviewsWidget';

/**
 * ProductDetail — ficha completa de un producto individual.
 *
 * Diseño:
 *  - Hero con imagen + nombre con accent en italic + sensación + ISO%
 *  - Subtítulo + familia olfativa + momento de uso (datos sensoriales rápidos)
 *  - Descripción larga
 *  - Ritual en 3 pasos (numerados)
 *  - Experiencia sensorial (4 cuadrantes: aroma, textura, experiencia, sostenibilidad)
 *  - Beneficios (lista)
 *  - INCI / composición (toggle)
 *  - Indicación + modo de uso + advertencias
 *  - Pruebas (ISO, pH, Andalucía, lote)
 *  - Cross-sell: complementa tu ritual + pack recomendado
 *
 * Accesibilidad:
 *  - h1 único con el nombre
 *  - Estructura semántica (article, section)
 *  - Aria labels en bloques sensoriales
 *  - Imagen con alt traducido
 */

interface ProductDetailProps {
  product: Product;
  region: Region;
  locale: Locale;
  /** Diccionario i18n con etiquetas de la ficha */
  t: {
    sensation: string;
    olfactive: string;
    moment: string;
    isoNatural: string;
    ph: string;
    pao: string;
    paoUnit: string;
    formats: string;
    ritualTitle: string;
    sensorialTitle: string;
    benefitsTitle: string;
    indicationTitle: string;
    usageTitle: string;
    warningsTitle: string;
    inciTitle: string;
    sustainabilityTitle: string;
    aromaLabel: string;
    textureLabel: string;
    experienceLabel: string;
    sustainabilityLabel: string;
    complementsTitle: string;
    recommendedPackTitle: string;
    breadcrumbHome: string;
    backToCatalog: string;
    aiTranslationNotice: string;
    handcraftedAndalucia: string;
    smallBatch: string;
  };
}

export function ProductDetail({ product, region, locale, t }: ProductDetailProps) {
  const tr = product.translations[locale] || product.translations.es;
  if (!tr) return null;

  const { src: imageSrc, fallbackSrc: imageFallback } = resolveProductImage(
    product.id,
    region,
    product.primaryImage,
  );

  const complements = product.complements
    .map((id) => getProductById(id))
    .filter((p): p is Product => !!p && p.visible);
  const recommendedPack = product.recommendedPack
    ? getBundleById(product.recommendedPack)
    : undefined;

  const lineLabel = linkLineLabel(product.line, locale);
  const backHref  = buildPath(region, locale, product.line);

  return (
    <article className="px-pad-x pt-8 pb-pad-y">
      <div className="mx-auto max-w-6xl">

        {/* Back button — visible y clicable */}
        <div className="mb-6">
          <Link
            href={backHref}
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

        {/* Breadcrumb (SEO + contexto completo) */}
        <nav aria-label="Breadcrumb" className="mb-8 text-meta-fluid uppercase tracking-[0.22em] text-graphite">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href={buildPath(region, locale)} className="hover:text-verde transition-colors">
                {t.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              <Link href={backHref} className="hover:text-verde transition-colors">
                {lineLabel}
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li className="text-ink truncate max-w-[180px] sm:max-w-none">{tr.name}</li>
          </ol>
        </nav>

        {/* Hero: imagen + intro */}
        <header className="grid lg:grid-cols-[1fr,1fr] gap-10 lg:gap-16 mb-pad-y-sm">
          <div className="relative aspect-square bg-paper rounded-2xl overflow-hidden">
            <Image
              src={imageSrc}
              alt={tr.name}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 95vw"
              className="object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-ink/90 text-bg text-meta-fluid uppercase tracking-[0.22em] px-3 py-1.5 rounded-sm font-body-medium">
                {product.sensation}
              </span>
              <span className="bg-bg/90 text-ink text-meta-fluid uppercase tracking-[0.22em] px-3 py-1.5 rounded-sm font-body-medium">
                ISO 16128 · {product.isoNaturalPercent}%
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-meta-fluid uppercase tracking-[0.28em] text-verde-vivo mb-4">
              {linkLineLabel(product.line, locale)}
            </p>
            <h1 className="font-display text-h1-fluid leading-[0.96] tracking-[-0.025em]">
              {tr.nameMain || tr.name}
              {tr.nameAccent && (
                <>
                  {' '}
                  <em className="font-display-italic text-verde">{tr.nameAccent}</em>
                </>
              )}
              {tr.subtitle && (
                <span className="block mt-4 font-caption text-[clamp(14px,1.8vw,18px)] not-italic font-normal text-graphite leading-relaxed tracking-normal">
                  {tr.subtitle}
                </span>
              )}
            </h1>

            {/* Datos sensoriales */}
            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-body-fluid">
              <div>
                <dt className="text-meta-fluid uppercase tracking-[0.18em] text-graphite mb-1">{t.olfactive}</dt>
                <dd>{tr.olfactiveFamily}</dd>
              </div>
              <div>
                <dt className="text-meta-fluid uppercase tracking-[0.18em] text-graphite mb-1">{t.moment}</dt>
                <dd>{tr.momentOfUse}</dd>
              </div>
              {product.ph && (
                <div>
                  <dt className="text-meta-fluid uppercase tracking-[0.18em] text-graphite mb-1">{t.ph}</dt>
                  <dd>pH {product.ph}</dd>
                </div>
              )}
              {product.paoMonths && (
                <div>
                  <dt className="text-meta-fluid uppercase tracking-[0.18em] text-graphite mb-1">{t.pao}</dt>
                  <dd>{product.paoMonths} {t.paoUnit}</dd>
                </div>
              )}
            </dl>

            {/* Formatos + precio + comprar */}
            <div className="mt-8 pt-8 border-t border-ink/10 flex flex-col gap-5">
              <BuyButton
                handle={product.shopifyHandle}
                formats={product.formats}
                region={region}
                locale={locale}
                showPricing={true}
              />
            </div>
          </div>
        </header>

        {/* Descripción larga */}
        {tr.longDescription && (
          <section className="mb-pad-y-sm max-w-3xl">
            <p className="text-lede-fluid leading-relaxed text-ink/80">
              {tr.shortDescription}
            </p>
            {tr.longDescription !== tr.shortDescription && (
              <p className="mt-4 text-body-fluid leading-relaxed text-graphite">
                {tr.longDescription}
              </p>
            )}
          </section>
        )}

        {/* Ritual en 3 pasos */}
        {tr.ritual && tr.ritual.length > 0 && (
          <section aria-labelledby="ritual-heading" className="mb-pad-y-sm">
            <h2 id="ritual-heading" className="font-heading text-h3-fluid mb-8">
              {t.ritualTitle}
            </h2>
            <ol className="grid sm:grid-cols-3 gap-6">
              {tr.ritual.map((step, idx) => (
                <li key={idx} className="bg-paper rounded-xl p-6 relative">
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-ink text-bg font-display flex items-center justify-center text-lg">
                    {idx + 1}
                  </div>
                  <h3 className="font-heading text-h4-fluid mb-3 mt-2">{step.title}</h3>
                  <p className="text-body-fluid leading-relaxed text-graphite">{step.description}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Experiencia sensorial — 4 cuadrantes */}
        {tr.sensory && (
          <section aria-labelledby="sensorial-heading" className="mb-pad-y-sm">
            <h2 id="sensorial-heading" className="font-heading text-h3-fluid mb-8">
              {t.sensorialTitle}
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
              <div>
                <h3 className="text-meta-fluid uppercase tracking-[0.22em] text-verde-vivo mb-3">
                  {t.aromaLabel}
                </h3>
                <p className="text-body-fluid leading-relaxed text-ink/80">{tr.sensory.aroma}</p>
              </div>
              <div>
                <h3 className="text-meta-fluid uppercase tracking-[0.22em] text-verde-vivo mb-3">
                  {t.textureLabel}
                </h3>
                <p className="text-body-fluid leading-relaxed text-ink/80">{tr.sensory.texture}</p>
              </div>
              <div>
                <h3 className="text-meta-fluid uppercase tracking-[0.22em] text-verde-vivo mb-3">
                  {t.experienceLabel}
                </h3>
                <p className="text-body-fluid leading-relaxed text-ink/80">{tr.sensory.experience}</p>
              </div>
              <div>
                <h3 className="text-meta-fluid uppercase tracking-[0.22em] text-verde-vivo mb-3">
                  {t.sustainabilityLabel}
                </h3>
                <p className="text-body-fluid leading-relaxed text-ink/80">{tr.sensory.sustainability}</p>
              </div>
            </div>
          </section>
        )}

        {/* Beneficios */}
        {tr.benefits && tr.benefits.length > 0 && (
          <section aria-labelledby="benefits-heading" className="mb-pad-y-sm">
            <h2 id="benefits-heading" className="font-heading text-h3-fluid mb-6">
              {t.benefitsTitle}
            </h2>
            <ul className="space-y-3 max-w-2xl">
              {tr.benefits.map((b, idx) => (
                <li key={idx} className="flex gap-3 text-body-fluid leading-relaxed">
                  <span className="text-verde-vivo font-caption text-xl leading-none mt-0.5" aria-hidden="true">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Indicación + Uso + Advertencias */}
        <section className="mb-pad-y-sm grid md:grid-cols-3 gap-8">
          {tr.indication && (
            <div>
              <h3 className="font-heading text-h4-fluid mb-3">{t.indicationTitle}</h3>
              <p className="text-body-fluid leading-relaxed text-graphite">{tr.indication}</p>
            </div>
          )}
          {tr.usage && (
            <div>
              <h3 className="font-heading text-h4-fluid mb-3">{t.usageTitle}</h3>
              <p className="text-body-fluid leading-relaxed text-graphite">{tr.usage}</p>
            </div>
          )}
          {tr.warnings && (
            <div>
              <h3 className="font-heading text-h4-fluid mb-3">{t.warningsTitle}</h3>
              <p className="text-body-fluid leading-relaxed text-graphite">{tr.warnings}</p>
            </div>
          )}
        </section>

        {/* INCI */}
        {product.inci && (
          <section className="mb-pad-y-sm">
            <details className="bg-paper rounded-xl p-6">
              <summary className="font-heading text-h4-fluid cursor-pointer">{t.inciTitle}</summary>
              <p className="mt-4 text-body-fluid leading-relaxed text-graphite font-mono text-sm">
                {product.inci}
              </p>
            </details>
          </section>
        )}

        {/* Compartir */}
        <div className="mb-pad-y-sm flex items-center gap-4">
          <span className="text-[11px] uppercase tracking-[0.22em] text-graphite">
            {({ es:'Compartir', en:'Share', fr:'Partager', de:'Teilen', it:'Condividi', nl:'Delen', pt:'Partilhar' })[locale] ?? 'Share'}
          </span>
          <ShareButtons
            url={`https://www.naturaesencials.com${buildPath(region, locale, `${product.line}/${tr.slug}`)}`}
            title={`${tr.name} — Natura Esencials`}
            description={tr.shortDescription}
          />
        </div>

        {/* Pruebas: Andalucía + lote */}
        <section className="mb-pad-y-sm bg-ink text-bg rounded-2xl p-8 sm:p-12 text-center">
          <p className="font-display text-h3-fluid italic mb-4">
            {t.handcraftedAndalucia}
          </p>
          <p className="text-body-fluid text-bg/70 max-w-xl mx-auto">
            {t.smallBatch} {tr.name}.
          </p>
        </section>

        {/* Cross-sell: Complementa tu ritual */}
        {complements.length > 0 && (
          <section aria-labelledby="complements-heading" className="mb-pad-y-sm">
            <h2 id="complements-heading" className="font-heading text-h3-fluid mb-8">
              {t.complementsTitle}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {complements.map((c) => {
                const ct = c.translations[locale] || c.translations.es;
                if (!ct) return null;
                return (
                  <Link
                    key={c.id}
                    href={buildPath(region, locale, `${c.line}/${ct.slug}`)}
                    className="group bg-paper rounded-xl p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <p className="text-meta-fluid uppercase tracking-[0.22em] text-verde-vivo mb-2">
                      {c.sensation}
                    </p>
                    <h3 className="font-heading text-h4-fluid mb-2 group-hover:text-verde transition-colors">
                      {ct.nameMain || ct.name}
                      {ct.nameAccent && <em className="font-heading-italic text-verde"> {ct.nameAccent}</em>}
                    </h3>
                    <p className="text-body-fluid text-graphite">{ct.subtitle}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Pack recomendado */}
        {recommendedPack && (
          <section aria-labelledby="recommended-pack-heading" className="mb-pad-y-sm">
            <h2 id="recommended-pack-heading" className="font-heading text-h3-fluid mb-6">
              {t.recommendedPackTitle}
            </h2>
            {(() => {
              const pt = recommendedPack.translations[locale] || recommendedPack.translations.es;
              if (!pt) return null;
              const packHref = buildPath(region, locale, `rituales/${pt.slug}`);
              return (
                <div className="bg-verde text-bg rounded-2xl p-8 sm:p-10">
                  <p className="text-meta-fluid uppercase tracking-[0.28em] text-bg/70 mb-3">
                    {recommendedPack.sensation}
                  </p>
                  <h3 className="font-display text-h2-fluid leading-[0.96] tracking-[-0.02em]">
                    <Link href={packHref} className="hover:underline">
                      {pt.nameMain || pt.name}
                      {pt.nameAccent && <em className="font-display-italic"> {pt.nameAccent}</em>}
                    </Link>
                  </h3>
                  <p className="mt-4 text-lede-fluid italic font-caption max-w-xl">{pt.subtitle}</p>
                  {pt.promise && (
                    <p className="mt-4 text-body-fluid text-bg/80">{pt.promise}</p>
                  )}
                  <Link href={packHref} className="mt-6 inline-block border border-bg/30 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] hover:bg-bg/10 transition-colors">
                    {pt.nameMain || pt.name} →
                  </Link>
                </div>
              );
            })()}
          </section>
        )}

        {/* Aviso de traducción IA (solo si aiTranslation y no es ES) */}
        {tr.aiTranslation && locale !== 'es' && (
          <section className="text-center text-meta-fluid uppercase tracking-[0.22em] text-graphite/60 pt-8 border-t border-ink/8">
            {t.aiTranslationNotice}
          </section>
        )}

        {/* Reviews Judge.me */}
        <ReviewsWidget handle={product.shopifyHandle} title={tr.name} locale={locale} shopifyHandle={product.shopifyHandle} />
      </div>
    </article>
  );
}

/** Etiqueta corta de la línea para el breadcrumb (idioma local) */
function linkLineLabel(line: 'cosmetica' | 'hogar' | 'mascota', locale: Locale): string {
  const map: Record<typeof line, Record<Locale, string>> = {
    cosmetica: { es: 'Cosmética', en: 'Skincare', fr: 'Cosmétiques', de: 'Hautpflege', it: 'Cosmetica', nl: 'Huidverzorging', pt: 'Cosmética' },
    hogar:     { es: 'Hogar',     en: 'Home',     fr: 'Maison',      de: 'Haushalt',    it: 'Casa',      nl: 'Huis',           pt: 'Casa' },
    mascota:   { es: 'Mascota',   en: 'Pet',      fr: 'Animaux',     de: 'Haustier',    it: 'Animali',   nl: 'Huisdier',       pt: 'Animais' },
  };
  return map[line][locale];
}
