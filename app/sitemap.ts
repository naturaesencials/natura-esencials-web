import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import {
  regions,
  regionLocales,
  getSlug,
  type Region,
  type RouteSection,
} from '@/lib/i18n/config';
import { products, bundles } from '@/data';

/**
 * Sitemap multi-región multi-idioma con hreflang completo.
 * Genera URLs para las combinaciones region+locale e incluye:
 *   - Secciones estáticas (home + 6 secciones)
 *   - Los 35 productos individuales en sus 3 líneas
 *   - Los 14 packs/rituales
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticSections: (RouteSection | '')[] = [
    '',
    'cosmetica',
    'hogar',
    'mascota',
    'origen',
    'diario',
    'contacto',
  ];
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // ── Secciones estáticas ──
  for (const section of staticSections) {
    for (const region of regions) {
      for (const locale of regionLocales[region]) {
        const localizedSection = section ? getSlug(section, locale) : '';
        const path = localizedSection
          ? `/${region}/${locale}/${localizedSection}`
          : `/${region}/${locale}`;

        entries.push({
          url: `${siteConfig.url}${path}`,
          lastModified: now,
          changeFrequency: section === '' ? 'daily' : 'weekly',
          priority: section === '' ? 1.0 : 0.8,
          alternates: {
            languages: buildAlternateLanguages(section),
          },
        });
      }
    }
  }

  // ── Fichas de producto individuales ──
  for (const product of products) {
    if (!product.visible) continue;
    for (const region of product.availableIn) {
      for (const locale of regionLocales[region]) {
        const t = product.translations[locale] || product.translations.es;
        if (!t) continue;
        const path = `/${region}/${locale}/${product.line}/${t.slug || product.baseSlug}`;
        entries.push({
          url: `${siteConfig.url}${path}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.85,
        });
      }
    }
  }

  // ── Fichas de pack/ritual ──
  for (const bundle of bundles) {
    if (!bundle.visible) continue;
    for (const region of bundle.availableIn) {
      for (const locale of regionLocales[region]) {
        const t = bundle.translations[locale] || bundle.translations.es;
        if (!t) continue;
        const ritualesSlug = getSlug('rituales', locale);
        const path = `/${region}/${locale}/${ritualesSlug}/${t.slug || bundle.baseSlug}`;
        entries.push({
          url: `${siteConfig.url}${path}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.9,
        });
      }
    }
  }

  return entries;
}

function buildAlternateLanguages(
  section: RouteSection | '',
): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const region of regions) {
    for (const locale of regionLocales[region]) {
      const key = `${locale}-${region.toUpperCase()}`;
      const localizedSection = section ? getSlug(section, locale) : '';
      const path = localizedSection
        ? `/${region}/${locale}/${localizedSection}`
        : `/${region}/${locale}`;
      langs[key] = `${siteConfig.url}${path}`;
    }
  }
  return langs;
}
