import type { Product, Bundle } from '@/data/types';
import type { Locale, Region } from '@/lib/i18n/config';
import { ProductCard } from './ProductCard';

// ── Traducciones por línea ────────────────────────────────────────────────────

const TITLES = {
  hogar: {
    basic: {
      es: 'Hogar Básico', en: 'Home Essentials', fr: 'Maison Essentielle',
      de: 'Haushalt Basis', it: 'Casa Base', nl: 'Basis Huishouden', pt: 'Casa Básica',
    },
    middle: {
      es: 'Ambientadores de Hogar', en: 'Home Fragrances', fr: "Parfums d'Intérieur",
      de: 'Raumduft', it: 'Profumatori per Casa', nl: 'Huisgeuren', pt: 'Ambientadores do Lar',
    },
    rituales: {
      es: 'Rituales del Hogar', en: 'Home Rituals', fr: 'Rituels de Maison',
      de: 'Haus-Rituale', it: 'Rituali di Casa', nl: 'Huisrituelen', pt: 'Rituais do Lar',
    },
    basicColor:    'text-azul',
    middleColor:   'text-verde',
    ritualesColor: 'text-citrico',
  },
  mascota: {
    basic: {
      es: 'Mascota Básico', en: 'Pet Essentials', fr: 'Animaux Essentiels',
      de: 'Tier Basis', it: 'Animali Base', nl: 'Basis Huisdier', pt: 'Animal Básico',
    },
    rituales: {
      es: 'Rituales para Mascotas', en: 'Pet Rituals', fr: 'Rituels pour Animaux',
      de: 'Tier-Rituale', it: 'Rituali per Animali', nl: 'Dierrituelen', pt: 'Rituais para Animais',
    },
    basicColor:    'text-citrico',
    ritualesColor: 'text-verde',
  },
  cosmetica: {
    basic: {
      es: 'Cosmética Básica', en: 'Essential Skincare', fr: 'Cosmétique Essentielle',
      de: 'Basispflege', it: 'Cosmetica Essenziale', nl: 'Basiscosmetica', pt: 'Cosmética Básica',
    },
    rituales: {
      es: 'Rituales de Cosmética', en: 'Skincare Rituals', fr: 'Rituels Cosmétiques',
      de: 'Kosmetik-Rituale', it: 'Rituali Cosmetici', nl: 'Cosmetica Rituelen', pt: 'Rituais de Cosmética',
    },
    basicColor:    'text-verde',
    ritualesColor: 'text-citrico',
  },
} as const;

type Line = keyof typeof TITLES;

// ── Sección individual ────────────────────────────────────────────────────────

function Section({
  title, items, region, locale, color,
}: {
  title: string;
  items: (Product | Bundle)[];
  region: Region;
  locale: Locale;
  color: string;
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
          <ProductCard key={`${item.id}-${i}`} item={item} region={region} locale={locale} />
        ))}
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

interface LineSectionsProps {
  line: Line;
  products: Product[];
  bundles: Bundle[];
  region: Region;
  locale: Locale;
  /** Productos que van en una sección intermedia opcional (ej: ambientadores EU hogar) */
  middleProducts?: Product[];
}

export function LineSections({ line, products, bundles, region, locale, middleProducts }: LineSectionsProps) {
  const cfg = TITLES[line];
  const basicTitle    = cfg.basic[locale as keyof typeof cfg.basic]       ?? cfg.basic.es;
  const ritualesTitle = cfg.rituales[locale as keyof typeof cfg.rituales] ?? cfg.rituales.es;
  const middleTitle   = 'middle' in cfg
    ? (cfg as typeof TITLES.hogar).middle[locale as keyof typeof TITLES.hogar.middle] ?? (cfg as typeof TITLES.hogar).middle.es
    : '';
  const middleColor   = 'middleColor' in cfg ? (cfg as typeof TITLES.hogar).middleColor : 'text-verde';

  return (
    <div className="flex flex-col gap-[clamp(40px,7vw,72px)]">
      <Section title={basicTitle}    items={products}       region={region} locale={locale} color={cfg.basicColor} />
      {middleProducts && middleProducts.length > 0 && (
        <Section title={middleTitle} items={middleProducts} region={region} locale={locale} color={middleColor} />
      )}
      <Section title={ritualesTitle} items={bundles}        region={region} locale={locale} color={cfg.ritualesColor} />
    </div>
  );
}
