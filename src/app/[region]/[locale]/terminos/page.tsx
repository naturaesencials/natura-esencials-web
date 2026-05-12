import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import type { Locale, Region } from '@/lib/i18n/config';

interface Props { params: Promise<{ region: Region; locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, locale } = await params;
  return buildMetadata({ title: 'Términos y Condiciones', description: 'Términos y Condiciones de Natura Esencials Products, S.L. Málaga, Andalucía.', region, locale, path: 'terminos' });
}

export default async function TerminosPage({ params }: Props) {
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
          dangerouslySetInnerHTML={{ __html: `<h2>Términos y Condiciones del Servicio</h2>

<h3>Descripción general</h3>
<p>Le damos la bienvenida a Natura Esencials. Los términos "nosotros" y "nuestro(s)/nuestra(s)" hacen referencia a Natura Esencials Products, S.L. Al utilizar nuestros servicios, acepta cumplir con estos Términos del servicio y nuestra Política de privacidad.</p>

<h3>Sección 1: Acceso y cuenta</h3>
<p>Al aceptar estos Términos, usted declara tener al menos la mayoría de edad en su país de residencia. Para utilizar los servicios, puede que se le soliciten datos como dirección de correo electrónico, dirección de facturación, forma de pago y dirección de envío. Es exclusivamente responsable de la seguridad de las credenciales de su cuenta.</p>

<h3>Sección 2: Nuestros productos</h3>
<p>Hemos realizado todos los esfuerzos posibles para ofrecer una representación precisa de nuestros productos. Los colores pueden diferir respecto a cómo se ven en su pantalla. Todas las descripciones de productos están sujetas a cambios sin previo aviso.</p>

<h3>Sección 3: Pedidos</h3>
<p>Cuando realiza un pedido, hace una oferta de compra. Natura Esencials se reserva el derecho de aceptar o rechazar su pedido. Su pedido no se aceptará hasta que Natura Esencials confirme la aceptación y reciba el pago. Revise su pedido antes del envío, ya que es posible que no podamos dar lugar a solicitudes de cancelación una vez aceptado.</p>

<h3>Sección 4: Precios y facturación</h3>
<p>Los precios, descuentos y promociones están sujetos a cambios sin previo aviso. El precio cobrado por un producto será el que tenga efecto en el momento del pedido. Los precios publicados pueden no incluir impuestos o gastos de envío salvo que se indique expresamente.</p>

<h3>Sección 5: Envío y entrega</h3>
<p>Los tiempos de entrega son estimaciones y no se garantizan. No nos responsabilizamos por demoras ocasionadas por empresas de transporte, procesamiento aduanero o eventos fuera de nuestro control. Una vez entregados los productos a la empresa de transportes, el riesgo pasa a estar en manos del cliente.</p>

<h3>Sección 6: Devoluciones</h3>
<p>Dispone de 30 días naturales desde la recepción del pedido para solicitar una devolución. El producto debe estar en el mismo estado en que lo recibió, sin usar, con etiquetas y embalaje original. Consulte nuestra Política de Reembolso completa para más detalles. Para iniciar una devolución, contacte con nosotros en <a href="mailto:contacto@naturaesencials.com">contacto@naturaesencials.com</a> indicando su número de pedido.</p>

<h3>Sección 7: Propiedad intelectual</h3>
<p>Nuestros servicios, incluidos marcas, textos, imágenes, gráficos y diseños, son propiedad de Natura Esencials Products, S.L. o sus licenciantes. No puede reproducir, distribuir ni modificar el material sin nuestro consentimiento previo por escrito.</p>

<h3>Sección 8: Limitación de responsabilidad</h3>
<p>En la medida permitida por la ley aplicable, Natura Esencials no será responsable de daños indirectos, incidentales o consecuentes que surjan del uso de nuestros servicios.</p>

<h3>Sección 9: Legislación aplicable</h3>
<p>Estos Términos se regirán e interpretarán de conformidad con las leyes de España. Para cualquier disputa, las partes se someten a la jurisdicción de los tribunales de Málaga, España.</p>

<h3>Contacto</h3>
<p><strong>Natura Esencials Products, S.L.</strong><br/>
Málaga, Andalucía, España<br/>
<a href="mailto:contacto@naturaesencials.com">contacto@naturaesencials.com</a></p>` }}
        />
        <p className="mt-12 border-t border-rule pt-6 text-[11px] uppercase tracking-[0.22em] text-graphite">
          Natura Esencials Products, S.L. · Málaga, Andalucía
        </p>
      </div>
    </main>
  );
}
