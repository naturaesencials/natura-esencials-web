'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import type { Region, Locale } from '@/lib/i18n/config';

// ─── i18n ─────────────────────────────────────────────────────────────────────

const LABELS: Record<string, {
  add: string; adding: string; added: string; outOfStock: string;
}> = {
  es: { add: 'Añadir a la cesta', adding: 'Añadiendo…',   added: '✓ Añadido',    outOfStock: 'Sin stock'    },
  en: { add: 'Add to bag',        adding: 'Adding…',       added: '✓ Added',       outOfStock: 'Out of stock' },
  fr: { add: 'Ajouter au panier', adding: 'Ajout…',        added: '✓ Ajouté',      outOfStock: 'Épuisé'       },
  de: { add: 'In den Warenkorb',  adding: 'Hinzufügen…',   added: '✓ Hinzugefügt', outOfStock: 'Ausverkauft'  },
  it: { add: 'Aggiungi al cesto', adding: 'Aggiunta…',     added: '✓ Aggiunto',    outOfStock: 'Esaurito'     },
  nl: { add: 'In winkelwagen',    adding: 'Toevoegen…',    added: '✓ Toegevoegd',  outOfStock: 'Uitverkocht'  },
  pt: { add: 'Adicionar ao cesto',adding: 'A adicionar…',  added: '✓ Adicionado',  outOfStock: 'Esgotado'     },
};

function tl(locale: Locale, key: keyof typeof LABELS[string]) {
  return (LABELS[locale] ?? LABELS.es)[key];
}

// Traducciones de variantes: clave = forma canónica normalizada (sin espacios, minúsculas)
// Cubre todas las variaciones que Shopify puede devolver
const VARIANT_MAP: Array<{ patterns: RegExp; labels: Record<string, string> }> = [
  // Botella / Bottle 300 ml
  {
    patterns: /^(botella\s*)?300\s*ml$/i,
    labels: { es: 'Botella 300 ml', en: 'Bottle 300 ml', fr: 'Flacon 300 ml', de: 'Flasche 300 ml', it: 'Flacone 300 ml', nl: 'Fles 300 ml', pt: 'Frasco 300 ml' },
  },
  // Botella / Bottle 1L
  {
    patterns: /^(botella\s*)?1\s*(l|ltr|litr[eo]?|litro?s?)$/i,
    labels: { es: 'Botella 1 L', en: 'Bottle 1 L', fr: 'Flacon 1 L', de: 'Flasche 1 L', it: 'Flacone 1 L', nl: 'Fles 1 L', pt: 'Frasco 1 L' },
  },
  // BIB / Caja 5L
  {
    patterns: /^(caja\s*)?bib\s*5\s*(l|ltr|litr[eo]?|litro?s?)$/i,
    labels: { es: 'Caja BIB 5 L', en: 'Box BIB 5 L', fr: 'Boîte BIB 5 L', de: 'Box BIB 5 L', it: 'Scatola BIB 5 L', nl: 'Doos BIB 5 L', pt: 'Caixa BIB 5 L' },
  },
  // BIB / Caja 15L
  {
    patterns: /^(caja\s*)?bib\s*15\s*(l|ltr|litr[eo]?|litro?s?)$/i,
    labels: { es: 'Caja BIB 15 L', en: 'Box BIB 15 L', fr: 'Boîte BIB 15 L', de: 'Box BIB 15 L', it: 'Scatola BIB 15 L', nl: 'Doos BIB 15 L', pt: 'Caixa BIB 15 L' },
  },
  // Botella / Bottle 500 ml
  {
    patterns: /^(botella\s*)?500\s*ml$/i,
    labels: { es: 'Botella 500 ml', en: 'Bottle 500 ml', fr: 'Flacon 500 ml', de: 'Flasche 500 ml', it: 'Flacone 500 ml', nl: 'Fles 500 ml', pt: 'Frasco 500 ml' },
  },
  // Frasco / Bottle (genérico, solo cifra + ml sin botella)
  {
    patterns: /^(\d+)\s*ml$/i,
    labels: { es: '$1 ml', en: '$1 ml', fr: '$1 ml', de: '$1 ml', it: '$1 ml', nl: '$1 ml', pt: '$1 ml' },
  },
];

function translateVariantTitle(title: string, locale: string): string {
  if (!title || locale === 'es') return title;
  const t = title.trim();
  for (const entry of VARIANT_MAP) {
    if (entry.patterns.test(t)) {
      return entry.labels[locale] ?? t;
    }
  }
  return t;
}

