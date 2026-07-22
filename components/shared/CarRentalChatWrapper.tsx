'use client'

import CarRentalChat from '../thailand/CarRentalChat'
import { ThaiLanguage } from '../../types/country'

interface CarRentalChatWrapperProps {
  language: ThaiLanguage
}

export default function CarRentalChatWrapper({ language }: CarRentalChatWrapperProps) {
  return <CarRentalChat language={language} />
}
