'use client';

import { useState, useMemo } from 'react';
import type { Product, Bundle } from '@/data/types';
import type { Locale, Region } from '@/lib/i18n/config';
import { ProductCard } from './ProductCard';

type ItemType = 'all' | 'products' | 'bundles';

interface CatalogGridProps {
  products: Product[];
  bundles: Bundle[];
  region: Region;
  locale: Locale;
  availableSubcategories: string[];
}

// ── i18n ──────────────────────────────────────────────────────────────────────

const T: Record<string, {
  all: string; products: string; bundles: string;
  category: string; allCats: string;
  sensation: string; allSens: string;
  clearFilters: string; noResults: string; noResultsSub: string;
  results: (n: number) => string;
}> = {
  es: {
    all: 'Todos', products: 'Productos', bundles: 'Rituales',
    category: 'Categoría', allCats: 'Todas',
    sensation: 'Sensación', allSens: 'Todas',
    clearFilters: 'Limpiar filtros ×', noResults: 'Sin resultados',
    noResultsSub: 'Prueba a cambiar los filtros para ver más opciones.',
    results: (n) => `${n} ${n === 1 ? 'resultado' : 'resultados'}`,
  },
  en: {
    all: 'All', products: 'Products', bundles: 'Rituals',
    category: 'Category', allCats: 'All',
    sensation: 'Sensation', allSens: 'All',
    clearFilters: 'Clear filters ×', noResults: 'No results',
    noResultsSub: 'Try changing the filters to see more options.',
    results: (n) => `${n} ${n === 1 ? 'result' : 'results'}`,
  },
  fr: {
    all: 'Tous', products: 'Produits', bundles: 'Rituels',
    category: 'Catégorie', allCats: 'Toutes',
    sensation: 'Sensation', allSens: 'Toutes',
    clearFilters: 'Effacer les filtres ×', noResults: 'Aucun résultat',
    noResultsSub: 'Essayez de modifier les filtres pour voir plus d\'options.',
    results: (n) => `${n} ${n === 1 ? 'résultat' : 'résultats'}`,
  },
  de: {
    all: 'Alle', products: 'Produkte', bundles: 'Rituale',
    category: 'Kategorie', allCats: 'Alle',
    sensation: 'Gefühl', allSens: 'Alle',
    clearFilters: 'Filter löschen ×', noResults: 'Keine Ergebnisse',
    noResultsSub: 'Versuche die Filter zu ändern, um mehr Optionen zu sehen.',
    results: (n) => `${n} ${n === 1 ? 'Ergebnis' : 'Ergebnisse'}`,
  },
  it: {
    all: 'Tutti', products: 'Prodotti', bundles: 'Rituali',
    category: 'Categoria', allCats: 'Tutte',
    sensation: 'Sensazione', allSens: 'Tutte',
    clearFilters: 'Cancella filtri ×', noResults: 'Nessun risultato',
    noResultsSub: 'Prova a cambiare i filtri per vedere più opzioni.',
    results: (n) => `${n} ${n === 1 ? 'risultato' : 'risultati'}`,
  },
  nl: {
    all: 'Alle', products: 'Producten', bundles: 'Rituelen',
    category: 'Categorie', allCats: 'Alle',
    sensation: 'Gevoel', allSens: 'Alle',
    clearFilters: 'Filters wissen ×', noResults: 'Geen resultaten',
    noResultsSub: 'Probeer de filters te wijzigen om meer opties te zien.',
    results: (n) => `${n} ${n === 1 ? 'resultaat' : 'resultaten'}`,
  },
  pt: {
    all: 'Todos', products: 'Produtos', bundles: 'Rituais',
    category: 'Categoria', allCats: 'Todas',
    sensation: 'Sensação', allSens: 'Todas',
    clearFilters: 'Limpar filtros ×', noResults: 'Sem resultados',
    noResultsSub: 'Tenta mudar os filtros para ver mais opções.',
    results: (n) => `${n} ${n === 1 ? 'resultado' : 'resultados'}`,
  },
};

