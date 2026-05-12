'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { buildPath } from '@/lib/i18n/paths';
import { regionCurrency, type Locale, type Region } from '@/lib/i18n/config';
import { MobileMenu } from './MobileMenu';
import { RegionSelector } from './RegionSelector';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  region: Region;
  locale: Locale;
}

export function Header({ region, locale }: HeaderProps) {
  const t = useTranslations('header');
  const tc = useTranslations('common');
  const [menuOpen, setMenuOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-[900] grid items-center gap-2 border-b border-ink/10 bg-bg/90 backdrop-blur-md backdrop-saturate-150 px-pad-x py-4 lg:py-[22px] [grid-template-columns:44px_1fr_44px_44px] lg:[grid-template-columns:1fr_auto_1fr]"
        data-menu-open={menuOpen}
      >
        {/* Hamburguesa (mobile) */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={tc(menuOpen ? 'close' : 'open')}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="flex size-touch items-center justify-center text-ink lg:hidden"
        >
          <span className="relative inline-block h-[14px] w-[22px]">
            <span
              className={`absolute left-0 right-0 h-px bg-current transition-transform duration-300 ${
                menuOpen ? 'top-[6.5px] rotate-45' : 'top-[2px]'
              }`}
            />
            <span
              className={`absolute left-0 right-0 h-px bg-current transition-transform duration-300 ${
                menuOpen ? 'bottom-[6.5px] -rotate-45' : 'bottom-[2px]'
              }`}
            />
          </span>
        </button>

        {/* Nav primario (desktop) */}
        <nav className="hidden lg:flex lg:gap-[clamp(20px,2.4vw,36px)]" aria-label="Primary navigation">
          <Link href={buildPath(region, locale, 'cosmetica')} className="px-0.5 py-2 text-[11px] font-[450] uppercase tracking-[0.22em] transition-colors hover:text-verde-vivo">{t('navCosmetica')}</Link>
          <Link href={buildPath(region, locale, 'hogar')}     className="px-0.5 py-2 text-[11px] font-[450] uppercase tracking-[0.22em] transition-colors hover:text-verde-vivo">{t('navHogar')}</Link>
          <Link href={buildPath(region, locale, 'mascota')}   className="px-0.5 py-2 text-[11px] font-[450] uppercase tracking-[0.22em] transition-colors hover:text-verde-vivo">{t('navMascota')}</Link>
          <Link href={buildPath(region, locale, 'origen')}    className="px-0.5 py-2 text-[11px] font-[450] uppercase tracking-[0.22em] transition-colors hover:text-verde-vivo">{t('navOrigen')}</Link>
        </nav>

        {/* Logo */}
        <Link href={buildPath(region, locale)} className="flex items-center justify-center">
          <Image
            src="/images/logo-header.png"
            alt="Natura Esencials — Handcrafted Natural Products"
            width={298}
            height={160}
            className="h-[56px] w-auto lg:h-[72px]"
            priority
          />
        </Link>

        {/* Utils (desktop) */}
        <div className="hidden lg:flex lg:items-center lg:justify-end lg:gap-[clamp(16px,1.6vw,28px)]">
          <button
            onClick={() => setRegionOpen(true)}
            className="flex items-center gap-2 px-2 py-2 text-[11px] font-[450] uppercase tracking-[0.22em] transition-colors hover:text-verde-vivo"
          >
            <span aria-hidden="true">🌍</span>
            <span>{region.toUpperCase()} · {locale.toUpperCase()}</span>
          </button>
          <button className="px-0.5 py-2 text-[11px] font-[450] uppercase tracking-[0.22em] transition-colors hover:text-verde-vivo">{tc('search')}</button>
          <button className="px-0.5 py-2 text-[11px] font-[450] uppercase tracking-[0.22em] transition-colors hover:text-verde-vivo">{tc('account')}</button>
          <button
            onClick={openCart}
            className="flex items-center gap-1 px-0.5 py-2 text-[11px] font-[450] uppercase tracking-[0.22em] transition-colors hover:text-verde-vivo"
          >
            {tc('bag')} · {totalItems}
          </button>
        </div>

        {/* Búsqueda (mobile) */}
        <button aria-label={tc('search')} className="flex size-touch items-center justify-center text-ink lg:hidden">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="h-[18px] w-[18px]">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M20 20l-4.8-4.8" />
          </svg>
        </button>

        {/* Bolsa (mobile) */}
        <button
          onClick={openCart}
          aria-label={`${tc('bag')} (${totalItems})`}
          className="flex size-touch flex-col items-center justify-center text-ink lg:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="h-5 w-5">
            <path d="M5 7h14l-1 13H6zM8.5 7a3.5 3.5 0 017 0" />
          </svg>
          <span className={`mt-0.5 font-caption text-[9px] ${totalItems > 0 ? 'text-verde font-bold' : 'text-verde'}`}>
            {totalItems}
          </span>
        </button>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} region={region} locale={locale} onOpenRegionSelector={() => { setMenuOpen(false); setRegionOpen(true); }} />

      <RegionSelector open={regionOpen} onClose={() => setRegionOpen(false)} currentRegion={region} currentLocale={locale} />
    </>
  );
}
