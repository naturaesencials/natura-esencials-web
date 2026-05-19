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
    es: 'Contacta con Natura Esencials — cosmética artesanal de origen natural desde Andalucía. Atención al cliente, mayoristas, prensa y colaboraciones.',
    en: 'Contact Natura Esencials — artisan cosmetics of natural origin from Andalusia. Customer service, wholesale, press and collaborations.',
    fr: 'Contactez Natura Esencials — cosmétique artisanale d\'origine naturelle depuis l\'Andalousie. Service client, grossistes, presse et collaborations.',
    de: 'Kontaktieren Sie Natura Esencials — handwerkliche Kosmetik natürlichen Ursprungs aus Andalusien. Kundendienst, Großhandel, Presse und Kooperationen.',
    it: 'Contatta Natura Esencials — cosmetica artigianale di origine naturale dall\'Andalusia. Assistenza clienti, grossisti, stampa e collaborazioni.',
    nl: 'Neem contact op met Natura Esencials — ambachtelijke cosmetica uit Andalusië. Klantenservice, groothandel, pers en samenwerking.',
    pt: 'Entre em contacto com Natura Esencials — cosmética artesanal de origem natural da Andaluzia. Atendimento ao cliente, grossistas, imprensa e colaborações.',
  };
  return buildMetadata({
    title: titles[locale] ?? 'Contacto',
    description: descs[locale] ?? descs.es,
    region,
    noIndex: region === "uk" && process.env.NEXT_PUBLIC_UK_LIVE !== "true",
    locale,
    path: 'contacto',
  });
}

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const CONTACT_H1: Record<string, { title: string; desc: string }> = {
    es: { title: 'Contacto con Natura Esencials',          desc: 'Ponte en contacto con Natura Esencials — cosmética artesanal de origen natural desde Andalucía. Atención al cliente, colaboraciones y mayoristas.' },
    en: { title: 'Contact Natura Esencials',                desc: 'Get in touch with Natura Esencials — artisan cosmetics of natural origin from Andalusia. Customer service, collaborations and wholesale enquiries.' },
    fr: { title: 'Contactez Natura Esencials',              desc: "Contactez Natura Esencials — cosmétique artisanale d'origine naturelle depuis l'Andalousie. Service clients, collaborations et demandes de grossistes." },
    de: { title: 'Kontakt zu Natura Esencials',             desc: 'Kontaktieren Sie Natura Esencials — handwerkliche Kosmetik natürlichen Ursprungs aus Andalusien. Kundenservice, Kooperationen und Großhandelsanfragen.' },
    it: { title: 'Contatta Natura Esencials',               desc: "Contatta Natura Esencials — cosmetica artigianale di origine naturale dall'Andalusia. Servizio clienti, collaborazioni e richieste all'ingrosso." },
    nl: { title: 'Contact met Natura Esencials',            desc: 'Neem contact op met Natura Esencials — ambachtelijke Cosmetica van natuurlijke oorsprong uit Andalusië. Klantenservice, samenwerkingen en groothandelsaanvragen.' },
    pt: { title: 'Contacto com Natura Esencials',           desc: 'Entre em contacto com Natura Esencials — cosmética artesanal de origem natural da Andaluzia. Atendimento ao cliente, colaborações e grossistas.' },
  };
  const h = CONTACT_H1[locale] ?? CONTACT_H1.es;

  const CONTENT: Record<string, { email: string; phone: string; address: string; hours: string; wholesale: string; press: string }> = {
    es: { email: 'Correo electrónico', phone: 'Teléfono y WhatsApp', address: 'Taller y oficina — Marbella, Andalucía, España', hours: 'Lunes a viernes, 9:00–18:00 CET', wholesale: 'Para pedidos B2B, hoteles y distribución mayorista, escríbenos a mayoristas@naturaesencials.com con el nombre de tu establecimiento y volumen estimado.', press: 'Para colaboraciones, prensa o contenido, escríbenos a prensa@naturaesencials.com con una breve descripción de tu proyecto o medio.' },
    en: { email: 'Email', phone: 'Phone and WhatsApp', address: 'Workshop and office — Marbella, Andalusia, Spain', hours: 'Monday to Friday, 9:00–18:00 CET', wholesale: 'For B2B orders, hotels and wholesale distribution, email us at mayoristas@naturaesencials.com with your establishment name and estimated volume.', press: 'For collaborations, press or content enquiries, email us at prensa@naturaesencials.com with a brief description of your project or publication.' },
    fr: { email: 'E-mail', phone: 'Téléphone et WhatsApp', address: 'Atelier et bureau — Marbella, Andalousie, Espagne', hours: 'Lundi à vendredi, 9h00–18h00 CET', wholesale: "Pour les commandes B2B, hôtels et distribution en gros, écrivez-nous à mayoristas@naturaesencials.com avec le nom de votre établissement.", press: "Pour les collaborations, la presse ou les créations de contenu, écrivez-nous à prensa@naturaesencials.com." },
    de: { email: 'E-Mail', phone: 'Telefon und WhatsApp', address: 'Werkstatt und Büro — Marbella, Andalusien, Spanien', hours: 'Montag bis Freitag, 9:00–18:00 CET', wholesale: 'Für B2B-Bestellungen, Hotels und Großhandelsvertrieb schreiben Sie uns an mayoristas@naturaesencials.com mit dem Namen Ihres Unternehmens.', press: 'Für Kooperationen, Presse oder Inhalte schreiben Sie uns an prensa@naturaesencials.com mit einer kurzen Beschreibung Ihres Projekts.' },
    it: { email: 'Email', phone: 'Telefono e WhatsApp', address: 'Laboratorio e ufficio — Marbella, Andalusia, Spagna', hours: 'Lunedì a venerdì, 9:00–18:00 CET', wholesale: "Per ordini B2B, hotel e distribuzione all'ingrosso, scriveteci a mayoristas@naturaesencials.com indicando il nome del vostro stabilimento.", press: 'Per collaborazioni, stampa o contenuti, scriveteci a prensa@naturaesencials.com con una breve descrizione del vostro progetto.' },
    nl: { email: 'E-mail', phone: 'Telefoon en WhatsApp', address: 'Atelier en kantoor — Marbella, Andalusië, Spanje', hours: 'Maandag tot vrijdag, 9:00–18:00 CET', wholesale: 'Voor B2B-bestellingen, hotels en groothandel, mail ons op mayoristas@naturaesencials.com met de naam van uw bedrijf en het geschatte volume.', press: 'Voor samenwerkingen, pers of content, mail ons op prensa@naturaesencials.com met een korte beschrijving van uw project.' },
    pt: { email: 'Email', phone: 'Telefone e WhatsApp', address: 'Oficina e escritório — Marbella, Andaluzia, Espanha', hours: 'Segunda a sexta, 9:00–18:00 CET', wholesale: 'Para encomendas B2B, hotéis e distribuição por grosso, escreva-nos para mayoristas@naturaesencials.com com o nome do seu estabelecimento.', press: 'Para colaborações, imprensa ou conteúdo, escreva-nos para prensa@naturaesencials.com com uma breve descrição do seu projeto ou publicação.' },
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
