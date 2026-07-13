// Alta de suscriptores como clientes de Shopify (EU) vía Admin API.
// Requiere SHOPIFY_EU_ADMIN_TOKEN (scope write_customers) en el entorno.

const ADMIN_API_VERSION = '2025-01';

export type SubscribeResult = { ok: boolean; created?: boolean; error?: string };

export async function subscribeCustomer(
  email: string,
  opts: { locale?: string; region?: string; source?: string } = {},
): Promise<SubscribeResult> {
  const token = process.env.SHOPIFY_EU_ADMIN_TOKEN;
  const domain = process.env.SHOPIFY_EU_DOMAIN || 'bdchtj-1p.myshopify.com';

  if (!token) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[Shopify] SHOPIFY_EU_ADMIN_TOKEN ausente en producción — el contacto NO se ha guardado');
      return { ok: false, error: 'shopify_not_configured' };
    }
    console.warn('[Shopify] SHOPIFY_EU_ADMIN_TOKEN no configurada — skip (dev)');
    return { ok: true };
  }

  const tags = ['newsletter', opts.source || 'website'];
  if (opts.locale) tags.push(`lang:${opts.locale}`);
  if (opts.region) tags.push(`region:${opts.region}`);

  const query = `mutation customerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer { id }
      userErrors { field message }
    }
  }`;

  const variables = {
    input: {
      email,
      ...(opts.locale ? { locale: opts.locale } : {}),
      tags,
      emailMarketingConsent: {
        marketingOptInLevel: 'SINGLE_OPT_IN',
        marketingState: 'SUBSCRIBED',
      },
    },
  };

  try {
    const res = await fetch(`https://${domain}/admin/api/${ADMIN_API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const data: any = await res.json().catch(() => null);

    if (data?.data?.customerCreate?.customer?.id) {
      return { ok: true, created: true };
    }

    const errs: Array<{ message?: string }> = data?.data?.customerCreate?.userErrors ?? [];
    // Si el email ya existe, la persona ya es cliente: lo tratamos como éxito (ya suscrito).
    if (errs.some((e) => /taken|already|exist/i.test(e.message || ''))) {
      return { ok: true, created: false };
    }

    console.error('[Shopify] customerCreate error:', JSON.stringify(errs.length ? errs : data?.errors));
    return { ok: false, error: 'shopify_error' };
  } catch (e: any) {
    console.error('[Shopify] request failed:', e?.message || e);
    return { ok: false, error: 'shopify_request_failed' };
  }
}
