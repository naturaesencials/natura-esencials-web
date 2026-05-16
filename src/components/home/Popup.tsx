'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export function Popup() {
  const t = useTranslations('popup');
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(';').reduce<Record<string, string>>((acc, c) => {
      const [k, v] = c.trim().split('=');
      if (k && v) acc[k] = v;
      return acc;
    }, {});
    if (cookies['ne-popup-v2']) {
      setDismissed(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    document.cookie = 'ne-popup-v2=1; path=/; max-age=2592000; SameSite=Lax';
    setVisible(false);
    setDismissed(true);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, locale, source: 'popup_welcome' }),
    });
    setSubmitted(true);
    setTimeout(close, 2400);
  };

  if (dismissed || !visible) return null;

  return (
    <aside className="fixed bottom-0 left-0 right-0 z-[950] mx-auto w-full max-w-[420px] overflow-hidden border-t border-verde bg-bg shadow-2xl transition-transform duration-500 sm:bottom-6 sm:left-auto sm:right-6 sm:border" role="dialog" aria-labelledby="popup-title">
      <button onClick={close} aria-label="Close" className="absolute right-3 top-3 z-20 grid size-touch place-items-center rounded-full bg-ink/55 text-bg backdrop-blur-md hover:bg-ink/75">×</button>
      <div className="relative aspect-[3/1] sm:aspect-[2/1]">
        <Image src="/images/landing/card-2.jpg" alt="" fill sizes="420px" className="object-cover" aria-hidden />
      </div>
      <div className="px-7 pb-7 pt-6">
        <div className="text-[10px] uppercase tracking-[0.32em] text-verde-vivo">— {t('kicker')}</div>
        <p id="popup-title" className="mt-3 font-display text-[clamp(22px,3.4vw,28px)] leading-[1.12] tracking-[-0.012em] text-ink">{t('title')}</p>
        <p className="mt-2.5 text-[13px] leading-[1.65] text-graphite">{t('body')}</p>
        {submitted ? (
          <p className="mt-4 text-sm text-verde">✓</p>
        ) : (
          <form onSubmit={submit} className="mt-4 flex border-b border-verde">
            <input type="email" inputMode="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" className="min-w-0 flex-1 border-0 bg-transparent py-2.5 text-[16px] outline-none" />
            <button type="submit" className="min-h-touch py-2.5 pl-4 text-[10px] font-medium uppercase tracking-[0.25em] text-verde">{t('submit')} →</button>
          </form>
        )}
      </div>
    </aside>
  );
}
