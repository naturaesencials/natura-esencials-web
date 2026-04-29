import { GraphQLClient } from 'graphql-request';
import type { Locale, Region } from '@/lib/i18n/config';
import { shopifyLanguageMap, shopifyCountryByRegion } from '@/lib/i18n/config';

/**
 * Shopify Storefront API client multi-tienda.
 *
 * Conexión por región:
 * - EU: SHOPIFY_EU_DOMAIN + SHOPIFY_EU_STOREFRONT_TOKEN
 * - UK: SHOPIFY_UK_DOMAIN + SHOPIFY_UK_STOREFRONT_TOKEN
 *
 * Si la región UK no tiene credenciales configuradas (durante la transición
 * mientras Shopify UK actualiza al plan con Storefront API), getShopifyClient
 * lanza un error legible que captura el código consumidor.
 */

const API_VERSION = '2025-01';

interface ShopifyConfig {
  domain: string;
  token: string;
}

function getShopifyConfig(region: Region): ShopifyConfig {
  if (region === 'eu') {
    const domain = process.env.SHOPIFY_EU_DOMAIN;
    const token = process.env.SHOPIFY_EU_STOREFRONT_TOKEN;
    if (!domain || !token) {
      throw new ShopifyNotConfiguredError('eu');
    }
    return { domain, token };
  }
  const domain = process.env.SHOPIFY_UK_DOMAIN;
  const token = process.env.SHOPIFY_UK_STOREFRONT_TOKEN;
  if (!domain || !token) {
    throw new ShopifyNotConfiguredError('uk');
  }
  return { domain, token };
}

export class ShopifyNotConfiguredError extends Error {
  constructor(public region: Region) {
    super(`Shopify ${region.toUpperCase()} no está configurado todavía. Añade las variables de entorno SHOPIFY_${region.toUpperCase()}_DOMAIN y SHOPIFY_${region.toUpperCase()}_STOREFRONT_TOKEN.`);
    this.name = 'ShopifyNotConfiguredError';
  }
}

export function getShopifyClient(region: Region): GraphQLClient {
  const { domain, token } = getShopifyConfig(region);
  return new GraphQLClient(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    headers: {
      'X-Shopify-Storefront-Access-Token': token,
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Helper para construir directiva @inContext según locale + región.
 * Inserta automáticamente país e idioma en cada query.
 */
export function buildContext(region: Region, locale: Locale) {
  return {
    country: shopifyCountryByRegion[region],
    language: shopifyLanguageMap[locale],
  };
}

/** Devuelve la URL del checkout para una región (para el carrito) */
export function getCheckoutDomain(region: Region): string {
  return region === 'eu'
    ? (process.env.SHOPIFY_EU_DOMAIN || '')
    : (process.env.SHOPIFY_UK_DOMAIN || '');
}

/** Permalink de carrito para añadir productos sin SDK */
export function buildCartPermalink(region: Region, items: Array<{ variantId: string; quantity: number }>): string {
  const domain = getCheckoutDomain(region);
  if (!domain) return '#';
  const cartString = items.map(i => `${i.variantId}:${i.quantity}`).join(',');
  return `https://${domain}/cart/${cartString}`;
}
