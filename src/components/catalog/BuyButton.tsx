'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import type { Region, Locale } from '@/lib/i18n/config';

// ─── Labels i18n ─────────────────────────────────────────────────────────────

const LABELS: Record<string, {
  add: string; adding: string; added: string; outOfStock: string; format: string;
}> = {
  es: { add: 'Añadir a la cesta', adding: 'Añadiendo…',     added: '✓ Añadido',      outOfStock: 'Sin stock',    format: 'Formato' },
  en: { add: 'Add to bag',        adding: 'Adding…',         added: '✓ Added',         outOfStock: 'Out of stock', format: 'Format'  },
  fr: { add: 'Ajouter au panier', adding: 'Ajout…',          added: '✓ Ajouté',        outOfStock: 'Épuisé',       format: 'Format'  },
  de: { add: 'In den Warenkorb',  adding: 'Hinzufügen…',     added: '✓ Hinzugefügt',   outOfStock: 'Ausverkauft',  format: 'Format'  },
  it: { add: 'Aggiungi al cesto', adding: 'Aggiunta…',       added: '✓ Aggiunto',      outOfStock: 'Esaurito',     format: 'Formato' },
  nl: { add: 'In winkelwagen',    adding: 'Toevoegen…',      added: '✓ Toegevoegd',    outOfStock: 'Uitverkocht',  format: 'Formaat' },
  pt: { add: 'Adicionar ao cesto',adding: 'A adicionar…',    added: '✓ Adicionado',    outOfStock: 'Esgotado',     format: 'Formato' },
};

function tl(locale: Locale, key: keyof typeof LABELS[string]) {
  return (LABELS[locale] ?? LABELS.es)[key];
}

function formatPrice(amount: string, currency: string): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface ShopifyVariant {
  id: string;
  title: string;
  price: string;
  currency: string;
  available: boolean;
}

