import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import {
  isValidRegion,
  isValidLocale,
  isLocaleAvailableInRegion,
  localeMap,
  regions,
  regionLocales,
  type Region,
  type Locale,
} from '@/lib/i18n/config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RegionBanner } from '@/components/layout/RegionBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema, localBusinessSchema, websiteSchema } from '@/lib/seo/schema';
import { CartProvider } from '@/context/CartContext';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { UkComingSoon } from '@/components/layout/UkComingSoon';
import { UkShippingBar } from '@/components/layout/UkShippingBar';
import { WhatsAppButton } from '@/components/social/WhatsAppButton';

interface Props {
  children: React.ReactNode;
  params: Promise<{ region: Region; locale: Locale }>;
}

export async function generateStaticParams() {
  const params: Array<{ region: Region; locale: Locale }> = [];
  for (const region of regions) {
    for (const locale of regionLocales[region]) {
      params.push({ region, locale });
    }
  }
  return params;
}

export default async function RegionLocaleLayout({ children, params }: Props) {
  const { region, locale } = await params;

  if (!isValidRegion(region) || !isValidLocale(locale) || !isLocaleAvailableInRegion(locale, region)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <JsonLd id="ld-organization" data={organizationSchema()} />
      <JsonLd id="ld-localbusiness" data={localBusinessSchema()} />
      <JsonLd id="ld-website" data={websiteSchema(region, locale)} />
      <div lang={localeMap[locale].bcp47}>
        <RegionBanner region={region} locale={locale} />
        <CartProvider region={region} locale={locale}>
          <Header region={region} locale={locale} />
          <CartDrawer locale={locale} />
          {region === 'uk' && <UkShippingBar />}
          <main id="main-content">
            {region === 'uk' && process.env.NEXT_PUBLIC_UK_LIVE !== 'true'
              ? <UkComingSoon region={region} locale={locale} />
              : children}
          </main>
          <Footer region={region} locale={locale} />
          {(region !== 'uk' || process.env.NEXT_PUBLIC_UK_LIVE === 'true') && <WhatsAppButton locale={locale} />}
        <CookieBanner region={region} locale={locale} />
        </CartProvider>
      </div>
    </NextIntlClientProvider>
  );
}
