'use client';

import Image from 'next/image';
import { createContext, useContext, useState, useCallback } from 'react';

/** Normaliza un título de formato ("300 ml", "1 L", "Botella 1 Ltr") a una clave estable. */
function extractKey(title: string): string {
  const s = title.toLowerCase().replace(/\s+/g, '');
  const ml = s.match(/(\d+)ml/);
  if (ml) return `${ml[1]}ml`;
  const l = s.match(/(\d+(?:[.,]\d+)?)(l|ltr|litro?)\b/i);
  if (l) return `${l[1].replace(',', '.')}l`;
  return s;
}

interface FormatCtx {
  src: string;
  alt: string;
  onError: () => void;
  /** Lo llama el botón de compra al cambiar de formato. */
  onFormat: (title: string) => void;
}

const Ctx = createContext<FormatCtx | null>(null);

/** Hook para que el botón de compra notifique el formato seleccionado. No-op fuera del provider. */
export function useSetRitualFormat(): ((title: string) => void) | null {
  return useContext(Ctx)?.onFormat ?? null;
}

interface ProviderProps {
  initialSrc: string;
  fallbackSrc: string;
  alt: string;
  /** Mapa clave-de-formato -> imagen (claves como "300ml", "1l"). */
  formatImages?: Record<string, string>;
  children: React.ReactNode;
}

export function RitualFormatProvider({ initialSrc, fallbackSrc, alt, formatImages, children }: ProviderProps) {
  const [src, setSrc] = useState(initialSrc);

  const onFormat = useCallback((title: string) => {
    if (!formatImages) return;
    const key = extractKey(title);
    const img =
      formatImages[key] ??
      formatImages[title.trim()] ??
      Object.entries(formatImages).find(([k]) => extractKey(k) === key)?.[1];
    if (img) setSrc(img);
  }, [formatImages]);

  const onError = useCallback(() => setSrc(fallbackSrc), [fallbackSrc]);

  return <Ctx.Provider value={{ src, alt, onError, onFormat }}>{children}</Ctx.Provider>;
}

/** Imagen principal del ritual que reacciona al formato seleccionado. */
export function RitualSyncedImage() {
  const c = useContext(Ctx);
  if (!c) return null;
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-paper">
      <Image
        src={c.src}
        alt={c.alt}
        fill
        priority
        sizes="(min-width: 1024px) 45vw, 95vw"
        className="object-cover transition-opacity duration-300"
        onError={c.onError}
      />
    </div>
  );
}
