import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import {
  indexableLocales,
  type RouteSection,
  type Locale,
  type Region,
} from '@/lib/i18n/config';
import { products, bundles } from '@/data';

/**
 * Sitemap multi-región multi-idioma con hreflang correcto.
 *
 * SEO model:
 *  - EU is the primary indexable market with 7 locales (es/en/fr/de/it/nl/pt).
 *  - UK only ships in English (en-GB). The /uk/{!en}/* pages exist for UX
 *    (a UK visitor may prefer reading in Spanish) but they are NOT indexed:
 *    they don't appear in the sitemap, they aren't declared as hreflang
 *    alternates, and the pages themselves emit robots:noindex,follow.
 *  - Blog/diario currently only has Spanish content, so only ES is included.
 *
 * Format hreflang: language-COUNTRY (ISO 639-1 + ISO 3166-1 alpha-2).
 * Invalid combinations like 'es-GB' or 'fr-GB' would be ignored by Google
 * AND would create duplicate-content confusion, so we never emit them.
 */

// hreflang per (region, locale) — only valid combinations defined.
const HREFLANG: Record<Region, Partial<Record<Locale, string>>> = {
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
    en: 'en-GB',
  },
};

function hreflangKey(locale: Locale, region: Region): string | null {
  return HREFLANG[region]?.[locale] ?? null;
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
      for (const locale of indexableLocales[region]) {
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
      for (const locale of indexableLocales[region]) {
        const t = product.translations[locale] || product.translations.es;
        if (!t?.slug) continue;
        const path = `/${region}/${locale}/${product.line}/${t.slug}`;

        // Hreflang: cada locale apunta a su propio slug traducido
        const alternates: Record<string, string> = {};
        for (const altRegion of product.availableIn) {
          // UK indexable locale (just en) included via indexableLocales filter below
          for (const altLocale of indexableLocales[altRegion]) {
            const altT = product.translations[altLocale] || product.translations.es;
            if (!altT?.slug) continue;
            const altKey = hreflangKey(altLocale, altRegion);
            if (!altKey) continue;
            const altPath = `/${altRegion}/${altLocale}/${product.line}/${altT.slug}`;
            alternates[altKey] = `${siteConfig.url}${altPath}`;
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
      for (const locale of indexableLocales[region]) {
        const t = bundle.translations[locale] || bundle.translations.es;
        if (!t?.slug) continue;
        const path = `/${region}/${locale}/rituales/${t.slug}`;

        const alternates: Record<string, string> = {};
        for (const altRegion of bundle.availableIn) {
          // UK indexable locale (just en) included via indexableLocales filter below
          for (const altLocale of indexableLocales[altRegion]) {
            const altT = bundle.translations[altLocale] || bundle.translations.es;
            if (!altT?.slug) continue;
            const altKey = hreflangKey(altLocale, altRegion);
            if (!altKey) continue;
            const altPath = `/${altRegion}/${altLocale}/rituales/${altT.slug}`;
            alternates[altKey] = `${siteConfig.url}${altPath}`;
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
    for (const locale of indexableLocales[region]) {
      // Blog/diario: solo ES en hreflang
      if (BLOG_SECTIONS.has(section) && locale !== 'es') continue;
      const key = hreflangKey(locale, region);
      if (!key) continue;
      const path = section
        ? `/${region}/${locale}/${section}`
        : `/${region}/${locale}`;
      langs[key] = `${siteConfig.url}${path}`;
    }
  }
  return langs;
}
