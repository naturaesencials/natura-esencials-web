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
  // ─────────────────────────────────────────────────────────────────────────────
  // ARTÍCULO 1 — Tetrabrick (21 mayo 2026)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'tetrabrick-no-se-recicla-realidad-medioambiental',
    date: '2026-05-21',
    category: 'Sostenibilidad',
    readingMin: 9,
    image: '/images/blog/tetrabrick-reciclaje.jpg',
    title: {
      es: 'El tetrabrick y el reciclaje: lo que la industria no cuenta',
      en: 'Tetra Pak recycling: what the industry does not tell you',
      fr: 'Le tetrabrick et le recyclage : ce que l\'industrie ne dit pas',
      de: 'Tetrapak-Recycling: Was die Industrie verschweigt',
      it: 'Il tetrabrick e il riciclo: quello che l\'industria non racconta',
      nl: 'Tetrapak en recycling: wat de industrie verzwijgt',
      pt: 'O tetrabrick e a reciclagem: o que a indústria não conta',
    },
    excerpt: {
      es: 'El tetrabrick lleva décadas vendiéndose como el envase sostenible. Los datos dicen que en España solo se recicla el 21% de verdad. Lo que pasa con el resto te va a sorprender.',
      en: 'Tetra Pak has been marketed as the sustainable packaging for decades. Data shows that in Spain only 21% is truly recycled. What happens to the rest will surprise you.',
      fr: 'Le tetrabrick est vendu comme emballage durable depuis des décennies. En réalité, seuls 21% sont vraiment recyclés en Espagne.',
      de: 'Tetrapak gilt seit Jahrzehnten als nachhaltige Verpackung. Daten zeigen: In Spanien werden nur 21% wirklich recycelt.',
      it: 'Il tetrabrick è venduto da decenni come imballaggio sostenibile. I dati mostrano che in Spagna solo il 21% viene davvero riciclato.',
      nl: 'Tetrapak wordt al tientallen jaren verkocht als duurzame verpakking. Maar in Spanje wordt slechts 21% echt gerecycled.',
      pt: 'O tetrabrick é vendido há décadas como embalagem sustentável. Os dados mostram que em Espanha só 21% é realmente reciclado.',
    },
    body: {
      es: `Cada semana millones de personas hacen exactamente el mismo gesto. Terminan un brik de leche, zumo o caldo, lo aplastan un poco y lo lanzan al contenedor amarillo convencidas de que ese envase se convertirá en otro envase. Durante años nos han enseñado que ese pequeño ritual forma parte de la solución. Y, en parte, sí lo es. Pero hay una pregunta que casi nunca aparece en los anuncios ni en las campañas de reciclaje: ¿qué ocurre realmente cuando ese tetrabrick llega a la planta de clasificación?

## Primero, por qué el tetrabrick parece la opción ecológica perfecta

A primera vista, el tetrabrick tiene muchas cosas a favor. Alrededor del 75% del envase está formado por cartón procedente de fibra de madera. En muchos casos, además, esa madera proviene de bosques certificados FSC. Pesa muchísimo menos que el vidrio. Y la forma rectangular es extremadamente eficiente desde el punto de vista logístico.

Todo eso es verdad. El problema aparece después. Justo en el momento donde el envase debería entrar realmente en el ciclo de reciclaje.

## Qué hay dentro de un tetrabrick — el problema de los seis en uno

Aunque mucha gente lo perciba como "cartón", un tetrabrick no es realmente cartón. Es un envase multimaterial compuesto por seis capas microscópicas de tres materiales distintos unidos entre sí:

- **75% cartón**
- **20% polietileno (plástico)**
- **5% aluminio**

Precisamente esa combinación es la que hace que el envase funcione tan bien. Y también la que complica enormemente su reciclaje. Porque los materiales no están simplemente "juntos". Están fusionados en capas microscópicas mediante calor y adhesivos.

La primera parte del proceso sí está bastante resuelta: las fibras de cartón se separan en agua y pueden recuperarse. El problema aparece con el residuo restante: una mezcla compacta de plástico y aluminio conocida como **PolyAl**. Separar el aluminio del polietileno requiere procesos industriales complejos como la pirólisis a unos 500 ºC. Es técnicamente posible. Pero extremadamente caro.

España llegó a tener la única planta del mundo capaz de realizar este proceso a gran escala: la planta de Stora Enso en Barcelona, que recibió el premio *Best of the Best* de la Comisión Europea en 2011 tras una inversión de 8 millones de euros. Pero el sistema no resultó rentable. **La planta cerró pocos años después.** Hoy no existe en España ninguna planta capaz de reciclar completamente el PolyAl.

## Los números reales: la brecha entre el marketing y la ciencia independiente

Las cifras oficiales suelen parecer positivas. ACE y Ecoembes han llegado a publicar tasas cercanas al **78,8%** en España.

Pero en 2020, la consultora independiente **Eunomia Research & Consulting** publicó un informe para Zero Waste Europe con una metodología diferente: calcular cuánto material vuelve realmente al ciclo productivo.

Los resultados fueron mucho más bajos:

- Tasa de reciclaje efectivo de tetrabricks en España: **21,4%**
- Ajustando pérdidas del proceso: **17,3%**

La diferencia está en qué consideramos "reciclado". Las cifras de la industria cuentan como reciclado todo envase que llega a una planta de tratamiento, aunque parte del material termine en vertedero o valorización energética. Eunomia solo contabiliza el material que vuelve efectivamente al sistema como nueva materia prima.

El Ayuntamiento de Barcelona lo explica sin rodeos: *"Actualmente solo se recicla como máximo el 75% del envase, correspondiente al cartón. El porcentaje restante se convierte en un residuo que no se puede aprovechar."*

Greenpeace España fue todavía más directa: *"El tetrabrik es el caso más paradigmático de un envase multimaterial cuya complejidad impide su correcto reciclado. La realidad es que no se puede reciclar íntegramente. Es un envase del que solo se puede reciclar el papel."*

## Las propias cifras de Tetra Pak lo confirman

Según el **Sustainability Report 2024** de la propia Tetra Pak, la compañía alcanzó una tasa global de reciclaje del **28%**. Eso significa que, incluso con la cifra más optimista de la propia empresa, el 72% de los tetrabricks producidos en el mundo no se recicla.

La cifra apenas ha mejorado: 27% en 2021, 25% en 2022, 27% en 2023, 28% en 2024.

## Lo que elegimos en Natura Esencials

Cuando diseñamos nuestros sistemas de envasado, la pregunta fue sencilla: ¿qué ocurre con este envase cuando termina su vida útil?

El PET que utilizamos está fabricado en un único material identificado con el código ♻1 (PETE). Cualquier planta de clasificación en España o Europa lo reconoce y sabe cómo procesarlo. No requiere separar aluminio de plástico. No depende de una tecnología extremadamente específica.

En el formato BiB de 5 litros, la caja de cartón va al azul y la bolsa al amarillo. Sin PolyAl. Sin laminados metálicos fusionados.

No creemos que exista el envase perfecto. Pero sí creemos que existen materiales con más posibilidades reales de completar el ciclo de reciclaje. Eso es lo que intentamos priorizar.

→ <a href="/eu/es/blog/envases-pet-reciclable-bib-vs-vidrio-medio-ambiente">Lee por qué elegimos PET reciclable y BiB</a>`,
      en: `Every week, millions of people throw a used carton into the recycling bin, convinced it will become another package. For years we have been taught this small ritual is part of the solution. Partly, it is. But a key question rarely appears in advertising: what really happens when that Tetra Pak reaches the sorting plant?

## The six-layer problem

Although perceived as "cardboard", a Tetra Pak is actually a multi-material package made of six microscopic layers: **75% cardboard, 20% polyethylene, 5% aluminium**. These layers are thermally fused and cannot be easily separated.

The cardboard fraction can be recovered in water baths. The remaining mixture of plastic and aluminium — known as **PolyAl** — requires industrial pyrolysis at 500°C. Spain once had the world's only large-scale plant capable of doing this (Stora Enso, Barcelona), but it closed because it was not economically viable. Today, no plant in Spain can fully recycle PolyAl.

## The real numbers

Industry figures from ACE and Ecoembes suggest recycling rates near **78.8%** in Spain. But independent consultant **Eunomia Research & Consulting** (commissioned by Zero Waste Europe, 2020) measured how much material actually returns to the productive cycle: **21.4%**, dropping to 17.3% after processing losses.

Even Tetra Pak's own 2024 Sustainability Report acknowledges a global recycling rate of just **28%**.

## Our choice

Our PET packaging uses a single material (♻1 PETE) that any sorting plant in Spain or Europe can process. No aluminium laminate. No complex delamination. The BiB 5L format separates cleanly: cardboard box in the blue bin, flexible bag in the yellow bin.

No packaging is perfect. But some materials have far better chances of truly completing the recycling cycle.`,
      fr: `Des millions de personnes jettent chaque semaine un brik au conteneur jaune, convaincues qu'il sera recyclé. La réalité est bien différente.

## Le problème des six couches

Un tetrabrick n'est pas simplement du carton. C'est un emballage multicouche composé de **75% de carton, 20% de polyéthylène et 5% d'aluminium**, thermofusionnés ensemble. La fraction carton peut être récupérée. Mais le mélange plastique-aluminium (PolyAl) nécessite une pyrolyse à 500°C — un procédé rare et coûteux.

## Les chiffres réels

Les chiffres officiels espagnols avancent jusqu'à 78,8% de recyclage. L'étude indépendante d'Eunomia (2020) pour Zero Waste Europe arrive à **21,4%**. Même Tetra Pak reconnaît un taux global de **28%** dans son rapport 2024.

## Notre choix chez Natura Esencials

Notre emballage PET (♻1) est recyclable en circuit industriel standard. Notre format BiB sépare clairement carton et flexible. Pas de PolyAl, pas de laminé métallique.`,
      de: `Millionen Menschen werfen wöchentlich ein Tetrapak in die gelbe Tonne — überzeugt, es werde recycelt. Die Realität ist komplexer.

## Das Sechsschichten-Problem

Ein Tetrapak besteht nicht nur aus Pappe. Es ist eine Mehrschichtverpackung aus **75% Karton, 20% Polyethylen und 5% Aluminium**, thermisch verbunden. Die Kartonfasern lassen sich zurückgewinnen. Doch das Plastik-Aluminium-Gemisch (PolyAl) erfordert Pyrolyse bei 500°C — teuer und selten verfügbar.

## Die echten Zahlen

Offizielle spanische Quellen nennen Recyclingquoten von bis zu 78,8%. Die unabhängige Studie von Eunomia (2020) kommt auf **21,4%**. Tetra Pak selbst gibt eine globale Quote von **28%** an (2024).

## Unsere Entscheidung

Unsere PET-Verpackung (♻1) wird in Standard-Sortieranlagen erkannt. Das BiB-Format trennt Karton und Folie sauber. Kein PolyAl, keine metallischen Laminate.`,
      it: `Milioni di persone buttano ogni settimana un tetrabrick nel bidone della raccolta differenziata, convinte che verrà riciclato. La realtà è più complessa.

## Il problema delle sei strati

Un tetrabrick non è semplice cartone. È un imballaggio multistrato composto da **75% cartone, 20% polietilene e 5% alluminio**, termosaldati insieme. La parte di cartone si recupera. Ma la miscela plastica-alluminio (PolyAl) richiede pirolisi a 500°C — costosa e raramente disponibile.

## I numeri reali

Le fonti ufficiali spagnole citano tassi fino al 78,8%. Lo studio indipendente Eunomia (2020) arriva al **21,4%**. Tetra Pak stessa dichiara un tasso globale del **28%** nel 2024.

## La nostra scelta

Il nostro packaging PET (♻1) viene riconosciuto da qualsiasi impianto di selezione. Il formato BiB separa nettamente cartone e sacca flessibile. Nessun PolyAl.`,
      nl: `Elke week gooien miljoenen mensen een pak in de gele container, overtuigd dat het gerecycled wordt. De werkelijkheid is complexer.

## Het zes-lagen-probleem

Een Tetrapak is geen gewoon karton. Het is een meerlagenverpakking van **75% karton, 20% polyethyleen en 5% aluminium**, thermisch gebonden. De kartonfractie is recupereerbaar. Maar het plastiek-aluminiummengsel (PolyAl) vereist pyrolyse bij 500°C — duur en zelden beschikbaar.

## De echte cijfers

Officiële Spaanse bronnen vermelden recyclingpercentages tot 78,8%. De onafhankelijke studie van Eunomia (2020) komt op **21,4%**. Tetra Pak zelf erkent een globaal percentage van **28%** in 2024.

## Onze keuze

Onze PET-verpakking (♻1) wordt door elke sorteerinstallatie herkend. Het BiB-formaat scheidt karton en flexibele zak duidelijk. Geen PolyAl.`,
      pt: `Todos as semanas, milhões de pessoas deitam um tetrabrick no contentor amarelo, convictas de que será reciclado. A realidade é mais complexa.

## O problema das seis camadas

Um tetrabrick não é simplesmente cartão. É uma embalagem multicamada composta por **75% cartão, 20% polietileno e 5% alumínio**, termicamente ligados. A fração de cartão pode ser recuperada. Mas a mistura plástico-alumínio (PolyAl) requer pirólise a 500°C — cara e raramente disponível.

## Os números reais

Fontes oficiais espanholas citam taxas de até 78,8%. O estudo independente Eunomia (2020) chega a **21,4%**. A própria Tetra Pak reconhece uma taxa global de **28%** em 2024.

## A nossa escolha

A nossa embalagem PET (♻1) é reconhecida por qualquer instalação de triagem. O formato BiB separa claramente cartão e bolsa flexível. Sem PolyAl, sem laminados metálicos.`,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ARTÍCULO 2 — Envases PET y BiB (13 mayo 2026)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'envases-pet-reciclable-bib-vs-vidrio-medio-ambiente',
    date: '2026-05-13',
    category: 'Sostenibilidad',
    readingMin: 10,
    image: '/images/blog/envases-pet-bib-vs-vidrio.jpg',
    title: {
      es: 'Envases PET reciclables y BiB: por qué son la mejor opción real para el planeta',
      en: 'Recyclable PET and BiB packaging: why they beat glass for the planet',
      fr: 'Emballages PET recyclables et BiB : pourquoi ils surpassent le verre',
      de: 'Recycelbare PET- und BiB-Verpackungen: besser als Glas für den Planeten',
      it: 'Imballaggi PET riciclabile e BiB: perché sono la scelta migliore per il pianeta',
      nl: 'Recyclebare PET- en BiB-verpakkingen: beter dan glas voor de planeet',
      pt: 'Embalagens PET recicláveis e BiB: por que são a melhor opção para o planeta',
    },
    excerpt: {
      es: '¿El vidrio es siempre más sostenible que el plástico? Los datos dicen otra cosa. Explicamos por qué elegimos PET reciclable y BiB, y qué dicen los estudios de ciclo de vida sobre la huella real de los envases.',
      en: 'Is glass always more sustainable than plastic? The data says otherwise. We explain why we choose recyclable PET and BiB, and what lifecycle studies say about the real footprint of packaging.',
      fr: 'Le verre est-il toujours plus durable que le plastique ? Les données disent autre chose. Analyse des cycles de vie et de notre choix PET et BiB.',
      de: 'Ist Glas immer nachhaltiger als Kunststoff? Die Daten sagen etwas anderes. Warum wir recycelbares PET und BiB wählen.',
      it: 'Il vetro è sempre più sostenibile della plastica? I dati dicono altro. Perché scegliamo PET riciclabile e BiB.',
      nl: 'Is glas altijd duurzamer dan plastic? De gegevens zeggen iets anders. Waarom wij kiezen voor recyclebaar PET en BiB.',
      pt: 'O vidro é sempre mais sustentável do que o plástico? Os dados dizem o contrário. Por que escolhemos PET reciclável e BiB.',
    },
    body: {
      es: `"¿Por qué no usáis vidrio?"

Es probablemente una de las preguntas más habituales que recibimos. Y es una pregunta justa. Durante años se nos ha enseñado que el vidrio es automáticamente más ecológico que el plástico. Pero cuando empezamos a estudiar seriamente el impacto ambiental real de nuestros envases, descubrimos algo incómodo: muchos de los datos no apuntaban hacia el vidrio como la mejor solución.

## Por qué el vidrio parece sostenible — y por qué esa percepción es solo parte de la historia

El vidrio se puede reciclar indefinidamente sin perder propiedades. Eso es verdad. El problema es que la mayor parte de los envases cosméticos en Europa no funcionan dentro de sistemas de retorno y reutilización. No existe una infraestructura donde los consumidores devuelvan sus botellas de champú para ser lavadas, rellenadas y redistribuidas 20 o 30 veces.

La comparación real no es "vidrio reutilizable infinito vs plástico desechable". La comparación real es: **una botella de vidrio de un solo uso frente a un envase PET reciclable.** Y ahí los resultados cambian.

## Lo que cuesta fabricar una botella de vidrio

### Hornos que nunca se apagan

Fabricar vidrio requiere entre **1.500 y 2.000 ºC**. Según la publicación *Deep Decarbonization of Glassmaking* (The American Ceramic Society, 2023), los hornos de vidrio no pueden apagarse entre 10 y 20 años. Cerca del 80% de esa energía procede todavía del gas natural.

La industria europea del vidrio de envase emite alrededor de **3,9 millones de toneladas de CO₂ al año** solo en procesos sujetos al sistema europeo de emisiones (BV Glas / glasstec).

### Las reacciones químicas inevitables

Aquí está la parte que rara vez se explica: el vidrio también emite CO₂ como consecuencia química inevitable de sus materias primas:

- La caliza (CaCO₃) → CaO + CO₂
- El carbonato sódico (Na₂CO₃) → Na₂O + CO₂

Estas emisiones ocurren **aunque el horno utilizara electricidad renovable**. Son intrínsecas al proceso.

Producir una tonelada de vidrio con gas natural genera entre 450 y 625 kg de CO₂. Cada botella individual emite entre 60 y 160 gramos de CO₂ solo durante su fabricación (ACerS, 2023).

### El peso lo cambia todo en el transporte

Una botella de vidrio vacía pesa entre **seis y ocho veces más** que una botella de PET equivalente. Más peso significa más combustible. Más combustible significa más emisiones.

## Los estudios de ciclo de vida que lo demuestran

Cuando se compara PET reciclable con vidrio de un solo uso, los resultados de los análisis de ciclo de vida (ACV) son consistentes:

**Franklin Associates / NAPCOR (2023):** las botellas PET generan menos emisiones de gases de efecto invernadero, menos consumo energético, menos uso de agua y menos residuos sólidos que las botellas de vidrio equivalentes.

**Science Insights (2026):** el sistema con vidrio generaba entre 790 y 1.137 kg de CO₂ equivalente por cada 1.000 litros de producto. El sistema con PET reciclado: entre 459 y 634 kg. Una reducción del **30% al 60%**.

**Imperial College London / Veolia (2019):** sustituir plástico por materiales alternativos incrementaría el peso total del envasado 3,6 veces, el consumo energético 2,2 veces y las emisiones de CO₂ 2,7 veces.

## El BiB de 5L: el envase que menos plástico usa de todos

Un Bag-in-Box combina una bolsa flexible ultraligera con una caja exterior de cartón. Nuestro formato BiB de 5 litros utiliza aproximadamente un **89% menos de plástico** que un envase rígido equivalente.

El estudio de BioIntelligence Service para Smurfit Kappa comparó cinco sistemas de envasado: el BiB de 3 litros obtuvo una **huella de carbono cinco veces menor** que una botella de vidrio equivalente. Y no solo ganó en emisiones — también en consumo de agua, energía primaria y acidificación atmosférica.

Según datos de Alfa Laval, un camión cargado con BiB equivale aproximadamente a **siete camiones de botellas de vidrio**.

## El resumen honesto

| Criterio | Vidrio | PET reciclable | BiB 5L |
|---|---|---|---|
| Emisiones fabricación | Alto | Medio-bajo | Muy bajo |
| Peso e impacto transporte | Alto | Bajo | Muy bajo |
| Huella de carbono total | Alta | Baja | Muy baja |

El vidrio gana cuando existe un sistema real de retorno y reutilización. El PET reciclable y el BiB ganan en cosmética y limpieza doméstica sin infraestructura de retorno. Esa es la razón por la que elegimos este sistema.

→ <a href="/eu/es/blog/tetrabrick-no-se-recicla-realidad-medioambiental">Lee también: El tetrabrick y el reciclaje: lo que la industria no cuenta</a>`,
      en: `"Why don't you use glass?"

It's probably one of the most common questions we receive. And it's a fair one. For years we have been taught that glass is automatically more ecological than plastic. But when we seriously studied the real environmental impact of our packaging, we found something uncomfortable: most data did not point to glass as the best solution.

## The real comparison

The comparison is not "infinitely reusable glass vs disposable plastic". In domestic cosmetics, it is: **a single-use glass bottle vs a recyclable PET bottle**. And the results shift considerably.

## The cost of making a glass bottle

Glass furnaces run at **1,500–2,000°C** and cannot be switched off for 10–20 years. Around 80% of that energy still comes from natural gas. On top of that, making glass generates CO₂ through unavoidable chemical reactions: limestone (CaCO₃) → CaO + CO₂. These emissions happen even with renewable electricity.

Per bottle: between 60 and 160 grams of CO₂ in manufacturing alone (ACerS, 2023). A glass bottle weighs **six to eight times more** than an equivalent PET bottle — multiplying transport emissions.

## What lifecycle studies say

**Franklin Associates / NAPCOR (2023):** PET bottles generate less greenhouse gas emissions, less energy consumption, less water use and less solid waste than equivalent glass bottles.

**Science Insights (2026):** glass-based systems generated 790–1,137 kg CO₂-eq per 1,000 litres of product. Recycled PET systems: 459–634 kg. A **30–60% reduction**.

## BiB 5L: lowest plastic of all

Our BiB format uses approximately **89% less plastic** than an equivalent rigid container. A BioIntelligence study for Smurfit Kappa found the BiB had a carbon footprint **five times lower** than an equivalent glass bottle. One lorry loaded with BiB replaces approximately **seven lorries of glass bottles** (Alfa Laval).

**The honest summary:** glass wins where real return/refill systems exist. In domestic cosmetics without that infrastructure, recyclable PET and BiB win — clearly.`,
      fr: `"Pourquoi pas le verre ?" C'est souvent la première question. La réponse est dans les données, pas dans les perceptions.

## La vraie comparaison

Pas "verre réutilisable vs plastique jetable". En cosmétique domestique : **une bouteille en verre à usage unique vs un emballage PET recyclable.**

## Le coût de la fabrication du verre

Les fours à verre fonctionnent à **1 500–2 000°C**, sans s'arrêter pendant 10 à 20 ans. 80% de l'énergie vient encore du gaz naturel. Des réactions chimiques inévitables libèrent également du CO₂ (calcaire → CaO + CO₂), même avec des énergies renouvelables. Chaque bouteille : 60 à 160 g de CO₂ rien qu'en fabrication. Poids : **six à huit fois plus lourd** que le PET équivalent.

## Les études de cycle de vie

Franklin Associates (2023) : le PET génère moins d'émissions, moins d'énergie, moins d'eau. Science Insights (2026) : le PET réduit les émissions de **30 à 60%** par rapport au verre.

## Le BiB 5L

**89% moins de plastique** qu'un emballage rigide équivalent. Empreinte carbone **cinq fois inférieure** au verre (BioIntelligence / Smurfit Kappa). Un camion BiB remplace sept camions de bouteilles de verre.`,
      de: `"Warum kein Glas?" — Eine berechtigte Frage, die wir häufig erhalten. Die Antwort liegt in den Daten.

## Der echte Vergleich

Nicht "unbegrenzt wiederverwendbares Glas vs Einwegplastik". Die reale Situation: **Einwegglasflasche vs recycelbare PET-Flasche.**

## Die Kosten der Glasherstellung

Glasöfen laufen bei **1.500–2.000°C** und können 10–20 Jahre nicht abgestellt werden. 80% der Energie kommt noch aus Erdgas. Chemische Reaktionen (Kalkstein → CaO + CO₂) sind unvermeidlich. Pro Flasche: 60–160 g CO₂ allein in der Herstellung. Gewicht: **sechs- bis achtmal schwerer** als PET.

## Ökobilanzen

Franklin Associates (2023): PET erzeugt weniger Treibhausgasemissionen, weniger Energie- und Wasserverbrauch. Science Insights (2026): PET reduziert Emissionen um **30–60%** gegenüber Glas.

## BiB 5L

**89% weniger Plastik** als ein gleichwertiger Hartbehälter. CO₂-Fußabdruck **fünfmal niedriger** als Glas (BioIntelligence / Smurfit Kappa).`,
      it: `"Perché non usate il vetro?" — Una domanda frequente e legittima. La risposta è nei dati.

## Il confronto reale

Non "vetro riutilizzabile all'infinito vs plastica usa e getta". In realtà: **bottiglia di vetro monouso vs imballaggio PET riciclabile.**

## Il costo della produzione del vetro

I forni del vetro funzionano a **1.500–2.000°C** senza spegnersi per 10–20 anni. L'80% dell'energia viene ancora dal gas naturale. Reazioni chimiche inevitabili (calcare → CaO + CO₂) avvengono anche con energia rinnovabile. Per bottiglia: 60–160 g di CO₂ solo nella produzione. Peso: **da sei a otto volte più pesante** del PET equivalente.

## Le analisi del ciclo di vita

Franklin Associates (2023): il PET genera meno emissioni, meno energia, meno acqua. Science Insights (2026): il PET riduce le emissioni del **30–60%** rispetto al vetro.

## BiB 5L

**89% meno plastica** di un contenitore rigido equivalente. Impronta carbonio **cinque volte inferiore** al vetro (BioIntelligence / Smurfit Kappa).`,
      nl: `"Waarom geen glas?" — Een veelgestelde en terechte vraag. Het antwoord ligt in de data.

## De echte vergelijking

Niet "oneindig herbruikbaar glas vs wegwerpplastic". De werkelijke situatie: **eenmalige glazen fles vs recyclebare PET-verpakking.**

## De kosten van glasproductie

Glasovens draaien op **1.500–2.000°C** en kunnen 10–20 jaar niet worden uitgeschakeld. 80% van de energie komt nog steeds uit aardgas. Onvermijdelijke chemische reacties (kalksteen → CaO + CO₂). Per fles: 60–160 g CO₂ alleen bij productie. Gewicht: **zes tot acht keer zwaarder** dan PET.

## Levenscyclusanalyses

Franklin Associates (2023): PET genereert minder broeikasgasemissies, minder energie, minder water. Science Insights (2026): PET reduceert emissies met **30–60%** ten opzichte van glas.

## BiB 5L

**89% minder plastic** dan een equivalente starre verpakking. CO₂-voetafdruk **vijf keer lager** dan glas (BioIntelligence / Smurfit Kappa).`,
      pt: `"Por que não usam vidro?" — Uma das perguntas mais frequentes. A resposta está nos dados.

## A comparação real

Não "vidro reutilizável ao infinito vs plástico descartável". A situação real: **garrafa de vidro de uso único vs embalagem PET reciclável.**

## O custo de produção do vidro

Os fornos de vidro funcionam a **1.500–2.000°C** sem parar durante 10–20 anos. 80% da energia vem ainda do gás natural. Reações químicas inevitáveis (calcário → CaO + CO₂) ocorrem mesmo com energia renovável. Por garrafa: 60–160 g de CO₂ só na produção. Peso: **seis a oito vezes mais pesado** que o PET equivalente.

## Análises de ciclo de vida

Franklin Associates (2023): o PET gera menos emissões de gases com efeito estufa, menos energia, menos água. Science Insights (2026): o PET reduz emissões em **30–60%** face ao vidro.

## BiB 5L

**89% menos plástico** do que uma embalagem rígida equivalente. Pegada de carbono **cinco vezes menor** do que o vidro (BioIntelligence / Smurfit Kappa).`,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ARTÍCULO 3 — Aceites botánicos (6 mayo 2026)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'aceites-botanicos-andalucia-argan-oliva-lavanda',
    date: '2026-05-06',
    category: 'Cosmética',
    readingMin: 8,
    image: '/images/landing/botanica.jpg',
    title: {
      es: 'Los aceites botánicos de Andalucía: por qué elegimos argán, oliva y lavanda',
      en: 'Botanical oils from Andalusia: why we choose argan, olive and lavender',
      fr: 'Huiles botaniques d\'Andalousie : pourquoi nous choisissons l\'argan, l\'olive et la lavande',
      de: 'Botanische Öle aus Andalusien: Warum wir Argan, Olive und Lavendel wählen',
      it: 'Gli oli botanici dell\'Andalusia: perché scegliamo argán, oliva e lavanda',
      nl: 'Botanische oliën uit Andalusië: waarom wij kiezen voor argan, olijf en lavendel',
      pt: 'Os óleos botânicos da Andaluzia: por que escolhemos argão, azeite e lavanda',
    },
    excerpt: {
      es: 'Aceite de argán, oliva virgen y lavanda: los tres pilares botánicos de Natura Esencials. Descubre de dónde los obtenemos, qué hacen en la piel y por qué los elegimos frente a alternativas más baratas.',
      en: 'Argan oil, virgin olive and lavender: the three botanical pillars of Natura Esencials. Discover where we source them, what they do for your skin, and why we choose them over cheaper alternatives.',
      fr: 'Huile d\'argan, olive vierge et lavande : les trois piliers botaniques de Natura Esencials. Leur origine, leur action et notre choix.',
      de: 'Arganöl, natives Olivenöl und Lavendel: die drei botanischen Säulen von Natura Esencials. Herkunft, Wirkung und unsere Wahl.',
      it: 'Olio di argán, oliva vergine e lavanda: i tre pilastri botanici di Natura Esencials. Origine, azione sulla pelle e perché li scegliamo.',
      nl: 'Arganolie, vierge olijfolie en lavendel: de drie botanische pijlers van Natura Esencials. Oorsprong, werking en onze keuze.',
      pt: 'Óleo de argão, azeite virgem e lavanda: os três pilares botânicos da Natura Esencials. Origem, ação na pele e por que os escolhemos.',
    },
    body: {
      es: `El olor de la lavanda recién abierta en el taller dura apenas unos segundos antes de mezclarse con el resto de ingredientes. A veces llega también una botella de aceite de oliva de Jaén todavía verde y ligeramente picante, o el tacto sedoso del argán prensado en frío sobre la punta de los dedos. Ahí empieza realmente una fórmula: no en una campaña de marketing, sino en la elección concreta de qué aceite entra dentro del producto y por qué.

En Natura Esencials trabajamos principalmente con tres aceites: argán, oliva virgen y lavanda. Cada uno aporta algo distinto. Y ninguno está elegido al azar.

## Por qué los aceites vegetales importan más de lo que parece

Los aceites vegetales no son simplemente una forma de "hidratar". Dentro de cada uno hay una combinación específica de ácidos grasos, antioxidantes, vitaminas liposolubles y compuestos aromáticos que interactúan con la piel y el cabello de formas muy concretas.

Un aceite refinado en exceso pierde parte de sus antioxidantes naturales. Uno mal conservado se oxida antes. La diferencia entre un aceite vegetal de calidad y uno barato no es teórica: se nota en la absorción, en la estabilidad del producto y en la sensación que deja.

En Natura Esencials la elección de cada aceite responde a cuatro criterios: origen trazable, estabilidad cosmética, afinidad con la piel mediterránea y equilibrio entre eficacia y accesibilidad.

## Aceite de argán — el que viaja más lejos para llegar aquí

### De dónde viene el argán que usamos

El árbol de argán (*Argania spinosa*) es originario del suroeste de Marruecos. Menos de **300 kilómetros** separan esa región de Marbella.

El aceite se obtiene mediante prensado en frío de las semillas del fruto. "Prensado en frío" no es una expresión estética: significa que no se alcanzan temperaturas que degraden los antioxidantes y ácidos grasos más sensibles. A la hora de elegir proveedor buscamos tres cosas: pureza, ausencia de refinado agresivo y trazabilidad.

### Qué le hace a la piel y al cabello

El argán contiene aproximadamente un **45% de ácido oleico** y cerca de un **35% de ácido linoleico**. También aporta tocoferoles naturales (vitamina E), escualeno y esteroles vegetales.

Hidrata sin dejar sensación pesada. Ayuda a proteger frente al estrés oxidativo. En el cabello actúa sellando la cutícula y mejorando el tacto sin endurecer.

Dentro de una emulsión o base cosmética bien construida el aceite se distribuye de forma más uniforme y estable, trabajando mejor que aplicado en solitario.

### En qué rituales lo encontrarás

El argán forma parte del <a href="/eu/es/rituales/plenitud-300">Ritual Plenitud</a> y del Ritual Performance, especialmente en el champú, acondicionador y leche corporal.

## Aceite de oliva virgen — el más cercano a casa

### Oliva de España: el activo que tenemos al lado

España produce alrededor del **40% del aceite de oliva mundial**. Andalucía concentra cerca del **80% de la producción española**. Uno de los ingredientes cosméticos más interesantes del Mediterráneo está prácticamente al lado del taller.

Trabajamos con proveedores de la provincia porque la proximidad importa de verdad: desde el momento del prensado comienza la oxidación natural del aceite.

Existe además una diferencia importante entre un aceite refinado industrial y un **aceite virgen extra** utilizado en cosmética. El refinado modifica el perfil de polifenoles y reduce parte de los antioxidantes presentes de forma natural.

### Por qué el aceite de oliva es excepcional para la piel

El aceite de oliva está compuesto principalmente por **ácido oleico** (55–83%), que es también el ácido graso predominante del manto lipídico de la piel humana. Esa afinidad explica por qué el aceite de oliva se absorbe de forma tan natural.

También contiene tocoferoles, escualeno e **hidroxitirosol**, uno de los antioxidantes más estudiados de la oliva, con propiedades antiinflamatorias especialmente interesantes en pieles reactivas.

### En qué rituales lo encontrarás

El aceite de oliva virgen aparece en el <a href="/eu/es/rituales/plenitud-300">Ritual Plenitud</a>, el <a href="/eu/es/rituales/ducha-perfecta-300">Ritual Ducha Perfecta</a>, el <a href="/eu/es/rituales/para-el">Ritual para Él</a> y el <a href="/eu/es/rituales/para-ella">Ritual para Ella</a>.

## Lavanda — la planta que une la piel y el hogar

### La lavanda andaluza: más cerca de lo que parece

La lavanda crece mucho más cerca del taller de lo que suele imaginarse. En la Serranía de Ronda, la Axarquía y zonas de Granada aparecen variedades de *Lavandula angustifolia* y *Lavandula latifolia* adaptadas al clima seco andaluz. Algunas plantaciones a menos de **90 kilómetros de Marbella**.

La lavanda andaluza suele presentar un perfil más intenso y ligeramente más alcanforado que la provenzal. El aceite esencial se obtiene mediante destilación por arrastre de vapor y se ajusta según el uso concreto: no es lo mismo formular un champú que un detergente de ropa.

### Qué hace la lavanda en cosmética y en el hogar

En cosmética aporta un efecto calmante y suavemente antibacteriano. Estudios han observado que sus compuestos aromáticos (linalool, acetato de linalilo) pueden ayudar a reducir marcadores relacionados con el estrés.

Pero hay un aspecto que para nosotros es todavía más importante: **la lavanda es el ingrediente que mejor resume la filosofía de Natura Esencials**. El mismo aceite esencial que aparece en un champú puede estar también en un detergente de ropa o en un limpiador del hogar. No creemos que deba existir una frontera radical entre lo que toca tu piel y lo que queda sobre tu ropa, tus sábanas o el ambiente de casa.

### En qué rituales lo encontrarás

La lavanda aparece en el <a href="/eu/es/rituales/plenitud-300">Ritual Plenitud</a>, el <a href="/eu/es/rituales/caricia">Ritual Caricia</a> y el <a href="/eu/es/rituales/para-ella">Ritual para Ella</a>.

## Por qué elegimos estos tres y no otros

El **argán** ofrece una combinación equilibrada entre nutrición y ligereza. El **oliva virgen** aporta estabilidad, proximidad y afinidad extraordinaria con la piel mediterránea. La **lavanda** conecta cosmética y hogar de manera coherente.

También importa el comportamiento real dentro de la fórmula. El argán es caro; el aceite de oliva virgen de proximidad es más accesible; la lavanda andaluza permite trabajar con calidad sin alcanzar el coste de algunas variedades francesas.

Queremos formular productos con ingredientes de origen vegetal bien seleccionados sin convertirlos en algo reservado para un consumo de lujo.

→ <a href="/eu/es/origen">Conoce nuestra filosofía de formulación</a> y <a href="/eu/es/rituales">todos los rituales donde estos aceites trabajan juntos</a>.`,
      en: `The scent of freshly opened lavender in the workshop lasts only a few seconds before blending with the other ingredients. Sometimes a bottle of Jaén olive oil arrives, still green and faintly peppery, or the silky touch of cold-pressed argan on fingertips. That is where a formula really begins: not in a marketing campaign, but in the concrete choice of which oil enters the product and why.

At Natura Esencials we work primarily with three oils: argan, virgin olive and lavender. Each contributes something different. None is chosen by chance.

## Why plant oils matter more than people think

Each oil contains a specific combination of fatty acids, antioxidants, fat-soluble vitamins and aromatic compounds that interact with skin and hair in concrete ways. An over-refined oil loses antioxidants. A poorly preserved one oxidises prematurely. The difference between a quality vegetable oil and a cheap one is not theoretical — it shows in absorption, product stability and skin feel.

## Argan oil — the one that travels furthest

The argan tree grows in south-west Morocco, less than **300 km from Marbella**. Cold-pressed (meaning no heat that would degrade sensitive fatty acids), it contains approximately 45% oleic acid and 35% linoleic acid, plus natural tocopherols (vitamin E) and squalene. It moisturises without heaviness and seals the hair cuticle without stiffening.

## Virgin olive oil — closest to home

Spain produces around **40% of the world's olive oil**. Andalusia accounts for roughly 80% of Spanish production. We source from local provincial suppliers because freshness matters — oxidation begins the moment pressing ends. Virgin olive oil's predominant fatty acid is oleic acid (55–83%), the same acid that dominates the human skin lipid barrier. That biological affinity explains its natural-feeling absorption.

## Lavender — the plant that links skin and home

Lavender grows within **90 km of our workshop** in the Serranía de Ronda and Axarquía. The Andalusian variety has a more intense, slightly camphor-forward profile than Provençal. Steam-distilled essential oil, adjusted per application.

Beyond its known calming properties (linalool, linalyl acetate reduce stress markers), lavender represents our core philosophy: **the same botanical ingredient that goes into a shampoo also goes into a laundry detergent**. We do not believe there should be a radical boundary between what touches your skin and what stays on your clothes or in your home environment.

## Why these three?

Argan balances nutrition and lightness. Virgin olive provides stability, local sourcing and exceptional skin affinity. Lavender connects personal care and home care coherently. All three work within real formulas at accessible price points — without becoming luxury-only products.`,
      fr: `Chez Natura Esencials nous travaillons avec trois huiles principales : argán, olive vierge et lavande. Chacune apporte quelque chose de précis. Aucune n'est choisie au hasard.

## Huile d'argan — venue de loin, mais proche

L'argan pousse au Maroc, à moins de **300 km de Marbella**. Pressée à froid, elle contient environ 45% d'acide oléique et 35% d'acide linoléique, plus des tocophérols naturels. Elle hydrate sans alourdir et referme la cuticule capillaire.

## Olive vierge — la plus proche

L'Espagne produit **40% de l'huile d'olive mondiale**, l'Andalousie représentant 80% de la production espagnole. Nous travaillons avec des fournisseurs provinciaux. L'acide oléique dominant (55–83%) est le même que celui du film hydrolipidique humain — d'où son absorption si naturelle.

## Lavande — le lien entre la peau et la maison

La lavande andalouse pousse à **90 km de notre atelier**. Son profil aromatique, plus intense que celui de la lavande provençale, fonctionne aussi bien en cosmétique qu'en entretien ménager. C'est l'essence qui résume notre philosophie : pas de frontière entre ce qui touche la peau et ce qui reste dans l'espace de vie.`,
      de: `Bei Natura Esencials arbeiten wir hauptsächlich mit drei Ölen: Argan, nativem Olivenöl und Lavendel. Jedes hat eine konkrete Funktion. Kein Zufall.

## Arganöl — von weit her, aber nah

Der Arganbaum wächst in Marokko, weniger als **300 km von Marbella** entfernt. Kaltgepresst enthält es ca. 45% Ölsäure und 35% Linolsäure sowie natürliche Tocopherole. Feuchtigkeitsspendend ohne Schwere, schließt die Haarschuppenschicht.

## Natives Olivenöl — am nächsten

Spanien produziert **40% des weltweiten Olivenöls**, Andalusien rund 80% der spanischen Produktion. Die dominierende Ölsäure (55–83%) ist dieselbe wie im menschlichen Hautlipidfilm — daher die natürliche Absorption.

## Lavendel — Verbindung zwischen Haut und Zuhause

Andalusischer Lavendel wächst **90 km vom Atelier** entfernt. Sein Profil ist intensiver als provenzalischer. Das essentielle Öl verbindet Kosmetik und Haushaltspflege — unser Grundprinzip: kein radikaler Unterschied zwischen dem, was die Haut berührt, und dem, was auf Kleidung oder in der Raumluft verbleibt.`,
      it: `In Natura Esencials lavoriamo principalmente con tre oli: argán, oliva vergine e lavanda. Ognuno ha una funzione precisa.

## Olio di argán — da lontano, ma vicino

L'albero dell'argán cresce in Marocco, a meno di **300 km da Marbella**. Spremuto a freddo, contiene ca. 45% di acido oleico e 35% di acido linoleico, più tocoferoli naturali. Idrata senza appesantire e sigilla la cuticola dei capelli.

## Olio di oliva vergine — il più vicino

La Spagna produce il **40% dell'olio d'oliva mondiale**, l'Andalusia circa l'80% della produzione spagnola. L'acido oleico dominante (55–83%) è lo stesso del film idrolipidico della pelle umana — da qui l'assorbimento così naturale.

## Lavanda — il legame tra pelle e casa

La lavanda andalusa cresce a **90 km dall'atelier**. Il suo profilo aromatico è più intenso di quello provenzale. È l'ingrediente che meglio riassume la nostra filosofia: nessuna frontiera radicale tra ciò che tocca la pelle e ciò che resta sull'ambiente domestico.`,
      nl: `Bij Natura Esencials werken we voornamelijk met drie oliën: argan, vierge olijfolie en lavendel. Elk heeft een concrete functie.

## Arganolie — ver weg, maar dichtbij

De arganboom groeit in Marokko, minder dan **300 km van Marbella**. Koudgeperst bevat het ca. 45% oliezuur en 35% linolzuur, plus natuurlijke tocoferolen. Voedt zonder te verzwaren en sluit de haarschubben.

## Vierge olijfolie — het dichtst bij huis

Spanje produceert **40% van de wereldwijde olijfolie**, Andalusië circa 80% van de Spaanse productie. Het dominante oliezuur (55–83%) is hetzelfde als in de menselijke huidlipidefilm — vandaar de natuurlijke absorptie.

## Lavendel — de verbinding tussen huid en thuis

Andalusische lavendel groeit op **90 km van ons atelier**. Zijn aromatisch profiel is intenser dan de Provençaalse. Het is het ingrediënt dat onze filosofie het beste samenvat: geen radicale grens tussen wat de huid raakt en wat in de leefomgeving achterblijft.`,
      pt: `Na Natura Esencials trabalhamos principalmente com três óleos: argão, azeite virgem e lavanda. Cada um tem uma função precisa.

## Óleo de argão — de longe, mas perto

A arganeira cresce em Marrocos, a menos de **300 km de Marbella**. Prensado a frio, contém ca. 45% de ácido oleico e 35% de ácido linoleico, mais tocoferóis naturais. Hidrata sem pesar e sela a cutícula capilar.

## Azeite virgem — o mais próximo de casa

A Espanha produz **40% do azeite mundial**, a Andaluzia cerca de 80% da produção espanhola. O ácido oleico dominante (55–83%) é o mesmo do filme hidrolipídico da pele humana — daí a absorção tão natural.

## Lavanda — a ligação entre pele e lar

A lavanda andaluza cresce a **90 km do atelier**. O seu perfil aromático é mais intenso do que a variedade provençal. É o ingrediente que melhor resume a nossa filosofia: nenhuma fronteira radical entre o que toca a pele e o que fica no espaço doméstico.`,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Artículos existentes
  // ─────────────────────────────────────────────────────────────────────────────

  {
    slug: 'por-que-ph-acido-champu-natural',
    date: '2026-04-28',
    category: 'Cosmética',
    readingMin: 4,
    image: '/images/landing/card-2.jpg',
    title: {
      es: '¿Qué pH debe tener el champú natural?',
      en: 'Natural shampoo: why acidic pH matters',
      fr: "pH acide du shampooing naturel : pourquoi",
      de: "Warum Naturshampoo sauer sein muss",
      it: "Shampoo naturale e pH acido: il perché",
      nl: "Natuurlijke shampoo en zure pH: de reden",
      pt: "Por que o champô natural deve ter pH ácido",
    },
    excerpt: {
      es: 'El pH del cabello está entre 4,5 y 5,5. Un champú con pH demasiado alto daña la cutícula. Explicamos la ciencia detrás de nuestra formulación.',
      en: 'Hair pH ranges from 4.5 to 5.5. A shampoo with too high a pH damages the cuticle. We explain the science behind our formulation.',
      fr: "Le pH du cheveu se situe entre 4,5 et 5,5. Un shampooing au pH trop élevé abîme la cuticule. La science derrière notre formulation.",
      de: "Der pH-Wert des Haares liegt zwischen 4,5 und 5,5. Ein Shampoo das zu wenig sauer ist, schädigt die Schuppenschicht und macht das Haar stumpf.",
      it: "Il pH dei capelli è compreso tra 4,5 e 5,5. Uno shampoo con pH troppo alto danneggia la cuticola.",
      nl: "De reden: de pH van haar ligt tussen 4,5 en 5,5. Een shampoo met een te hoge pH beschadigt de haarschubben en maakt het haar dof.",
      pt: "O pH do cabelo situa-se entre 4,5 e 5,5. Um champô com pH elevado danifica a cutícula.",
    },
    body: {
      es: `El cabello humano tiene un pH natural de entre 4,5 y 5,5 — ligeramente ácido. La cutícula capilar, esa capa de escamas que protege el tallo del cabello, se mantiene cerrada y suave en ese rango. Cuando la exponemos a productos con pH alcalino (entre 7 y 9, habitual en muchos champús convencionales), las escamas se abren, el cabello pierde brillo, se vuelve poroso y se rompe con más facilidad.

En Natura Esencials formulamos nuestro Champú 2 en 1 con un pH cuidadosamente ajustado entre 4,5 y 5,5. No es un detalle menor: es parte del protocolo de formulación ISO 16128 que seguimos en cada producto.

**¿Cómo lo conseguimos?** Usando tensioactivos de origen vegetal (coco y azúcar) que son intrínsecamente más suaves, y ajustando el pH con ácido cítrico al final del proceso de fabricación. Cada lote se mide con pHmetro calibrado antes del envasado.

El resultado es un cabello limpio, sin encrespamiento, con la cutícula intacta. Así de sencillo — y así de importante. El pH debe ser el primer criterio al elegir un champú.`,
      en: `Human hair has a natural pH of between 4.5 and 5.5 — slightly acidic. The hair cuticle, that layer of scales protecting the hair shaft, stays closed and smooth within that range. When exposed to products with alkaline pH (between 7 and 9, common in many conventional shampoos), the scales open, hair loses shine, becomes porous and breaks more easily.

At Natura Esencials we formulate our 2-in-1 Shampoo with a carefully adjusted pH between 4.5 and 5.5. This is not a minor detail — it is part of the ISO 16128 formulation protocol we follow in every product.

**How do we achieve it?** By using plant-based surfactants (coconut and sugar) that are inherently gentler, and adjusting pH with citric acid at the end of the manufacturing process. Each batch is measured with a calibrated pH meter before bottling.

The result is clean hair, without frizz, with the cuticle intact. That simple — and that important. pH matters more than most people realise.`,
      fr: `Le cheveu humain a un pH naturel compris entre 4,5 et 5,5. La cuticule capillaire reste fermée et lisse dans cette plage. Les produits au pH alcalin ouvrent les écailles, le cheveu perd son éclat et casse plus facilement.

Chez Natura Esencials, nous formulons notre Shampooing 2 en 1 avec un pH ajusté entre 4,5 et 5,5. Cela fait partie du protocole ISO 16128.

**Comment y parvenons-nous ?** En utilisant des tensioactifs d'origine végétale (coco et sucre) et en ajustant le pH avec de l'acide citrique.

Le résultat : un cheveu propre, sans frisottis, avec la cuticule intacte.`,
      de: `Menschliches Haar hat einen pH-Wert zwischen 4,5 und 5,5. Jedes gute Naturshampoo sollte einen sauren pH in diesem Bereich haben. Die Haarschuppenschicht bleibt geschlossen und glatt. Produkte mit alkalischem pH-Wert öffnen die Schuppen, das Haar verliert Glanz und bricht leichter.

Bei Natura Esencials formulieren wir unser 2-in-1-Shampoo mit einem pH-Wert zwischen 4,5 und 5,5. Das ist Teil des ISO 16128-Protokolls.

**Wie erreichen wir das?** Durch pflanzliche Tenside (aus Kokos und Zucker) und Anpassung des pH-Werts mit Zitronensäure.

Das Ergebnis: sauberes Haar, ohne Frizz, mit intakter Schuppenschicht. Ein Naturshampoo muss sauer sein — das ist keine Schwäche, sondern gute Chemie.`,
      it: `I capelli umani hanno un pH naturale tra 4,5 e 5,5. La cuticola capillare resta chiusa e liscia. I prodotti con pH alcalino aprono le squame, il capello perde lucentezza e si spezza più facilmente.

In Natura Esencials formuliamo il nostro Shampoo 2 in 1 con un pH regolato tra 4,5 e 5,5. Fa parte del protocollo ISO 16128.

**Come ci riusciamo?** Tensioattivi di origine vegetale (cocco e zucchero) e regolazione del pH con acido citrico.

Il risultato: capelli puliti, senza crespo, con la cuticola intatta.`,
      nl: `Menselijk haar heeft een pH tussen 4,5 en 5,5. De haarschubbenlaag blijft gesloten en glad bij een zure pH van 4,5 tot 5,5. Producten met alkalische pH openen de schubben, het haar verliest glans en breekt gemakkelijker.

Bij Natura Esencials formuleren we onze 2-in-1 Shampoo met een pH tussen 4,5 en 5,5. Dit maakt deel uit van het ISO 16128-protocol.

**Hoe bereiken we dit?** Plantaardige oppervlakteactieve stoffen (kokosnoot en suiker) en aanpassing van de pH met citroenzuur.

Het resultaat: schoon haar, zonder pluis, met intacte schubbenlaag. De reden is eenvoudig: een zure pH beschermt het haar van binnenuit.`,
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
      es: 'Limpieza sin químicos agresivos en casa',
      en: 'Cleaning without harsh chemicals: possible',
      fr: "Nettoyer sans produits chimiques agressifs",
      de: "Haus ohne aggressive Chemikalien reinigen",
      it: "Casa pulita senza prodotti aggressivi",
      nl: "Schoonmaken zonder agressieve middelen",
      pt: "Limpar a casa sem químicos agressivos",
    },
    excerpt: {
      es: 'Los productos de limpieza convencionales contienen compuestos que irritan las vías respiratorias y la piel. Nuestra línea Hogar demuestra que la eficacia y la naturalidad no están reñidas.',
      en: 'Conventional cleaning products contain compounds that irritate the airways and skin. Our Home line proves that efficacy and naturalness are not at odds.',
      fr: "Les produits ménagers conventionnels irritent les voies respiratoires et la peau. Notre ligne Maison prouve que efficacité et naturalité sont compatibles.",
      de: "Aggressive Chemikalien in Reinigungsprodukten reizen Atemwege und Haut. Unsere Haushaltslinie beweist, dass Wirksamkeit und Natürlichkeit vereinbar sind.",
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

Limpiar bien no requiere químicos agresivos ni agresividad química. Requiere buena formulación.`,
      en: `Spanish households consume an average of 12 kg of cleaning products per year. Most of them contain aggressive sulphates, synthetic fragrances and preservatives that, with repeated use, can irritate the airways, dry out the skin and accumulate in the environment.

When we designed our Home line, the question was not "how do we make a natural cleaning product?" but "how do we make a product that truly cleans and is also safe for daily use?"

**The key lies in surfactants.** We use coconut derivatives and sugar glucosides — biodegradable, effective at low concentrations and much gentler on the skin than conventional sulphonates.

**Fragrance matters, but not at any cost.** We scent with real essential oils: Málaga lemon, lavender, mint. No synthetic fragrances hidden under the term "parfum".

**The result.** Our Natural Floor Cleaner cleans without leaving residue, without rinsing, and with a safety profile suitable for homes with children and pets. The same applies to our Degreaser, Glass Cleaner and the rest of the range.

Cleaning well without harsh chemicals is perfectly possible — and requires nothing more than good formulation.`,
      fr: `Les foyers européens consomment en moyenne 12 kg de produits d'entretien par an. La plupart contiennent des sulfates agressifs et des parfums de synthèse qui irritent les voies respiratoires.

Notre ligne Maison a été conçue pour nettoyer vraiment tout en étant sûre au quotidien.

**La clé : les tensioactifs.** Dérivés de coco et glucosides de sucre, biodégradables et doux pour la peau.

**Le parfum compte.** Huiles essentielles réelles : citron de Málaga, lavande, menthe.

Notre Nettoyant Sols nettoie sans résidu, sans rinçage, adapté aux foyers avec enfants et animaux. Bien nettoyer ne nécessite pas de produits chimiques agressifs. Une bonne formulation suffit.`,
      de: `Europäische Haushalte verbrauchen durchschnittlich 12 kg Reinigungsprodukte pro Jahr. Die meisten enthalten aggressive Sulfate und synthetische Duftstoffe, die die Atemwege reizen.

Unsere Haushaltslinie wurde entwickelt, um wirklich zu reinigen und zugleich sicher für den täglichen Gebrauch zu sein.

**Der Schlüssel: die Tenside.** Kokosderivate und Zuckerglucoside, biologisch abbaubar und sanft zur Haut.

**Der Duft ist wichtig.** Echte ätherische Öle: Málaga-Zitrone, Lavendel, Minze.

Unser Bodenreiniger reinigt ohne Rückstände, ohne Nachspülen, sicher für Haushalte mit Kindern und Haustieren. Gründlich reinigen erfordert gute Formulierung, keine aggressiven Chemikalien.`,
      it: `Le famiglie europee consumano in media 12 kg di prodotti per la pulizia all'anno. La maggior parte contiene solfati aggressivi e profumi sintetici che irritano le vie respiratorie.

La nostra linea Casa è stata progettata per pulire davvero, in sicurezza quotidiana.

**La chiave: i tensioattivi.** Derivati del cocco e glucosidi dello zucchero, biodegradabili e delicati sulla pelle.

**Il profumo conta.** Veri oli essenziali: limone di Málaga, lavanda, menta.

Il nostro Detergente Pavimenti pulisce senza residui, senza risciacquo, sicuro per case con bambini e animali. Una casa pulita si ottiene con una buona formulazione, senza prodotti aggressivi.`,
      nl: `Europese huishoudens verbruiken gemiddeld 12 kg schoonmaakproducten per jaar. De meeste bevatten agressieve sulfaten en synthetische geurstoffen die de luchtwegen irriteren.

Onze Huishoudlijn is ontworpen om echt te reinigen en veilig te zijn voor dagelijks gebruik.

**De sleutel: oppervlakteactieve stoffen.** Kokosderivaten en suikerglucoside, biologisch afbreekbaar en mild voor de huid.

**Geur is belangrijk.** Echte essentiële oliën: Málaga-citroen, lavendel, munt.

Onze Vloerreiniger reinigt zonder residu, zonder naspoelen, veilig voor huishoudens met kinderen en huisdieren. Goed schoonmaken vereist de juiste middelen en goede formulering — geen agressieve chemicaliën.`,
      pt: `As famílias europeias consomem em média 12 kg de produtos de limpeza por ano. A maioria contém sulfatos agressivos e fragrâncias sintéticas que irritam as vias respiratórias.

A nossa linha Lar foi concebida para limpar a sério, com segurança diária.

**A chave: os tensioativos.** Derivados de coco e glucosídos de açúcar, biodegradáveis e suaves para a pele.

**O aroma importa.** Óleos essenciais reais: limão de Málaga, lavanda, menta.

O nosso Detergente de Chão limpa sem resíduos, sem enxaguamento, seguro para lares com crianças e animais. Limpar bem não requer químicos agressivos — requer boa formulação.`,
    },
  },
  {
    slug: 'que-significa-iso-16128',
    date: '2026-03-31',
    category: 'Formulación',
    readingMin: 3,
    image: '/images/landing/botanica.jpg',
    title: {
      es: 'Qué significa un cosmético ISO 16128',
      en: 'What does ISO 16128 mean for cosmetics?',
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
      de: "ISO 16128 definiert die Zutaten und Inhaltsstoffe in der Kosmetik. Was wirklich natürlich ist — und warum das wichtig ist.",
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
      fr: `Natural est l'un des mots les plus utilisés et les moins réglementés en cosmétique. ISO 16128 signifie la fin de cette ambiguïté.

**Qu'est-ce que l'ISO 16128 ?** Une norme technique internationale qui établit des critères pour classer les ingrédients cosmétiques comme naturels ou d'origine naturelle. Elle permet de calculer un indice de naturalité.

**Comment l'indice est-il calculé ?** Chaque ingrédient reçoit un score entre 0 et 1. L'indice final est la moyenne pondérée.

**En pratique ?** Un produit avec un indice de 96% a 96% de sa masse d'origine naturelle.

Chez Natura Esencials, la certification ISO 16128 est notre outil de formulation depuis le début.`,
      de: `Natürlich ist eines der am häufigsten verwendeten und am wenigsten regulierten Wörter auf dem Kosmetikmarkt. ISO 16128 bedeutet das Ende dieser Unklarheit.

**Was ist ISO 16128?** Ein internationaler Standard, der Kriterien für die Klassifizierung kosmetischer Inhaltsstoffe als natürlich oder natürlich gewonnen festlegt. Er ermöglicht die Berechnung eines Natürlichkeitsindex.

**Wie wird der Index berechnet?** Jeder Inhaltsstoff erhält eine Bewertung zwischen 0 und 1. Der Endindex ist der gewichtete Durchschnitt.

**In der Praxis?** Ein Produkt mit einem Index von 96% hat 96% seiner Masse aus natürlichen Inhaltsstoffen.

Bei Natura Esencials nutzen wir ISO 16128 von Anfang an als Formulierungswerkzeug.`,
      it: `Naturale è una delle parole più usate e meno regolamentate in cosmetica. Questo cambia con ISO 16128.

**Cos'è ISO 16128?** Uno standard tecnico internazionale che stabilisce criteri per classificare gli ingredienti cosmetici come naturali o di origine naturale. Permette di calcolare un indice di naturalità.

**Come si calcola l'indice?** Ogni ingrediente riceve un punteggio tra 0 e 1. L'indice finale è la media ponderata.

**Nella pratica?** Un prodotto con indice del 96% ha il 96% della massa di origine naturale.

In Natura Esencials questo significa avere un cosmetico sicuro, trasparente e verificabile fin dall'inizio.`,
      nl: `Natuurlijk is een van de meest gebruikte en minst gereguleerde woorden in cosmetica. Dat verandert met ISO 16128.

**Wat is ISO 16128?** Een internationale standaard die criteria vastlegt voor het classificeren van cosmetische ingrediënten als natuurlijk of van natuurlijke oorsprong. Het maakt de berekening mogelijk van een natuurlijkheidsindex.

**Hoe wordt de index berekend?** Elk ingrediënt krijgt een score tussen 0 en 1. De uiteindelijke index is het gewogen gemiddelde.

**In de praktijk?** Een product met een index van 96% heeft 96% van zijn massa uit natuurlijke ingrediënten.

Voor Natura Esencials betekent ISO 16128 transparante en eerlijke formulering vanaf het begin.`,
      pt: `Natural é uma das palavras mais usadas e menos regulamentadas em cosmética. Isso muda com a ISO 16128.

**O que é a ISO 16128?** Uma norma técnica internacional que estabelece critérios para classificar ingredientes cosméticos como naturais ou de origem natural. Permite calcular um índice de naturalidade.

**Como se calcula o índice?** Cada ingrediente recebe uma pontuação entre 0 e 1. O índice final é a média ponderada.

**Na prática?** Um produto com índice de 96% tem 96% da massa de origem natural.

Para a Natura Esencials, a certificação ISO 16128 significa formular com rigor e transparência desde o início.`,
    },
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
