import type { Locale, Region } from '@/lib/i18n/config';

/**
 * Sistema de datos del catálogo Natura Esencials
 *
 * Estructura jerárquica:
 *   Línea (cosmetica | hogar | mascota)
 *     → Subcategoría (Cabello, Cuerpo, Rostro, Cocina, Baño, etc.)
 *       → Producto individual O Pack/Ritual
 *
 * Las traducciones se cargan desde messages/{locale}.json para textos comunes
 * y desde campos translations[locale] en cada producto para textos específicos.
 *
 * Los precios SIEMPRE vienen de Shopify Storefront API en producción.
 * Los basePriceEUR/GBP son fallback para SSR antes de que cargue el cliente Shopify.
 */

// ─────────────────────── TYPES ───────────────────────

export type ProductLine = 'cosmetica' | 'hogar' | 'mascota';

/** Sensación líder según el sistema de marca de Natura Esencials */
export type Sensation = 'Calma' | 'Energía' | 'Refugio' | 'Conexión';

/** Subcategorías para filtros dentro de cada línea */
export type Subcategory =
  | 'Cabello' | 'Cuerpo' | 'Rostro' | 'Afeitado' | 'Manos'  // cosmética
  | 'Cocina' | 'Baño' | 'Ropa' | 'Limpieza general'         // hogar
  | 'Perros' | 'Gatos' | 'Cuidado';                         // mascota

/** Línea editorial/colección dentro de cosmética */
export type ProductCollection =
  | 'basica'    // Cosmética Básica (los 5 esenciales unisex)
  | 'hombre'    // Cosmética Masculina
  | 'mujer'     // Cosmética Mujer
  | 'general';  // Hogar y mascota agrupan todo bajo "general"

/** Información traducible de un producto */
export interface ProductTranslation {
  /** Nombre comercial completo, ej: "Champú 2 en 1" */
  name: string;
  /** Parte fija del nombre (sin la palabra clave en italic), ej: "Champú" */
  nameMain?: string;
  /** Palabra clave en italic, ej: "2 en 1" */
  nameAccent?: string;
  /** Subtítulo/claim corto */
  subtitle: string;
  /** Slug de URL, ej: "champu-2-en-1" */
  slug: string;
  /** Familia olfativa, ej: "Cítrica · Menta · Lavanda" */
  olfactiveFamily: string;
  /** Momento de uso, ej: "Ducha matinal · Rutina simplificada" */
  momentOfUse: string;
  /** Descripción narrativa breve (2-4 líneas) */
  shortDescription: string;
  /** Descripción larga al cliente (información oficial) */
  longDescription?: string;
  /** Indicación: para qué es */
  indication?: string;
  /** Modo de uso completo (instrucciones) */
  usage?: string;
  /** Beneficios clave (2-5 bullets) */
  benefits: string[];
  /** Ritual en 3 pasos (cada paso: título corto + descripción) */
  ritual: Array<{ title: string; description: string }>;
  /** Experiencia sensorial */
  sensory: {
    aroma: string;
    texture: string;
    experience: string;
    sustainability: string;
  };
  /** Precauciones de uso */
  warnings?: string;
  /** ¿Marcado como "AI translation, pending review"? */
  aiTranslation?: boolean;
}

/** Producto individual completo */
export interface Product {
  /** ID único interno (no exposable) */
  id: string;
  /** Slug base en español (las URLs traducidas usan translations[locale].slug) */
  baseSlug: string;
  /** Línea: cosmetica | hogar | mascota */
  line: ProductLine;
  /** Colección dentro de cosmética */
  collection: ProductCollection;
  /** Subcategoría para filtros */
  subcategory: Subcategory;
  /** SKU interno por defecto (formato base) */
  sku: string;
  /** Handle de Shopify (para conectar con Storefront API) */
  shopifyHandle: string;
  /** Handle de Shopify UK (cuando difiere del EU). Si no está, fallback a shopifyHandle */
  shopifyHandleUK?: string;
  handles?: Record<string, string>;
  /** Regiones donde se vende */
  availableIn: Region[];
  /** Sensación líder de marca */
  sensation: Sensation;
  /** % de origen natural según ISO 16128 */
  isoNaturalPercent: number;
  /** pH del producto si aplica, ej: "4,5-5,5" */
  ph?: string;
  /** PAO (period after opening) en meses */
  paoMonths?: number;
  /** Formatos disponibles, ej: ["300 ml", "1 L", "BiB 5 L"] */
  formats: string[];
  /** Lista INCI completa de ingredientes (cosmética) o composición */
  inci?: string;
  /** Si está dermatológicamente testado */
  dermatologicallyTested?: boolean;
  /** Si es vegano */
  vegan?: boolean;
  /** Si tiene registro MAPA (productos para mascotas) */
  mapaRegistry?: string;
  /** IDs de productos complementarios (cross-sell) */
  complements: string[];
  /** ID del pack/ritual recomendado */
  recommendedPack?: string;
  /** ¿Visible al público? Si false, no aparece en listados ni rutas */
  visible: boolean;
  /** ¿Sin stock temporalmente? Si true, se muestra como "Próximamente disponible" */
  outOfStock?: boolean;
  /** URL de la foto principal (de Shopify CDN o local /images/products/) */
  primaryImage?: string;
  /** Imagen lifestyle para catálogo/landing (si existe, sobreescribe primaryImage en cards) */
  catalogImage?: string;
  /** Imágenes por formato para la tienda UK (key = formato, ej. "300ml", "1L", "BiB 5L") */
  ukFormatImages?: Record<string, string>;
  /** Galería de fotos adicionales */
  gallery?: string[];
  /** Precios de fallback EUR (España/UE) y GBP (UK), si Shopify no responde */
  basePriceEUR?: number;
  basePriceGBP?: number;
  /** Traducciones por idioma */
  translations: Partial<Record<Locale, ProductTranslation>>;
}

/** Pack/Ritual: conjunto cerrado de productos individuales con precio único */
export interface Bundle {
  id: string;
  baseSlug: string;
  line: ProductLine;
  shopifyHandle: string;
  /** Handle de Shopify UK (si difiere). Fallback a shopifyHandle. */
  shopifyHandleUK?: string;
  handles?: Record<string, string>;
  /** Mapping de formato a handle de Shopify UK */
  handlesUK?: Record<string, string>;
  availableIn: Region[];
  sensation: Sensation;
  /** IDs de los productos individuales que componen el pack */
  includes: string[];
  /** Formato del pack, ej: "300 ml" o "1 L" */
  format: string;
  /** Porcentaje de descuento aproximado sobre la suma individual */
  discountPercent?: number;
  visible: boolean;
  outOfStock?: boolean;
  primaryImage?: string;
  /** Imagen lifestyle para catálogo (sobreescribe primaryImage en cards) */
  catalogImage?: string;
  /** Imágenes por formato para el swapper de la ficha de producto */
  ukFormatImages?: Record<string, string>;
  gallery?: string[];
  basePriceEUR?: number;
  basePriceGBP?: number;
  translations: Partial<Record<Locale, BundleTranslation>>;
}

export interface BundleTranslation {
  name: string;          // "Ritual Plenitud"
  nameMain?: string;     // "Ritual"
  nameAccent?: string;   // "Plenitud"
  subtitle: string;      // claim corto
  slug: string;          // "plenitud" o "plenitud-1l"
  shortDescription: string;
  longDescription?: string;
  promise: string;       // promesa comercial: "estar bien en tu piel"
  story?: string;        // relato narrativo
  aiTranslation?: boolean;
}
