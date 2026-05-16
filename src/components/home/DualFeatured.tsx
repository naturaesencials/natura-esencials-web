import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { Locale, Region } from '@/lib/i18n/config';
import { regionCurrency } from '@/lib/i18n/config';
import { getRitualsByLineAndRegion } from '@/data/rituales';
import { buildPath } from '@/lib/i18n/paths';
import bundlesData from '@/data/bundles.json';

interface Props { region: Region; locale: Locale; }

const VISIBLE_SLUGS = new Set(
  (bundlesData.bundles as Array<{ visible?: boolean; es?: { slug?: string } }>)
    .filter(b => b.visible !== false)
    .map(b => b.es?.slug ?? '')
);

interface Props { region: Region; locale: Locale; }

export function DualFeatured({ region, locale }: Props) {
  const t  = useTranslations('dualFeatured');
  const tc = useTranslations('common');
  const symbol = regionCurrency[region].symbol;

  // Cosmética: primer ritual con bundle visible
  // Hogar: Cocina Impecable (id=7) — la foto dual-right.jpg muestra productos de cocina
  const cosmeticaRituales = getRitualsByLineAndRegion('cosmetica', region);
  const hogarRituales     = getRitualsByLineAndRegion('hogar',     region);

  const cosmetica = cosmeticaRituales.find(r => VISIBLE_SLUGS.has(r.slugs.es));
  const hogar     = hogarRituales.find(r => r.id === 7 && VISIBLE_SLUGS.has(r.slugs.es))
                 ?? hogarRituales.find(r => VISIBLE_SLUGS.has(r.slugs.es));

  if (!cosmetica) return null;

  const cosmeticaHref = buildPath(region, locale, `rituales/${cosmetica.slugs[locale]}`);
  const hogarHref     = hogar ? buildPath(region, locale, `rituales/${hogar.slugs[locale]}`) : null;

  const cosmeticaPrice = region === 'eu' ? cosmetica.basePriceEUR : cosmetica.basePriceGBP;
  const hogarPrice     = hogar ? (region === 'eu' ? hogar.basePriceEUR : hogar.basePriceGBP) : null;

  return (
    <section className="grid border-y border-rule lg:grid-cols-2">

      {/* Cosmética */}
      <div className="grid items-center gap-[clamp(24px,4vw,40px)] border-b border-rule px-pad-x py-[clamp(48px,8vw,100px)] lg:grid-cols-2 lg:border-b-0 lg:border-r">
        <Link href={cosmeticaHref} className="relative mx-auto block aspect-[4/5] w-full max-w-[440px] overflow-hidden lg:max-w-none">
          <Image
            src="/images/landing/dual-left.jpg"
            alt={cosmetica.names[locale].full}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
          <span className="absolute left-3.5 top-3.5 bg-bg px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-verde">{t('personalBadge')}</span>
        </Link>
        <div className="w-full">
          <div className="mb-3.5 text-[11px] uppercase tracking-[0.28em] text-verde-vivo">— {t('personalLine')}</div>
          <h3 className="font-display text-h3-fluid leading-[0.98] tracking-[-0.018em]" style={{ fontVariationSettings: "'opsz' 144, 'wght' 300, 'SOFT' 30" }}>
            {cosmetica.names[locale].main}<br/><em className="font-display-italic text-verde">{cosmetica.names[locale].accent}</em>
          </h3>
          <p className="mt-4 text-sm leading-[1.7] text-graphite">
            {t.rich('personalDesc', { em: (c) => <em className="font-body-medium not-italic text-ink">{c}</em> })}
          </p>
          <div className="mt-6 flex min-h-touch items-baseline justify-between border-t border-rule pt-4">
            <span className="font-caption text-xl">{symbol}{cosmeticaPrice}</span>
            <Link
              href={cosmeticaHref}
              className="inline-flex min-h-touch items-center border-b border-ink pb-1 text-[10px] font-medium uppercase tracking-[0.28em] transition-colors hover:border-verde hover:text-verde"
            >
              {cosmetica.names[locale].full} →
            </Link>
          </div>
        </div>
      </div>

      {/* Hogar */}
      {hogar && hogarHref && hogarPrice !== null && (
        <div className="grid items-center gap-[clamp(24px,4vw,40px)] bg-paper px-pad-x py-[clamp(48px,8vw,100px)] lg:grid-cols-2">
          <Link href={hogarHref} className="relative mx-auto block aspect-[4/5] w-full max-w-[440px] overflow-hidden lg:max-w-none">
            <Image
              src="/images/landing/dual-right.jpg"
              alt={hogar.names[locale].full}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
            <span className="absolute left-3.5 top-3.5 bg-bg px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-azul">{t('hogarBadge')}</span>
          </Link>
          <div className="w-full">
            <div className="mb-3.5 text-[11px] uppercase tracking-[0.28em] text-azul">— {t('hogarLine')}</div>
            <h3 className="font-display text-h3-fluid leading-[0.98] tracking-[-0.018em]" style={{ fontVariationSettings: "'opsz' 144, 'wght' 300, 'SOFT' 30" }}>
              {hogar.names[locale].main}<br/><em className="font-display-italic text-azul">{hogar.names[locale].accent}</em>
            </h3>
            <p className="mt-4 text-sm leading-[1.7] text-graphite">
              {t.rich('hogarDesc', { em: (c) => <em className="font-body-medium not-italic text-ink">{c}</em> })}
            </p>
            <div className="mt-6 flex min-h-touch items-baseline justify-between border-t border-rule pt-4">
              <span className="font-caption text-xl">{symbol}{hogarPrice}</span>
              <Link
                href={hogarHref}
                className="inline-flex min-h-touch items-center border-b border-ink pb-1 text-[10px] font-medium uppercase tracking-[0.28em] transition-colors hover:border-azul hover:text-azul"
              >
                {hogar.names[locale].full} →
              </Link>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
