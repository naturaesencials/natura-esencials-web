import { NextRequest, NextResponse } from 'next/server';
import { cartCreate, cartLinesAdd, cartLinesRemove, cartLinesUpdate, cartFetch } from '@/lib/shopify/cart';
import { getCheckoutDomain } from '@/lib/shopify/client';
import type { Region, Locale } from '@/lib/i18n/config';
import type { Cart } from '@/lib/shopify/cart';

export const runtime = 'edge';

/**
 * Reemplaza el dominio myshopify.com en checkoutUrl con el dominio
 * personalizado de checkout para cada región. Así el logo del checkout
 * de Shopify apunta al sitio correcto al hacer click.
 */
function normalizeCheckoutUrl(cart: Cart | null, region: Region): Cart | null {
  if (!cart?.checkoutUrl) return cart;
  const shopifyDomain = process.env[`SHOPIFY_${region.toUpperCase()}_DOMAIN`];
  const checkoutDomain = getCheckoutDomain(region);
  if (!shopifyDomain || !checkoutDomain || shopifyDomain === checkoutDomain) return cart;
  return {
    ...cart,
    checkoutUrl: cart.checkoutUrl.replace(
      `https://${shopifyDomain}`,
      `https://${checkoutDomain}`,
    ),
  };
}

/**
 * POST /api/shopify/cart
 *
 * Body: { action, region, locale, ...params }
 *
 * actions:
 *   create  → { lines: [{merchandiseId, quantity}] }
 *   add     → { cartId, lines: [{merchandiseId, quantity}] }
 *   remove  → { cartId, lineIds: [string] }
 *   update  → { cartId, lines: [{id, quantity}] }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, region, locale } = body as {
      action: string;
      region: Region;
      locale: Locale;
    };

    let cart = null;

    switch (action) {
      case 'fetch':
        cart = await cartFetch(region, locale, body.cartId);
        break;
      case 'create':
        cart = await cartCreate(region, locale, body.lines);
        break;
      case 'add':
        cart = await cartLinesAdd(region, locale, body.cartId, body.lines);
        break;
      case 'remove':
        cart = await cartLinesRemove(region, locale, body.cartId, body.lineIds);
        break;
      case 'update':
        cart = await cartLinesUpdate(region, locale, body.cartId, body.lines);
        break;
      default:
        return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
    }

    // Reemplazar dominio myshopify con dominio personalizado de checkout
    cart = normalizeCheckoutUrl(cart, region);

    return NextResponse.json({ cart });
  } catch (e) {
    console.error('[API/cart]', e);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
