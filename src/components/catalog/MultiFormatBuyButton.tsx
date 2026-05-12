'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import type { Region, Locale } from '@/lib/i18n/config';

/**
 * MultiFormatBuyButton
 *
 * Para rituales con múltiples formatos en PRODUCTOS SHOPIFY SEPARADOS.
 * Ej: Ritual Para Él 300ml (handle A) + Ritual Para Él 1L (handle B).
 *
 * handles: { '300 ml': 'shopify-handle-300', '1 L': 'shopify-handle-1l' }
 */

const LABELS: Record<string, { add: string; adding: string; added: string; format: string; outOfStock: string }> = {
  es: { add: 'Añadir a la cesta', adding: 'Añadiendo…', added: '✓ Añadido', format: 'Formato', outOfStock: 'Sin stock' },
  en: { add: 'Add to bag', adding: 'Adding…', added: '✓ Added', format: 'Format', outOfStock: 'Out of stock' },
  fr: { add: 'Ajouter au panier', adding: 'Ajout…', added: '✓ Ajouté', format: 'Format', outOfStock: 'Épuisé' },
  de: { add: 'In den Warenkorb', adding: 'Hinzufügen…', added: '✓ Hinzugefügt', format: 'Format', outOfStock: 'Ausverkauft' },
  it: { add: 'Aggiungi al cesto', adding: 'Aggiunta…', added: '✓ Aggiunto', format: 'Formato', outOfStock: 'Esaurito' },
  nl: { add: 'In winkelwagen', adding: 'Toevoegen…', added: '✓ Toegevoegd', format: 'Formaat', outOfStock: 'Uitverkocht' },
  pt: { add: 'Adicionar ao cesto', adding: 'A adicionar…', added: '✓ Adicionado', format: 'Formato', outOfStock: 'Esgotado' },
};

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency, minimumFractionDigits: 2 }).format(parseFloat(amount));
}

interface Variant { id: string; title: string; price: string; currency: string; available: boolean; }

interface Props {
  /** { '300 ml': 'shopify-handle-300', '1 L': 'shopify-handle-1l' } */
  handles: Record<string, string>;
  region: Region;
  locale: Locale;
}

export function MultiFormatBuyButton({ handles, region, locale }: Props) {
  const { addToCart, isLoading: cartLoading } = useCart();
  const lb = LABELS[locale] ?? LABELS.es;

  const formats = Object.keys(handles).filter(f => handles[f]);
  const [selectedFormat, setSelectedFormat] = useState(formats[0] ?? '');
  const [variantsByFormat, setVariantsByFormat] = useState<Record<string, Variant[]>>({});
  const [loading, setLoading] = useState(true);
  const [adding, setAdding]   = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Cargar variantes de todos los handles en paralelo
  useEffect(() => {
    setLoading(true);
    Promise.all(
      formats.map(async (fmt) => {
        const handle = handles[fmt];
        if (!handle) return [fmt, []] as [string, Variant[]];
        const res = await fetch(`/api/shopify/variants?handle=${handle}&region=${region}&locale=${locale}`);
        const data = res.ok ? await res.json() : { variants: [] };
        return [fmt, data.variants ?? []] as [string, Variant[]];
      })
    ).then(results => {
      setVariantsByFormat(Object.fromEntries(results));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [region, locale]);

  const currentVariants = variantsByFormat[selectedFormat] ?? [];
  const selectedVariant  = currentVariants.find(v => v.available) ?? currentVariants[0];
  const canAdd           = !!selectedVariant?.available;

  const handleAdd = async () => {
    if (!canAdd || adding || !selectedVariant) return;
    setAdding(true);
    await addToCart(selectedVariant.id, 1);
    setAdding(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  if (formats.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Selector de formato con precio */}
      {loading ? (
        <div className="flex gap-2">
          {formats.map(f => (
            <div key={f} className="h-14 w-24 animate-pulse rounded-sm bg-ink/10" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-[10px] uppercase tracking-[0.22em] text-graphite">{lb.format}</p>
          <div className="flex flex-wrap gap-2">
            {formats.map(fmt => {
              const fmtVariants = variantsByFormat[fmt] ?? [];
              const fmtVariant  = fmtVariants.find(v => v.available) ?? fmtVariants[0];
              const isSelected  = selectedFormat === fmt;
              const unavailable = !fmtVariant?.available;

              return (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => !unavailable && setSelectedFormat(fmt)}
                  disabled={unavailable}
                  className={[
                    'flex flex-col items-start px-4 py-2.5 border text-left min-w-[88px]',
                    'transition-colors focus:outline-none focus:ring-2 focus:ring-verde',
                    isSelected ? 'bg-ink text-bg border-ink' : 'bg-bg text-ink border-ink/30 hover:border-ink',
                    unavailable ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                  ].join(' ')}
                >
                  <span className="text-[11px] uppercase tracking-[0.14em]">{fmt}</span>
                  {fmtVariant?.price && (
                    <span className={`mt-1 text-sm font-bold ${isSelected ? 'text-white' : 'text-ink'}`}>
                      {formatPrice(fmtVariant.price, fmtVariant.currency)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Botón */}
      {loading ? (
        <div className="h-[52px] w-full sm:w-56 animate-pulse bg-ink/10 rounded-sm" />
      ) : !canAdd && currentVariants.length > 0 ? (
        <button disabled className="inline-flex items-center justify-center px-8 py-4 bg-ink/40 text-bg text-[11px] uppercase tracking-[0.28em] w-full sm:w-auto">
          {lb.outOfStock}
        </button>
      ) : (
        <button
          onClick={handleAdd}
          disabled={adding || cartLoading || justAdded}
          className="inline-flex items-center justify-center px-8 py-4 bg-ink text-bg text-[11px] uppercase tracking-[0.28em] transition-colors hover:bg-verde disabled:opacity-40 w-full sm:w-auto"
        >
          {adding ? lb.adding : justAdded ? lb.added : lb.add}
        </button>
      )}
    </div>
  );
}
