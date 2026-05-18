# 🌿 PROMPT DE CONTINUIDAD — Natura Esencials SEO
**Copiar esto íntegro como primer mensaje en el nuevo chat**

---

## CONTEXTO DEL PROYECTO

Eres Claude trabajando autónomamente en el SEO y desarrollo de **Natura Esencials**, marca de cosmética artesanal natural con sede en Marbella. Llevas 12 sesiones trabajando en este proyecto. Tu objetivo actual: resolver issues SEO restantes y completar la integración UK Shopify.

**Web:** https://www.naturaesencials.com  
**Stack:** Next.js 14.2 App Router + next-intl (7 locales: es/en/fr/de/it/nl/pt) + Vercel  
**Páginas estáticas:** 656 páginas generadas en build (eran 761 antes de filtrar UK)  
**Empresa:** Albion Wealth Services Ltd — 66 Paul Street, EC2A 4NA, London

---

## 🔑 CREDENCIALES Y ACCESOS COMPLETOS

### GitHub
```
Repo:   https://github.com/naturaesencials/natura-esencials-web
Branch: main
PAT:    REDACTED_ASK_CARLOS_PAT
```
**Clonar:**
```bash
git clone https://REDACTED_ASK_CARLOS_PAT@github.com/naturaesencials/natura-esencials-web.git
```

### Vercel
- Deploy: automático en cada push a `main`
- URL producción: `https://www.naturaesencials.com`
- Variable crítica: `NEXT_PUBLIC_SITE_URL=https://www.naturaesencials.com`

### Seobility (monitoreo SEO)
- URL: `https://app.seobility.net`
- Dominio: `www.naturaesencials.com`
- Re-crawl: lanzar 3-5 días después de cambios importantes

---

## 🤖 FORMA DE TRABAJO AUTÓNOMO

```bash
# 1. Setup en cada nueva sesión
cd /home/claude
git clone https://REDACTED_ASK_CARLOS_PAT@github.com/naturaesencials/natura-esencials-web.git
cd natura-esencials-web
npm install

# 2. Configurar git
git config user.email "seo-bot@naturaesencials.com"
git config user.name "SEO Bot"

# 3. Hacer TODOS los cambios necesarios sin pedir permiso

# 4. OBLIGATORIO antes de cada push — 0 errores
npm run build
# → ✓ Compiled successfully
# → ✓ Generating static pages (656/656)

# 5. Commit + push
git add -A
git commit -m "fix(seo): descripción de cambios"
git push origin main
```

**Regla de autonomía:** Claude trabaja directamente sobre el código, aplica todos los fixes e hace push sin pedir permiso para cada cambio. Si un cambio tiene alto impacto visual/funcional se menciona en el resumen final pero se procede igualmente.

---

## 📊 ESTADO SEO ACTUAL (tras sesiones 6-11, 17 mayo 2026)

### Scores Seobility (último crawl disponible)
```
Tech & Meta:   99%  ✅ (prácticamente perfecto)
Structure:     73%  ⚠️  (mejoró desde 54%, hay fixes pendientes por indexar)
Content:       69%  ⚠️  (mejoró desde 52%, hay fixes pendientes por indexar)
Overall:       81%  (subió desde 65%)
```

