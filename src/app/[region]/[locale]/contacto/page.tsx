import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import type { Locale, Region } from '@/lib/i18n/config';

interface Props { params: Promise<{ region: Region; locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale } = await params;
  return buildMetadata({
    title: 'Contacto',
    description: 'Atención al cliente, mayoristas, prensa, colaboraciones. Marbella, España.',
    region,
    noIndex: region === "uk",
    locale,
    path: 'contacto',
  });
}

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const CONTACT_H1: Record<string, { title: string; desc: string }> = {
    es: { title: 'Contacto', desc: 'Ponte en contacto con Natura Esencials — cosmética artesanal natural desde Andalucía.' },
    en: { title: 'Contact', desc: 'Get in touch with Natura Esencials — artisan natural cosmetics from Andalusia.' },
    fr: { title: 'Contact', desc: 'Contactez Natura Esencials — cosmétique artisanale naturelle depuis l\'Andalousie.' },
    de: { title: 'Kontakt', desc: 'Kontaktieren Sie Natura Esencials — handwerkliche Naturkosmetik aus Andalusien.' },
    it: { title: 'Contatto', desc: 'Contatta Natura Esencials — cosmetica artigianale naturale dall\'Andalusia.' },
    nl: { title: 'Contact', desc: 'Neem contact op met Natura Esencials — ambachtelijke natuurlijke cosmetica uit Andalusië.' },
    pt: { title: 'Contacto', desc: 'Entre em contacto com Natura Esencials — cosmética artesanal natural da Andaluzia.' },
  };
  const h = CONTACT_H1[locale] ?? CONTACT_H1.es;
  return (
    <section className="px-pad-x py-pad-y text-center min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="font-display text-h2-fluid mb-6">
        {h.title}
        <span className="block mt-3 font-sans text-base font-normal text-graphite leading-relaxed tracking-normal">
          {h.desc}
        </span>
      </h1>
      <p className="text-graphite max-w-md">Contenido en preparación.</p>
    </section>
  );
}
