'use client';

interface BundleImageProps {
  src: string;
  alt: string;
}

/**
 * Envuelve el <img> del ritual en un Client Component para poder usar onError.
 * El placeholder (la "N" de fondo) se muestra mientras la imagen no carga
 * y permanece visible si carga con error.
 */
export function BundleImage({ src, alt }: BundleImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="relative z-10 w-full h-full object-cover"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}
