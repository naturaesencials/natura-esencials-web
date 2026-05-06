import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { rituales } from '@/data/rituales';
import { regionCurrency, type Locale, type Region } from '@/lib/i18n/config';

interface Props { region: Region; locale: Locale; }

const SEASON_OFFERS: Array<{ id: number; discount: number }> = [
  { id: 1, discount: 15 },  // Plenitud
  { id: 6, discount: 20 },  // Refugio
  { id: 7, discount: 15 },  // Cocina
  { id: 10, discount: 15 }, // Mimo Canino
];

const IMG: Record<number, string> = {
  1: 'https://images.pexels.com/photos/4841273/pexels-photo-4841273.jpeg',
  6: 'https://images.pexels.com/photos/4202326/pexels-photo-4202326.jpeg',
  7: 'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg',
  10: 'https://images.pexels.com/photos/6724313/pexels-photo-6724313.jpeg',
};

const COLOR: Record<string, string> = {
  cosmetica: 'text-verde',
  hogar: 'text-azul',
  mascota: 'text-citrico',
};

export function Edicion({ region, locale }: Props) {
  const t = useTranslations('edicion');
  const symbol = regionCurrency[region].symbol;

  // Filtrar ofertas a productos disponibles en la región
  const offers = SEASON_OFFERS
    .map((o) => ({ ritual: rituales.find((r) => r.id === o.id), discount: o.discount }))
    .filter((o): o is { ritual: typeof rituales[0]; discount: number } => Boolean(o.ritual?.availableIn.includes(region)));

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
          const newPrice = (basePrice * (100 - discount) / 100).toFixed(2);
          return (
            <article key={ritual.id} className="transition-opacity hover:opacity-90">
              <div className="relative mb-4 aspect-[3/4] overflow-hidden">
                <Image src={IMG[ritual.id] + '?auto=compress&cs=tinysrgb&w=1200'} alt={ritual.names[locale].full} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                <span className={`absolute right-3 top-3 bg-bg px-2.5 py-1.5 text-[10px] uppercase tracking-[0.2em] ${COLOR[ritual.line]}`}>−{discount} %</span>
              </div>
              <div className={`mb-1.5 text-[10px] uppercase tracking-[0.22em] ${COLOR[ritual.line]}`}>{ritual.category[locale]}</div>
              <h4 className="font-heading text-[clamp(17px,1.8vw,22px)] leading-[1.15] tracking-[-0.008em]">
                {ritual.names[locale].main} {ritual.names[locale].accent && <em className="font-heading-italic text-verde">{ritual.names[locale].accent}</em>}
              </h4>
              <div className="mt-3 flex items-baseline justify-between gap-1.5 border-t border-rule pt-2.5 text-xs text-graphite">
                <span className="line-through opacity-60">{symbol}{basePrice}</span>
                <span className="font-caption text-base text-ink">{symbol}{newPrice}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
