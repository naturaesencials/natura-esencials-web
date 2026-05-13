import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getRitualsByLineAndRegion } from '@/data/rituales';
import { regionCurrency, type Locale, type Region } from '@/lib/i18n/config';
import { buildPath } from '@/lib/i18n/paths';
import bundlesData from '@/data/bundles.json';

interface Props { region: Region; locale: Locale; }

const IMG: Record<number, string> = {
  6: '/images/landing/card-6.jpg',
  7: '/images/landing/card-7.jpg',
  8: '/images/landing/card-8.jpg',
  9: '/images/landing/card-9.jpg',
};

const VISIBLE_SLUGS = new Set(
  (bundlesData.bundles as Array<{ visible?: boolean; es?: { slug?: string } }>)
    .filter(b => b.visible !== false)
    .map(b => b.es?.slug ?? '')
);

export function LineHogar({ region, locale }: Props) {
  const t = useTranslations('lineHogar');
  const rituales = getRitualsByLineAndRegion('hogar', region);
  const symbol = regionCurrency[region].symbol;

  if (rituales.length === 0) return null;

  return (
    <section id="hogar-section" className="bg-paper px-pad-x py-pad-y">
      <header className="mb-[clamp(32px,5vw,56px)] grid gap-[clamp(24px,3vw,40px)] lg:grid-cols-2 lg:items-end lg:gap-[60px]">
        <div>
          <span className="mb-[clamp(16px,2vw,24px)] inline-block rounded-full border border-azul px-3.5 py-1.5 text-[11px] uppercase tracking-[0.32em] text-azul">— {t('tag')}</span>
          <h2 className="font-display text-h2-fluid leading-[0.96] tracking-[-0.025em]">
            {t('title1')} <em className="font-display-italic text-azul">{t('titleAccent')}</em>
          </h2>
        </div>
        <p className="max-w-[420px] text-sm leading-[1.85] text-graphite">
          {t.rich('intro', { em: (c) => <em className="font-body-medium not-italic text-ink">{c}</em> })}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
        {rituales.map((r) => {
          const price      = region === 'eu' ? r.basePriceEUR : r.basePriceGBP;
          const hasBundle  = VISIBLE_SLUGS.has(r.slugs.es);
          // Sin bundle → enlaza al catálogo de hogar (ej. Refugio sin producto Shopify aún)
          const href       = hasBundle
            ? buildPath(region, locale, `rituales/${r.slugs[locale]}`)
            : buildPath(region, locale, 'hogar');
          const cardCls    = 'relative flex aspect-[3/4] min-h-[300px] flex-col justify-between overflow-hidden p-[clamp(18px,2.2vw,22px)] text-bg';

          const inner = (
            <>
              <Image src={IMG[r.id] ?? '/images/landing/card-7.jpg'} alt={r.names[locale].full} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/[0.08] via-ink/[0.04] to-ink/[0.8]" />
              <div className="relative z-10 flex justify-between">
                <span className="text-[11px] uppercase tracking-[0.25em] opacity-90">{r.category[locale]}</span>
                <span className="font-caption text-sm opacity-75">{r.number}</span>
              </div>
              <div className="relative z-10">
                <h4 className="font-heading text-[clamp(20px,2.2vw,24px)] leading-[1.15] tracking-[-0.008em]">
                  {r.names[locale].main}{r.names[locale].accent && <> <em className="font-heading-italic">{r.names[locale].accent}</em></>}
                  <span className="mt-1.5 block text-[10px] font-normal uppercase tracking-[0.14em] opacity-80">{r.subtitles[locale]}</span>
                </h4>
                <div className="mt-2.5 flex min-h-touch items-end justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[22px] font-extrabold leading-none text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{symbol}{price}</span>
                    {r.formats?.[0] && (
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{r.formats[0]}</span>
                    )}
                  </div>
                  <span className="text-sm font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">→</span>
                </div>
              </div>
            </>
          );

          return (
            <Link key={r.id} href={href} className={`${cardCls} transition-transform duration-500`}>{inner}</Link>
          );
        })}
      </div>
    </section>
  );
}
