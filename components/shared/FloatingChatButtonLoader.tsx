'use client'

import FloatingChatButton from './FloatingChatButton'
import { usePathname } from 'next/navigation'

export default function FloatingChatButtonLoader({ language, country }: { language: string; country?: string }) {
  const pathname = usePathname()
  const raisedOnMobile = /^\/[^/]+\/[^/]+\/blog\/[^/]+$/.test(pathname || '')
  return <FloatingChatButton language={language} country={country} raisedOnMobile={raisedOnMobile} />
}
