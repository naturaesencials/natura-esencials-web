/**
 * Configuración de idiomas (7) + regiones (2 = EU, UK).
 * 14 combinaciones posibles, todas con SEO correcto.
 */

export const locales = ['es', 'en', 'fr', 'de', 'it', 'nl', 'pt'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const regions = ['eu', 'uk'] as const;
export type Region = (typeof regions)[number];
export const defaultRegion: Region = 'eu';

// Idiomas disponibles por región. UK arrancará solo con EN hasta que se traduzca el catálogo.
export const regionLocales: Record<Region, readonly Locale[]> = {
  eu: ['es', 'en', 'fr', 'de', 'it', 'nl', 'pt'],
  uk: ['en', 'es', 'fr', 'de', 'it', 'nl', 'pt'],
};

// Moneda por región
export const regionCurrency: Record<Region, { code: string; symbol: string }> = {
  eu: { code: 'EUR', symbol: '€' },
  uk: { code: 'GBP', symbol: '£' },
};

// Mapping Locale → BCP-47 (hreflang y og:locale)
export const localeMap: Record<Locale, { bcp47: string; ogLocale: string; name: string; nativeName: string }> = {
  es: { bcp47: 'es-ES', ogLocale: 'es_ES', name: 'Spanish',    nativeName: 'Español' },
  en: { bcp47: 'en-GB', ogLocale: 'en_GB', name: 'English',    nativeName: 'English' },
  fr: { bcp47: 'fr-FR', ogLocale: 'fr_FR', name: 'French',     nativeName: 'Français' },
  de: { bcp47: 'de-DE', ogLocale: 'de_DE', name: 'German',     nativeName: 'Deutsch' },
  it: { bcp47: 'it-IT', ogLocale: 'it_IT', name: 'Italian',    nativeName: 'Italiano' },
  nl: { bcp47: 'nl-NL', ogLocale: 'nl_NL', name: 'Dutch',      nativeName: 'Nederlands' },
  pt: { bcp47: 'pt-PT', ogLocale: 'pt_PT', name: 'Portuguese', nativeName: 'Português' },
};

// Mapping GeoIP → Región sugerida
export const countryToRegion: Record<string, Region> = {
  // UK + territorios
  GB: 'uk', IM: 'uk', JE: 'uk', GG: 'uk',
  // EU (todos los demás van a EU por defecto, pero explicitamos los principales)
  ES: 'eu', PT: 'eu', FR: 'eu', DE: 'eu', IT: 'eu', NL: 'eu',
  BE: 'eu', AT: 'eu', IE: 'eu', LU: 'eu', DK: 'eu', SE: 'eu', FI: 'eu',
  PL: 'eu', GR: 'eu', CZ: 'eu', HU: 'eu', RO: 'eu',
};

// Mapping GeoIP Country → Locale sugerido (basado en idioma principal del país)
export const countryToLocale: Record<string, Locale> = {
  // Hispanohablantes
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es',
  // Inglés
  GB: 'en', US: 'en', IE: 'en', AU: 'en', NZ: 'en', CA: 'en',
  // Francés
  FR: 'fr', BE: 'fr', LU: 'fr', MC: 'fr', CH: 'fr',
  // Alemán
  DE: 'de', AT: 'de', LI: 'de',
  // Italiano
  IT: 'it', SM: 'it', VA: 'it',
  // Holandés
  NL: 'nl',
  // Portugués
  PT: 'pt', BR: 'pt',
};

// Shopify language/country codes (para @inContext)
export const shopifyLanguageMap: Record<Locale, string> = {
  es: 'ES', en: 'EN', fr: 'FR', de: 'DE', it: 'IT', nl: 'NL', pt: 'PT',
};

export const shopifyCountryByRegion: Record<Region, string> = {
  eu: 'ES',
  uk: 'GB',
};

/** Slugs traducidos por sección — clave SEO crítica */
export const routeSlugs = {
  cosmetica: { es: 'cosmetica', en: 'skincare',  fr: 'cosmetiques', de: 'hautpflege',    it: 'cosmetica', nl: 'huidverzorging', pt: 'cosmetica' },
  hogar:     { es: 'hogar',     en: 'home',      fr: 'maison',      de: 'haushalt',      it: 'casa',      nl: 'huis',           pt: 'casa' },
  mascota:   { es: 'mascota',   en: 'pet',       fr: 'animaux',     de: 'haustier',      it: 'animali',   nl: 'huisdier',       pt: 'animais' },
  origen:    { es: 'origen',    en: 'origin',    fr: 'origine',     de: 'herkunft',      it: 'origine',   nl: 'herkomst',       pt: 'origem' },
  rituales:  { es: 'rituales',  en: 'rituals',   fr: 'rituels',     de: 'rituale',       it: 'rituali',   nl: 'rituelen',       pt: 'rituais' },
  blog:      { es: 'blog',      en: 'blog',      fr: 'blog',        de: 'blog',          it: 'blog',      nl: 'blog',           pt: 'blog' },
  diario:    { es: 'diario',    en: 'journal',   fr: 'journal',     de: 'tagebuch',      it: 'diario',    nl: 'dagboek',        pt: 'diario' },
  contacto:  { es: 'contacto',  en: 'contact',   fr: 'contact',     de: 'kontakt',       it: 'contatto',  nl: 'contact',        pt: 'contacto' },
} as const;

export type RouteSection = keyof typeof routeSlugs;

export function getSlug(section: RouteSection, locale: Locale): string {
  return routeSlugs[section][locale];
}

export function getCanonicalUrl(region: Region, locale: Locale, path: string = ''): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://naturaesencials.com';
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  return cleanPath ? `${base}/${region}/${locale}/${cleanPath}` : `${base}/${region}/${locale}`;
}

