'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';
import { buildPath } from '@/lib/i18n/paths';
import {
  regions, regionLocales, localeMap,
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

      {/* Brand — columna izquierda */}
      <div className="sm:col-span-2 lg:col-auto">
        <p className="max-w-[280px] text-[12px] text-bg/70">{t('brandDesc')}</p>
        <div className="mt-4 text-[11px] tracking-[0.04em] text-bg/80">
          <p className="mb-1 font-medium text-bg/90">{siteConfig.entity.name}</p>
          <a href={`mailto:${siteConfig.contact.email}`} className="block transition-colors hover:text-bg">{siteConfig.contact.email}</a>
          <a href={`tel:${siteConfig.contact.phone.replace(/\s/g,'')}`} className="block transition-colors hover:text-bg">{siteConfig.contact.phone}</a>
        </div>
      </div>

      {/* Cosmética */}
      <div>
        <p className="mb-3.5 text-[10px] font-medium uppercase tracking-[0.3em] text-verde-claro">{t('colCosmetica')}</p>
        <Link className="flex min-h-[34px] items-center text-bg/70 transition-colors hover:text-bg" href={buildPath(region, locale, 'cosmetica')}>{t('colCosmetica')}</Link>
      </div>

      {/* Hogar */}
      <div>
        <p className="mb-3.5 text-[10px] font-medium uppercase tracking-[0.3em] text-azul-claro">{t('colHogar')}</p>
        <Link className="flex min-h-[34px] items-center text-bg/70 transition-colors hover:text-bg" href={buildPath(region, locale, 'hogar')}>{t('colHogar')}</Link>
      </div>

      {/* Mascota */}
      <div>
        <p className="mb-3.5 text-[10px] font-medium uppercase tracking-[0.3em] text-citrico">{t('colMascota')}</p>
        <Link className="flex min-h-[34px] items-center text-bg/70 transition-colors hover:text-bg" href={buildPath(region, locale, 'mascota')}>{t('colMascota')}</Link>
      </div>

      {/* Casa / Links */}
      <div>
        <p className="mb-3.5 text-[10px] font-medium uppercase tracking-[0.3em] text-bg/55">{t('colCasa')}</p>
        <Link className="flex min-h-[34px] items-center text-bg/70 transition-colors hover:text-bg" href={buildPath(region, locale, 'origen')}>{t('linkOrigen')}</Link>
        <Link className="flex min-h-[34px] items-center text-bg/70 transition-colors hover:text-bg" href={buildPath(region, locale, 'blog')}>{t('linkDiario')}</Link>
        <Link className="flex min-h-[34px] items-center text-bg/70 transition-colors hover:text-bg" href={buildPath(region, locale, 'contacto')}>{t('linkContacto')}</Link>
        <Link className="flex min-h-[34px] items-center text-bg/70 transition-colors hover:text-bg" href={buildPath(region, locale, 'faq')}>FAQ</Link>
      </div>

      {/* Logos centrados — fila completa debajo de las columnas */}
      <div className="col-span-full mt-2 flex flex-col items-center justify-center gap-5 border-t border-bg/10 py-8 sm:flex-row sm:gap-10">
        <Image
          src="/images/logo-white-sm.png"
          alt="Natura Esencials — Handcrafted Natural Products"
          width={160}
          height={73}
          className="h-16 w-auto object-contain"
        />
        <span className="hidden h-10 w-px bg-bg/20 sm:block" aria-hidden />
        <Image
          src="/images/sello-artesania-white-sm.png"
          alt="Artesanía Hecha en Andalucía"
          width={200}
          height={78}
          className="h-11 w-auto object-contain opacity-80"
        />
      </div>

      {/* Region & locale selector */}
      <div className="col-span-full mt-2 grid gap-4 border-t border-bg/15 pt-6 sm:grid-cols-[1fr_auto] sm:items-center">
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

      {/* Legal bottom bar */}
      <div className="col-span-full mt-7 flex flex-col gap-3 border-t border-bg/15 pt-7 text-[10px] uppercase tracking-[0.22em] text-bg/55 lg:flex-row lg:items-center lg:justify-between">
        <span>© {new Date().getFullYear()} {siteConfig.entity.name}</span>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <Link href={buildPath(region, locale, 'privacidad')} className="transition-colors hover:text-bg/80">{t('linkPrivacidad')}</Link>
          <Link href={buildPath(region, locale, 'terminos')} className="transition-colors hover:text-bg/80">{t('linkTerminos')}</Link>
          <Link href={buildPath(region, locale, 'cookies')} className="transition-colors hover:text-bg/80">{t('linkCookies')}</Link>
        </div>
      </div>

      <RegionSelector open={selectorOpen} onClose={() => setSelectorOpen(false)} currentRegion={region} currentLocale={locale} />
    </footer>
  );
}
