import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { productSchema, breadcrumbSchema } from '@/lib/seo/schema';
import { ProductDetail } from '@/components/catalog/ProductDetail';
import {
  getProductBySlug,
  getAllProductRoutes,
  getLineNameForLocale,
} from '@/data';
import {
  type Locale,
  type Region,
  regionCurrency,
  getCanonicalUrl,
  localeMap,
  getLocaleSlugAlternates,
} from '@/lib/i18n/config';
import { siteConfig } from '@/config/site';
import { getAbsoluteProductImage, getOgProductImage } from '@/lib/images';

type ProductLine = 'cosmetica' | 'hogar' | 'mascota';

interface PageProps {
  params: Promise<{ region: Region; locale: Locale; slug: string }>;
}

/**
 * Genera todos los static params para las fichas de producto de una línea concreta.
 * Cubre las 35 productos × 14 region/locale combinations donde están disponibles.
 */
export function makeGenerateStaticParams(line: ProductLine) {
  return async function generateStaticParams() {
    const routes = getAllProductRoutes(line);
    return routes.map((r) => ({
      region: r.region,
      locale: r.locale,
      slug: r.slug,
    }));
  };
}

/**
 * Genera metadata SEO completa: title localizado, description, hreflang × 14 alternates,
 * canonical en el idioma actual, OG, Twitter Card.
 */
export function makeGenerateMetadata(line: ProductLine) {
  return async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { region, locale, slug } = await params;
    const product = getProductBySlug(slug, locale);
    if (!product || product.line !== line || !product.availableIn.includes(region)) {
      return buildMetadata({
        title: 'Producto no encontrado',
        description: '',
        region,
        locale,
        noIndex: true,
      });
    }
    const tr = product.translations[locale] || product.translations.es;
    if (!tr) {
      return buildMetadata({
        title: product.id,
        description: '',
        region,
        locale,
        noIndex: true,
      });
    }

    const path = `${line}/${tr.slug}`;
    const sensationKeyword = tr.olfactiveFamily.split('·').map((s) => s.trim()).filter(Boolean);
    const lineName = getLineNameForLocale(line, locale);

    // Hreflang correcto: cada locale apunta a su propio slug traducido
    const slugsByLocale = Object.fromEntries(
      Object.entries(product.translations)
        .filter(([, t]) => t?.slug)
        .map(([loc, t]) => [loc, t!.slug]),
    ) as Partial<Record<Locale, string>>;

    // Title: nombre + primera frase del subtitle para diferenciar variantes (SEO)
    const titleSuffix = tr.subtitle ? ` — ${tr.subtitle.split('.')[0]}` : '';
    const fullTitle = `${tr.name}${titleSuffix}`;
    const title = fullTitle.length > 55 ? fullTitle.slice(0, 52) + '…' : fullTitle;

    return buildMetadata({
      title,
      description: tr.shortDescription,
      region,
      locale,
      path,
      type: 'product',
      keywords: [
        tr.name,
        ...sensationKeyword,
        product.sensation,
        lineName,
        'Natura Esencials',
        'ISO 16128',
        'Andalucía',
      ],
      image: getOgProductImage(product.id, region, product.primaryImage),
      imageAlt: tr.name,
      customAlternates: getLocaleSlugAlternates(line, slugsByLocale, tr.slug),
    });
  };
}

/**
 * Página de detalle de producto.
 */
export function makeProductPage(line: ProductLine) {
  return async function ProductPage({ params }: PageProps) {
    const { region, locale, slug } = await params;
    const product = getProductBySlug(slug, locale);
    if (!product || product.line !== line || !product.availableIn.includes(region) || !product.visible) {
      notFound();
    }
    setRequestLocale(locale);

    const tr = product.translations[locale] || product.translations.es;
    if (!tr) notFound();

    // Slug no canónico para este locale → 404 (evita duplicados y language mismatch)
    if (slug !== tr.slug) notFound();

    const t = await getTranslations({ locale, namespace: 'product' });
    const url = getCanonicalUrl(region, locale, `${line}/${tr.slug}`);
    const price = region === 'eu' ? product.basePriceEUR : product.basePriceGBP;
    const currency = regionCurrency[region].code;
    const lineName = getLineNameForLocale(line, locale);

    // Construye additionalProperty para Schema.org Product
    const additionalProperties: Array<{ name: string; value: string | number; unitText?: string }> = [
      { name: 'ISO 16128 natural origin', value: product.isoNaturalPercent, unitText: 'P1' },
    ];
    if (product.ph) additionalProperties.push({ name: 'pH', value: product.ph });
    if (product.paoMonths) additionalProperties.push({ name: 'Period after opening', value: product.paoMonths, unitText: 'MON' });
    if (product.dermatologicallyTested) additionalProperties.push({ name: 'Dermatologically tested', value: 'Yes' });
    if (product.vegan) additionalProperties.push({ name: 'Vegan', value: 'Yes' });

    const productData = productSchema({
      name: tr.name,
      description: tr.shortDescription,
      image: [
        getAbsoluteProductImage(product.id, region, siteConfig.url, product.primaryImage),
      ],
      sku: product.sku,
      category: lineName,
      ...(price !== undefined && { price, currency, availability: product.outOfStock ? 'OutOfStock' : 'InStock' as const }),
      url,
      additionalProperties,
      inLanguage: localeMap[locale].bcp47,
    });

    const breadcrumbs = breadcrumbSchema([
      { name: t('breadcrumbHome'), url: getCanonicalUrl(region, locale) },
      { name: lineName, url: getCanonicalUrl(region, locale, line) },
      { name: tr.name, url },
    ]);

    return (
      <>
        <JsonLd id="ld-product" data={productData} />
        <JsonLd id="ld-breadcrumb-product" data={breadcrumbs} />
        <ProductDetail
          product={product}
          region={region}
          locale={locale}
          t={{
            sensation: t('sensation'),
            olfactive: t('olfactive'),
            moment: t('moment'),
            isoNatural: t('isoNatural'),
            ph: t('ph'),
            pao: t('pao'),
            paoUnit: t('paoUnit'),
            formats: t('formats'),
            ritualTitle: t('ritualTitle'),
            sensorialTitle: t('sensorialTitle'),
            benefitsTitle: t('benefitsTitle'),
            indicationTitle: t('indicationTitle'),
            usageTitle: t('usageTitle'),
            warningsTitle: t('warningsTitle'),
            inciTitle: t('inciTitle'),
            sustainabilityTitle: t('sustainabilityTitle'),
            aromaLabel: t('aromaLabel'),
            textureLabel: t('textureLabel'),
            experienceLabel: t('experienceLabel'),
            sustainabilityLabel: t('sustainabilityLabel'),
            complementsTitle: t('complementsTitle'),
            recommendedPackTitle: t('recommendedPackTitle'),
            breadcrumbHome: t('breadcrumbHome'),
            backToCatalog: t('backToCatalog'),
            aiTranslationNotice: t('aiTranslationNotice'),
            handcraftedAndalucia: t('handcraftedAndalucia'),
            smallBatch: t('smallBatch'),
          }}
        />
      </>
    );
  };
}

// Forzar generación estática de las rutas conocidas; rutas no listadas devuelven 404
export const dynamicParams = false;
