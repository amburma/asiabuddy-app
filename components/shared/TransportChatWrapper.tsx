'use client'

import TransportChat from '../thailand/TransportChat'
import { ThaiLanguage } from '../../types/country'

interface TransportChatWrapperProps {
  language: ThaiLanguage
}

export default function TransportChatWrapper({ language }: TransportChatWrapperProps) {
  return <TransportChat language={language} destination="bangkok" />
}
