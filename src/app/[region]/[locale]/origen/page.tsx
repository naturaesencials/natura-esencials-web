import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import type { Locale, Region } from '@/lib/i18n/config';

interface Props { params: Promise<{ region: Region; locale: Locale }>; }

const META_DESC: Record<string, string> = {
  es: 'Natura Esencials nace en Marbella en 2021. Formulamos a mano con materias primas locales bajo ISO 16128.',
  en: 'Natura Esencials was founded in Marbella in 2021. We handcraft our products using local ingredients under ISO 16128 protocol.',
  fr: 'Natura Esencials est née à Marbella en 2021. Nous formulons à la main avec des matières premières locales selon ISO 16128.',
  de: 'Natura Esencials wurde 2021 in Marbella gegründet. Wir formulieren handwerklich mit lokalen Zutaten nach ISO 16128. Handwerk aus Andalusien.',
  it: 'Natura Esencials nasce a Marbella nel 2021. Formuliamo a mano con materie prime locali secondo il protocollo ISO 16128. Artigianato dell\'Andalusia.',
  nl: 'Natura Esencials is opgericht in Marbella in 2021. We formuleren met de hand met lokale grondstoffen volgens ISO 16128. Ambacht uit Andalusië.',
  pt: 'A Natura Esencials nasce em Marbella em 2021. Formulamos à mão com matérias-primas locais sob protocolo ISO 16128. Artesanato da Andaluzia.',
};

const IMG_ALT: Record<string, string> = {
  es: 'Ingredientes naturales en el taller de Natura Esencials, Marbella',
  en: 'Natural ingredients at the Natura Esencials workshop, Marbella',
  fr: 'Ingrédients naturels dans l\'atelier Natura Esencials, Marbella',
  de: 'Natürliche Zutaten in der Natura Esencials Werkstatt, Marbella',
  it: 'Ingredienti naturali nel laboratorio Natura Esencials, Marbella',
  nl: 'Natuurlijke ingrediënten in het atelier van Natura Esencials, Marbella',
  pt: 'Ingredientes naturais na oficina da Natura Esencials, Marbella',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale } = await params;
  return buildMetadata({
    title: ({"es": "Nuestro origen", "en": "Our Origin", "fr": "Notre origine", "de": "Unser Ursprung", "it": "La nostra origine", "nl": "Onze oorsprong", "pt": "A nossa origem"} as Record<string, string>)[locale] ?? 'Origen',
    description: META_DESC[locale] ?? META_DESC.es,
    region, locale, noIndex: region === "uk", path: 'origen',
  });
}

