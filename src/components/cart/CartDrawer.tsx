'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import type { Locale } from '@/lib/i18n/config';

// ─── i18n ─────────────────────────────────────────────────────────────────────

const T: Record<string, Record<string, string>> = {
  es: { title: 'Tu cesta', empty: 'Tu cesta está vacía', checkout: 'Finalizar compra', subtotal: 'Subtotal', continue: 'Seguir comprando', items: 'artículo' },
  en: { title: 'Your bag',  empty: 'Your bag is empty',  checkout: 'Checkout',          subtotal: 'Subtotal', continue: 'Continue shopping', items: 'item' },
  fr: { title: 'Votre panier', empty: 'Votre panier est vide', checkout: 'Passer commande', subtotal: 'Sous-total', continue: 'Continuer', items: 'article' },
  de: { title: 'Ihr Warenkorb', empty: 'Ihr Warenkorb ist leer', checkout: 'Zur Kasse', subtotal: 'Zwischensumme', continue: 'Weiter einkaufen', items: 'Artikel' },
  it: { title: 'Il tuo carrello', empty: 'Il carrello è vuoto', checkout: 'Acquista ora', subtotal: 'Subtotale', continue: 'Continua', items: 'articolo' },
  nl: { title: 'Uw winkelwagen', empty: 'Uw winkelwagen is leeg', checkout: 'Afrekenen', subtotal: 'Subtotaal', continue: 'Verder winkelen', items: 'artikel' },
  pt: { title: 'O seu cesto',  empty: 'O cesto está vazio', checkout: 'Finalizar compra', subtotal: 'Subtotal', continue: 'Continuar', items: 'artigo' },
};

function t(locale: Locale, key: string): string {
  return (T[locale] ?? T.es)[key] ?? key;
}

function formatPrice(amount: string, currency: string): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(parseFloat(amount));
}

// ─── Component ────────────────────────────────────────────────────────────────

interface CartDrawerProps { locale: Locale }

export function CartDrawer({ locale }: CartDrawerProps) {
  const { cart, isOpen, isLoading, closeCart, removeLine, updateLine, markCheckoutStarted } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, closeCart]);

  // Bloquear scroll del body cuando está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const lines = cart?.lines.nodes ?? [];
  const subtotal = cart?.cost.subtotalAmount;

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-[950] bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t(locale, 'title')}
        className={`fixed inset-y-0 right-0 z-[960] flex w-full max-w-[420px] flex-col bg-bg shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header del drawer */}
        <div className="flex items-center justify-between border-b border-rule px-6 py-5">
          <h2 className="font-display text-xl tracking-[-0.01em]">
            {t(locale, 'title')}
            {lines.length > 0 && (
              <span className="ml-2 font-caption text-sm text-graphite">
                ({cart?.totalQuantity} {t(locale, 'items')}{(cart?.totalQuantity ?? 0) > 1 ? 's' : ''})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Cerrar"
            className="flex size-10 items-center justify-center text-ink transition-colors hover:text-verde"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-5 w-5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-12 w-12 text-graphite/40">
                <path d="M5 7h14l-1 13H6zM8.5 7a3.5 3.5 0 017 0" />
              </svg>
              <p className="text-sm text-graphite">{t(locale, 'empty')}</p>
              <button
                onClick={closeCart}
                className="mt-2 border-b border-ink pb-0.5 text-[11px] uppercase tracking-[0.22em]"
              >
                {t(locale, 'continue')} →
              </button>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-rule">
              {lines.map((line) => {
                const product = line.merchandise.product;
                const image   = product.images.nodes[0];
                const isVariant = line.merchandise.title !== 'Default Title';

                return (
                  <li key={line.id} className="flex gap-4 py-5">
                    {/* Imagen */}
                    <div className="relative h-[88px] w-[70px] flex-shrink-0 overflow-hidden bg-paper">
                      {image ? (
                        <Image
                          src={image.url}
                          alt={image.altText ?? product.title}
                          fill
                          sizes="70px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-paper" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-[13px] font-medium leading-snug text-ink">{product.title}</p>
                        {isVariant && (
                          <p className="mt-0.5 text-[11px] text-graphite">{line.merchandise.title}</p>
                        )}
                        <p className="mt-1 font-caption text-sm">
                          {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                        </p>
                      </div>

                      {/* Cantidad + eliminar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-0">
                          <button
                            onClick={() => updateLine(line.id, line.quantity - 1)}
                            disabled={isLoading}
                            aria-label="Reducir cantidad"
                            className="flex h-7 w-7 items-center justify-center border border-rule text-ink transition-colors hover:border-ink disabled:opacity-40"
                          >
                            −
                          </button>
                          <span className="flex h-7 w-8 items-center justify-center border-y border-rule text-[13px]">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => updateLine(line.id, line.quantity + 1)}
                            disabled={isLoading}
                            aria-label="Aumentar cantidad"
                            className="flex h-7 w-7 items-center justify-center border border-rule text-ink transition-colors hover:border-ink disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeLine(line.id)}
                          disabled={isLoading}
                          aria-label="Eliminar producto"
                          className="text-[11px] uppercase tracking-[0.16em] text-graphite transition-colors hover:text-red-600 disabled:opacity-40"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer: subtotal + checkout */}
        {lines.length > 0 && subtotal && (
          <div className="border-t border-rule px-6 py-6">
            <div className="mb-4 flex items-baseline justify-between">
              <span className="text-[11px] uppercase tracking-[0.22em] text-graphite">{t(locale, 'subtotal')}</span>
              <span className="font-caption text-lg">
                {formatPrice(subtotal.amount, subtotal.currencyCode)}
              </span>
            </div>
            <a
              href={cart?.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={markCheckoutStarted}
              className={`flex w-full items-center justify-center gap-2 bg-ink px-6 py-4 text-[11px] uppercase tracking-[0.28em] text-bg transition-colors hover:bg-verde ${
                isLoading ? 'pointer-events-none opacity-60' : ''
              }`}
            >
              {isLoading ? '...' : `${t(locale, 'checkout')} →`}
            </a>
            <button
              onClick={closeCart}
              className="mt-3 w-full py-2 text-center text-[11px] uppercase tracking-[0.22em] text-graphite transition-colors hover:text-ink"
            >
              ← {t(locale, 'continue')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
