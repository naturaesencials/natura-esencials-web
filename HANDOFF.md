# 🌿 Natura Esencials — HANDOFF para Claude (Sesión nueva)

> Documento de continuidad para sesiones de trabajo autónomo con Claude.
> Actualizado: 18/05/2026 — Sesión 12 SEO completada.

---

## 🔑 CREDENCIALES Y ACCESOS

### GitHub (acción directa en repo)
```
Repo:   https://github.com/naturaesencials/natura-esencials-web
Branch: main
PAT:    [REDACTED_PAT_ASK_CARLOS]
```
**Cómo clonar:**
```bash
git clone https://[REDACTED_PAT_ASK_CARLOS]@github.com/naturaesencials/natura-esencials-web.git
```

### Vercel (deploy automático desde main)
- Proyecto: `natura-esencials-web` en cuenta de Carlos
- Deploy: automático en cada push a `main`
- URL producción: `https://www.naturaesencials.com`
- Variable crítica: `NEXT_PUBLIC_SITE_URL=https://www.naturaesencials.com`

### Shopify (tienda)
- URL tienda: `https://tienda.naturaesencials.com`
- Backend: `https://bdchtj-1p.myshopify.com` (no usar en links públicos)
- Regla: checkout siempre a `tienda.naturaesencials.com`, nunca al dominio myshopify

### Seobility (SEO monitoring)
- URL: `https://app.seobility.net`
- Dominio monitoreado: `www.naturaesencials.com`
- Sitemap manual a añadir en settings: `https://www.naturaesencials.com/sitemap.xml`
- Re-crawl: lanzar después de cada sesión importante de cambios

---

## 🏗️ ARQUITECTURA DEL PROYECTO

### Stack técnico
```
Next.js 14.2 App Router
next-intl (7 locales: es/en/fr/de/it/nl/pt)
TypeScript + Tailwind CSS
Vercel (deploy) + Supabase (reviews API)
761 páginas estáticas generadas en build
```

### Estructura de rutas
```
/[region]/[locale]/                    → homepage
/[region]/[locale]/cosmetica/          → catálogo cosmética
/[region]/[locale]/cosmetica/[slug]    → ficha producto cosmética
/[region]/[locale]/hogar/              → catálogo hogar
/[region]/[locale]/hogar/[slug]        → ficha producto hogar
/[region]/[locale]/mascota/            → catálogo mascotas
/[region]/[locale]/mascota/[slug]      → ficha producto mascota
/[region]/[locale]/rituales/           → catálogo rituales/bundles
/[region]/[locale]/rituales/[slug]     → ficha ritual/bundle
/[region]/[locale]/blog/               → listado blog
/[region]/[locale]/blog/[slug]         → artículo blog
/[region]/[locale]/origen/             → historia marca
/[region]/[locale]/faq/                → preguntas frecuentes
/[region]/[locale]/contacto/           → contacto
Regiones activas: eu (UK bloqueado/coming soon)
```

### Ficheros de datos clave
```
src/data/products.json     → 35 productos (27 visibles)
src/data/bundles.json      → 15 rituales/bundles (12 visibles)
src/data/rituales.ts       → landing page rituales (DEBE coincidir con bundles.json)
src/data/posts.ts          → artículos blog × 7 idiomas
src/data/index.ts          → transformación datos: products/bundles → translations[]
messages/[locale].json     → traducciones UI (es/en/fr/de/it/nl/pt)
src/config/site.ts         → URLs, contacto, redes sociales
src/lib/catalog/product-page-factory.tsx → metadata SEO de fichas de producto
src/lib/seo/metadata.ts    → buildMetadata() — genera <head> SEO
src/app/sitemap.ts         → sitemap.xml dinámico (330 URLs)
src/app/robots.ts          → robots.txt con Sitemap: referencia
```

### Componentes principales
```
src/components/catalog/ProductDetail.tsx  → ficha de producto (H1, contenido)
src/components/catalog/ProductCard.tsx    → tarjeta en catálogo
src/components/catalog/CatalogGrid.tsx    → grid con filtros (client component)
src/components/reviews/ReviewsWidget.tsx  → widget de reseñas Judge.me
src/components/home/Hero.tsx              → hero homepage
src/components/home/BlogPreview.tsx       → preview blog en homepage
src/components/home/Newsletter.tsx        → sección newsletter
src/components/home/Origen.tsx            → sección origen
```

---

