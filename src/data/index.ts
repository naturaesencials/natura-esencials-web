import type { Product, Bundle } from './types';
import productsData from './products.json';
import bundlesData from './bundles.json';

/**
 * Carga centralizada del catálogo Natura Esencials.
 *
 * Los datos se mantienen en JSON (products.json, bundles.json) para que
 * el panel admin pueda leerlos/editarlos sin tocar código.
 *
 * Esta capa convierte la estructura JSON al formato Product / Bundle
 * que el resto de la aplicación espera. La conversión incluye:
 *  - Mapear campos planos del JSON al objeto translations[locale]
 *  - Garantizar tipos estrictos
 *  - Filtros utilitarios (por línea, por colección, por subcategoría)
 */

// ─────────────────────────── helpers ───────────────────────────

interface RawProductTranslation {
  name: string;
  nameMain?: string;
  nameAccent?: string;
  subtitle: string;
  /** Slug traducido por idioma (presente en los 7 idiomas tras la migración i18n) */
  slug?: string;
  olfactiveFamily: string;
  momentOfUse: string;
  shortDescription: string;
  longDescription?: string;
  indication?: string;
  usage?: string;
  benefits: string[];
  ritual: Array<{ title: string; description: string }>;
  sensory: {
    aroma: string;
    texture: string;
    experience: string;
    sustainability: string;
  };
  warnings?: string;
  aiTranslation?: boolean;
}

interface RawProduct extends Omit<Product, 'translations' | 'baseSlug'> {
  es: RawProductTranslation;
  en?: RawProductTranslation;
  fr?: RawProductTranslation;
  de?: RawProductTranslation;
  it?: RawProductTranslation;
  nl?: RawProductTranslation;
  pt?: RawProductTranslation;
}

interface RawBundleTranslation {
  name: string;
  nameMain?: string;
  nameAccent?: string;
  subtitle: string;
  /** Slug traducido por idioma */
  slug?: string;
  shortDescription: string;
  longDescription?: string;
  promise: string;
  story?: string;
  aiTranslation?: boolean;
}

interface RawBundle extends Omit<Bundle, 'translations' | 'baseSlug'> {
  es: RawBundleTranslation;
  en?: RawBundleTranslation;
  fr?: RawBundleTranslation;
  de?: RawBundleTranslation;
  it?: RawBundleTranslation;
  nl?: RawBundleTranslation;
  pt?: RawBundleTranslation;
}

const LOCALES = ['es', 'en', 'fr', 'de', 'it', 'nl', 'pt'] as const;

function transformProduct(raw: RawProduct): Product {
  const translations: Product['translations'] = {};

  for (const locale of LOCALES) {
    const t = raw[locale];
    if (!t) continue;
    translations[locale] = {
      ...t,
      // Si la traducción ya trae slug (los 7 idiomas lo tienen), úsalo;
      // si no, fallback al id base del producto
      slug: (t as { slug?: string }).slug || raw.id,
    };
  }

  return {
    id: raw.id,
    baseSlug: raw.id,
    line: raw.line,
    collection: raw.collection,
    subcategory: raw.subcategory,
    sku: raw.sku,
    shopifyHandle: raw.shopifyHandle,
    availableIn: raw.availableIn,
    sensation: raw.sensation,
    isoNaturalPercent: raw.isoNaturalPercent,
    ph: raw.ph,
    paoMonths: raw.paoMonths,
    formats: raw.formats,
    inci: raw.inci,
    dermatologicallyTested: raw.dermatologicallyTested,
    vegan: raw.vegan,
    mapaRegistry: raw.mapaRegistry,
    complements: raw.complements,
    recommendedPack: raw.recommendedPack,
    visible: raw.visible,
    outOfStock: raw.outOfStock,
    primaryImage: raw.primaryImage,
    gallery: raw.gallery,
    basePriceEUR: raw.basePriceEUR,
    basePriceGBP: raw.basePriceGBP,
    translations,
  };
}

function transformBundle(raw: RawBundle): Bundle {
  const translations: Bundle['translations'] = {};

  for (const locale of LOCALES) {
    const t = raw[locale];
    if (!t) continue;
    translations[locale] = {
      ...t,
      slug: (t as { slug?: string }).slug || raw.id,
    };
  }

  return {
    id: raw.id,
    baseSlug: raw.id,
    line: raw.line,
    shopifyHandle: raw.shopifyHandle,
    availableIn: raw.availableIn,
    sensation: raw.sensation,
    includes: raw.includes,
    format: raw.format,
    discountPercent: raw.discountPercent,
    visible: raw.visible,
    outOfStock: raw.outOfStock,
    primaryImage: raw.primaryImage,
    gallery: raw.gallery,
    basePriceEUR: raw.basePriceEUR,
    basePriceGBP: raw.basePriceGBP,
    translations,
  };
}

// ─────────────────────────── exports ───────────────────────────

