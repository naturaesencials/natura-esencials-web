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
 * - SHOPIFY_{REGION}_PRIVATE_TOKEN → si está presente, se usa como
 *   Private access token de Shopify (header `Shopify-Storefront-Private-Token`).
 *   Si NO está, se usa SHOPIFY_{REGION}_STOREFRONT_TOKEN como Public access token
 *   (header `X-Shopify-Storefront-Access-Token`).
 * - SHOPIFY_UK_CHECKOUT_DOMAIN  → dominio personalizado para checkout UK
 *   (p.ej. shop.naturaesencials.co.uk). Si no está definido, usa SHOPIFY_UK_DOMAIN.
 * - NEXT_PUBLIC_UK_LIVE=true    → activa la región UK en la web (quita "Coming soon")
 *
 * Nota sobre tokens:
 * - El Public access token (header `X-Shopify-Storefront-Access-Token`) viene del
 *   Headless storefront → "Public access tokens" y funciona client+server.
 * - El Private access token (header `Shopify-Storefront-Private-Token`) viene del
 *   mismo sitio → "Private access tokens" y SOLO funciona server-side, con
 *   rate limits más altos y acceso a productos no publicados al canal.
 */

const API_VERSION = '2025-01';

interface ShopifyConfig {
  domain: string;
  token: string;
  isPrivate: boolean;
}

function getShopifyConfig(region: Region): ShopifyConfig {
  const prefix = `SHOPIFY_${region.toUpperCase()}`;
  const domain      = process.env[`${prefix}_DOMAIN`];
  const privateTok  = process.env[`${prefix}_PRIVATE_TOKEN`];
  const publicTok   = process.env[`${prefix}_STOREFRONT_TOKEN`];

  if (!domain) throw new ShopifyNotConfiguredError(region);

  // Private token tiene prioridad (mejor rate limits, server-side)
  if (privateTok) return { domain, token: privateTok, isPrivate: true };
  if (publicTok)  return { domain, token: publicTok,  isPrivate: false };

  throw new ShopifyNotConfiguredError(region);
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
  const { domain, token, isPrivate } = getShopifyConfig(region);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  // Private tokens require a different header than public tokens
  if (isPrivate) {
    headers['Shopify-Storefront-Private-Token'] = token;
  } else {
    headers['X-Shopify-Storefront-Access-Token'] = token;
  }
  return new GraphQLClient(
    `https://${domain}/api/${API_VERSION}/graphql.json`,
    { headers },
  );
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
