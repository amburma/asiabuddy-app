export interface Country {
  id: string;
  name: string;
  flag: string;
  active: boolean;
}

export const countries: Country[] = [
  { id: 'thailand', name: 'Thailand', flag: '🇹🇭', active: true },
  { id: 'myanmar', name: 'Myanmar', flag: '🇲🇲', active: false },
  { id: 'vietnam', name: 'Vietnam', flag: '🇻🇳', active: false },
  { id: 'cambodia', name: 'Cambodia', flag: '🇰🇭', active: false },
  { id: 'laos', name: 'Laos', flag: '🇱🇦', active: false },
  { id: 'singapore', name: 'Singapore', flag: '🇸🇬', active: false },
  { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾', active: false },
  { id: 'indonesia', name: 'Indonesia', flag: '🇮🇩', active: false },
  { id: 'philippines', name: 'Philippines', flag: '🇵🇭', active: false },
  { id: 'japan', name: 'Japan', flag: '🇯🇵', active: false },
  { id: 'germany', name: 'Germany', flag: '🇩🇪', active: false },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', active: false },
];
