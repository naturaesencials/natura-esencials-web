import { siteConfig } from '@/config/site';
import type { Locale, Region } from '@/lib/i18n/config';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    url: siteConfig.url,
    logo: { '@type': 'ImageObject', url: `${siteConfig.url}/icons/logo.png`, width: 512, height: 512 },
    foundingDate: `${siteConfig.founded}-01-01`,
    description: siteConfig.tagline,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.origin.city,
      addressRegion: siteConfig.origin.region,
      addressCountry: siteConfig.origin.countryCode,
      postalCode: siteConfig.origin.postalCode,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      availableLanguage: ['Spanish', 'English', 'French', 'German', 'Italian', 'Dutch', 'Portuguese'],
      areaServed: ['ES', 'GB', 'FR', 'DE', 'IT', 'NL', 'PT'],
    },
    sameAs: Object.values(siteConfig.social),
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    image: `${siteConfig.url}/og-default.jpg`,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.origin.city,
      addressRegion: siteConfig.origin.region,
      addressCountry: siteConfig.origin.countryCode,
      postalCode: siteConfig.origin.postalCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.origin.coordinates.lat,
      longitude: siteConfig.origin.coordinates.lng,
    },
  };
}

export function websiteSchema(region: Region, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.tagline,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/${region}/${locale}/buscar?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

interface BreadcrumbItem { name: string; url: string; }

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

interface ProductSchemaConfig {
  name: string;
  description: string;
  image: string[];
  sku: string;
  brand?: string;
  category?: string;
  price: number;
  currency: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  url: string;
  ratingValue?: number;
  ratingCount?: number;
  ingredients?: string[];
}

export function productSchema(product: ProductSchemaConfig) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: { '@type': 'Brand', name: product.brand || siteConfig.name },
    manufacturer: { '@id': `${siteConfig.url}/#organization` },
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: product.currency,
      price: product.price,
      availability: `https://schema.org/${product.availability}`,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      seller: { '@id': `${siteConfig.url}/#organization` },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'ES',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
  };
  if (product.category) schema.category = product.category;
  if (product.ratingValue && product.ratingCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.ratingValue,
      reviewCount: product.ratingCount,
      bestRating: 5, worstRating: 1,
    };
  }
  return schema;
}

interface ItemListConfig {
  items: Array<{ name: string; url: string; image?: string; position: number }>;
  name: string;
}

export function itemListSchema(config: ItemListConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: config.name,
    itemListElement: config.items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url,
      ...(item.image && { image: item.image }),
    })),
  };
}
