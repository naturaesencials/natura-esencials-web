'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

interface RawBundle {
  id: string;
  line: string;
  format: string;
  includes: string[];
  visible?: boolean;
  outOfStock?: boolean;
  primaryImage?: string;
  basePriceEUR?: number;
  es?: { name: string; subtitle: string };
}

const STORAGE_KEY = 'natura-admin-bundle-overrides';

export default function BundlesAdmin() {
  const [originalBundles, setOriginalBundles] = useState<RawBundle[]>([]);
  const [overrides, setOverrides] = useState<Record<string, Partial<RawBundle>>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    fetch('/api/admin/bundles')
      .then((r) => r.json())
      .then((data) => setOriginalBundles(data.bundles))
      .catch(console.error);

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setOverrides(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const bundles = useMemo(
    () => originalBundles.map((b) => ({ ...b, ...(overrides[b.id] || {}) })),
    [originalBundles, overrides]
  );

  function updateField(id: string, field: keyof RawBundle, value: unknown) {
    setOverrides((prev) => {
      const next = { ...prev, [id]: { ...prev[id], [field]: value } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1200);
  }

  function exportJson() {
    const merged = originalBundles.map((b) => {
      const ov = overrides[b.id];
      if (!ov) return b;
      return { ...b, ...ov };
    });
    const json = JSON.stringify({ bundles: merged }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bundles.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function clearOverrides() {
    if (!confirm('¿Descartar todos los cambios sin guardar?')) return;
    setOverrides({});
    localStorage.removeItem(STORAGE_KEY);
  }

  const overrideCount = Object.keys(overrides).length;

  return (
    <div className="max-w-6xl mx-auto px-pad-x py-8">
      <div className="flex items-baseline justify-between mb-2">
        <h1 className="font-display text-3xl">
          Rituales <span className="text-graphite text-base font-normal">({bundles.length})</span>
        </h1>
        <Link href="/admin" className="text-sm text-graphite hover:text-ink">
          ← Volver
        </Link>
      </div>
      <p className="text-graphite text-sm mb-6">
        Edita los packs y rituales: foto, visibilidad y disponibilidad.
      </p>

      <div className="bg-paper border border-ink/10 rounded-lg p-4 mb-6 flex items-center gap-3">
        {overrideCount > 0 && (
          <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-sm">
            {overrideCount} cambios sin exportar
          </span>
        )}
        {savedFlash && (
          <span className="text-xs text-emerald-700">✓ Guardado en navegador</span>
        )}
        <div className="flex-1" />
        <button
          onClick={clearOverrides}
          disabled={overrideCount === 0}
          className="px-3 py-2 text-xs uppercase tracking-wider border border-ink/15 rounded-sm hover:border-ink/40 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Descartar
        </button>
        <button
          onClick={exportJson}
          disabled={overrideCount === 0}
          className="px-4 py-2 text-xs uppercase tracking-wider bg-ink text-paper rounded-sm hover:bg-ink/90 disabled:opacity-30"
        >
          Exportar JSON
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {bundles.map((b) => {
          const isModified = !!overrides[b.id];
          const editing = editingId === b.id;
          return (
            <div
              key={b.id}
              className={`bg-paper border rounded-lg p-5 ${
                isModified ? 'border-amber-300 bg-amber-50/30' : 'border-ink/10'
              }`}
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-stone-100 rounded-sm overflow-hidden flex items-center justify-center flex-shrink-0">
                  {b.primaryImage ? (
                    <img src={b.primaryImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-stone-300 text-3xl font-display italic">N</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg leading-tight mb-1">
                    {b.es?.name || b.id}
                  </h3>
                  <p className="text-xs text-graphite mb-2 line-clamp-2">{b.es?.subtitle}</p>
                  <div className="text-xs text-graphite">
                    <span className="capitalize">{b.line}</span> · {b.format} · {b.includes.length} productos
                    {b.basePriceEUR && (
                      <>
                        {' · '}
                        <span className="font-medium">{b.basePriceEUR}€</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() =>
                    updateField(b.id, 'visible', b.visible === false ? true : false)
                  }
                  className={`px-3 py-1 text-xs rounded-full ${
                    b.visible === false
                      ? 'bg-stone-200 text-stone-600'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {b.visible === false ? 'Oculto' : 'Visible'}
                </button>
                <button
                  onClick={() => updateField(b.id, 'outOfStock', !b.outOfStock)}
                  className={`px-3 py-1 text-xs rounded-full ${
                    b.outOfStock ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {b.outOfStock ? 'Agotado' : 'Disponible'}
                </button>
                <div className="flex-1" />
                <button
                  onClick={() => setEditingId(editing ? null : b.id)}
                  className="text-xs uppercase tracking-wider text-graphite hover:text-ink"
                >
                  {editing ? 'Cerrar ↑' : 'Editar ↓'}
                </button>
              </div>

              {editing && (
                <div className="mt-4 pt-4 border-t border-ink/8 space-y-3">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-graphite block mb-1">
                      URL foto del ritual
                    </label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={b.primaryImage || ''}
                      onChange={(e) => updateField(b.id, 'primaryImage', e.target.value)}
                      className="w-full px-3 py-2 border border-ink/15 rounded-sm text-sm focus:border-ink/40 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-graphite block mb-1">
                      Subtítulo
                    </label>
                    <input
                      type="text"
                      value={b.es?.subtitle || ''}
                      onChange={(e) =>
                        updateField(b.id, 'es', {
                          ...(b.es || { name: '' }),
                          subtitle: e.target.value,
                        } as any)
                      }
                      className="w-full px-3 py-2 border border-ink/15 rounded-sm text-sm focus:border-ink/40 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
