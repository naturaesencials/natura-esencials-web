import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import type { Locale, Region } from '@/lib/i18n/config';

interface Props { params: Promise<{ region: Region; locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale } = await params;
  return buildMetadata({
    title: 'Diario',
    description: 'Crónicas del taller, ediciones limitadas, fórmulas, ingredientes y nuestra forma de trabajar.',
    region,
    noIndex: region === "uk" || locale !== "es",
    locale,
    path: 'diario',
  });
}

export default async function DiarioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <section className="px-pad-x py-pad-y text-center min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="font-display text-h2-fluid mb-6">Diario</h1>
      <p className="text-graphite max-w-md">Contenido en preparación.</p>
    </section>
  );
}