/**
 * Genera alternates hreflang para TODAS las combinaciones region+locale.
 * Google usa estos para ordenar qué versión mostrar según usuario.
 */
export function getAlternates(path: string = ''): Record<string, string> {
  const alternates: Record<string, string> = {};

  for (const region of regions) {
    for (const locale of regionLocales[region]) {
      const key = `${locale}-${region === 'uk' ? 'GB' : getCountryForLocale(locale)}`;
      alternates[key] = getCanonicalUrl(region, locale, path);
    }
  }

  alternates['x-default'] = getCanonicalUrl(defaultRegion, defaultLocale, path);
  return alternates;
}

/**
 * Alternates correctos para páginas con slugs distintos por idioma (rituales, productos).
 * slugsByLocale: { es: 'plenitud-300', en: 'fulfillment-300', ... }
 */
export function getLocaleSlugAlternates(
  section: string,
  slugsByLocale: Partial<Record<Locale, string>>,
  defaultSlug: string,
): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const region of regions) {
    for (const locale of regionLocales[region]) {
      const slug = slugsByLocale[locale] ?? defaultSlug;
      const key = `${locale}-${region === 'uk' ? 'GB' : getCountryForLocale(locale)}`;
      alternates[key] = getCanonicalUrl(region, locale, `${section}/${slug}`);
    }
  }
  alternates['x-default'] = getCanonicalUrl(
    defaultRegion, defaultLocale,
    `${section}/${slugsByLocale[defaultLocale] ?? defaultSlug}`,
  );
  return alternates;
}

function getCountryForLocale(locale: Locale): string {
  const map: Record<Locale, string> = {
    es: 'ES', en: 'US', fr: 'FR', de: 'DE', it: 'IT', nl: 'NL', pt: 'PT',
  };
  return map[locale];
}

export function isValidRegion(r: string): r is Region {
  return (regions as readonly string[]).includes(r);
}

export function isValidLocale(l: string): l is Locale {
  return (locales as readonly string[]).includes(l);
}

export function isLocaleAvailableInRegion(locale: Locale, region: Region): boolean {
  return regionLocales[region].includes(locale);
}
