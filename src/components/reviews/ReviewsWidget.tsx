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
  /** Current locale */
  locale?: string;
}

const REVIEWS_LABEL: Record<string, string> = {
  es: 'Opiniones',
  en: 'Reviews',
  fr: 'Avis',
  de: 'Bewertungen',
  it: 'Recensioni',
  nl: 'Beoordelingen',
  pt: 'Opiniões',
};

declare global {
  interface Window {
    jdgm?: {
      customInit?: () => void;
      init?: () => void;
    };
  }
}

export function ReviewsWidget({ handle, title, locale = 'es' }: Props) {
  const shopDomain = process.env.NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN ?? 'www.naturaesencials.com';
  const containerRef = useRef<HTMLDivElement>(null);
  const reviewsTitle = REVIEWS_LABEL[locale] ?? REVIEWS_LABEL.es;

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
      aria-label={title ? `${reviewsTitle} ${title}` : reviewsTitle}
    >
      <h2 className="mb-6 font-display text-[clamp(22px,3vw,32px)] tracking-[-0.015em]">
        {reviewsTitle}
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
