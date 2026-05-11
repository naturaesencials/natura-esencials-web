import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function BotanicaBand() {
  const t = useTranslations('botanica');
  return (
    <section className="relative flex items-center overflow-hidden text-bg" style={{ minHeight: 'clamp(420px, 60vh, 640px)' }}>
      <Image
        src="/images/landing/botanica.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/[0.82] via-ink/[0.42] to-ink/[0.12]" />
      <div className="relative z-10 max-w-3xl px-pad-x py-pad-y">
        <div className="mb-6 text-[11px] uppercase tracking-[0.35em] text-verde-claro">— {t('kicker')}</div>
        <h2 className="font-display text-[clamp(28px,4.5vw,60px)] leading-[1.15] tracking-[-0.018em]">
          {t('title1')} <em className="font-display-italic text-verde-claro">{t('titleAccent1')}</em>{t('title2')} <em className="font-display-italic text-verde-claro">{t('titleAccent2')}</em>
        </h2>
        <p className="mt-6 max-w-[540px] text-[15px] leading-[1.75] opacity-90">
          {t.rich('body', { em: (c) => <em className="font-caption not-italic">{c}</em> })}
        </p>
      </div>
    </section>
  );
}
