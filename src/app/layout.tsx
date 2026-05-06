import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  robots: { index: true, follow: true },
};

/**
 * Root layout — solo envuelve con <html> y <body>.
 * Las fuentes, providers i18n y nav van en [region]/[locale]/layout.tsx
 * para tener acceso al locale correcto.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
