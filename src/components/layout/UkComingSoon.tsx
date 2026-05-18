import Link from 'next/link';
import { buildPath } from '@/lib/i18n/paths';
import type { Region, Locale } from '@/lib/i18n/config';

interface Props { region: Region; locale: Locale; }

const COPY: Record<string, { title: string; body: string; cta: string; note: string }> = {
  en: {
    title: 'Coming soon',
    body:  "We're preparing our UK store with UK-specific pricing, GBP checkout and UK shipping. Until then, our full range is available in the EU store with delivery to the UK.",
    cta:   'Shop the EU store →',
    note:  'Natura Esencials UK · Launching 2026',
  },
  es: {
    title: 'Próximamente',
    body:  'Estamos preparando nuestra tienda UK con precios en libras, checkout en GBP y envío desde el Reino Unido. Mientras tanto, toda nuestra gama está disponible en la tienda EU.',
    cta:   'Ver tienda EU →',
    note:  'Natura Esencials UK · Lanzamiento 2026',
  },
  fr: {
    title: 'Bientôt disponible',
    body:  "Nous préparons notre boutique UK avec des prix en livres sterling et une livraison depuis le Royaume-Uni. En attendant, toute notre gamme est disponible dans la boutique UE.",
    cta:   'Voir la boutique UE →',
    note:  'Natura Esencials UK · Lancement 2026',
  },
  de: {
    title: 'Demnächst',
    body:  'Wir bereiten unseren UK-Shop mit Preisen in Pfund und UK-Versand vor. In der Zwischenzeit ist unser gesamtes Sortiment im EU-Shop erhältlich.',
    cta:   'EU-Shop besuchen →',
    note:  'Natura Esencials UK · Start 2026',
  },
  it: {
    title: 'Presto disponibile',
    body:  'Stiamo preparando il nostro negozio UK con prezzi in sterline e spedizione dal Regno Unito. Nel frattempo, tutta la nostra gamma è disponibile nel negozio UE.',
    cta:   'Visita il negozio UE →',
    note:  'Natura Esencials UK · Lancio 2026',
  },
  nl: {
    title: 'Binnenkort beschikbaar',
    body:  'We bereiden onze UK-winkel voor met prijzen in ponden en verzending vanuit het Verenigd Koninkrijk. In de tussentijd is ons volledige assortiment beschikbaar in de EU-winkel.',
    cta:   'Bezoek de EU-winkel →',
    note:  'Natura Esencials UK · Launch 2026',
  },
  pt: {
    title: 'Em breve',
    body:  'Estamos a preparar a nossa loja UK com preços em libras e envio do Reino Unido. Entretanto, toda a nossa gama está disponível na loja EU.',
    cta:   'Ver loja EU →',
    note:  'Natura Esencials UK · Lançamento 2026',
  },
};

/**
 * Página "Coming soon" para la región UK mientras no está activa.
 * Se controla con la env var NEXT_PUBLIC_UK_LIVE=true.
 */
export function UkComingSoon({ region, locale }: Props) {
  if (region !== 'uk') return null;

  const c = COPY[locale] ?? COPY.en;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8 px-pad-x py-[clamp(64px,10vw,120px)] text-center">
      <span className="inline-block border border-azul px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-azul">
        UK Store
      </span>
      <div className="max-w-lg">
        <h1 className="font-display text-[clamp(32px,5vw,56px)] leading-[0.95] tracking-[-0.025em]">
          {c.title}<em className="font-display-italic text-azul">.</em>
        </h1>
        <p className="mt-5 text-[15px] leading-[1.85] text-graphite">{c.body}</p>
      </div>
      <Link
        href={buildPath('eu', 'en', '')}
        className="inline-flex items-center gap-2 border-b border-ink pb-0.5 text-[11px] uppercase tracking-[0.28em] transition-colors hover:border-verde hover:text-verde"
      >
        {c.cta}
      </Link>
      <p className="text-[11px] uppercase tracking-[0.22em] text-graphite/60">{c.note}</p>
    </div>
  );
}
