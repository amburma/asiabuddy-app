// လိုအပ်သောအမျိုးအစား (၆) မျိုးအတွက် Type သတ်မှတ်ချက်
export type SupportedLanguage = 'EN' | 'TH' | 'MM' | 'ES' | 'FR' | 'DE';

export type ThaiLanguage = SupportedLanguage;

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
  flag: string; // Flag icon သို့မဟုတ် Emoji အတွက်
}

// သင်ချန်ထားလိုသော ဘာသာစကားများစာရင်း
export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'EN',
    label: 'ENGLISH',
    nativeLabel: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'TH',
    label: 'THAI',
    nativeLabel: 'ภาษาไทย',
    flag: '🇹🇭'
  },
  {
    code: 'MM',
    label: 'BURMESE',
    nativeLabel: 'မြန်မာ',
    flag: '🇲🇲'
  },
  {
    code: 'ES',
    label: 'SPANISH',
    nativeLabel: 'ESPAÑOL',
    flag: '🇪🇸'
  },
  {
    code: 'FR',
    label: 'FRENCH',
    nativeLabel: 'FRANÇAIS',
    flag: '🇫🇷'
  },
  {
    code: 'DE',
    label: 'GERMAN',
    nativeLabel: 'DEUTSCH',
    flag: '🇩🇪'
  }
];

export interface PillarItem {
  title: string;
  badge: string;
  description: string;
  etiquette?: string;
  seasonal?: string;
  vibe?: string;
  dietary?: string[];
  imageLabel: string;
}

export interface DestinationPillars {
  mustVisit: PillarItem[];
  dining: PillarItem[];
  otherExperiences: PillarItem[];
  uniqueActivities: PillarItem[];
  hiddenGems: PillarItem[];
}

export interface Destination {
  id: string;
  name: string;
  thaiName: string;
  overview: string;
  bestTime: string;
  pillars: DestinationPillars;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