### Commits realizados (sesiones 6-12)
| Sesión | Commit | Descripción |
|--------|--------|-------------|
| 6 | f1c1391 | H1 too short + meta titles + shortDescs + NL typo |
| 7 | 347ce04 | Homepage headings + DE compound words + body-milk nameMain |
| 8 | 4ec9972 | 81 fichas DE/IT/NL subtitle+shortDesc+longDesc ≥100 chars |
| 9 | 28783ed | Content SEO: NL qualifier typo, bundle qualifiers, catalog/ritual/origen/blog/contacto |
| 10 | 1f4cd56 | Competing pages, cookies paragraphs, FAQ DE, blog completion |
| 11 | 4873177 | Structure: CTA único rituales, nofollow WhatsApp, ProductCard aria-label, 13 redirects |
| 12a | ae1a86d | UK filter: 20 productos + 4 bundles a EU-only (líneas hombre/mujer/mascota) |
| 12b | 79cfdcf | Ritual refugio añadido a UK availability |
| 12c | d57e342 | H1 keywords in body (68 productos + 8 bundles + 9 catálogos + 7 FAQ) + internal crosslinks "Más productos de la línea" |
| 12d | c1dbeb9 | UK Coming Soon en /mascota + sync rituales.ts (5 rituales expandidos a uk) para que UK landing muestre los 8 rituales reales |
| 12e | 0d75b86 | UK Shopify connection: shopifyHandleUK + handlesUK + resolveShopifyHandle/resolveBundleHandles helpers (15 productos + 11 bundles mapeados) |

---

## ✅ FIXES YA APLICADOS (no repetir)

### Tech & Meta (99%) — RESUELTO
- H1 demasiado corto (<20 chars): qualifier "· Natural/Natürlich/Naturlijk" añadido
- Meta titles >44 chars: truncación corregida
- Meta titles con word repetition: detectada y corregida
- Blog titles acortados ≤42 chars
- Homepage headings: DualFeatured/Edicion/Newsletter → h3/h2 → p
- ProductDetail.tsx: H1 qualifier, aria-label complements, INCI `translate="no"`
- DE compound words: "Haar spülung" → "Natürliche Haarspülung" (21 productos)

### Content (mejorado a ~72% en crawl posterior)
- rituales catalog pageDesc: include naturales/naturels/naturali/naturais/natürlichen + 2º párrafo
- origen/page.tsx: body0 con keywords H1 en todos los idiomas
- blog/page.tsx: labels.desc con Formulierung/ingrediënten eliminando BlogPreview excerpt
- contacto/page.tsx: desc+wholesale+press ≥100 chars todos los idiomas
- cookies/page.tsx: párrafos managing ≥100 chars (5 idiomas)
- FAQ DE desc: incluye "handwerklicher Naturkosmetik"
- NL h1Qualifier typo: "Naturlijk" → "Natuurlijk" en messages/nl.json
- 23 bundle subtitles: qualifier word (natürlich/natuurlijk/naturel/etc.) añadido
- messages DE/NL/FR/ES: catalog desc con palabras H1 compuestas
- ProductCard.tsx: subtítulos DE/IT/NL expandidos ≥100 chars (81 fichas)
- BlogPreview.tsx: excerpt eliminado (fix "blog included in homepage")
- products.json: 10 subtitles diferenciados para competing pages (IT/FR/PT/EN)
- INCI: `translate="no" lang="la"` (Caramel/Viscum Album son INCI, no typos)
- desengrasante EN + limpiacristales ES: subtitle ≥100 chars

### Structure (mejorado)
- rituales/page.tsx: CTA único por ritual (Ver Plénitude →, Voir Volheid →, etc.)
- LineCosmetica/LineHogar/LineMascota: `aria-label={r.names[locale].full}` en cards
- blog/page.tsx: enlace "Read article →" redundante eliminado (título ya es link)
- ShareButtons.tsx + WhatsAppButton.tsx: `rel="nofollow noopener noreferrer"`
- ProductCard.tsx: `aria-label={ariaLabel}` — anchor limitado a nombre producto
- rituales.ts: 13 slugs actualizados a canonical (fulfillment-300, impeccable-kitchen, etc.)
- **Internal crosslinks (sesión 12c):** ProductDetail.tsx ahora muestra sección "Más productos de esta línea" con hasta 8 links a otros productos visibles + link "Ver toda la línea". 7 messages files actualizados con `moreFromLineTitle` y `viewAllLine`.

