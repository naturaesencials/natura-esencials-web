import { redirect } from 'next/navigation';

/**
 * Página raíz: si el middleware no captura el request por algún motivo
 * (cache, edge config, etc.), este page.tsx server-side redirige a la
 * combinación region+locale por defecto.
 */
export default function RootPage() {
  redirect('/eu/es');
}
