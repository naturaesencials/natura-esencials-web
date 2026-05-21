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

  // === Rituales: wrong-locale slugs → correct slug for that locale (58 URLs) ===
  // DE
  { source: '/eu/de/rituales/para-ele',           destination: '/eu/de/rituales/fuer-ihn',            permanent: true },
  { source: '/eu/de/rituales/per-lei',             destination: '/eu/de/rituales/fuer-sie',            permanent: true },
  { source: '/eu/de/rituales/perfecte-douche-300', destination: '/eu/de/rituales/perfekte-dusche-300', permanent: true },
  { source: '/eu/de/rituales/perfecte-vaat',       destination: '/eu/de/rituales/perfektes-geschirr',  permanent: true },
  { source: '/eu/de/rituales/stoviglie-perfette',  destination: '/eu/de/rituales/perfektes-geschirr',  permanent: true },
  { source: '/uk/de/rituales/for-her',             destination: '/uk/de/rituales/fuer-sie',            permanent: true },
  { source: '/uk/de/rituales/per-lei',             destination: '/uk/de/rituales/fuer-sie',            permanent: true },
  // EN
  { source: '/eu/en/rituales/doccia-perfetta-300', destination: '/eu/en/rituales/perfect-shower-300',  permanent: true },
  { source: '/eu/en/rituales/perfecte-douche-300', destination: '/eu/en/rituales/perfect-shower-300',  permanent: true },
  { source: '/eu/en/rituales/perfecte-vaat',       destination: '/eu/en/rituales/perfect-dishes',      permanent: true },
  { source: '/eu/en/rituales/voor-hem',            destination: '/eu/en/rituales/for-him',             permanent: true },
  // ES
  { source: '/eu/es/rituales/carezza',             destination: '/eu/es/rituales/caricia',             permanent: true },
  { source: '/eu/es/rituales/cozinha-impecavel',   destination: '/eu/es/rituales/cocina-impecable',    permanent: true },
  { source: '/eu/es/rituales/fuer-sie',            destination: '/eu/es/rituales/para-ella',           permanent: true },
  { source: '/eu/es/rituales/hundeverwoehnung',    destination: '/eu/es/rituales/mimo-canino',         permanent: true },
  { source: '/eu/es/rituales/makelloses-bad',      destination: '/eu/es/rituales/bano-impecable',      permanent: true },
  { source: '/eu/es/rituales/perfecte-douche-300', destination: '/eu/es/rituales/ducha-perfecta-300',  permanent: true },
  { source: '/eu/es/rituales/perfecte-vaat',       destination: '/eu/es/rituales/vajilla-perfecta',    permanent: true },
  // FR
  { source: '/eu/fr/rituales/carezza',             destination: '/eu/fr/rituales/caresse',             permanent: true },
  { source: '/eu/fr/rituales/cocina-impecable',    destination: '/eu/fr/rituales/cuisine-impeccable',  permanent: true },
  { source: '/eu/fr/rituales/for-her',             destination: '/eu/fr/rituales/pour-elle',           permanent: true },
  { source: '/eu/fr/rituales/mimo-canino',         destination: '/eu/fr/rituales/cocoon-canin',        permanent: true },
  { source: '/eu/fr/rituales/pampered-pup',        destination: '/eu/fr/rituales/cocoon-canin',        permanent: true },
  { source: '/eu/fr/rituales/para-el',             destination: '/eu/fr/rituales/pour-lui',            permanent: true },
  { source: '/eu/fr/rituales/per-lui',             destination: '/eu/fr/rituales/pour-lui',            permanent: true },
  { source: '/eu/fr/rituales/perfect-shower-300',  destination: '/eu/fr/rituales/douche-parfaite-300', permanent: true },
  { source: '/eu/fr/rituales/rendimento-300',      destination: '/eu/fr/rituales/performance-300',     permanent: true },
  { source: '/eu/fr/rituales/verwende-hond',       destination: '/eu/fr/rituales/cocoon-canin',        permanent: true },
  // IT
  { source: '/eu/it/rituales/coccola-canina',      destination: '/eu/it/rituales/coccole-canine',      permanent: true },
  { source: '/eu/it/rituales/ducha-perfecta-300',  destination: '/eu/it/rituales/doccia-perfetta-300', permanent: true },
  { source: '/eu/it/rituales/fuelle-300',          destination: '/eu/it/rituales/pienezza-300',        permanent: true },
  { source: '/eu/it/rituales/fuer-sie',            destination: '/eu/it/rituales/per-lei',             permanent: true },
  { source: '/eu/it/rituales/makellose-kueche',    destination: '/eu/it/rituales/cucina-impeccabile',  permanent: true },
  { source: '/eu/it/rituales/para-el',             destination: '/eu/it/rituales/per-lui',             permanent: true },
  { source: '/eu/it/rituales/perfect-shower-300',  destination: '/eu/it/rituales/doccia-perfetta-300', permanent: true },
  { source: '/eu/it/rituales/perfekte-dusche-300', destination: '/eu/it/rituales/doccia-perfetta-300', permanent: true },
  { source: '/eu/it/rituales/pour-elle',           destination: '/eu/it/rituales/per-lei',             permanent: true },
  { source: '/eu/it/rituales/zen-katze',           destination: '/eu/it/rituales/gatto-zen',           permanent: true },
  // NL
  { source: '/eu/nl/rituales/carezza',             destination: '/eu/nl/rituales/liefkozing',          permanent: true },
  { source: '/eu/nl/rituales/chat-zen',            destination: '/eu/nl/rituales/zen-kat',             permanent: true },
  { source: '/eu/nl/rituales/doccia-perfetta-300', destination: '/eu/nl/rituales/perfecte-douche-300', permanent: true },
  { source: '/eu/nl/rituales/for-her',             destination: '/eu/nl/rituales/voor-haar',           permanent: true },
  { source: '/eu/nl/rituales/for-him',             destination: '/eu/nl/rituales/voor-hem',            permanent: true },
  { source: '/eu/nl/rituales/gato-zen',            destination: '/eu/nl/rituales/zen-kat',             permanent: true },
  { source: '/eu/nl/rituales/gatto-zen',           destination: '/eu/nl/rituales/zen-kat',             permanent: true },
  { source: '/eu/nl/rituales/hondenverzorging',    destination: '/eu/nl/rituales/verwende-hond',       permanent: true },
  { source: '/eu/nl/rituales/impeccable-kitchen',  destination: '/eu/nl/rituales/onberispelijke-keuken', permanent: true },
  { source: '/eu/nl/rituales/perfect-servies',     destination: '/eu/nl/rituales/perfecte-vaat',       permanent: true },
  { source: '/eu/nl/rituales/plenitude-300',       destination: '/eu/nl/rituales/volheid-300',         permanent: true },
  { source: '/eu/nl/rituales/refuge',              destination: '/eu/nl/rituales/toevlucht',           permanent: true },
  { source: '/eu/nl/rituales/streling',            destination: '/eu/nl/rituales/liefkozing',          permanent: true },
  { source: '/eu/nl/rituales/vaisselle-parfaite',  destination: '/eu/nl/rituales/perfecte-vaat',       permanent: true },
  { source: '/eu/nl/rituales/zuflucht',            destination: '/eu/nl/rituales/toevlucht',           permanent: true },
  // PT
  { source: '/eu/pt/rituales/cuisine-impeccable',  destination: '/eu/pt/rituales/cozinha-impecavel',   permanent: true },
  { source: '/eu/pt/rituales/hundeverwoehnung',    destination: '/eu/pt/rituales/mimo-canino',         permanent: true },
  { source: '/eu/pt/rituales/louca-perfeita',      destination: '/eu/pt/rituales/loica-perfeita',      permanent: true },
  { source: '/eu/pt/rituales/performance-300',     destination: '/eu/pt/rituales/desempenho-300',      permanent: true },
  { source: '/uk/pt/rituales/per-lei',             destination: '/uk/pt/rituales/para-ela',            permanent: true },

  // === Missing /collections/ → category pages ===
  { source: '/collections/cuidado-animal-natural-champu-y-limpiadores-natura-esencials', destination: '/eu/es/mascota', permanent: true },
  { source: '/collections/cuidado-de-la-piel-natural-y-artesanal-natura-esencials',      destination: '/eu/es/cosmetica', permanent: true },
  { source: '/collections/cuidado-del-cabello-natural-champu-2-en-1-y-acondicionador-natura-esencials', destination: '/eu/es/cosmetica', permanent: true },
  { source: '/collections/cuidado-deportivo-total-body-wash-cuerpo-y-cabello-natura-esencials', destination: '/eu/es/cosmetica', permanent: true },
  { source: '/collections/cuidado-deportivo-total-body-wash-cuerpo-y-cabello-natura-esencials/:rest*', destination: '/eu/es/cosmetica', permanent: true },
  { source: '/collections/cuidado-textil-natural-natura-esencials',                      destination: '/eu/es/hogar', permanent: true },
  { source: '/collections/frontpage',                                                    destination: '/eu/es', permanent: true },
  { source: '/collections/limpieza-de-hogar-natural-natura-esencials',                   destination: '/eu/es/hogar', permanent: true },
  { source: '/collections/black-friday-en-natura-esencials',                             destination: '/eu/es', permanent: true },
  { source: '/collections/black-friday-en-natura-esencials/:rest*',                      destination: '/eu/es', permanent: true },
  { source: '/collections/gatos',                                                        destination: '/eu/es/mascota', permanent: true },
  { source: '/collections/hogar-ambiente',                                               destination: '/eu/es/hogar', permanent: true },
  { source: '/collections/hogar-ropa',                                                   destination: '/eu/es/hogar', permanent: true },
  { source: '/collections/mimos-para-el-bebe',                                           destination: '/eu/es/cosmetica', permanent: true },
  { source: '/collections/navidad-natura-esencials',                                     destination: '/eu/es', permanent: true },
  { source: '/collections/perro',                                                        destination: '/eu/es/mascota', permanent: true },
  { source: '/collections/rituales-para-el',                                             destination: '/eu/es/rituales/para-el', permanent: true },
  { source: '/collections/rituales-para-ella',                                           destination: '/eu/es/rituales/para-ella', permanent: true },
  { source: '/collections/packs-natura-esencials',                                       destination: '/eu/es/rituales', permanent: true },
  { source: '/collections/vendors',                                                      destination: '/eu/es', permanent: true },

  // === Missing /products/ → closest live page ===
  // Discontinued products (seasonal, kids, Black Friday)
  { source: '/products/champu-2-en-1-navidad-edicion-limitada-natura-esencials',         destination: '/eu/es/cosmetica/champu-2-en-1', permanent: true },
  { source: '/products/jabon-manos-y-cuerpo-navidad-edicion-limitada-natura-esencials',  destination: '/eu/es/cosmetica/jabon-manos-y-cuerpo', permanent: true },
  { source: '/products/lavavajillas-manual-navidad-edicion-navidad-natura-esencials',    destination: '/eu/es/hogar/lavavajillas-manual', permanent: true },
  { source: '/products/limpiasuelos-navidad-edicion-especial-natura-esencials',          destination: '/eu/es/hogar/limpiasuelos', permanent: true },
  { source: '/products/pack-cosmetica-black-friday',                                     destination: '/eu/es/cosmetica', permanent: true },
  { source: '/products/pack-mascota-perro-black-friday',                                 destination: '/eu/es/mascota', permanent: true },
  { source: '/products/pack-mascotas-gato',                                              destination: '/eu/es/mascota', permanent: true },
  { source: '/products/pack-textil-black-friday',                                        destination: '/eu/es/hogar', permanent: true },
  { source: '/products/black-friday-pack-hogar',                                         destination: '/eu/es/hogar', permanent: true },
  { source: '/products/pack-deportivo-black-friday',                                     destination: '/eu/es/rituales/rendimiento-300', permanent: true },
  { source: '/products/body-milk-kids',                                                  destination: '/eu/es/cosmetica/body-milk', permanent: true },
  { source: '/products/champu-kids',                                                     destination: '/eu/es/cosmetica/champu-2-en-1', permanent: true },
  { source: '/products/gel-champu-kids',                                                 destination: '/eu/es/cosmetica/champu-2-en-1', permanent: true },
  // Discontinued fragrance / massage oils
  { source: '/products/aceite-aromatico-de-masaje-bergamota-lavanda',                    destination: '/eu/es/cosmetica', permanent: true },
  { source: '/products/aceite-aromatico-de-masaje-eucalipto-lavanda',                    destination: '/eu/es/cosmetica', permanent: true },
  { source: '/products/aceite-aromatico-de-masaje-lavanda-cedro',                        destination: '/eu/es/cosmetica', permanent: true },
  { source: '/products/aceite-aromatico-de-masaje-mandarina-lavanda',                    destination: '/eu/es/cosmetica', permanent: true },
  { source: '/products/aceite-aromatico-de-masaje-naranja-vainilla',                     destination: '/eu/es/cosmetica', permanent: true },
  { source: '/products/ambientador-sin-alcohol-lavanda-herbal',                          destination: '/eu/es/hogar', permanent: true },
  { source: '/products/exfoliante-corporal-herbal',                                      destination: '/eu/es/cosmetica', permanent: true },
  // Discontinued men's products
  { source: '/products/balsamo-aftershave-man',                                          destination: '/eu/es/cosmetica', permanent: true },
  { source: '/products/gel-de-afeitado-man',                                             destination: '/eu/es/cosmetica', permanent: true },
  // Products with old slug format (aroma frutal line)
  { source: '/products/acondicionador-aroma-frutal',                                     destination: '/eu/es/cosmetica/acondicionador-capilar', permanent: true },
  { source: '/products/body-milk-aroma-frutal',                                          destination: '/eu/es/cosmetica/body-milk', permanent: true },
  { source: '/products/champu-2-en-1-aroma-frutal',                                      destination: '/eu/es/cosmetica/champu-2-en-1', permanent: true },
  { source: '/products/champu-man',                                                       destination: '/eu/es/cosmetica/champu-hombre', permanent: true },
  { source: '/products/ritual-',                                                          destination: '/eu/es/rituales', permanent: true },

  // === /buscar?q= search template URLs → homepage ===
  // These were generated by Google Tag Manager's default search template
  // {search_term_string} and are not real pages
  { source: '/eu/pt/buscar',      destination: '/eu/pt', permanent: true },
  { source: '/eu/en/buscar',      destination: '/eu/en', permanent: true },
  { source: '/uk/nl/buscar',      destination: '/uk/en', permanent: true },
  { source: '/uk/es/buscar',      destination: '/uk/en', permanent: true },
  { source: '/uk/pt/buscar',      destination: '/uk/en', permanent: true },
  { source: '/uk/fr/buscar',      destination: '/uk/en', permanent: true },

];
