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
    },
    excerpt: {
      es: 'El pH del cabello está entre 4,5 y 5,5. Un champú con pH demasiado alto daña la cutícula. Explicamos la ciencia detrás de nuestra formulación.',
      en: 'Hair pH ranges from 4.5 to 5.5. A shampoo with too high a pH damages the cuticle. We explain the science behind our formulation.',
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
    },
    excerpt: {
      es: 'Los productos de limpieza convencionales contienen compuestos que irritan las vías respiratorias y la piel. Nuestra línea Hogar demuestra que la eficacia y la naturalidad no están reñidas.',
      en: 'Conventional cleaning products contain compounds that irritate the airways and skin. Our Home line proves that efficacy and naturalness are not at odds.',
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
    },
    excerpt: {
      es: 'ISO 16128 es el estándar internacional que define qué es un ingrediente natural en cosmética. No todos los productos que se dicen naturales lo son. Explicamos cómo interpretarlo.',
      en: 'ISO 16128 is the international standard that defines what constitutes a natural ingredient in cosmetics. Not all products claiming to be natural truly are. We explain how to interpret it.',
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
    },
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
