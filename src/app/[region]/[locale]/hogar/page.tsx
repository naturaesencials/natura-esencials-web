import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import type { Locale, Region } from '@/lib/i18n/config';

interface Props { params: Promise<{ region: Region; locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale } = await params;
  return buildMetadata({
    title: 'Hogar',
    description: 'Cuidado del hogar natural. Cuatro rituales para limpiar tu casa con la misma exigencia que aplicamos a la piel.',
    region,
    locale,
    path: 'hogar',
  });
}

export default async function HogarPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <section className="px-pad-x py-pad-y text-center min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="font-display text-h2-fluid mb-6">Hogar</h1>
      <p className="text-graphite max-w-md">Contenido en preparación.</p>
    </section>
  );
}
