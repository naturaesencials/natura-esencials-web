'use client';

import { useState, useMemo } from 'react';
import type { Product, Bundle } from '@/data/types';
import type { Locale, Region } from '@/lib/i18n/config';
import { ProductCard } from './ProductCard';

/**
 * CatalogGrid: filtros + grilla de productos y rituales.
 *
 * Estrategia C híbrida:
 *  - Una página por línea (cosmetica, hogar, mascota)
 *  - En la misma página: productos individuales + rituales/packs
 *  - Filtros principales: Todos / Productos / Rituales
 *  - Subfiltros por subcategoría (Cabello, Cuerpo, Rostro, etc.)
 *  - Filtro adicional por sensación (Calma, Energía, Refugio, Conexión)
 */

type ItemType = 'all' | 'products' | 'bundles';

interface CatalogGridProps {
  products: Product[];
  bundles: Bundle[];
  region: Region;
  locale: Locale;
  /** Subcategorías disponibles en esta línea (derivadas de los productos) */
  availableSubcategories: string[];
}

const SENSATIONS = ['Calma', 'Energía', 'Refugio', 'Conexión'] as const;

export function CatalogGrid({
  products,
  bundles,
  region,
  locale,
  availableSubcategories,
}: CatalogGridProps) {
  const [type, setType] = useState<ItemType>('all');
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [sensation, setSensation] = useState<string | null>(null);

  const filteredItems = useMemo<(Product | Bundle)[]>(() => {
    let items: (Product | Bundle)[] = [];

    if (type === 'all' || type === 'products') {
      items = items.concat(products);
    }
    if (type === 'all' || type === 'bundles') {
      items = items.concat(bundles);
    }

    if (subcategory) {
      items = items.filter((item) => {
        if ('subcategory' in item) return item.subcategory === subcategory;
        // Bundles no tienen subcategory directa: si seleccionada, ocultarlos
        return false;
      });
    }

    if (sensation) {
      items = items.filter((item) => item.sensation === sensation);
    }

    return items;
  }, [type, subcategory, sensation, products, bundles]);

  const counts = {
    all: products.length + bundles.length,
    products: products.length,
    bundles: bundles.length,
  };

  function clearFilters() {
    setType('all');
    setSubcategory(null);
    setSensation(null);
  }

  const anyFilter = type !== 'all' || subcategory || sensation;

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {/* Filtro principal: Todos / Productos / Rituales */}
      <div className="flex flex-col gap-4 border-b border-ink/10 pb-4">
        <div className="flex items-center gap-1 lg:gap-2 overflow-x-auto -mx-pad-x px-pad-x lg:mx-0 lg:px-0">
          {(['all', 'products', 'bundles'] as ItemType[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setType(t);
                if (t === 'bundles') setSubcategory(null);
              }}
              className={`shrink-0 px-4 lg:px-5 py-2 text-sm font-medium rounded-full transition-all border ${
                type === t
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-transparent text-ink border-ink/15 hover:border-ink/40'
              }`}
            >
              {t === 'all' && `Todos (${counts.all})`}
              {t === 'products' && `Productos (${counts.products})`}
              {t === 'bundles' && `Rituales (${counts.bundles})`}
            </button>
          ))}
        </div>

        {/* Subfiltros: Subcategoría (solo si tipo permite productos) */}
        {type !== 'bundles' && availableSubcategories.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto -mx-pad-x px-pad-x lg:mx-0 lg:px-0">
            <span className="shrink-0 text-[11px] uppercase tracking-wider text-graphite mr-2">
              Categoría:
            </span>
            <button
              onClick={() => setSubcategory(null)}
              className={`shrink-0 px-3 py-1 text-xs rounded-full transition-all ${
                subcategory === null
                  ? 'bg-ink/8 text-ink'
                  : 'text-graphite hover:text-ink'
              }`}
            >
              Todas
            </button>
            {availableSubcategories.map((sc) => (
              <button
                key={sc}
                onClick={() => setSubcategory(sc)}
                className={`shrink-0 px-3 py-1 text-xs rounded-full transition-all ${
                  subcategory === sc
                    ? 'bg-ink/8 text-ink'
                    : 'text-graphite hover:text-ink'
                }`}
              >
                {sc}
              </button>
            ))}
          </div>
        )}

        {/* Subfiltros: Sensación */}
        <div className="flex items-center gap-1.5 overflow-x-auto -mx-pad-x px-pad-x lg:mx-0 lg:px-0">
          <span className="shrink-0 text-[11px] uppercase tracking-wider text-graphite mr-2">
            Sensación:
          </span>
          <button
            onClick={() => setSensation(null)}
            className={`shrink-0 px-3 py-1 text-xs rounded-full transition-all ${
              sensation === null
                ? 'bg-ink/8 text-ink'
                : 'text-graphite hover:text-ink'
            }`}
          >
            Todas
          </button>
          {SENSATIONS.map((s) => (
            <button
              key={s}
              onClick={() => setSensation(s)}
              className={`shrink-0 px-3 py-1 text-xs rounded-full transition-all ${
                sensation === s
                  ? 'bg-ink/8 text-ink'
                  : 'text-graphite hover:text-ink'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {anyFilter && (
          <button
            onClick={clearFilters}
            className="text-[11px] uppercase tracking-wider text-graphite hover:text-ink self-start"
          >
            Limpiar filtros ×
          </button>
        )}
      </div>

      {/* Grilla */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 text-graphite">
          <p className="font-display text-lg italic mb-2">Sin resultados</p>
          <p className="text-sm">Prueba a cambiar los filtros para ver más opciones.</p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 text-xs uppercase tracking-wider border border-ink/15 rounded-full hover:border-ink/40"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5">
          {filteredItems.map((item) => (
            <ProductCard key={item.id} item={item} region={region} locale={locale} />
          ))}
        </div>
      )}

      <div className="text-center text-[11px] uppercase tracking-wider text-graphite/60 pt-4">
        {filteredItems.length} {filteredItems.length === 1 ? 'resultado' : 'resultados'}
      </div>
    </div>
  );
}
