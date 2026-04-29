# SEO Strategy — Natura Esencials

Documento maestro de estrategia SEO. Define keywords objetivo por idioma y región, estructura semántica, y plan de monitoring.

---

## 1. Mercados objetivo

| Idioma | Región principal | Mercados secundarios | Volumen prioridad |
|--------|------------------|---------------------|-------------------|
| ES | España (EU) | Portugal, hispanoamericanos en EU/UK | **Alta** — mercado nativo |
| EN | UK + EU continental | Irlanda, Holanda, Alemania | **Alta** — internacional |
| FR | Francia | Bélgica, Suiza, Luxemburgo | Media |
| DE | Alemania | Austria, Suiza | Media |
| IT | Italia | — | Media |
| NL | Países Bajos | Bélgica | Baja-media |
| PT | Portugal | Brasil (vía /eu/pt/) | Baja-media |

---

## 2. Keyword research por idioma

### Español (España)

**Cabecera (head terms):**
- cosmética natural
- cosmética artesanal
- cosmética ecológica
- jabón natural
- limpiador natural hogar

**Cola larga (long-tail) — cosmética:**
- gel corporal piel sensible natural
- cosmética natural Marbella
- cosmética artesanal Andalucía
- gel ducha sin sulfatos
- crema corporal natural España
- cosmética ISO 16128
- cosmética natural mujer
- cosmética natural hombre

**Cola larga — hogar:**
- limpiador multi-superficie natural
- detergente ropa ecológico
- lavavajillas a mano natural
- limpiador cocina sin químicos
- jabón Marsella detergente
- limpiador hogar bebé seguro

**Cola larga — mascota:**
- champú perro natural avena
- champú perro piel sensible
- limpieza gato sin aclarado
- productos naturales mascotas

**Transaccionales:**
- comprar cosmética natural online
- cosmética natural envío gratis España
- gel corporal natural opiniones

### English (UK + EU)

**Head terms:**
- natural skincare
- artisan skincare
- natural home care
- chemical-free cleaner
- natural pet shampoo

**Long-tail — skincare:**
- natural body wash sensitive skin
- artisan Mediterranean skincare
- natural skincare Spain
- ISO 16128 certified skincare
- sulphate-free body wash
- handcrafted natural cosmetics

**Long-tail — home:**
- natural multi-surface cleaner
- chemical-free kitchen cleaner
- plant-based dish soap
- Marseille soap laundry
- eco-friendly home cleaning

**Long-tail — pet:**
- natural dog shampoo oatmeal
- sensitive skin dog shampoo
- chemical-free pet care
- rinse-free cat shampoo

**Transaccionales:**
- buy natural skincare online UK
- natural cosmetics free shipping Europe
- best natural body wash 2026

### Français

**Head terms:**
- cosmétique naturelle
- cosmétique artisanale
- savon naturel maison
- produits ménagers écologiques
- shampoing chien naturel

**Long-tail:**
- gel douche peau sensible naturel
- cosmétique naturelle Espagne
- savon Marseille lessive
- nettoyant ménager sans sulfates
- shampoing chien avoine colloïdale
- cosmétique ISO 16128

### Deutsch

**Head terms:**
- Naturkosmetik
- handgemachte Kosmetik
- Bio-Reinigungsmittel
- natürliche Haushaltspflege
- Hundeshampoo natürlich

**Long-tail:**
- Naturkosmetik empfindliche Haut
- Naturkosmetik Spanien Marbella
- sulfatfreies Duschgel
- biologisches Spülmittel
- Hundeshampoo Hafer

### Italiano

**Head terms:**
- cosmetica naturale
- cosmetica artigianale
- detergenti ecologici casa
- shampoo naturale cane

**Long-tail:**
- cosmetica naturale pelle sensibile
- cosmetica artigianale Spagna
- doccia schiuma senza solfati
- detersivo piatti naturale
- shampoo cane avena colloidale

### Nederlands

**Head terms:**
- natuurlijke cosmetica
- ambachtelijke cosmetica
- biologische schoonmaakmiddelen
- natuurlijke hondenshampoo

