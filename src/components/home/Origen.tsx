import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { Locale, Region } from '@/lib/i18n/config';
import { buildPath } from '@/lib/i18n/paths';

interface Props { region: Region; locale: Locale; }

export function Origen({ region, locale }: Props) {
  const t = useTranslations('origen');
  return (
    <section id="origen-section" className="relative overflow-hidden bg-verde" style={{ minHeight: 'clamp(440px, 72vh, 680px)' }}>
      <Image src="/images/landing/origen.jpg" alt="Taller artesanal Natura Esencials en Marbella, Andalucía" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/[0.82] via-ink/[0.38] to-ink/[0.08]" />
      <div className="relative z-10 flex h-full items-center px-pad-x py-pad-y">
        <div className="max-w-[540px] text-bg">
          <div className="mb-6 text-[11px] uppercase tracking-[0.35em] text-verde-claro">— {t('kicker')}</div>
          <h2 className="font-display text-h1-fluid leading-[0.97] tracking-[-0.025em]">
            {t('title1')} <em className="font-display-italic text-verde-claro">{t('titleAccent1')}</em><br/>{t('title2')}
          </h2>
          <p className="mt-6 max-w-[440px] text-[15px] leading-[1.85] opacity-90" style={{ fontVariationSettings: "'opsz' 14, 'wght' 350" }}>
            {t.rich('body', { em: (c) => <em className="font-caption not-italic">{c}</em> })}
          </p>
          <Link href={buildPath(region, locale, 'origen')} className="mt-8 inline-flex min-h-touch items-center border-b border-bg/60 pb-1 text-[11px] font-medium uppercase tracking-[0.28em]">
            {t('cta')} →
          </Link>
        </div>
      </div>
      <div className="absolute bottom-[clamp(20px,3vw,40px)] right-pad-x text-right text-[10px] uppercase tracking-[0.3em] text-bg/80">
        {t('coordTitle')}
        <strong className="mt-1.5 block font-display-italic text-[clamp(16px,2vw,22px)] normal-case tracking-[0.02em] text-verde-claro" style={{ fontWeight: 300 }}>{t('coordValue')}</strong>
      </div>
    </section>
  );
}
