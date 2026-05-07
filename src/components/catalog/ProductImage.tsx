'use client';

/**
 * ProductImage — wrapper de imagen de producto con fallback en cadena.
 *
 * Cadena de fallback (client-side con onError):
 *   1. src (ruta regional  /images/products/{region}/{id}.jpg)
 *   2. fallbackSrc         /images/products/{id}.jpg
 *   3. Placeholder "N" (siempre visible como fondo; img se oculta si falla)
 *
 * El placeholder "N" está como capa de fondo absolute, de modo que
 * si ninguna imagen carga, se ve sin layout shift.
 */

import { useState } from 'react';

interface ProductImageProps {
  /** Ruta principal (regional). Usar resolveProductImage() del helper images.ts. */
  src: string;
  /** Ruta de fallback compartida. Usar resolveProductImage().fallbackSrc. */
  fallbackSrc?: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, fallbackSrc, alt, className }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);

  const handleError = () => {
    if (!triedFallback && fallbackSrc && fallbackSrc !== imgSrc) {
      // Primer fallo → intentar fallback compartido
      setTriedFallback(true);
      setImgSrc(fallbackSrc);
    } else {
      // Segundo fallo (o no hay fallback) → ocultar img, se ve el placeholder
      const el = document.querySelector(`img[data-product-img="${alt}"]`) as HTMLImageElement | null;
      if (el) el.style.display = 'none';
    }
  };

  return (
    <>
      {/* Placeholder siempre visible como fondo */}
      <div
        className="absolute inset-0 flex items-center justify-center text-stone"
        aria-hidden="true"
      >
        <span className="text-7xl font-display italic opacity-30">N</span>
      </div>

      <img
        src={imgSrc}
        alt={alt}
        loading="eager"
        data-product-img={alt}
        className={`relative z-10 w-full h-full object-cover ${className ?? ''}`}
        onError={handleError}
      />
    </>
  );
}
