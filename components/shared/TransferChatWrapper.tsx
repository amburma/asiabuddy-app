'use client'

import TransferChat from '@/components/thailand/TransferChat'
import { ThaiLanguage } from '@/types/country'

interface TransferChatWrapperProps {
  language: ThaiLanguage
}

export default function TransferChatWrapper({ language }: TransferChatWrapperProps) {
  return <TransferChat language={language} destination="bangkok" />
}
