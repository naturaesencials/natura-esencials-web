import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ThinBar } from '@/components/home/ThinBar';
import { Hero } from '@/components/home/Hero';
import { DualFeatured } from '@/components/home/DualFeatured';
import { LineCosmetica } from '@/components/home/LineCosmetica';
import { BotanicaBand } from '@/components/home/BotanicaBand';
import { LineHogar } from '@/components/home/LineHogar';
import { Origen } from '@/components/home/Origen';
import { LineMascota } from '@/components/home/LineMascota';
import { Strip } from '@/components/home/Strip';
import { Edicion } from '@/components/home/Edicion';
import { Newsletter } from '@/components/home/Newsletter';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { Popup } from '@/components/home/Popup';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, itemListSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';
import { getCanonicalUrl, type Locale, type Region } from '@/lib/i18n/config';
import { getRitualsByRegion } from '@/data/rituales';

interface Props { params: Promise<{ region: Region; locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return buildMetadata({
    title: t('homeTitle'),
    description: t('homeDescription'),
    keywords: t('homeKeywords').split(', '),
    region,
    locale,
    image: '/og-default.jpg',
    imageAlt: 'Natura Esencials',
  });
}

export default async function HomePage({ params }: Props) {
  const { region, locale } = await params;
  setRequestLocale(locale);

  const products = getRitualsByRegion(region);
  const itemListData = itemListSchema({
    name: 'Natura Esencials — Rituales',
    items: products.map((r, idx) => ({
      position: idx + 1,
      name: r.names[locale].full,
      url: getCanonicalUrl(region, locale, `rituales/${r.slugs[locale]}`),
    })),
  });

  return (
    <>
      <JsonLd id="ld-home-itemlist" data={itemListData} />
      <ThinBar />
      <Hero region={region} locale={locale} />
      <DualFeatured region={region} locale={locale} />
      <LineCosmetica region={region} locale={locale} />
      <BotanicaBand />
      <LineHogar region={region} locale={locale} />
      <Origen region={region} locale={locale} />
      <LineMascota region={region} locale={locale} />
      <Strip />
      <ReviewsSection locale={locale} />
      <Edicion region={region} locale={locale} />
      <Newsletter />
      <Popup />
    </>
  );
}
