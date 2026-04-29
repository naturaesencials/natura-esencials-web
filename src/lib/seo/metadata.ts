import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import {
  getAlternates,
  getCanonicalUrl,
  localeMap,
  type Locale,
  type Region,
} from '@/lib/i18n/config';

interface PageSeoConfig {
  title: string;
  description: string;
  path?: string;
  region: Region;
  locale: Locale;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'product';
  noIndex?: boolean;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

/**
 * Genera metadata SEO completa y correcta para cualquier página.
 * Cubre: title, description, canonical, hreflang, OG, Twitter Card, robots, PWA icons.
 */
export function buildMetadata(config: PageSeoConfig): Metadata {
  const {
    title, description, path = '', region, locale,
    image = '/og-default.jpg', imageAlt, type = 'website',
    noIndex = false, keywords, publishedTime, modifiedTime, author,
  } = config;

  const fullTitle = title.includes(siteConfig.name) ? title : `${title} · ${siteConfig.name}`;
  const truncatedDesc = description.length > 160
    ? description.slice(0, 157).replace(/\s+\S*$/, '') + '…'
    : description;

  const canonical = getCanonicalUrl(region, locale, path);
  const alternates = getAlternates(path);
  const absoluteImage = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  return {
    title: fullTitle,
    description: truncatedDesc,
    keywords: keywords?.join(', '),
    authors: [{ name: author || siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),

    alternates: { canonical, languages: alternates },

    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true, follow: true,
          googleBot: {
            index: true, follow: true,
            'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1,
          },
        },

    openGraph: {
      type: type === 'product' ? 'website' : type,
      locale: localeMap[locale].ogLocale,
      alternateLocale: Object.values(localeMap).filter((l) => l.ogLocale !== localeMap[locale].ogLocale).map((l) => l.ogLocale),
      url: canonical,
      title: fullTitle,
      description: truncatedDesc,
      siteName: siteConfig.name,
      images: [{ url: absoluteImage, width: 1200, height: 630, alt: imageAlt || title, type: 'image/jpeg' }],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },

    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: truncatedDesc,
      images: [absoluteImage],
      creator: '@naturaesencials',
      site: '@naturaesencials',
    },

    formatDetection: { email: false, address: false, telephone: false },

    ...(siteConfig.googleSiteVerification && {
      verification: { google: siteConfig.googleSiteVerification },
    }),

    manifest: '/manifest.webmanifest',

    icons: {
      icon: [
        { url: '/icons/favicon.ico', sizes: 'any' },
        { url: '/icons/icon.svg', type: 'image/svg+xml' },
        { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      other: [{ rel: 'mask-icon', url: '/icons/safari-pinned-tab.svg', color: '#3A6B47' }],
    },

    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: siteConfig.name,
    },
  };
}
