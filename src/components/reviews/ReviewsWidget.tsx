'use client';

import { useEffect, useRef } from 'react';

/**
 * ReviewsWidget — embeds Judge.me review widget for a Shopify product.
 *
 * Judge.me docs: https://judge.me/help/headless
 * Requires env var: NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN (e.g. www.naturaesencials.com)
 *
 * The widget is loaded via Judge.me's theme.js CDN script and initialised
 * with the product handle. It renders natively inside the div.
 */

interface Props {
  /** Shopify product handle */
  handle: string;
  /** Product title for aria-label */
  title?: string;
}

declare global {
  interface Window {
    jdgm?: {
      customInit?: () => void;
      init?: () => void;
    };
  }
}

export function ReviewsWidget({ handle, title }: Props) {
  const shopDomain = process.env.NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN ?? 'www.naturaesencials.com';
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!handle) return;

    const scriptId = 'judgeme-theme-js';

    const init = () => {
      if (window.jdgm?.customInit) window.jdgm.customInit();
      else if (window.jdgm?.init) window.jdgm.init();
    };

    if (document.getElementById(scriptId)) {
      // Script already loaded — just re-init
      init();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdn.judge.me/assets/theme.js';
    script.async = true;
    script.onload = init;
    document.head.appendChild(script);
  }, [handle]);

  return (
    <section
      className="mt-12 border-t border-rule pt-10"
      aria-label={title ? `Opiniones de ${title}` : 'Opiniones de clientes'}
    >
      <h2 className="mb-6 font-display text-[clamp(22px,3vw,32px)] tracking-[-0.015em]">
        Opiniones
      </h2>
      <div
        ref={containerRef}
        className="jdgm-widget jdgm-review-widget"
        data-id={handle}
        data-handle={handle}
        data-shop-domain={shopDomain}
      />
    </section>
  );
}
