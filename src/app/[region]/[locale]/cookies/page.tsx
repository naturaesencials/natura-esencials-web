import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import type { Locale, Region } from '@/lib/i18n/config';

interface Props { params: Promise<{ region: Region; locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale } = await params;
  return buildMetadata({ title: 'Política de Cookies', description: 'Política de Cookies de Natura Esencials Products, S.L. Málaga, Andalucía.', region, locale, path: 'cookies' });
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="px-pad-x py-pad-y">
      <div className="mx-auto max-w-3xl">
        <div
          className="prose prose-sm max-w-none
            [&_h2]:font-display [&_h2]:text-[clamp(28px,4vw,40px)] [&_h2]:tracking-[-0.02em] [&_h2]:mb-8
            [&_h3]:font-display [&_h3]:text-[clamp(18px,2.5vw,24px)] [&_h3]:tracking-[-0.01em] [&_h3]:mt-10 [&_h3]:mb-4
            [&_h4]:text-[13px] [&_h4]:font-semibold [&_h4]:uppercase [&_h4]:tracking-[0.15em] [&_h4]:mt-6 [&_h4]:mb-3
            [&_p]:text-[15px] [&_p]:leading-[1.9] [&_p]:text-ink/80 [&_p]:mb-4
            [&_ul]:mb-5 [&_li]:text-[15px] [&_li]:leading-[1.8] [&_li]:text-ink/80
            [&_a]:text-verde [&_a]:underline [&_a]:underline-offset-2
            [&_strong]:font-semibold [&_strong]:text-ink"
          dangerouslySetInnerHTML={{ __html: `<h2>Política de Cookies</h2>

<h3>¿Qué son las cookies?</h3>
<p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Permiten que el sitio web recuerde sus acciones y preferencias durante un período de tiempo.</p>

<h3>Cookies que utilizamos</h3>

<h4>Cookies esenciales (necesarias)</h4>
<p>Son imprescindibles para el funcionamiento del sitio web. Sin ellas, servicios como el carrito de compra no funcionarían correctamente.</p>
<ul>
<li><strong>cart</strong> — Shopify: almacena el contenido de su carrito de compra. Duración: 2 semanas.</li>
<li><strong>_shopify_s</strong> — Shopify: analítica de sesión interna. Duración: 30 minutos.</li>
<li><strong>_shopify_y</strong> — Shopify: analítica anual interna. Duración: 1 año.</li>
<li><strong>ne-cart-id-*</strong> — Natura Esencials: almacena el ID de su carrito. Duración: 2 semanas.</li>
</ul>

<h4>Cookies de preferencias</h4>
<ul>
<li><strong>ne-region</strong> — Almacena su preferencia de región (EU/UK) e idioma. Duración: 1 año.</li>
<li><strong>ne-cookie-consent</strong> — Registra si ha aceptado esta política de cookies. Duración: 1 año.</li>
</ul>

<h4>Cookies analíticas</h4>
<p>Si ha aceptado las cookies analíticas, utilizamos Google Analytics para comprender cómo los usuarios interactúan con nuestro sitio y mejorar su experiencia. Los datos se almacenan de forma anónima.</p>
<ul>
<li><strong>_ga</strong> — Google Analytics: distingue usuarios únicos. Duración: 2 años.</li>
<li><strong>_ga_*</strong> — Google Analytics: mantiene el estado de la sesión. Duración: 2 años.</li>
</ul>

<h4>Cookies de marketing</h4>
<p>Si ha aceptado las cookies de marketing, podemos mostrarle publicidad relevante en otras plataformas.</p>

<h3>Cómo gestionar las cookies</h3>
<p>Puede controlar y/o eliminar las cookies cuando lo desee. Puede eliminar todas las cookies almacenadas en su dispositivo y configurar la mayoría de navegadores para que no las acepten. Si lo hace, es posible que tenga que ajustar manualmente algunas preferencias cada vez que visite el sitio y que algunos servicios o funciones no operen correctamente.</p>

<p>Para gestionar las cookies en su navegador:</p>
<ul>
<li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Google Chrome</a></li>
<li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener">Mozilla Firefox</a></li>
<li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
</ul>

<h3>Contacto</h3>
<p>Si tiene preguntas sobre nuestra política de cookies, contacte con nosotros en <a href="mailto:contacto@naturaesencials.com">contacto@naturaesencials.com</a>.</p>` }}
        />
        <p className="mt-12 border-t border-rule pt-6 text-[11px] uppercase tracking-[0.22em] text-graphite">
          Natura Esencials Products, S.L. · Málaga, Andalucía
        </p>
      </div>
    </main>
  );
}
