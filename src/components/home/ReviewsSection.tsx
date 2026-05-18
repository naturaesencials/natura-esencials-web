'use client';

import { ReviewsWidget } from '@/components/reviews/ReviewsWidget';
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

interface Props { locale: Locale; region?: 'eu' | 'uk'; }

export function ReviewsSection({ locale, region = 'eu' }: Props) {
  const lb = T[locale] ?? T.es;

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

      {/* All-store reviews widget */}
      <ReviewsWidget locale={locale} region={region} />
    </section>
  );
}
