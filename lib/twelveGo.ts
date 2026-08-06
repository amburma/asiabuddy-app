const AFFILIATE_ID = '16583584';
const SUPPORTED_12GO_LANGS = ['en', 'de', 'fr', 'es', 'zh', 'ja', 'th', 'vi', 'ru'];

export function generate12GoLink(params: {
  origin: string;        // e.g. 'bangkok'
  destination: string;   // e.g. 'phuket'
  date?: string;         // 'YYYY-MM-DD', optional
  lang?: string;         // default 'en'
}): string {
  const { origin, destination, date, lang = 'en' } = params;
  const safeLang = SUPPORTED_12GO_LANGS.includes(lang.toLowerCase()) ? lang.toLowerCase() : 'en';
  const base = `https://12go.asia/${safeLang}/travel/${origin}/${destination}`;
  const query = date ? `?date=${date}` : '';
  const separator = query ? '&' : '?';
  return `${base}${query}${separator}z=${AFFILIATE_ID}`;
}
