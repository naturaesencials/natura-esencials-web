'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';
import { buildPath } from '@/lib/i18n/paths';
import {
  regions, regionLocales, regionCurrency, localeMap,
  type Locale, type Region,
} from '@/lib/i18n/config';
import { RegionSelector } from './RegionSelector';

interface Props { region: Region; locale: Locale; }

export function Footer({ region, locale }: Props) {
  const t = useTranslations('footer');
  const tc = useTranslations('common');
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <footer className="grid gap-pad-y-sm bg-ink px-pad-x pb-7 pt-pad-y-sm text-xs leading-[1.9] text-bg sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
      {/* Brand */}
      <div className="sm:col-span-2 lg:col-auto">
        <span className="mb-3.5 block text-[clamp(26px,3vw,30px)] tracking-[0.01em]" style={{ fontVariationSettings: "'opsz' 144, 'wght' 350, 'SOFT' 30" }}>
          Natura <em className="font-display-italic" style={{ color: '#B4D4A8' }}>Esencials</em>
        </span>
        <p className="max-w-[320px] text-bg/70">{t('brandDesc')}</p>
        <p className="mt-3 text-[11px] tracking-[0.04em]">
          {siteConfig.contact.email}<br />
          {siteConfig.contact.phone}
        </p>
      </div>

      <div>
        <h5 className="mb-3.5 text-[10px] font-medium uppercase tracking-[0.3em] text-verde-claro">{t('colCosmetica')}</h5>
        <Link className="flex min-h-[34px] items-center text-bg/70 transition-colors hover:text-bg" href={buildPath(region, locale, 'cosmetica')}>{t('colCosmetica')}</Link>
      </div>

      <div>
        <h5 className="mb-3.5 text-[10px] font-medium uppercase tracking-[0.3em] text-azul-claro">{t('colHogar')}</h5>
        <Link className="flex min-h-[34px] items-center text-bg/70 transition-colors hover:text-bg" href={buildPath(region, locale, 'hogar')}>{t('colHogar')}</Link>
      </div>

      <div>
        <h5 className="mb-3.5 text-[10px] font-medium uppercase tracking-[0.3em] text-citrico">{t('colMascota')}</h5>
        <Link className="flex min-h-[34px] items-center text-bg/70 transition-colors hover:text-bg" href={buildPath(region, locale, 'mascota')}>{t('colMascota')}</Link>
      </div>

      <div>
        <h5 className="mb-3.5 text-[10px] font-medium uppercase tracking-[0.3em] text-bg/55">{t('colCasa')}</h5>
        <Link className="flex min-h-[34px] items-center text-bg/70 transition-colors hover:text-bg" href={buildPath(region, locale, 'origen')}>{t('linkOrigen')}</Link>
        <Link className="flex min-h-[34px] items-center text-bg/70 transition-colors hover:text-bg" href={buildPath(region, locale, 'diario')}>{t('linkDiario')}</Link>
        <Link className="flex min-h-[34px] items-center text-bg/70 transition-colors hover:text-bg" href={buildPath(region, locale, 'contacto')}>{t('linkContacto')}</Link>
      </div>

      {/* Region & locale selector — siempre visible */}
      <div className="col-span-full mt-4 grid gap-4 border-t border-bg/15 pt-6 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="text-[10px] uppercase tracking-[0.25em] text-bg/55">
          <div className="mb-2">{tc('region')} & {tc('language')}</div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-bg/85">
            <span className="text-bg/60">{regions.map(r => r === region ? `● ${r.toUpperCase()}` : `○ ${r.toUpperCase()}`).join(' · ')}</span>
            <span className="text-bg/40">|</span>
            <span>{regionLocales[region].map(l => l === locale ? `● ${localeMap[l].nativeName}` : localeMap[l].nativeName).join(' · ')}</span>
          </div>
        </div>
        <button
          onClick={() => setSelectorOpen(true)}
          className="self-start border border-bg/30 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.25em] text-bg transition-colors hover:bg-bg hover:text-ink sm:self-center"
        >
          {tc('selectRegion')} →
        </button>
      </div>

      <div className="col-span-full mt-7 flex flex-col gap-2.5 border-t border-bg/15 pt-7 text-[10px] uppercase tracking-[0.22em] text-bg/55 lg:flex-row lg:items-center lg:justify-between">
        <span>© {new Date().getFullYear()} Natura Esencials · {siteConfig.entity.name}</span>
        <span>{t('linkPrivacidad')} · {t('linkTerminos')} · {t('linkCookies')}</span>
      </div>

      <RegionSelector open={selectorOpen} onClose={() => setSelectorOpen(false)} currentRegion={region} currentLocale={locale} />
    </footer>
  );
}
