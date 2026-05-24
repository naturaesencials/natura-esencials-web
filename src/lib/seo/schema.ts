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
  /** Precio (opcional: si no se da, no se emite el bloque offers) */
  price?: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  url: string;
  ratingValue?: number;
  ratingCount?: number;
  ingredients?: string[];
  /** Región — determina las condiciones de envío (eu | uk) */
  region?: 'eu' | 'uk';
  /** Propiedades técnicas adicionales: ISO 16128 %, pH, PAO en meses, etc. */
  additionalProperties?: Array<{ name: string; value: string | number; unitText?: string }>;
  /** ¿Es un pack/bundle? -> @type ProductGroup */
  isBundle?: boolean;
  /** Idioma del contenido (BCP-47) */
  inLanguage?: string;
}

export function productSchema(product: ProductSchemaConfig) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': product.isBundle ? 'ProductGroup' : 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: { '@type': 'Brand', name: product.brand || siteConfig.name },
    manufacturer: { '@id': `${siteConfig.url}/#organization` },
    url: product.url,
  };

  if (product.inLanguage) schema.inLanguage = product.inLanguage;

  // Offers — siempre presente (Google exige offers | review | aggregateRating)
  if (product.availability || product.price !== undefined) {
    const offer: Record<string, unknown> = {
      '@type': 'Offer',
      url: product.url,
      availability: `https://schema.org/${product.availability || 'InStock'}`,
      seller: { '@id': `${siteConfig.url}/#organization` },
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: product.region === 'uk' ? 'GB' : ['ES', 'FR', 'DE', 'IT', 'NL', 'PT'],
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    };
    if (product.price !== undefined && product.currency) {
      offer.price = product.price;
      offer.priceCurrency = product.currency;
    }

    // shippingDetails — requerido para Merchant Listing en GSC
    const isUK = product.region === 'uk';
    const freeThreshold = isUK ? 60 : 40;
    const shipCurrency  = isUK ? 'GBP' : 'EUR';
    const shipCountry   = isUK ? 'GB'  : 'ES';
    const deliveryMin   = isUK ? 1 : 2;
    const deliveryMax   = isUK ? 3 : 5;

    offer.shippingDetails = [
      {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: '0.00', currency: shipCurrency },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: shipCountry },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: deliveryMin, maxValue: deliveryMax, unitCode: 'DAY' },
        },
        doesNotShip: false,
        description: `Free shipping on orders over ${isUK ? '£' : '€'}${freeThreshold}`,
      },
    ];
    schema.offers = offer;
  }

  if (product.category) schema.category = product.category;

  // Propiedades técnicas (ISO 16128 %, pH, PAO, etc.)
  if (product.additionalProperties && product.additionalProperties.length > 0) {
    schema.additionalProperty = product.additionalProperties.map((p) => ({
      '@type': 'PropertyValue',
      name: p.name,
      value: p.value,
      ...(p.unitText && { unitText: p.unitText }),
    }));
  }

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
