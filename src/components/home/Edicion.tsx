import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { rituales } from '@/data/rituales';
import { regionCurrency, type Locale, type Region } from '@/lib/i18n/config';
import { buildPath } from '@/lib/i18n/paths';
import bundlesData from '@/data/bundles.json';

interface Props { region: Region; locale: Locale; }

// Rituales de la edición — solo los que tienen bundle visible
// Refugio (id=6) reemplazado por Caricia (id=9) — tiene bundle y foto
const SEASON_OFFERS: Array<{ id: number; discount: number }> = [
  { id: 1,  discount: 15 },  // Plenitud
  { id: 9,  discount: 20 },  // Caricia (Textil Hogar)
  { id: 7,  discount: 15 },  // Cocina Impecable
  { id: 10, discount: 15 },  // Mimo Canino
];

const IMG: Record<number, string> = {
  1:  '/images/landing/card-1.jpg',
  9:  '/images/landing/card-9.jpg',
  7:  '/images/landing/card-7.jpg',
  10: '/images/landing/card-10.jpg',
};

const COLOR: Record<string, string> = {
  cosmetica: 'text-verde',
  hogar:     'text-azul',
  mascota:   'text-citrico',
};

// Mapa slug ES → formato principal del bundle
const VISIBLE_SLUGS = new Map(
  (bundlesData.bundles as Array<{ visible?: boolean; es?: { slug?: string }; format?: string }>)
    .filter(b => b.visible !== false && b.es?.slug)
    .map(b => [b.es!.slug!, b.format ?? ''])
);

export function Edicion({ region, locale }: Props) {
  const t = useTranslations('edicion');
  const symbol = regionCurrency[region].symbol;

  const offers = SEASON_OFFERS
    .map((o) => ({ ritual: rituales.find((r) => r.id === o.id), discount: o.discount }))
    .filter((o): o is { ritual: typeof rituales[0]; discount: number } =>
      Boolean(o.ritual?.availableIn.includes(region))
    );

  if (offers.length === 0) return null;

  return (
    <section className="px-pad-x py-pad-y">
      <header className="mb-[clamp(32px,5vw,56px)] grid gap-10 border-b border-rule pb-[clamp(24px,3vw,36px)] lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="mb-[clamp(16px,2vw,22px)] text-[11px] uppercase tracking-[0.35em] text-verde-vivo">— {t('kicker')}</div>
          <h2 className="font-display text-h1-fluid leading-[0.96] tracking-[-0.022em]">
            {t('title1')} <em className="font-display-italic text-verde">{t('titleAccent')}</em>
          </h2>
        </div>
        <div className="text-left text-sm text-graphite lg:text-right">
          {t('metaCount')}<br/>
          <strong className="mt-1 block font-caption text-lg text-ink" style={{ fontWeight: 350 }}>{t('metaDate')}</strong>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-7">
        {offers.map(({ ritual, discount }) => {
          const basePrice = region === 'eu' ? ritual.basePriceEUR : ritual.basePriceGBP;
          const newPrice  = (basePrice * (100 - discount) / 100).toFixed(2);
          const slugES    = ritual.slugs.es;
          const hasBundle = VISIBLE_SLUGS.has(slugES);
          const format    = VISIBLE_SLUGS.get(slugES) ?? '';
          const href      = hasBundle ? buildPath(region, locale, `rituales/${ritual.slugs[locale]}`) : undefined;

          const inner = (
            <>
              <div className="relative mb-4 aspect-[3/4] overflow-hidden">
                <Image
                  src={IMG[ritual.id]}
                  alt={ritual.names[locale].full}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className={`absolute right-3 top-3 bg-bg px-2.5 py-1.5 text-[10px] uppercase tracking-[0.2em] ${COLOR[ritual.line]}`}>
                  −{discount} %
                </span>
              </div>
              <div className={`mb-1.5 text-[10px] uppercase tracking-[0.22em] ${COLOR[ritual.line]}`}>
                {ritual.category[locale]}
              </div>
              <h4 className="font-heading text-[clamp(17px,1.8vw,22px)] leading-[1.15] tracking-[-0.008em]">
                {ritual.names[locale].main}{' '}
                {ritual.names[locale].accent && (
                  <em className={`font-heading-italic ${COLOR[ritual.line]}`}>{ritual.names[locale].accent}</em>
                )}
              </h4>
              <div className="mt-3 flex items-baseline justify-between gap-1.5 border-t border-rule pt-2.5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] line-through text-graphite/60">{symbol}{basePrice}</span>
                  {format && <span className="text-[10px] uppercase tracking-[0.14em] text-graphite/60">{format}</span>}
                </div>
                <strong className="font-caption text-lg font-bold text-ink">{symbol}{newPrice}</strong>
              </div>
            </>
          );

          return href ? (
            <Link key={ritual.id} href={href} className="group transition-opacity hover:opacity-90">
              {inner}
            </Link>
          ) : (
            <div key={ritual.id}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}
