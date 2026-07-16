import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: 'noindex, nofollow, noarchive',
}

export default function PartnerInviteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
