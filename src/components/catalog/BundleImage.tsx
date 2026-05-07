'use client';

/**
 * BundleImage — imagen de ritual/bundle con fallback en cadena.
 *
 * Igual que ProductImage pero para bundles:
 *   1. src          /images/bundles/{region}/{id}.jpg
 *   2. fallbackSrc  /images/bundles/{id}.jpg
 *   3. Placeholder (gestionado por el componente padre)
 */

import { useState } from 'react';

interface BundleImageProps {
  /** Ruta principal (regional). Usar resolveBundleImage() del helper images.ts. */
  src: string;
  /** Ruta de fallback compartida. */
  fallbackSrc?: string;
  alt: string;
  className?: string;
}

export function BundleImage({ src, fallbackSrc, alt, className }: BundleImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!triedFallback && fallbackSrc && fallbackSrc !== imgSrc) {
      setTriedFallback(true);
      setImgSrc(fallbackSrc);
    } else {
      (e.currentTarget as HTMLImageElement).style.display = 'none';
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`relative z-10 w-full h-full object-cover ${className ?? ''}`}
      onError={handleError}
    />
  );
}
