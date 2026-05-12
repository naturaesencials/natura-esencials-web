'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { buildPath } from '@/lib/i18n/paths';
import type { Locale, Region } from '@/lib/i18n/config';

const COOKIE_KEY = 'ne-cookie-consent';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 año

const T: Record<string, { text: string; accept: string; reject: string; policy: string }> = {
  es: { text: 'Usamos cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico. Puedes aceptarlas o rechazar las no esenciales.', accept: 'Aceptar', reject: 'Solo esenciales', policy: 'Política de cookies' },
  en: { text: 'We use our own and third-party cookies to improve your experience and analyse traffic. You can accept all or reject non-essential ones.', accept: 'Accept all', reject: 'Essential only', policy: 'Cookie policy' },
  fr: { text: 'Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic.', accept: 'Accepter', reject: 'Essentiels uniquement', policy: 'Politique de cookies' },
  de: { text: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und den Datenverkehr zu analysieren.', accept: 'Akzeptieren', reject: 'Nur wesentliche', policy: 'Cookie-Richtlinie' },
  it: { text: 'Utilizziamo cookie per migliorare la tua esperienza e analizzare il traffico.', accept: 'Accetta', reject: 'Solo essenziali', policy: 'Informativa sui cookie' },
  nl: { text: 'Wij gebruiken cookies om uw ervaring te verbeteren en het verkeer te analyseren.', accept: 'Accepteren', reject: 'Alleen essentieel', policy: 'Cookiebeleid' },
  pt: { text: 'Usamos cookies para melhorar a sua experiência e analisar o tráfego.', accept: 'Aceitar', reject: 'Apenas essenciais', policy: 'Política de cookies' },
};

interface Props { region: Region; locale: Locale; }

export function CookieBanner({ region, locale }: Props) {
  const [visible, setVisible] = useState(false);
  const lb = T[locale] ?? T.es;

  useEffect(() => {
    try {
      const cookies = Object.fromEntries(
        document.cookie.split(';').map(c => c.trim().split('=').map(decodeURIComponent))
      );
      if (!cookies[COOKIE_KEY]) setVisible(true);
    } catch { setVisible(true); }
  }, []);

  const save = (value: 'all' | 'essential') => {
    document.cookie = `${COOKIE_KEY}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[980] border-t border-rule bg-bg/95 backdrop-blur-md px-pad-x py-5 shadow-2xl sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[420px] sm:border sm:rounded-sm"
    >
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-verde">🍪 Cookies</p>
      <p className="text-[13px] leading-[1.65] text-ink/80 mb-4">{lb.text}{' '}
        <Link href={buildPath(region, locale, 'cookies')} className="text-verde underline underline-offset-2 hover:no-underline">
          {lb.policy}
        </Link>
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => save('all')}
          className="flex-1 bg-ink px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-bg transition-colors hover:bg-verde"
        >
          {lb.accept}
        </button>
        <button
          onClick={() => save('essential')}
          className="flex-1 border border-ink/30 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-ink transition-colors hover:border-ink"
        >
          {lb.reject}
        </button>
      </div>
    </div>
  );
}
