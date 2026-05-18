import { NextRequest, NextResponse } from 'next/server';
import { GraphQLClient, gql } from 'graphql-request';
import type { Region } from '@/lib/i18n/config';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

/**
 * GET /api/shopify/debug?region=uk
 *
 * Diagnostic endpoint that returns:
 * - Env vars status (without leaking secrets)
 * - First product Shopify returns (raw, without @inContext)
 * - First product Shopify returns (with @inContext)
 * - Detailed error messages
 *
 * Used to diagnose why UK Storefront API returns empty variants.
 * SHOULD BE REMOVED after the issue is fixed.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const region = (searchParams.get('region') || 'uk') as Region;
  const handle = searchParams.get('handle') || '2-in-1-shampoo';

  const domain      = process.env[`SHOPIFY_${region.toUpperCase()}_DOMAIN`] || '';
  const privateTok  = process.env[`SHOPIFY_${region.toUpperCase()}_PRIVATE_TOKEN`] || '';
  const publicTok   = process.env[`SHOPIFY_${region.toUpperCase()}_STOREFRONT_TOKEN`] || '';
  const token       = privateTok || publicTok;
  const isPrivate   = !!privateTok;

  const result: Record<string, unknown> = {
    region,
    handle,
    env: {
      domain_present:    !!domain,
      domain_value:      domain,
      public_token_set:  !!publicTok,
      private_token_set: !!privateTok,
      using_token_type:  isPrivate ? 'private' : 'public',
      token_length:      token.length,
      token_prefix:      token ? token.slice(0, 6) + '...' : null,
    },
  };

  if (!domain || !token) {
    result.error = 'Missing env vars';
    return NextResponse.json(result, { status: 200 });
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (isPrivate) {
    headers['Shopify-Storefront-Private-Token'] = token;
  } else {
    headers['X-Shopify-Storefront-Access-Token'] = token;
  }

  const client = new GraphQLClient(
    `https://${domain}/api/2025-01/graphql.json`,
    { headers },
  );

  // Test 1: get shop info (no @inContext, no product handle) — just verifies the token works
  try {
    const shopQuery = gql`
      query { shop { name primaryDomain { url } } }
    `;
    const shopData = await client.request<{ shop: { name: string; primaryDomain: { url: string } } }>(shopQuery);
    result.test1_shop = shopData.shop;
  } catch (e) {
    result.test1_shop_error = e instanceof Error ? e.message : String(e);
  }

  // Test 2: list all products without @inContext
  try {
    const listQuery = gql`
      query { products(first: 5) { nodes { id handle title availableForSale } } }
    `;
    const listData = await client.request<{ products: { nodes: Array<{ id: string; handle: string; title: string; availableForSale: boolean }> } }>(listQuery);
    result.test2_list_no_context = {
      count: listData.products.nodes.length,
      handles: listData.products.nodes.map(p => p.handle),
    };
  } catch (e) {
    result.test2_list_no_context_error = e instanceof Error ? e.message : String(e);
  }

  // Test 3: list products with @inContext GB
  try {
    const contextQuery = gql`
      query @inContext(country: GB, language: EN) {
        products(first: 5) { nodes { id handle title availableForSale } }
      }
    `;
    const contextData = await client.request<{ products: { nodes: Array<{ id: string; handle: string; title: string; availableForSale: boolean }> } }>(contextQuery);
    result.test3_list_gb_context = {
      count: contextData.products.nodes.length,
      handles: contextData.products.nodes.map(p => p.handle),
    };
  } catch (e) {
    result.test3_list_gb_context_error = e instanceof Error ? e.message : String(e);
  }

  // Test 4: get specific product without @inContext
  try {
    const productQuery = gql`
      query($handle: String!) {
        product(handle: $handle) {
          id handle title availableForSale
          variants(first: 5) {
            nodes { id title price { amount currencyCode } availableForSale }
          }
        }
      }
    `;
    const productData = await client.request<{ product: { id: string; handle: string; title: string; availableForSale: boolean; variants: { nodes: Array<{ id: string; title: string; price: { amount: string; currencyCode: string }; availableForSale: boolean }> } } | null }>(productQuery, { handle });
    result.test4_product_no_context = productData.product || 'null';
  } catch (e) {
    result.test4_product_no_context_error = e instanceof Error ? e.message : String(e);
  }

  // Test 5: get specific product with @inContext GB
  try {
    const productCtxQuery = gql`
      query($handle: String!) @inContext(country: GB, language: EN) {
        product(handle: $handle) {
          id handle title availableForSale
          variants(first: 5) {
            nodes { id title price { amount currencyCode } availableForSale }
          }
        }
      }
    `;
    const productCtxData = await client.request<{ product: { id: string; handle: string; title: string; availableForSale: boolean; variants: { nodes: Array<{ id: string; title: string; price: { amount: string; currencyCode: string }; availableForSale: boolean }> } } | null }>(productCtxQuery, { handle });
    result.test5_product_gb_context = productCtxData.product || 'null';
  } catch (e) {
    result.test5_product_gb_context_error = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json(result, { status: 200 });
}
