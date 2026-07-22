export const THAILAND_CITIES: Record<string, {
  cityId: number;        // Trip.com
  provinceId: number;    // Trip.com
  countryId: number;     // Trip.com
  agodaCityId: number;   // Agoda (confirmed via live capture, no formula)
}> = {
  "Bangkok":    { cityId: 359,   provinceId: 0,     countryId: 4, agodaCityId: 9395 },
  "Chiang Mai": { cityId: 623,   provinceId: 10218, countryId: 4, agodaCityId: 7401 },
  "Phuket":     { cityId: 725,   provinceId: 11032, countryId: 4, agodaCityId: 16056 },
  "Pattaya":    { cityId: 622,   provinceId: 10087, countryId: 4, agodaCityId: 8584 },
  "Krabi":      { cityId: 1405,  provinceId: 10129, countryId: 4, agodaCityId: 14865 },
  "Ayutthaya":  { cityId: 36030, provinceId: 11038, countryId: 4, agodaCityId: 17704 },
  "Koh Samui":  { cityId: 1229,  provinceId: 10245, countryId: 4, agodaCityId: 17198 },
};

export function buildTripComSearchValue(cityId: number): string {
  return `19|${cityId}*19*${cityId}*1`;
}

// Mapping from localized city names to English keys used in THAILAND_CITIES
export const CITY_NAME_MAPPING: Record<string, string> = {
  // Myanmar (Burmese)
  "ဘန်ကောက်": "Bangkok",
  "ဖူးခက်": "Phuket",
  "ချင်းမိုင်": "Chiang Mai",
  "ပတ္တရား": "Pattaya",
  "ကရာဘီ": "Krabi",
  "အယုဒ္ဓယ": "Ayutthaya",
  "ကိုစမွေ": "Koh Samui",
  // Thai
  "กรุงเทพมหานคร": "Bangkok",
  "ภูเก็ต": "Phuket",
  "เชียงใหม่": "Chiang Mai",
  "พัทยา": "Pattaya",
  "กระบี่": "Krabi",
  "พระนครศรีอยุธยา": "Ayutthaya",
  "เกาะสมุย": "Koh Samui",
};

export function normalizeCityName(cityName: string): string {
  return CITY_NAME_MAPPING[cityName] || cityName;
}
