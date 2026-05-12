import { NextRequest, NextResponse } from 'next/server';
import { cartCreate, cartLinesAdd, cartLinesRemove, cartLinesUpdate } from '@/lib/shopify/cart';
import type { Region, Locale } from '@/lib/i18n/config';

export const runtime = 'edge';

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

    return NextResponse.json({ cart });
  } catch (e) {
    console.error('[API/cart]', e);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
