# Configuración de Shopify (EU + UK)

Esta web se conecta a **dos tiendas Shopify separadas** mediante la Storefront API. Esta guía explica cómo configurar cada una.

---

## 🏪 Shopify EU (la que ya tienes activa)

### Paso 1 — Crear una app privada con Storefront API

1. Entra en tu Shopify Admin EU
2. Ve a **Settings → Apps and sales channels → Develop apps**
3. Si es la primera vez, te pedirá habilitar el desarrollo de apps. Confirma.
4. Pulsa **Create an app**
5. Nombre: `Natura Esencials Web` · Developer email: el tuyo
6. Pulsa **Configure Storefront API scopes**
7. Activa los siguientes scopes:
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_product_inventory`
   - ✅ `unauthenticated_read_product_pickup_locations`
   - ✅ `unauthenticated_read_product_tags`
   - ✅ `unauthenticated_read_collection_listings`
   - ✅ `unauthenticated_read_checkouts`
   - ✅ `unauthenticated_write_checkouts`
   - ✅ `unauthenticated_read_customer_tags`
   - ✅ `unauthenticated_read_metaobjects`
8. Pulsa **Save**
9. Pulsa **Install app** (botón superior derecho)
10. Una vez instalada, pestaña **API credentials** → busca la sección "Storefront API access token" → pulsa **Reveal token**
11. Copia ese token (empieza por `shpat_...`)

### Paso 2 — Configurar dominio

Tu dominio MyShopify es algo como `natura-esencials-eu.myshopify.com`. Encuéntralo en **Settings → Domains** (es el "myshopify.com domain", no el dominio público).

### Paso 3 — Configurar `tienda.naturaesencials.com`

Esto hace que el checkout final use ese subdominio (más confianza para el cliente que ver `myshopify.com`):

1. Settings → Domains → **Add a domain** → Connect existing domain
2. Introduce `tienda.naturaesencials.com`
3. Shopify te dará un valor CNAME → añádelo en tu proveedor de DNS apuntando a `shops.myshopify.com`
4. Espera 24-48h a propagar

### Paso 4 — Ocultar Shopify EU a Google (evitar contenido duplicado)

Crítico para el SEO. La web pública es `naturaesencials.com` — `tienda.naturaesencials.com` solo es para el checkout, Google NO debe indexarla.

1. Settings → Preferences → **Password protection** OFF (la tienda debe ser pública para que el carrito funcione)
2. Pero añade esto a tu `theme.liquid` antes de `</head>`:
   ```liquid
   {% if request.path == '/' or template contains 'index' or template contains 'collection' or template contains 'product' %}
     <meta name="robots" content="noindex, follow">
   {% endif %}
   ```
   *Nota:* esto desindexa todas las páginas de Shopify excepto el checkout, que igualmente no es indexable.

   Alternativa simpler: en el header del theme, añadir:
   ```liquid
   <meta name="robots" content="noindex, follow">
   ```
   Y dejar que solo la web Next.js sea indexada.

3. Verifica con `https://search.google.com/search?q=site:tienda.naturaesencials.com` que Google deja de mostrar páginas (puede tardar 2-4 semanas).

### Paso 5 — Añadir variables a `.env.local` y a Vercel

En tu archivo `.env.local`:
```
SHOPIFY_EU_DOMAIN=natura-esencials-eu.myshopify.com
SHOPIFY_EU_STOREFRONT_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxx
```

En Vercel: Settings → Environment Variables → añade los mismos valores.

Tras añadirlos en Vercel: pulsa **Redeploy** en la última deployment para que tomen efecto.

---

## 🇬🇧 Shopify UK (cuando actualices al plan con Storefront API)

### Plan actual: básico sin Storefront API

Estás en un plan que no incluye Storefront API. Necesitas actualizar a **Basic Shopify ($29/mes)** o superior.

Para actualizar:
1. Shopify Admin UK → Settings → Plan
2. Selecciona Basic o superior
3. Confirma el cargo

### Una vez actualizado:

Sigue exactamente los mismos pasos 1-5 del Shopify EU pero apuntando a tu tienda UK.

