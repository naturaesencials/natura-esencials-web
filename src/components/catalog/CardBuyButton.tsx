'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { Region, Locale } from '@/lib/i18n/config';

// ── i18n ──────────────────────────────────────────────────────────────────────

const LABELS: Record<string, { buy: string; adding: string; added: string; outOfStock: string }> = {
  es: { buy: 'Añadir a la cesta', adding: 'Añadiendo…',  added: '✓ Añadido',     outOfStock: 'Sin stock'    },
  en: { buy: 'Add to bag',        adding: 'Adding…',      added: '✓ Added',        outOfStock: 'Out of stock' },
  fr: { buy: 'Ajouter au panier', adding: 'Ajout…',       added: '✓ Ajouté',       outOfStock: 'Épuisé'       },
  de: { buy: 'In den Warenkorb',  adding: 'Hinzufügen…',  added: '✓ Hinzugefügt',  outOfStock: 'Ausverkauft'  },
  it: { buy: 'Aggiungi al cesto', adding: 'Aggiunta…',    added: '✓ Aggiunto',     outOfStock: 'Esaurito'     },
  nl: { buy: 'In winkelwagen',    adding: 'Toevoegen…',   added: '✓ Toegevoegd',   outOfStock: 'Uitverkocht'  },
  pt: { buy: 'Adicionar ao cesto',adding: 'A adicionar…', added: '✓ Adicionado',   outOfStock: 'Esgotado'     },
};

// ── Selección de formato ──────────────────────────────────────────────────────

// Patrón de título de variante Shopify para cada formato objetivo
const FORMAT_PATTERNS = {
  '300ml': /300\s*ml/i,
  '1l':    /\b1\s*(l|ltr|litr[eo]?|litro?s?)\b/i,
} as const;

export type TargetFormat = keyof typeof FORMAT_PATTERNS | 'default';

interface ShopifyVariant {
  id: string; title: string; price: string; currency: string;
  available: boolean; quantityAvailable: number | null;
}

function isPurchasable(v: ShopifyVariant) {
  if (!v.available) return false;
  return v.quantityAvailable === null || v.quantityAvailable > 0;
}

function pickVariant(variants: ShopifyVariant[], format: TargetFormat): ShopifyVariant | undefined {
  if (format === 'default') return variants.find(isPurchasable);
  const pattern = FORMAT_PATTERNS[format];
  // 1. formato correcto + disponible
  const match = variants.find(v => pattern.test(v.title) && isPurchasable(v));
  if (match) return match;
  // 2. fallback: primer disponible
  return variants.find(isPurchasable);
}

// ── Componente ────────────────────────────────────────────────────────────────

interface CardBuyButtonProps {
  handle:       string;
  region:       Region;
  locale:       Locale;
  targetFormat: TargetFormat;
}

export function CardBuyButton({ handle, region, locale, targetFormat }: CardBuyButtonProps) {
  const { addToCart } = useCart();
  const lb = LABELS[locale] ?? LABELS.es;
  const [state, setState] = useState<'idle' | 'loading' | 'added' | 'oos'>('idle');

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();   // no seguir el Link overlay de la tarjeta
    e.stopPropagation();
    if (state !== 'idle') return;
    setState('loading');
    try {
      const res = await fetch(
        `/api/shopify/variants?handle=${encodeURIComponent(handle)}&region=${region}&locale=${locale}`
      );
      if (!res.ok) throw new Error('variants fetch failed');
      const data: { variants: ShopifyVariant[] } = await res.json();
      const variant = pickVariant(data.variants ?? [], targetFormat);
      if (!variant) { setState('oos'); setTimeout(() => setState('idle'), 2500); return; }
      await addToCart(variant.id, 1);
      setState('added');
      setTimeout(() => setState('idle'), 2000);
    } catch {
      setState('idle');
    }
  };

  const label =
    state === 'loading' ? lb.adding :
    state === 'added'   ? lb.added  :
    state === 'oos'     ? lb.outOfStock :
    lb.buy;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={state === 'loading'}
      className={[
        'relative z-[2] w-full mt-2',
        'py-2 px-3 text-[10px] uppercase tracking-[0.18em] font-medium',
        'border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-verde',
        state === 'added'
          ? 'bg-verde text-paper border-verde'
          : state === 'oos'
          ? 'border-ink/20 text-graphite cursor-default'
          : 'border-ink/30 text-ink hover:bg-ink hover:text-paper hover:border-ink',
        state === 'loading' ? 'opacity-60 cursor-wait' : '',
      ].join(' ')}
    >
      {label}
    </button>
  );
}
