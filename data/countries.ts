export interface Country {
  id: string;
  name: string;
  flag: string;
}

export const countries: Country[] = [
  { id: 'thailand', name: 'Thailand', flag: '🇹🇭' },
  { id: 'myanmar', name: 'Myanmar', flag: '🇲🇲' },
  { id: 'vietnam', name: 'Vietnam', flag: '🇻🇳' },
  { id: 'cambodia', name: 'Cambodia', flag: '🇰🇭' },
  { id: 'laos', name: 'Laos', flag: '🇱🇦' },
  { id: 'singapore', name: 'Singapore', flag: '🇸🇬' },
  { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾' },
  { id: 'indonesia', name: 'Indonesia', flag: '🇮🇩' },
  { id: 'philippines', name: 'Philippines', flag: '🇵🇭' },
];
