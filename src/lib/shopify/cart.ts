import { gql } from 'graphql-request';
import { getShopifyClient, buildContext, ShopifyNotConfiguredError } from './client';
import type { Region, Locale } from '@/lib/i18n/config';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      title: string;
      handle: string;
      images: { nodes: Array<{ url: string; altText: string | null }> };
    };
    price: { amount: string; currencyCode: string };
    selectedOptions: Array<{ name: string; value: string }>;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount:    { amount: string; currencyCode: string };
  };
  lines: { nodes: CartLine[] };
}

// ─── Fragments ────────────────────────────────────────────────────────────────

const CART_FRAGMENT = gql`
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount    { amount currencyCode }
    }
    lines(first: 50) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            selectedOptions { name value }
            product {
              id title handle
              images(first: 1) { nodes { url altText } }
            }
          }
        }
      }
    }
  }
`;

// ─── cartCreate ───────────────────────────────────────────────────────────────

export async function cartCreate(
  region: Region,
  locale: Locale,
  lines: Array<{ merchandiseId: string; quantity: number }>,
): Promise<Cart | null> {
  try {
    const client = getShopifyClient(region);
    const ctx    = buildContext(region, locale);
    const mutation = gql`
      mutation cartCreate($input: CartInput!, $country: CountryCode!, $language: LanguageCode!)
      @inContext(country: $country, language: $language) {
        cartCreate(input: $input) {
          cart { ...CartFields }
          userErrors { field message }
        }
      }
      ${CART_FRAGMENT}
    `;
    const data = await client.request<{
      cartCreate: { cart: Cart | null; userErrors: Array<{ field: string[]; message: string }> };
    }>(mutation, { input: { lines }, country: ctx.country, language: ctx.language });

    if (data.cartCreate.userErrors.length > 0) {
      console.error('[Cart] cartCreate errors:', data.cartCreate.userErrors);
    }
    return data.cartCreate.cart;
  } catch (e) {
    if (e instanceof ShopifyNotConfiguredError) return null;
    console.error('[Cart] cartCreate failed:', e);
    return null;
  }
}

// ─── cartLinesAdd ─────────────────────────────────────────────────────────────

export async function cartLinesAdd(
  region: Region,
  locale: Locale,
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>,
): Promise<Cart | null> {
  try {
    const client = getShopifyClient(region);
    const ctx    = buildContext(region, locale);
    const mutation = gql`
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!, $country: CountryCode!, $language: LanguageCode!)
      @inContext(country: $country, language: $language) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ...CartFields }
          userErrors { field message }
        }
      }
      ${CART_FRAGMENT}
    `;
    const data = await client.request<{
      cartLinesAdd: { cart: Cart | null; userErrors: Array<{ field: string[]; message: string }> };
    }>(mutation, { cartId, lines, country: ctx.country, language: ctx.language });
    return data.cartLinesAdd.cart;
  } catch (e) {
    if (e instanceof ShopifyNotConfiguredError) return null;
    console.error('[Cart] cartLinesAdd failed:', e);
    return null;
  }
}

// ─── cartLinesRemove ──────────────────────────────────────────────────────────

export async function cartLinesRemove(
  region: Region,
  locale: Locale,
  cartId: string,
  lineIds: string[],
): Promise<Cart | null> {
  try {
    const client = getShopifyClient(region);
    const ctx    = buildContext(region, locale);
    const mutation = gql`
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!, $country: CountryCode!, $language: LanguageCode!)
      @inContext(country: $country, language: $language) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ...CartFields }
          userErrors { field message }
        }
      }
      ${CART_FRAGMENT}
    `;
    const data = await client.request<{
      cartLinesRemove: { cart: Cart | null; userErrors: Array<{ field: string[]; message: string }> };
    }>(mutation, { cartId, lineIds, country: ctx.country, language: ctx.language });
    return data.cartLinesRemove.cart;
  } catch (e) {
    if (e instanceof ShopifyNotConfiguredError) return null;
    console.error('[Cart] cartLinesRemove failed:', e);
    return null;
  }
}

// ─── cartLinesUpdate ──────────────────────────────────────────────────────────

export async function cartLinesUpdate(
  region: Region,
  locale: Locale,
  cartId: string,
  lines: Array<{ id: string; quantity: number }>,
): Promise<Cart | null> {
  try {
    const client = getShopifyClient(region);
    const ctx    = buildContext(region, locale);
    const mutation = gql`
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!, $country: CountryCode!, $language: LanguageCode!)
      @inContext(country: $country, language: $language) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ...CartFields }
          userErrors { field message }
        }
      }
      ${CART_FRAGMENT}
    `;
    const data = await client.request<{
      cartLinesUpdate: { cart: Cart | null };
    }>(mutation, { cartId, lines, country: ctx.country, language: ctx.language });
    return data.cartLinesUpdate.cart;
  } catch (e) {
    if (e instanceof ShopifyNotConfiguredError) return null;
    console.error('[Cart] cartLinesUpdate failed:', e);
    return null;
  }
}

// ─── cartFetch ────────────────────────────────────────────────────────────────

export async function cartFetch(
  region: Region,
  locale: Locale,
  cartId: string,
): Promise<Cart | null> {
  try {
    const client = getShopifyClient(region);
    const ctx    = buildContext(region, locale);
    const query = gql`
      query cartFetch($cartId: ID!, $country: CountryCode!, $language: LanguageCode!)
      @inContext(country: $country, language: $language) {
        cart(id: $cartId) { ...CartFields }
      }
      ${CART_FRAGMENT}
    `;
    const data = await client.request<{ cart: Cart | null }>(
      query,
      { cartId, country: ctx.country, language: ctx.language },
    );
    return data.cart ?? null;
  } catch (e) {
    if (e instanceof ShopifyNotConfiguredError) return null;
    console.error('[Cart] cartFetch failed:', e);
    return null;
  }
}
