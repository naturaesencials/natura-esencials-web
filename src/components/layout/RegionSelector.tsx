'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  regions,
  regionLocales,
  regionCurrency,
  localeMap,
  type Locale,
  type Region,
} from '@/lib/i18n/config';

interface Props {
  open: boolean;
  onClose: () => void;
  currentRegion: Region;
  currentLocale: Locale;
}

export function RegionSelector({ open, onClose, currentRegion, currentLocale }: Props) {
  const t = useTranslations('regionModal');
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const handleSelect = async (region: Region, locale: Locale) => {
    document.cookie = `ne-region=${region}; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `ne-locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    onClose();
    router.push(`/${region}/${locale}`);
    router.refresh();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-ink/50 backdrop-blur-sm px-4 py-8" role="dialog" aria-modal="true" aria-labelledby="region-modal-title">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-bg p-6 shadow-2xl sm:p-10">
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 flex size-touch items-center justify-center text-graphite hover:text-ink">
          ✕
        </button>

        <h2 id="region-modal-title" className="font-display text-3xl leading-tight text-ink sm:text-4xl" style={{ fontVariationSettings: "'opsz' 144, 'wght' 300, 'SOFT' 40" }}>
          {t('title')}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-graphite">{t('subtitle')}</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {regions.map((region) => (
            <div key={region} className={`flex flex-col gap-4 border p-5 ${region === currentRegion ? 'border-verde' : 'border-ink/10'}`}>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-verde-vivo">
                  {t(region === 'eu' ? 'europe' : 'uk')}
                </div>
                <div className="mt-1 font-caption text-lg text-ink">
                  {regionCurrency[region].symbol} {regionCurrency[region].code}
                </div>
                <p className="mt-2 text-xs text-graphite">{t(region === 'eu' ? 'europeDesc' : 'ukDesc')}</p>
              </div>

              <div className="flex flex-col gap-1">
                {regionLocales[region].map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleSelect(region, loc)}
                    className={`flex min-h-touch items-center justify-between border-b border-ink/10 px-1 py-2 text-left text-sm transition-colors hover:text-verde-vivo ${
                      region === currentRegion && loc === currentLocale ? 'text-verde' : 'text-ink'
                    }`}
                  >
                    <span>{localeMap[loc].nativeName}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-stone">{localeMap[loc].bcp47}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
