'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import type { Cart, CartLine } from '@/lib/shopify/cart';
import type { Region, Locale } from '@/lib/i18n/config';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartContextValue {
  cart:         Cart | null;
  isOpen:       boolean;
  isLoading:    boolean;
  totalItems:   number;
  openCart:     () => void;
  closeCart:    () => void;
  addToCart:    (merchandiseId: string, quantity?: number) => Promise<void>;
  removeLine:   (lineId: string) => Promise<void>;
  updateLine:   (lineId: string, quantity: number) => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface CartProviderProps {
  children:  ReactNode;
  region:    Region;
  locale:    Locale;
}

export function CartProvider({ children, region, locale }: CartProviderProps) {
  const [cart,      setCart]      = useState<Cart | null>(null);
  const [isOpen,    setIsOpen]    = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Clave de localStorage separada por región
  const storageKey = `natura-cart-id-${region}`;
  const cartIdRef  = useRef<string | null>(null);

  // Leer cartId guardado al montar
  useEffect(() => {
    try {
      cartIdRef.current = localStorage.getItem(storageKey);
    } catch { /* SSR / private browsing */ }
  }, [storageKey]);

  // ── Helper: llamar a la API route ──────────────────────────────────────────
  const callAPI = useCallback(async (body: Record<string, unknown>): Promise<Cart | null> => {
    const res = await fetch('/api/shopify/cart', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ ...body, region, locale }),
    });
    if (!res.ok) return null;
    const { cart } = await res.json();
    return cart ?? null;
  }, [region, locale]);

  // ── Guardar cartId en localStorage ────────────────────────────────────────
  const persistCartId = useCallback((id: string) => {
    cartIdRef.current = id;
    try { localStorage.setItem(storageKey, id); } catch { /* ignore */ }
  }, [storageKey]);

  // ── clearCart — limpia el carrito local y en localStorage ─────────────────
  const clearCart = useCallback(() => {
    cartIdRef.current = null;
    try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
    setCart(null);
    setIsOpen(false);
  }, [storageKey]);

  // ── Verificar estado del carrito al montar y al volver a la pestaña ────────
  // Cuando el usuario completa el pago en Shopify (pestaña nueva) y vuelve,
  // detectamos el checkout completado via completedAt y limpiamos el carrito.
  useEffect(() => {
    const checkCart = async () => {
      const savedId = cartIdRef.current;
      if (!savedId) return;
      try {
        const res = await fetch('/api/shopify/cart', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ action: 'fetch', cartId: savedId, region, locale }),
        });
        if (!res.ok) return;
        const { cart: fetchedCart } = await res.json();
        if (!fetchedCart || fetchedCart.completedAt) {
          // Carrito completado (pago realizado) o expirado → limpiar
          clearCart();
        } else {
          // Carrito aún válido → actualizar estado
          setCart(fetchedCart);
        }
      } catch { /* red error, no action */ }
    };

    // Comprobar al montar
    checkCart();

    // Comprobar cuando el usuario vuelve a la pestaña (viene de checkout)
    const onVisible = () => {
      if (document.visibilityState === 'visible') checkCart();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [region, locale, clearCart]); // eslint-disable-line react-hooks/exhaustive-deps


  const addToCart = useCallback(async (merchandiseId: string, quantity = 1) => {
    setIsLoading(true);
    try {
      let updatedCart: Cart | null = null;
      const existingCartId = cartIdRef.current;

      if (existingCartId) {
        // Intentar añadir al carrito existente
        const addedCart = await callAPI({
          action:  'add',
          cartId:  existingCartId,
          lines:   [{ merchandiseId, quantity }],
        });
        // Solo usar el resultado si el carrito tiene items.
        // Shopify puede devolver un carrito vacío cuando el cart ID expiró
        // o el variant no existe en la tienda — en ese caso caemos a create.
        if (addedCart && (addedCart.totalQuantity ?? 0) > 0) {
          updatedCart = addedCart;
        } else {
          // Cart obsoleto o inválido — limpiar para no reutilizarlo
          try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
          cartIdRef.current = null;
        }
      }

      // Si no hay carrito válido con items, crear uno nuevo
      if (!updatedCart) {
        updatedCart = await callAPI({
          action: 'create',
          lines:  [{ merchandiseId, quantity }],
        });
      }

      if (updatedCart && (updatedCart.totalQuantity ?? 0) > 0) {
        persistCartId(updatedCart.id);
        setCart(updatedCart);
        setIsOpen(true); // abrir drawer solo si hay items
      }
    } finally {
      setIsLoading(false);
    }
  }, [callAPI, persistCartId, storageKey]);

  // ── removeLine ─────────────────────────────────────────────────────────────
  const removeLine = useCallback(async (lineId: string) => {
    if (!cartIdRef.current) return;
    setIsLoading(true);
    try {
      const updatedCart = await callAPI({
        action:  'remove',
        cartId:  cartIdRef.current,
        lineIds: [lineId],
      });
      if (updatedCart) setCart(updatedCart);
    } finally {
      setIsLoading(false);
    }
  }, [callAPI]);

  // ── updateLine ─────────────────────────────────────────────────────────────
  const updateLine = useCallback(async (lineId: string, quantity: number) => {
    if (!cartIdRef.current) return;
    if (quantity <= 0) { await removeLine(lineId); return; }
    setIsLoading(true);
    try {
      const updatedCart = await callAPI({
        action: 'update',
        cartId: cartIdRef.current,
        lines:  [{ id: lineId, quantity }],
      });
      if (updatedCart) setCart(updatedCart);
    } finally {
      setIsLoading(false);
    }
  }, [callAPI, removeLine]);

  const openCart  = useCallback(() => setIsOpen(true),  []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = cart?.totalQuantity ?? 0;

  return (
    <CartContext.Provider value={{
      cart, isOpen, isLoading, totalItems,
      openCart, closeCart,
      addToCart, removeLine, updateLine,
    }}>
      {children}
    </CartContext.Provider>
  );
}