const C: Record<string, {
  kicker: string; h1a: string; h1b: string; body0: string;
  s1t: string; s1b: string; s2t: string; s2b: string;
  s3t: string; s3b: string; s4t: string; s4b: string; s5t: string; s5b: string;
  vTitle: string; v: Array<{icon:string;label:string;desc:string}>;
}> = {
  es: {
    kicker: 'Marbella · Andalucía · desde 2021',
    h1a: 'Hecho a mano,', h1b: 'con criterio.',
    body0: 'Natura Esencials nace en Marbella — hecha a mano, con criterio: los productos de cuidado personal y del hogar pueden ser naturales, eficaces y fabricados cerca de ti.',
    s1t: 'Quiénes somos',
    s1b: 'Somos un obrador artesanal en el corazón de la Costa del Sol. Desde 2021 formulamos y fabricamos nuestros productos de cosmética natural y limpieza del hogar en nuestro taller de Marbella. Cada lote se elabora manualmente siguiendo fichas técnicas propias y protocolos de calidad exigentes. No somos una marca de distribución: fabricamos lo que vendemos.',
    s2t: 'Cómo fabricamos',
    s2b: 'Nuestros productos se formulan bajo protocolo ISO 16128, el estándar internacional que define el porcentaje real de ingredientes naturales. La mayoría de nuestra gama supera el 95 % de naturalidad. Todos nuestros cosméticos son testados dermatológicamente antes de salir al mercado. El proceso va de la materia prima al etiquetado, pasando por la formulación, el control de pH, la estabilidad y el envasado. Sin atajos.',
    s3t: 'Nuestros ingredientes',
    s3b: 'Trabajamos con proveedores locales y nacionales seleccionados por su calidad y trazabilidad. Aceite de oliva virgen extra, aceite de argán, aloe vera, avena coloidal, lavanda, manzanilla, romero, limón de Málaga — ingredientes con nombre y origen concreto. No usamos parabenos, sulfatos agresivos ni colorantes artificiales. El envase es reciclable.',
    s4t: 'Nuestras líneas',
    s4b: 'Fabricamos tres líneas: Cosmética básica (champú, acondicionador, jabón, body milk, total body wash), Cuidado del hogar (detergentes, limpiasuelos, desengrasante, limpiacristales, limpiador de baños, multisuperficies) y Mascotas (champú y productos de higiene para perros y gatos). Todas comparten la misma filosofía: eficacia, naturalidad y seguridad.',
    s5t: 'Certificaciones',
    s5b: 'Contamos con el certificado ISO 16128 que acredita la naturalidad de nuestra formulación, el sello Artesanía Hecha en Andalucía, y todos nuestros cosméticos están testados dermatológicamente. Estamos inscritos en el Registro de Cosméticos de la UE (CPNP) y cumplimos con el Reglamento (CE) 1223/2009.',
    vTitle: 'Nuestros compromisos',
    v: [
      {icon:'🌿',label:'ISO 16128',desc:'>95% ingredientes naturales'},
      {icon:'🧴',label:'Testado',desc:'Dermatológicamente testado'},
      {icon:'SELLO',label:'Artesanal',desc:'Artesanía Hecha en Andalucía'},
      {icon:'♻️',label:'Envase',desc:'Packaging reciclable'},
      {icon:'📍',label:'Local',desc:'Proveedores locales y nacionales'},
      {icon:'🚫',label:'Sin',desc:'Sin parabenos ni sulfatos agresivos'},
    ],
  },
  en: {
    kicker: 'Marbella · Andalusia · since 2021',
    h1a: 'Handmade,', h1b: 'with purpose.',
    body0: 'Natura Esencials was born in Marbella — handmade, with purpose: personal care and home products can be natural, effective, and made close to you.',
    s1t: 'Who we are',
    s1b: 'We are an artisanal workshop in the heart of the Costa del Sol. Since 2021 we formulate and manufacture our natural cosmetics and home care products in our Marbella workshop. Each batch is made by hand following our own technical specifications and rigorous quality protocols. We are not a distribution brand — we make what we sell.',
    s2t: 'How we manufacture',
    s2b: 'Our products are formulated under ISO 16128 protocol, the international standard that defines the actual percentage of natural ingredients. Most of our range exceeds 95% naturalness. All our cosmetics are dermatologically tested before going to market. The process goes from raw material to labelling, through formulation, pH control, stability testing and packaging. No shortcuts.',
    s3t: 'Our ingredients',
    s3b: 'We work with carefully selected local and national suppliers. Extra virgin olive oil, argan oil, aloe vera, colloidal oatmeal, lavender, chamomile, rosemary, Málaga lemon — ingredients with a specific name and origin. No parabens, harsh sulphates or artificial colourants. Recyclable packaging.',
    s4t: 'Our lines',
    s4b: 'We produce three lines: Basic Cosmetics (shampoo, conditioner, hand & body soap, body milk, total body wash), Home Care (detergents, floor cleaner, degreaser, glass cleaner, bathroom cleaner, multi-surface) and Pets (shampoo and hygiene products for dogs and cats). All share the same philosophy: efficacy, naturalness and safety.',
    s5t: 'Certifications',
    s5b: 'We hold the ISO 16128 certificate, the Artisanal Craftsmanship Made in Andalusia seal, and all our cosmetics are dermatologically tested. We are registered in the EU Cosmetics Notification Portal (CPNP) in compliance with Regulation (EC) 1223/2009.',
    vTitle: 'Our commitments',
    v: [
      {icon:'🌿',label:'ISO 16128',desc:'>95% natural ingredients'},
      {icon:'🧴',label:'Tested',desc:'Dermatologically tested'},
      {icon:'SELLO',label:'Artisan',desc:'Craftsmanship Made in Andalusia'},
      {icon:'♻️',label:'Packaging',desc:'Recyclable packaging'},
      {icon:'📍',label:'Local',desc:'Local and national suppliers'},
      {icon:'🚫',label:'Free from',desc:'No parabens or harsh sulphates'},
    ],
  },
  fr: {
    kicker: 'Marbella · Andalousie · depuis 2021',
    h1a: 'Fait à la main,', h1b: 'avec exigence.',
    body0: 'Natura Esencials est née à Marbella — fait à la main, avec exigence : les produits de soin personnel et d\'entretien ménager peuvent être naturels, efficaces et fabriqués près de vous.',
    s1t: 'Qui sommes-nous',
    s1b: 'Nous sommes un atelier artisanal au cœur de la Costa del Sol. Depuis 2021, nous formulons et fabriquons nos propres produits de cosmétique naturelle et d\'entretien ménager dans notre atelier de Marbella. Chaque lot est élaboré à la main, selon nos propres fiches techniques et des protocoles de qualité rigoureux. Nous ne sommes pas une marque de distribution : nous fabriquons ce que nous vendons.',
    s2t: 'Comment nous fabriquons',
    s2b: 'Nos produits sont formulés selon le protocole ISO 16128, la norme internationale qui définit le pourcentage réel d\'ingrédients naturels. La majeure partie de notre gamme dépasse 95 % de naturalité. Tous nos cosmétiques sont testés dermatologiquement avant leur mise sur le marché. Le processus va de la matière première à l\'étiquetage, en passant par la formulation, le contrôle du pH, la stabilité et le conditionnement. Sans raccourcis.',
    s3t: 'Nos ingrédients',
    s3b: 'Nous travaillons avec des fournisseurs locaux et nationaux soigneusement sélectionnés. Huile d\'olive extra vierge, huile d\'argan, aloe vera, avoine colloïdale, lavande, camomille, romarin, citron de Málaga — des ingrédients au nom et à l\'origine précis. Sans parabènes, sans sulfates agressifs ni colorants artificiels. Emballage recyclable.',
    s4t: 'Nos lignes',
    s4b: 'Nous produisons trois lignes : Cosmétique de base (shampooing, après-shampooing, savon mains et corps, lait corporel, total body wash), Entretien ménager (détergents, nettoyant sols, dégraissant, nettoyant vitres, nettoyant salle de bains, multi-surfaces) et Animaux de compagnie (shampooing et produits d\'hygiène pour chiens et chats). Toutes partagent la même philosophie : efficacité, naturalité et sécurité.',
    s5t: 'Certifications',
    s5b: 'Nous détenons le certificat ISO 16128 attestant la naturalité de notre formulation, le label Artisanat Hecho en Andalucía, et tous nos cosmétiques sont testés dermatologiquement. Nous sommes enregistrés dans le portail de notification des cosmétiques de l\'UE (CPNP) conformément au règlement (CE) 1223/2009.',
    vTitle: 'Nos engagements',
    v: [
      {icon:'🌿',label:'ISO 16128',desc:'>95% ingrédients naturels'},
      {icon:'🧴',label:'Testé',desc:'Testé dermatologiquement'},
      {icon:'SELLO',label:'Artisanat',desc:'Artisanat Hecho en Andalucía'},
      {icon:'♻️',label:'Emballage',desc:'Emballage recyclable'},
      {icon:'📍',label:'Local',desc:'Fournisseurs locaux et nationaux'},
      {icon:'🚫',label:'Sans',desc:'Sans parabènes ni sulfates'},
    ],
  },
  de: {
    kicker: 'Marbella · Andalusien · seit 2021',
    h1a: 'Handgemacht,', h1b: 'mit Anspruch.',
    body0: 'Natura Esencials wurde in Marbella gegründet — handgemacht, mit Anspruch: Körperpflege- und Haushaltsprodukte können natürlich, wirksam und in Ihrer Nähe hergestellt werden. Das ist unser Ursprung.',
    s1t: 'Wer wir sind',
    s1b: 'Wir sind ein handwerklicher Betrieb im Herzen der Costa del Sol. Seit 2021 formulieren und produzieren wir unsere eigenen Naturkosmetik- und Haushaltsprodukte in unserer Werkstatt in Marbella. Jede Charge wird von Hand nach eigenen Rezepturen und strengen Qualitätsprotokollen hergestellt. Wir sind keine Handelsmarke — wir stellen her, was wir verkaufen.',
    s2t: 'Wie wir produzieren',
    s2b: 'Unsere Produkte werden nach dem ISO 16128 Protokoll formuliert, dem internationalen Standard für den tatsächlichen Anteil natürlicher Inhaltsstoffe. Der Großteil unserer Produktlinie überschreitet 95 % Natürlichkeit. Alle unsere Kosmetika werden vor der Markteinführung dermatologisch getestet. Der Prozess reicht von der Rohware bis zur Etikettierung, über Formulierung, pH-Kontrolle, Stabilitätsprüfung und Abfüllung. Ohne Abkürzungen.',
    s3t: 'Unsere Zutaten',
    s3b: 'Wir arbeiten mit sorgfältig ausgewählten lokalen und nationalen Lieferanten. Natives Olivenöl extra, Arganöl, Aloe vera, kolloidales Hafermehl, Lavendel, Kamille, Rosmarin, Málaga-Zitrone — Zutaten mit konkretem Namen und Herkunft. Ohne Parabene, aggressive Sulfate oder künstliche Farbstoffe. Recycelbare Verpackung.',
    s4t: 'Unsere Linien',
    s4b: 'Wir produzieren drei Linien: Basis-Kosmetik (Shampoo, Conditioner, Hand- & Körperseife, Körpermilch, Total Body Wash), Haushaltsreinigung (Waschmittel, Bodenreiniger, Entfetter, Glasreiniger, Badreiniger, Allzweckreiniger) und Haustiere (Shampoo und Hygieneprodukte für Hunde und Katzen). Alle teilen dieselbe Philosophie: Wirksamkeit, Natürlichkeit und Sicherheit.',
    s5t: 'Zertifizierungen',
    s5b: 'Wir verfügen über das ISO 16128 Zertifikat, das die Natürlichkeit unserer Formulierung bestätigt, das Gütesiegel Artesanía Hecha en Andalucía sowie dermatologisch getestete Kosmetika. Wir sind im EU-Kosmetik-Meldungsportal (CPNP) gemäß Verordnung (EG) 1223/2009 registriert.',
    vTitle: 'Unsere Verpflichtungen',
    v: [
      {icon:'🌿',label:'ISO 16128',desc:'>95% natürliche Inhaltsstoffe'},
      {icon:'🧴',label:'Getestet',desc:'Dermatologisch getestet'},
      {icon:'SELLO',label:'Handwerk',desc:'Artesanía Hecha en Andalucía'},
      {icon:'♻️',label:'Verpackung',desc:'Recycelbare Verpackung'},
      {icon:'📍',label:'Lokal',desc:'Lokale und nationale Lieferanten'},
      {icon:'🚫',label:'Ohne',desc:'Ohne Parabene und Sulfate'},
    ],
  },
  it: {
    kicker: 'Marbella · Andalusia · dal 2021',
    h1a: 'Fatto a mano,', h1b: 'con criterio.',
    body0: 'Natura Esencials nasce a Marbella — fatto a mano, con criterio: i prodotti di cura personale e per la casa possono essere naturali, efficaci e prodotti vicino a voi.',
    s1t: 'Chi siamo',
    s1b: 'Siamo un laboratorio artigianale nel cuore della Costa del Sol. Dal 2021 formuliamo e produciamo i nostri prodotti di cosmetica naturale e pulizia della casa nel nostro laboratorio di Marbella. Ogni lotto viene elaborato a mano, seguendo le nostre schede tecniche e protocolli di qualità rigorosi. Non siamo un marchio di distribuzione: fabbrichiamo ciò che vendiamo.',
    s2t: 'Come produciamo',
    s2b: 'I nostri prodotti sono formulati secondo il protocollo ISO 16128, lo standard internazionale che definisce la percentuale reale di ingredienti naturali. La maggior parte della nostra gamma supera il 95% di naturalità. Tutti i nostri cosmetici sono testati dermatologicamente prima di entrare nel mercato. Il processo va dalla materia prima all\'etichettatura, passando per la formulazione, il controllo del pH, la stabilità e il confezionamento. Senza scorciatoie.',
    s3t: 'I nostri ingredienti',
    s3b: 'Lavoriamo con fornitori locali e nazionali selezionati con cura. Olio d\'oliva extravergine, olio di argan, aloe vera, avena colloidale, lavanda, camomilla, rosmarino, limone di Málaga — ingredienti con nome e origine precisi. Senza parabeni, solfati aggressivi o coloranti artificiali. Imballaggio riciclabile.',
    s4t: 'Le nostre linee',
    s4b: 'Produciamo tre linee: Cosmetica di base (shampoo, balsamo, sapone mani e corpo, latte corpo, total body wash), Cura della casa (detersivi, detergente pavimenti, sgrassatore, pulisci vetri, detergente bagno, multiuso) e Animali domestici (shampoo e prodotti per l\'igiene di cani e gatti). Tutte condividono la stessa filosofia: efficacia, naturalità e sicurezza.',
    s5t: 'Certificazioni',
    s5b: 'Disponiamo del certificato ISO 16128 che attesta la naturalità della nostra formulazione, del sigillo Artesanía Hecha en Andalucía e tutti i nostri cosmetici sono testati dermatologicamente. Siamo registrati nel portale di notifica cosmetici dell\'UE (CPNP) in conformità con il regolamento (CE) 1223/2009.',
    vTitle: 'I nostri impegni',
    v: [
      {icon:'🌿',label:'ISO 16128',desc:'>95% ingredienti naturali'},
      {icon:'🧴',label:'Testato',desc:'Testato dermatologicamente'},
      {icon:'SELLO',label:'Artigianale',desc:'Artesanía Hecha en Andalucía'},
      {icon:'♻️',label:'Imballaggio',desc:'Imballaggio riciclabile'},
      {icon:'📍',label:'Locale',desc:'Fornitori locali e nazionali'},
      {icon:'🚫',label:'Senza',desc:'Senza parabeni né solfati'},
    ],
  },
  nl: {
    kicker: 'Marbella · Andalusië · sinds 2021',
    h1a: 'Met de hand gemaakt,', h1b: 'met visie.',
    body0: 'Natura Esencials is opgericht in Marbella vanuit een eenvoudige visie: persoonsverzorgings- en huishoudproducten kunnen natuurlijk, effectief en dicht bij u worden geproduceerd. Dat is onze oorsprong — met de hand gemaakt, met visie.',
    s1t: 'Wie we zijn',
    s1b: 'Wij zijn een ambachtelijk atelier in het hart van de Costa del Sol. Sinds 2021 formuleren en produceren we onze eigen natuurlijke cosmetica en huishoudproducten in ons atelier in Marbella. Elke batch wordt met de hand gemaakt, volgens onze eigen technische specificaties en strenge kwaliteitsprotocollen. Wij zijn geen distributiemerk — wij fabriceren wat we verkopen.',
    s2t: 'Hoe we produceren',
    s2b: 'Onze producten worden geformuleerd volgens het ISO 16128 protocol, de internationale norm die het werkelijke percentage natuurlijke ingrediënten definieert. Het grootste deel van ons assortiment overstijgt 95% natuurlijkheid. Alle cosmetica worden dermatologisch getest vóór markttoegang. Het proces gaat van grondstof tot etikettering, via formulering, pH-controle, stabiliteitstesten en verpakking. Zonder shortcuts.',
    s3t: 'Onze ingrediënten',
    s3b: 'We werken met zorgvuldig geselecteerde lokale en nationale leveranciers. Extra vergine olijfolie, arganolie, aloë vera, colloidale haver, lavendel, kamille, rozemarijn, citroen uit Málaga — ingrediënten met een concrete naam en herkomst. Zonder parabenen, agressieve sulfaten of kunstmatige kleurstoffen. Recyclebare verpakking.',
    s4t: 'Onze lijnen',
    s4b: 'We produceren drie lijnen: Basiscosmética (shampoo, conditioner, hand- en lichaamszeep, bodylotion, total body wash), Huishoudverzorging (wasmiddelen, vloerreiniger, ontvetter, glasreiniger, badreiniger, multireiniger) en Huisdieren (shampoo en hygiëneproducten voor honden en katten). Alle delen dezelfde filosofie: werkzaamheid, natuurlijkheid en veiligheid.',
    s5t: 'Certificeringen',
    s5b: 'Wij beschikken over het ISO 16128 certificaat dat de naturaliteit van onze formulering bevestigt, het keurmerk Artesanía Hecha en Andalucía en alle cosmetica zijn dermatologisch getest. Wij zijn geregistreerd in het EU-cosmeticameldingsportaal (CPNP) conform verordening (EG) 1223/2009.',
    vTitle: 'Onze toezeggingen',
    v: [
      {icon:'🌿',label:'ISO 16128',desc:'>95% natuurlijke ingrediënten'},
      {icon:'🧴',label:'Getest',desc:'Dermatologisch getest'},
      {icon:'SELLO',label:'Ambacht',desc:'Artesanía Hecha en Andalucía'},
      {icon:'♻️',label:'Verpakking',desc:'Recyclebare verpakking'},
      {icon:'📍',label:'Lokaal',desc:'Lokale en nationale leveranciers'},
      {icon:'🚫',label:'Zonder',desc:'Zonder parabenen en sulfaten'},
    ],
  },
  pt: {
    kicker: 'Marbella · Andaluzia · desde 2021',
    h1a: 'Feito à mão,', h1b: 'com critério.',
    body0: 'A Natura Esencials nasce em Marbella — feito à mão, com critério: os produtos de cuidado pessoal e do lar podem ser naturais, eficazes e fabricados perto de si.',
    s1t: 'Quem somos',
    s1b: 'Somos um atelier artesanal no coração da Costa del Sol. Desde 2021 formulamos e fabricamos os nossos próprios produtos de cosmética natural e limpeza do lar no nosso atelier de Marbella. Cada lote é elaborado manualmente, seguindo as nossas próprias fichas técnicas e protocolos de qualidade exigentes. Não somos uma marca de distribuição: fabricamos o que vendemos.',
    s2t: 'Como fabricamos',
    s2b: 'Os nossos produtos são formulados sob o protocolo ISO 16128, a norma internacional que define a percentagem real de ingredientes naturais. A maioria da nossa gama supera os 95% de naturalidade. Todos os nossos cosméticos são testados dermatologicamente antes de entrar no mercado. O processo vai da matéria-prima à rotulagem, passando pela formulação, controlo do pH, estabilidade e embalagem. Sem atalhos.',
    s3t: 'Os nossos ingredientes',
    s3b: 'Trabalhamos com fornecedores locais e nacionais selecionados com cuidado. Azeite virgem extra, óleo de argão, aloe vera, aveia coloidal, lavanda, camomila, alecrim, limão de Málaga — ingredientes com nome e origem concretos. Sem parabenos, sulfatos agressivos nem corantes artificiais. Embalagem reciclável.',
    s4t: 'As nossas linhas',
    s4b: 'Produzimos três linhas: Cosmética básica (champô, condicionador, sabão mãos e corpo, body milk, total body wash), Cuidado do lar (detergentes, limpador de pavimentos, desengordurante, limpa-vidros, limpador de casas de banho, multiusos) e Animais de estimação (champô e produtos de higiene para cães e gatos). Todas partilham a mesma filosofia: eficácia, naturalidade e segurança.',
    s5t: 'Certificações',
    s5b: 'Dispomos do certificado ISO 16128 que acredita a naturalidade da nossa formulação, do selo Artesanía Hecha en Andalucía e todos os nossos cosméticos são testados dermatologicamente. Estamos registados no Portal de Notificação de Cosméticos da UE (CPNP) em conformidade com o Regulamento (CE) 1223/2009.',
    vTitle: 'Os nossos compromissos',
    v: [
      {icon:'🌿',label:'ISO 16128',desc:'>95% ingredientes naturais'},
      {icon:'🧴',label:'Testado',desc:'Testado dermatologicamente'},
      {icon:'SELLO',label:'Artesanal',desc:'Artesanía Hecha en Andalucía'},
      {icon:'♻️',label:'Embalagem',desc:'Embalagem reciclável'},
      {icon:'📍',label:'Local',desc:'Fornecedores locais e nacionais'},
      {icon:'🚫',label:'Sem',desc:'Sem parabenos nem sulfatos'},
    ],
  },
};

