import { regionCurrency, type Region } from '@/lib/i18n/config';

/**
 * Formatea un importe con la convención correcta de cada región:
 *   eu → "18,80 €"  (es-ES, coma decimal, símbolo detrás)
 *   uk → "£18.80"   (en-GB, punto decimal, símbolo delante)
 *
 * Siempre 2 decimales. Fuente única de verdad para el formato de precio
 * en tarjetas y bloques (las fichas usan el precio real de Shopify vía BuyButton).
 */
export function formatPrice(
  amount: number | string | null | undefined,
  region: Region,
): string {
  if (amount === null || amount === undefined || amount === '') return '';
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (Number.isNaN(value)) return '';

  const { code } = regionCurrency[region];
  const intlLocale = region === 'uk' ? 'en-GB' : 'es-ES';

  return new Intl.NumberFormat(intlLocale, {
    style: 'currency',
    currency: code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
