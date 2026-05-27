import type { Product, Bundle } from '@/data/types';
import type { Locale, Region } from '@/lib/i18n/config';
import { ProductCard } from './ProductCard';

// ── Secciones fijas (en orden) ────────────────────────────────────────────────

const SECTION_BASIC_IDS = [
  'jabon-manos-cuerpo',
  'champu-2-en-1',
  'acondicionador-capilar',
  'body-milk',
  'total-body-wash',
] as const;

const SECTION_ELLA_IDS = [
  'gel-manos-cuerpo-mujer',
  'champu-mujer',
  'acondicionador-mujer',
  'body-milk-woman',
  'agua-micelar',
  'exfoliante-facial-mujer',
  'serum-antiojeras',
] as const;

const SECTION_EL_IDS = [
  'gel-manos-cuerpo-hombre',
  'champu-hombre',
  'acondicionador-hombre',
  'body-milk-man',
  'exfoliante-facial-hombre',
  'serum-antiojeras',
] as const;

const SECTION_RITUALES_IDS = [
  'ritual-plenitud-300',
  'ritual-ducha-perfecta-300',
  'ritual-rendimiento-300',
  'ritual-para-ella',
  'ritual-para-el',
] as const;

const SECTION_VERANO_COSMETICA_IDS = [
  'champu-verano-2en1',
  'gel-manos-cuerpo-verano',
] as const;

// ── Traducciones de títulos ───────────────────────────────────────────────────

const TITLES: Record<string, {
  basic: string; ella: string; el: string; rituales: string; verano: string;
}> = {
  es: {
    basic:    'Cosmética Básica',
    ella:     'Cosmética para Ella',
    el:       'Cosmética para Él',
    rituales: 'Rituales de Cosmética',
    verano:   'Edición Limitada',
  },
  en: {
    basic:    'Essential Skincare',
    ella:     'Skincare for Her',
    el:       'Skincare for Him',
    rituales: 'Skincare Rituals',
    verano:   'Limited Edition',
  },
  fr: {
    basic:    'Cosmétique Essentielle',
    ella:     'Cosmétique pour Elle',
    el:       'Cosmétique pour Lui',
    rituales: 'Rituels Cosmétiques',
    verano:   'Édition Limitée',
  },
  de: {
    basic:    'Basispflege',
    ella:     'Kosmetik für Sie',
    el:       'Kosmetik für Ihn',
    rituales: 'Kosmetik-Rituale',
    verano:   'Limitierte Edition',
  },
  it: {
    basic:    'Cosmetica Essenziale',
    ella:     'Cosmetica per Lei',
    el:       'Cosmetica per Lui',
    rituales: 'Rituali Cosmetici',
    verano:   'Edizione Limitata',
  },
  nl: {
    basic:    'Basiscosmetica',
    ella:     'Cosmetica voor Haar',
    el:       'Cosmetica voor Hem',
    rituales: 'Cosmetica Rituelen',
    verano:   'Beperkte Editie',
  },
  pt: {
    basic:    'Cosmética Básica',
    ella:     'Cosmética para Ela',
    el:       'Cosmética para Ele',
    rituales: 'Rituais de Cosmética',
    verano:   'Edição Limitada',
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function pickProducts(ids: readonly string[], products: Product[]): Product[] {
  return ids
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined);
}

function pickBundles(ids: readonly string[], bundles: Bundle[]): Bundle[] {
  return ids
    .map(id => bundles.find(b => b.id === id))
    .filter((b): b is Bundle => b !== undefined);
}

// ── Componente de sección ────────────────────────────────────────────────────

function Section({
  title, items, region, locale, color = 'text-verde',
}: {
  title: string;
  items: (Product | Bundle)[];
  region: Region;
  locale: Locale;
  color?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <h2 className="font-display text-[clamp(22px,3vw,32px)] leading-tight tracking-[-0.015em] shrink-0">
          <em className={`font-display-italic ${color}`}>{title}</em>
        </h2>
        <div className="flex-1 h-px bg-ink/10" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5">
        {items.map((item, i) => (
          <ProductCard
            key={`${item.id}-${i}`}
            item={item}
            region={region}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

interface CosmeticaSectionsProps {
  products: Product[];
  bundles: Bundle[];
  region: Region;
  locale: Locale;
}

export function CosmeticaSections({ products, bundles, region, locale }: CosmeticaSectionsProps) {
  const t = TITLES[locale] ?? TITLES.es;

  const basicItems    = pickProducts(SECTION_BASIC_IDS, products);
  const ellaItems     = pickProducts(SECTION_ELLA_IDS, products);
  const elItems       = pickProducts(SECTION_EL_IDS, products);
  const veranoItems   = pickProducts(SECTION_VERANO_COSMETICA_IDS, products);
  const ritualesItems = pickBundles(SECTION_RITUALES_IDS, bundles);

  return (
    <div className="flex flex-col gap-[clamp(40px,7vw,72px)]">
      <Section title={t.basic}    items={basicItems}    region={region} locale={locale} color="text-verde" />
      <Section title={t.ella}     items={ellaItems}     region={region} locale={locale} color="text-verde-vivo" />
      <Section title={t.el}       items={elItems}       region={region} locale={locale} color="text-azul" />
      <Section title={t.verano}   items={veranoItems}   region={region} locale={locale} color="text-citrico" />
      <Section title={t.rituales} items={ritualesItems} region={region} locale={locale} color="text-citrico" />
    </div>
  );
}
