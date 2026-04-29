# Natura Esencials — Web

Web pública de Natura Esencials construida con Next.js 14, conectada a dos tiendas Shopify (EU + UK) con SEO completo en 7 idiomas.

---

## 🚀 Arranque rápido (15 minutos)

### 1. Requisitos previos

- **Node.js ≥ 18.18** instalado en tu Mac. Si no lo tienes: `brew install node` o descarga de [nodejs.org](https://nodejs.org/).
- **Cuenta de GitHub** con un repositorio nuevo creado para este proyecto.
- **Cuenta de Vercel** conectada a tu GitHub (gratis en [vercel.com](https://vercel.com)).
- **Acceso a tu Shopify EU** (para sacar el Storefront API token).

### 2. Instalar y probar en local

Abre Terminal en tu Mac y ejecuta:

```bash
cd ~/Downloads/natura-esencials
npm install
cp .env.example .env.local
# Edita .env.local con tus credenciales reales (al menos las de EU)
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) → te redirige automáticamente a `/eu/es/`.

Para probar otros idiomas: cambia la URL a `/eu/en/`, `/eu/fr/`, etc.

### 3. Subir a GitHub

```bash
cd ~/Downloads/natura-esencials
git init
git add .
git commit -m "feat: initial Natura Esencials web"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/natura-esencials-web.git
git push -u origin main
```

Reemplaza `TU_USUARIO` con tu usuario real de GitHub. El repositorio debe existir antes (créalo en github.com/new).

### 4. Deployar en Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa el repositorio `natura-esencials-web`
3. Vercel detecta automáticamente Next.js
4. **Antes de pulsar Deploy**, abre la sección "Environment Variables" y añade las variables de tu `.env.local` (todas las que tengas valor — vacías no las pongas):

   | Variable | Valor |
   |----------|-------|
   | `NEXT_PUBLIC_SITE_URL` | `https://naturaesencials.com` |
   | `GOOGLE_SITE_VERIFICATION` | tu código de Google Search Console |
   | `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` |
   | `SHOPIFY_EU_DOMAIN` | `tu-tienda-eu.myshopify.com` |
   | `SHOPIFY_EU_STOREFRONT_TOKEN` | tu token Storefront EU |
   | `OMNISEND_API_KEY` | tu API key Omnisend |
   | `REVALIDATE_TOKEN` | una cadena aleatoria larga |

5. Pulsa **Deploy**. En 60 segundos tendrás una URL provisional tipo `natura-esencials-web.vercel.app`.

### 5. Conectar tu dominio

1. Vercel → tu proyecto → Settings → Domains
2. Añade `naturaesencials.com` y `www.naturaesencials.com`
3. Vercel te dará registros DNS (A o CNAME)
4. Añádelos en tu proveedor de DNS (donde tengas el dominio: GoDaddy, Namecheap, Cloudflare...)
5. **Importante:** Antes de cambiar los DNS, asegúrate de que el Shopify EU actual está accesible en otro subdominio (`tienda.naturaesencials.com`), si no quedará inalcanzable durante la transición.

---

## 📚 Documentación adicional

- [`docs/SEO_STRATEGY.md`](docs/SEO_STRATEGY.md) — keyword research por idioma, estructura semántica, monitoring
- [`docs/SHOPIFY_SETUP.md`](docs/SHOPIFY_SETUP.md) — cómo configurar Shopify EU y UK
- [`docs/DEPLOY.md`](docs/DEPLOY.md) — guía detallada de despliegue en Vercel + DNS

---

## 🏗️ Arquitectura

### Estructura de URLs

```
naturaesencials.com/                  → redirige a /eu/es/
naturaesencials.com/eu/es/            → España, español, Shopify EU
naturaesencials.com/eu/en/            → Europa continental, inglés, Shopify EU
naturaesencials.com/eu/{fr,de,it,nl,pt}/  → Otros países EU
naturaesencials.com/uk/en/            → Reino Unido, inglés, Shopify UK
naturaesencials.com/uk/{es,fr,de,it,nl,pt}/  → UK en otros idiomas

tienda.naturaesencials.com/           → Shopify EU (oculto a Google)
uk.shop.naturaesencials.com/          → Shopify UK (oculto a Google)
```

### Tecnologías

- **Next.js 14** (App Router, Server Components)
- **TypeScript** estricto
- **Tailwind CSS** + CSS Variables para tokens de diseño
- **next-intl** para i18n (7 idiomas)
- **Shopify Storefront API** para productos
- **Omnisend** para newsletter
- **Vercel Analytics** + **Speed Insights**

### Decisiones SEO clave

- HTML semántico server-rendered (Google ve todo)
- `hreflang` correcto para 14 combinaciones region+locale
- Schema.org JSON-LD: Organization, LocalBusiness, WebSite, Product, BreadcrumbList, ItemList
- Sitemap dinámico multi-idioma multi-región
- Slugs traducidos por idioma (`/es/cosmetica`, `/en/skincare`, `/fr/cosmetiques`...)
- Canonical absolutos sin parámetros
- `next/image` con WebP/AVIF automático y lazy loading
- Fonts con `display: swap` y preload
- Core Web Vitals optimizado por defecto

---

## 🧰 Comandos disponibles

| Comando | Qué hace |
|---------|----------|
| `npm run dev` | Servidor de desarrollo local en :3000 |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build de producción local |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript check sin emitir archivos |
| `npm run format` | Prettier sobre `src/` |

---

## 🔄 Flujo de actualización futura

Cuando recibas archivos modificados (yo te paso ZIPs con los cambios):

```bash
# 1. Reemplaza los archivos modificados en tu carpeta del proyecto
# 2. Test local
npm run dev

# 3. Si todo bien, commit y push
git add .
git commit -m "feat: descripción del cambio"
git push

# 4. Vercel redeploya automáticamente en ~60 segundos
```

---

## 📞 Estructura de carpetas

```
natura-esencials/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── [region]/[locale]/  # Rutas region+locale
│   │   │   ├── page.tsx        # Home
│   │   │   ├── layout.tsx      # Layout que provee i18n
│   │   │   ├── cosmetica/      # Listado cosmética (pendiente)
│   │   │   ├── hogar/          # Listado hogar (pendiente)
│   │   │   ├── mascota/        # Listado mascota (pendiente)
│   │   │   ├── rituales/[slug] # Ficha producto (pendiente)
│   │   │   ├── origen/         # Página origen (pendiente)
│   │   │   ├── diario/         # Blog (pendiente)
│   │   │   └── contacto/       # Página contacto (pendiente)
│   │   ├── api/                # API routes
│   │   ├── sitemap.ts          # Sitemap dinámico
│   │   ├── robots.ts           # Robots.txt
│   │   └── manifest.ts         # PWA manifest
│   ├── components/
│   │   ├── home/               # Componentes home (Hero, DualFeatured, etc.)
│   │   ├── layout/             # Header, Footer, MobileMenu, RegionSelector
│   │   ├── product/            # Componentes producto (pendiente)
│   │   ├── seo/                # JsonLd
│   │   └── ui/                 # UI primitivos
│   ├── lib/
│   │   ├── i18n/               # Config idiomas + regiones, helpers paths
│   │   ├── seo/                # buildMetadata, schema.org generators
│   │   ├── shopify/            # Cliente Storefront API + queries
│   │   ├── omnisend/           # Cliente newsletter
│   │   └── sanity/             # Cliente blog (pendiente)
│   ├── config/                 # site.ts (single source of truth)
│   ├── data/                   # rituales.ts (datos de productos)
│   └── styles/                 # CSS global
├── messages/                   # Traducciones (es.json, en.json, ...)
├── public/                     # Assets públicos
│   ├── images/
│   └── icons/
├── docs/                       # Documentación
├── middleware.ts               # Middleware de routing region/locale
├── next.config.mjs             # Config Next.js
├── tailwind.config.ts          # Config Tailwind
├── tsconfig.json               # Config TypeScript
├── package.json
├── .env.example                # Plantilla de variables
└── .gitignore
```

---

## ⚠️ Estado actual del proyecto

**Listo y funcional:**
- Home page completa en 7 idiomas × 2 regiones (14 combinaciones)
- SEO infraestructura completa (metadata, schema.org, sitemap, robots, manifest)
- Header con menú móvil + selector region/idioma
- Footer con selector region/idioma siempre visible
- Banner de detección automática de región
- Newsletter conectado a Omnisend
- Popup welcome con código descuento

**Pendiente para próximas iteraciones:**
- Página de listado: cosmética, hogar, mascota
- Ficha de producto (`/rituales/[slug]`)
- Página origen
- Página diario (blog) con Sanity CMS
- Página contacto
- Carrito y checkout (redirige a Shopify)
- Sistema de reviews (Judge.me)

---

© 2026 Natura Esencials · Albion Wealth Services Ltd
