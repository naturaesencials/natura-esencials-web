import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildPath } from '@/lib/i18n/paths';
import { getRitualsByLineAndRegion, type Ritual } from '@/data/rituales';
import { regionCurrency, type Locale, type Region } from '@/lib/i18n/config';
import bundlesData from '@/data/bundles.json';

interface Props { params: Promise<{ region: Region; locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale } = await params;
  const titles: Record<string, string> = {
    es: 'Rituales', en: 'Rituals', fr: 'Rituels',
    de: 'Rituale', it: 'Rituali', nl: 'Rituelen', pt: 'Rituais',
  };
  const descs: Record<string, string> = {
    es: 'Todos los rituales Natura Esencials. Cosmética natural, cuidado del hogar y mascotas — formulados en Marbella.',
    en: 'All Natura Esencials rituals. Natural cosmetics, home care and pet care — formulated in Marbella.',
    fr: 'Tous les rituels Natura Esencials. Cosmétique naturelle, entretien ménager et soins animaux.',
    de: 'Alle Natura Esencials Rituale. Naturkosmetik, Haushaltspflege und Tierpflege.',
    it: 'Tutti i rituali Natura Esencials. Cosmetica naturale, cura della casa e degli animali.',
    nl: 'Alle Natura Esencials rituelen. Natuurlijke cosmetica, huishoudverzorging en dierenverzorging.',
    pt: 'Todos os rituais Natura Esencials. Cosmética natural, cuidado do lar e animais de estimação.',
  };
  return buildMetadata({ title: titles[locale] ?? titles.es, description: descs[locale] ?? descs.es, region, locale, path: 'rituales' });
}

// ─── Configuración de secciones ───────────────────────────────────────────────

const SECTIONS: Array<{
  line: 'cosmetica' | 'hogar' | 'mascota';
  color: string;
  borderColor: string;
  img: Record<number, string>;
  titles: Record<string, string>;
  subs: Record<string, string>;
}> = [
  {
    line: 'cosmetica',
    color: 'text-verde',
    borderColor: 'border-verde',
    img: {
      1: '/images/landing/card-1.jpg',
      2: '/images/landing/card-2.jpg',
      3: '/images/landing/card-3.jpg',
      4: '/images/landing/card-4.jpg',
      5: '/images/landing/card-5.jpg',
    },
    titles: { es: 'Cosmética', en: 'Skincare', fr: 'Cosmétique', de: 'Kosmetik', it: 'Cosmetica', nl: 'Cosmetica', pt: 'Cosmética' },
    subs:   { es: 'Rituales de cuidado personal — cuerpo, cabello y rostro', en: 'Personal care rituals — body, hair and face',
              fr: 'Rituels de soin personnel — corps, cheveux et visage', de: 'Körperpflege-Rituale — Körper, Haare und Gesicht',
              it: 'Rituali di cura personale — corpo, capelli e viso', nl: 'Persoonlijke verzorgingsrituelen — lichaam, haar en gezicht',
              pt: 'Rituais de cuidado pessoal — corpo, cabelo e rosto' },
  },
  {
    line: 'hogar',
    color: 'text-azul',
    borderColor: 'border-azul',
    img: {
      6: '/images/landing/card-6.jpg',
      7: '/images/landing/card-7.jpg',
      8: '/images/landing/card-8.jpg',
      9: '/images/landing/card-9.jpg',
    },
    titles: { es: 'Hogar', en: 'Home Care', fr: 'Maison', de: 'Haushalt', it: 'Casa', nl: 'Huishoud', pt: 'Lar' },
    subs:   { es: 'Limpieza natural para cada rincón del hogar', en: 'Natural cleaning for every corner of the home',
              fr: 'Nettoyage naturel pour chaque coin de la maison', de: 'Naturreinigung für jeden Winkel des Hauses',
              it: 'Pulizia naturale per ogni angolo della casa', nl: 'Natuurlijke reiniging voor elke hoek van het huis',
              pt: 'Limpeza natural para cada canto da casa' },
  },
  {
    line: 'mascota',
    color: 'text-citrico',
    borderColor: 'border-citrico',
    img: {
      10: '/images/landing/card-10.jpg',
      11: '/images/landing/card-11.jpg',
    },
    titles: { es: 'Mascotas', en: 'Pets', fr: 'Animaux', de: 'Haustiere', it: 'Animali', nl: 'Huisdieren', pt: 'Animais' },
    subs:   { es: 'Higiene natural para perros y gatos', en: 'Natural hygiene for dogs and cats',
              fr: 'Hygiène naturelle pour chiens et chats', de: 'Natürliche Hygiene für Hunde und Katzen',
              it: 'Igiene naturale per cani e gatti', nl: 'Natuurlijke hygiëne voor honden en katten',
              pt: 'Higiene natural para cães e gatos' },
  },
];

const VISIBLE_SLUGS = new Set(
  (bundlesData.bundles as Array<{ visible?: boolean; es?: { slug?: string } }>)
    .filter(b => b.visible !== false)
    .map(b => b.es?.slug ?? '')
);

