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
        {/* Social icons */}
        <div className="flex items-center gap-3">
          {[
            { name: 'Instagram', href: siteConfig.social.instagram, d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
            { name: 'Facebook', href: siteConfig.social.facebook, d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
            { name: 'YouTube', href: siteConfig.social.youtube, d: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
            { name: 'TikTok', href: siteConfig.social.tiktok, d: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
            { name: 'LinkedIn', href: siteConfig.social.linkedin, d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
          ].map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" title={s.name} className="text-bg/50 hover:text-bg transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d={s.d} /></svg>
            </a>
          ))}
        </div>
      </div>

      <RegionSelector open={selectorOpen} onClose={() => setSelectorOpen(false)} currentRegion={region} currentLocale={locale} />
    </footer>
  );
}
