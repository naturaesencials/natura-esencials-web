import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildPath } from '@/lib/i18n/paths';
import { posts } from '@/data/posts';
import type { Locale, Region } from '@/lib/i18n/config';

interface Props { params: Promise<{ region: Region; locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale } = await params;
  const titles: Record<string, string> = {
    es: 'Diario', en: 'Journal', fr: 'Journal',
    de: 'Tagebuch', it: 'Diario', nl: 'Dagboek', pt: 'Diário',
  };
  const descriptions: Record<string, string> = {
    es: 'Formulación, ingredientes y rituales. El diario de Natura Esencials.',
    en: 'Formulation, ingredients and rituals. The Natura Esencials journal.',
    fr: 'Formulation, ingrédients et rituels. Le journal de Natura Esencials.',
    de: 'Formulierung, Zutaten und Rituale. Das Tagebuch von Natura Esencials.',
    it: 'Formulazione, ingredienti e rituali. Il diario di Natura Esencials.',
    nl: 'Formulering, ingrediënten en rituelen. Het dagboek van Natura Esencials.',
    pt: 'Formulação, ingredientes e rituais. O diário da Natura Esencials.',
  };
  return buildMetadata({
    title: titles[locale] ?? 'Journal',
    description: descriptions[locale] ?? descriptions.es,
    region, locale, path: 'blog',
    noIndex: region === 'uk' && process.env.NEXT_PUBLIC_UK_LIVE !== 'true',
  });
}

export default async function BlogPage({ params }: Props) {
  const { region, locale } = await params;
  setRequestLocale(locale);
  const lang = locale as string;

  const labels: Record<string, { title: string; sub: string; readMin: string; desc: string }> = {
    es: { title: 'Diario', sub: 'Formulación, ingredientes y rituales de cosmética natural.', readMin: 'min de lectura', desc: 'Artículos sobre formulación, ingredientes activos y rituales de cosmética natural artesanal. ISO 16128, origen natural y eficacia sin compromisos.' },
    en: { title: 'Journal', sub: 'Formulation, ingredients and natural cosmetics rituals.', readMin: 'min read', desc: 'Articles on formulation, active ingredients and natural cosmetics rituals. ISO 16128 certification, natural origin and efficacy without compromise.' },
    fr: { title: 'Journal', sub: 'Formulation, ingrédients et rituels de cosmétique naturelle.', readMin: 'min de lecture', desc: "Articles sur la formulation, les ingrédients actifs et les rituels de cosmétique naturelle. Certification ISO 16128, origine naturelle et efficacité sans compromis." },
    de: { title: 'Tagebuch', sub: 'Formulierung, Zutaten und Rituale für Naturkosmetik.', readMin: 'Min. Lesezeit', desc: 'Artikel über Formulierung, Wirkstoffe und Rituale für Naturkosmetik. ISO 16128 Zertifizierung, natürliche Inhaltsstoffe und Wirksamkeit ohne Kompromisse.' },
    it: { title: 'Diario', sub: 'Formulazione, ingredienti e rituali di cosmetica naturale.', readMin: 'min di lettura', desc: 'Articoli su formulazione, ingredienti attivi e rituali di cosmetica naturale. Certificazione ISO 16128, origine naturale ed efficacia senza compromessi.' },
    nl: { title: 'Dagboek', sub: 'Formulering, ingrediënten en rituelen voor natuurlijke cosmetica.', readMin: 'min lezen', desc: 'Artikelen over formulering, actieve ingrediënten en rituelen voor natuurlijke cosmetica. ISO 16128 certificering, natuurlijke oorsprong en effectiviteit.' },
    pt: { title: 'Diário', sub: 'Formulação, ingredientes e rituais de cosmética natural.', readMin: 'min de leitura', desc: 'Artigos sobre formulação, ingredientes ativos e rituais de cosmética natural. Certificação ISO 16128, origem natural e eficácia sem compromissos.' },
  };
  const readMoreLabels: Record<string, string> = {
    es: 'Leer artículo', en: 'Read article', fr: 'Lire l\'article',
    de: 'Artikel lesen', it: 'Leggi articolo', nl: 'Artikel lezen', pt: 'Ler artigo',
  };
  const lb = labels[lang] ?? labels.es;
  const readMoreLabel = readMoreLabels[lang] ?? readMoreLabels.en;

  return (
    <main className="px-pad-x py-pad-y">
      {/* Header */}
      <header className="mb-[clamp(40px,6vw,72px)] border-b border-rule pb-[clamp(32px,4vw,48px)]">
        <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-verde">— {lb.title}</p>
        <h1 className="font-display text-h1-fluid leading-[0.96] tracking-[-0.025em]">
          {lb.sub}
        </h1>
        <p className="mt-4 text-[15px] leading-[1.85] text-graphite max-w-xl">
          {lb.desc}
        </p>
      </header>

      {/* Grid de artículos */}
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const title   = post.title[lang]   ?? post.title.es;
          const excerpt = post.excerpt[lang] ?? post.excerpt.es;
          const href    = buildPath(region, locale, `blog/${post.slug}`);
          const [year, month, day] = post.date.split('-');
          const dateStr = new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-GB' : lang, {
            day: 'numeric', month: 'long', year: 'numeric',
          });

          return (
            <article key={post.slug} className="group">
              {/* Imagen */}
              <div className="relative mb-5 aspect-[4/3] overflow-hidden bg-paper">
                <Image
                  src={post.image}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 bg-bg px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-verde">
                  {post.category}
                </span>
              </div>

              {/* Meta */}
              <div className="mb-2 flex items-center gap-3 text-[11px] text-graphite">
                <time dateTime={post.date}>{dateStr}</time>
                <span>·</span>
                <span>{post.readingMin} {lb.readMin}</span>
              </div>

              {/* Título como link */}
              <h2 className="mb-2 font-display text-[clamp(18px,2vw,22px)] leading-[1.15] tracking-[-0.01em] transition-colors group-hover:text-verde">
                <Link href={href}>{title}</Link>
              </h2>

              {/* Excerpt */}
              <p className="text-[13px] leading-[1.7] text-graphite line-clamp-3">{excerpt}</p>

              <span className="mt-3 inline-block border-b border-ink pb-0.5 text-[11px] uppercase tracking-[0.22em] text-verde">
                {readMoreLabel} →
              </span>
            </article>
          );
        })}
      </div>
    </main>
  );
}