interface VariantsResponse {
  variants: ShopifyVariant[];
  available: boolean;
  checkoutDomain: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface BuyButtonProps {
  handle:    string;
  formats?:  string[];
  region:    Region;
  locale:    Locale;
  variant?:  'primary' | 'secondary';
  /** Mostrar bloque de precio + selector de formato (default true) */
  showPricing?: boolean;
}

export function BuyButton({
  handle,
  formats = [],
  region,
  locale,
  variant = 'primary',
  showPricing = true,
}: BuyButtonProps) {
  const { addToCart, isLoading: cartLoading } = useCart();

  const [data,            setData]            = useState<VariantsResponse | null>(null);
  const [loadingVariants, setLoadingVariants] = useState(true);
  const [selectedFormat,  setSelectedFormat]  = useState<string>(formats[0] ?? '');
  const [justAdded,       setJustAdded]       = useState(false);
  const [adding,          setAdding]          = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoadingVariants(true);
    fetch(`/api/shopify/variants?handle=${handle}&region=${region}&locale=${locale}`)
      .then((r) => r.ok ? r.json() : null)
      .then((json) => { if (!cancelled && json) setData(json); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoadingVariants(false); });
    return () => { cancelled = true; };
  }, [handle, region, locale]);

  const variants = data?.variants ?? [];

  // Variant que coincide con el formato seleccionado
  const matchedVariant =
    variants.find((v) =>
      v.available &&
      (v.title.toLowerCase() === selectedFormat.toLowerCase() ||
       v.title === 'Default Title'),
    ) ??
    variants.find((v) => v.available) ??
    variants[0];

  const canAdd = !!matchedVariant?.available;
  const hasSingleVariant = variants.length === 1 && variants[0]?.title === 'Default Title';
  const hasFormatSelector = !loadingVariants && variants.length > 1 && formats.length > 1;

  const handleAdd = async () => {
    if (!canAdd || adding || !matchedVariant) return;
    setAdding(true);
    await addToCart(matchedVariant.id, 1);
    setAdding(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  // ── Styles ─────────────────────────────────────────────────────────────────
  const primaryCls =
    'inline-flex items-center justify-center gap-2 px-8 py-4 ' +
    'bg-ink text-bg text-[11px] uppercase tracking-[0.28em] font-body-medium ' +
    'transition-colors hover:bg-verde focus:outline-none focus:ring-2 focus:ring-verde ' +
    'disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-auto';

  const secondaryCls =
    'inline-flex items-center justify-center gap-2 px-6 py-3 ' +
    'border border-ink text-ink text-[11px] uppercase tracking-[0.22em] font-body-medium ' +
    'transition-colors hover:bg-ink hover:text-bg focus:outline-none focus:ring-2 focus:ring-ink ' +
    'disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-auto';

  const btnCls = variant === 'primary' ? primaryCls : secondaryCls;

  // ── Precio del variant seleccionado ────────────────────────────────────────
  const priceDisplay = matchedVariant?.price
    ? formatPrice(matchedVariant.price, matchedVariant.currency)
    : null;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-4">

      {/* ── Selector de formato con precios ── */}
      {showPricing && (
        <div>
          {loadingVariants ? (
            /* Skeleton precio */
            <div className="flex items-baseline gap-4">
              <div className="h-9 w-24 animate-pulse rounded-sm bg-ink/10" />
              <div className="h-4 w-32 animate-pulse rounded-sm bg-ink/8" />
            </div>
          ) : hasFormatSelector ? (
            /* Chips con precio por formato */
            <div className="flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.22em] text-graphite">
                {tl(locale, 'format')}
              </p>
              <div className="flex flex-wrap gap-2">
                {formats.map((fmt) => {
                  const fv = variants.find(
                    (v) => v.title.toLowerCase() === fmt.toLowerCase()
                  );
                  const isSelected  = selectedFormat === fmt;
                  const unavailable = fv ? !fv.available : false;
                  const fmtPrice    = fv ? formatPrice(fv.price, fv.currency) : null;

                  return (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => !unavailable && setSelectedFormat(fmt)}
                      disabled={unavailable}
                      className={[
                        'flex flex-col items-start px-4 py-2.5 border text-left',
                        'transition-colors focus:outline-none focus:ring-2 focus:ring-verde',
                        isSelected
                          ? 'bg-ink text-bg border-ink'
                          : 'bg-bg text-ink border-ink/30 hover:border-ink',
                        unavailable ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                      ].join(' ')}
                    >
                      <span className="text-[11px] uppercase tracking-[0.18em]">{fmt}</span>
                      {fmtPrice && (
                        <span className={`mt-0.5 font-caption text-sm ${isSelected ? 'text-bg/80' : 'text-graphite'}`}>
                          {fmtPrice}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Precio único (sin selector de formato o 1 sola variante) */
            priceDisplay && (
              <div className="flex items-baseline gap-3">
                <span className="font-caption text-3xl text-ink">{priceDisplay}</span>
                {!hasSingleVariant && matchedVariant && matchedVariant.title !== 'Default Title' && (
                  <span className="text-[11px] uppercase tracking-[0.18em] text-graphite">
                    {matchedVariant.title}
                  </span>
                )}
              </div>
            )
          )}
        </div>
      )}

      {/* ── Botón añadir ── */}
      {loadingVariants ? (
        <div className="h-[52px] w-full sm:w-56 animate-pulse bg-ink/10 rounded-sm" />
      ) : !canAdd && variants.length > 0 ? (
        <button disabled className={btnCls}>{tl(locale, 'outOfStock')}</button>
      ) : (
        <button
          onClick={handleAdd}
          disabled={adding || cartLoading || justAdded}
          className={btnCls}
        >
          {adding
            ? tl(locale, 'adding')
            : justAdded
            ? tl(locale, 'added')
            : tl(locale, 'add')}
        </button>
      )}
    </div>
  );
}
