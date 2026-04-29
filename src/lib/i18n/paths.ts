import type { Locale, Region, RouteSection } from './config';
import { getSlug } from './config';

/**
 * Construye URL interna respetando region+locale+slugs traducidos.
 * Ejemplos:
 *   buildPath('eu', 'es')                   → '/eu/es'
 *   buildPath('eu', 'es', 'cosmetica')      → '/eu/es/cosmetica'
 *   buildPath('eu', 'en', 'cosmetica')      → '/eu/en/skincare'
 *   buildPath('eu', 'es', 'rituales/plenitud') → '/eu/es/rituales/plenitud'
 */
export function buildPath(
  region: Region,
  locale: Locale,
  pathOrSection?: string,
): string {
  if (!pathOrSection) return `/${region}/${locale}`;

  // Si ya viene una ruta compuesta con `/` (ej: rituales/plenitud), no traducimos los segmentos individuales
  // (los slugs de producto vienen de los datos)
  const sections = pathOrSection.split('/');
  const translatedFirst = isRouteSection(sections[0])
    ? getSlug(sections[0] as RouteSection, locale)
    : sections[0];

  const rest = sections.slice(1).join('/');
  return rest
    ? `/${region}/${locale}/${translatedFirst}/${rest}`
    : `/${region}/${locale}/${translatedFirst}`;
}

const validSections: RouteSection[] = ['cosmetica', 'hogar', 'mascota', 'origen', 'rituales', 'diario', 'contacto'];

function isRouteSection(s: string): boolean {
  return (validSections as string[]).includes(s);
}
