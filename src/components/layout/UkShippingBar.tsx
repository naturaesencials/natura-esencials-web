'use client';

import { useState } from 'react';

// Visible solo en región UK — muestra info de stock y envío local
export function UkShippingBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative border-b border-rule bg-[#0c1a0c] px-pad-x py-2.5 text-center text-[11px] uppercase tracking-[0.24em] text-verde">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-8">
        <span className="font-bold text-white">🇬🇧 UK stock · Dispatched from London</span>
        <em className="font-caption not-italic text-white/40">·</em>
        <span className="font-bold text-white">Delivery in 1–3 days</span>
        <em className="font-caption not-italic text-white/40">·</em>
        <span className="font-bold text-white">Free shipping from £60</span>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Close"
        className="absolute right-2 top-1/2 flex size-touch -translate-y-1/2 items-center justify-center text-verde/50 hover:text-verde"
      >
        ✕
      </button>
    </div>
  );
}
