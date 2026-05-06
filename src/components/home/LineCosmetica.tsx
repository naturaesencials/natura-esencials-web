import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getRitualsByLineAndRegion } from '@/data/rituales';
import { regionCurrency, type Locale, type Region } from '@/lib/i18n/config';
import { buildPath } from '@/lib/i18n/paths';

interface Props { region: Region; locale: Locale; }

const IMG: Record<number, string> = {
  1: 'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg',
  2: 'https://images.pexels.com/photos/4841273/pexels-photo-4841273.jpeg',
  3: 'https://images.pexels.com/photos/5240623/pexels-photo-5240623.jpeg',
  4: 'https://images.pexels.com/photos/4202924/pexels-photo-4202924.jpeg',
  5: 'https://images.pexels.com/photos/4202326/pexels-photo-4202326.jpeg',
};

export function LineCosmetica({ region, locale }: Props) {
  const t = useTranslations('lineCosmetica');
  const rituales = getRitualsByLineAndRegion('cosmetica', region);
  const symbol = regionCurrency[region].symbol;

  return (
    <section id="cosmetica-section" className="px-pad-x py-pad-y">
      <header className="mb-[clamp(32px,5vw,56px)] grid gap-[clamp(24px,3vw,40px)] lg:grid-cols-2 lg:items-end lg:gap-[60px]">
        <div>
          <span className="mb-[clamp(16px,2vw,24px)] inline-block rounded-full border border-verde px-3.5 py-1.5 text-[11px] uppercase tracking-[0.32em] text-verde">— {t('tag')}</span>
          <h2 className="font-display text-h2-fluid leading-[0.96] tracking-[-0.025em]">
            {t('title1')} <em className="font-display-italic text-verde">{t('titleAccent')}</em>
          </h2>
        </div>
        <p className="max-w-[420px] text-sm leading-[1.85] text-graphite">
          {t.rich('intro', { em: (c) => <em className="font-body-medium not-italic text-ink">{c}</em> })}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-3">
        {rituales.map((r, idx) => {
          const isBig = idx === 0 || idx === 1;
          const cls = isBig
            ? 'lg:col-span-6 aspect-[4/5]'
            : 'lg:col-span-4 lg:aspect-[3/4] aspect-[3/4]';
          const price = region === 'eu' ? r.basePriceEUR : r.basePriceGBP;
          return (
            <Link
              key={r.id}
              href={buildPath(region, locale, `rituales/${r.slugs[locale]}`)}
              className={`relative flex min-h-[280px] flex-col justify-between overflow-hidden p-[clamp(18px,2.5vw,24px)] text-bg transition-transform duration-500 hover:[&:not(:has(*))]:scale-[0.985] sm:aspect-[3/4] sm:min-h-[320px] ${cls}`}
            >
              <Image
                src={IMG[r.id] + '?auto=compress&cs=tinysrgb&w=1200'}
                alt={r.names[locale].full}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/[0.08] via-ink/[0.04] to-ink/[0.78]" />
              <div className="relative z-10 flex justify-between">
                <span className="text-[11px] uppercase tracking-[0.25em] opacity-90">{r.category[locale]}</span>
                <span className="font-caption text-sm opacity-75">{r.number}</span>
              </div>
              <div className="relative z-10">
                <h4 className="font-heading text-[clamp(22px,2.4vw,28px)] leading-[1.15] tracking-[-0.01em]">
                  {r.names[locale].main}{r.names[locale].accent && <> <em className="font-heading-italic">{r.names[locale].accent}</em></>}
                </h4>
                <div className="mt-2.5 flex min-h-touch items-baseline justify-between">
                  <span className="font-caption text-base">{symbol}{price}</span>
                  <span className="font-caption text-sm opacity-70">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
