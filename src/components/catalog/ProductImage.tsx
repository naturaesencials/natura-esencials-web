'use client';

interface ProductImageProps {
  src: string;
  alt: string;
}

export function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center text-stone" aria-hidden="true">
        <span className="text-7xl font-display italic opacity-30">N</span>
      </div>
      <img
        src={src}
        alt={alt}
        loading="eager"
        className="relative z-10 w-full h-full object-cover"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />
    </>
  );
}
