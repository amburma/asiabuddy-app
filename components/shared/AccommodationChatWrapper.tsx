'use client'

import AccommodationChat from '../thailand/AccommodationChat'
import { ThaiLanguage } from '../../types/country'

interface AccommodationChatWrapperProps {
  language: ThaiLanguage
  onCitySelect?: (city: string) => void
}

export default function AccommodationChatWrapper({ language, onCitySelect }: AccommodationChatWrapperProps) {
  return <AccommodationChat language={language} onCitySelect={onCitySelect} />
}
