import { NextResponse } from 'next/server';
import productsData from '@/data/products.json';

/**
 * GET /api/admin/products
 *
 * Devuelve el JSON crudo de productos para el panel admin.
 * No requiere autenticación a nivel de servidor — el panel
 * tiene su propia capa de auth con credenciales hardcoded.
 *
 * Esta API es read-only. La escritura se hace exportando JSON
 * desde el cliente y subiendo a Git manualmente.
 */
export async function GET() {
  return NextResponse.json(productsData, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
