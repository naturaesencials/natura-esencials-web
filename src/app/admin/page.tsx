'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  totalProducts: number;
  visibleProducts: number;
  outOfStockProducts: number;
  totalBundles: number;
  visibleBundles: number;
}

export default function AdminHome() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/products').then((r) => r.json()),
      fetch('/api/admin/bundles').then((r) => r.json()),
    ])
      .then(([products, bundles]) => {
        const overrides = JSON.parse(localStorage.getItem('natura-admin-overrides') || '{}');
        const items = products.products.map((p: any) => ({ ...p, ...(overrides[p.id] || {}) }));
        setStats({
          totalProducts: items.length,
          visibleProducts: items.filter((p: any) => p.visible !== false).length,
          outOfStockProducts: items.filter((p: any) => p.outOfStock === true).length,
          totalBundles: bundles.bundles.length,
          visibleBundles: bundles.bundles.filter((b: any) => b.visible !== false).length,
        });
      })
      .catch(() => setStats(null));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-pad-x py-10">
      <h1 className="font-display text-4xl mb-2">
        Bienvenido, <em className="font-italic">Carlos</em>
      </h1>
      <p className="text-graphite mb-10">
        Edita el catálogo, sube fotos y controla la visibilidad de los productos.
      </p>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-paper border border-ink/10 rounded-lg p-5">
            <div className="text-[11px] uppercase tracking-wider text-graphite mb-1">
              Productos
            </div>
            <div className="font-display text-3xl">{stats.totalProducts}</div>
            <div className="text-xs text-graphite mt-1">
              {stats.visibleProducts} visibles
            </div>
          </div>
          <div className="bg-paper border border-ink/10 rounded-lg p-5">
            <div className="text-[11px] uppercase tracking-wider text-graphite mb-1">
              Rituales
            </div>
            <div className="font-display text-3xl">{stats.totalBundles}</div>
            <div className="text-xs text-graphite mt-1">
              {stats.visibleBundles} visibles
            </div>
          </div>
          <div className="bg-paper border border-ink/10 rounded-lg p-5">
            <div className="text-[11px] uppercase tracking-wider text-graphite mb-1">
              Sin stock
            </div>
            <div className="font-display text-3xl">{stats.outOfStockProducts}</div>
            <div className="text-xs text-graphite mt-1">marcados como agotado</div>
          </div>
          <div className="bg-paper border border-ink/10 rounded-lg p-5">
            <div className="text-[11px] uppercase tracking-wider text-graphite mb-1">
              Idiomas
            </div>
            <div className="font-display text-3xl">7</div>
            <div className="text-xs text-graphite mt-1">ES + 6 IA</div>
          </div>
        </div>
      )}

      {/* Acciones */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/admin/products"
          className="bg-paper border border-ink/10 rounded-lg p-6 hover:border-ink/30 transition-colors"
        >
          <h2 className="font-display text-2xl mb-2">Productos</h2>
          <p className="text-graphite text-sm">
            Editar nombre, descripción y fotos. Marcar visibles/ocultos. Marcar agotados.
          </p>
          <span className="text-xs uppercase tracking-wider mt-3 inline-block">
            Gestionar productos →
          </span>
        </Link>
        <Link
          href="/admin/bundles"
          className="bg-paper border border-ink/10 rounded-lg p-6 hover:border-ink/30 transition-colors"
        >
          <h2 className="font-display text-2xl mb-2">Rituales / Packs</h2>
          <p className="text-graphite text-sm">
            Editar packs existentes y los nuevos Para Ella / Para Él. Subir fotos del pack.
          </p>
          <span className="text-xs uppercase tracking-wider mt-3 inline-block">
            Gestionar rituales →
          </span>
        </Link>
      </div>

      {/* Aviso técnico */}
      <div className="mt-10 bg-amber-50 border border-amber-200 rounded-lg p-5 text-sm text-amber-900">
        <p className="font-medium mb-1">Cómo se guardan los cambios</p>
        <p>
          Por ahora los cambios se guardan en tu navegador (
          <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">localStorage</code>) y
          puedes exportarlos como JSON desde cada pantalla. Para hacerlos permanentes:
          descarga el JSON y reemplaza el archivo correspondiente en el repo
          (<code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">src/data/products.json</code>{' '}
          o <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">bundles.json</code>),
          haz commit y Vercel desplegará automáticamente.
        </p>
        <p className="mt-2">
          Más adelante conectaremos la edición directa al repo de GitHub para que los
          cambios sean automáticos.
        </p>
      </div>
    </div>
  );
}
