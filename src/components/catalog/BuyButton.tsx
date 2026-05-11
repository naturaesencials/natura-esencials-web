'use client';

/**
 * BuyButton — selector de formato + CTA de compra conectado a Shopify.
 *
 * Flujo:
 *  1. Renderiza inmediatamente con el fallback (enlace directo al producto en Shopify).
 *  2. En mount, llama a /api/shopify/variants para obtener los variant IDs.
 *  3. Si hay múltiples formatos, muestra chips de selección.
 *  4. Al clicar "Comprar", redirige al cart permalink de Shopify:
 *     https://{domain}/cart/{numericVariantId}:1
 *
 * Si Shopify no está configurado o la llamada falla, el botón sigue
 * funcionando como enlace al producto en Shopify (sin selector de formato).
 */

import { useState, useEffect, useCallback } from 'react';
import type { Region, Locale } from '@/lib/i18n/config';

// ─── Labels i18n ─────────────────────────────────────────────────────────────

const LABELS: Record<string, {
  buy: string; selecting: string; outOfStock: string; format: string;
}> = {
  es: { buy: 'Comprar',         selecting: 'Cargando…',  outOfStock: 'Sin stock',  format: 'Formato' },
  en: { buy: 'Buy now',         selecting: 'Loading…',   outOfStock: 'Out of stock', format: 'Format' },
  fr: { buy: 'Acheter',         selecting: 'Chargement…',outOfStock: 'Épuisé',     format: 'Format' },
  de: { buy: 'Kaufen',          selecting: 'Lädt…',      outOfStock: 'Ausverkauft',format: 'Format' },
  it: { buy: 'Acquista',        selecting: 'Carico…',    outOfStock: 'Esaurito',   format: 'Formato' },
  nl: { buy: 'Kopen',           selecting: 'Laden…',     outOfStock: 'Uitverkocht',format: 'Formaat' },
  pt: { buy: 'Comprar',         selecting: 'Carregando…',outOfStock: 'Esgotado',   format: 'Formato' },
};

function t(locale: Locale, key: keyof typeof LABELS[string]) {
  return (LABELS[locale] || LABELS.es)[key];
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface ShopifyVariant {
  id: string;       // gid://shopify/ProductVariant/XXXXX
  title: string;    // "300 ml" | "1 L" | "Default Title"
  price: string;
  currency: string;
  available: boolean;
}

interface VariantsResponse {
  variants: ShopifyVariant[];
  available: boolean;
  checkoutDomain: string;
}

// ─── Helper: extraer numeric ID del GID de Shopify ───────────────────────────
function numericId(gid: string): string {
  return gid.split('/').pop() || gid;
}

function buildCartUrl(domain: string, variantId: string): string {
  return `https://${domain}/cart/${numericId(variantId)}:1`;
}

function buildProductUrl(domain: string, handle: string): string {
  return `https://${domain}/products/${handle}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface BuyButtonProps {
  /** shopifyHandle del producto o bundle */
  handle: string;
  /** Formatos locales del producto (ej. ['300 ml', '1 L']) — para mostrar los chips */
  formats?: string[];
  region: Region;
  locale: Locale;
  /** Variante visual del botón */
  variant?: 'primary' | 'secondary';
}

export function BuyButton({
  handle,
  formats = [],
  region,
  locale,
  variant = 'primary',
}: BuyButtonProps) {
  const [data, setData]                   = useState<VariantsResponse | null>(null);
  const [loading, setLoading]             = useState(true);
  const [selectedFormat, setSelectedFormat] = useState<string>(formats[0] || '');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(
          `/api/shopify/variants?handle=${handle}&region=${region}&locale=${locale}`,
        );
        if (!res.ok) throw new Error('fetch failed');
        const json: VariantsResponse = await res.json();
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setData({ variants: [], available: false, checkoutDomain: '' });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [handle, region, locale]);

  // ── Calcular el variant seleccionado ────────────────────────────────────────
  const variants = data?.variants ?? [];
  const domain   = data?.checkoutDomain ?? '';

  // Busca el variant cuyo title coincide con el formato seleccionado
  // Si no hay match (o solo hay 1 variant "Default Title"), usa el primero disponible
  const matchedVariant =
    variants.find(
      (v) =>
        v.available &&
        (v.title.toLowerCase() === selectedFormat.toLowerCase() ||
          v.title === 'Default Title'),
    ) ??
    variants.find((v) => v.available) ??
    variants[0];

  const canBuy    = !!matchedVariant?.available && !!domain;
  const href      = canBuy
    ? buildCartUrl(domain, matchedVariant.id)
    : domain
      ? buildProductUrl(domain, handle)
      : '#';

  // ── Múltiples formatos disponibles ───────────────────────────────────────────
  const hasFormatSelector = !loading && variants.length > 1 && formats.length > 1;

  // ── Estilos ───────────────────────────────────────────────────────────────────
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

  // ── Chip selector de formato ──────────────────────────────────────────────────
  const chipBase =
    'px-4 py-2 text-[11px] uppercase tracking-[0.18em] border transition-colors cursor-pointer ' +
    'focus:outline-none focus:ring-2 focus:ring-verde';
  const chipActive   = 'bg-ink text-bg border-ink';
  const chipInactive = 'bg-bg text-ink border-ink/30 hover:border-ink';

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-4">
      {/* Selector de formato */}
      {hasFormatSelector && (
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-graphite">
            {t(locale, 'format')}
          </p>
          <div className="flex flex-wrap gap-2">
            {formats.map((fmt) => {
              const fmtVariant = variants.find(
                (v) => v.title.toLowerCase() === fmt.toLowerCase(),
              );
              const unavailable = fmtVariant ? !fmtVariant.available : false;
              return (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setSelectedFormat(fmt)}
                  disabled={unavailable}
                  className={`${chipBase} ${
                    selectedFormat === fmt ? chipActive : chipInactive
                  } ${unavailable ? 'opacity-40 cursor-not-allowed line-through' : ''}`}
                >
                  {fmt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA principal */}
      {loading ? (
        // Skeleton con el mismo tamaño que el botón real
        <div className="h-[52px] w-full sm:w-48 animate-pulse bg-ink/10 rounded-sm" />
      ) : !data?.available && variants.length > 0 ? (
        <button disabled className={btnCls}>
          {t(locale, 'outOfStock')}
        </button>
      ) : (
        <a
          href={href === '#' ? undefined : href}
          target="_blank"
          rel="noopener noreferrer"
          className={btnCls + (href === '#' ? ' pointer-events-none opacity-40' : '')}
          aria-label={t(locale, 'buy')}
        >
          {t(locale, 'buy')}
          <span aria-hidden="true">→</span>
        </a>
      )}
    </div>
  );
}
