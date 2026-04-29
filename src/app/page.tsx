import { permanentRedirect } from 'next/navigation';

/**
 * Página raíz: redirige a /eu/es por defecto (lo que esperan los bots de SEO).
 *
 * Nota: el middleware intercepta antes que esto y hace detección geoIP/Accept-Language
 * para usuarios reales (los lleva a la región+idioma adecuado). Este page.tsx solo se
 * ejecuta como fallback si el middleware no se dispara.
 *
 * Usamos permanentRedirect (HTTP 308) en lugar de redirect (307) para emitir Location
 * header HTTP estándar interpretable por crawlers que no ejecutan JavaScript.
 */
export default function RootPage() {
  permanentRedirect('/eu/es');
}
