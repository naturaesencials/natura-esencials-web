import { NextResponse } from 'next/server';

// Endpoint TEMPORAL de verificación del token Admin de Shopify.
// No devuelve el token en ningún caso. Eliminar tras verificar.
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  const token = process.env.SHOPIFY_EU_ADMIN_TOKEN;
  const domain = process.env.SHOPIFY_EU_DOMAIN || 'bdchtj-1p.myshopify.com';

  if (!token) {
    return NextResponse.json(
      { ok: false, error: 'no_admin_token_env', hint: 'SHOPIFY_EU_ADMIN_TOKEN no existe en el entorno' },
      { status: 200 },
    );
  }

  // Solo el tipo/prefijo, nunca el secreto
  const tokenType = token.startsWith('shpat_')
    ? 'admin (shpat_) ✅'
    : token.startsWith('shpss_')
      ? 'storefront (shpss_) ❌ — token equivocado'
      : token.startsWith('shpca_')
        ? 'client-secret (shpca_) ❌'
        : `desconocido (${token.slice(0, 6)}…)`;
  const tokenLen = token.length;

  try {
    const res = await fetch(`https://${domain}/admin/api/2025-01/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ shop { name myshopifyDomain } currentAppInstallation { accessScopes { handle } } }',
      }),
    });

    const status = res.status;
    const data: any = await res.json().catch(() => null);
    const scopes: string[] = data?.data?.currentAppInstallation?.accessScopes?.map((s: any) => s.handle) ?? [];

    return NextResponse.json(
      {
        ok: status === 200 && Boolean(data?.data?.shop),
        status,
        tokenType,
        tokenLen,
        shop: data?.data?.shop?.name ?? null,
        domain,
        canWriteCustomers: scopes.includes('write_customers'),
        scopes,
        errors: data?.errors ?? null,
      },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 200 });
  }
}