export const products: Product[] = (productsData.products as RawProduct[]).map(transformProduct);

export const bundles: Bundle[] = (bundlesData.bundles as RawBundle[]).map(transformBundle);

// ─────────────────────────── lookup helpers ───────────────────────────

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getBundleById(id: string): Bundle | undefined {
  return bundles.find((b) => b.id === id);
}

export function getProductsByLine(line: 'cosmetica' | 'hogar' | 'mascota'): Product[] {
  return products.filter((p) => p.visible && p.line === line);
}

export function getBundlesByLine(line: 'cosmetica' | 'hogar' | 'mascota'): Bundle[] {
  return bundles.filter((b) => b.visible && b.line === line);
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter((p) => p.visible && p.collection === collection);
}

export function getProductsBySubcategory(line: string, subcategory: string): Product[] {
  return products.filter(
    (p) => p.visible && p.line === line && p.subcategory === subcategory
  );
}

export function getVisibleProducts(): Product[] {
  return products.filter((p) => p.visible);
}

export function getVisibleBundles(): Bundle[] {
  return bundles.filter((b) => b.visible);
}

/**
 * Devuelve productos disponibles en una región específica.
 * Si el producto está marcado outOfStock, sigue apareciendo pero con flag.
 */
export function getProductsForRegion(region: 'eu' | 'uk'): Product[] {
  return products.filter((p) => p.visible && p.availableIn.includes(region));
}

export function getBundlesForRegion(region: 'eu' | 'uk'): Bundle[] {
  return bundles.filter((b) => b.visible && b.availableIn.includes(region));
}

// ─────────────────────────── slug-based lookups ─────────────────────

import type { Locale } from '@/lib/i18n/config';

/**
 * Encuentra un producto por su slug en un idioma específico.
 * Si no se encuentra en ese idioma, busca en todos los idiomas como fallback.
 * Esto permite que las URLs antiguas (en español) funcionen incluso con UI en inglés.
 */
export function getProductBySlug(slug: string, locale?: Locale): Product | undefined {
  if (locale) {
    const direct = products.find((p) => p.translations[locale]?.slug === slug);
    if (direct) return direct;
  }
  // Fallback: buscar en cualquier idioma
  return products.find((p) =>
    Object.values(p.translations).some((t) => t?.slug === slug),
  );
}

export function getBundleBySlug(slug: string, locale?: Locale): Bundle | undefined {
  if (locale) {
    const direct = bundles.find((b) => b.translations[locale]?.slug === slug);
    if (direct) return direct;
  }
  return bundles.find((b) =>
    Object.values(b.translations).some((t) => t?.slug === slug),
  );
}

/**
 * Devuelve todas las combinaciones (slug, locale) para generateStaticParams
 * de las fichas de producto. Filtra por línea y por región.
 */
export function getAllProductRoutes(line?: 'cosmetica' | 'hogar' | 'mascota') {
  const routes: Array<{ slug: string; locale: Locale; region: 'eu' | 'uk'; productId: string }> = [];
  for (const p of products) {
    if (!p.visible) continue;
    if (line && p.line !== line) continue;
    for (const region of p.availableIn) {
      for (const [loc, t] of Object.entries(p.translations)) {
        if (!t || !t.slug) continue;
        routes.push({
          slug: t.slug,
          locale: loc as Locale,
          region,
          productId: p.id,
        });
      }
    }
  }
  return routes;
}

export function getAllBundleRoutes(line?: 'cosmetica' | 'hogar' | 'mascota') {
  const routes: Array<{ slug: string; locale: Locale; region: 'eu' | 'uk'; bundleId: string }> = [];
  for (const b of bundles) {
    if (!b.visible) continue;
    if (line && b.line !== line) continue;
    for (const region of b.availableIn) {
      for (const [loc, t] of Object.entries(b.translations)) {
        if (!t || !t.slug) continue;
        routes.push({
          slug: t.slug,
          locale: loc as Locale,
          region,
          bundleId: b.id,
        });
      }
    }
  }
  return routes;
}

/**
 * Nombre traducido de la categoría/línea para Schema.org Product y breadcrumbs.
 */
export function getLineNameForLocale(line: 'cosmetica' | 'hogar' | 'mascota', locale: Locale): string {
  const map: Record<typeof line, Record<Locale, string>> = {
    cosmetica: { es: 'Cosmética', en: 'Skincare', fr: 'Cosmétiques', de: 'Hautpflege', it: 'Cosmetica', nl: 'Huidverzorging', pt: 'Cosmética' },
    hogar: { es: 'Hogar', en: 'Home', fr: 'Maison', de: 'Haushalt', it: 'Casa', nl: 'Huis', pt: 'Casa' },
    mascota: { es: 'Mascota', en: 'Pet', fr: 'Animaux', de: 'Haustier', it: 'Animali', nl: 'Huisdier', pt: 'Animais' },
  };
  return map[line][locale];
}
