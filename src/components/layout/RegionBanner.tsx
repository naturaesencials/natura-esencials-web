'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { regionCurrency, localeMap, type Locale, type Region } from '@/lib/i18n/config';
import { RegionSelector } from './RegionSelector';

interface Props {
  region: Region;
  locale: Locale;
}

export function RegionBanner({ region, locale }: Props) {
  const t = useTranslations('regionBanner');
  const [visible, setVisible] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(false);

  useEffect(() => {
    // Solo mostrar si no hay cookie de preferencia manual
    const cookies = document.cookie.split(';').reduce<Record<string, string>>((acc, c) => {
      const [k, v] = c.trim().split('=');
      if (k && v) acc[k] = v;
      return acc;
    }, {});

    if (!cookies['ne-region-confirmed']) {
      setVisible(true);
      // Auto-cerrar a los 10 segundos
      const t = setTimeout(() => setVisible(false), 10000);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    document.cookie = 'ne-region-confirmed=1; path=/; max-age=31536000; SameSite=Lax';
    setVisible(false);
  };

  if (!visible) return (
    <RegionSelector
      open={selectorOpen}
      onClose={() => setSelectorOpen(false)}
      currentRegion={region}
      currentLocale={locale}
    />
  );

  return (
    <>
      <div className="border-b border-rule bg-paper/80 px-pad-x py-2.5 text-center text-[11px] uppercase tracking-[0.2em] text-graphite backdrop-blur-sm">
        <span aria-hidden="true" className="mr-2">📍</span>
        <span>
          {t('showing')} <em className="font-caption not-italic text-ink">{region === 'eu' ? 'EU' : 'UK'} ({regionCurrency[region].code})</em>{' '}
          {t('in')} <em className="font-caption not-italic text-ink">{localeMap[locale].nativeName}</em>
        </span>
        <button
          onClick={() => setSelectorOpen(true)}
          className="ml-3 underline-offset-4 hover:underline text-ink font-medium"
        >
          {t('change')} →
        </button>
        <button
          onClick={dismiss}
          aria-label="Close"
          className="ml-3 text-graphite/70 hover:text-ink"
        >
          ✕
        </button>
      </div>

      <RegionSelector
        open={selectorOpen}
        onClose={() => { setSelectorOpen(false); dismiss(); }}
        currentRegion={region}
        currentLocale={locale}
      />
    </>
  );
}
