import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import type { Locale, Region } from '@/lib/i18n/config';

interface Props { params: Promise<{ region: Region; locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale } = await params;
  const titles: Record<string, string> = {
    es: 'Contacto', en: 'Contact', fr: 'Contact',
    de: 'Kontakt', it: 'Contatto', nl: 'Contact', pt: 'Contacto',
  };
  const descs: Record<string, string> = {
    es: 'Contacta con Natura Esencials — cosmética artesanal natural desde Andalucía. Atención al cliente, mayoristas, prensa y colaboraciones.',
    en: 'Contact Natura Esencials — artisan natural cosmetics from Andalusia. Customer service, wholesale, press and collaborations.',
    fr: 'Contactez Natura Esencials — cosmétique artisanale naturelle depuis l\'Andalousie. Service client, grossistes, presse et collaborations.',
    de: 'Kontaktieren Sie Natura Esencials — handwerkliche Naturkosmetik aus Andalusien. Kundendienst, Großhandel, Presse und Kooperationen.',
    it: 'Contatta Natura Esencials — cosmetica artigianale naturale dall\'Andalusia. Assistenza clienti, grossisti, stampa e collaborazioni.',
    nl: 'Neem contact op met Natura Esencials — ambachtelijke natuurlijke cosmetica uit Andalusië. Klantenservice, groothandel, pers en samenwerkingen.',
    pt: 'Entre em contacto com Natura Esencials — cosmética artesanal natural da Andaluzia. Atendimento ao cliente, grossistas, imprensa e colaborações.',
  };
  return buildMetadata({
    title: titles[locale] ?? 'Contacto',
    description: descs[locale] ?? descs.es,
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

  const CONTENT: Record<string, { email: string; phone: string; address: string; hours: string; wholesale: string; press: string }> = {
    es: { email: 'Correo electrónico', phone: 'Teléfono y WhatsApp', address: 'Taller y oficina — Marbella, Andalucía, España', hours: 'Lunes a viernes, 9:00–18:00 CET', wholesale: 'Para pedidos B2B, hoteles y distribución mayorista, escríbenos a mayoristas@naturaesencials.com con el nombre de tu establecimiento y volumen estimado.', press: 'Para colaboraciones, prensa o contenido, escríbenos a prensa@naturaesencials.com.' },
    en: { email: 'Email', phone: 'Phone and WhatsApp', address: 'Workshop and office — Marbella, Andalusia, Spain', hours: 'Monday to Friday, 9:00–18:00 CET', wholesale: 'For B2B orders, hotels and wholesale distribution, email us at mayoristas@naturaesencials.com with your establishment name and estimated volume.', press: 'For collaborations, press or content, email us at prensa@naturaesencials.com.' },
    fr: { email: 'E-mail', phone: 'Téléphone et WhatsApp', address: 'Atelier et bureau — Marbella, Andalousie, Espagne', hours: 'Lundi à vendredi, 9h00–18h00 CET', wholesale: 'Pour les commandes B2B, hôtels et distribution en gros, écrivez-nous à mayoristas@naturaesencials.com.', press: 'Pour les collaborations et la presse, écrivez-nous à prensa@naturaesencials.com.' },
    de: { email: 'E-Mail', phone: 'Telefon und WhatsApp', address: 'Werkstatt und Büro — Marbella, Andalusien, Spanien', hours: 'Montag bis Freitag, 9:00–18:00 CET', wholesale: 'Für B2B-Bestellungen, Hotels und Großhandelsvertrieb schreiben Sie uns an mayoristas@naturaesencials.com.', press: 'Für Kooperationen und Presse schreiben Sie uns an prensa@naturaesencials.com.' },
    it: { email: 'Email', phone: 'Telefono e WhatsApp', address: 'Laboratorio e ufficio — Marbella, Andalusia, Spagna', hours: 'Lunedì a venerdì, 9:00–18:00 CET', wholesale: 'Per ordini B2B, hotel e distribuzione all\'ingrosso, scriveteci a mayoristas@naturaesencials.com.', press: 'Per collaborazioni e stampa, scriveteci a prensa@naturaesencials.com.' },
    nl: { email: 'E-mail', phone: 'Telefoon en WhatsApp', address: 'Atelier en kantoor — Marbella, Andalusië, Spanje', hours: 'Maandag tot vrijdag, 9:00–18:00 CET', wholesale: 'Voor B2B-bestellingen, hotels en groothandel, mail ons op mayoristas@naturaesencials.com.', press: 'Voor samenwerkingen en pers, mail ons op prensa@naturaesencials.com.' },
    pt: { email: 'Email', phone: 'Telefone e WhatsApp', address: 'Oficina e escritório — Marbella, Andaluzia, Espanha', hours: 'Segunda a sexta, 9:00–18:00 CET', wholesale: 'Para encomendas B2B, hotéis e distribuição por grosso, escreva-nos para mayoristas@naturaesencials.com.', press: 'Para colaborações e imprensa, escreva-nos para prensa@naturaesencials.com.' },
  };
  const c = CONTENT[locale] ?? CONTENT.es;

  return (
    <main className="px-pad-x py-pad-y">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-h2-fluid mb-3">
          {h.title}
        </h1>
        <p className="font-sans text-base font-normal text-graphite leading-relaxed tracking-normal mb-6">
          {h.desc}
        </p>

        <div className="mt-12 space-y-10 text-[15px] leading-[1.85]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-verde mb-2">{c.email}</p>
            <p><a href="mailto:contacto@naturaesencials.com" className="underline hover:text-verde transition-colors">contacto@naturaesencials.com</a></p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-verde mb-2">{c.phone}</p>
            <p><a href="tel:+34625103171" className="underline hover:text-verde transition-colors">+34 625 103 171</a></p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-verde mb-2">{c.address}</p>
            <p className="text-graphite">Marbella 29601, Málaga<br />Andalucía, España</p>
            <p className="text-graphite mt-1">{c.hours}</p>
          </div>
          <div className="border-t border-rule pt-8">
            <p className="text-graphite">{c.wholesale}</p>
          </div>
          <div>
            <p className="text-graphite">{c.press}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
