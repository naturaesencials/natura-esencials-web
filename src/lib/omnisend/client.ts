/**
 * Cliente Omnisend para newsletter.
 * Documentación: https://api-docs.omnisend.com/
 *
 * Si OMNISEND_API_KEY no está definido, las llamadas se skip silenciosamente
 * (útil en local sin credenciales).
 */

interface SubscribePayload {
  email: string;
  locale?: string;
  source?: string;
  region?: string;
}

const OMNISEND_API = 'https://api.omnisend.com/v3';

export async function subscribeToNewsletter(payload: SubscribePayload): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.OMNISEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[Omnisend] OMNISEND_API_KEY ausente en producción — la suscripción NO se ha registrado');
      return { ok: false, error: 'not_configured' };
    }
    console.warn('[Omnisend] OMNISEND_API_KEY no configurada — skip (dev)');
    return { ok: true }; // Solo se ignora en desarrollo local
  }

  try {
    const res = await fetch(`${OMNISEND_API}/contacts`, {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifiers: [{
          type: 'email',
          id: payload.email,
          channels: {
            email: { status: 'subscribed', statusDate: new Date().toISOString() },
          },
        }],
        tags: [
          payload.source || 'website',
          payload.locale ? `lang:${payload.locale}` : null,
          payload.region ? `region:${payload.region}` : null,
        ].filter(Boolean) as string[],
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('[Omnisend] Error:', res.status, errorText);
      return { ok: false, error: `HTTP ${res.status}` };
    }

    return { ok: true };
  } catch (e) {
    console.error('[Omnisend] Network error:', e);
    return { ok: false, error: 'network' };
  }
}
