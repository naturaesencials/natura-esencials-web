/**
 * src/lib/reviews/translate.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Server-side review translation via Claude Haiku.
 *
 * Why this exists:
 *   Judge.me's auto-translation feature only works in their embedded JS widget,
 *   not via their REST API (per their docs). Since our website uses a custom
 *   widget that consumes /api/reviews, we translate reviews ourselves before
 *   sending them to the client.
 *
 * Caching:
 *   Translations are cached for 7 days via Next.js unstable_cache, keyed by
 *   (reviewId, locale, updated_at). updated_at in the key ensures the cache
 *   invalidates if Carlos edits a review in Judge.me admin.
 *
 * Fallback:
 *   If ANTHROPIC_API_KEY is missing or the API errors, the original text is
 *   returned (no translation). The widget continues to work as before.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { unstable_cache } from 'next/cache';

const LOCALE_NAMES: Record<string, string> = {
  es: 'Spanish',
  en: 'English',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  nl: 'Dutch',
  pt: 'Portuguese (European)',
};

const MODEL = 'claude-haiku-4-5-20251001';

async function translateOnce(text: string, targetLocale: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return text;
  if (!text || !text.trim()) return text;

  const targetName = LOCALE_NAMES[targetLocale] ?? 'English';

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content:
              `Translate the following customer product review to ${targetName}. ` +
              `If the text is already in ${targetName}, return it unchanged. ` +
              `Reply with ONLY the translated text, no preamble, no quotes, no commentary.\n\n` +
              text,
          },
        ],
      }),
    });

    if (!res.ok) return text;
    const data = await res.json();
    const out = data?.content?.[0]?.text;
    return typeof out === 'string' && out.trim() ? out.trim() : text;
  } catch {
    return text;
  }
}

/**
 * Translate text with 7-day cache, keyed by (reviewId, locale, updatedAt).
 * Pass updatedAt so cache busts when the review is edited.
 */
export async function translateReviewField(
  reviewId: number,
  text: string,
  targetLocale: string,
  updatedAt: string,
): Promise<string> {
  if (!text) return text;
  if (!LOCALE_NAMES[targetLocale]) return text;

  const cached = unstable_cache(
    async () => translateOnce(text, targetLocale),
    ['review-translate', String(reviewId), targetLocale, updatedAt],
    { revalidate: 7 * 24 * 3600, tags: ['reviews'] },
  );
  return cached();
}
