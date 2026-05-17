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
      es: 'plenitud-300', en: 'fulfillment-300', fr: 'plenitude-300',
      de: 'fuelle-300', it: 'pienezza-300', nl: 'volheid-300', pt: 'plenitude-300',
    },
    names: {
      es: { main: 'Ritual', accent: 'Plenitud', full: 'Ritual Plenitud' },
      en: { main: 'Ritual', accent: 'Wholeness', full: 'Ritual Wholeness' },
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
    basePriceEUR: 24.6, basePriceGBP: 21.14,
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
    basePriceEUR: 18.8, basePriceGBP: 16.17,
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
      de: 'leistung-300', it: 'rendimento-300', nl: 'performance-300', pt: 'desempenho-300',
    },
    names: {
      es: { main: 'Ritual', accent: 'Rendimiento', full: 'Ritual Rendimiento' },
      en: { main: 'Ritual', accent: 'Performance', full: 'Ritual Performance' },
      fr: { main: 'Rituel', accent: 'Performance', full: 'Rituel Performance' },
      de: { main: 'Ritual', accent: 'Leistung', full: 'Ritual Leistung' },
      it: { main: 'Rituale', accent: 'Rendimento', full: 'Rituale Rendimento' },
      nl: { main: 'Ritueel', accent: 'Performance', full: 'Ritueel Performance' },
      pt: { main: 'Ritual', accent: 'Desempenho', full: 'Ritual Desempenho' },
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
    basePriceEUR: 13.4, basePriceGBP: 11.52,
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
      es: { main: 'Ritual', accent: 'Para Él', full: 'Ritual Para Él' },
      en: { main: 'Ritual', accent: 'for Him', full: 'Ritual for Him' },
      fr: { main: 'Rituel', accent: 'Pour Lui', full: 'Rituel Pour Lui' },
      de: { main: 'Ritual', accent: 'für Ihn', full: 'Ritual für Ihn' },
      it: { main: 'Rituale', accent: 'Per Lui', full: 'Rituale Per Lui' },
      nl: { main: 'Ritueel', accent: 'Voor Hem', full: 'Ritueel Voor Hem' },
      pt: { main: 'Ritual', accent: 'Para Ele', full: 'Ritual Para Ele' },
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
    basePriceEUR: 31.3, basePriceGBP: 26.92,
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
      es: { main: 'Ritual', accent: 'Para Ella', full: 'Ritual Para Ella' },
      en: { main: 'Ritual', accent: 'for Her', full: 'Ritual for Her' },
      fr: { main: 'Rituel', accent: 'Pour Elle', full: 'Rituel Pour Elle' },
      de: { main: 'Ritual', accent: 'für Sie', full: 'Ritual für Sie' },
      it: { main: 'Rituale', accent: 'Per Lei', full: 'Rituale Per Lei' },
      nl: { main: 'Ritueel', accent: 'Voor Haar', full: 'Ritueel Voor Haar' },
      pt: { main: 'Ritual', accent: 'Para Ela', full: 'Ritual Para Ela' },
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
    basePriceEUR: 31.3, basePriceGBP: 26.92,
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
      en: { main: 'Ritual', accent: 'Sanctuary', full: 'Ritual Sanctuary' },
      fr: { main: 'Ritual', accent: 'Refuge', full: 'Ritual Refuge' },
      de: { main: 'Ritual', accent: 'Geborgenheit', full: 'Ritual Geborgenheit' },
      it: { main: 'Ritual', accent: 'Rifugio', full: 'Ritual Rifugio' },
      nl: { main: 'Ritual', accent: 'Toevlucht', full: 'Ritual Toevlucht' },
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
    basePriceEUR: 16.2, basePriceGBP: 13.93,
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
      es: 'cocina-impecable', en: 'impeccable-kitchen', fr: 'cuisine-impeccable',
      de: 'makellose-kueche', it: 'cucina-impeccabile', nl: 'onberispelijke-keuken', pt: 'cozinha-impecavel',
    },
    names: {
      es: { main: 'Ritual', accent: 'Cocina Impecable', full: 'Ritual Cocina Impecable' },
      en: { main: 'Ritual', accent: 'Impeccable Kitchen', full: 'Ritual Impeccable Kitchen' },
      fr: { main: 'Rituel', accent: 'Cuisine Impeccable', full: 'Rituel Cuisine Impeccable' },
      de: { main: 'Ritual', accent: 'Makellose Küche', full: 'Ritual Makellose Küche' },
      it: { main: 'Rituale', accent: 'Cucina Impeccabile', full: 'Rituale Cucina Impeccabile' },
      nl: { main: 'Ritueel', accent: 'Onberispelijke Keuken', full: 'Ritueel Onberispelijke Keuken' },
      pt: { main: 'Ritual', accent: 'Cozinha Impecável', full: 'Ritual Cozinha Impecável' },
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
    basePriceEUR: 15.5, basePriceGBP: 13.33,
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
      es: 'vajilla-perfecta', en: 'perfect-dishes', fr: 'vaisselle-parfaite',
      de: 'perfektes-geschirr', it: 'stoviglie-perfette', nl: 'perfecte-vaat', pt: 'loica-perfeita',
    },
    names: {
      es: { main: 'Ritual', accent: 'Vajilla Perfecta', full: 'Ritual Vajilla Perfecta' },
      en: { main: 'Ritual', accent: 'Perfect Dishes', full: 'Ritual Perfect Dishes' },
      fr: { main: 'Rituel', accent: 'Vaisselle Parfaite', full: 'Rituel Vaisselle Parfaite' },
      de: { main: 'Ritual', accent: 'Perfektes Geschirr', full: 'Ritual Perfektes Geschirr' },
      it: { main: 'Rituale', accent: 'Stoviglie Perfette', full: 'Rituale Stoviglie Perfette' },
      nl: { main: 'Ritueel', accent: 'Perfecte Vaat', full: 'Ritueel Perfecte Vaat' },
      pt: { main: 'Ritual', accent: 'Loiça Perfeita', full: 'Ritual Loiça Perfeita' },
    },
    subtitles: {
      es: 'Vajilla impecable, sin marcas de agua y con secado perfecto.',
      en: 'Hand dish soap with plant surfactants',
      fr: 'Liquide vaisselle aux tensioactifs végétaux',
      de: 'Handspülmittel mit pflanzlichen Tensiden',
      it: 'Detersivo piatti con tensioattivi vegetali',
      nl: 'Afwasmiddel met plantaardige surfactanten',
      pt: 'Lava-louça com tensioativos vegetais',
    },
    ingredients: ['limón', 'tensioactivos vegetales'],
    basePriceEUR: 12.3, basePriceGBP: 10.58,
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
      de: 'liebkosung', it: 'carezza', nl: 'liefkozing', pt: 'caricia',
    },
    names: {
      es: { main: 'Ritual', accent: 'Caricia', full: 'Ritual Caricia' },
      en: { main: 'Ritual', accent: 'Caress', full: 'Ritual Caress' },
      fr: { main: 'Rituel', accent: 'Caresse', full: 'Rituel Caresse' },
      de: { main: 'Ritual', accent: 'Liebkosung', full: 'Ritual Liebkosung' },
      it: { main: 'Rituale', accent: 'Carezza', full: 'Rituale Carezza' },
      nl: { main: 'Ritueel', accent: 'Liefkozing', full: 'Ritueel Liefkozing' },
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
    basePriceEUR: 13.8, basePriceGBP: 11.87,
    formats: ['1L', '5L'],
    category: {
      es: 'Cuidado del hogar', en: 'Home care', fr: 'Entretien de la maison',
      de: 'Haushaltspflege', it: 'Cura della casa', nl: 'Huisverzorging', pt: 'Cuidado da casa',
    },
  },
  {
    id: 12, number: '12', line: 'hogar',
    shopifyHandle: 'pack-bano-esencial',
    availableIn: ['eu'],
    slugs: {
      es: 'bano-impecable', en: 'impeccable-bathroom', fr: 'salle-de-bain-impeccable',
      de: 'makelloses-bad', it: 'bagno-impeccabile', nl: 'onberispelijke-badkamer', pt: 'casa-de-banho-impecavel',
    },
    names: {
      es: { main: 'Ritual', accent: 'Baño Impecable', full: 'Ritual Baño Impecable' },
      en: { main: 'Ritual', accent: 'Impeccable Bathroom', full: 'Ritual Impeccable Bathroom' },
      fr: { main: 'Rituel', accent: 'Salle de Bain Impeccable', full: 'Rituel Salle de Bain Impeccable' },
      de: { main: 'Ritual', accent: 'Makelloses Bad', full: 'Ritual Makelloses Bad' },
      it: { main: 'Rituale', accent: 'Bagno Impeccabile', full: 'Rituale Bagno Impeccabile' },
      nl: { main: 'Ritueel', accent: 'Onberispelijke Badkamer', full: 'Ritueel Onberispelijke Badkamer' },
      pt: { main: 'Ritual', accent: 'Casa de Banho Impecável', full: 'Ritual Casa de Banho Impecável' },
    },
    subtitles: {
      es: 'El baño que brilla sin esfuerzo. Ambos 96-99% de origen natural.',
      en: 'Bathroom cleaner and streak-free glass cleaner. Both 96-99% natural origin.',
      fr: 'Nettoyant salle de bain et nettoyant vitres sans traces. 96-99% de naturalité.',
      de: 'Badreiniger und streifenfreier Glasreiniger. Beide 96-99% natürlichen Ursprungs.',
      it: 'Detergente bagno e pulisci vetri senza aloni. Entrambi 96-99% di origine naturale.',
      nl: 'Badreiniger en streepvrije glasreiniger. Beide 96-99% van natuurlijke oorsprong.',
      pt: 'Limpador de casa de banho e limpa-vidros sem marcas. Ambos 96-99% de origem natural.',
    },
    ingredients: ['ácido cítrico', 'extractos herbales'],
    basePriceEUR: 11.0, basePriceGBP: 9.46,
    formats: ['1L'],
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
      es: 'mimo-canino', en: 'pampered-pup', fr: 'cocoon-canin',
      de: 'hundeverwoehnung', it: 'coccole-canine', nl: 'verwende-hond', pt: 'mimo-canino',
    },
    names: {
      es: { main: 'Ritual', accent: 'Mimo Canino', full: 'Ritual Mimo Canino' },
      en: { main: 'Ritual', accent: 'Pampered Pup', full: 'Ritual Pampered Pup' },
      fr: { main: 'Rituel', accent: 'Cocoon Canin', full: 'Rituel Cocoon Canin' },
      de: { main: 'Hundepflege', full: 'Hundepflege' },
      it: { main: 'Rituale', accent: 'Coccole Canine', full: 'Rituale Coccole Canine' },
      nl: { main: 'Ritueel', accent: 'Verwende Hond', full: 'Ritueel Verwende Hond' },
      pt: { main: 'Ritual', accent: 'Mimo Canino', full: 'Ritual Mimo Canino' },
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
    basePriceEUR: 15.7, basePriceGBP: 13.5,
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
      es: { main: 'Ritual', accent: 'Gato Zen', full: 'Ritual Gato Zen' },
      en: { main: 'Ritual', accent: 'Zen Cat', full: 'Ritual Zen Cat' },
      fr: { main: 'Rituel', accent: 'Chat Zen', full: 'Rituel Chat Zen' },
      de: { main: 'Ritual', accent: 'Hundeverwöhnung', full: 'Ritual Hundeverwöhnung' },
      it: { main: 'Rituale', accent: 'Gatto Zen', full: 'Rituale Gatto Zen' },
      nl: { main: 'Ritueel', accent: 'Zen Kat', full: 'Ritueel Zen Kat' },
      pt: { main: 'Ritual', accent: 'Gato Zen', full: 'Ritual Gato Zen' },
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
    basePriceEUR: 15.7, basePriceGBP: 13.5,
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