## 🤖 FORMA DE TRABAJO AUTÓNOMO (instrucciones para Claude)

### Workflow estándar para cada sesión
```bash
# 1. Clonar repo en /home/claude/
cd /home/claude
git clone https://[REDACTED_PAT_ASK_CARLOS]@github.com/naturaesencials/natura-esencials-web.git
cd natura-esencials-web

# 2. Instalar dependencias
npm install

# 3. Leer este HANDOFF.md + analizar PDFs/reportes del usuario
# 4. Hacer todos los cambios necesarios
# 5. SIEMPRE hacer build antes de push
npm run build
# → debe mostrar: ✓ Compiled successfully, ✓ Generating static pages (761/761)
# → CERO errores, CERO warnings de TypeScript

# 6. Commit atómico con mensaje descriptivo
git config user.email "seo-bot@naturaesencials.com"
git config user.name "SEO Bot"
git add -A
git commit -m "fix(area): descripción clara de los cambios"

# 7. Push directo a main
git push origin main
```

### Regla de autonomía
Claude trabaja directamente sobre el código sin pedir permiso para cada cambio. El usuario confía en que Claude identifica los problemas, los resuelve y hace push. Si hay dudas sobre cambios con alto impacto visual/funcional, mencionar en el resumen final pero proceder igualmente.

---

## 📏 REGLAS SEO OBLIGATORIAS (nunca violar)

```
1. TODO texto visible en 7 locales (es/en/fr/de/it/nl/pt), NUNCA hardcodear español
2. rituales.ts y bundles.json DEBEN tener los mismos nombres de rituales
3. Headings: un H1/página, H1→H2→H3 sin saltos, footer/nav usan <p> no <h>
4. H1 conciso (max ~40 chars), descripción en <p> SEPARADO — nunca <span> dentro de <h1>
5. Checkout = tienda.naturaesencials.com (nunca bdchtj-1p.myshopify.com)
6. Meta titles: max 44 chars product-specific + " · Natura Esencials" = ~63 chars total
7. Meta titles: sin word repetition (no repetir nombre del producto en subtitle)
8. benefits[] = plain strings SIEMPRE (nunca objetos {icon, text})
9. Toda <Image> o <img> necesita alt descriptivo (nunca alt="" excepto aria-hidden deco)
10. PT nunca palabras españolas: ropa→roupa, diario→diário, propiedades→propriedades
11. Anchor texts en links: únicos y descriptivos (no "leer →" genérico para todos)
12. Links externos a Shopify/reviews: rel="nofollow noopener noreferrer"
13. H1 keywords DEBEN aparecer en body text (en <p>, no sólo en el H1)
14. buildMetadata() en todas las páginas — nunca sin metadata
15. INCI: sólo de fichas técnicas reales, nunca inventar (marcar inciPendingVerification)
16. npm run build con 0 errores ANTES de cada push — regla absoluta
```

---

## 📊 ESTADO SEO — HISTÓRICO DE SESIONES

### Puntuación Seobility (evolución)
```
Sesión inicial (ene 2026):  ~1.800 problemas totales
Sesiones 1-4 (hasta may 16): mejora significativa
Sesión 5 (may 17):
  - Tech & Meta:  88% (+9%)   ← mejorado
  - Structure:    54% (-40%)  ← REGRESIÓN detectada y corregida
  - Content:      52% (-10%)  ← REGRESIÓN detectada y corregida
  Overall: 65%
Sesión 6 (may 17) — reporte PDF recibido:
  - Tech & Meta:  92% (+4%)   ← mejorado
  - Structure:    89% (+36%)  ← gran salto
  - Content:      66% (+14%)  ← mejorado
  Overall: 82% (+17%)
  Issues principales: 209 H1 too short, 35 meta titles, 7 home headings
Sesión 12 (may 18) — último crawl recibido:
  - Tech & Meta:  99%   ← excelente
  - Structure:    78% (+5%) ← en mejora
  - Content:      72%   ← en mejora
  Overall: 83%
  Issues corregidos: 33 identical anchor texts, 40 anchor too long DE
  Resultado esperado próximo crawl: Structure ≥85%, anchor issues → 0
```