Variables en `.env.local`:
```
SHOPIFY_UK_DOMAIN=natura-esencials-uk.myshopify.com
SHOPIFY_UK_STOREFRONT_TOKEN=shpat_yyyyyyyyyyyyyyyyyyyy
```

### Subdominio UK

1. En Shopify UK, conecta el dominio `uk.shop.naturaesencials.com`
2. Configura DNS apuntando a `shops.myshopify.com`
3. Aplica el mismo `noindex` para no competir con la web Next.js

### Activar UK en la web

Una vez configuradas las variables UK en Vercel y redesplegada la web, automáticamente:
- El selector de región mostrará UK como activo
- Los visitantes desde UK verán productos UK
- Los precios saldrán en GBP
- El checkout redirigirá a `uk.shop.naturaesencials.com/cart/...`

**No hace falta tocar código** — todo está pre-configurado.

---

## 🛒 Cómo funciona el checkout

El cliente añade productos al carrito en la web Next.js. Al pulsar "Pagar":

1. La web genera una URL Shopify Cart Permalink:
   ```
   https://tienda.naturaesencials.com/cart/12345:1,67890:2
   ```
   (formato: `variantId:cantidad,variantId:cantidad,...`)
2. El navegador redirige a esa URL
3. Shopify carga el carrito con los productos
4. El cliente paga en Shopify (con tu TPV configurado, IVA, envíos, etc.)
5. Shopify gestiona el pedido como cualquier otro

**Ventaja:** no hay que reimplementar checkout, IVA, métodos de pago — todo eso ya lo tiene Shopify.

---

## 📦 Sincronización entre tiendas

Las dos tiendas Shopify NO se sincronizan automáticamente. Esto es por diseño — UK tiene catálogo distinto.

**Si quieres sincronizar productos** (mismo producto en ambas regiones):

Opción 1 — Manual: subes el producto a EU, copias y subes a UK. Funciona si tienes pocos productos.

Opción 2 — App de Shopify: instala una app como "MultiStore Connector" o "Tipo" que sincroniza productos entre 2 tiendas.

Opción 3 — Custom: mediante Shopify Admin API se puede automatizar pero requiere desarrollo a medida.

**Recomendación:** empieza manual hasta que tengas >50 SKUs distintos. Entonces evalúa apps.

---

## 🌍 Translate & Adapt para multi-idioma en Shopify

Cada tienda Shopify (EU y UK) puede tener traducciones a múltiples idiomas mediante **Shopify Translate & Adapt** (gratis, viene con tu plan):

1. Shopify Admin → Apps → busca "Translate & Adapt"
2. Instálala
3. Settings → Languages → Add language → añade los idiomas que quieras
4. Para cada producto, traduce: title, description, SEO title, SEO description

**La web Next.js automáticamente leerá las traducciones** del idioma activo gracias al `@inContext(language: ...)` en las queries GraphQL.

Ejemplo: si en Translate & Adapt traduces "Ritual Plenitud" a inglés como "Plenitude Ritual", al visitar `/eu/en/rituales/plenitude` la web mostrará "Plenitude Ritual" automáticamente.

---

## 🐛 Troubleshooting

### "Shopify EU no está configurado todavía"

Causa: faltan las variables `SHOPIFY_EU_DOMAIN` o `SHOPIFY_EU_STOREFRONT_TOKEN`.

Solución: completa el `.env.local` (en local) o las variables en Vercel (en producción) y reinicia/redeploy.

### Productos no aparecen

1. Verifica que el producto está publicado en el sales channel "Online Store"
2. Verifica que el handle del producto coincide con el de `data/rituales.ts` (campo `shopifyHandle`)
3. Verifica que el token Storefront tiene los scopes correctos

### Precio sale "0,00" o vacío

Causa: el producto no tiene precio en la moneda de la región.

Solución: en Shopify EU, asegúrate de que el producto tiene precio en EUR. En Shopify UK, asegúrate de que tiene precio en GBP.

### Idioma no traduce

Causa: Translate & Adapt no tiene la traducción para ese campo en ese idioma.

Solución: ve a Translate & Adapt y completa las traducciones. La web mostrará el idioma original como fallback.

---

© 2026 Natura Esencials
