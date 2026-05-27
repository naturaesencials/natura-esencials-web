'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';

function extractKey(title: string): string {
  const s = title.toLowerCase().replace(/\s+/g, '');
  const ml = s.match(/(\d+)ml/);
  if (ml) return `${ml[1]}ml`;
  const l = s.match(/(\d+(?:[.,]\d+)?)(l|ltr|litro?)\b/i);
  if (l) return `${l[1].replace(',', '.')}l`;
  return s;
}

interface Props {
  initialSrc:    string;
  fallbackSrc:   string;
  alt:           string;
  formatImages?: Record<string, string>;
  /** BuyButton o MultiFormatBuyButton pasados como children */
  children:      (onVariantChange: (v: string) => void) => React.ReactNode;
}

export function RitualFormatImage({ initialSrc, fallbackSrc, alt, formatImages, children }: Props) {
  const [src, setSrc] = useState(initialSrc);

  const handleVariant = useCallback((title: string) => {
    if (!formatImages) return;
    const key = extractKey(title);
    const img =
      formatImages[key] ??
      formatImages[title.trim()] ??
      Object.entries(formatImages).find(([k]) => extractKey(k) === key)?.[1];
    if (img) setSrc(img);
  }, [formatImages]);

  return (
    <>
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-paper">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 95vw"
          className="object-cover transition-opacity duration-300"
          onError={() => setSrc(fallbackSrc)}
        />
      </div>
      {children(handleVariant)}
    </>
  );
}
