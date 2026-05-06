import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getRitualsByLineAndRegion } from '@/data/rituales';
import { regionCurrency, type Locale, type Region } from '@/lib/i18n/config';
import { buildPath } from '@/lib/i18n/paths';

interface Props { region: Region; locale: Locale; }

const IMG: Record<number, string> = {
  10: 'https://images.pexels.com/photos/6724313/pexels-photo-6724313.jpeg',
  11: 'https://images.pexels.com/photos/8142194/pexels-photo-8142194.jpeg',
};

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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {rituales.map((r) => {
          const price = region === 'eu' ? r.basePriceEUR : r.basePriceGBP;
          return (
            <Link key={r.id} href={buildPath(region, locale, `rituales/${r.slugs[locale]}`)} className="relative flex aspect-[4/3] min-h-[260px] flex-col justify-between overflow-hidden p-[clamp(20px,2.8vw,28px)] text-bg">
              <Image src={IMG[r.id] + '?auto=compress&cs=tinysrgb&w=1200'} alt={r.names[locale].full} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-ink/[0.15] via-ink/[0.38] to-ink/[0.78]" />
              <div className="relative z-10 flex justify-between">
                <span className="text-[11px] uppercase tracking-[0.28em] text-citrico opacity-90">{r.category[locale]}</span>
                <span className="font-caption text-sm opacity-70">{r.number}</span>
              </div>
              <div className="relative z-10">
                <h4 className="font-heading text-[clamp(22px,2.6vw,30px)] leading-[1.1] tracking-[-0.01em]">
                  {r.names[locale].main}{r.names[locale].accent && <> <em className="font-heading-italic text-citrico">{r.names[locale].accent}</em></>}
                </h4>
                <div className="mt-2.5 flex min-h-touch items-baseline justify-between">
                  <span className="font-caption text-[17px]">{symbol}{price}</span>
                  <span className="font-caption text-[15px] opacity-70">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
