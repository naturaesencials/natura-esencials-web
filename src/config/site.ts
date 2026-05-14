export const siteConfig = {
  name: 'Natura Esencials',
  legalName: 'Natura Esencials Products, S.L.',
  tagline: 'Cosmética natural y cuidado del hogar, elaborados en Marbella',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.naturaesencials.com',
  founded: 2021,
  origin: {
    city: 'Marbella', region: 'Andalucía', country: 'España',
    countryCode: 'ES',
    coordinates: { lat: 36.5108, lng: -4.8856 },
    postalCode: '29601',
  },
  contact: {
    email: 'contacto@naturaesencials.com',
    phone: '+34 625 103 171',
    whatsapp: '+34625103171',
  },
  social: {
    instagram: 'https://instagram.com/naturaesencials',
    facebook: 'https://facebook.com/naturaesencials',
    pinterest: 'https://pinterest.com/naturaesencials',
    tiktok: 'https://tiktok.com/@naturaesencials',
    linkedin: 'https://linkedin.com/company/naturaesencials',
  },
  entity: {
    name: 'Natura Esencials Products, S.L.',
    address: 'Málaga, Andalucía, España',
  },
  certifications: ['ISO 16128', 'Artesanía Hecha en Andalucía', 'Cruelty-free'],
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || '',
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
} as const;

export type SiteConfig = typeof siteConfig;