function formatPrice(amount: string, currency: string): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency', currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface ShopifyVariant {
  id: string; title: string; price: string; currency: string; available: boolean;
  quantityAvailable: number | null;
}
interface VariantsResponse {
  variants: ShopifyVariant[]; available: boolean; checkoutDomain: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface BuyButtonProps {
  handle:            string;
  formats?:          string[];
  region:            Region;
  locale:            Locale;
  variant?:          'primary' | 'secondary';
  showPricing?:      boolean;
  /** Formato a preseleccionar al cargar (busca el variant cuyo título coincide) */
  defaultFormat?:    '300ml' | '1l';
  /** Callback cuando el cliente cambia de formato/variante (pasa el título de Shopify) */
  onVariantChange?:  (variantTitle: string) => void;
}

export function BuyButton({
  handle, formats = [], region, locale,
  variant = 'primary', showPricing = true,
  defaultFormat, onVariantChange,
}: BuyButtonProps) {
  const { addToCart, isLoading: cartLoading } = useCart();

  const [data,            setData]            = useState<VariantsResponse | null>(null);
  const [loadingVariants, setLoadingVariants] = useState(true);
  const [selectedIdx,     setSelectedIdx]     = useState(0);   // índice del variant seleccionado
  const [justAdded,       setJustAdded]       = useState(false);
  const [adding,          setAdding]          = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoadingVariants(true);
    fetch(`/api/shopify/variants?handle=${handle}&region=${region}&locale=${locale}`)
      .then((r) => r.ok ? r.json() : null)
      .then((json: VariantsResponse | null) => {
        if (!cancelled && json) {
          setData(json);
          if (!json.variants?.length) return;

          // Buscar el variant que coincide con defaultFormat; si no, usar índice 0
          let targetIdx = 0;
          if (defaultFormat) {
            const pattern = defaultFormat === '300ml' ? /300\s*ml/i : /\b1\s*(l|ltr|litr[eo]?|litro?s?)\b/i;
            const match = json.variants.findIndex(v => pattern.test(v.title));
            if (match !== -1) targetIdx = match;
          }

          setSelectedIdx(targetIdx);
          // Notificar para sincronizar imagen con el variant seleccionado
          onVariantChange?.(json.variants[targetIdx].title);
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoadingVariants(false); });
    return () => { cancelled = true; };
  }, [handle, region, locale]);

  // Un variant es comprable si:
  // 1. availableForSale = true (Shopify lo marca como vendible)
  // 2. quantityAvailable > 0 O es null (null = inventario no rastreado, se permite vender)
  // Esto evita el bug del Cart limit que hace min(solicitado, disponible) = min(1,0) = 0
  function isVariantPurchasable(v: ShopifyVariant): boolean {
    if (!v.available) return false;
    if (v.quantityAvailable === null) return true;   // sin seguimiento de inventario → OK
    return v.quantityAvailable > 0;
  }

  // Usamos los variants de Shopify directamente (fuente de verdad)
  const variants        = data?.variants ?? [];
  const availableVars   = variants.filter(isVariantPurchasable);
  const selectedVariant = availableVars[selectedIdx] ?? availableVars[0] ?? variants[selectedIdx] ?? variants[0];

  const canAdd           = !!selectedVariant && isVariantPurchasable(selectedVariant);
  const hasMultiVariants = variants.length > 1;
  const isSingleDefault  = variants.length === 1 && variants[0]?.title === 'Default Title';

  const handleAdd = async () => {
    if (!canAdd || adding || !selectedVariant) return;
    setAdding(true);
    await addToCart(selectedVariant.id, 1);
    setAdding(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  // ── Estilos ────────────────────────────────────────────────────────────────
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

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-4">

      {/* ── Pricing block ── */}
      {showPricing && (
        <>
          {loadingVariants ? (
            /* Skeleton */
            <div className="flex flex-col gap-3">
              <div className="h-9 w-28 animate-pulse rounded-sm bg-ink/10" />
              <div className="flex gap-2">
                {(formats.length > 0 ? formats : ['', '']).map((_, i) => (
                  <div key={i} className="h-14 w-24 animate-pulse rounded-sm bg-ink/8" />
                ))}
              </div>
            </div>
          ) : hasMultiVariants ? (
            /* Chips por variante con precio real de Shopify */
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {variants.map((v, i) => {
                  const isSelected  = selectedIdx === i;
                  const unavailable = !isVariantPurchasable(v);
                  // Traducir labels de variante que vienen de Shopify en español
                  const variantLabel = translateVariantTitle(v.title, locale);
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => {
                        if (!unavailable) {
                          setSelectedIdx(i);
                          onVariantChange?.(v.title);
                        }
                      }}
                      disabled={unavailable}
                      className={[
                        'flex flex-col items-start px-4 py-2.5 border text-left min-w-[88px]',
                        'transition-colors focus:outline-none focus:ring-2 focus:ring-verde',
                        isSelected
                          ? 'bg-ink text-bg border-ink'
                          : 'bg-bg text-ink border-ink/30 hover:border-ink',
                        unavailable ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                      ].join(' ')}
                    >
                      <span className="text-[11px] uppercase tracking-[0.14em] leading-tight">
                        {variantLabel}
                      </span>
                      <span className={`mt-1 text-sm font-bold ${isSelected ? 'text-white' : 'text-ink'}`}>
                        {formatPrice(v.price, v.currency)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Precio único */
            selectedVariant?.price && !isSingleDefault ? (
              <span className="font-caption text-3xl text-ink">
                {formatPrice(selectedVariant.price, selectedVariant.currency)}
              </span>
            ) : selectedVariant?.price ? (
              <span className="font-caption text-3xl text-ink">
                {formatPrice(selectedVariant.price, selectedVariant.currency)}
              </span>
            ) : null
          )}
        </>
      )}

      {/* ── Botón añadir ── */}
      {loadingVariants ? (
        <div className="h-[52px] w-full sm:w-56 animate-pulse bg-ink/10 rounded-sm" />
      ) : !canAdd ? (
        <button disabled className={btnCls}>{tl(locale, 'outOfStock')}</button>
      ) : (
        <button
          onClick={handleAdd}
          disabled={adding || cartLoading || justAdded}
          className={btnCls}
        >
          {adding ? tl(locale, 'adding') : justAdded ? tl(locale, 'added') : tl(locale, 'add')}
        </button>
      )}
    </div>
  );
}
