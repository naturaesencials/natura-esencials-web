import { NextRequest, NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/lib/omnisend/client';

export const runtime = 'edge';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || '').trim().toLowerCase();
    const locale = String(body.locale || '').trim();
    const source = String(body.source || 'website').trim();
    const region = req.cookies.get('ne-region')?.value;

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
    }

    const result = await subscribeToNewsletter({ email, locale, source, region });
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[/api/newsletter] error:', e);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
