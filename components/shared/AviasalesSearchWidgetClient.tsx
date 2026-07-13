'use client'

import dynamic from 'next/dynamic'

const AviasalesSearchWidgetWrapper = dynamic(() => import('./AviasalesSearchWidgetWrapper'), {
  ssr: false,
  loading: () => <div className="w-full flex justify-center min-h-[300px]" />,
})

export default function AviasalesSearchWidgetClient() {
  return <AviasalesSearchWidgetWrapper />
}
