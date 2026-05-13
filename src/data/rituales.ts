import type { Locale, Region } from '@/lib/i18n/config';

export type RitualLine = 'cosmetica' | 'hogar' | 'mascota';

export interface Ritual {
  id: number;
  number: string;
  line: RitualLine;
  shopifyHandle: string;
  /** Regiones en las que este producto está disponible. Si solo EU, aparece en /eu/* */
  availableIn: readonly Region[];
  slugs: Record<Locale, string>;
  names: Record<Locale, { main: string; accent?: string; full: string }>;
  subtitles: Record<Locale, string>;
  ingredients: string[];
  basePriceEUR: number;
  basePriceGBP: number;
  formats: string[];
  category: Record<Locale, string>;
}

// Nota: los precios finales siempre vienen de Shopify (fuente única de verdad).
// Estos son de fallback/preview para cuando Shopify no responde.

export const rituales: Ritual[] = [
  // ───── COSMÉTICA ─────
  {
    id: 1, number: '01', line: 'cosmetica',
    shopifyHandle: 'ritual-plenitud',
    availableIn: ['eu', 'uk'],
    slugs: {
      es: 'plenitud-300', en: 'plenitude-300', fr: 'plenitude-300',
      de: 'fuelle-300', it: 'pienezza-300', nl: 'volheid-300', pt: 'plenitude-300',
    },
    names: {
      es: { main: 'Ritual', accent: 'Plenitud', full: 'Ritual Plenitud' },
      en: { main: 'Ritual', accent: 'Plenitude', full: 'Ritual Plenitude' },
      fr: { main: 'Rituel', accent: 'Plénitude', full: 'Rituel Plénitude' },
      de: { main: 'Ritual', accent: 'Fülle', full: 'Ritual Fülle' },
      it: { main: 'Rituale', accent: 'Pienezza', full: 'Rituale Pienezza' },
      nl: { main: 'Ritueel', accent: 'Volheid', full: 'Ritueel Volheid' },
      pt: { main: 'Ritual', accent: 'Plenitude', full: 'Ritual Plenitude' },
    },
    subtitles: {
      es: 'La rutina femenina completa con aceites de argán y oliva.',
      en: 'Body wash with colloidal oatmeal and aloe',
      fr: "Gel corporel à l'avoine colloïdale et aloès",
      de: 'Körperpflege mit kolloidalem Hafer und Aloe',
      it: "Gel corpo all'avena colloidale e aloe",
      nl: 'Douchegel met colloïdale haver en aloë',
      pt: 'Gel corporal com aveia coloidal e aloe',
    },
    ingredients: ['avena coloidal', 'aloe vera', 'manzanilla romana'],
    basePriceEUR: 34.9, basePriceGBP: 30.01,
    formats: ['300ml', '1L', '5L'],
    category: {
      es: 'Cosmética básica', en: 'Basic skincare', fr: 'Soin de base',
      de: 'Basispflege', it: 'Cosmetica base', nl: 'Basisverzorging', pt: 'Cosmética básica',
    },
  },
  {
    id: 2, number: '02', line: 'cosmetica',
    shopifyHandle: 'ritual-ducha-perfecta',
    availableIn: ['eu', 'uk'],
    slugs: {
      es: 'ducha-perfecta-300', en: 'perfect-shower-300', fr: 'douche-parfaite-300',
      de: 'perfekte-dusche-300', it: 'doccia-perfetta-300', nl: 'perfecte-douche-300', pt: 'duche-perfeito-300',
    },
    names: {
      es: { main: 'Ritual', accent: 'Ducha Perfecta', full: 'Ritual Ducha Perfecta' },
      en: { main: 'Ritual', accent: 'Perfect Shower', full: 'Ritual Perfect Shower' },
      fr: { main: 'Rituel', accent: 'Douche Parfaite', full: 'Rituel Douche Parfaite' },
      de: { main: 'Ritual', accent: 'Perfekte Dusche', full: 'Ritual Perfekte Dusche' },
      it: { main: 'Rituale', accent: 'Doccia Perfetta', full: 'Rituale Doccia Perfetta' },
      nl: { main: 'Ritueel', accent: 'Perfecte Douche', full: 'Ritueel Perfecte Douche' },
      pt: { main: 'Ritual', accent: 'Duche Perfeito', full: 'Ritual Duche Perfeito' },
    },
    subtitles: {
      es: 'La ducha completa con ingredientes de origen natural, de cabeza a pies.',
      en: 'Shower gel with rosemary and lavender',
      fr: 'Gel douche au romarin et lavande',
      de: 'Duschgel mit Rosmarin und Lavendel',
      it: 'Doccia schiuma con rosmarino e lavanda',
      nl: 'Douchegel met rozemarijn en lavendel',
      pt: 'Gel de duche com alecrim e lavanda',
    },
    ingredients: ['romero', 'lavanda'],
    basePriceEUR: 26.5, basePriceGBP: 22.79,
    formats: ['300ml', '1L'],
    category: {
      es: 'Cosmética básica', en: 'Basic skincare', fr: 'Soin de base',
      de: 'Basispflege', it: 'Cosmetica base', nl: 'Basisverzorging', pt: 'Cosmética básica',
    },
  },
  {
    id: 3, number: '03', line: 'cosmetica',
    shopifyHandle: 'ritual-rendimiento',
    availableIn: ['eu'],
    slugs: {
      es: 'rendimiento-300', en: 'performance-300', fr: 'performance-300',
      de: 'leistung-300', it: 'rendimento-300', nl: 'prestatie-300', pt: 'rendimento-300',
    },
    names: {
      es: { main: 'Ritual', accent: 'Rendimiento', full: 'Ritual Rendimiento' },
      en: { main: 'Ritual', accent: 'Performance', full: 'Ritual Performance' },
      fr: { main: 'Rituel', accent: 'Performance', full: 'Rituel Performance' },
      de: { main: 'Ritual', accent: 'Leistung', full: 'Ritual Leistung' },
      it: { main: 'Rituale', accent: 'Rendimento', full: 'Rituale Rendimento' },
      nl: { main: 'Ritueel', accent: 'Prestatie', full: 'Ritueel Prestatie' },
      pt: { main: 'Ritual', accent: 'Rendimento', full: 'Ritual Rendimento' },
    },
    subtitles: {
      es: 'El ritual del hombre activo: eficaz, rápido y de origen natural.',
      en: 'Activating gel with mint and caffeine',
      fr: 'Gel tonifiant à la menthe et caféine',
      de: 'Aktivierendes Gel mit Minze und Koffein',
      it: 'Gel attivante con menta e caffeina',
      nl: 'Activerende gel met munt en cafeïne',
      pt: 'Gel ativante com menta e cafeína',
    },
    ingredients: ['menta', 'eucalipto', 'cafeína'],
    basePriceEUR: 18.0, basePriceGBP: 15.48,
    formats: ['300ml', '1L'],
    category: {
      es: 'Cosmética básica', en: 'Basic skincare', fr: 'Soin de base',
      de: 'Basispflege', it: 'Cosmetica base', nl: 'Basisverzorging', pt: 'Cosmética básica',
    },
  },
  {
    id: 4, number: '04', line: 'cosmetica',
    shopifyHandle: 'ritual-para-el',
    availableIn: ['eu', 'uk'],
    slugs: {
      es: 'para-el', en: 'for-him', fr: 'pour-lui',
      de: 'fuer-ihn', it: 'per-lui', nl: 'voor-hem', pt: 'para-ele',
    },
    names: {
      es: { main: 'Ritual', accent: 'para Él', full: 'Ritual para Él' },
      en: { main: 'Ritual', accent: 'for Him', full: 'Ritual for Him' },
      fr: { main: 'Rituel', accent: 'pour Lui', full: 'Rituel pour Lui' },
      de: { main: 'Ritual', accent: 'für Ihn', full: 'Ritual für Ihn' },
      it: { main: 'Rituale', accent: 'per Lui', full: 'Rituale per Lui' },
      nl: { main: 'Ritueel', accent: 'voor Hem', full: 'Ritueel voor Hem' },
      pt: { main: 'Ritual', accent: 'para Ele', full: 'Ritual para Ele' },
    },
    subtitles: {
      es: 'La rutina masculina completa: cuatro pasos, cero compromisos.',
      en: "Complete men's skincare",
      fr: 'Cosmétique homme complète',
      de: 'Komplette Herrenpflege',
      it: 'Cosmetica uomo completa',
      nl: 'Volledige herenverzorging',
      pt: 'Cosmética masculina completa',
    },
    ingredients: ['cedro', 'vetiver', 'bergamota'],
    basePriceEUR: 31.0, basePriceGBP: 26.66,
    formats: ['300ml', '1L'],
    category: {
      es: 'Cosmética masculina', en: "Men's skincare", fr: 'Cosmétique homme',
      de: 'Herrenpflege', it: 'Cosmetica uomo', nl: 'Herenverzorging', pt: 'Cosmética masculina',
    },
  },
  {
    id: 5, number: '05', line: 'cosmetica',
    shopifyHandle: 'ritual-para-ella',
    availableIn: ['eu', 'uk'],
    slugs: {
      es: 'para-ella', en: 'for-her', fr: 'pour-elle',
      de: 'fuer-sie', it: 'per-lei', nl: 'voor-haar', pt: 'para-ela',
    },
    names: {
      es: { main: 'Ritual', accent: 'para Ella', full: 'Ritual para Ella' },
      en: { main: 'Ritual', accent: 'for Her', full: 'Ritual for Her' },
      fr: { main: 'Rituel', accent: 'pour Elle', full: 'Rituel pour Elle' },
      de: { main: 'Ritual', accent: 'für Sie', full: 'Ritual für Sie' },
      it: { main: 'Rituale', accent: 'per Lei', full: 'Rituale per Lei' },
      nl: { main: 'Ritueel', accent: 'voor Haar', full: 'Ritueel voor Haar' },
      pt: { main: 'Ritual', accent: 'para Ela', full: 'Ritual para Ela' },
    },
    subtitles: {
      es: 'Cuatro productos, una sola filosofía: cuidado femenino natural de pies a cabeza.',
      en: "Complete women's skincare",
      fr: 'Cosmétique femme complète',
      de: 'Komplette Damenpflege',
      it: 'Cosmetica donna completa',
      nl: 'Volledige damesverzorging',
      pt: 'Cosmética feminina completa',
    },
    ingredients: ['rosa mosqueta', 'jazmín', 'argán'],
    basePriceEUR: 31.0, basePriceGBP: 26.66,
    formats: ['300ml', '1L'],
    category: {
      es: 'Cosmética mujer', en: "Women's skincare", fr: 'Cosmétique femme',
      de: 'Damenpflege', it: 'Cosmetica donna', nl: 'Damesverzorging', pt: 'Cosmética feminina',
    },
  },
  // ───── HOGAR ─────
  {
    id: 6, number: '06', line: 'hogar',
    shopifyHandle: 'ritual-refugio',
    availableIn: ['eu'],
    slugs: {
      es: 'refugio', en: 'shelter', fr: 'refuge',
      de: 'zuflucht', it: 'rifugio', nl: 'toevlucht', pt: 'refugio',
    },
    names: {
      es: { main: 'Ritual', accent: 'Refugio', full: 'Ritual Refugio' },
      en: { main: 'Ritual', accent: 'Shelter', full: 'Ritual Shelter' },
      fr: { main: 'Rituel', accent: 'Refuge', full: 'Rituel Refuge' },
      de: { main: 'Ritual', accent: 'Zuflucht', full: 'Ritual Zuflucht' },
      it: { main: 'Rituale', accent: 'Rifugio', full: 'Rituale Rifugio' },
      nl: { main: 'Ritueel', accent: 'Toevlucht', full: 'Ritueel Toevlucht' },
      pt: { main: 'Ritual', accent: 'Refúgio', full: 'Ritual Refúgio' },
    },
    subtitles: {
      es: 'Brillo limpio en todo el hogar, sin químicos agresivos.',
      en: 'Multi-surface cleaner with lemon and thyme',
      fr: 'Nettoyant multi-surfaces au citron et thym',
      de: 'Allzweckreiniger mit Zitrone und Thymian',
      it: 'Detergente multi-superficie con limone e timo',
      nl: 'Multi-oppervlakte reiniger met citroen en tijm',
      pt: 'Limpador multi-superfície com limão e tomilho',
    },
    ingredients: ['limón', 'tomillo'],
    basePriceEUR: 11.0, basePriceGBP: 9.46,
    formats: ['1L', '5L'],
    category: {
      es: 'Cuidado del hogar', en: 'Home care', fr: 'Entretien de la maison',
      de: 'Haushaltspflege', it: 'Cura della casa', nl: 'Huisverzorging', pt: 'Cuidado da casa',
    },
  },
  {
    id: 7, number: '07', line: 'hogar',
    shopifyHandle: 'ritual-cocina-impecable',
    availableIn: ['eu'],
    slugs: {
      es: 'cocina-impecable', en: 'flawless-kitchen', fr: 'cuisine-impeccable',
      de: 'makellose-kueche', it: 'cucina-impeccabile', nl: 'onberispelijke-keuken', pt: 'cozinha-impecavel',
    },
    names: {
      es: { main: 'Cocina', accent: 'Impecable', full: 'Cocina Impecable' },
      en: { main: 'Flawless', accent: 'Kitchen', full: 'Flawless Kitchen' },
      fr: { main: 'Cuisine', accent: 'Impeccable', full: 'Cuisine Impeccable' },
      de: { main: 'Makellose', accent: 'Küche', full: 'Makellose Küche' },
      it: { main: 'Cucina', accent: 'Impeccabile', full: 'Cucina Impeccabile' },
      nl: { main: 'Onberispelijke', accent: 'Keuken', full: 'Onberispelijke Keuken' },
      pt: { main: 'Cozinha', accent: 'Impecável', full: 'Cozinha Impecável' },
    },
    subtitles: {
      es: 'La cocina impecable de dentro a fuera, con ingredientes de origen natural.',
      en: 'Degreaser with baking soda and citric',
      fr: 'Dégraissant au bicarbonate et citrique',
      de: 'Entfetter mit Natron und Zitronensäure',
      it: 'Sgrassante con bicarbonato e citrico',
      nl: 'Ontvetter met zuiveringszout en citroen',
      pt: 'Desengordurante com bicarbonato e cítrico',
    },
    ingredients: ['bicarbonato', 'ácido cítrico'],
    basePriceEUR: 20.9, basePriceGBP: 17.97,
    formats: ['1L', '5L'],
    category: {
      es: 'Cuidado del hogar', en: 'Home care', fr: 'Entretien de la maison',
      de: 'Haushaltspflege', it: 'Cura della casa', nl: 'Huisverzorging', pt: 'Cuidado da casa',
    },
  },
  {
    id: 8, number: '08', line: 'hogar',
    shopifyHandle: 'ritual-vajilla-perfecta',
    availableIn: ['eu'],
    slugs: {
      es: 'vajilla-perfecta', en: 'perfect-dishware', fr: 'vaisselle-parfaite',
      de: 'perfektes-geschirr', it: 'stoviglie-perfette', nl: 'perfect-servies', pt: 'louca-perfeita',
    },
    names: {
      es: { main: 'Vajilla', accent: 'Perfecta', full: 'Vajilla Perfecta' },
      en: { main: 'Perfect', accent: 'Dishware', full: 'Perfect Dishware' },
      fr: { main: 'Vaisselle', accent: 'Parfaite', full: 'Vaisselle Parfaite' },
      de: { main: 'Perfektes', accent: 'Geschirr', full: 'Perfektes Geschirr' },
      it: { main: 'Stoviglie', accent: 'Perfette', full: 'Stoviglie Perfette' },
      nl: { main: 'Perfect', accent: 'Servies', full: 'Perfect Servies' },
      pt: { main: 'Louça', accent: 'Perfeita', full: 'Louça Perfeita' },
    },
    subtitles: {
      es: 'El baño que brilla sin esfuerzo. Ambos 96-99% de origen natural.',
      en: 'Hand dish soap with plant surfactants',
      fr: 'Liquide vaisselle aux tensioactifs végétaux',
      de: 'Handspülmittel mit pflanzlichen Tensiden',
      it: 'Detersivo piatti con tensioattivi vegetali',
      nl: 'Afwasmiddel met plantaardige surfactanten',
      pt: 'Lava-louça com tensioativos vegetais',
    },
    ingredients: ['limón', 'tensioactivos vegetales'],
    basePriceEUR: 16.7, basePriceGBP: 14.36,
    formats: ['1L', '5L'],
    category: {
      es: 'Cuidado del hogar', en: 'Home care', fr: 'Entretien de la maison',
      de: 'Haushaltspflege', it: 'Cura della casa', nl: 'Huisverzorging', pt: 'Cuidado da casa',
    },
  },
  {
    id: 9, number: '09', line: 'hogar',
    shopifyHandle: 'ritual-caricia',
    availableIn: ['eu'],
    slugs: {
      es: 'caricia', en: 'caress', fr: 'caresse',
      de: 'liebkosung', it: 'carezza', nl: 'streling', pt: 'caricia',
    },
    names: {
      es: { main: 'Ritual', accent: 'Caricia', full: 'Ritual Caricia' },
      en: { main: 'Ritual', accent: 'Caress', full: 'Ritual Caress' },
      fr: { main: 'Rituel', accent: 'Caresse', full: 'Rituel Caresse' },
      de: { main: 'Ritual', accent: 'Liebkosung', full: 'Ritual Liebkosung' },
      it: { main: 'Rituale', accent: 'Carezza', full: 'Rituale Carezza' },
      nl: { main: 'Ritueel', accent: 'Streling', full: 'Ritueel Streling' },
      pt: { main: 'Ritual', accent: 'Carícia', full: 'Ritual Carícia' },
    },
    subtitles: {
      es: 'La colada que limpia, suaviza y deja en la ropa un aroma que abraza.',
      en: 'Laundry detergent with Marseille soap and lavender',
      fr: 'Lessive textile au savon de Marseille et lavande',
      de: 'Textilwaschmittel mit Marseiller Seife und Lavendel',
      it: 'Detersivo tessuti con sapone di Marsiglia e lavanda',
      nl: 'Textielwasmiddel met Marseille-zeep en lavendel',
      pt: 'Detergente têxtil com sabão de Marselha e lavanda',
    },
    ingredients: ['jabón de Marsella', 'lavanda'],
    basePriceEUR: 18.0, basePriceGBP: 15.48,
    formats: ['1L', '5L'],
    category: {
      es: 'Cuidado del hogar', en: 'Home care', fr: 'Entretien de la maison',
      de: 'Haushaltspflege', it: 'Cura della casa', nl: 'Huisverzorging', pt: 'Cuidado da casa',
    },
  },
  // ───── MASCOTA ─────
  {
    id: 10, number: '10', line: 'mascota',
    shopifyHandle: 'ritual-mimo-canino',
    availableIn: ['eu', 'uk'],
    slugs: {
      es: 'mimo-canino', en: 'canine-care', fr: 'soin-canin',
      de: 'hundepflege', it: 'coccola-canina', nl: 'hondenverzorging', pt: 'mimo-canino',
    },
    names: {
      es: { main: 'Mimo', accent: 'Canino', full: 'Mimo Canino' },
      en: { main: 'Canine', accent: 'Care', full: 'Canine Care' },
      fr: { main: 'Soin', accent: 'Canin', full: 'Soin Canin' },
      de: { main: 'Hundepflege', full: 'Hundepflege' },
      it: { main: 'Coccola', accent: 'Canina', full: 'Coccola Canina' },
      nl: { main: 'Honden', accent: 'Verzorging', full: 'Honden Verzorging' },
      pt: { main: 'Mimo', accent: 'Canino', full: 'Mimo Canino' },
    },
    subtitles: {
      es: 'El cuidado completo para tu perro, de cabeza a orejas.',
      en: 'Dog shampoo with colloidal oatmeal and calendula',
      fr: "Shampoing pour chien à l'avoine et calendula",
      de: 'Hundeshampoo mit Hafer und Ringelblume',
      it: 'Shampoo per cani con avena e calendula',
      nl: 'Hondenshampoo met haver en calendula',
      pt: 'Champô para cão com aveia e calêndula',
    },
    ingredients: ['avena coloidal', 'caléndula'],
    basePriceEUR: 22.2, basePriceGBP: 19.09,
    formats: ['300ml', '1L'],
    category: {
      es: 'Cuidado de la mascota', en: 'Pet care', fr: 'Soin des animaux',
      de: 'Haustierpflege', it: 'Cura degli animali', nl: 'Huisdierverzorging', pt: 'Cuidado do animal',
    },
  },
  {
    id: 11, number: '11', line: 'mascota',
    shopifyHandle: 'ritual-gato-zen',
    availableIn: ['eu'],
    slugs: {
      es: 'gato-zen', en: 'zen-cat', fr: 'chat-zen',
      de: 'zen-katze', it: 'gatto-zen', nl: 'zen-kat', pt: 'gato-zen',
    },
    names: {
      es: { main: 'Gato', accent: 'Zen', full: 'Gato Zen' },
      en: { main: 'Zen', accent: 'Cat', full: 'Zen Cat' },
      fr: { main: 'Chat', accent: 'Zen', full: 'Chat Zen' },
      de: { main: 'Zen', accent: 'Katze', full: 'Zen Katze' },
      it: { main: 'Gatto', accent: 'Zen', full: 'Gatto Zen' },
      nl: { main: 'Zen', accent: 'Kat', full: 'Zen Kat' },
      pt: { main: 'Gato', accent: 'Zen', full: 'Gato Zen' },
    },
    subtitles: {
      es: 'El ritual tranquilo para el gato que lo merece todo.',
      en: 'Rinse-free feline care with valerian',
      fr: 'Soin félin sans rinçage à la valériane',
      de: 'Auswaschfreie Katzenpflege mit Baldrian',
      it: 'Cura felina senza risciacquo con valeriana',
      nl: 'Uitspoelvrije kattenverzorging met valeriaan',
      pt: 'Cuidado felino sem enxaguamento com valeriana',
    },
    ingredients: ['valeriana', 'manzanilla'],
    basePriceEUR: 22.2, basePriceGBP: 19.09,
    formats: ['300ml'],
    category: {
      es: 'Cuidado de la mascota', en: 'Pet care', fr: 'Soin des animaux',
      de: 'Haustierpflege', it: 'Cura degli animali', nl: 'Huisdierverzorging', pt: 'Cuidado do animal',
    },
  },
];

export const getRitualBySlug = (slug: string, locale: Locale): Ritual | undefined =>
  rituales.find((r) => r.slugs[locale] === slug);

export const getRitualsByLineAndRegion = (line: RitualLine, region: Region): Ritual[] =>
  rituales.filter((r) => r.line === line && r.availableIn.includes(region));

export const getRitualsByRegion = (region: Region): Ritual[] =>
  rituales.filter((r) => r.availableIn.includes(region));
