'use client';

import { useState } from 'react';
import type { Region } from '@/lib/i18n/config';

interface FormatSelectorProps {
  formats: string[];
  productId: string;
  region: Region;
}

/**
 * Selector de formato del producto.
 * Por ahora es un selector visual; cuando se conecte Shopify Storefront API
 * mostrará el precio actualizado por variante.
 */
export function FormatSelector({ formats, productId, region }: FormatSelectorProps) {
  const [selected, setSelected] = useState(formats[0]);

  if (formats.length <= 1) {
    return (
      <div className="text-sm text-graphite">
        <span className="text-[11px] uppercase tracking-wider block mb-1">Formato</span>
        <span className="text-ink">{formats[0]}</span>
      </div>
    );
  }

  return (
    <div>
      <span className="text-[11px] uppercase tracking-wider text-graphite block mb-2">
        Formato
      </span>
      <div className="flex flex-wrap gap-2">
        {formats.map((fmt) => (
          <button
            key={fmt}
            onClick={() => setSelected(fmt)}
            className={`px-4 py-2 text-sm border rounded-sm transition-colors ${
              selected === fmt
                ? 'border-ink bg-ink text-paper'
                : 'border-ink/15 hover:border-ink/40'
            }`}
            data-format={fmt}
            data-product-id={productId}
            data-region={region}
          >
            {fmt}
          </button>
        ))}
      </div>
    </div>
  );
}
