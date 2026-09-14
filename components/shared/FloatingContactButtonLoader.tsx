'use client'

import FloatingContactButton from './FloatingContactButton'
import { usePathname } from 'next/navigation'

export default function FloatingContactButtonLoader({ language, country }: { language: string; country?: string }) {
  const pathname = usePathname()
  const raisedOnMobile = /^\/[^/]+\/blog\/[^/]+$/.test(pathname || '')
  return <FloatingContactButton language={language} country={country} raisedOnMobile={raisedOnMobile} />
}
