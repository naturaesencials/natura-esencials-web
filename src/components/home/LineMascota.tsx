import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getRitualsByLineAndRegion } from '@/data/rituales';
import { regionCurrency, type Locale, type Region } from '@/lib/i18n/config';
import { buildPath } from '@/lib/i18n/paths';
import bundlesData from '@/data/bundles.json';

interface Props { region: Region; locale: Locale; }

const IMG: Record<number, string> = {
  10: '/images/landing/card-10.jpg',
  11: '/images/landing/card-11.jpg',
};

const VISIBLE_SLUGS = new Set(
  (bundlesData.bundles as Array<{ visible?: boolean; es?: { slug?: string } }>)
    .filter(b => b.visible !== false)
    .map(b => b.es?.slug ?? '')
);

export function LineMascota({ region, locale }: Props) {
  const t = useTranslations('lineMascota');
  const rituales = getRitualsByLineAndRegion('mascota', region);
  const symbol = regionCurrency[region].symbol;

  if (rituales.length === 0) return null;

  return (
    <section id="mascota-section" className="px-pad-x py-pad-y">
      <header className="mb-[clamp(32px,5vw,56px)] grid gap-[clamp(24px,3vw,40px)] lg:grid-cols-2 lg:items-end lg:gap-[60px]">
        <div>
          <span className="mb-[clamp(16px,2vw,24px)] inline-block rounded-full border border-citrico px-3.5 py-1.5 text-[11px] uppercase tracking-[0.32em] text-citrico">— {t('tag')}</span>
          <h2 className="font-display text-h2-fluid leading-[0.96] tracking-[-0.025em]">
            {t('title1')} <em className="font-display-italic text-citrico">{t('titleAccent')}</em>
          </h2>
        </div>
        <p className="max-w-[420px] text-sm leading-[1.85] text-graphite">
          {t.rich('intro', { em: (c) => <em className="font-body-medium not-italic text-ink">{c}</em> })}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
        {rituales.map((r) => {
          const price     = region === 'eu' ? r.basePriceEUR : r.basePriceGBP;
          const hasBundle = VISIBLE_SLUGS.has(r.slugs.es);
          const href      = hasBundle ? buildPath(region, locale, `rituales/${r.slugs[locale]}`) : undefined;
          const cardCls   = 'relative flex aspect-[4/3] min-h-[260px] flex-col justify-between overflow-hidden p-[clamp(20px,2.8vw,28px)] text-bg';

          const inner = (
            <>
              <Image src={IMG[r.id] ?? '/images/landing/card-10.jpg'} alt={r.names[locale].full} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/[0.05] to-ink/[0.75]" />
              <div className="relative z-10 flex justify-between">
                <span className="text-[11px] uppercase tracking-[0.25em] opacity-90">{r.category[locale]}</span>
                <span className="font-caption text-sm opacity-75">{r.number}</span>
              </div>
              <div className="relative z-10">
                <h3 className="font-heading text-[clamp(22px,2.5vw,28px)] leading-[1.15] tracking-[-0.01em]">
                  {r.names[locale].main}{r.names[locale].accent && <> <em className="font-heading-italic">{r.names[locale].accent}</em></>}
                </h3>
                <div className="mt-3 flex min-h-touch items-end justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[22px] font-extrabold leading-none text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{symbol}{price}</span>
                    {r.formats?.[0] && (
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{r.formats[0]}</span>
                    )}
                  </div>
                  <span className="text-sm font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{hasBundle ? '→' : '·'}</span>
                </div>
              </div>
            </>
          );

          return href ? (
            <Link key={r.id} href={href} aria-label={r.names[locale].full} className={`${cardCls} transition-transform duration-500`}>{inner}</Link>
          ) : (
            <div key={r.id} className={cardCls}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}