### Causa raíz de regresiones (sesión 4→5)
Los cambios de sesión 4 pusieron subtítulos **dentro** de las etiquetas `<h1>`:
```jsx
// MAL — genera H1 de 170-200 chars, palabras del span no aparecen en <p>
<h1>
  Cosmética artesanal
  <span>Cabello, cuerpo, rostro y afeitado...</span>
</h1>

// BIEN — H1 conciso + <p> separado
<h1>Cosmética artesanal</h1>
<p>Cabello, cuerpo, rostro y afeitado en rituales sensoriales...</p>
```
Esto afectó: ProductDetail.tsx, rituales/[slug], cosmetica, hogar, mascota, rituales, contacto.

---

## ✅ FIXES APLICADOS (sesión 5) — 3 commits

### Commit 1: `2b228f1` — Regresiones principales
| Fichero | Fix |
|---------|-----|
| `ProductDetail.tsx` | Subtitle `<span>` → `<p>` fuera del H1 (245 fichas × 7 locales) |
| `rituales/[slug]/page.tsx` | Mismo fix para bundles |
| `cosmetica/page.tsx` | H1 limpio + `<p>` descripción |
| `hogar/page.tsx` | H1 limpio + `<p>` descripción |
| `mascota/page.tsx` | H1 limpio + `<p>` descripción |
| `rituales/page.tsx` | H1 limpio + `<p>` descripción expandida (>100 chars) |
| `contacto/page.tsx` | H1 limpio + meta title/desc localizados |
| `faq/page.tsx` | H1 descriptivo largo para de/it/nl (elimina "too short") |
| `product-page-factory.tsx` | shortDescription en títulos, sin word repetition, límite 44 chars |
| `blog/page.tsx` | generateMetadata localizado + "Leer →" → aria-label único |
| `blog/[slug]/page.tsx` | Back-label localizado (← Diário / ← Tagebuch) |
| `ReviewsWidget.tsx` | `rel="nofollow"` + `aria-label` único en review links |
| `rituales/page.tsx` | "Ver ritual →" traducido × 7 idiomas |
| `messages/*.json` | Hero lede incluye verbo "cuidar/pflegen/caring" |
| `Newsletter.tsx` | Alt descriptivo imagen |
| `Origen.tsx` | Alt descriptivo imagen |
| `Popup.tsx` | Alt descriptivo imagen |
| `products.json` | Meta desc única PT condicionador-mulher |

### Commit 2: `52a9892` — Typos PT
- `acondicionador-capilar[pt].benefits` → traducción PT real
- `limpiador-oidos-mascotas[pt].benefits` → traducción PT real

### Commit 3: `aae515b` — Consistencia H1-body
- `messages/*.json` catalogPages.{cosmetica,hogar,mascota}.desc → empieza con keyword del H1
- `blog/page.tsx` → H1 labels más descriptivos ("...de cosmética natural")
- `layout.tsx` → sitemap en alternates metadata (para detección Seobility)

---

## ✅ FIXES APLICADOS (sesión 6) — 1 commit

| Fichero | Fix |
|---------|-----|
| `bundles.json` | 109 campos subtitle/story expandidos a ≥100 chars (12 rituales × 7 locales) |
| `bundles.json` | story de ritual-refugio[es] creada (estaba vacía) |
| `ProductDetail.tsx` | aria-label en complement cards (fix anchor text largo) |
| `ProductDetail.tsx` | H1 + ` · {h1Qualifier}` por locale → H1 ≥20 chars en todos los productos |
| `rituales/[slug]/page.tsx` | H1: space fix entre nameMain/nameAccent + qualifier appended |
| `rituales/page.tsx` | pageTitle extendidos a ≥20 chars (7 idiomas) |
| `messages/*.json` | catalogPages title/accent extendidos a ≥20 chars (cosmetica/hogar/mascota × 7) |
| `messages/*.json` | h1Qualifier añadido por línea y locale |
| `messages/fr.json` | homeTitle acortado: "Cosmétique artisanale et maison naturelle" (41 chars) |
| `products.json` | limpiasuelos shortDesc: 6 locales con texto en español → traducido correctamente |
| `products.json` | body-milk/abrillantador/jabon/champu-gatos/limpiador-banos: word repetition fixed (25 fields) |
| `product-page-factory.tsx` | word repetition detection fortalecida (nameWords contains check) |
| `product-page-factory.tsx` | truncation limit 44→40 chars (pixel safety en Seobility) |
| `posts.ts` | Todos los blog titles acortados a ≤42 chars (18 titles × 2 posts + 2 for ISO) |

---

## 🔴 PROBLEMAS PENDIENTES (a resolver en próxima sesión)