// Subcategorías (claves en ES, valores por idioma)
const SUBCAT: Record<string, Record<string, string>> = {
  Cabello:          { en: 'Hair',          fr: 'Cheveux',      de: 'Haare',       it: 'Capelli',     nl: 'Haar',        pt: 'Cabelo'        },
  Cuerpo:           { en: 'Body',          fr: 'Corps',        de: 'Körper',      it: 'Corpo',       nl: 'Lichaam',     pt: 'Corpo'         },
  Rostro:           { en: 'Face',          fr: 'Visage',       de: 'Gesicht',     it: 'Viso',        nl: 'Gezicht',     pt: 'Rosto'         },
  Baño:             { en: 'Bath',          fr: 'Bain',         de: 'Bad',         it: 'Bagno',       nl: 'Bad',         pt: 'Banho'         },
  Afeitado:         { en: 'Shaving',       fr: 'Rasage',       de: 'Rasur',       it: 'Rasatura',    nl: 'Scheren',     pt: 'Barbear'       },
  Cocina:           { en: 'Kitchen',       fr: 'Cuisine',      de: 'Küche',       it: 'Cucina',      nl: 'Keuken',      pt: 'Cozinha'       },
  Ropa:             { en: 'Laundry',       fr: 'Linge',        de: 'Wäsche',      it: 'Bucato',      nl: 'Was',         pt: 'Roupa'         },
  Cuidado:          { en: 'Care',          fr: 'Entretien',    de: 'Pflege',      it: 'Cura',        nl: 'Verzorging',  pt: 'Cuidado'       },
  'Limpieza general': { en: 'General',     fr: 'Général',      de: 'Allgemein',   it: 'Generale',    nl: 'Algemeen',    pt: 'Geral'         },
  Perros:           { en: 'Dogs',          fr: 'Chiens',       de: 'Hunde',       it: 'Cani',        nl: 'Honden',      pt: 'Cães'          },
  Gatos:            { en: 'Cats',          fr: 'Chats',        de: 'Katzen',      it: 'Gatti',       nl: 'Katten',      pt: 'Gatos'         },
};

// Sensaciones (claves en ES, valores por idioma)
const SENS: Record<string, Record<string, string>> = {
  Calma:    { en: 'Calm',      fr: 'Calme',     de: 'Ruhe',        it: 'Calma',      nl: 'Rust',       pt: 'Calma'    },
  Energía:  { en: 'Energy',    fr: 'Énergie',   de: 'Energie',     it: 'Energia',    nl: 'Energie',    pt: 'Energia'  },
  Refugio:  { en: 'Refuge',    fr: 'Refuge',    de: 'Refugium',    it: 'Rifugio',    nl: 'Toevlucht',  pt: 'Refúgio'  },
  Conexión: { en: 'Connection',fr: 'Connexion', de: 'Verbindung',  it: 'Connessione',nl: 'Verbinding', pt: 'Conexão'  },
};

const SENSATIONS = ['Calma', 'Energía', 'Refugio', 'Conexión'] as const;

function tSubcat(key: string, locale: string) {
  return locale === 'es' ? key : (SUBCAT[key]?.[locale] ?? key);
}
function tSens(key: string, locale: string) {
  return locale === 'es' ? key : (SENS[key]?.[locale] ?? key);
}

// ──────────────────────────────────────────────────────────────────────────────

