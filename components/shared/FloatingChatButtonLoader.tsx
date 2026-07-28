'use client'

import FloatingChatButton from './FloatingChatButton'

export default function FloatingChatButtonLoader({ language, country }: { language: string; country?: string }) {
  return <FloatingChatButton language={language} country={country} />
}
