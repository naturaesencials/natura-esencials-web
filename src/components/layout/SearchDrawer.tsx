'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { buildPath } from '@/lib/i18n/paths';
import type { Locale, Region } from '@/lib/i18n/config';

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface SearchResult {
  id: string;
  type: 'product' | 'ritual';
  title: string;
  subtitle: string;
  href: string;
  img: string;
}

// ─── Hook de búsqueda ────────────────────────────────────────────────────────

function useSearch(query: string, region: Region, locale: Locale): SearchResult[] {
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query.trim().length < 2) { setResults([]); return; }

    const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Búsqueda client-side sobre catálogo estático
    const load = async () => {
      const [{ products }, { bundles }] = await Promise.all([
        import('@/data/index'),
        import('@/data/index'),
      ]);

      const hits: SearchResult[] = [];

      // Productos
      for (const p of products) {
        if (!p.visible) continue;
        const t = p.translations[locale] ?? p.translations.es;
        if (!t) continue;
        const text = [t.name, t.subtitle, t.shortDescription ?? '']
          .join(' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (!text.includes(q)) continue;
        hits.push({
          id: p.id, type: 'product',
          title: t.name,
          subtitle: t.subtitle ?? '',
          href: buildPath(region, locale, `${p.line}/${t.slug ?? p.id}`),
          img: `/images/products/${region}/${p.id}.jpg`,
        });
      }

      // Rituales/bundles
      for (const b of bundles) {
        if (!b.visible) continue;
        const t = b.translations[locale] ?? b.translations.es;
        if (!t) continue;
        const text = [t.name, t.subtitle ?? '', t.shortDescription ?? '']
          .join(' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (!text.includes(q)) continue;
        hits.push({
          id: b.id, type: 'ritual',
          title: t.name,
          subtitle: t.subtitle ?? '',
          href: buildPath(region, locale, `rituales/${t.slug ?? b.id}`),
          img: b.primaryImage ?? `/images/bundles/${region}/${b.id}.jpg`,
        });
      }

      setResults(hits.slice(0, 8));
    };

    const timeout = setTimeout(load, 180);
    return () => clearTimeout(timeout);
  }, [query, region, locale]);

  return results;
}

// ─── Componente ──────────────────────────────────────────────────────────────

interface Props {
  open: boolean;
  onClose: () => void;
  region: Region;
  locale: Locale;
}

export function SearchDrawer({ open, onClose, region, locale }: Props) {
  const tc = useTranslations('common');
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useSearch(query, region, locale);

  const labels: Record<string, { placeholder: string; noResults: string; products: string; rituals: string }> = {
    es: { placeholder: 'Buscar productos y rituales…', noResults: 'Sin resultados para', products: 'Productos', rituals: 'Rituales' },
    en: { placeholder: 'Search products and rituals…', noResults: 'No results for', products: 'Products', rituals: 'Rituals' },
    fr: { placeholder: 'Rechercher produits et rituels…', noResults: 'Aucun résultat pour', products: 'Produits', rituals: 'Rituels' },
    de: { placeholder: 'Produkte und Rituale suchen…', noResults: 'Keine Ergebnisse für', products: 'Produkte', rituals: 'Rituale' },
    it: { placeholder: 'Cerca prodotti e rituali…', noResults: 'Nessun risultato per', products: 'Prodotti', rituals: 'Rituali' },
    nl: { placeholder: 'Zoek producten en rituelen…', noResults: 'Geen resultaten voor', products: 'Producten', rituals: 'Rituelen' },
    pt: { placeholder: 'Pesquisar produtos e rituais…', noResults: 'Sem resultados para', products: 'Produtos', rituals: 'Rituais' },
  };
  const lb = labels[locale] ?? labels.en;

  // Focus al abrir + Escape para cerrar + Cmd+K
  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 100); }
    else { setQuery(''); }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); open ? onClose() : undefined; }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const productResults = results.filter(r => r.type === 'product');
  const ritualResults  = results.filter(r => r.type === 'ritual');

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-[970] bg-ink/50 backdrop-blur-sm transition-opacity duration-200 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal
        aria-label={tc('search')}
        className={`fixed inset-x-0 top-0 z-[980] transition-transform duration-200 ${open ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="mx-auto max-w-2xl bg-bg shadow-2xl">
          {/* Input */}
          <div className="flex items-center gap-3 border-b border-rule px-5 py-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 shrink-0 text-graphite">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={lb.placeholder}
              className="flex-1 bg-transparent text-[15px] text-ink placeholder:text-graphite/60 focus:outline-none"
            />
            <button onClick={onClose} className="shrink-0 text-[11px] uppercase tracking-[0.22em] text-graphite hover:text-ink">
              ESC
            </button>
          </div>

          {/* Resultados */}
          {query.trim().length >= 2 && (
            <div className="max-h-[70vh] overflow-y-auto">
              {results.length === 0 ? (
                <p className="px-5 py-8 text-center text-[13px] text-graphite">
                  {lb.noResults} &ldquo;{query}&rdquo;
                </p>
              ) : (
                <div className="py-4">
                  {productResults.length > 0 && (
                    <div>
                      <p className="px-5 pb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-graphite">{lb.products}</p>
                      {productResults.map(r => <ResultItem key={r.id} result={r} onClose={onClose} />)}
                    </div>
                  )}
                  {ritualResults.length > 0 && (
                    <div className={productResults.length > 0 ? 'mt-4 border-t border-rule pt-4' : ''}>
                      <p className="px-5 pb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-graphite">{lb.rituals}</p>
                      {ritualResults.map(r => <ResultItem key={r.id} result={r} onClose={onClose} />)}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ResultItem({ result, onClose }: { result: SearchResult; onClose: () => void }) {
  return (
    <Link
      href={result.href}
      onClick={onClose}
      className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-paper"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm bg-paper">
        <Image src={result.img} alt={result.title} fill sizes="48px" className="object-cover" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[13px] font-medium text-ink">{result.title}</p>
        {result.subtitle && <p className="truncate text-[11px] text-graphite">{result.subtitle}</p>}
      </div>
    </Link>
  );
}
