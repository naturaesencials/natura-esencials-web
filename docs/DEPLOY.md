# Despliegue en Vercel — paso a paso

Esta guía detalla cómo poner Natura Esencials en producción en `naturaesencials.com` desde cero. Tiempo estimado: **30-45 minutos** (única vez).

---

## Pre-requisitos

- ✅ Cuenta de [GitHub](https://github.com) (gratis)
- ✅ Cuenta de [Vercel](https://vercel.com) conectada a tu GitHub (gratis)
- ✅ Acceso a tu proveedor de DNS (donde está registrado `naturaesencials.com`)
- ✅ Variables de entorno listas (al menos las de Shopify EU y Omnisend)

---

## 1. Subir el proyecto a GitHub

### 1.1 Crear repositorio

1. Ve a [github.com/new](https://github.com/new)
2. Repository name: `natura-esencials-web`
3. Privado (recomendado para no exponer la lógica de la web)
4. **NO** inicialices con README, .gitignore o LICENSE — los tienes ya en el ZIP
5. Pulsa **Create repository**

### 1.2 Subir el código desde tu Mac

```bash
# Abre Terminal y navega a la carpeta del proyecto
cd ~/Downloads/natura-esencials

# Inicializar Git
git init
git branch -M main

# Añadir todo (excepto lo que está en .gitignore)
git add .
git commit -m "feat: initial Natura Esencials web"

# Conectar con tu repositorio remoto (cambia TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/natura-esencials-web.git

# Push inicial
git push -u origin main
```

Si te pide autenticación, GitHub ya no acepta password — necesitas un Personal Access Token. Crea uno en [github.com/settings/tokens](https://github.com/settings/tokens) con scope `repo`.

Alternativa sin tokens: instala [GitHub CLI](https://cli.github.com/) y haz `gh auth login` una sola vez.

---

## 2. Importar en Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa el repositorio `natura-esencials-web`
3. Vercel detecta automáticamente que es Next.js y configura todo
4. **Antes de pulsar Deploy**, expande la sección "Environment Variables"

### 2.1 Configurar variables de entorno

Añade UNA POR UNA las siguientes (las que tengas valor — vacías no las pongas):

| Nombre | Valor de ejemplo | Obligatoria |
|--------|------------------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://naturaesencials.com` | ✅ Sí |
| `GOOGLE_SITE_VERIFICATION` | (de Google Search Console) | Recomendada |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Recomendada |
| `SHOPIFY_EU_DOMAIN` | `tu-tienda.myshopify.com` | ✅ Sí |
| `SHOPIFY_EU_STOREFRONT_TOKEN` | `shpat_xxx...` | ✅ Sí |
| `SHOPIFY_UK_DOMAIN` | (cuando lo tengas) | Opcional |
| `SHOPIFY_UK_STOREFRONT_TOKEN` | (cuando lo tengas) | Opcional |
| `OMNISEND_API_KEY` | (de Omnisend) | Recomendada |
| `REVALIDATE_TOKEN` | una cadena aleatoria larga (≥32 caracteres) | Recomendada |

Para cada variable:
- En el campo "Key" pon el nombre exacto (ej: `SHOPIFY_EU_DOMAIN`)
- En "Value" pon el valor
- Marca todos los environments: Production, Preview, Development
- Pulsa **Add**

### 2.2 Deploy

Pulsa el botón **Deploy** grande al final.

En 60-90 segundos verás:
- ✅ Build completado
- ✅ Deploy completado
- 🔗 Una URL provisional tipo `natura-esencials-web-abc123.vercel.app`

Ábrela. Deberías ver la web funcionando, redirigida a `/eu/es/`.

**Si hay error en el build**: revisa la pestaña "Logs" en Vercel para ver qué falló. Lo más común: variable de entorno mal escrita o falta `SHOPIFY_EU_DOMAIN`.

---

## 3. Conectar tu dominio

### 3.1 Backup primero

**ANTES de cambiar nada, asegúrate de que tu Shopify EU actual tiene un subdominio alternativo configurado** (ej: `tienda.naturaesencials.com`). Esto se hace en Shopify Admin → Settings → Domains → Add domain.

Si no haces esto, al cambiar los DNS perderás temporalmente acceso al checkout.

### 3.2 Añadir dominio en Vercel

1. Vercel → tu proyecto → Settings → Domains
2. Pulsa **Add Domain**
3. Escribe `naturaesencials.com` → Add
4. Vercel te pedirá configurar registros DNS

### 3.3 Configurar DNS

En tu proveedor de DNS (Cloudflare, GoDaddy, Namecheap, etc.), configura:

**Para `naturaesencials.com` (dominio raíz):**
- Tipo: `A`
- Name: `@` (o vacío)
- Value: `76.76.21.21` (IP de Vercel)
- TTL: 3600

**Para `www.naturaesencials.com`:**
- Tipo: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: 3600

**Para `tienda.naturaesencials.com` (Shopify EU):**
- Tipo: `CNAME`
- Name: `tienda`
- Value: `shops.myshopify.com`
- TTL: 3600

**Para `uk.shop.naturaesencials.com` (Shopify UK, cuando esté):**
- Tipo: `CNAME`
- Name: `uk.shop`
- Value: `shops.myshopify.com`
- TTL: 3600

Si usas **Cloudflare**: deshabilita el proxy (icono nube) para los registros de Vercel — debe estar en "DNS only" (gris), no "Proxied" (naranja). Vercel maneja su propio CDN.

### 3.4 Verificación SSL

Vercel automáticamente emite certificado SSL gratuito (Let's Encrypt). Tarda 5-15 minutos tras configurar DNS.

Verifica entrando a `https://naturaesencials.com` — debe cargar con candado verde.

### 3.5 Redirect www → no-www (o al revés)

Decide si quieres que la URL canónica sea `naturaesencials.com` o `www.naturaesencials.com`. Recomendación: **sin www** (más limpio).

En Vercel → Domains → encuentra `www.naturaesencials.com` → pulsa los 3 puntos → **Edit** → "Redirect to" → selecciona `naturaesencials.com` → Save.

---

## 4. Verificar Google Search Console

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → URL prefix: `https://naturaesencials.com`
3. Método de verificación: **HTML tag**
4. Te dará un código tipo `<meta name="google-site-verification" content="abc123...">`
5. **Solo el valor del content**: añádelo en Vercel como variable `GOOGLE_SITE_VERIFICATION=abc123...`
6. Redeploy en Vercel
7. Vuelve a Search Console → pulsa **Verify**

### 4.1 Enviar sitemap

Una vez verificado:
1. Search Console → Sitemaps → Add new sitemap
2. URL: `sitemap.xml`
3. Submit

Debería aparecer "Success" y empezar a indexar las 14+ URLs en las próximas horas/días.

### 4.2 Geo-targeting por subdirectorio

En Search Console:
1. Configuración → International targeting → Country targeting
2. Crea una propiedad URL prefix por cada subdirectorio:
   - `https://naturaesencials.com/eu/es/` → Target: España
   - `https://naturaesencials.com/eu/fr/` → Target: Francia
   - `https://naturaesencials.com/eu/de/` → Target: Alemania
   - ... etc
   - `https://naturaesencials.com/uk/en/` → Target: Reino Unido

Esto le dice a Google qué versión mostrar en cada país.

---

## 5. Activar Google Analytics 4

1. Ve a [analytics.google.com](https://analytics.google.com)
2. Crea una propiedad para "Natura Esencials"
3. Configura un Web data stream apuntando a `https://naturaesencials.com`
4. Copia el Measurement ID (formato `G-XXXXXXXXXX`)
5. En Vercel: actualiza la variable `NEXT_PUBLIC_GA_ID` con ese valor
6. Redeploy

A las 24-48h verás datos de tráfico real.

---

## 6. Workflow de actualizaciones futuras

Cualquier cambio en el proyecto:

```bash
cd ~/Downloads/natura-esencials

# Hacer cambios (manualmente o reemplazando archivos que yo te entrego)

git add .
git commit -m "feat: descripción del cambio"
git push
```

Vercel detecta el push automáticamente y redeploya en ~60 segundos.

**Preview deployments**: cada commit en una rama distinta de `main` genera una URL de preview (útil para probar cambios antes de merge a producción).

---

## 7. Errores comunes durante el deploy

### Build falla con "Cannot find module 'next-intl'"

→ El `npm install` no terminó bien en Vercel. Settings → Build & Development Settings → Install Command: déjalo en blanco para que use el por defecto. Redeploy.

### Build falla con "ShopifyNotConfiguredError"

→ Falta `SHOPIFY_EU_DOMAIN` o `SHOPIFY_EU_STOREFRONT_TOKEN`. Settings → Environment Variables → añádelas → Redeploy.

### Las páginas devuelven 404

→ Probablemente las redirecciones del middleware no están bien. Comprueba que `middleware.ts` está en la raíz del proyecto, no dentro de `src/`.

### El sitio carga pero los productos no aparecen

→ Las queries Shopify están fallando. Abre Vercel → Functions logs y mira los errores. Causa común: el token Storefront no tiene los scopes correctos. Vuelve a Shopify y revisa los scopes (ver `docs/SHOPIFY_SETUP.md`).

### CSS no carga / la web se ve sin estilos

→ Tailwind no está building. Mira los logs del build. Causa común: `tailwind.config.ts` no encuentra los archivos. Verifica que el `content` cubre `./src/**/*.{ts,tsx}`.

### Idioma cambia pero el contenido sigue en español

→ Falta el archivo de traducciones. Verifica que `messages/{locale}.json` existe para todos los idiomas listados en `locales`.

---

## 8. Optimizaciones post-deploy

Una vez todo funcionando:

- [ ] **Vercel Speed Insights**: ya activado en `layout.tsx`. Ver datos en Vercel → Speed Insights tab
- [ ] **Vercel Analytics**: ya activado. Ver datos en Vercel → Analytics tab
- [ ] **Bing Webmaster Tools**: importa la propiedad desde Google Search Console (1 click)
- [ ] **Google Merchant Center**: cuando tengas tráfico, conecta el feed Shopify para Google Shopping orgánico
- [ ] **Cloudflare** (opcional): si quieres CDN extra delante de Vercel para cache más agresivo, pero Vercel ya viene con CDN edge global, no es necesario para empezar

---

## 9. Costes estimados

| Servicio | Plan inicial | Coste/mes |
|----------|-------------|-----------|
| Vercel | Hobby (gratis hasta 100 GB de bandwidth) | **0 €** |
| Vercel Pro | Si superas Hobby | 20 €/mes |
| GitHub | Privado gratis hasta 3 colaboradores | **0 €** |
| Dominio `naturaesencials.com` | (ya lo tienes) | ~12 €/año |
| Shopify EU | (ya lo tienes) | tu plan actual |
| Shopify UK Basic | A activar | 29 USD/mes |
| Omnisend | Free hasta 250 contactos | **0 €** |
| Sanity (blog) | Free hasta 100k requests | **0 €** |

**Total nuevo: ~29 USD/mes** (solo el upgrade de Shopify UK).

---

## 🎯 Checklist final pre-launch

Antes de anunciar la web públicamente:

- [ ] Web cargando en `https://naturaesencials.com` con SSL activo
- [ ] Las 14 combinaciones region+locale funcionando (probar `/eu/es`, `/eu/en`, `/uk/en`, etc.)
- [ ] Productos aparecen con precios correctos (EUR en EU, GBP en UK)
- [ ] Selector de region+idioma funciona en header y footer
- [ ] Banner de detección automática aparece y se puede cerrar
- [ ] Newsletter envía email de bienvenida via Omnisend
- [ ] Google Search Console verificado y sitemap enviado
- [ ] Google Analytics activado y registrando visitas
- [ ] `https://naturaesencials.com/sitemap.xml` accesible y devuelve XML válido
- [ ] `https://naturaesencials.com/robots.txt` accesible
- [ ] Lighthouse score > 90 en todas las métricas (test en Chrome DevTools)
- [ ] Test en iPhone real (no solo emulador)
- [ ] Test en Android real
- [ ] Cookies banner si aplica (RGPD)
- [ ] Páginas legales: privacidad, términos, cookies (pendientes — para próxima iteración)

---

¿Algo no funciona? Revisa la pestaña **Logs** en Vercel — el 90% de problemas tienen el mensaje exacto ahí.

© 2026 Natura Esencials
