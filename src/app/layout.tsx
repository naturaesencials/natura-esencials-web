import type { Metadata, Viewport } from 'next';
import { Fraunces } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { headers } from 'next/headers';
import { siteConfig } from '@/config/site';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT', 'WONK'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF5' },
    { media: '(prefers-color-scheme: dark)', color: '#0F2018' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s · ${siteConfig.name}` },
  description: siteConfig.tagline,
  other: {
    'facebook-domain-verification': 'bgg6rhiobr0yjzxydwotm6hwlv3h9t',
  },
};

/**
 * Convierte locale + región a código BCP47 completo.
 * EU → es-ES, en-US, fr-FR, de-DE, it-IT, nl-NL, pt-PT
 * UK → en-GB, es-GB, fr-GB, de-GB, it-GB, nl-GB, pt-GB
 * Debe coincidir exactamente con los hrefLang generados en metadata.ts.
 */
function getBcp47Lang(locale: string, region: string): string {
  if (region === 'uk') {
    return `${locale}-GB`;
  }
  const euMap: Record<string, string> = {
    es: 'es-ES',
    en: 'en-US',
    fr: 'fr-FR',
    de: 'de-DE',
    it: 'it-IT',
    nl: 'nl-NL',
    pt: 'pt-PT',
  };
  return euMap[locale] ?? `${locale}-${locale.toUpperCase()}`;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'es';
  const region = headersList.get('x-region') || 'eu';
  const lang = getBcp47Lang(locale, region);
  return (
    <html lang={lang} className={fraunces.variable}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
