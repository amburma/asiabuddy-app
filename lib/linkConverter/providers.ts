export interface AffiliateProvider {
  id: string;
  name: string;
  category: 'hotels' | 'activities' | 'transfers' | 'flights';
  domainPattern: RegExp;
  mode: 'auto' | 'manual';
  convert?: (url: string) => string;
  portalUrl?: string;
  instructions?: { en: string; mm: string };
}

// Helper function to append query parameters correctly
function appendQueryParam(url: string, param: string): string {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${param}`;
}

export const AFFILIATE_PROVIDERS: AffiliateProvider[] = [
  // === HOTELS ===
  {
    id: 'agoda',
    name: 'Agoda',
    category: 'hotels',
    domainPattern: /agoda\.com/i,
    mode: 'auto',
    convert: (url: string) => appendQueryParam(url, 'cid=1968300'),
  },
  {
    id: 'tripcom',
    name: 'Trip.com',
    category: 'hotels',
    domainPattern: /trip\.com/i,
    mode: 'auto',
    convert: (url: string) => appendQueryParam(url, 'Allianceid=9417346&SID=325250647'),
  },

  // === ACTIVITIES ===
  {
    id: 'klook',
    name: 'Klook',
    category: 'activities',
    domainPattern: /klook\.com/i,
    mode: 'auto',
    convert: (url: string) => appendQueryParam(url, 'aid=126322'),
  },
  {
    id: 'getyourguide',
    name: 'GetYourGuide',
    category: 'activities',
    domainPattern: /getyourguide\.com/i,
    mode: 'manual',
    portalUrl: 'https://partner.getyourguide.com/',
    instructions: {
      en: 'GetYourGuide requires generating links through their partner portal. Click below to open the portal, find your activity, and use their Link Builder tool.',
      mm: 'GetYourGuide သည် သူတို့၏ partner portal မှတစ်ဆင့် link များ ဖန်တီးရန် လိုအပ်ပါသည်။ အောက်တွင် နှိပ်ပြီး portal ကို ဖွင့်ပါ၊ သင့်လုပ်ငန်းစဉ်ကို ရှာဖွေပါ၊ နောက်တွင် သူတို့၏ Link Builder ကိရိယာကို အသုံးပြုပါ။',
    },
  },

  // === TRANSFERS ===
  {
    id: 'kiwitaxi',
    name: 'Kiwitaxi',
    category: 'transfers',
    domainPattern: /kiwitaxi\.com/i,
    mode: 'auto',
    convert: (url: string) => appendQueryParam(url, 'marker=746660'),
  },

  // === FLIGHTS ===
  {
    id: 'aviasales',
    name: 'Aviasales',
    category: 'flights',
    domainPattern: /aviasales\.com/i,
    mode: 'auto',
    convert: (url: string) => appendQueryParam(url, 'marker=746660'),
  },
];

// Helper function to find provider by URL with optional preferred ID
export function findProviderByUrl(url: string, preferredId?: string): AffiliateProvider | null {
  const matches = AFFILIATE_PROVIDERS.filter(p => p.domainPattern.test(url));
  if (matches.length === 0) return null;
  if (preferredId) {
    const preferred = matches.find(p => p.id === preferredId);
    if (preferred) return preferred;
  }
  return matches[0];
}

// Helper function to return ALL matching providers for a URL (needed for UI toggle)
export function findAllProvidersByUrl(url: string): AffiliateProvider[] {
  return AFFILIATE_PROVIDERS.filter(p => p.domainPattern.test(url));
}

// Helper function to get providers by category
export function getProvidersByCategory(category: 'hotels' | 'activities' | 'transfers' | 'flights'): AffiliateProvider[] {
  return AFFILIATE_PROVIDERS.filter(p => p.category === category);
}
