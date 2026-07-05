'use client'

import { useEffect, useRef } from 'react'

export default function AviasalesSearchWidget() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    // Prevent duplicate injection on re-renders/fast refresh
    if (containerRef.current.childElementCount > 0) return

    const script = document.createElement('script')
    script.async = true
    script.charset = 'utf-8'
    script.src = 'https://tpembd.com/content?currency=usd&trs=546392&shmarker=746660&show_hotels=false&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%23D4AF37&color_button=%23D4AF37&color_icons=%23D4AF37&dark=%23000000&light=%23FFFFFF&secondary=%23D4AF37&special=%23D4AF37&color_focused=%23D4AF37&border_radius=0&plain=false&promo_id=7879&campaign_id=100&origin_iata=BKK'
    containerRef.current.appendChild(script)
  }, [])

  return <div ref={containerRef} className="w-full flex justify-center min-h-[300px]" />
}
