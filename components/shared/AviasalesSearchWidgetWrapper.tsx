'use client'

import AviasalesSearchWidget from './AviasalesSearchWidget'

export default function AviasalesSearchWidgetWrapper({ originIata }: { originIata?: string }) {
  return <AviasalesSearchWidget originIata={originIata} />
}
