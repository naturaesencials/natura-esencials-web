'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { buildPath } from '@/lib/i18n/paths';
import type { Locale, Region } from '@/lib/i18n/config';

interface Props {
  open: boolean;
  onClose: () => void;
  region: Region;
  locale: Locale;
  onOpenRegionSelector: () => void;
}

export function MobileMenu({ open, onClose, region, locale, onOpenRegionSelector }: Props) {
  const t = useTranslations('header');
  const tc = useTranslations('common');
  const router = useRouter();

  // Navigate then close. Using router.push() instead of <Link onClick={onClose}>
  // prevents a race condition where onClose's setState would unmount the link
  // before its native click navigation registered on mobile Safari.
  const goTo = (href: string) => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(href);
    // Defer close one tick so navigation has been queued first
    setTimeout(onClose, 0);
  };

  return (
    <div
      id="mobile-menu"
      aria-hidden={!open}
      className={`fixed inset-0 z-[800] flex flex-col gap-8 overflow-y-auto bg-bg px-pad-x pb-10 transition-all duration-300 lg:hidden ${
        open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
      }`}
      style={{
        // Push content below the header with a generous gap that also
        // accounts for the iOS notch/dynamic-island safe area. The header
        // is ~76px tall; we leave 32px+ clearance so the first link can
        // never overlap the hamburger/close button on the left.
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 108px)',
      }}
    >
      <nav className="flex flex-col border-t border-ink/10">
        {[
          { key: 'navCosmetica', section: 'cosmetica' as const, color: 'text-verde' },
          { key: 'navHogar',     section: 'hogar'     as const, color: 'text-azul' },
          { key: 'navMascota',   section: 'mascota'   as const, color: 'text-citrico' },
          { key: 'navRituales',  section: 'rituales'  as const, color: 'text-verde-vivo' },
          { key: 'navOrigen',    section: 'origen'    as const, color: 'text-ink' },
          ...[{ key: 'navDiario', section: 'blog' as const, color: 'text-ink' }],
        ].map((item) => {
          const href = buildPath(region, locale, item.section);
          return (
            <a
              key={item.section}
              href={href}
              onClick={goTo(href)}
              className="flex min-h-touch items-center justify-between border-b border-ink/10 px-1 py-5 text-[28px] font-[350] tracking-[-0.012em] text-ink"
              style={{ fontVariationSettings: "'opsz' 144, 'wght' 350, 'SOFT' 30" }}
            >
              <span>
                <em className={`font-display-italic ${item.color}`}>{t(item.key)}</em>
              </span>
              <span className="font-caption text-xl text-stone">→</span>
            </a>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-4 pt-8 text-[13px] uppercase tracking-[0.2em] text-graphite">
        <button onClick={onOpenRegionSelector} className="flex min-h-touch items-center gap-3 text-ink">
          <span aria-hidden>🌍</span>
          <span>{tc('region')} · <em className="not-italic text-verde">{region.toUpperCase()} · {locale.toUpperCase()}</em></span>
        </button>
        <a
          href={region === 'uk'
            ? 'https://natura-esencials.myshopify.com/account'
            : 'https://tienda.naturaesencials.com/account'}
          target="_blank"
          rel="noopener"
          className="flex min-h-touch items-center"
        >
          {tc('account')}
        </a>
        <a className="flex min-h-touch items-center">Contacto · WhatsApp</a>
      </div>
    </div>
  );
}
