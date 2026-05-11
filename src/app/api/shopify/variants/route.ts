import { NextRequest, NextResponse } from 'next/server';
import { getProductByHandle } from '@/lib/shopify/queries';
import type { Region, Locale } from '@/lib/i18n/config';

export const runtime = 'edge';

/**
 * GET /api/shopify/variants?handle=champu-2-en-1&region=eu&locale=es
 *
 * Devuelve los variants de Shopify para un producto dado su handle.
 * El BuyButton client component llama a este endpoint en mount para
 * construir el cart permalink con el variant ID correcto.
 *
 * checkoutDomain es público (dominio myshopify o custom), no es secreto.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const handle  = searchParams.get('handle');
  const region  = (searchParams.get('region')  || 'eu') as Region;
  const locale  = (searchParams.get('locale')  || 'es') as Locale;

  if (!handle) {
    return NextResponse.json({ error: 'handle requerido' }, { status: 400 });
  }

  try {
    const product = await getProductByHandle(handle, region, locale);
    if (!product) {
      return NextResponse.json({ variants: [], available: false, checkoutDomain: '' });
    }

    const domain = process.env[`SHOPIFY_${region.toUpperCase()}_DOMAIN`] || '';

    return NextResponse.json({
      available: product.availableForSale,
      checkoutDomain: domain,
      variants: product.variants.nodes.map((v) => ({
        id:        v.id,               // gid://shopify/ProductVariant/XXXXX
        title:     v.title,            // "300 ml" | "1 L" | "Default Title"
        price:     v.price.amount,
        currency:  v.price.currencyCode,
        available: v.availableForSale,
      })),
    });
  } catch {
    // Shopify no configurado → degradación silenciosa
    return NextResponse.json({ variants: [], available: false, checkoutDomain: '' });
  }
}
