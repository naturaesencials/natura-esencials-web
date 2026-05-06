import { useTranslations } from 'next-intl';

export function Strip() {
  const t = useTranslations('strip');
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-y border-rule bg-paper px-pad-x py-[clamp(28px,4vw,40px)] text-center text-[10px] uppercase tracking-[0.22em] text-graphite lg:grid-cols-4 lg:text-[11px]">
      <span><em className="font-caption not-italic text-verde mr-1.5 text-sm lg:text-[15px]">{t('shipping')}</em>{t('shippingDesc')}</span>
      <span><em className="font-caption not-italic text-verde mr-1.5 text-sm lg:text-[15px]">{t('returns')}</em>{t('returnsDesc')}</span>
      <span><em className="font-caption not-italic text-verde mr-1.5 text-sm lg:text-[15px]">{t('samples')}</em>{t('samplesDesc')}</span>
      <span><em className="font-caption not-italic text-verde mr-1.5 text-sm lg:text-[15px]">{t('iso')}</em>{t('isoDesc')}</span>
    </div>
  );
}