export function CatalogGrid({
  products, bundles, region, locale, availableSubcategories,
}: CatalogGridProps) {
  const [type, setType] = useState<ItemType>('all');
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [sensation, setSensation] = useState<string | null>(null);
  const lb = T[locale] ?? T.es;

  const filteredItems = useMemo<(Product | Bundle)[]>(() => {
    let items: (Product | Bundle)[] = [];
    if (type === 'all' || type === 'products') items = items.concat(products);
    if (type === 'all' || type === 'bundles') items = items.concat(bundles);
    if (subcategory) {
      items = items.filter((item) => {
        if ('subcategory' in item) return item.subcategory === subcategory;
        return false;
      });
    }
    if (sensation) items = items.filter((item) => item.sensation === sensation);
    return items;
  }, [type, subcategory, sensation, products, bundles]);

  const counts = {
    all: products.length + bundles.length,
    products: products.length,
    bundles: bundles.length,
  };

  function clearFilters() { setType('all'); setSubcategory(null); setSensation(null); }
  const anyFilter = type !== 'all' || subcategory || sensation;

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {/* Filtro principal */}
      <div className="flex flex-col gap-4 border-b border-ink/10 pb-4">
        <div className="flex items-center gap-1 lg:gap-2 overflow-x-auto -mx-pad-x px-pad-x lg:mx-0 lg:px-0">
          {(['all', 'products', 'bundles'] as ItemType[]).map((t) => (
            <button
              key={t}
              onClick={() => { setType(t); if (t === 'bundles') setSubcategory(null); }}
              className={`shrink-0 px-4 lg:px-5 py-2 text-sm font-medium rounded-full transition-all border ${
                type === t
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-transparent text-ink border-ink/15 hover:border-ink/40'
              }`}
            >
              {t === 'all' && `${lb.all} (${counts.all})`}
              {t === 'products' && `${lb.products} (${counts.products})`}
              {t === 'bundles' && `${lb.bundles} (${counts.bundles})`}
            </button>
          ))}
        </div>

        {/* Subfiltros: Subcategoría */}
        {type !== 'bundles' && availableSubcategories.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto -mx-pad-x px-pad-x lg:mx-0 lg:px-0">
            <span className="shrink-0 text-[11px] uppercase tracking-wider text-graphite mr-2">
              {lb.category}:
            </span>
            <button
              onClick={() => setSubcategory(null)}
              className={`shrink-0 px-3 py-1 text-xs rounded-full transition-all ${
                subcategory === null ? 'bg-ink/8 text-ink' : 'text-graphite hover:text-ink'
              }`}
            >
              {lb.allCats}
            </button>
            {availableSubcategories.map((sc) => (
              <button
                key={sc}
                onClick={() => setSubcategory(sc)}
                className={`shrink-0 px-3 py-1 text-xs rounded-full transition-all ${
                  subcategory === sc ? 'bg-ink/8 text-ink' : 'text-graphite hover:text-ink'
                }`}
              >
                {tSubcat(sc, locale)}
              </button>
            ))}
          </div>
        )}

        {/* Subfiltros: Sensación */}
        <div className="flex items-center gap-1.5 overflow-x-auto -mx-pad-x px-pad-x lg:mx-0 lg:px-0">
          <span className="shrink-0 text-[11px] uppercase tracking-wider text-graphite mr-2">
            {lb.sensation}:
          </span>
          <button
            onClick={() => setSensation(null)}
            className={`shrink-0 px-3 py-1 text-xs rounded-full transition-all ${
              sensation === null ? 'bg-ink/8 text-ink' : 'text-graphite hover:text-ink'
            }`}
          >
            {lb.allSens}
          </button>
          {SENSATIONS.map((s) => (
            <button
              key={s}
              onClick={() => setSensation(s)}
              className={`shrink-0 px-3 py-1 text-xs rounded-full transition-all ${
                sensation === s ? 'bg-ink/8 text-ink' : 'text-graphite hover:text-ink'
              }`}
            >
              {tSens(s, locale)}
            </button>
          ))}
        </div>

        {anyFilter && (
          <button
            onClick={clearFilters}
            className="text-[11px] uppercase tracking-wider text-graphite hover:text-ink self-start"
          >
            {lb.clearFilters}
          </button>
        )}
      </div>

      {/* Grilla */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 text-graphite">
          <p className="font-display text-lg italic mb-2">{lb.noResults}</p>
          <p className="text-sm">{lb.noResultsSub}</p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 text-xs uppercase tracking-wider border border-ink/15 rounded-full hover:border-ink/40"
          >
            {lb.clearFilters}
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
        {lb.results(filteredItems.length)}
      </div>
    </div>
  );
}

