'use client'

import dynamic from 'next/dynamic'

const FloatingChatButton = dynamic(
  () => import('@/components/shared/FloatingChatButton'),
  { ssr: false, loading: () => null }
)

export default FloatingChatButton
