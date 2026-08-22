'use client'

import FloatingContactButton from './FloatingContactButton'

export default function FloatingContactButtonLoader({ language, country }: { language: string; country?: string }) {
  return <FloatingContactButton language={language} country={country} />
}
