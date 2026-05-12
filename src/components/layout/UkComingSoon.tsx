import Link from 'next/link';
import { buildPath } from '@/lib/i18n/paths';
import type { Region, Locale } from '@/lib/i18n/config';

interface Props { region: Region; locale: Locale; }

/**
 * Shown on all UK pages while the UK store is being prepared.
 * Directs visitors to the EU store in the meantime.
 */
export function UkComingSoon({ region, locale }: Props) {
  if (region !== 'uk') return null;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8 px-pad-x py-[clamp(64px,10vw,120px)] text-center">
      {/* Badge */}
      <span className="inline-block border border-azul px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-azul">
        UK Store
      </span>

      <div className="max-w-lg">
        <h1 className="font-display text-[clamp(32px,5vw,56px)] leading-[0.95] tracking-[-0.025em]">
          Coming soon<em className="font-display-italic text-azul">.</em>
        </h1>
        <p className="mt-5 text-[15px] leading-[1.85] text-graphite">
          We're preparing our UK store with UK-specific pricing and shipping.
          Until then, all our products are available in the EU store.
        </p>
      </div>

      {/* CTA → EU store */}
      <Link
        href={buildPath('eu', 'en', '')}
        className="inline-flex items-center gap-2 border-b border-ink pb-0.5 text-[11px] uppercase tracking-[0.28em] transition-colors hover:border-verde hover:text-verde"
      >
        Shop the EU store →
      </Link>

      {/* Nota de lanzamiento */}
      <p className="text-[11px] uppercase tracking-[0.22em] text-graphite/60">
        Natura Esencials UK · Launching 2026
      </p>
    </div>
  );
}
