'use client';

import { useState } from 'react';

interface Props { shipping: string; returns: string; }

export function ThinBarClient({ shipping, returns }: Props) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative border-b border-rule bg-paper px-pad-x py-2.5 text-center text-[11px] uppercase tracking-[0.28em] text-verde">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-8">
        <span>{shipping}</span>
        <em className="font-caption not-italic text-ink">·</em>
        <span>{returns}</span>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Close"
        className="absolute right-2 top-1/2 flex size-touch -translate-y-1/2 items-center justify-center text-stone hover:text-ink"
      >
        ✕
      </button>
    </div>
  );
}