// ─── Componente de card de ritual ─────────────────────────────────────────────

function RitualCard({
  ritual, img, href, symbol, color, locale,
}: {
  ritual: Ritual; img: string; href?: string;
  symbol: string; color: string; locale: Locale;
}) {
  const price = ritual.basePriceEUR;
  const name  = ritual.names[locale];

  const content = (
    <div className="group relative flex flex-col overflow-hidden rounded-sm bg-paper border border-rule transition-shadow hover:shadow-md">
      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={img}
          alt={name.full}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className={`absolute left-3 top-3 bg-bg px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] ${color}`}>
          {ritual.category[locale]}
        </span>
        {!href && (
          <span className="absolute right-3 top-3 bg-ink/80 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-bg">
            {locale === 'es' ? 'Próximamente' : locale === 'en' ? 'Coming soon' : locale === 'fr' ? 'Bientôt' : locale === 'de' ? 'Demnächst' : locale === 'it' ? 'Presto' : locale === 'nl' ? 'Binnenkort' : 'Brevemente'}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[clamp(18px,2vw,22px)] leading-[1.1] tracking-[-0.01em]">
            {name.main}{name.accent && <> <em className={`font-display-italic ${color}`}>{name.accent}</em></>}
          </h3>
          <span className="shrink-0 font-caption text-base text-ink">{symbol}{price}</span>
        </div>
        <p className="text-[12px] leading-[1.65] text-graphite line-clamp-2">
          {ritual.subtitles?.[locale] ?? ''}
        </p>
        {ritual.formats?.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {ritual.formats.map(f => (
              <span key={f} className="border border-rule px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-graphite">{f}</span>
            ))}
          </div>
        )}
        <div className={`mt-auto pt-3 text-[11px] font-medium uppercase tracking-[0.22em] ${href ? color : 'text-graphite/50'}`}>
          {href
            ? (locale === 'es' ? 'Ver ritual →' : locale === 'en' ? 'View ritual →' : '→')
            : '·'}
        </div>
      </div>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : <div>{content}</div>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function RitualesPage({ params }: Props) {
  const { region, locale } = await params;
  setRequestLocale(locale);

  const symbol = regionCurrency[region].symbol;

  const pageTitle: Record<string, string> = {
    es: 'Nuestros rituales', en: 'Our rituals', fr: 'Nos rituels',
    de: 'Unsere Rituale', it: 'I nostri rituali', nl: 'Onze rituelen', pt: 'Os nossos rituais',
  };
  const pageDesc: Record<string, string> = {
    es: 'Cada ritual es un pack completo de productos formulados para trabajar juntos.',
    en: 'Each ritual is a complete pack of products formulated to work together.',
    fr: 'Chaque rituel est un pack complet de produits formulés pour travailler ensemble.',
    de: 'Jedes Ritual ist ein komplettes Produktpaket, das zusammen formuliert wurde.',
    it: 'Ogni rituale è un pack completo di prodotti formulati per lavorare insieme.',
    nl: 'Elk ritueel is een compleet pakket producten die samen geformuleerd zijn.',
    pt: 'Cada ritual é um pack completo de produtos formulados para trabalhar juntos.',
  };

  return (
    <main className="px-pad-x py-pad-y">
      {/* Cabecera */}
      <header className="mb-[clamp(48px,7vw,80px)] max-w-2xl">
        <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-verde">— Natura Esencials</p>
        <h1 className="font-display text-h1-fluid leading-[0.95] tracking-[-0.025em]">
          {pageTitle[locale] ?? pageTitle.es}
        </h1>
        <p className="mt-5 text-[15px] leading-[1.85] text-graphite">
          {pageDesc[locale] ?? pageDesc.es}
        </p>
      </header>

      {/* Secciones */}
      {SECTIONS.map(section => {
        const rituales = getRitualsByLineAndRegion(section.line, region);
        if (rituales.length === 0) return null;

        return (
          <section key={section.line} className="mb-[clamp(56px,9vw,100px)]">
            {/* Título de sección */}
            <div className={`mb-8 flex items-center gap-4 border-b ${section.borderColor} pb-4`}>
              <h2 className={`font-display text-[clamp(24px,3.5vw,40px)] tracking-[-0.02em] ${section.color}`}>
                {section.titles[locale] ?? section.titles.es}
              </h2>
              <p className="text-[12px] text-graphite">
                — {section.subs[locale] ?? section.subs.es}
              </p>
            </div>

            {/* Grid de rituales */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rituales.map(ritual => {
                const img    = section.img[ritual.id] ?? '/images/landing/card-1.jpg';
                const hasBundle = VISIBLE_SLUGS.has(ritual.slugs.es);
                const href   = hasBundle
                  ? buildPath(region, locale, `rituales/${ritual.slugs[locale]}`)
                  : undefined;

                return (
                  <RitualCard
                    key={ritual.id}
                    ritual={ritual}
                    img={img}
                    href={href}
                    symbol={symbol}
                    color={section.color}
                    locale={locale}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
}
