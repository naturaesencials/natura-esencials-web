import Link from 'next/link';
import Image from 'next/image';
import { posts } from '@/data/posts';
import { buildPath } from '@/lib/i18n/paths';
import type { Locale, Region } from '@/lib/i18n/config';

const LABELS: Record<string, { kicker: string; title: string; cta: string; readMin: string }> = {
  es: { kicker: 'Diario', title: 'Desde el taller.', cta: 'Leer', readMin: 'min' },
  en: { kicker: 'Journal', title: 'From the workshop.', cta: 'Read', readMin: 'min' },
  fr: { kicker: 'Journal', title: "Depuis l'atelier.", cta: 'Lire', readMin: 'min' },
  de: { kicker: 'Tagebuch', title: 'Aus der Werkstatt.', cta: 'Lesen', readMin: 'Min' },
  it: { kicker: 'Diario', title: 'Dal laboratorio.', cta: 'Leggi', readMin: 'min' },
  nl: { kicker: 'Dagboek', title: 'Vanuit het atelier.', cta: 'Lees', readMin: 'min' },
  pt: { kicker: 'Diário', title: 'Desde a oficina.', cta: 'Ler', readMin: 'min' },
};

interface Props { region: Region; locale: Locale; }

export function BlogPreview({ region, locale }: Props) {
  const lb = LABELS[locale] ?? LABELS.es;

  return (
    <section className="px-pad-x py-[clamp(56px,9vw,100px)]">
      {/* Header */}
      <div className="mb-[clamp(32px,5vw,56px)] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-verde">— {lb.kicker}</p>
          <h2 className="font-display text-h2-fluid leading-[0.96] tracking-[-0.025em]">
            {lb.title}
          </h2>
        </div>
        <Link
          href={buildPath(region, locale, 'blog')}
          className="inline-flex items-center border-b border-ink pb-1 text-[11px] uppercase tracking-[0.22em] hover:border-verde hover:text-verde transition-colors"
        >
          {lb.kicker} →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => {
          const title   = post.title[locale]   ?? post.title.es;
          const href    = buildPath(region, locale, `blog/${post.slug}`);

          return (
            <article key={post.slug} className="group">
              <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-paper">
                <Image
                  src={post.image}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 bg-bg px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-verde">
                  {post.category}
                </span>
              </div>
              <div className="mb-2 text-[11px] text-graphite">
                {post.readingMin} {lb.readMin}
              </div>
              <p className="mb-2 font-display text-[clamp(17px,1.8vw,20px)] leading-[1.2] tracking-[-0.01em] group-hover:text-verde transition-colors">
                <Link href={href}>{title}</Link>
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
