// Envío del email de bienvenida con el código de descuento, vía Resend.
// Requiere RESEND_API_KEY en el entorno. From configurable con RESEND_FROM.

export type SendResult = { ok: boolean; error?: string; detail?: string };

const STORE_URL = 'https://www.naturaesencials.com';
const DEFAULT_FROM = 'Natura Esencials <hola@send.naturaesencials.com>';
const REPLY_TO = 'contacto@naturaesencials.com';

type LocaleKey = 'es' | 'en' | 'fr' | 'de' | 'it' | 'nl' | 'pt';

type Copy = {
  subject: string;
  greeting: string;
  intro: string;
  codeLabel: string;
  apply: string;
  cta: string;
  signoff: string;
};

const COPY: Record<LocaleKey, Copy> = {
  es: {
    subject: 'Tu 10 % de bienvenida 🌿',
    greeting: 'Hola,',
    intro: 'Gracias por unirte a Natura Esencials. Como bienvenida, aquí tienes un 10 % de descuento en tu primer pedido:',
    codeLabel: 'Tu código',
    apply: 'Introdúcelo en el checkout. Cosmética y cuidado del hogar artesanal, elaborados en Marbella.',
    cta: 'Descubrir la tienda',
    signoff: 'Con cariño, Natura Esencials',
  },
  en: {
    subject: 'Your 10% welcome gift 🌿',
    greeting: 'Hello,',
    intro: "Thank you for joining Natura Esencials. As a welcome, here's 10% off your first order:",
    codeLabel: 'Your code',
    apply: 'Enter it at checkout. Artisanal skincare and home care, handmade in Marbella.',
    cta: 'Explore the shop',
    signoff: 'Warmly, Natura Esencials',
  },
  fr: {
    subject: 'Votre 10 % de bienvenue 🌿',
    greeting: 'Bonjour,',
    intro: "Merci d'avoir rejoint Natura Esencials. En guise de bienvenue, voici 10 % de réduction sur votre première commande :",
    codeLabel: 'Votre code',
    apply: 'Saisissez-le au moment du paiement. Cosmétiques et entretien de la maison artisanaux, fabriqués à Marbella.',
    cta: 'Découvrir la boutique',
    signoff: 'Avec soin, Natura Esencials',
  },
  de: {
    subject: 'Ihre 10 % Willkommensrabatt 🌿',
    greeting: 'Hallo,',
    intro: 'Danke, dass Sie Natura Esencials beigetreten sind. Als Willkommensgruß erhalten Sie 10 % Rabatt auf Ihre erste Bestellung:',
    codeLabel: 'Ihr Code',
    apply: 'Geben Sie ihn an der Kasse ein. Handwerkliche Kosmetik und Haushaltspflege, hergestellt in Marbella.',
    cta: 'Zum Shop',
    signoff: 'Herzlich, Natura Esencials',
  },
  it: {
    subject: 'Il tuo 10 % di benvenuto 🌿',
    greeting: 'Ciao,',
    intro: 'Grazie per esserti unito a Natura Esencials. Come benvenuto, ecco il 10 % di sconto sul tuo primo ordine:',
    codeLabel: 'Il tuo codice',
    apply: 'Inseriscilo al momento del pagamento. Cosmesi e cura della casa artigianali, realizzati a Marbella.',
    cta: 'Scopri il negozio',
    signoff: 'Con affetto, Natura Esencials',
  },
  nl: {
    subject: 'Jouw 10 % welkomstkorting 🌿',
    greeting: 'Hallo,',
    intro: 'Bedankt dat je je hebt aangesloten bij Natura Esencials. Als welkom krijg je 10 % korting op je eerste bestelling:',
    codeLabel: 'Jouw code',
    apply: 'Voer hem in bij het afrekenen. Ambachtelijke cosmetica en huisverzorging, gemaakt in Marbella.',
    cta: 'Ontdek de winkel',
    signoff: 'Hartelijk, Natura Esencials',
  },
  pt: {
    subject: 'Os teus 10 % de boas-vindas 🌿',
    greeting: 'Olá,',
    intro: 'Obrigado por te juntares à Natura Esencials. Como boas-vindas, aqui tens 10 % de desconto na tua primeira encomenda:',
    codeLabel: 'O teu código',
    apply: 'Introdu-lo no checkout. Cosmética e cuidado do lar artesanais, feitos em Marbella.',
    cta: 'Descobrir a loja',
    signoff: 'Com carinho, Natura Esencials',
  },
};

function pickLocale(locale?: string): LocaleKey {
  const l = (locale || 'es').slice(0, 2).toLowerCase();
  return (['es', 'en', 'fr', 'de', 'it', 'nl', 'pt'] as const).includes(l as LocaleKey)
    ? (l as LocaleKey)
    : 'es';
}

function renderHtml(c: Copy, code: string, shopHref: string): string {
  return `<!doctype html><html><body style="margin:0;background:#FAFAF5;font-family:Georgia,'Times New Roman',serif;color:#0F2018">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF5">
    <tr><td align="center" style="padding:40px 20px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#FFFFFF;border:1px solid #E7E4DA">
        <tr><td style="padding:40px 40px 8px">
          <p style="margin:0;font-size:12px;letter-spacing:0.25em;text-transform:uppercase;color:#3A6B47">Natura Esencials</p>
        </td></tr>
        <tr><td style="padding:16px 40px 0">
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6">${c.greeting}</p>
          <p style="margin:0 0 24px;font-size:16px;line-height:1.6">${c.intro}</p>
        </td></tr>
        <tr><td style="padding:0 40px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center" style="padding:20px;background:#F4F2EA;border:1px dashed #3A6B47">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#5E6B5C">${c.codeLabel}</p>
              <p style="margin:0;font-size:26px;letter-spacing:0.15em;font-weight:bold;color:#0F2018">${code}</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 40px 0">
          <p style="margin:0 0 28px;font-size:14px;line-height:1.6;color:#5E6B5C">${c.apply}</p>
        </td></tr>
        <tr><td style="padding:0 40px 8px">
          <a href="${shopHref}" style="display:inline-block;padding:14px 28px;background:#3A6B47;color:#FAFAF5;text-decoration:none;font-size:13px;letter-spacing:0.1em;text-transform:uppercase">${c.cta}</a>
        </td></tr>
        <tr><td style="padding:32px 40px 40px">
          <p style="margin:0;font-size:14px;line-height:1.6;color:#5E6B5C">${c.signoff}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function sendWelcomeEmail(args: {
  email: string;
  locale?: string;
  region?: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || DEFAULT_FROM;
  const code = process.env.WELCOME_DISCOUNT_CODE || '0KBYV7ANYCG1';

  if (!apiKey) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[Resend] RESEND_API_KEY ausente en producción — el email NO se ha enviado');
      return { ok: false, error: 'resend_not_configured' };
    }
    console.warn('[Resend] RESEND_API_KEY no configurada — skip (dev)');
    return { ok: true };
  }

  const locale = pickLocale(args.locale);
  const region = args.region || 'eu';
  const c = COPY[locale];
  const shopHref = `${STORE_URL}/${region}/${locale}`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [args.email],
        reply_to: REPLY_TO,
        subject: c.subject,
        html: renderHtml(c, code, shopHref),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('[Resend] send failed:', res.status, detail);
      return { ok: false, error: 'resend_error', detail: `${res.status} ${detail}`.slice(0, 300) };
    }
    return { ok: true };
  } catch (e: any) {
    console.error('[Resend] request failed:', e?.message || e);
    return { ok: false, error: 'resend_request_failed' };
  }
}
