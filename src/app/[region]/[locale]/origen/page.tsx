import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import type { Locale, Region } from '@/lib/i18n/config';

interface Props { params: Promise<{ region: Region; locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale } = await params;
  return buildMetadata({
    title: 'Origen',
    description: 'Natura Esencials nace en Marbella en 2021. Formulamos a mano con materias primas de proveedores locales y nacionales bajo protocolo ISO 16128. Artesanía Hecha en Andalucía.',
    region, locale, path: 'origen',
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
    body0: 'Natura Esencials nace en Marbella con una premisa simple: los productos de cuidado personal y del hogar pueden ser naturales, eficaces y fabricados cerca de ti.',
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
      {icon:'🏺',label:'Artesanal',desc:'Artesanía Hecha en Andalucía'},
      {icon:'♻️',label:'Envase',desc:'Packaging reciclable'},
      {icon:'📍',label:'Local',desc:'Proveedores locales y nacionales'},
      {icon:'🚫',label:'Sin',desc:'Sin parabenos ni sulfatos agresivos'},
    ],
  },
  en: {
    kicker: 'Marbella · Andalusia · since 2021',
    h1a: 'Handmade,', h1b: 'with purpose.',
    body0: 'Natura Esencials was born in Marbella with a simple premise: personal care and home products can be natural, effective, and made close to you.',
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
      {icon:'🏺',label:'Artisan',desc:'Craftsmanship Made in Andalusia'},
      {icon:'♻️',label:'Packaging',desc:'Recyclable packaging'},
      {icon:'📍',label:'Local',desc:'Local and national suppliers'},
      {icon:'🚫',label:'Free from',desc:'No parabens or harsh sulphates'},
    ],
  },
};

function gc(locale: Locale) { return C[locale] ?? C.es; }

export default async function OrigenPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = gc(locale);

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
              <span className="text-2xl">{item.icon}</span>
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
                  <Image src={img as string} alt="" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
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