## ✅ FIXES APLICADOS (sesión 7) — 1 commit

| Fichero | Fix |
|---------|-----|
| `DualFeatured.tsx` | h3→p: fix duplicate heading + H1→H3 structural jump en homepage |
| `Edicion.tsx` | h3→p: reduce heading count homepage |
| `Newsletter.tsx` | h2→p: sección formulario no es contenido estructurado |
| `products.json` | 21 DE nameMain/nameAccent corregidos: compound word splits → "Natürlich/er/e/es {Word}" |
| `products.json` | body-milk ES/EN nameMain extendido: "Hidratante"/"Lightweight" → H1 ≥20 chars |

**Resultado esperado en próximo crawl:**
- Homepage 7 locales: sin duplicate heading, sin H1→H3 jump, heading count ≤19
- Productos DE: H1s ≥21 chars (nameMain+nameAccent como palabras naturales en alemán)
- 209 H1 "too short" → deberían reducirse significativamente

---

## ✅ FIXES APLICADOS (sesiones 9-10) — 2 commits

### Sesión 9 (Content SEO report 17/05/26):
- NL h1Qualifier typo: Naturlijk → Natuurlijk
- 23 bundle subtitles: qualifier word añadido (natürlich/natuurlijk/naturel/naturale/natural)
- messages DE/NL/FR/ES: catalog desc con palabras H1 compuestas (Tierpflege, huishoudverzorging, etc.)
- rituales/page.tsx: pageDesc+pageDesc2 con naturales/naturels/naturali/naturais/natürlichen
- origen/page.tsx: body0 con keywords H1 en todos los idiomas
- blog/page.tsx: labels.desc con Formulierung/ingrediënten + eliminar excerpt BlogPreview
- contacto/page.tsx: desc+wholesale+press ≥100 chars todos los idiomas
- INCI: translate="no" lang="la" → Caramel/Viscum Album no se marcan como typos
- products.json: desengrasante EN + limpiacristales ES subtitle ≥100 chars

### Sesión 10 (Content SEO cont.):
- cookies/page.tsx: párrafos managing ≥100 chars (5 idiomas)
- faq/page.tsx: FAQ DE desc incluye "handwerklicher"
- products.json: 10 subtitles diferenciados para competing pages
  (body-milk unisex vs hombre/mujer en IT/FR/PT; dishwasher FR manual vs automático;
   shampooing/après-shampooing FR; jabon EN vs hand&body wash)

---

## ✅ FIXES APLICADOS (sesión 8) — 1 commit

| Fichero | Fix |
|---------|-----|
| `products.json` | 81 fichas DE/IT/NL con <3 párrafos ≥100 chars → expandidos subtitle+shortDesc+longDesc |
| — | Cosmetica básica, hombre, mujer; hogar (detergente, suavizante, lavavajillas, etc.); mascotas |

**Resultado esperado:** ~102 páginas "pocos párrafos" → 0 en DE/IT/NL tras recrawl

---

### PRIORIDAD ALTA
```
1. Keyword cannibalization (21 pares):
   → tienda.naturaesencials.com/products/X compite con www.naturaesencials.com/eu/es/X
   → Fix: canonical tags en páginas Shopify (necesita acceso Shopify admin)
   → Alternativa: verificar que www pages tienen contenido único suficiente

3. Duplicate content (2 páginas):
   → tienda.naturaesencials.com/products/ritual-plenitud-300
   →   duplica /products/pack-esenciales-diarios
   → Fix: añadir canonical en Shopify product pages
```

### PRIORIDAD MEDIA
```
4. 31 páginas sin texto detectable:
   → Después de sesión 5 deben reducirse (categorías ahora tienen <p>)
   → Pendiente verificar con nuevo crawl: tienda homepage (Shopify, no controlable)
   → contacto it/nl: ahora tienen texto tras fix

5. 102 páginas con pocos párrafos (< 3 párrafos de >100 chars):
   → Ritual detail pages: subtitle (~80 chars) y story (~85 chars) bajo umbral
   → Fix: expandir subtitles y stories en bundles.json a >100 chars
   → Afecta especialmente rituales DE, IT, NL

6. 16 páginas con keywords del title no en body:
   → Páginas tienda (no controlables)
   → Blog "Diario · Natura Esencials" para locales con título "Diario"
```

