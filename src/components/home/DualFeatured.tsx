import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Locale, Region } from '@/lib/i18n/config';
import { regionCurrency } from '@/lib/i18n/config';
import { rituales } from '@/data/rituales';

interface Props { region: Region; locale: Locale; }

export function DualFeatured({ region, locale }: Props) {
  const t = useTranslations('dualFeatured');
  const tc = useTranslations('common');
  const symbol = regionCurrency[region].symbol;

  // Plenitud (id 1) y Refugio (id 6)
  const cosmetica = rituales.find(r => r.id === 1)!;
  const hogar = rituales.find(r => r.id === 6);

  // Si Refugio no está en UK, fallback a otro hogar disponible
  const hogarActual = hogar?.availableIn.includes(region) ? hogar : rituales.find(r => r.line === 'hogar' && r.availableIn.includes(region));

  const cosmeticaPrice = region === 'eu' ? cosmetica.basePriceEUR : cosmetica.basePriceGBP;
  const hogarPrice = hogarActual ? (region === 'eu' ? hogarActual.basePriceEUR : hogarActual.basePriceGBP) : null;

  return (
    <section className="grid border-y border-rule lg:grid-cols-2">
      {/* Cosmética */}
      <div className="grid items-center gap-[clamp(24px,4vw,40px)] border-b border-rule px-pad-x py-[clamp(48px,8vw,100px)] lg:grid-cols-2 lg:border-b-0 lg:border-r">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden lg:max-w-none">
          <Image
            src="https://images.pexels.com/photos/8945933/pexels-photo-8945933.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt={cosmetica.names[locale].full}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="absolute left-3.5 top-3.5 bg-bg px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-verde">{t('personalBadge')}</span>
        </div>
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
            <button className="inline-flex min-h-touch items-center border-b border-ink pb-1 text-[10px] font-medium uppercase tracking-[0.28em]">{tc('addToBag')} →</button>
          </div>
        </div>
      </div>

      {/* Hogar */}
      {hogarActual && hogarPrice !== null && (
        <div className="grid items-center gap-[clamp(24px,4vw,40px)] bg-paper px-pad-x py-[clamp(48px,8vw,100px)] lg:grid-cols-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden lg:max-w-none">
            <Image
              src="https://images.pexels.com/photos/4202326/pexels-photo-4202326.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt={hogarActual.names[locale].full}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="absolute left-3.5 top-3.5 bg-bg px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-azul">{t('hogarBadge')}</span>
          </div>
          <div className="w-full">
            <div className="mb-3.5 text-[11px] uppercase tracking-[0.28em] text-azul">— {t('hogarLine')}</div>
            <h3 className="font-display text-h3-fluid leading-[0.98] tracking-[-0.018em]" style={{ fontVariationSettings: "'opsz' 144, 'wght' 300, 'SOFT' 30" }}>
              {hogarActual.names[locale].main}<br/><em className="font-display-italic text-azul">{hogarActual.names[locale].accent}</em>
            </h3>
            <p className="mt-4 text-sm leading-[1.7] text-graphite">
              {t.rich('hogarDesc', { em: (c) => <em className="font-body-medium not-italic text-ink">{c}</em> })}
            </p>
            <div className="mt-6 flex min-h-touch items-baseline justify-between border-t border-rule pt-4">
              <span className="font-caption text-xl">{symbol}{hogarPrice}</span>
              <button className="inline-flex min-h-touch items-center border-b border-ink pb-1 text-[10px] font-medium uppercase tracking-[0.28em]">{tc('addToBag')} →</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
