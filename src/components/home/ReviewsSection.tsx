'use client';

import { useEffect, useRef } from 'react';
import type { Locale } from '@/lib/i18n/config';

const T: Record<string, { title: string; sub: string; poweredBy: string }> = {
  es: { title: 'Lo que dicen nuestros clientes', sub: 'Opiniones verificadas de compradores reales.', poweredBy: 'Opiniones verificadas por' },
  en: { title: 'What our customers say',  sub: 'Verified reviews from real buyers.',             poweredBy: 'Verified by' },
  fr: { title: 'Ce que disent nos clients', sub: 'Avis vérifiés d\'acheteurs réels.',              poweredBy: 'Avis vérifiés par' },
  de: { title: 'Was unsere Kunden sagen', sub: 'Verifizierte Bewertungen echter Käufer.',         poweredBy: 'Verifiziert von' },
  it: { title: 'Cosa dicono i nostri clienti', sub: 'Recensioni verificate di acquirenti reali.', poweredBy: 'Verificate da' },
  nl: { title: 'Wat onze klanten zeggen', sub: 'Geverifieerde beoordelingen van echte kopers.',  poweredBy: 'Geverifieerd door' },
  pt: { title: 'O que dizem os nossos clientes', sub: 'Avaliações verificadas de compradores reais.', poweredBy: 'Verificado por' },
};

declare global {
  interface Window { jdgm?: { customInit?: () => void; init?: () => void }; }
}

interface Props { locale: Locale; }

export function ReviewsSection({ locale }: Props) {
  const lb = T[locale] ?? T.es;
  const shopDomain = process.env.NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN ?? 'www.naturaesencials.com';
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    const scriptId = 'judgeme-theme-js';
    const init = () => { window.jdgm?.customInit?.() ?? window.jdgm?.init?.(); };
    if (document.getElementById(scriptId)) { init(); return; }
    const s = document.createElement('script');
    s.id = scriptId; s.src = 'https://cdn.judge.me/assets/theme.js'; s.async = true; s.onload = init;
    document.head.appendChild(s);
  }, []);

  return (
    <section className="border-t border-rule bg-paper px-pad-x py-[clamp(48px,8vw,96px)]">
      <header className="mb-[clamp(32px,5vw,56px)] grid gap-[clamp(16px,2vw,24px)] lg:grid-cols-2 lg:items-end">
        <div>
          <span className="mb-4 inline-block rounded-full border border-verde px-3.5 py-1.5 text-[11px] uppercase tracking-[0.32em] text-verde">
            — {lb.sub}
          </span>
          <h2 className="font-display text-h2-fluid leading-[0.96] tracking-[-0.025em]">
            {lb.title}
          </h2>
        </div>
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-graphite lg:justify-end">
          {lb.poweredBy}
          <strong className="text-ink">Judge.me</strong>
        </p>
      </header>

      {/* Widget de todas las reseñas de la tienda */}
      <div
        className="jdgm-widget jdgm-all-reviews-widget"
        data-shop-domain={shopDomain}
      />
    </section>
  );
}
