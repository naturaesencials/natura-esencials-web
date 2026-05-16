export interface Post {
  slug: string;
  date: string;
  category: string;
  readingMin: number;
  image: string;
  title: Record<string, string>;
  excerpt: Record<string, string>;
  body: Record<string, string>;
}

export const posts: Post[] = [
  {
    slug: 'por-que-ph-acido-champu-natural',
    date: '2026-04-28',
    category: 'Cosmética',
    readingMin: 4,
    image: '/images/landing/card-2.jpg',
    title: {
      es: '¿Por qué el champú natural debe tener pH ácido?',
      en: 'Why should natural shampoo have an acidic pH?',
      fr: "Pourquoi le shampooing naturel doit-il avoir un pH acide ?",
      de: "Warum sollte Naturshampoo einen sauren pH-Wert haben?",
      it: "Perché lo shampoo naturale deve avere un pH acido?",
      nl: "Waarom moet natuurlijke shampoo een zure pH hebben?",
      pt: "Porque é que o champô natural deve ter pH ácido?",
    },
    excerpt: {
      es: 'El pH del cabello está entre 4,5 y 5,5. Un champú con pH demasiado alto daña la cutícula. Explicamos la ciencia detrás de nuestra formulación.',
      en: 'Hair pH ranges from 4.5 to 5.5. A shampoo with too high a pH damages the cuticle. We explain the science behind our formulation.',
      fr: "Le pH du cheveu se situe entre 4,5 et 5,5. Un shampooing au pH trop élevé abîme la cuticule. La science derrière notre formulation.",
      de: "Der pH-Wert des Haares liegt zwischen 4,5 und 5,5. Ein Shampoo mit zu hohem pH schädigt die Schuppenschicht.",
      it: "Il pH dei capelli è compreso tra 4,5 e 5,5. Uno shampoo con pH troppo alto danneggia la cuticola.",
      nl: "De pH van haar ligt tussen 4,5 en 5,5. Een shampoo met een te hoge pH beschadigt de haarschubben.",
      pt: "O pH do cabelo situa-se entre 4,5 e 5,5. Um champô com pH elevado danifica a cutícula.",
    },
    body: {
      es: `El cabello humano tiene un pH natural de entre 4,5 y 5,5 — ligeramente ácido. La cutícula capilar, esa capa de escamas que protege el tallo del cabello, se mantiene cerrada y suave en ese rango. Cuando la exponemos a productos con pH alcalino (entre 7 y 9, habitual en muchos champús convencionales), las escamas se abren, el cabello pierde brillo, se vuelve poroso y se rompe con más facilidad.

En Natura Esencials formulamos nuestro Champú 2 en 1 con un pH cuidadosamente ajustado entre 4,5 y 5,5. No es un detalle menor: es parte del protocolo de formulación ISO 16128 que seguimos en cada producto.

**¿Cómo lo conseguimos?** Usando tensioactivos de origen vegetal (coco y azúcar) que son intrínsecamente más suaves, y ajustando el pH con ácido cítrico al final del proceso de fabricación. Cada lote se mide con pHmetro calibrado antes del envasado.

El resultado es un cabello limpio, sin encrespamiento, con la cutícula intacta. Así de sencillo — y así de importante.`,
      en: `Human hair has a natural pH of between 4.5 and 5.5 — slightly acidic. The hair cuticle, that layer of scales protecting the hair shaft, stays closed and smooth within that range. When exposed to products with alkaline pH (between 7 and 9, common in many conventional shampoos), the scales open, hair loses shine, becomes porous and breaks more easily.

At Natura Esencials we formulate our 2-in-1 Shampoo with a carefully adjusted pH between 4.5 and 5.5. This is not a minor detail — it is part of the ISO 16128 formulation protocol we follow in every product.

**How do we achieve it?** By using plant-based surfactants (coconut and sugar) that are inherently gentler, and adjusting pH with citric acid at the end of the manufacturing process. Each batch is measured with a calibrated pH meter before bottling.

The result is clean hair, without frizz, with the cuticle intact. That simple — and that important.`,
      fr: `Le cheveu humain a un pH naturel compris entre 4,5 et 5,5. La cuticule capillaire reste fermée et lisse dans cette plage. Les produits au pH alcalin ouvrent les écailles, le cheveu perd son éclat et casse plus facilement.

Chez Natura Esencials, nous formulons notre Shampooing 2 en 1 avec un pH ajusté entre 4,5 et 5,5. Cela fait partie du protocole ISO 16128.

**Comment y parvenons-nous ?** En utilisant des tensioactifs d'origine végétale (coco et sucre) et en ajustant le pH avec de l'acide citrique.

Le résultat : un cheveu propre, sans frisottis, avec la cuticule intacte.`,
      de: `Menschliches Haar hat einen pH-Wert zwischen 4,5 und 5,5. Die Haarschuppenschicht bleibt geschlossen und glatt. Produkte mit alkalischem pH-Wert öffnen die Schuppen, das Haar verliert Glanz und bricht leichter.

Bei Natura Esencials formulieren wir unser 2-in-1-Shampoo mit einem pH-Wert zwischen 4,5 und 5,5. Das ist Teil des ISO 16128-Protokolls.

**Wie erreichen wir das?** Durch pflanzliche Tenside (aus Kokos und Zucker) und Anpassung des pH-Werts mit Zitronensäure.

Das Ergebnis: sauberes Haar, ohne Frizz, mit intakter Schuppenschicht.`,
      it: `I capelli umani hanno un pH naturale tra 4,5 e 5,5. La cuticola capillare resta chiusa e liscia. I prodotti con pH alcalino aprono le squame, il capello perde lucentezza e si spezza più facilmente.

In Natura Esencials formuliamo il nostro Shampoo 2 in 1 con un pH regolato tra 4,5 e 5,5. Fa parte del protocollo ISO 16128.

**Come ci riusciamo?** Tensioattivi di origine vegetale (cocco e zucchero) e regolazione del pH con acido citrico.

Il risultato: capelli puliti, senza crespo, con la cuticola intatta.`,
      nl: `Menselijk haar heeft een pH tussen 4,5 en 5,5. De haarschubbenlaag blijft gesloten en glad. Producten met alkalische pH openen de schubben, het haar verliest glans en breekt gemakkelijker.

Bij Natura Esencials formuleren we onze 2-in-1 Shampoo met een pH tussen 4,5 en 5,5. Dit maakt deel uit van het ISO 16128-protocol.

**Hoe bereiken we dit?** Plantaardige oppervlakteactieve stoffen (kokosnoot en suiker) en aanpassing van de pH met citroenzuur.

Het resultaat: schoon haar, zonder pluis, met intacte schubbenlaag.`,
      pt: `O cabelo humano tem um pH natural entre 4,5 e 5,5. A cutícula capilar mantém-se fechada e suave. Produtos com pH alcalino abrem as escamas, o cabelo perde brilho e parte-se mais facilmente.

Na Natura Esencials formulamos o nosso Champô 2 em 1 com um pH ajustado entre 4,5 e 5,5. Faz parte do protocolo ISO 16128.

**Como o conseguimos?** Tensioativos de origem vegetal (coco e açúcar) e ajuste do pH com ácido cítrico.

O resultado: cabelo limpo, sem frizz, com a cutícula intacta.`,
    },
  },
  {
    slug: 'limpiar-casa-sin-quimicos-agresivos',
    date: '2026-04-14',
    category: 'Hogar',
    readingMin: 5,
    image: '/images/landing/card-6.jpg',
    title: {
      es: 'Limpiar la casa sin químicos agresivos: es posible',
      en: 'Cleaning the house without harsh chemicals: it is possible',
      fr: "Nettoyer la maison sans produits chimiques agressifs",
      de: "Das Haus ohne aggressive Chemikalien reinigen",
      it: "Pulire la casa senza prodotti chimici aggressivi",
      nl: "Schoonmaken zonder agressieve chemicaliën",
      pt: "Limpar a casa sem químicos agressivos",
    },
    excerpt: {
      es: 'Los productos de limpieza convencionales contienen compuestos que irritan las vías respiratorias y la piel. Nuestra línea Hogar demuestra que la eficacia y la naturalidad no están reñidas.',
      en: 'Conventional cleaning products contain compounds that irritate the airways and skin. Our Home line proves that efficacy and naturalness are not at odds.',
      fr: "Les produits ménagers conventionnels irritent les voies respiratoires et la peau. Notre ligne Maison prouve que efficacité et naturalité sont compatibles.",
      de: "Herkömmliche Reinigungsprodukte reizen Atemwege und Haut. Unsere Haushaltslinie beweist, dass Wirksamkeit und Natürlichkeit vereinbar sind.",
      it: "I prodotti convenzionali irritano vie respiratorie e pelle. La nostra linea Casa dimostra che efficacia e naturalità non sono in contraddizione.",
      nl: "Conventionele schoonmaakproducten irriteren luchtwegen en huid. Onze Huishoudlijn bewijst dat effectiviteit en natuurlijkheid samengaan.",
      pt: "Os produtos convencionais irritam vias respiratórias e pele. A nossa linha Lar demonstra que eficácia e naturalidade são compatíveis.",
    },
    body: {
      es: `Los hogares españoles consumen una media de 12 kg de productos de limpieza al año. La mayoría de ellos contienen sulfatos agresivos, fragancias sintéticas y conservantes que, en uso repetido, pueden irritar las vías respiratorias, resecar la piel y acumularse en el medioambiente.

Cuando diseñamos nuestra línea Hogar, la pregunta no fue "¿cómo hacemos un producto de limpieza natural?" sino "¿cómo hacemos un producto que limpie de verdad y que además sea seguro para quien lo usa a diario?"

**La clave está en los tensioactivos.** Usamos derivados de coco y glucósidos de azúcar — biodegradables, eficaces a bajas concentraciones y mucho más gentiles con la piel que los sulfonatos convencionales.

**El aroma importa, pero no a cualquier precio.** Aromatizamos con aceites esenciales reales: limón de Málaga, lavanda, menta. Sin fragancias sintéticas ocultas bajo el término "parfum".

**El resultado.** Nuestro Limpiasuelos Natural limpia sin dejar residuo, sin necesidad de aclarado y con un perfil de seguridad apto para hogares con niños y mascotas. Lo mismo aplica a nuestro Desengrasante, Limpiacristales y el resto de la gama.

Limpiar bien no requiere agresividad química. Requiere buena formulación.`,
      en: `Spanish households consume an average of 12 kg of cleaning products per year. Most of them contain aggressive sulphates, synthetic fragrances and preservatives that, with repeated use, can irritate the airways, dry out the skin and accumulate in the environment.

When we designed our Home line, the question was not "how do we make a natural cleaning product?" but "how do we make a product that truly cleans and is also safe for daily use?"

**The key lies in surfactants.** We use coconut derivatives and sugar glucosides — biodegradable, effective at low concentrations and much gentler on the skin than conventional sulphonates.

**Fragrance matters, but not at any cost.** We scent with real essential oils: Málaga lemon, lavender, mint. No synthetic fragrances hidden under the term "parfum".

**The result.** Our Natural Floor Cleaner cleans without leaving residue, without rinsing, and with a safety profile suitable for homes with children and pets. The same applies to our Degreaser, Glass Cleaner and the rest of the range.

Cleaning well does not require chemical aggression. It requires good formulation.`,
      fr: `Les foyers européens consomment en moyenne 12 kg de produits d'entretien par an. La plupart contiennent des sulfates agressifs et des parfums de synthèse qui irritent les voies respiratoires.

Notre ligne Maison a été conçue pour nettoyer vraiment tout en étant sûre au quotidien.

**La clé : les tensioactifs.** Dérivés de coco et glucosides de sucre, biodégradables et doux pour la peau.

**Le parfum compte.** Huiles essentielles réelles : citron de Málaga, lavande, menthe.

Notre Nettoyant Sols nettoie sans résidu, sans rinçage, adapté aux foyers avec enfants et animaux. Bien nettoyer nécessite une bonne formulation.`,
      de: `Europäische Haushalte verbrauchen durchschnittlich 12 kg Reinigungsprodukte pro Jahr. Die meisten enthalten aggressive Sulfate und synthetische Duftstoffe, die die Atemwege reizen.

Unsere Haushaltslinie wurde entwickelt, um wirklich zu reinigen und zugleich sicher für den täglichen Gebrauch zu sein.

**Der Schlüssel: die Tenside.** Kokosderivate und Zuckerglucoside, biologisch abbaubar und sanft zur Haut.

**Der Duft ist wichtig.** Echte ätherische Öle: Málaga-Zitrone, Lavendel, Minze.

Unser Bodenreiniger reinigt ohne Rückstände, ohne Nachspülen, sicher für Haushalte mit Kindern und Haustieren. Gründlich reinigen erfordert gute Formulierung.`,
      it: `Le famiglie europee consumano in media 12 kg di prodotti per la pulizia all'anno. La maggior parte contiene solfati aggressivi e profumi sintetici che irritano le vie respiratorie.

La nostra linea Casa è stata progettata per pulire davvero, in sicurezza quotidiana.

**La chiave: i tensioattivi.** Derivati del cocco e glucosidi dello zucchero, biodegradabili e delicati sulla pelle.

**Il profumo conta.** Veri oli essenziali: limone di Málaga, lavanda, menta.

Il nostro Detergente Pavimenti pulisce senza residui, senza risciacquo, sicuro per case con bambini e animali. Pulire bene richiede buona formulazione.`,
      nl: `Europese huishoudens verbruiken gemiddeld 12 kg schoonmaakproducten per jaar. De meeste bevatten agressieve sulfaten en synthetische geurstoffen die de luchtwegen irriteren.

Onze Huishoudlijn is ontworpen om echt te reinigen en veilig te zijn voor dagelijks gebruik.

**De sleutel: oppervlakteactieve stoffen.** Kokosderivaten en suikerglucoside, biologisch afbreekbaar en mild voor de huid.

**Geur is belangrijk.** Echte essentiële oliën: Málaga-citroen, lavendel, munt.

Onze Vloerreiniger reinigt zonder residu, zonder naspoelen, veilig voor huishoudens met kinderen en huisdieren. Goed reinigen vereist goede formulering.`,
      pt: `As famílias europeias consomem em média 12 kg de produtos de limpeza por ano. A maioria contém sulfatos agressivos e fragrâncias sintéticas que irritam as vias respiratórias.

A nossa linha Lar foi concebida para limpar a sério, com segurança diária.

**A chave: os tensioativos.** Derivados de coco e glucosídos de açúcar, biodegradáveis e suaves para a pele.

**O aroma importa.** Óleos essenciais reais: limão de Málaga, lavanda, menta.

O nosso Detergente de Chão limpa sem resíduos, sem enxaguamento, seguro para lares com crianças e animais. Limpar bem requer boa formulação.`,
    },
  },
  {
    slug: 'que-significa-iso-16128',
    date: '2026-03-31',
    category: 'Formulación',
    readingMin: 3,
    image: '/images/landing/botanica.jpg',
    title: {
      es: 'Qué significa que un cosmético sea ISO 16128',
      en: 'What does ISO 16128 cosmetic certification mean?',
      fr: "Que signifie la certification ISO 16128 ?",
      de: "Was bedeutet ISO 16128 bei Kosmetik?",
      it: "Cosa significa ISO 16128 per un cosmetico?",
      nl: "Wat betekent ISO 16128 voor cosmetica?",
      pt: "O que significa a certificação ISO 16128?",
    },
    excerpt: {
      es: 'ISO 16128 es el estándar internacional que define qué es un ingrediente natural en cosmética. No todos los productos que se dicen naturales lo son. Explicamos cómo interpretarlo.',
      en: 'ISO 16128 is the international standard that defines what constitutes a natural ingredient in cosmetics. Not all products claiming to be natural truly are. We explain how to interpret it.',
      fr: "ISO 16128 est la norme internationale qui définit les ingrédients naturels en cosmétique. Tous les produits naturels ne le sont pas vraiment.",
      de: "ISO 16128 definiert, was ein natürlicher Inhaltsstoff in der Kosmetik ist. Nicht alle Produkte, die sich natürlich nennen, sind es auch.",
      it: "ISO 16128 è lo standard che definisce gli ingredienti naturali in cosmetica. Non tutti i prodotti naturali lo sono davvero.",
      nl: "ISO 16128 definieert wat een natuurlijk ingrediënt in cosmetica is. Niet alle producten die zich natuurlijk noemen zijn dat ook.",
      pt: "ISO 16128 é a norma que define ingredientes naturais em cosmética. Nem todos os produtos naturais o são realmente.",
    },
    body: {
      es: `"Natural" es una de las palabras más usadas — y menos reguladas — en el mercado cosmético. Cualquier marca puede llamar "natural" a un producto sin que exista una normativa que lo impida. Eso cambia con ISO 16128.

**¿Qué es ISO 16128?** Es una norma técnica internacional (ISO 16128-1:2016 e ISO 16128-2:2017) que establece definiciones y criterios para clasificar ingredientes cosméticos como naturales, de origen natural, orgánicos o de origen orgánico. Además permite calcular un índice de naturalidad: el porcentaje real de ingredientes naturales en la fórmula final.

**¿Cómo se calcula el índice?** Cada ingrediente recibe una puntuación entre 0 y 1 según su origen y grado de procesamiento. El índice final es la media ponderada de todos los ingredientes por su porcentaje en fórmula.

**¿Qué significa en la práctica?** Un producto con índice ISO 16128 del 96% tiene el 96% de su masa compuesta por ingredientes naturales o de origen natural. El 4% restante puede ser, por ejemplo, conservantes necesarios para la seguridad microbiológica del producto.

En Natura Esencials usamos ISO 16128 como herramienta de formulación desde el inicio: nos obliga a justificar cada ingrediente, a buscar alternativas naturales cuando existen y a ser honestos sobre lo que tiene cada frasco.`,
      en: `"Natural" is one of the most used — and least regulated — words in the cosmetics market. Any brand can call a product "natural" without any regulation preventing it. That changes with ISO 16128.

**What is ISO 16128?** It is an international technical standard (ISO 16128-1:2016 and ISO 16128-2:2017) that establishes definitions and criteria for classifying cosmetic ingredients as natural, naturally-derived, organic or organically-derived. It also allows calculation of a naturalness index: the actual percentage of natural ingredients in the final formula.

**How is the index calculated?** Each ingredient receives a score between 0 and 1 according to its origin and degree of processing. The final index is the weighted average of all ingredients by their percentage in the formula.

**What does it mean in practice?** A product with an ISO 16128 index of 96% has 96% of its mass composed of natural or naturally-derived ingredients. The remaining 4% may be, for example, preservatives necessary for the microbiological safety of the product.

At Natura Esencials we have used ISO 16128 as a formulation tool from the start: it forces us to justify each ingredient, to look for natural alternatives when they exist, and to be honest about what is in each bottle.`,
      fr: `Natural est l'un des mots les plus utilisés et les moins réglementés en cosmétique. Cela change avec ISO 16128.

**Qu'est-ce que l'ISO 16128 ?** Une norme technique internationale qui établit des critères pour classer les ingrédients cosmétiques comme naturels ou d'origine naturelle. Elle permet de calculer un indice de naturalité.

**Comment l'indice est-il calculé ?** Chaque ingrédient reçoit un score entre 0 et 1. L'indice final est la moyenne pondérée.

**En pratique ?** Un produit avec un indice de 96% a 96% de sa masse d'origine naturelle.

Chez Natura Esencials, ISO 16128 est notre outil de formulation depuis le début.`,
      de: `Natürlich ist eines der am häufigsten verwendeten und am wenigsten regulierten Wörter auf dem Kosmetikmarkt. Das ändert sich mit ISO 16128.

**Was ist ISO 16128?** Ein internationaler Standard, der Kriterien für die Klassifizierung kosmetischer Inhaltsstoffe als natürlich oder natürlich gewonnen festlegt. Er ermöglicht die Berechnung eines Natürlichkeitsindex.

**Wie wird der Index berechnet?** Jeder Inhaltsstoff erhält eine Bewertung zwischen 0 und 1. Der Endindex ist der gewichtete Durchschnitt.

**In der Praxis?** Ein Produkt mit einem Index von 96% hat 96% seiner Masse aus natürlichen Inhaltsstoffen.

Bei Natura Esencials nutzen wir ISO 16128 von Anfang an als Formulierungswerkzeug.`,
      it: `Naturale è una delle parole più usate e meno regolamentate in cosmetica. Questo cambia con ISO 16128.

**Cos'è ISO 16128?** Uno standard tecnico internazionale che stabilisce criteri per classificare gli ingredienti cosmetici come naturali o di origine naturale. Permette di calcolare un indice di naturalità.

**Come si calcola l'indice?** Ogni ingrediente riceve un punteggio tra 0 e 1. L'indice finale è la media ponderata.

**Nella pratica?** Un prodotto con indice del 96% ha il 96% della massa di origine naturale.

In Natura Esencials utilizziamo ISO 16128 come strumento di formulazione fin dall'inizio.`,
      nl: `Natuurlijk is een van de meest gebruikte en minst gereguleerde woorden in cosmetica. Dat verandert met ISO 16128.

**Wat is ISO 16128?** Een internationale standaard die criteria vastlegt voor het classificeren van cosmetische ingrediënten als natuurlijk of van natuurlijke oorsprong. Het maakt de berekening mogelijk van een natuurlijkheidsindex.

**Hoe wordt de index berekend?** Elk ingrediënt krijgt een score tussen 0 en 1. De uiteindelijke index is het gewogen gemiddelde.

**In de praktijk?** Een product met een index van 96% heeft 96% van zijn massa uit natuurlijke ingrediënten.

Bij Natura Esencials gebruiken we ISO 16128 vanaf het begin als formuleringstool.`,
      pt: `Natural é uma das palavras mais usadas e menos regulamentadas em cosmética. Isso muda com a ISO 16128.

**O que é a ISO 16128?** Uma norma técnica internacional que estabelece critérios para classificar ingredientes cosméticos como naturais ou de origem natural. Permite calcular um índice de naturalidade.

**Como se calcula o índice?** Cada ingrediente recebe uma pontuação entre 0 e 1. O índice final é a média ponderada.

**Na prática?** Um produto com índice de 96% tem 96% da massa de origem natural.

Na Natura Esencials usamos a ISO 16128 como ferramenta de formulação desde o início.`,
    },
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
