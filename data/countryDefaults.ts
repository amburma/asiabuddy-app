export const countryDefaults: Record<string, { defaultCity: string }> = {
  thailand: { defaultCity: 'bangkok' },
  vietnam: { defaultCity: 'hanoi' },
}

// Returns the default city slug for a country.
// Falls back to 'bangkok' so existing Thailand behavior is unchanged for any unknown value.
export function getDefaultCity(country: string): string {
  return countryDefaults[country.toLowerCase()]?.defaultCity ?? 'bangkok'
}

export type CityOption = { slug: string; name: string }

const thailandCities: CityOption[] = [
  { slug: 'bangkok', name: 'Bangkok' },
  { slug: 'pattaya', name: 'Pattaya' },
  { slug: 'phuket', name: 'Phuket' },
  { slug: 'krabi', name: 'Krabi' },
  { slug: 'huahin', name: 'Hua Hin' },
  { slug: 'hatyai', name: 'Hat Yai' },
  { slug: 'kanchanaburi', name: 'Kanchanaburi' },
  { slug: 'pakchong', name: 'Pak Chong' },
  { slug: 'kochang', name: 'Ko Chang' },
  { slug: 'chiangmai', name: 'Chiang Mai' },
  { slug: 'chiangrai', name: 'Chiang Rai' },
  { slug: 'kosamui', name: 'Ko Samui' },
]

const vietnamCities: CityOption[] = [
  { slug: 'hanoi', name: 'Hanoi' },
  { slug: 'ho-chi-minh-city', name: 'Ho Chi Minh City' },
]

// Returns the list of city options for a country.
// Falls back to the Thailand list so existing behavior is unchanged for any unknown value.
export function getCountryCities(country: string): CityOption[] {
  const normalizedCountry = country.toLowerCase()
  if (normalizedCountry === 'vietnam') {
    return vietnamCities
  }
  return thailandCities
}

const thailandTicketCities: CityOption[] = [
  { slug: 'bangkok', name: 'Bangkok' },
  { slug: 'pattaya', name: 'Pattaya' },
  { slug: 'phuket', name: 'Phuket' },
  { slug: 'krabi', name: 'Krabi' },
  { slug: 'huahin', name: 'Hua Hin' },
  { slug: 'hatyai', name: 'Hat Yai' },
  { slug: 'kanchanaburi', name: 'Kanchanaburi' },
  { slug: 'pakchong', name: 'Pak Chong' },
  { slug: 'kochang', name: 'Ko Chang' },
  { slug: 'satun', name: 'Satun' },
  { slug: 'chiangrai', name: 'Chiang Rai' },
  { slug: 'kosamui', name: 'Ko Samui' },
]

const vietnamTicketCities: CityOption[] = [
  { slug: 'hanoi', name: 'Hanoi' },
  { slug: 'ho-chi-minh-city', name: 'Ho Chi Minh City' },
]

// Returns the list of city options for tickets for a country.
// Falls back to the Thailand tickets list so existing behavior is unchanged for any unknown value.
export function getCountryTicketCities(country: string): CityOption[] {
  const normalizedCountry = country.toLowerCase()
  if (normalizedCountry === 'vietnam') {
    return vietnamTicketCities
  }
  return thailandTicketCities
}
