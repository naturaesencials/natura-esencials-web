/**
 * Configuración central de Natura Esencials.
 * Single source of truth para SEO, contacto, identidad.
 */

export const siteConfig = {
  name: 'Natura Esencials',
  legalName: 'Natura Esencials',
  tagline: 'Cosmética natural y cuidado del hogar, elaborados en Marbella',

  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://naturaesencials.com',

  founded: 2019,
  origin: {
    city: 'Marbella',
    region: 'Andalucía',
    country: 'España',
    countryCode: 'ES',
    coordinates: { lat: 36.5108, lng: -4.8856 },
    postalCode: '29600',
  },

  contact: {
    email: 'hola@naturaesencials.com',
    phone: '+34 952 00 00 00',
    whatsapp: '+34 600 00 00 00',
  },

  social: {
    instagram: 'https://instagram.com/naturaesencials',
    facebook: 'https://facebook.com/naturaesencials',
    pinterest: 'https://pinterest.com/naturaesencials',
    tiktok: 'https://tiktok.com/@naturaesencials',
    linkedin: 'https://linkedin.com/company/naturaesencials',
  },

  entity: {
    name: 'Albion Wealth Services Ltd',
    address: '66 Paul Street, London EC2A 4NA, United Kingdom',
  },

  certifications: ['ISO 16128', 'Hecho en Andalucía', 'Cruelty-free'],

  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || '',
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
} as const;

export type SiteConfig = typeof siteConfig;
