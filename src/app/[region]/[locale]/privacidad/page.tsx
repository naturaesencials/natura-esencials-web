import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import type { Locale, Region } from '@/lib/i18n/config';

interface Props { params: Promise<{ region: Region; locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale } = await params;
  return buildMetadata({ title: 'Política de Privacidad', description: 'Política de Privacidad de Natura Esencials Products, S.L. Málaga, Andalucía.', region, locale, path: 'privacidad' });
}

export default async function PrivacidadPage({ params }: Props) {
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
          dangerouslySetInnerHTML={{ __html: `<h2>Política de Privacidad</h2>
<p><strong>Última actualización: 20 de octubre de 2025</strong></p>
<p>Natura Esencials Products, S.L. gestiona esta tienda y sitio web para ofrecerle una experiencia de compra seleccionada. Esta Política de privacidad describe cómo recopilamos, utilizamos y divulgamos su información personal cuando visita, usa o realiza una compra a través de los Servicios.</p>

<h3>Información personal que recopilamos</h3>
<p>Podemos recopilar las siguientes categorías de información personal:</p>
<ul>
<li><strong>Detalles de contacto:</strong> nombre, dirección, dirección de facturación, dirección de envío, número de teléfono y correo electrónico.</li>
<li><strong>Información financiera:</strong> datos de tarjeta de crédito/débito procesados de forma segura por Shopify Payments.</li>
<li><strong>Información de la cuenta:</strong> nombre de usuario, contraseña y preferencias.</li>
<li><strong>Información sobre transacciones:</strong> artículos consultados, añadidos al carrito o comprados.</li>
<li><strong>Datos de uso:</strong> páginas visitadas, tiempo de permanencia, dirección IP y datos del dispositivo.</li>
</ul>

<h3>Cómo utilizamos su información</h3>
<ul>
<li>Procesar y gestionar sus pedidos.</li>
<li>Comunicarnos con usted sobre su pedido o consulta.</li>
<li>Enviarle comunicaciones comerciales si ha dado su consentimiento.</li>
<li>Mejorar nuestros productos y servicios.</li>
<li>Cumplir con obligaciones legales.</li>
</ul>

<h3>Compartir información con terceros</h3>
<p>Utilizamos Shopify como plataforma tecnológica para nuestros servicios de e-commerce. Shopify puede acceder a su información personal para ayudarnos a prestarle servicios. Puede consultar la política de privacidad de Shopify en <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener">shopify.com/legal/privacy</a>.</p>
<p>También utilizamos servicios de mensajería para el envío de correos electrónicos (Omnisend) y servicios de analítica web. No vendemos ni alquilamos su información personal a terceros.</p>

<h3>Sus derechos (RGPD)</h3>
<p>Si reside en la Unión Europea, tiene los siguientes derechos respecto a sus datos personales:</p>
<ul>
<li><strong>Acceso:</strong> solicitar una copia de sus datos personales.</li>
<li><strong>Rectificación:</strong> corregir datos inexactos.</li>
<li><strong>Supresión:</strong> solicitar la eliminación de sus datos.</li>
<li><strong>Limitación:</strong> restringir el tratamiento de sus datos.</li>
<li><strong>Portabilidad:</strong> recibir sus datos en formato estructurado.</li>
<li><strong>Oposición:</strong> oponerse al tratamiento de sus datos.</li>
</ul>
<p>Para ejercer estos derechos, contacte con nosotros en <a href="mailto:contacto@naturaesencials.com">contacto@naturaesencials.com</a>.</p>

<h3>Cookies</h3>
<p>Utilizamos cookies y tecnologías similares para mejorar su experiencia. Puede consultar nuestra <a href="cookies">Política de Cookies</a> para más información.</p>

<h3>Conservación de datos</h3>
<p>Conservamos sus datos personales durante el tiempo necesario para cumplir con los fines para los que fueron recopilados, salvo que la ley exija un período de conservación más largo.</p>

<h3>Contacto</h3>
<p>Si tiene preguntas sobre esta política, puede contactarnos en:<br/>
<strong>Natura Esencials Products, S.L.</strong><br/>
Málaga, Andalucía, España<br/>
<a href="mailto:contacto@naturaesencials.com">contacto@naturaesencials.com</a><br/>
+34 625 103 171</p>` }}
        />
        <p className="mt-12 border-t border-rule pt-6 text-[11px] uppercase tracking-[0.22em] text-graphite">
          Natura Esencials Products, S.L. · Málaga, Andalucía
        </p>
      </div>
    </main>
  );
}