### PRIORIDAD BAJA
```
7. 8 typos detectados (algunos son INCI — no corregibles):
   → PT /hogar: "ropa" → posible en CatalogGrid inicial render (pendiente verificar)
   → NL /cosmetica/mannenshampoo: "caramel" en INCI (nombre ingrediente, no typo real)
   → ES /mascota/limpiador-ojos: "album" en Viscum album INCI (no typo real)
   → Si Seobility sigue flagging INCI como typos: ignorar (son nombres científicos)

8. Link anchors too long (19 páginas):
   → Ritual pages con anchor text > 120 chars
   → En RitualCard ya tenemos aria-label, verificar si los links en /eu/de/rituales
   → se han resuelto con el fix de sesión 5

9. Average internal links bajo:
   → Tienda product pages tienen 0-1 links (Shopify)
   → Fix opcional: añadir más crosslinks en www product pages (related products)
```

---

## 📁 ESTRUCTURA PRODUCTOS — REFERENCIA RÁPIDA

### Líneas activas (visible=true)
```
COSMÉTICA (visible): champu-2-en-1, acondicionador-capilar, jabon-manos-cuerpo,
  body-milk, total-body-wash, champu-hombre, acondicionador-hombre, 
  gel-manos-cuerpo-hombre, body-milk-hombre, champu-mujer, acondicionador-mujer,
  gel-manos-cuerpo-mujer, body-milk-mujer

HOGAR (todos visibles): detergente-ropa, suavizante-ropa, lavavajillas-manual,
  lavavajillas-maquina, abrillantador, limpiasuelos, limpiador-banos,
  desengrasante, multisuperficies, limpiacristales

MASCOTA (todos visibles): champu-perros, champu-gatos, limpiador-ojos-mascotas,
  limpiador-oidos-mascotas

COSMÉTICA (visible=false, en desarrollo): gel-afeitado-hombre, balsamo-aftershave,
  exfoliante-facial-hombre, serum-antiojeras-hombre, agua-micelar,
  gel-afeitado-mujer, exfoliante-facial-mujer, serum-antiojeras-mujer
```

### Rituales/Bundles activos (12 visibles)
```
Cosmética: plenitud-300, ducha-perfecta-300, rendimiento-300, para-el-300, para-ella-300
Hogar: refugio, cocina-impecable, vajilla-perfecta, bano-impecable, caricia-textil
Mascotas: mimo-canino, zen-gato
```

---

## 🌐 LOCALES Y SLUGS

### Sistema de slugs localizados
```
Cada producto tiene slug único por idioma en products.json:
  products.json → p.{locale}.slug
  bundles.json  → b.{locale}.slug

Ejemplos:
  champu-2-en-1: es=champu-2-en-1, en=2-in-1-shampoo, de=2-in-1-shampoo,
                 fr=shampooing-2-en-1, it=shampoo-2-in-1, nl=2-in-1-shampoo,
                 pt=champo-2-em-1

Regla: NUNCA cambiar un slug ya publicado sin crear redirect 301 en next.config.mjs
```

### Locales y sus particularidades
```
es: idioma base, siempre tiene contenido completo
en: segundo idioma prioritario
de: mercado principal EU (más crawleado)
pt: requiere atención extra — NO usar palabras españolas jamás
    ropa→roupa, diario→diário, propiedades→propriedades, artesanal≠artesanal
nl: segunda lengua germánica, verificar traducciones técnicas
fr/it: menos críticos pero completos
```

---

## 🔄 SINCRONIZACIÓN rituales.ts ↔ bundles.json

**CRÍTICO**: estas dos fuentes DEBEN tener los mismos nombres de rituales.

```typescript
// src/data/rituales.ts — nombres de landing page
{ id: 'plenitud', name: { es: 'Plenitud', en: 'Wholeness', ... } }

// src/data/bundles.json — datos completos
{ "es": { "name": "Ritual Plenitud", "slug": "plenitud-300" } }
```

Cuando se cambia un nombre en bundles.json, debe actualizarse en rituales.ts y viceversa.

---

## 🧪 VERIFICACIONES POST-DEPLOY OBLIGATORIAS

