import { GraphQLClient } from 'graphql-request';
import type { Locale, Region } from '@/lib/i18n/config';
import { shopifyLanguageMap, shopifyCountryByRegion } from '@/lib/i18n/config';

/**
 * Shopify Storefront API client multi-tienda.
 *
 * Variables de entorno requeridas:
 * - EU:  SHOPIFY_EU_DOMAIN + SHOPIFY_EU_STOREFRONT_TOKEN
 * - UK:  SHOPIFY_UK_DOMAIN + SHOPIFY_UK_STOREFRONT_TOKEN
 *
 * Variables opcionales:
 * - SHOPIFY_UK_CHECKOUT_DOMAIN  → dominio personalizado para checkout UK
 *   (p.ej. shop.naturaesencials.co.uk). Si no está definido, usa SHOPIFY_UK_DOMAIN.
 * - NEXT_PUBLIC_UK_LIVE=true    → activa la región UK en la web (quita "Coming soon")
 */

const API_VERSION = '2025-01';

interface ShopifyConfig {
  domain: string;
  token: string;
}

function getShopifyConfig(region: Region): ShopifyConfig {
  if (region === 'eu') {
    const domain = process.env.SHOPIFY_EU_DOMAIN;
    const token  = process.env.SHOPIFY_EU_STOREFRONT_TOKEN;
    if (!domain || !token) throw new ShopifyNotConfiguredError('eu');
    return { domain, token };
  }
  // UK
  const domain = process.env.SHOPIFY_UK_DOMAIN;
  const token  = process.env.SHOPIFY_UK_STOREFRONT_TOKEN;
  if (!domain || !token) throw new ShopifyNotConfiguredError('uk');
  return { domain, token };
}

export class ShopifyNotConfiguredError extends Error {
  constructor(public region: Region) {
    super(
      `Shopify ${region.toUpperCase()} no configurado. ` +
      `Añade SHOPIFY_${region.toUpperCase()}_DOMAIN y ` +
      `SHOPIFY_${region.toUpperCase()}_STOREFRONT_TOKEN en Vercel.`
    );
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

export function buildContext(region: Region, locale: Locale) {
  return {
    country: shopifyCountryByRegion[region],
    language: shopifyLanguageMap[locale],
  };
}

/**
 * Devuelve el dominio de checkout para cada región.
 * UK puede tener dominio personalizado (SHOPIFY_UK_CHECKOUT_DOMAIN),
 * si no, cae al dominio de la tienda (SHOPIFY_UK_DOMAIN).
 */
export function getCheckoutDomain(region: Region): string {
  if (region === 'eu') return 'tienda.naturaesencials.com';
  return (
    process.env.SHOPIFY_UK_CHECKOUT_DOMAIN ||
    process.env.SHOPIFY_UK_DOMAIN ||
    ''
  );
}

/** Permalink de carrito para añadir productos sin SDK */
export function buildCartPermalink(
  region: Region,
  items: Array<{ variantId: string; quantity: number }>,
): string {
  const domain = getCheckoutDomain(region);
  if (!domain) return '#';
  const cartString = items.map(i => `${i.variantId}:${i.quantity}`).join(',');
  return `https://${domain}/cart/${cartString}`;
}

/** Helper: ¿está UK activo? (env var NEXT_PUBLIC_UK_LIVE=true) */
export function isUkLive(): boolean {
  return process.env.NEXT_PUBLIC_UK_LIVE === 'true';
}
