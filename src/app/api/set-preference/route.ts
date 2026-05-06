import { NextRequest, NextResponse } from 'next/server';
import { isValidRegion, isValidLocale, isLocaleAvailableInRegion } from '@/lib/i18n/config';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { region, locale } = await req.json();
    if (!isValidRegion(region) || !isValidLocale(locale) || !isLocaleAvailableInRegion(locale, region)) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set('ne-region', region, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    res.cookies.set('ne-locale', locale, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    res.cookies.set('ne-region-confirmed', '1', { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    return res;
  } catch (_e) {
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