```bash
# 1. Build limpio
npm run build
# → ✓ Compiled successfully
# → ✓ Generating static pages (761/761)

# 2. Test URLs críticas
curl -s -o /dev/null -w "%{http_code}" https://www.naturaesencials.com/eu/es/cosmetica/champu-2-en-1
curl -s -o /dev/null -w "%{http_code}" https://www.naturaesencials.com/eu/de/rituales/makellose-kueche
curl -s -o /dev/null -w "%{http_code}" https://www.naturaesencials.com/eu/pt/hogar/detergente-roupa
# → todos deben devolver 200

# 3. Verificar sitemap
curl -s https://www.naturaesencials.com/sitemap.xml | grep -c "<url>"
# → debe devolver ~330

# 4. Después de cambiar products.json/bundles.json/rituales.ts:
# → Verificar sincronización rituales.ts ↔ bundles.json nombres
# → npm run build con 0 errores React (#31 error indica benefits como objeto)
# → Relanzar Seobility 3-5 días después del deploy
```

---

## 📝 PROMPT DE INICIO PARA NUEVA SESIÓN

Copiar y pegar esto como primer mensaje en una nueva sesión de Claude:

```
Eres Claude trabajando en Natura Esencials, web de cosmética artesanal natural.
Lee el HANDOFF.md en la raíz del repo antes de hacer nada más.

PROYECTO:
- Web: https://www.naturaesencials.com  
- Stack: Next.js 14.2 + next-intl + Vercel
- Repo: https://github.com/naturaesencials/natura-esencials-web
- PAT: [REDACTED_PAT_ASK_CARLOS]
- Branch: main
- Working dir: clonar en /home/claude/natura-esencials-web

FORMA DE TRABAJAR:
1. Clonar repo en /home/claude/
2. npm install
3. Leer HANDOFF.md completo
4. Analizar todos los reportes/PDFs que te pase el usuario
5. Identificar problemas (regresiones vs pre-existentes)
6. Aplicar TODOS los fixes en el mismo commit si es posible
7. npm run build → 0 errores OBLIGATORIO antes de push
8. Push a main con mensaje descriptivo en español
9. Dar resumen de qué se hizo y qué queda pendiente

REGLAS ABSOLUTAS (nunca violar):
- Todo texto visible en 7 idiomas, nunca hardcodear español
- H1 conciso (max ~40 chars), descripción en <p> SEPARADO del H1
- rituales.ts ↔ bundles.json DEBEN sincronizarse
- benefits[] = plain strings (nunca objetos)
- PT nunca palabras españolas
- Anchors de links únicos y descriptivos + nofollow en Shopify/externo
- H1 keywords deben aparecer en body text (<p>)
- npm run build 0 errores antes de CADA push

SESIÓN ACTUAL: [describir tarea aquí — incluir PDFs Seobility si es sesión SEO]
```

---

## 🗓️ LOG DE SESIONES

| Sesión | Fecha | Commits | Principales cambios |
|--------|-------|---------|---------------------|
| 1 | ene 2026 | varios | Setup inicial, 1.800+ issues Seobility |
| 2 | feb 2026 | varios | INCI verificados, benefits format, H1s descriptivos |
| 3 | mar 2026 | varios | Blog × 7 idiomas, heading hierarchy, meta titles |
| 4 | abr 2026 | varios | Links, redirects, contenido páginas, typos, redes sociales |
| 5 | 17 may 2026 | 3 | Corrección regresiones: H1 en product pages, anchor texts, titles |
| 6 | 17 may 2026 | 1 | 82% overall (+17%): H1 too short fix, meta titles, blog titles, shortDescs |
| 7 | 17 may 2026 | 1 | Homepage headings fix, DE compound words, body-milk nameMain |
| 8 | 17 may 2026 | 1 | 81 fichas DE/IT/NL: subtitle+shortDesc+longDesc expandidos ≥100 chars |
| 9 | 17 may 2026 | 1 | Content SEO: NL typo, bundle qualifiers, catalog/ritual/origen/blog/contacto fixes |
| 10 | 17 may 2026 | 1 | Competing pages, cookies paragraphs, FAQ DE, blog/contacto completion |
| 11 | 17 may 2026 | 1 | Structure SEO report fixes (sesión anterior) |
| 12 | 18 may 2026 | 1 | Overlay link pattern en ProductCard/RitualCard/LineCosmetica/LineHogar/LineMascota/Edicion/DualFeatured; anchor CTA ProductDetail usa nameMain+nameAccent; bundles.json ritual-refugio nameMain FR/IT/NL corregido |

---

*Este fichero debe actualizarse al final de cada sesión.*
*Commit mensaje: `docs: actualizar HANDOFF.md tras sesión X`*
