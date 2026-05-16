import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildPath } from '@/lib/i18n/paths';
import Link from 'next/link';
import type { Locale, Region } from '@/lib/i18n/config';

interface Props { params: Promise<{ region: Region; locale: Locale }>; }

// ── i18n ────────────────────────────────────────────────────────────────────

interface FAQ { q: string; a: string; id: string; }

const TITLE: Record<string, string> = {
  es: 'Preguntas Frecuentes', en: 'Frequently Asked Questions', fr: 'Questions Fréquentes',
  de: 'Häufige Fragen', it: 'Domande Frequenti', nl: 'Veelgestelde Vragen', pt: 'Perguntas Frequentes',
};
const SUBTITLE: Record<string, string> = {
  es: 'Todo lo que necesitas saber sobre nuestras formulaciones, certificaciones y proceso artesanal.',
  en: 'Everything you need to know about our formulations, certifications and artisan process.',
  fr: 'Tout ce que vous devez savoir sur nos formulations, certifications et processus artisanal.',
  de: 'Alles, was Sie über unsere Formulierungen, Zertifizierungen und den handwerklichen Prozess wissen müssen.',
  it: 'Tutto quello che devi sapere sulle nostre formulazioni, certificazioni e processo artigianale.',
  nl: 'Alles wat u moet weten over onze formuleringen, certificeringen en ambachtelijk proces.',
  pt: 'Tudo o que precisa saber sobre as nossas formulações, certificações e processo artesanal.',
};
// Long-form H1: descriptive phrase for SEO (avoids "too short" flag)
const H1_LONG: Record<string, string> = {
  es: 'Preguntas frecuentes sobre cosmética natural artesanal',
  en: 'Frequently asked questions about artisan natural cosmetics',
  fr: 'Questions fréquentes sur la cosmétique naturelle artisanale',
  de: 'Häufige Fragen zu handwerklicher Naturkosmetik',
  it: 'Domande frequenti sulla cosmetica naturale artigianale',
  nl: 'Veelgestelde vragen over ambachtelijke natuurlijke cosmetica',
  pt: 'Perguntas frequentes sobre cosmética natural artesanal',
};

