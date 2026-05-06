import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import {
  locales,
  regions,
  type Locale,
  type Region,
  isLocaleAvailableInRegion,
} from '@/lib/i18n/config';

interface Props {
  children: ReactNode;
  params: Promise<{ region: string; locale: string }>;
}

/**
 * Layout para todas las rutas bajo /[region]/[locale]/.
 *
 * Responsabilidades:
 *  1. Validar que region y locale son válidos (404 si no).
 *  2. Activar locale estático para next-intl (requerido en generateStaticParams).
 *  3. Proveer mensajes i18n al cliente via NextIntlClientProvider.
 *  4. Renderizar nav + footer comunes (añadir aquí cuando existan los componentes).
 */

export async function generateStaticParams() {
  const params: { region: string; locale: string }[] = [];
  for (const region of regions) {
    for (const locale of locales) {
      if (isLocaleAvailableInRegion(locale, region)) {
        params.push({ region, locale });
      }
    }
  }
  return params;
}

export default async function RegionLocaleLayout({ children, params }: Props) {
  const { region, locale } = await params;

  // Validar parámetros
  if (
    !regions.includes(region as Region) ||
    !locales.includes(locale as Locale) ||
    !isLocaleAvailableInRegion(locale as Locale, region as Region)
  ) {
    notFound();
  }

  // Necesario para páginas con datos estáticos (generateStaticParams)
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
