import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import {
  regions,
  regionLocales,
  type RouteSection,
  type Locale,
  type Region,
} from '@/lib/i18n/config';
import { products, bundles } from '@/data';

/**
 * Sitemap multi-región multi-idioma con hreflang correcto.
 *
 * Formato hreflang: language-COUNTRY (ISO 639-1 + ISO 3166-1 alpha-2).
 * "EU" no es un código de país válido → usamos el país principal de cada idioma.
 * UK = "GB" en ISO 3166-1.
 *
 * Excluye:
 *  - UK region (Coming soon, noindex)
 *  - Blog/diario en locales ≠ es (contenido en español, noindex)
 */

// Mapa de hreflang correcto por locale+region
const HREFLANG: Record<Region, Record<string, string>> = {
  eu: {
    es: 'es-ES',
    en: 'en-IE',
    fr: 'fr-FR',
    de: 'de-DE',
    it: 'it-IT',
    nl: 'nl-NL',
    pt: 'pt-PT',
  },
  uk: {
    es: 'es-GB',
    en: 'en-GB',
    fr: 'fr-GB',
    de: 'de-GB',
    it: 'it-GB',
    nl: 'nl-GB',
    pt: 'pt-GB',
  },
};

function hreflangKey(locale: string, region: Region): string {
  return HREFLANG[region]?.[locale] ?? `${locale}`;
}

// Secciones con blog excluido de non-ES
const BLOG_SECTIONS = new Set(['blog', 'diario']);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticSections: (RouteSection | '')[] = [
    '',
    'cosmetica',
    'hogar',
    'mascota',
    'rituales',
    'blog',
    'origen',
    
    'contacto',
    'faq',
  ];
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // ── Secciones estáticas ──
  const activeRegions: Region[] = process.env.NEXT_PUBLIC_UK_LIVE === 'true' ? ['eu', 'uk'] : ['eu'];
  for (const section of staticSections) {
    for (const region of activeRegions) {
      for (const locale of regionLocales[region]) {
      // Blog/diario: solo incluir en ES
      if (BLOG_SECTIONS.has(section) && locale !== 'es') continue;

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
      } // end for locale
    } // end for region
  } // end for section

  // ── Fichas de producto individuales ──
  for (const product of products) {
    if (!product.visible) continue;
    for (const region of product.availableIn) {
      if (region === 'uk' && process.env.NEXT_PUBLIC_UK_LIVE !== 'true') continue; // Skip UK until live
      for (const locale of regionLocales[region]) {
        const t = product.translations[locale] || product.translations.es;
        if (!t?.slug) continue;
        const path = `/${region}/${locale}/${product.line}/${t.slug}`;

        // Hreflang: cada locale apunta a su propio slug traducido
        const alternates: Record<string, string> = {};
        for (const altRegion of product.availableIn) {
          if (altRegion === 'uk') continue;
          for (const altLocale of regionLocales[altRegion]) {
            const altT = product.translations[altLocale] || product.translations.es;
            if (!altT?.slug) continue;
            const altPath = `/${altRegion}/${altLocale}/${product.line}/${altT.slug}`;
            alternates[hreflangKey(altLocale, altRegion)] = `${siteConfig.url}${altPath}`;
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
      if (region === 'uk' && process.env.NEXT_PUBLIC_UK_LIVE !== 'true') continue; // Skip UK until live
      for (const locale of regionLocales[region]) {
        const t = bundle.translations[locale] || bundle.translations.es;
        if (!t?.slug) continue;
        const path = `/${region}/${locale}/rituales/${t.slug}`;

        const alternates: Record<string, string> = {};
        for (const altRegion of bundle.availableIn) {
          if (altRegion === 'uk') continue;
          for (const altLocale of regionLocales[altRegion]) {
            const altT = bundle.translations[altLocale] || bundle.translations.es;
            if (!altT?.slug) continue;
            const altPath = `/${altRegion}/${altLocale}/rituales/${altT.slug}`;
            alternates[hreflangKey(altLocale, altRegion)] = `${siteConfig.url}${altPath}`;
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
  const activeRegions: Region[] = process.env.NEXT_PUBLIC_UK_LIVE === 'true' ? ['eu', 'uk'] : ['eu'];
  for (const region of activeRegions) {
    for (const locale of regionLocales[region]) {
      // Blog/diario: solo ES en hreflang
      if (BLOG_SECTIONS.has(section) && locale !== 'es') continue;
      const key = hreflangKey(locale, region);
      const path = section
        ? `/${region}/${locale}/${section}`
        : `/${region}/${locale}`;
      langs[key] = `${siteConfig.url}${path}`;
    }
  }
  return langs;
}
