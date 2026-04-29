import { gql } from 'graphql-request';
import type { Locale, Region } from '@/lib/i18n/config';
import { getShopifyClient, buildContext, ShopifyNotConfiguredError } from './client';

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  productType: string;
  tags: string[];
  vendor: string;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  images: { nodes: Array<{ url: string; altText: string | null; width: number; height: number }> };
  variants: { nodes: Array<{ id: string; title: string; price: { amount: string; currencyCode: string }; availableForSale: boolean; selectedOptions: Array<{ name: string; value: string }> }> };
  seo: { title: string | null; description: string | null };
}

const PRODUCT_FRAGMENT = gql`
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    productType
    tags
    vendor
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    images(first: 10) {
      nodes { url altText width height }
    }
    variants(first: 20) {
      nodes {
        id
        title
        price { amount currencyCode }
        availableForSale
        selectedOptions { name value }
      }
    }
    seo { title description }
  }
`;

export async function getProductByHandle(
  handle: string,
  region: Region,
  locale: Locale,
): Promise<ShopifyProduct | null> {
  try {
    const client = getShopifyClient(region);
    const ctx = buildContext(region, locale);
    const query = gql`
      query getProduct($handle: String!, $country: CountryCode!, $language: LanguageCode!)
      @inContext(country: $country, language: $language) {
        product(handle: $handle) { ...ProductFields }
      }
      ${PRODUCT_FRAGMENT}
    `;
    const data = await client.request<{ product: ShopifyProduct | null }>(query, {
      handle,
      country: ctx.country,
      language: ctx.language,
    });
    return data.product;
  } catch (e) {
    if (e instanceof ShopifyNotConfiguredError) {
      console.warn(`[Shopify] ${e.message}`);
      return null;
    }
    console.error('[Shopify] Error fetching product:', e);
    return null;
  }
}

export async function getAllProducts(
  region: Region,
  locale: Locale,
  limit = 50,
): Promise<ShopifyProduct[]> {
  try {
    const client = getShopifyClient(region);
    const ctx = buildContext(region, locale);
    const query = gql`
      query getProducts($first: Int!, $country: CountryCode!, $language: LanguageCode!)
      @inContext(country: $country, language: $language) {
        products(first: $first) {
          nodes { ...ProductFields }
        }
      }
      ${PRODUCT_FRAGMENT}
    `;
    const data = await client.request<{ products: { nodes: ShopifyProduct[] } }>(query, {
      first: limit,
      country: ctx.country,
      language: ctx.language,
    });
    return data.products.nodes;
  } catch (e) {
    if (e instanceof ShopifyNotConfiguredError) {
      console.warn(`[Shopify] ${e.message}`);
      return [];
    }
    console.error('[Shopify] Error fetching products:', e);
    return [];
  }
}
