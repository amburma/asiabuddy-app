/**
 * SEO Alternates Helper
 *
 * Generates canonical URLs and hreflang language alternates for international SEO.
 *
 * @param lang - Current language code (e.g., 'en', 'mm', 'th', 'de', 'fr', 'es')
 * @param pathWithoutLangPrefix - URL path after the /[lang] segment (e.g., '/thailand', '/thailand/tours', '/thailand/blog/some-slug')
 * @returns Object with canonical URL and language alternates map
 */

const BASE_URL = 'https://asiabuddy.app'
export const SUPPORTED_LANGUAGES = ['en', 'mm', 'th', 'de', 'fr', 'es'] as const

// Maps URL path language codes to ISO 639-1 hreflang codes
const PATH_TO_HREFLANG: Record<string, string> = {
  'mm': 'my', // Myanmar: path uses 'mm' (country code), hreflang uses 'my' (ISO 639-1)
}

export interface AlternatesResult {
  canonical: string
  languages: Record<string, string>
}

export function buildAlternates(
  lang: string,
  pathWithoutLangPrefix: string
): AlternatesResult {
  // Build canonical URL for current language
  const canonical = `${BASE_URL}/${lang}${pathWithoutLangPrefix}`

  // Build language alternates map
  const languages: Record<string, string> = {}

  // Add all supported language versions
  for (const supportedLang of SUPPORTED_LANGUAGES) {
    const hreflangCode = PATH_TO_HREFLANG[supportedLang] || supportedLang
    languages[hreflangCode] = `${BASE_URL}/${supportedLang}${pathWithoutLangPrefix}`
  }

  // Add x-default pointing to English version
  languages['x-default'] = `${BASE_URL}/en${pathWithoutLangPrefix}`

  return {
    canonical,
    languages,
  }
}
