import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/*?*utm_',
          '/*?*fbclid',
          '/*?*gclid',
          '/*/carrito',
          '/*/cart',
          '/*/buscar',
          '/*/search',
          '/*/cuenta',
          '/*/account',
          '/*/checkout',
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
