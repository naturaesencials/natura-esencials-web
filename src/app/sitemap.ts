import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import {
  regions,
  regionLocales,
  getSlug,
  type Region,
  type RouteSection,
} from '@/lib/i18n/config';
import { rituales } from '@/data/rituales';

/**
 * Sitemap multi-región multi-idioma con hreflang completo.
 * Genera URLs para las 14 combinaciones region+locale.
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
            languages: buildAlternateLanguages(section, region),
          },
        });
      }
    }
  }

  // ── Fichas de producto (rituales) por idioma y región ──
  for (const ritual of rituales) {
    for (const region of ritual.availableIn) {
      for (const locale of regionLocales[region]) {
        const rituallesSlug = getSlug('rituales', locale);
        const ritualSlug = ritual.slugs[locale] || ritual.slugs.es;
        const path = `/${region}/${locale}/${rituallesSlug}/${ritualSlug}`;

        entries.push({
          url: `${siteConfig.url}${path}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.9,
          alternates: {
            languages: buildProductAlternateLanguages(ritual.id),
          },
        });
      }
    }
  }

  return entries;
}

function buildAlternateLanguages(
  section: RouteSection | '',
  _region: Region,
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

function buildProductAlternateLanguages(ritualId: number): Record<string, string> {
  const ritual = rituales.find((r) => r.id === ritualId);
  if (!ritual) return {};
  const langs: Record<string, string> = {};
  for (const region of ritual.availableIn) {
    for (const locale of regionLocales[region]) {
      const key = `${locale}-${region.toUpperCase()}`;
      const ritualesSlug = getSlug('rituales', locale);
      const ritualSlug = ritual.slugs[locale];
      langs[key] = `${siteConfig.url}/${region}/${locale}/${ritualesSlug}/${ritualSlug}`;
    }
  }
  return langs;
}