**Long-tail:**
- natuurlijke cosmetica gevoelige huid
- natuurlijke cosmetica Spanje
- douchegel zonder sulfaten
- natuurlijk afwasmiddel

### Português

**Head terms:**
- cosmética natural artesanal
- produtos limpeza ecológicos
- champô natural cão

**Long-tail:**
- cosmética natural pele sensível
- cosmética natural Espanha Marbella
- gel duche sem sulfatos
- detergente roupa ecológico

---

## 3. Mapeo keyword → página

| Página | Keywords primarias | Keywords secundarias |
|--------|-------------------|----------------------|
| `/eu/es/` (home) | cosmética natural, cuidado del hogar | Marbella, Andalucía, ISO 16128 |
| `/eu/es/cosmetica` | cosmética natural, cosmética artesanal | gel corporal natural, sin sulfatos |
| `/eu/es/hogar` | limpiador natural hogar, jabón natural | sin químicos, ecológico |
| `/eu/es/mascota` | champú perro natural | piel sensible, avena coloidal |
| `/eu/es/rituales/plenitud` | gel corporal piel sensible | avena coloidal, aloe |
| `/eu/es/origen` | cosmética artesanal Andalucía | cooperativas, Marbella |
| `/eu/en/` | natural skincare, home care | Marbella, Spain, ISO 16128 |
| `/uk/en/` | natural skincare UK | British market, GBP shipping |

---

## 4. On-page SEO checklist

Cada página debe cumplir:

- [x] **Title** único, máx 60 chars, keyword principal al inicio
- [x] **Meta description** única, máx 160 chars, con call to action
- [x] **H1 único** con keyword principal (no usar H1 más de una vez por página)
- [x] **Jerarquía H2/H3** lógica
- [x] **URL slug** corto, traducido al idioma, separado por guiones
- [x] **Canonical** absoluto sin parámetros
- [x] **hreflang** completo para todas las variantes (14 alternates + x-default)
- [x] **Open Graph** + Twitter Card con imagen 1200×630
- [x] **Schema.org** apropiado (Organization, Product, etc.)
- [x] **Alt** descriptivo en todas las imágenes (traducido)
- [x] **Imágenes optimizadas** (WebP/AVIF, srcset, lazy loading)
- [x] **Internal linking** a páginas relacionadas
- [x] **Breadcrumbs** visibles + schema markup

---

## 5. Schema.org implementado

### Sitewide (en todas las páginas)
- `Organization` (con sameAs a redes sociales)
- `LocalBusiness` (con coordenadas Marbella)
- `WebSite` (con SearchAction)

### Por tipo de página
- **Home**: + `ItemList` con productos destacados
- **Categoría**: + `BreadcrumbList` + `ItemList`
- **Producto**: + `Product` con `Offer` (precio, disponibilidad, currency) + `BreadcrumbList`
- **Blog post**: + `Article` con author, datePublished

---

## 6. Core Web Vitals targets

| Métrica | Target | Cómo se cumple |
|---------|--------|----------------|
| **LCP** (Largest Contentful Paint) | <2.5s | Hero image con `priority`, fonts preload, edge CDN |
| **INP** (Interaction to Next Paint) | <200ms | JavaScript mínimo, Server Components por defecto |
| **CLS** (Cumulative Layout Shift) | <0.1 | `aspect-ratio` en imágenes, `size-adjust` en fonts |
| **TTFB** | <800ms | Vercel Edge Runtime, cache agresivo |

Monitoring: Vercel Speed Insights (incluido) + Google Search Console Core Web Vitals report.

---

## 7. Estrategia de contenido (blog/diario)

Plan recomendado: 4-6 artículos al mes, rotando entre los 3 territorios:

**Pilares de contenido:**
1. **Educación cosmética** — "Por qué la avena coloidal calma la piel", "ISO 16128 explicado"
2. **Cuidado del hogar** — "Limpiar sin químicos: la guía definitiva", "Por qué el jabón de Marsella es eterno"
3. **Origen y cooperativas** — "Visita a las cooperativas de la Sierra de Cazorla"
4. **Estilo de vida** — "El ritual de domingo en una casa andaluza"
5. **Mascotas** — "Bañar al perro de piel sensible: protocolo completo"

