# Imágenes del proyecto

- `og-default.jpg` (1200x630) — imagen Open Graph por defecto
- `products/{shopify-handle}.jpg` — imágenes de producto fallback (las reales vendrán de Shopify CDN)

Las imágenes de la home son hosted en Pexels temporalmente. Cuando tengas la sesión fotográfica:
1. Sube las imágenes a `public/images/home/`
2. Actualiza los componentes en `src/components/home/` para apuntar a `/images/home/...`
