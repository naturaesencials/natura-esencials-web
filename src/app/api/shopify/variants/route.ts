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

  const domain = process.env[`SHOPIFY_${region.toUpperCase()}_DOMAIN`] || '';

  try {
    const product = await getProductByHandle(handle, region, locale);
    if (!product) {
      // Handle no encontrado en Shopify — el botón enlazará al producto directamente
      return NextResponse.json({ variants: [], available: true, checkoutDomain: domain });
    }

    return NextResponse.json({
      available: product.availableForSale,
      checkoutDomain: domain,
      variants: product.variants.nodes.map((v) => ({
        id:                v.id,
        title:             v.title,
        price:             v.price.amount,
        currency:          v.price.currencyCode,
        available:         v.availableForSale,
        quantityAvailable: v.quantityAvailable ?? null,
      })),
    });
  } catch {
    // Error de red o Shopify no configurado → siempre devolver dominio para fallback
    return NextResponse.json({ variants: [], available: true, checkoutDomain: domain });
  }
}
