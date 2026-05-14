import { NextRequest, NextResponse } from 'next/server';
import {
  defaultLocale,
  defaultRegion,
  isValidLocale,
  isValidRegion,
  isLocaleAvailableInRegion,
  countryToRegion,
  countryToLocale,
  type Locale,
  type Region,
} from '@/lib/i18n/config';

/**
 * Middleware custom con arquitectura [region]/[locale].
 * Lógica:
 * 1. Si la URL ya tiene /eu/es/ o /uk/en/ → pasa tal cual
 * 2. Si la URL es solo /es/ → redirige a /eu/es/
 * 3. Si la URL es / → detecta región+locale del usuario y redirige
 */

const PUBLIC_FILE = /\.(.*)$/;

function detectRegionAndLocale(request: NextRequest): { region: Region; locale: Locale } {
  // 1. Cookie con preferencia manual (usuario ya eligió antes)
  const savedRegion = request.cookies.get('ne-region')?.value;
  const savedLocale = request.cookies.get('ne-locale')?.value;

  if (savedRegion && savedLocale && isValidRegion(savedRegion) && isValidLocale(savedLocale)) {
    if (isLocaleAvailableInRegion(savedLocale, savedRegion)) {
      return { region: savedRegion, locale: savedLocale };
    }
  }

  // 2. GeoIP de Vercel (header automático en producción)
  const country = request.headers.get('x-vercel-ip-country') || '';
  const detectedRegion = countryToRegion[country] || defaultRegion;

  // 3. Accept-Language del navegador
  const acceptLanguage = request.headers.get('accept-language') || '';
  let detectedLocale: Locale = defaultLocale;

  // Primero intentamos sacar locale por país
  if (countryToLocale[country]) {
    detectedLocale = countryToLocale[country];
  } else {
    // Fallback: parsear Accept-Language
    const preferred = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase();
    if (preferred && isValidLocale(preferred)) {
      detectedLocale = preferred;
    }
  }

  // Garantizar que el locale esté disponible en la región
  if (!isLocaleAvailableInRegion(detectedLocale, detectedRegion)) {
    detectedLocale = detectedRegion === 'uk' ? 'en' : 'es';
  }

  return { region: detectedRegion, locale: detectedLocale };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorar archivos estáticos, API, y assets Next
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/manifest.webmanifest' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const [firstSeg, secondSeg] = segments;

  // CASO 1: URL ya tiene region/locale → /eu/es/... o /uk/en/...
  if (firstSeg && secondSeg && isValidRegion(firstSeg) && isValidLocale(secondSeg)) {
    // Verificar que ese locale existe en esa región
    if (!isLocaleAvailableInRegion(secondSeg, firstSeg)) {
      const fallbackLocale = firstSeg === 'uk' ? 'en' : 'es';
      const rest = segments.slice(2).join('/');
      const newPath = rest ? `/${firstSeg}/${fallbackLocale}/${rest}` : `/${firstSeg}/${fallbackLocale}`;
      return NextResponse.redirect(new URL(newPath, request.url), 302);
    }
    const res = NextResponse.next();
    res.headers.set("x-locale", secondSeg);
    res.headers.set("x-region", firstSeg);
    return res;
  }

  // CASO 2: URL solo tiene locale (/es/, /en/) → añadir región
  if (firstSeg && isValidLocale(firstSeg)) {
    const region = detectRegionAndLocale(request).region;
    const locale = firstSeg;
    const finalLocale = isLocaleAvailableInRegion(locale, region) ? locale : (region === 'uk' ? 'en' : 'es');
    const rest = segments.slice(1).join('/');
    const newPath = rest ? `/${region}/${finalLocale}/${rest}` : `/${region}/${finalLocale}`;
    return NextResponse.redirect(new URL(newPath, request.url), 302);
  }

  // CASO 3: URL raíz o URL sin estructura reconocida
  const { region, locale } = detectRegionAndLocale(request);
  const rest = segments.join('/');
  const newPath = rest ? `/${region}/${locale}/${rest}` : `/${region}/${locale}`;
  return NextResponse.redirect(new URL(newPath, request.url), 302);
}

export const config = {
  matcher: [
    // Matchea '/' explícito (la raíz)
    '/',
    // Y todo lo demás, excepto archivos estáticos y rutas de sistema
    '/((?!api|_next|_vercel|sitemap.xml|robots.txt|favicon.ico|manifest.webmanifest|.*\\..*).*)',
  ],
};