function gc(locale: Locale) { return C[locale] ?? C.es; }

export default async function OrigenPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = gc(locale);
  const imgAlt = IMG_ALT[locale] ?? IMG_ALT.es;

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-ink">
        <Image src="/images/landing/origen.jpg" alt="Taller Natura Esencials, Marbella"
          fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
        <div className="relative z-10 w-full px-pad-x pb-[clamp(48px,8vw,96px)] pt-[clamp(120px,16vw,180px)]">
          <p className="mb-4 text-[11px] uppercase tracking-[0.38em] text-verde-claro">{c.kicker}</p>
          <h1 className="font-display text-[clamp(40px,7vw,88px)] leading-[0.95] tracking-[-0.025em] text-bg">
            <em className="font-display-italic text-verde-claro">{c.h1a}</em><br />{c.h1b}
          </h1>
          <p className="mt-6 max-w-[520px] text-[15px] leading-[1.85] text-bg/80">{c.body0}</p>
        </div>
      </section>

      {/* Compromisos */}
      <section className="border-b border-rule bg-paper px-pad-x py-[clamp(40px,6vw,64px)]">
        <p className="mb-8 text-[11px] uppercase tracking-[0.32em] text-verde">— {c.vTitle}</p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {c.v.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              {item.icon === 'SELLO' ? (
                <Image src="/images/sello-artesania-dark-sm.png" alt="Artesanía Hecha en Andalucía" width={120} height={47} className="h-8 w-auto object-contain" />
              ) : (
                <span className="text-2xl">{item.icon}</span>
              )}
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">{item.label}</span>
              <span className="text-[12px] leading-[1.5] text-graphite">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Secciones de contenido */}
      <div className="mx-auto max-w-3xl px-pad-x py-[clamp(48px,8vw,96px)]">
        {[
          [c.s1t, c.s1b, null],
          [c.s2t, c.s2b, '/images/landing/botanica.jpg'],
          [c.s3t, c.s3b, null],
          [c.s4t, c.s4b, null],
          [c.s5t, c.s5b, null],
        ].map(([title, body, img], i) => (
          <div key={i}>
            <article className={`mb-[clamp(40px,6vw,72px)] ${img ? 'grid gap-10 lg:grid-cols-2 lg:items-start' : ''}`}>
              <div>
                <h2 className="mb-5 font-display text-[clamp(24px,3vw,36px)] leading-tight tracking-[-0.02em]">{title as string}</h2>
                <p className="text-[15px] leading-[1.9] text-ink/80">{body as string}</p>
              </div>
              {img && (
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-paper lg:mt-2">
                  <Image src={img as string} alt={imgAlt} fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
                </div>
              )}
            </article>
            {i < 4 && <hr className="border-rule mb-[clamp(40px,6vw,72px)]" />}
          </div>
        ))}
      </div>

      {/* Taller */}
      <section className="border-t border-rule bg-paper px-pad-x py-[clamp(40px,6vw,64px)] text-center">
        <p className="mb-2 text-[11px] uppercase tracking-[0.35em] text-graphite">Taller</p>
        <p className="font-display text-[clamp(18px,2.5vw,28px)] tracking-[0.02em] text-ink">
          Málaga, Andalucía
        </p>
        <p className="mt-2 font-caption text-sm text-verde">36°30′N · 4°53′O</p>
      </section>
    </main>
  );
}
