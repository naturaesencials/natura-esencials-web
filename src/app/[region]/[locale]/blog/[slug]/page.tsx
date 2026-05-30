import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildPath } from '@/lib/i18n/paths';
import { posts, getPostBySlug } from '@/data/posts';
import type { Locale, Region } from '@/lib/i18n/config';

interface Props { params: Promise<{ region: Region; locale: Locale; slug: string }>; }

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const fullTitle = post.title[locale] ?? post.title.es;
  // Meta title corto: parte antes de ":" (el gancho conciso que escribió el autor).
  // El título completo se mantiene como H1 en la página. Fallback si no hay ":".
  const leadTitle = fullTitle.split(/\s*:\s*/)[0].trim();
  const metaTitle = leadTitle.length >= 10 ? leadTitle : fullTitle;
  return buildMetadata({
    title: metaTitle,
    description: post.excerpt[locale] ?? post.excerpt.es,
    region, locale,
    path: `blog/${slug}`,
    // Blog content en español → noindex si locale ≠ es y no hay body traducido
    // También noindex para UK (Coming soon)
    noIndex: (region === 'uk' && process.env.NEXT_PUBLIC_UK_LIVE !== 'true') || (!post.body[locale] && locale !== 'es'),
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { region, locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const lang    = locale as string;
  const title   = post.title[lang]   ?? post.title.es;
  const body    = post.body[lang]    ?? post.body.es;
  const backLabels: Record<string, string> = {
    es: '← Diario', en: '← Journal', fr: '← Journal',
    de: '← Tagebuch', it: '← Diario', nl: '← Dagboek', pt: '← Diário',
  };
  const backLbl = backLabels[lang] ?? '← Diario';
  const dateStr = new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-GB' : lang, {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  // Artículos relacionados: misma categoría primero, luego más recientes
  const relatedLabels: Record<string, string> = {
    es: 'Artículos relacionados', en: 'Related articles', fr: 'Articles liés',
    de: 'Ähnliche Artikel', it: 'Articoli correlati', nl: 'Gerelateerde artikelen',
    pt: 'Artigos relacionados',
  };
  const relatedLbl = relatedLabels[lang] ?? relatedLabels.es;
  const related = posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const ca = a.category === post.category ? 0 : 1;
      const cb = b.category === post.category ? 0 : 1;
      if (ca !== cb) return ca - cb;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  return (
    <main className="px-pad-x py-pad-y">
      <div className="mx-auto max-w-2xl">

        {/* Back */}
        <Link
          href={buildPath(region, locale, 'blog')}
          className="mb-8 inline-block text-[11px] uppercase tracking-[0.22em] text-graphite transition-colors hover:text-verde"
        >
          {backLbl}
        </Link>

        {/* Meta */}
        <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] text-graphite">
          <span className="border border-rule px-2.5 py-1 text-verde">{post.category}</span>
          <time dateTime={post.date}>{dateStr}</time>
          <span>·</span>
          <span>{post.readingMin} min</span>
        </div>

        {/* Título */}
        <h1 className="mb-8 font-display text-[clamp(28px,4vw,48px)] leading-[1.05] tracking-[-0.025em]">
          {title}
        </h1>

        {/* Imagen */}
        <div className="relative mb-10 aspect-[16/9] overflow-hidden bg-paper">
          <Image src={post.image} alt={title} fill sizes="(min-width:768px) 672px, 100vw" className="object-cover" />
        </div>

        {/* Cuerpo */}
        <div className="prose prose-sm max-w-none text-[15px] leading-[1.9] text-ink/85
          [&_strong]:font-semibold [&_strong]:text-ink
          [&_p]:mb-5
          [&_p+p]:mt-0">
          {body.split('\n\n').map((para, i) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              return <p key={i}><strong>{para.slice(2, -2)}</strong></p>;
            }
            // Inline bold: **text**
            const parts = para.split(/\*\*(.*?)\*\*/g);
            return (
              <p key={i}>
                {parts.map((part, j) =>
                  j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                )}
              </p>
            );
          })}
        </div>

        {/* Artículos relacionados (enlaces internos) */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-16 border-t border-rule pt-10">
            <h2 id="related-heading" className="mb-8 font-display text-[clamp(20px,2.4vw,28px)] tracking-[-0.01em]">
              {relatedLbl}
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {related.map((rp) => {
                const rTitle = rp.title[lang] ?? rp.title.es;
                const rHref  = buildPath(region, locale, `blog/${rp.slug}`);
                return (
                  <Link key={rp.slug} href={rHref} className="group block">
                    <div className="relative mb-3 aspect-[4/3] overflow-hidden bg-paper">
                      <Image
                        src={rp.image}
                        alt={rTitle}
                        fill
                        sizes="(min-width:640px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mb-1.5 text-[10px] uppercase tracking-[0.22em] text-verde">{rp.category}</div>
                    <p className="font-display text-[clamp(15px,1.6vw,18px)] leading-[1.25] tracking-[-0.01em] transition-colors group-hover:text-verde">
                      {rTitle}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Footer del artículo */}
        <div className="mt-12 border-t border-rule pt-8 text-center">
          <Link
            href={buildPath(region, locale, 'blog')}
            className="inline-flex items-center gap-2 border-b border-ink pb-0.5 text-[11px] uppercase tracking-[0.28em] transition-colors hover:border-verde hover:text-verde"
          >
            {backLbl}
          </Link>
        </div>

      </div>
    </main>
  );
}
