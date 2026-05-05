'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

/**
 * Editor de productos.
 * Cambios guardados localmente. Botón "Exportar JSON" produce el archivo final
 * que Carlos puede subir al repo manualmente.
 */

interface RawProduct {
  id: string;
  line: string;
  collection: string;
  subcategory: string;
  sku: string;
  isoNaturalPercent: number;
  formats: string[];
  visible?: boolean;
  outOfStock?: boolean;
  primaryImage?: string;
  es?: { name: string; subtitle: string; shortDescription: string };
}

const STORAGE_KEY = 'natura-admin-overrides';

export default function ProductsAdmin() {
  const [originalProducts, setOriginalProducts] = useState<RawProduct[]>([]);
  const [overrides, setOverrides] = useState<Record<string, Partial<RawProduct>>>({});
  const [search, setSearch] = useState('');
  const [filterLine, setFilterLine] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  // Cargar productos y overrides al montar
  useEffect(() => {
    fetch('/api/admin/products')
      .then((r) => r.json())
      .then((data) => setOriginalProducts(data.products))
      .catch(console.error);

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setOverrides(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // Productos resultantes: original + overrides aplicados
  const products = useMemo(
    () =>
      originalProducts.map((p) => ({ ...p, ...(overrides[p.id] || {}) })),
    [originalProducts, overrides]
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filterLine !== 'all' && p.line !== filterLine) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.id.toLowerCase().includes(q) ||
          (p.es?.name || '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, search, filterLine]);

  function updateField(id: string, field: keyof RawProduct, value: unknown) {
    setOverrides((prev) => {
      const next = { ...prev, [id]: { ...prev[id], [field]: value } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1200);
  }

  function exportJson() {
    setSaving(true);
    // Aplica los overrides al JSON original y descarga
    const merged = originalProducts.map((p) => {
      const ov = overrides[p.id];
      if (!ov) return p;
      return { ...p, ...ov };
    });
    const json = JSON.stringify({ products: merged }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `products.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTimeout(() => setSaving(false), 500);
  }

  function clearOverrides() {
    if (!confirm('¿Seguro que quieres descartar todos los cambios sin guardar?')) return;
    setOverrides({});
    localStorage.removeItem(STORAGE_KEY);
  }

  const overrideCount = Object.keys(overrides).length;

  return (
    <div className="max-w-7xl mx-auto px-pad-x py-8">
      <div className="flex items-baseline justify-between mb-2">
        <h1 className="font-display text-3xl">
          Productos <span className="text-graphite text-base font-normal">({products.length})</span>
        </h1>
        <Link href="/admin" className="text-sm text-graphite hover:text-ink">
          ← Volver
        </Link>
      </div>
      <p className="text-graphite text-sm mb-6">
        Edita la información de los productos. Los cambios se guardan en tu navegador.
      </p>

      {/* Toolbar */}
      <div className="bg-paper border border-ink/10 rounded-lg p-4 mb-6 flex flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder="Buscar producto…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-ink/15 rounded-sm text-sm flex-1 min-w-[200px] focus:border-ink/40 focus:outline-none"
        />
        <select
          value={filterLine}
          onChange={(e) => setFilterLine(e.target.value)}
          className="px-3 py-2 border border-ink/15 rounded-sm text-sm bg-paper"
        >
          <option value="all">Todas las líneas</option>
          <option value="cosmetica">Cosmética</option>
          <option value="hogar">Hogar</option>
          <option value="mascota">Mascota</option>
        </select>
        <div className="flex-1 min-w-0" />
        {overrideCount > 0 && (
          <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-sm">
            {overrideCount} cambios sin exportar
          </span>
        )}
        {savedFlash && (
          <span className="text-xs text-emerald-700">✓ Guardado en navegador</span>
        )}
        <button
          onClick={clearOverrides}
          disabled={overrideCount === 0}
          className="px-3 py-2 text-xs uppercase tracking-wider border border-ink/15 rounded-sm hover:border-ink/40 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Descartar
        </button>
        <button
          onClick={exportJson}
          disabled={saving || overrideCount === 0}
          className="px-4 py-2 text-xs uppercase tracking-wider bg-ink text-paper rounded-sm hover:bg-ink/90 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {saving ? 'Generando…' : 'Exportar JSON'}
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-paper border border-ink/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-left text-[11px] uppercase tracking-wider text-graphite">
              <tr>
                <th className="px-4 py-3">Foto</th>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Línea</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3 text-center">Visible</th>
                <th className="px-4 py-3 text-center">Stock</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const isModified = !!overrides[p.id];
                const editing = editingId === p.id;
                return (
                  <>
                    <tr
                      key={p.id}
                      className={`border-t border-ink/8 ${isModified ? 'bg-amber-50/50' : ''}`}
                    >
                      <td className="px-4 py-3">
                        <div className="w-12 h-12 bg-stone-100 rounded-sm overflow-hidden flex items-center justify-center">
                          {p.primaryImage ? (
                            <img
                              src={p.primaryImage}
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <span className="text-stone-300 text-2xl font-display italic">N</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{p.es?.name || p.id}</div>
                        <div className="text-xs text-graphite font-mono">{p.id}</div>
                      </td>
                      <td className="px-4 py-3 text-graphite capitalize">{p.line}</td>
                      <td className="px-4 py-3 text-graphite">{p.subcategory}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() =>
                            updateField(p.id, 'visible', p.visible === false ? true : false)
                          }
                          className={`px-3 py-1 text-xs rounded-full transition-colors ${
                            p.visible === false
                              ? 'bg-stone-200 text-stone-600'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {p.visible === false ? 'Oculto' : 'Visible'}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => updateField(p.id, 'outOfStock', !p.outOfStock)}
                          className={`px-3 py-1 text-xs rounded-full transition-colors ${
                            p.outOfStock
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          {p.outOfStock ? 'Agotado' : 'Disponible'}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setEditingId(editing ? null : p.id)}
                          className="text-xs uppercase tracking-wider text-graphite hover:text-ink"
                        >
                          {editing ? 'Cerrar ↑' : 'Editar ↓'}
                        </button>
                      </td>
                    </tr>
                    {editing && (
                      <tr className="border-t border-ink/8 bg-stone-50/50">
                        <td colSpan={7} className="px-4 py-5">
                          <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
                            <div>
                              <label className="text-[11px] uppercase tracking-wider text-graphite block mb-1">
                                URL de la foto principal
                              </label>
                              <input
                                type="text"
                                placeholder="https://cdn.shopify.com/.../foto.jpg"
                                value={p.primaryImage || ''}
                                onChange={(e) =>
                                  updateField(p.id, 'primaryImage', e.target.value)
                                }
                                className="w-full px-3 py-2 border border-ink/15 rounded-sm focus:border-ink/40 focus:outline-none"
                              />
                              <p className="text-xs text-graphite mt-1">
                                Pega la URL de Shopify CDN o cualquier URL pública.
                              </p>
                            </div>

                            <div>
                              <label className="text-[11px] uppercase tracking-wider text-graphite block mb-1">
                                Nombre del producto
                              </label>
                              <input
                                type="text"
                                value={p.es?.name || ''}
                                onChange={(e) =>
                                  updateField(p.id, 'es', {
                                    ...p.es,
                                    name: e.target.value,
                                  } as any)
                                }
                                className="w-full px-3 py-2 border border-ink/15 rounded-sm focus:border-ink/40 focus:outline-none"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="text-[11px] uppercase tracking-wider text-graphite block mb-1">
                                Subtítulo
                              </label>
                              <input
                                type="text"
                                value={p.es?.subtitle || ''}
                                onChange={(e) =>
                                  updateField(p.id, 'es', {
                                    ...p.es,
                                    subtitle: e.target.value,
                                  } as any)
                                }
                                className="w-full px-3 py-2 border border-ink/15 rounded-sm focus:border-ink/40 focus:outline-none"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="text-[11px] uppercase tracking-wider text-graphite block mb-1">
                                Descripción breve
                              </label>
                              <textarea
                                value={p.es?.shortDescription || ''}
                                onChange={(e) =>
                                  updateField(p.id, 'es', {
                                    ...p.es,
                                    shortDescription: e.target.value,
                                  } as any)
                                }
                                rows={3}
                                className="w-full px-3 py-2 border border-ink/15 rounded-sm focus:border-ink/40 focus:outline-none resize-y"
                              />
                            </div>
                          </div>
                          <div className="mt-3 text-xs text-graphite">
                            Para editar más campos (beneficios, ritual, INCI, etc.) por
                            ahora hay que editar el JSON directamente en el repo. La
                            edición avanzada se añadirá en una siguiente versión del panel.
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-graphite">Sin resultados.</div>
      )}
    </div>
  );
}