### UK Store integration (sesión 12) — NUEVO
- **Filtrado por región:** 20 productos (hombre/mujer/mascota) y 4 bundles (para-ella, para-el, mimo-canino, gato-zen) excluidos de UK
- **rituales.ts sincronizado** con bundles.json: 5 rituales (rendimiento, cocina, vajilla, caricia, baño-impecable) expandidos a `['eu','uk']` + refugio añadido a UK
- **UK /mascota → Coming Soon:** nueva sección con CTAs a /cosmetica y home cuando 0 productos en la región. 7 nuevas claves i18n en catalogPages.mascota (comingSoonKicker/Title/Accent/Body/CTA/CTASecondary)
- **UK Shopify Storefront API connection:** 
  - Añadido campo `shopifyHandleUK` a Product/Bundle types
  - Añadido `handlesUK` para bundles multi-formato
  - 15 productos + 11 bundles mapeados a sus handles UK reales (descubiertos vía `natura-esencials.myshopify.com/products.json`)
  - Helpers `resolveShopifyHandle(item, region)` y `resolveBundleHandles(bundle, region)` exportados desde `@/data`
  - BuyButton/MultiFormatBuyButton/ReviewsWidget usan resolvers
  - **Mapeo UK ↔ EU (productos):**
    ```
    champu-2-en-1            -> 2-in-1-shampoo
    acondicionador-capilar   -> hair-conditioner
    jabon-manos-cuerpo       -> hand-and-body-soap
    body-milk                -> body-milk (same)
    total-body-wash          -> total-body-wash (same)
    detergente-ropa          -> laundry-detergent
    suavizante-ropa          -> fabric-softener
    lavavajillas-manual      -> hand-washing-up-liquid
    lavavajillas-maquina     -> machine-dishwasher-detergent
    abrillantador            -> dishwasher-rinse-aid
    limpiasuelos             -> floor-cleaner
    limpiador-banos          -> bathroom-cleaner
    desengrasante            -> degreaser
    multisuperficies         -> multi-surface-cleaner
    limpiacristales          -> glass-cleaner
    ```
  - **Mapeo UK ↔ EU (bundles):**
    ```
    ritual-plenitud-300/1l       -> ritual-wholeness-{300-ml,1-ltr}
    ritual-ducha-perfecta-300/1l -> ritual-perfect-shower-{300-ml,1-ltr}
    ritual-rendimiento-300/1l    -> ritual-performance-{300-ml,1-ltr}
    ritual-vajilla-perfecta      -> ritual-perfect-dishes
    ritual-bano-impecable        -> ritual-impeccable-bathroom
    ritual-cocina-impecable      -> ritual-impeccable-kitchen
    ritual-caricia               -> ritual-caress
    ritual-refugio               -> ritual-sanctuary
    ```

---

## 🔴 PENDIENTES IDENTIFICADOS (ordenados por impacto)

### CRÍTICO — Carlos debe hacer en Shopify UK admin
**0. UK Shopify Storefront API: variants vacías**
La web está correctamente mapeada a los handles UK (commit 12e) pero el endpoint `/api/shopify/variants?handle=2-in-1-shampoo&region=uk` sigue devolviendo `variants: []`. La estructura existe (`products.json` público lo confirma) pero la **Storefront API** no los ve.

**Diagnóstico:** los productos UK no están publicados en el sales channel que usa la Storefront API.

**Acción Carlos (Shopify UK admin → `natura-esencials.myshopify.com/admin`):**
1. **Sales channels → Headless** (o crear uno si no existe)
2. Para cada uno de los 26 productos UK: **Pestaña Channels → Available on → activar "Headless"** (o el canal que use el Storefront token)
3. **Configurar precios en GBP** para todas las variantes (actualmente todas a £0.00 — verificado vía products.json)
4. **Bulk fix:** seleccionar todos los productos → "Make available in" → seleccionar el canal correcto

**Cómo verificar después:**
```bash
curl -s "https://www.naturaesencials.com/api/shopify/variants?handle=2-in-1-shampoo&region=uk&locale=en"
# Esperado: variants con id/title/price/currency, NO array vacío
```

Una vez Carlos haga esto, **el código ya está listo** — no requiere redeploy.

---

### Alta prioridad — Content SEO

