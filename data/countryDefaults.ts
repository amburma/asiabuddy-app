export const countryDefaults: Record<string, { defaultCity: string }> = {
  thailand: { defaultCity: 'bangkok' },
  vietnam: { defaultCity: 'hanoi' },
}

// Returns the default city slug for a country.
// Falls back to 'bangkok' so existing Thailand behavior is unchanged for any unknown value.
export function getDefaultCity(country: string): string {
  return countryDefaults[country.toLowerCase()]?.defaultCity ?? 'bangkok'
}
