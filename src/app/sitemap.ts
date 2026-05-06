import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import {
  regions,
  regionLocales,
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
  // Las carpetas físicas de Next.js son literales en español; el SEO se logra
  // con hreflang + content localizado, no con URLs traducidas.
  for (const section of staticSections) {
    for (const region of regions) {
      for (const locale of regionLocales[region]) {
        const path = section
          ? `/${region}/${locale}/${section}`
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
        // Segmento de línea literal en español (estructura física de las carpetas);
        // el slug del producto SÍ está traducido por idioma.
        const path = `/${region}/${locale}/${product.line}/${t.slug || product.baseSlug}`;

        // Construir alternates hreflang para esta ficha en todos los idiomas disponibles
        const alternates: Record<string, string> = {};
        for (const altRegion of product.availableIn) {
          for (const altLocale of regionLocales[altRegion]) {
            const altT = product.translations[altLocale] || product.translations.es;
            if (!altT) continue;
            const altPath = `/${altRegion}/${altLocale}/${product.line}/${altT.slug || product.baseSlug}`;
            alternates[`${altLocale}-${altRegion.toUpperCase()}`] = `${siteConfig.url}${altPath}`;
          }
        }

        entries.push({
          url: `${siteConfig.url}${path}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.85,
          alternates: { languages: alternates },
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
        const path = `/${region}/${locale}/rituales/${t.slug || bundle.baseSlug}`;

        // hreflang para cada bundle
        const alternates: Record<string, string> = {};
        for (const altRegion of bundle.availableIn) {
          for (const altLocale of regionLocales[altRegion]) {
            const altT = bundle.translations[altLocale] || bundle.translations.es;
            if (!altT) continue;
            const altPath = `/${altRegion}/${altLocale}/rituales/${altT.slug || bundle.baseSlug}`;
            alternates[`${altLocale}-${altRegion.toUpperCase()}`] = `${siteConfig.url}${altPath}`;
          }
        }

        entries.push({
          url: `${siteConfig.url}${path}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.9,
          alternates: { languages: alternates },
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
      const path = section
        ? `/${region}/${locale}/${section}`
        : `/${region}/${locale}`;
      langs[key] = `${siteConfig.url}${path}`;
    }
  }
  return langs;
}
