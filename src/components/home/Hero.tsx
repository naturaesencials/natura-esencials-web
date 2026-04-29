import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { buildPath } from '@/lib/i18n/paths';
import { getRitualsByLineAndRegion } from '@/data/rituales';
import type { Locale, Region } from '@/lib/i18n/config';

interface Props { region: Region; locale: Locale; }

export function Hero({ region, locale }: Props) {
  const t = useTranslations('hero');
  const cosmeticaCount = getRitualsByLineAndRegion('cosmetica', region).length;
  const hogarCount = getRitualsByLineAndRegion('hogar', region).length;

  return (
    <section className="grid bg-bg lg:min-h-[calc(100vh-120px)] lg:grid-cols-[1.1fr_1fr]">
      {/* Texto */}
      <div className="order-2 flex flex-col justify-center px-pad-x py-[clamp(40px,8vw,80px)] lg:order-1 lg:py-20">
        {/* Stamp */}
        <div className="mb-[clamp(20px,3vw,32px)] flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[11px] uppercase tracking-[0.25em] text-verde">
          <span>{t('stampDate')}</span>
          <span aria-hidden className="size-[5px] rounded-full bg-citrico shrink-0" />
          <em className="font-caption not-italic text-ink text-sm">{t('stampOrigin')}</em>
        </div>

        {/* Kicker */}
        <div className="mb-[clamp(24px,4vw,36px)] text-[11px] uppercase tracking-[0.32em] text-verde-vivo">— {t('kicker')}</div>

        {/* H1 */}
        <h1 className="font-display text-display leading-[0.94] tracking-[-0.03em] text-ink">
          {t('titleLine1')} <em className="font-display-italic text-verde">{t('titleAccent1')}</em><br />
          {t('titleLine2')} <em className="font-display-italic text-azul">{t('titleAccent2')}</em><br />
          {t('titleLine3')}
        </h1>

        {/* Lede */}
        <p className="mt-[clamp(24px,4vw,40px)] max-w-[520px] text-[clamp(15px,1.4vw,17px)] leading-[1.75]" style={{ fontVariationSettings: "'opsz' 14, 'wght' 400" }}>
          {t.rich('lede', {
            em: (chunks) => <em className="font-caption text-verde">{chunks}</em>,
          })}
        </p>

        {/* Dual marks */}
        <div className="mt-[clamp(28px,4vw,40px)] grid grid-cols-2 gap-[clamp(16px,3vw,40px)] border-t border-rule pt-[clamp(24px,3vw,32px)]">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-[0.28em] text-graphite">— {t('marksCosmetica')}</span>
            <span className="font-caption text-[clamp(16px,1.8vw,20px)] text-verde">{t('marksCosmeticaCount', { count: cosmeticaCount })}</span>
            <span className="text-[11px] leading-[1.5] text-graphite">{t('marksCosmeticaDesc')}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-[0.28em] text-graphite">— {t('marksHogar')}</span>
            <span className="font-caption text-[clamp(16px,1.8vw,20px)] text-azul">{t('marksHogarCount', { count: hogarCount })}</span>
            <span className="text-[11px] leading-[1.5] text-graphite">{t('marksHogarDesc')}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-[clamp(32px,5vw,44px)] flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link
            href={buildPath(region, locale, 'cosmetica')}
            className="inline-flex min-h-touch items-center bg-verde px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.28em] text-bg transition-colors hover:bg-verde-vivo"
          >
            {t('ctaPrimary')}
          </Link>
          <Link
            href={buildPath(region, locale, 'origen')}
            className="inline-flex min-h-touch items-center border-b border-ink pb-1 text-[11px] font-medium uppercase tracking-[0.28em] text-ink"
          >
            {t('ctaSecondary')} →
          </Link>
        </div>
      </div>

      {/* Foto */}
      <div className="relative order-1 aspect-[4/3] min-h-[320px] overflow-hidden lg:order-2 lg:aspect-auto lg:min-h-full">
        <Image
          src="https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt={t('imgTagCosmetica') + ' & ' + t('imgTagHogar')}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        {/* Tag Cosmética */}
        <div className="absolute right-4 top-4 flex items-center gap-2 bg-bg px-3.5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-verde shadow-md sm:right-6 sm:top-6 sm:px-[18px] sm:py-3 lg:right-12 lg:top-12">
          <span className="size-1.5 rounded-full bg-verde-vivo" aria-hidden />
          {t('imgTagCosmetica')}
        </div>
        {/* Tag Hogar */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-bg px-3.5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-azul shadow-md sm:bottom-6 sm:right-6 sm:px-[18px] sm:py-3 lg:bottom-12 lg:right-12">
          <span className="size-1.5 rounded-full bg-azul" aria-hidden />
          {t('imgTagHogar')}
        </div>
      </div>
    </section>
  );
}
