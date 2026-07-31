export interface Country {
  id: string;
  name: string;
  flag: string;
  status: 'live' | 'coming-soon';
}

export const countries: Country[] = [
  { id: 'thailand', name: 'Thailand', flag: '🇹🇭', status: 'live' },
  { id: 'myanmar', name: 'Myanmar', flag: '🇲🇲', status: 'coming-soon' },
  { id: 'vietnam', name: 'Vietnam', flag: '🇻🇳', status: 'coming-soon' },
  { id: 'cambodia', name: 'Cambodia', flag: '🇰🇭', status: 'coming-soon' },
  { id: 'laos', name: 'Laos', flag: '🇱🇦', status: 'coming-soon' },
  { id: 'singapore', name: 'Singapore', flag: '🇸🇬', status: 'coming-soon' },
  { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾', status: 'coming-soon' },
  { id: 'indonesia', name: 'Indonesia', flag: '🇮🇩', status: 'coming-soon' },
  { id: 'philippines', name: 'Philippines', flag: '🇵🇭', status: 'coming-soon' },
  { id: 'japan', name: 'Japan', flag: '🇯🇵', status: 'coming-soon' },
  { id: 'germany', name: 'Germany', flag: '🇩🇪', status: 'coming-soon' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', status: 'coming-soon' },
];