const FAQS: Record<string, FAQ[]> = {
  es: [
    { id: 'iso-16128', q: '¿Qué es la ISO 16128 y qué significa el porcentaje de origen natural?',
      a: 'La ISO 16128 es la norma internacional que define cómo se calcula el índice de naturalidad de un producto cosmético. Establece reglas claras para clasificar ingredientes como "naturales" o "de origen natural" según su origen y proceso de transformación. Cuando decimos que un producto tiene un 96% de ingredientes de origen natural, significa que se ha calculado siguiendo esta norma — no es una estimación ni un reclamo de marketing, sino un cálculo técnico verificable. La norma fue publicada por la Organización Internacional de Normalización (ISO) y es el estándar de referencia utilizado en la Unión Europea.' },
    { id: 'inci', q: '¿Qué es el INCI y cómo leo la lista de ingredientes?',
      a: 'INCI significa International Nomenclature of Cosmetic Ingredients (Nomenclatura Internacional de Ingredientes Cosméticos). Es el sistema estandarizado para nombrar ingredientes cosméticos en todo el mundo. La lista INCI se ordena de mayor a menor concentración: el primer ingrediente es el más abundante (normalmente Aqua/agua) y el último el de menor presencia. Los nombres en latín corresponden a extractos vegetales (ej: Argania Spinosa Kernel Oil = aceite de argán). Los nombres en inglés suelen ser ingredientes procesados. Toda cosmética vendida en la UE debe incluir su lista INCI en el envase.' },
    { id: 'dermatologicamente-testado', q: '¿Qué significa "dermatológicamente testado"?',
      a: 'Significa que el producto ha sido evaluado por dermatólogos en pruebas clínicas con voluntarios humanos para verificar que no produce irritación, alergias ni reacciones adversas en la piel en condiciones normales de uso. Es un estudio científico independiente, no una autodeclaración del fabricante. Nuestros productos cosméticos están dermatológicamente testados en laboratorios europeos acreditados.' },
    { id: 'fabricacion-artesanal', q: '¿Qué significa "fabricación artesanal en Andalucía"?',
      a: 'Todos nuestros productos se fabrican en Andalucía, sur de España. La fabricación artesanal implica lotes controlados, supervisión directa del proceso de formulación y un enfoque en la calidad sobre la cantidad. No somos una línea de producción industrial masiva — cada lote se formula, mezcla y envasa con atención al detalle. Esto nos permite ajustar formulaciones, controlar ingredientes y mantener la trazabilidad completa desde la materia prima hasta el producto final.' },
    { id: 'origen-natural', q: '¿Qué significa "ingredientes de origen natural"?',
      a: 'Un ingrediente de origen natural proviene de fuentes vegetales, minerales o animales, aunque puede haber sido transformado químicamente para hacerlo seguro o eficaz en una fórmula cosmética. Por ejemplo, los tensioactivos "derivados del coco y del azúcar" provienen de materias primas naturales pero pasan por un proceso de transformación. La diferencia con "100% natural" es que el ingrediente de origen natural puede estar transformado — lo que importa es que su fuente original sea natural, según los criterios de la ISO 16128.' },
    { id: 'ph-equilibrado', q: '¿Por qué es importante el pH en los productos capilares?',
      a: 'El cabello humano tiene un pH natural de entre 4,5 y 5,5 (ligeramente ácido). La cutícula capilar se mantiene cerrada y suave en ese rango. Cuando usamos productos con pH alcalino (7-9, habitual en champús convencionales), las escamas se abren, el cabello pierde brillo y se rompe con facilidad. Por eso formulamos nuestros champús y acondicionadores con pH 4,5-5,5: para respetar la cutícula y mantener el brillo natural.' },
    { id: 'registro-mapa', q: '¿Qué es el registro MAPA en productos para mascotas?',
      a: 'MAPA es el Ministerio de Agricultura, Pesca y Alimentación de España. Todos los productos de higiene para mascotas que se comercializan en España deben estar registrados ante el MAPA con un número específico. Este registro garantiza que el producto cumple con la legislación española de biocidas y productos zoosanitarios, y que ha sido evaluado para su uso seguro en animales. Nuestros productos de mascotas llevan su número de registro MAPA individual.' },
  ],
  en: [
    { id: 'iso-16128', q: 'What is ISO 16128 and what does the "naturally derived" percentage mean?',
      a: 'ISO 16128 is the international standard that defines how the natural origin index of a cosmetic product is calculated. It establishes clear rules for classifying ingredients as "natural" or "of natural origin" based on their source and transformation process. When we say a product contains 96% naturally derived ingredients, it means this has been calculated following this standard — it is not an estimate or a marketing claim, but a verifiable technical calculation. The standard was published by the International Organization for Standardization (ISO) and is the benchmark used across the European Union.' },
    { id: 'inci', q: 'What is INCI and how do I read the ingredients list?',
      a: 'INCI stands for International Nomenclature of Cosmetic Ingredients. It is the standardised system for naming cosmetic ingredients worldwide. The INCI list is ordered from highest to lowest concentration: the first ingredient is the most abundant (usually Aqua/water) and the last is the least present. Latin names correspond to plant extracts (e.g. Argania Spinosa Kernel Oil = argan oil). English names are typically processed ingredients. All cosmetics sold in the EU must include their INCI list on the packaging.' },
    { id: 'dermatologically-tested', q: 'What does "dermatologically tested" mean?',
      a: 'It means the product has been evaluated by dermatologists in clinical tests with human volunteers to verify it does not cause irritation, allergies or adverse reactions on the skin under normal conditions of use. This is an independent scientific study, not a self-declaration by the manufacturer. Our cosmetic products are dermatologically tested in accredited European laboratories.' },
    { id: 'artisan-crafted', q: 'What does "artisan-crafted in Andalusia" mean?',
      a: 'All our products are manufactured in Andalusia, southern Spain. Artisan crafting means controlled batches, direct supervision of the formulation process, and a focus on quality over quantity. We are not a mass-production line — each batch is formulated, blended and packaged with attention to detail. This allows us to adjust formulations, control ingredients and maintain full traceability from raw material to finished product.' },
    { id: 'naturally-derived', q: 'What does "naturally derived ingredients" mean?',
      a: 'A naturally derived ingredient comes from plant, mineral or animal sources, although it may have been chemically transformed to make it safe or effective in a cosmetic formula. For example, surfactants "derived from coconut and sugar" come from natural raw materials but undergo a transformation process. The difference from "100% natural" is that a naturally derived ingredient may be transformed — what matters is that its original source is natural, according to ISO 16128 criteria.' },
    { id: 'ph-balanced', q: 'Why is pH important in hair care products?',
      a: 'Human hair has a natural pH between 4.5 and 5.5 (slightly acidic). The hair cuticle stays closed and smooth in that range. When we use products with alkaline pH (7-9, common in conventional shampoos), the scales open, hair loses shine and breaks more easily. That is why we formulate our shampoos and conditioners at pH 4.5-5.5: to respect the cuticle and maintain natural shine.' },
    { id: 'mapa-registry', q: 'What is the MAPA registry for pet products?',
      a: 'MAPA is Spain\'s Ministry of Agriculture, Fisheries and Food. All pet hygiene products sold in Spain must be registered with MAPA under a specific number. This registry ensures the product complies with Spanish legislation on biocides and zoosanitary products, and has been evaluated for safe use on animals. Our pet products each carry their individual MAPA registry number.' },
  ],
  fr: [
    { id: 'iso-16128', q: 'Qu\'est-ce que l\'ISO 16128 et que signifie le pourcentage d\'origine naturelle ?',
      a: 'L\'ISO 16128 est la norme internationale qui définit comment calculer l\'indice de naturalité d\'un produit cosmétique. Elle établit des règles claires pour classer les ingrédients comme « naturels » ou « d\'origine naturelle » selon leur source et leur processus de transformation. Quand nous indiquons qu\'un produit contient 96% d\'ingrédients d\'origine naturelle, cela signifie que ce calcul a été réalisé selon cette norme — ce n\'est ni une estimation ni une allégation marketing, mais un calcul technique vérifiable.' },
    { id: 'inci', q: 'Qu\'est-ce que l\'INCI et comment lire la liste des ingrédients ?',
      a: 'INCI signifie International Nomenclature of Cosmetic Ingredients. C\'est le système standardisé pour nommer les ingrédients cosmétiques dans le monde entier. La liste INCI est ordonnée de la plus haute à la plus basse concentration. Les noms latins correspondent aux extraits végétaux (ex : Argania Spinosa Kernel Oil = huile d\'argan). Tout cosmétique vendu dans l\'UE doit inclure sa liste INCI sur l\'emballage.' },
    { id: 'dermatologiquement-teste', q: 'Que signifie « testé dermatologiquement » ?',
      a: 'Cela signifie que le produit a été évalué par des dermatologues lors de tests cliniques avec des volontaires humains pour vérifier qu\'il ne provoque pas d\'irritation ni de réactions indésirables dans des conditions normales d\'utilisation. Nos produits cosmétiques sont testés dermatologiquement dans des laboratoires européens accrédités.' },
    { id: 'fabrication-artisanale', q: 'Que signifie « fabrication artisanale en Andalousie » ?',
      a: 'Tous nos produits sont fabriqués en Andalousie, dans le sud de l\'Espagne. La fabrication artisanale implique des lots contrôlés, une supervision directe du processus de formulation et une approche qualité. Chaque lot est formulé, mélangé et conditionné avec soin.' },
    { id: 'origine-naturelle', q: 'Que signifie « ingrédients d\'origine naturelle » ?',
      a: 'Un ingrédient d\'origine naturelle provient de sources végétales, minérales ou animales, bien qu\'il puisse avoir été transformé chimiquement. La différence avec « 100% naturel » est que l\'ingrédient d\'origine naturelle peut être transformé — ce qui compte, c\'est que sa source d\'origine soit naturelle, selon les critères de l\'ISO 16128.' },
    { id: 'ph-equilibre', q: 'Pourquoi le pH est-il important dans les produits capillaires ?',
      a: 'Le cheveu humain a un pH naturel entre 4,5 et 5,5. La cuticule reste fermée et lisse dans cette plage. Les produits au pH alcalin ouvrent les écailles, le cheveu perd sa brillance. C\'est pourquoi nous formulons nos shampooings à pH 4,5-5,5.' },
    { id: 'registre-mapa', q: 'Qu\'est-ce que le registre MAPA pour les produits animaux ?',
      a: 'Le MAPA est le Ministère de l\'Agriculture espagnol. Tous les produits d\'hygiène pour animaux vendus en Espagne doivent être enregistrés. Ce registre garantit la conformité avec la législation espagnole. Nos produits portent leur numéro de registre MAPA individuel.' },
  ],
  de: [
    { id: 'iso-16128', q: 'Was ist ISO 16128 und was bedeutet der Prozentsatz natürlichen Ursprungs?',
      a: 'ISO 16128 ist der internationale Standard, der definiert, wie der Natürlichkeitsindex eines Kosmetikprodukts berechnet wird. Wenn wir angeben, dass ein Produkt 96% natürlich gewonnene Inhaltsstoffe enthält, wurde dies gemäß diesem Standard berechnet — es ist keine Schätzung, sondern eine überprüfbare technische Berechnung.' },
    { id: 'inci', q: 'Was ist INCI und wie lese ich die Inhaltsstoffliste?',
      a: 'INCI steht für International Nomenclature of Cosmetic Ingredients. Die INCI-Liste ist von der höchsten zur niedrigsten Konzentration geordnet. Lateinische Namen entsprechen Pflanzenextrakten (z.B. Argania Spinosa Kernel Oil = Arganöl). Alle in der EU verkauften Kosmetika müssen ihre INCI-Liste auf der Verpackung angeben.' },
    { id: 'dermatologisch-getestet', q: 'Was bedeutet „dermatologisch getestet"?',
      a: 'Es bedeutet, dass das Produkt von Dermatologen in klinischen Tests mit Freiwilligen bewertet wurde, um zu überprüfen, dass es keine Irritation oder allergische Reaktionen verursacht. Unsere Kosmetikprodukte werden in akkreditierten europäischen Labors dermatologisch getestet.' },
    { id: 'handwerklich-hergestellt', q: 'Was bedeutet „handwerklich hergestellt in Andalusien"?',
      a: 'Alle unsere Produkte werden in Andalusien, Südspanien, hergestellt. Handwerkliche Herstellung bedeutet kontrollierte Chargen, direkte Aufsicht und Fokus auf Qualität. Jede Charge wird mit Liebe zum Detail formuliert, gemischt und verpackt.' },
    { id: 'natuerlich-gewonnen', q: 'Was bedeutet „natürlich gewonnene Inhaltsstoffe"?',
      a: 'Ein natürlich gewonnener Inhaltsstoff stammt aus pflanzlichen, mineralischen oder tierischen Quellen, kann aber chemisch umgewandelt worden sein. Der Unterschied zu „100% natürlich" ist, dass der Inhaltsstoff umgewandelt sein kann — entscheidend ist, dass seine Ursprungsquelle natürlich ist, gemäß ISO 16128.' },
    { id: 'ph-gleichgewicht', q: 'Warum ist der pH-Wert bei Haarpflegeprodukten wichtig?',
      a: 'Menschliches Haar hat einen natürlichen pH-Wert zwischen 4,5 und 5,5. Die Haarschuppenschicht bleibt in diesem Bereich geschlossen. Produkte mit alkalischem pH öffnen die Schuppen, das Haar verliert Glanz. Deshalb formulieren wir bei pH 4,5-5,5.' },
    { id: 'mapa-registrierung', q: 'Was ist die MAPA-Registrierung für Tierprodukte?',
      a: 'MAPA ist das spanische Landwirtschaftsministerium. Alle Tierhygieneprodukte müssen beim MAPA registriert sein. Diese Registrierung gewährleistet die Einhaltung der spanischen Gesetzgebung. Unsere Tierprodukte tragen ihre individuelle MAPA-Registrierungsnummer.' },
  ],
  it: [
    { id: 'iso-16128', q: 'Cos\'è l\'ISO 16128 e cosa significa la percentuale di origine naturale?', a: 'L\'ISO 16128 è lo standard internazionale che definisce come calcolare l\'indice di naturalità di un prodotto cosmetico. Quando indichiamo che un prodotto contiene il 96% di ingredienti di origine naturale, questo è stato calcolato secondo questo standard — non è una stima ma un calcolo tecnico verificabile.' },
    { id: 'inci', q: 'Cos\'è l\'INCI e come leggo la lista degli ingredienti?', a: 'INCI sta per International Nomenclature of Cosmetic Ingredients. La lista è ordinata dalla concentrazione più alta alla più bassa. I nomi latini corrispondono agli estratti vegetali. Tutti i cosmetici venduti nell\'UE devono includere la lista INCI sulla confezione.' },
    { id: 'dermatologicamente-testato', q: 'Cosa significa "testato dermatologicamente"?', a: 'Significa che il prodotto è stato valutato da dermatologi in test clinici con volontari per verificare che non causi irritazione o reazioni avverse. I nostri prodotti cosmetici sono testati in laboratori europei accreditati.' },
    { id: 'artigianale', q: 'Cosa significa "produzione artigianale in Andalusia"?', a: 'Tutti i nostri prodotti sono fabbricati in Andalusia. Produzione artigianale significa lotti controllati, supervisione diretta e attenzione alla qualità. Ogni lotto è formulato, miscelato e confezionato con cura.' },
    { id: 'origine-naturale', q: 'Cosa significa "ingredienti di origine naturale"?', a: 'Un ingrediente di origine naturale proviene da fonti vegetali, minerali o animali, sebbene possa essere stato trasformato chimicamente. La differenza con "100% naturale" è che l\'ingrediente di origine naturale può essere trasformato — ciò che conta è che la fonte sia naturale, secondo i criteri ISO 16128.' },
    { id: 'ph-equilibrato', q: 'Perché il pH è importante nei prodotti per capelli?', a: 'I capelli hanno un pH naturale tra 4,5 e 5,5. La cuticola resta chiusa in questo intervallo. I prodotti con pH alcalino aprono le squame. Per questo formuliamo a pH 4,5-5,5.' },
    { id: 'registro-mapa', q: 'Cos\'è il registro MAPA per i prodotti per animali?', a: 'Il MAPA è il Ministero dell\'Agricoltura spagnolo. Tutti i prodotti per l\'igiene degli animali devono essere registrati. I nostri prodotti portano il loro numero di registro MAPA individuale.' },
  ],
  nl: [
    { id: 'iso-16128', q: 'Wat is ISO 16128 en wat betekent het percentage van natuurlijke oorsprong?', a: 'ISO 16128 is de internationale standaard die definieert hoe de natuurlijkheidsindex van een cosmetisch product wordt berekend. Wanneer wij aangeven dat een product 96% natuurlijk gewonnen ingrediënten bevat, is dit berekend volgens deze standaard — het is geen schatting maar een verifieerbare technische berekening.' },
    { id: 'inci', q: 'Wat is INCI en hoe lees ik de ingrediëntenlijst?', a: 'INCI staat voor International Nomenclature of Cosmetic Ingredients. De lijst is geordend van hoogste naar laagste concentratie. Latijnse namen komen overeen met plantenextracten. Alle cosmetica in de EU moet de INCI-lijst op de verpakking vermelden.' },
    { id: 'dermatologisch-getest', q: 'Wat betekent "dermatologisch getest"?', a: 'Het betekent dat het product is beoordeeld door dermatologen in klinische tests met vrijwilligers om te verifiëren dat het geen irritatie of bijwerkingen veroorzaakt. Onze cosmetische producten worden getest in geaccrediteerde Europese laboratoria.' },
    { id: 'ambachtelijk', q: 'Wat betekent "ambachtelijk vervaardigd in Andalusië"?', a: 'Al onze producten worden vervaardigd in Andalusië. Ambachtelijke vervaardiging betekent gecontroleerde batches, directe supervisie en focus op kwaliteit. Elke batch wordt met aandacht voor detail geformuleerd.' },
    { id: 'natuurlijk-gewonnen', q: 'Wat betekent "natuurlijk gewonnen ingrediënten"?', a: 'Een natuurlijk gewonnen ingrediënt komt uit plantaardige, minerale of dierlijke bronnen, hoewel het chemisch getransformeerd kan zijn. Het verschil met "100% natuurlijk" is dat het ingrediënt getransformeerd kan zijn — wat telt is dat de oorspronkelijke bron natuurlijk is, volgens ISO 16128.' },
    { id: 'ph-balans', q: 'Waarom is pH belangrijk bij haarverzorgingsproducten?', a: 'Menselijk haar heeft een natuurlijke pH tussen 4,5 en 5,5. De haarschubben blijven gesloten in dat bereik. Producten met alkalische pH openen de schubben. Daarom formuleren wij op pH 4,5-5,5.' },
    { id: 'mapa-registratie', q: 'Wat is de MAPA-registratie voor dierproducten?', a: 'MAPA is het Spaanse Ministerie van Landbouw. Alle dierhygiëneproducten moeten geregistreerd zijn. Onze producten dragen hun individuele MAPA-registratienummer.' },
  ],
  pt: [
    { id: 'iso-16128', q: 'O que é a ISO 16128 e o que significa a percentagem de origem natural?', a: 'A ISO 16128 é a norma internacional que define como se calcula o índice de naturalidade de um produto cosmético. Quando indicamos que um produto contém 96% de ingredientes de origem natural, este valor foi calculado seguindo esta norma — não é uma estimativa mas um cálculo técnico verificável.' },
    { id: 'inci', q: 'O que é o INCI e como leio a lista de ingredientes?', a: 'INCI significa International Nomenclature of Cosmetic Ingredients. A lista está ordenada da maior para a menor concentração. Os nomes em latim correspondem a extratos vegetais. Todos os cosméticos vendidos na UE devem incluir a lista INCI na embalagem.' },
    { id: 'dermatologicamente-testado', q: 'O que significa "dermatologicamente testado"?', a: 'Significa que o produto foi avaliado por dermatologistas em testes clínicos com voluntários para verificar que não causa irritação ou reações adversas. Os nossos produtos cosméticos são testados em laboratórios europeus acreditados.' },
    { id: 'fabrico-artesanal', q: 'O que significa "fabrico artesanal na Andaluzia"?', a: 'Todos os nossos produtos são fabricados na Andaluzia. Fabrico artesanal significa lotes controlados, supervisão direta e foco na qualidade. Cada lote é formulado, misturado e embalado com atenção ao detalhe.' },
    { id: 'origem-natural', q: 'O que significa "ingredientes de origem natural"?', a: 'Um ingrediente de origem natural provém de fontes vegetais, minerais ou animais, embora possa ter sido transformado quimicamente. A diferença em relação a "100% natural" é que o ingrediente de origem natural pode ser transformado — o que importa é que a sua fonte original seja natural, segundo os critérios da ISO 16128.' },
    { id: 'ph-equilibrado', q: 'Porque é que o pH é importante nos produtos capilares?', a: 'O cabelo humano tem um pH natural entre 4,5 e 5,5. A cutícula mantém-se fechada nessa faixa. Produtos com pH alcalino abrem as escamas. Por isso formulamos a pH 4,5-5,5.' },
    { id: 'registo-mapa', q: 'O que é o registo MAPA para produtos de animais?', a: 'O MAPA é o Ministério da Agricultura espanhol. Todos os produtos de higiene animal devem estar registados. Os nossos produtos levam o seu número de registo MAPA individual.' },
  ],
};

// ── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale } = await params;
  return buildMetadata({
    title: TITLE[locale] ?? TITLE.es,
    description: SUBTITLE[locale] ?? SUBTITLE.es,
    region, locale, path: 'faq',
    noIndex: region === 'uk',
  });
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function FaqPage({ params }: Props) {
  const { region, locale } = await params;
  setRequestLocale(locale);

  const faqs = FAQS[locale] ?? FAQS.es;
  const title = TITLE[locale] ?? TITLE.es;
  const subtitle = SUBTITLE[locale] ?? SUBTITLE.es;
  const h1Text = H1_LONG[locale] ?? H1_LONG.es;

  return (
    <main className="px-pad-x py-pad-y">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-12">
          <nav className="mb-6 text-[11px] uppercase tracking-[0.22em] text-graphite">
            <Link href={buildPath(region, locale)} className="hover:text-verde transition-colors">Home</Link>
            <span className="mx-2">·</span>
            <span className="text-ink">{title}</span>
          </nav>
          <h1 className="font-display text-h1-fluid leading-[0.96] tracking-[-0.025em] mb-4">{h1Text}</h1>
          <p className="text-lg text-muted">{subtitle}</p>
        </header>

        {/* FAQ Accordion */}
        <div className="flex flex-col divide-y divide-rule">
          {faqs.map((faq) => (
            <details key={faq.id} id={faq.id} className="group py-6">
              <summary className="flex cursor-pointer items-start gap-4 text-left font-heading text-[clamp(16px,2vw,20px)] tracking-[-0.01em] leading-snug marker:content-['']">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink/20 text-sm transition-colors group-open:bg-verde group-open:border-verde group-open:text-white">
                  +
                </span>
                <span>{faq.q}</span>
              </summary>
              <div className="mt-4 pl-10 text-[15px] leading-[1.85] text-muted">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
