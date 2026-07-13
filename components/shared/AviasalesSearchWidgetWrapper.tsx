'use client'

import dynamic from 'next/dynamic'

const AviasalesSearchWidget = dynamic(() => import('./AviasalesSearchWidget'), {
  ssr: false,
  loading: () => <div className="w-full flex justify-center min-h-[300px]" />,
})

export default function AviasalesSearchWidgetWrapper() {
  return <AviasalesSearchWidget />
}
