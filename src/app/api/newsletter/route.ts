import { NextRequest, NextResponse } from 'next/server';
import { subscribeCustomer } from '@/lib/shopify/customers';
import { sendWelcomeEmail } from '@/lib/resend/welcome';

export const runtime = 'edge';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || '').trim().toLowerCase();
    const locale = String(body.locale || 'es').trim();
    const source = String(body.source || 'website').trim();
    const region = req.cookies.get('ne-region')?.value || 'eu';

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
    }

    // 1) Guardar el contacto en Shopify (consentimiento de marketing + tags idioma/región/origen)
    const saved = await subscribeCustomer(email, { locale, region, source });
    if (!saved.ok) {
      return NextResponse.json({ ok: false, error: saved.error || 'save_failed' }, { status: 502 });
    }

    // 2) Enviar el email de bienvenida con el código, en el idioma del usuario
    const sent = await sendWelcomeEmail({ email, locale, region });
    if (!sent.ok) {
      // El contacto ya quedó guardado; devolvemos error para que el usuario reintente recibir el email.
      return NextResponse.json({ ok: false, error: sent.error || 'email_failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[/api/newsletter] error:', e);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
