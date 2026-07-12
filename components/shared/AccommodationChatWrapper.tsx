'use client'

import AccommodationChat from '@/components/thailand/AccommodationChat'
import { ThaiLanguage } from '@/types/country'

interface AccommodationChatWrapperProps {
  language: ThaiLanguage
}

export default function AccommodationChatWrapper({ language }: AccommodationChatWrapperProps) {
  return <AccommodationChat language={language} />
}
