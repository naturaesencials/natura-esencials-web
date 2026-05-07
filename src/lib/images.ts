/**
 * src/lib/images.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Helper central para resolución de imágenes de producto con soporte regional.
 *
 * Estructura de carpetas (public/):
 *   images/products/{eu|uk}/{id}.jpg   ← packaging regional (EU multilingüe / UK)
 *   images/products/{id}.jpg           ← fallback compartido (legacy / shared)
 *   images/bundles/{eu|uk}/{id}.jpg    ← rituales/bundles regional
 *   images/bundles/{id}.jpg            ← fallback compartido rituales
 *
 * Lógica de resolución (en ese orden):
 *   1. primaryImage explícita en el dato del producto → se usa tal cual
 *   2. Ruta regional     /images/products/{region}/{id}.jpg
 *   3. Fallback compartido /images/products/{id}.jpg
 *   4. Placeholder SVG inline (gestionado por el componente con onError)
 *
 * Las funciones `resolve*` devuelven { src, fallbackSrc } para que el componente
 * pueda intentar el fallback con onError antes de mostrar el placeholder.
 *
 * Las funciones `getAbsolute*` devuelven URL absoluta para Schema.org / OG tags.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Region } from '@/lib/i18n/config';

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface ResolvedImage {
  /** Ruta principal a intentar primero (regional o primaryImage). */
  src: string;
  /** Ruta de fallback a intentar si src falla (compartida / legacy). */
  fallbackSrc: string;
}

// ─── Productos ───────────────────────────────────────────────────────────────

/**
 * Resuelve la imagen de un producto individual.
 *
 * @param id           - product.id  (ej. "champu-argan-300")
 * @param region       - 'eu' | 'uk'
 * @param primaryImage - product.primaryImage (opcional, definida en los datos)
 */
export function resolveProductImage(
  id: string,
  region: Region,
  primaryImage?: string,
): ResolvedImage {
  // Si hay imagen explícita en los datos, úsala como primaria sin fallback regional
  if (primaryImage) {
    return {
      src: primaryImage,
      fallbackSrc: `/images/products/${id}.jpg`,
    };
  }
  return {
    src: `/images/products/${region}/${id}.jpg`,
    fallbackSrc: `/images/products/${id}.jpg`,
  };
}

// ─── Bundles / Rituales ───────────────────────────────────────────────────────

/**
 * Resuelve la imagen de un bundle/ritual.
 *
 * @param id           - bundle.id
 * @param region       - 'eu' | 'uk'
 * @param primaryImage - bundle.primaryImage (opcional)
 */
export function resolveBundleImage(
  id: string,
  region: Region,
  primaryImage?: string,
): ResolvedImage {
  if (primaryImage) {
    return {
      src: primaryImage,
      fallbackSrc: `/images/bundles/${id}.jpg`,
    };
  }
  return {
    src: `/images/bundles/${region}/${id}.jpg`,
    fallbackSrc: `/images/bundles/${id}.jpg`,
  };
}

// ─── URLs absolutas para Schema.org / OG ─────────────────────────────────────

/**
 * Devuelve la URL absoluta de la imagen regional de un producto.
 * Usada en Schema.org Product.image y OG image en metadata.ts.
 *
 * @param id           - product.id
 * @param region       - 'eu' | 'uk'
 * @param baseUrl      - siteConfig.url  (ej. "https://naturaesencials.com")
 * @param primaryImage - product.primaryImage (opcional)
 */
export function getAbsoluteProductImage(
  id: string,
  region: Region,
  baseUrl: string,
  primaryImage?: string,
): string {
  if (primaryImage) {
    return primaryImage.startsWith('http') ? primaryImage : `${baseUrl}${primaryImage}`;
  }
  return `${baseUrl}/images/products/${region}/${id}.jpg`;
}

/**
 * Devuelve la URL absoluta de la imagen regional de un bundle.
 */
export function getAbsoluteBundleImage(
  id: string,
  region: Region,
  baseUrl: string,
  primaryImage?: string,
): string {
  if (primaryImage) {
    return primaryImage.startsWith('http') ? primaryImage : `${baseUrl}${primaryImage}`;
  }
  return `${baseUrl}/images/bundles/${region}/${id}.jpg`;
}

// ─── OG image helper ─────────────────────────────────────────────────────────

/**
 * Devuelve la ruta relativa (o absoluta si incluye dominio) para la OG image
 * de una página de producto, priorizando la imagen regional.
 *
 * Si no hay imagen de producto definida explícitamente, apunta a la ruta
 * regional para que cuando se añadan las fotos reales, el OG se actualice solo.
 * buildMetadata() en metadata.ts añade siteConfig.url si la ruta es relativa.
 */
export function getOgProductImage(
  id: string,
  region: Region,
  primaryImage?: string,
): string {
  if (primaryImage) return primaryImage;
  return `/images/products/${region}/${id}.jpg`;
}

export function getOgBundleImage(
  id: string,
  region: Region,
  primaryImage?: string,
): string {
  if (primaryImage) return primaryImage;
  return `/images/bundles/${region}/${id}.jpg`;
}