**1. ~~H1 keywords not in body (94 páginas)~~ — RESUELTO en sesión 12c**
- 68 productos: subtitle con qualifier exact form per locale
- 8 bundles: mismo fix
- 9 catalog descs (cosmetica/hogar/mascota): reescritos con palabras H1
- 7 FAQ subtitles: reescritos con "Preguntas frecuentes sobre cosmética natural artesanal"
- 1 DE blog desc: añadido "Zutaten"
- Verificación final: 0 productos/bundles con qualifier missing

**2. Duplicate Content — blog "Included" en homepage (4 páginas)**
Los blogs FR se siguen flaggeando. Verificar estado: en sesión 9 se eliminó excerpt de BlogPreview pero ¿se tomó el crawl antes o después?

**3. Competing pages (residuales ~6 pares)**
Sesión 10 diferenció los principales. Aún pueden quedar:
- ES body-milk / EN body-milk / NL bodymilk compitiendo entre sí (cross-locale)
- ES/EN mascota eye cleaner vs ear cleaner FR: "nettoyant animaux"

### Media prioridad — Structure SEO

**4. ~~Internal links bajo promedio~~ — RESUELTO en sesión 12c**
ProductDetail.tsx ahora añade sección "Más productos de esta línea" con hasta 8 links a otros productos visibles. Cada ficha pasa de ~3-5 a ~10-13 crosslinks internos.

**5. ~~Sitemap no detectado~~ — VERIFICADO CORRECTO**
- `https://www.naturaesencials.com/sitemap.xml` → HTTP 200, XML válido, hreflang completo
- `robots.txt` referencia el sitemap correctamente
- **Acción Carlos:** añadir manualmente la URL en Seobility settings si sigue sin detectarse

### Baja prioridad (estructural/aceptable)

**6. 987 content blocks en múltiples páginas**
Listas INCI compartidas entre DE/ES/EN del mismo producto → estructural, inevitable en sitio multilingüe. No hay fix accionable sin duplicar contenido artificialmente.

**7. Pages with little text (<500 words) — DE products**
Los productos DE tienen 300-450 palabras. Para e-commerce es aceptable. Seobility lo marca como "Tip" no "error". Fix opcional: expandir longDescription DE de los 30 productos de hogar.

**8. Competing pages cross-locale (structural)**
ES/EN/NL body-milk siempre van a competir porque son el mismo producto en diferentes idiomas. Google resuelve con hreflang (ya implementado). No accionable a nivel de contenido.

---

## 🏗️ ARQUITECTURA CLAVE

### Ficheros de datos
```
src/data/products.json    → 35 productos, data por locale
src/data/bundles.json     → 15 rituales/bundles, data por locale
src/data/rituales.ts      → landing rituales (SINCRONIZAR con bundles.json)
src/data/posts.ts         → blog posts × 7 idiomas
messages/[locale].json    → traducciones UI (7 archivos)
```

### Componentes SEO críticos
```
src/components/catalog/ProductDetail.tsx   → H1, body text, INCI
src/components/catalog/ProductCard.tsx     → aria-label en card links
src/components/catalog/CatalogGrid.tsx     → filtros catálogo
src/components/home/BlogPreview.tsx        → preview sin excerpt (desde sesión 9)
src/components/social/ShareButtons.tsx     → rel="nofollow" ✓
src/components/social/WhatsAppButton.tsx   → rel="nofollow" ✓
```

### Páginas con lógica SEO
```
src/app/[region]/[locale]/page.tsx                    → homepage
src/app/[region]/[locale]/cosmetica/page.tsx          → catalog cosmetica
src/app/[region]/[locale]/hogar/page.tsx              → catalog hogar
src/app/[region]/[locale]/mascota/page.tsx            → catalog mascota
src/app/[region]/[locale]/rituales/page.tsx           → catalog rituales (CTA único ✓)
src/app/[region]/[locale]/rituales/[slug]/page.tsx    → detail ritual
src/app/[region]/[locale]/blog/page.tsx               → blog index (desc párrafo ✓)
src/app/[region]/[locale]/origen/page.tsx             → about page (body0 con keywords ✓)
src/app/[region]/[locale]/faq/page.tsx                → FAQ (handwerklicher ✓)
src/app/[region]/[locale]/contacto/page.tsx           → contact (≥100 chars ✓)
src/app/[region]/[locale]/cookies/page.tsx            → cookies (≥100 chars ✓)
src/lib/catalog/product-page-factory.tsx              → metadata + H1 de fichas
src/lib/seo/metadata.ts                               → buildMetadata()
```

