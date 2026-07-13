'use client'

import dynamic from 'next/dynamic'

const FloatingChatButton = dynamic(
  () => import('@/components/shared/FloatingChatButton'),
  { ssr: false, loading: () => null }
)

export default function FloatingChatButtonLoader({ language }: { language: string }) {
  return <FloatingChatButton language={language} />
}
