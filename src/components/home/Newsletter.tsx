'use client';

import { useState, FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';

export function Newsletter() {
  const t = useTranslations('newsletter');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus('error');
      setMessage(t('invalidEmail'));
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale, source: 'home_newsletter' }),
      });
      if (res.ok) {
        setStatus('success');
        setMessage(t('success'));
        setEmail('');
      } else {
        throw new Error();
      }
    } catch {
      setStatus('error');
      setMessage(t('error'));
    }
  };

  return (
    <section className="relative overflow-hidden bg-paper px-pad-x py-pad-y">
      <Image src="https://images.pexels.com/photos/11254917/pexels-photo-11254917.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" fill sizes="100vw" className="object-cover opacity-40" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-paper/[0.88] to-bg/[0.92]" />
      <div className="relative z-10 mx-auto max-w-[760px] text-center">
        <div className="mb-7 text-[11px] uppercase tracking-[0.38em] text-verde-vivo">— {t('kicker')}</div>
        <h2 className="font-display text-h1-fluid leading-[1.02] tracking-[-0.022em]">
          {t('title1')}<br/>{t('title2')}<br/><em className="font-display-italic text-verde">{t('titleAccent')}</em>
        </h2>
        <p className="mx-auto mt-5 max-w-[460px] text-sm leading-[1.75] text-graphite">{t('sub')}</p>
        <form onSubmit={submit} className="mx-auto mt-12 flex max-w-[460px] items-center border-b border-verde">
          <label htmlFor="nl-email" className="sr-only">Email</label>
          <input
            id="nl-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder={t('placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-w-0 flex-1 border-0 bg-transparent py-3.5 text-[16px] text-ink outline-none placeholder:font-caption placeholder:text-stone"
            style={{ fontVariationSettings: "'opsz' 14, 'wght' 400" }}
          />
          <button type="submit" disabled={status === 'loading'} className="min-h-touch py-3.5 pl-6 text-[11px] font-medium uppercase tracking-[0.28em] text-verde transition-colors hover:text-verde-vivo disabled:opacity-50">
            {status === 'loading' ? '…' : t('submit')}
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-sm ${status === 'success' ? 'text-verde' : 'text-citrico'}`} role="status">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