---

## 📏 REGLAS SEO ABSOLUTAS (nunca violar)

```
1. Todo texto visible en 7 locales — NUNCA hardcodear español
2. rituales.ts ↔ bundles.json: mismos nombres de rituales siempre
3. H1: un único por página, H1→H2→H3 sin saltos
4. H1 conciso (max ~40 chars), descripción en <p> SEPARADO — nunca <span> dentro de <h1>
5. H1 keywords DEBEN aparecer en body text (<p>) — no solo en H1
6. Seobility no hace stemming en alemán: "Natürliches" ≠ "natürlich"
   → usar EXACT form del H1 en el primer <p> del body
7. Meta titles: max 44 chars (producto) + " · Natura Esencials" = ~63 total
8. Meta titles: sin word repetition
9. Anchor texts internos: únicos y descriptivos por página destino
10. Links externos Shopify/redes: rel="nofollow noopener noreferrer"
11. WhatsApp (wa.me): rel="nofollow noopener noreferrer"
12. PT: nunca palabras españolas (ropa→roupa, diario→diário)
13. INCI: solo nombres reales de fichas técnicas, con translate="no" lang="la"
14. benefits[]: plain strings, nunca objetos {icon, text}
15. npm run build 0 errores ANTES de cada push — regla absoluta
16. Subtítulos/shortDesc/longDesc: mínimo 100 chars para ser contados como párrafo
17. Ritual slugs: si se cambia un slug → añadir redirect en next.config.mjs
18. Checkout: SIEMPRE tienda.naturaesencials.com — nunca myshopify URL
```

---

## 🛠️ DISEÑO GLOBAL (Design System)

```css
Background:   #08090E (Obsidian)
Secondary:    #0C1020 (Deep Navy)
Accent:       #C9A96E (Antique Gold)
Text:         #F0EDE8 (Ivory)
Muted:        #8A8A9A
Fonts:        Cormorant Garamond (display) / Jost (UI) / Inter (body)
Dark theme ONLY — nunca light mode
Cards:        bg #0C1020, border rgba(240,237,232,0.1), radius 12px
Buttons:      primary bg #C9A96E color #08090E; secondary transparent+gold border
```

---

## 📋 CÓMO USAR ESTE PROMPT

**Para una nueva sesión SEO con Seobility PDF:**
1. Copiar este prompt completo como primer mensaje
2. Adjuntar el PDF de Seobility con el tipo de reporte (Tech&Meta / Content / Structure)
3. Indicar la tarea: "Analiza el reporte y corrige todos los issues"

**Claude debe:**
1. Clonar el repo (ya tiene las credenciales arriba)
2. npm install
3. Analizar el PDF completamente antes de tocar código
4. Aplicar TODOS los fixes en la misma sesión
5. npm run build → 0 errores
6. git commit + push
7. Dar resumen de qué se hizo y qué sigue pendiente

**Para una sesión de desarrollo normal:**
1. Copiar prompt + describir la funcionalidad nueva
2. Claude trabaja autónomamente, hace push, reporta resultado

---

*Última actualización: 18 mayo 2026 — Sesión 12 completada*
*Próximos pasos:*
*1. Carlos: configurar UK Shopify (sales channel + precios GBP) — ver pendiente #0*
*2. Esperar re-crawl Seobility (3-5 días) y aplicar fixes del nuevo PDF*
*3. Considerar: blog posts links internos a productos, traducciones IA hidden products UK*
