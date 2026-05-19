// Legacy Shopify URL → Next.js URL 301 redirects.
// Pre-Next.js, naturaesencials.com ran on Shopify; Google indexed
// /collections/..., /products/..., /pages/... — they currently 404
// after the platform migration. This file restores them as 301s to
// their closest live equivalent on the Next.js site.
//
// Destination locale is Spanish ('es') by design — it is the canonical
// form for Google. Users from other locales land in Spanish and use
// the in-page language selector. Doing this avoids 'redirect chain'
// SEO penalty that would result from per-user locale routing.
//
// Auto-generated. To regenerate after products.json changes, run the
// script in scripts/build-legacy-redirects.py.

export const legacyShopifyRedirects = [
  // === Pages → static routes ===
  { source: '/pages/sobre-natura-esencials', destination: '/eu/es/origen', permanent: true },
  { source: '/pages/sobre-nosotros', destination: '/eu/es/origen', permanent: true },
  { source: '/pages/about', destination: '/eu/es/origen', permanent: true },
  { source: '/pages/contact', destination: '/eu/es/contacto', permanent: true },
  { source: '/pages/contacto', destination: '/eu/es/contacto', permanent: true },
  { source: '/pages/faq', destination: '/eu/es/faq', permanent: true },
  { source: '/pages/preguntas-frecuentes', destination: '/eu/es/faq', permanent: true },
  { source: '/pages/blog', destination: '/eu/es/blog', permanent: true },
  { source: '/pages/diario', destination: '/eu/es/blog', permanent: true },
  { source: '/pages/politica-de-privacidad', destination: '/eu/es/privacidad', permanent: true },
  { source: '/pages/politica-de-cookies', destination: '/eu/es/cookies', permanent: true },
  { source: '/pages/terminos-y-condiciones', destination: '/eu/es/terminos', permanent: true },
  { source: '/pages/envios-y-devoluciones', destination: '/eu/es/faq', permanent: true },
  // === Collections → category pages ===
  { source: '/collections/cosmetica', destination: '/eu/es/cosmetica', permanent: true },
  { source: '/collections/cosmetica-mujer', destination: '/eu/es/cosmetica', permanent: true },
  { source: '/collections/cosmetica-hombre', destination: '/eu/es/cosmetica', permanent: true },
  { source: '/collections/cosmetica-basica', destination: '/eu/es/cosmetica', permanent: true },
  { source: '/collections/esenciales-diarios', destination: '/eu/es/cosmetica', permanent: true },
  { source: '/collections/hogar', destination: '/eu/es/hogar', permanent: true },
  { source: '/collections/hogar-cocina', destination: '/eu/es/hogar', permanent: true },
  { source: '/collections/hogar-limpieza-general', destination: '/eu/es/hogar', permanent: true },
  { source: '/collections/hogar-bano', destination: '/eu/es/hogar', permanent: true },
  { source: '/collections/hogar-textil', destination: '/eu/es/hogar', permanent: true },
  { source: '/collections/mascota', destination: '/eu/es/mascota', permanent: true },
  { source: '/collections/mascota-perros', destination: '/eu/es/mascota', permanent: true },
  { source: '/collections/mascota-gatos', destination: '/eu/es/mascota', permanent: true },
  { source: '/collections/packs-cosmetica', destination: '/eu/es/rituales', permanent: true },
  { source: '/collections/packs-hogar', destination: '/eu/es/rituales', permanent: true },
  { source: '/collections/packs-mascota', destination: '/eu/es/rituales', permanent: true },
  { source: '/collections/packs-natura-esencials', destination: '/eu/es/rituales', permanent: true },
  { source: '/collections/rituales', destination: '/eu/es/rituales', permanent: true },
  { source: '/collections/all', destination: '/eu/es', permanent: true },
  { source: '/collections/vendors', destination: '/eu/es', permanent: true },
  { source: '/collections', destination: '/eu/es', permanent: true },
  // === Products → product pages or category fallback ===
  { source: '/products/champu-2-en-1-natural-para-cabello-normal-natura-esencials', destination: '/eu/es/cosmetica/champu-2-en-1', permanent: true },
  { source: '/products/acondicionador-natural-natura-esencials', destination: '/eu/es/cosmetica/acondicionador-capilar', permanent: true },
  { source: '/products/jabon-natural-por-saponificacion-con-aceite-de-oliva-virgen-extra-natura-esencials', destination: '/eu/es/cosmetica/jabon-manos-y-cuerpo', permanent: true },
  { source: '/products/body-milk-natural-artesanal-natura-esencials', destination: '/eu/es/cosmetica/body-milk', permanent: true },
  { source: '/products/total-body-wash-natural-para-cuerpo-y-cabello-natura-esencials', destination: '/eu/es/cosmetica/total-body-wash', permanent: true },
  { source: '/products/hombre-champu-2-en-1-natura-esencials', destination: '/eu/es/cosmetica/champu-hombre', permanent: true },
  { source: '/products/hombre-acondicionador-natura-esencials', destination: '/eu/es/cosmetica/acondicionador-hombre', permanent: true },
  { source: '/products/hombre-gel-manos-y-cuerpo-natura-esencials', destination: '/eu/es/cosmetica/gel-manos-y-cuerpo-hombre', permanent: true },
  { source: '/products/hombre-body-milk-natura-esencials', destination: '/eu/es/cosmetica/body-milk-hombre', permanent: true },
  { source: '/products/gel-afeitado-hombre', destination: '/eu/es/cosmetica', permanent: true },
  { source: '/products/balsamo-aftershave', destination: '/eu/es/cosmetica', permanent: true },
  { source: '/products/exfoliante-facial-hombre', destination: '/eu/es/cosmetica', permanent: true },
  { source: '/products/serum-antiojeras-hombre', destination: '/eu/es/cosmetica', permanent: true },
  { source: '/products/mujer-champu-2-en-1-natura-esencials', destination: '/eu/es/cosmetica/champu-mujer', permanent: true },
  { source: '/products/mujer-acondicionador-natura-esencials', destination: '/eu/es/cosmetica/acondicionador-mujer', permanent: true },
  { source: '/products/mujer-gel-manos-y-cuerpo-natura-esencials', destination: '/eu/es/cosmetica/gel-manos-y-cuerpo-mujer', permanent: true },
  { source: '/products/mujer-body-milk-natura-esencials', destination: '/eu/es/cosmetica/body-milk-mujer', permanent: true },
  { source: '/products/agua-micelar', destination: '/eu/es/cosmetica', permanent: true },
  { source: '/products/gel-afeitado-mujer', destination: '/eu/es/cosmetica', permanent: true },
  { source: '/products/exfoliante-facial-mujer', destination: '/eu/es/cosmetica', permanent: true },
  { source: '/products/serum-antiojeras-mujer', destination: '/eu/es/cosmetica', permanent: true },
  { source: '/products/detergente-para-ropa-natural-natura-esencials', destination: '/eu/es/hogar/detergente-ropa', permanent: true },
  { source: '/products/suavizante-para-ropa-natural-natura-esencials', destination: '/eu/es/hogar/suavizante-ropa', permanent: true },
  { source: '/products/lavavajillas-manual-natural-natura-esencials', destination: '/eu/es/hogar/lavavajillas-manual', permanent: true },
  { source: '/products/detergente-para-maquina-lavavajillas-natural-natura-esencials', destination: '/eu/es/hogar/lavavajillas-maquina', permanent: true },
  { source: '/products/abrillantador-para-maquina-lavavajillas-natural-natura-esencials', destination: '/eu/es/hogar/abrillantador-lavavajillas', permanent: true },
  { source: '/products/limpiasuelos-natural-natura-esencials', destination: '/eu/es/hogar/limpiasuelos', permanent: true },
  { source: '/products/limpiador-de-banos-natural-natura-esencials', destination: '/eu/es/hogar/limpiador-banos', permanent: true },
  { source: '/products/desengrasante-natural-para-cocina-y-superficies-natura-esencials', destination: '/eu/es/hogar/desengrasante', permanent: true },
  { source: '/products/limpiador-multisuperficies-natural-natura-esencials', destination: '/eu/es/hogar/limpiador-multisuperficies', permanent: true },
  { source: '/products/limpiacristales-natural-natura-esencials', destination: '/eu/es/hogar/limpiacristales', permanent: true },
  { source: '/products/champu-para-perros-natural-natura-esencials', destination: '/eu/es/mascota/champu-pet-repair-argan-perros', permanent: true },
  { source: '/products/champu-para-gatos-natural-natura-esencials', destination: '/eu/es/mascota/champu-natural-gatos', permanent: true },
  { source: '/products/limpiador-de-oidos-para-perros-y-gatos-natura-esencials', destination: '/eu/es/mascota/limpiador-oidos-mascotas', permanent: true },
  { source: '/products/limpiador-de-ojos-para-perros-y-gatos-natura-esencials', destination: '/eu/es/mascota/limpiador-ojos-mascotas', permanent: true },
  // === Rituales (bundles) ===
  { source: '/products/ritual-plenitud-300', destination: '/eu/es/rituales/plenitud-300', permanent: true },
  { source: '/products/ritual-plenitud-1-ltr', destination: '/eu/es/rituales', permanent: true },
  { source: '/products/pack-esenciales-diarios', destination: '/eu/es/rituales/ducha-perfecta-300', permanent: true },
  { source: '/products/ritual-ducha-perfecta-1-ltr', destination: '/eu/es/rituales', permanent: true },
  { source: '/products/pack-deportivo-higiene-cuidado', destination: '/eu/es/rituales/rendimiento-300', permanent: true },
  { source: '/products/ritual-rendimiento-1ltr', destination: '/eu/es/rituales', permanent: true },
  { source: '/products/ritual-para-ella-300-ml', destination: '/eu/es/rituales/para-ella', permanent: true },
  { source: '/products/ritual-para-el-300-ml', destination: '/eu/es/rituales/para-el', permanent: true },
  { source: '/products/pack-cuidado-lavavajilla', destination: '/eu/es/rituales/vajilla-perfecta', permanent: true },
  { source: '/products/pack-bano-esencial', destination: '/eu/es/rituales/bano-impecable', permanent: true },
  { source: '/products/pack-cocina-impecable', destination: '/eu/es/rituales/cocina-impecable', permanent: true },
  { source: '/products/pack-colada-esencial', destination: '/eu/es/rituales/caricia', permanent: true },
  { source: '/products/ritual-refugio', destination: '/eu/es/rituales/refugio', permanent: true },
  { source: '/products/pack-higiene-basica-gatos', destination: '/eu/es/rituales/gato-zen', permanent: true },
  { source: '/products/pack-higiene-basica-perros', destination: '/eu/es/rituales/mimo-canino', permanent: true },

  // === Missing product slug (no -hombre/-mujer suffix) ===
  // Google indexed this from internal Shopify shorthand; route it to the category.
  { source: '/products/gel-afeitado', destination: '/eu/es/cosmetica', permanent: true },

  // === Shopify blog legacy URLs ===
  // Pre-migration the blog lived at /blogs/news/<slug>. Without these redirects the
  // middleware was adding a locale prefix (/eu/en/blogs/news/<slug>) which 404s.
  { source: '/blogs', destination: '/eu/es/blog', permanent: true },
  { source: '/blogs/news', destination: '/eu/es/blog', permanent: true },
  { source: '/blogs/news.atom', destination: '/eu/es/blog', permanent: true },
  { source: '/blogs/news/:slug*', destination: '/eu/es/blog', permanent: true },
  { source: '/blogs/:path*', destination: '/eu/es/blog', permanent: true },

  // === Shopify default app routes ===
  // These exist on every Shopify storefront and Google may have indexed them
  // from the old version. We route to the home/category so Google can update
  // its record and stop reporting them as 404s. Live app routes use Spanish
  // slugs (/eu/es/carrito, /eu/es/buscar, /eu/es/cuenta) which are robots-blocked.
  { source: '/cart', destination: '/eu/es', permanent: true },
  { source: '/cart/:rest*', destination: '/eu/es', permanent: true },
  { source: '/checkout', destination: '/eu/es', permanent: true },
  { source: '/checkout/:rest*', destination: '/eu/es', permanent: true },
  { source: '/search', destination: '/eu/es', permanent: true },
  { source: '/account', destination: '/eu/es', permanent: true },
  { source: '/account/:rest*', destination: '/eu/es', permanent: true },
  { source: '/tags/:slug*', destination: '/eu/es', permanent: true },

  // === Shopify policy / legal pages ===
  { source: '/policies/privacy-policy', destination: '/eu/es/privacidad', permanent: true },
  { source: '/policies/refund-policy', destination: '/eu/es/faq', permanent: true },
  { source: '/policies/shipping-policy', destination: '/eu/es/faq', permanent: true },
  { source: '/policies/terms-of-service', destination: '/eu/es/terminos', permanent: true },
  { source: '/policies/legal-notice', destination: '/eu/es/terminos', permanent: true },
  { source: '/policies/:slug*', destination: '/eu/es/terminos', permanent: true },
];
