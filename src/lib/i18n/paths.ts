import type { Locale, Region } from './config';

/**
 * Construye URL interna respetando region+locale.
 *
 * Importante: las carpetas físicas de Next.js son literales en español
 * (cosmetica, hogar, mascota, origen, contacto, diario, rituales).
 * El SEO multiidioma se logra con:
 *   - hreflang × 14 alternates en cada página
 *   - <html lang="..."> y og:locale por idioma
 *   - Contenido (title, h1, descriptions) traducido al locale
 *   - Slug del PRODUCTO traducido (ej. champu-2-en-1 → 2-in-1-shampoo)
 *
 * Esta es la convención de marcas internacionales como Sephora, Aesop, Rituals:
 * estructura URL estable, contenido localizado.
 *
 * Ejemplos:
 *   buildPath('eu', 'es')                            → '/eu/es'
 *   buildPath('eu', 'es', 'cosmetica')               → '/eu/es/cosmetica'
 *   buildPath('eu', 'en', 'cosmetica')               → '/eu/en/cosmetica'
 *   buildPath('eu', 'es', 'cosmetica/champu-2-en-1') → '/eu/es/cosmetica/champu-2-en-1'
 *   buildPath('eu', 'en', 'cosmetica/2-in-1-shampoo')→ '/eu/en/cosmetica/2-in-1-shampoo'
 */
export function buildPath(
  region: Region,
  locale: Locale,
  pathOrSection?: string,
): string {
  if (!pathOrSection) return `/${region}/${locale}`;
  const clean = pathOrSection.replace(/^\/+|\/+$/g, '');
  return `/${region}/${locale}/${clean}`;
}