Cada artículo debe:
- Tener mínimo 1200 palabras
- Estar en al menos ES + EN
- Incluir 2-3 imágenes propias (no stock)
- Enlazar internamente a 3-5 productos
- Incluir FAQ schema cuando aplique

---

## 8. Backlinks estratégicos

Donde Natura Esencials debe aparecer en los próximos 12 meses:

**Press releases:**
- Marie Claire España, ELLE España (cosmética natural)
- Mr Magazine, Esquire (cosmética hombre)
- AD España (lifestyle, hogar)

**Blogs/medios especializados:**
- Soysuper (eco-shopping)
- ConsumirEs (productos sostenibles)
- The Beauty Mag UK (UK market entry)

**Directorios de calidad:**
- Made in Spain (Cámara de Comercio)
- Andalucía Lab (turismo)
- ISO 16128 directory

**Colaboraciones:**
- Hoteles boutique de Marbella, Sierra Nevada (amenities co-branded)
- Influencers de cosmética natural pequeños/medianos (1k-50k followers)

---

## 9. Monitoring y alertas

### Configurar inmediatamente:

1. **Google Search Console**
   - Verificar `naturaesencials.com` con código en `GOOGLE_SITE_VERIFICATION`
   - Enviar sitemap: `https://naturaesencials.com/sitemap.xml`
   - Configurar geo-targeting por subdirectorio:
     - `/eu/es/` → España
     - `/uk/en/` → Reino Unido
     - etc.

2. **Google Analytics 4**
   - Property en `NEXT_PUBLIC_GA_ID`
   - Eventos e-commerce activados (view_item, add_to_cart, purchase via Shopify integration)

3. **Vercel Speed Insights** — ya activado en `layout.tsx`

4. **Bing Webmaster Tools** — opcional pero recomendable

### Alertas en Search Console (configurar):
- Errores de cobertura (404s, redirect chains)
- Core Web Vitals: páginas malas
- Hreflang errors (clave para multi-idioma)
- Penalizaciones manuales

### KPIs a vigilar mensualmente:
- Impresiones y clics en SC por país e idioma
- CTR medio (target: >3%)
- Posición media para keywords objetivo
- Productos en Shopping (cuando se active Google Merchant Center)

---

## 10. Próximos pasos SEO post-launch

**Mes 1:**
- [ ] Verificar SC y enviar sitemap
- [ ] Configurar geo-targeting por subdirectorio
- [ ] Publicar 4 primeros artículos del diario (2 en ES, 2 en EN)
- [ ] Solicitar reviews en Trustpilot (cuando haya 20 pedidos)

**Mes 2-3:**
- [ ] Conectar Google Merchant Center con feed de productos Shopify
- [ ] Activar Google Shopping ads (orgánico free + de pago)
- [ ] 8 artículos más del diario

**Mes 4-6:**
- [ ] Outreach a 20 medios de prensa
- [ ] Programa de afiliados/influencers
- [ ] FAQ pages con schema FAQPage

---

## 11. Errores SEO comunes a evitar

❌ **Usar el mismo `<title>` en todas las páginas** — cada página debe tener título único.

❌ **Subir imágenes pesadas** — siempre WebP/AVIF, máx 200KB por imagen visible. `next/image` lo automatiza pero si subes 5MB de origen aún tarda en optimizarse.

❌ **Olvidar el alt text** — toda imagen debe tener `alt` descriptivo, traducido por idioma.

❌ **URLs con parámetros UTM en canonicals** — el canonical debe ser SIEMPRE limpio.

❌ **Dejar `noindex` en producción** — verificar antes del lanzamiento que `robots.txt` y meta robots permiten indexación.

❌ **Cambiar slugs sin redirects 301** — cualquier cambio de URL requiere redirect 301 desde la antigua.

❌ **Hreflang incorrecto** — los hreflang tags deben ser bidireccionales y cubrir todas las variantes incluyendo `x-default`.

---

© 2026 Natura Esencials
