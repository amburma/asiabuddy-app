'use client'

import { useEffect, useRef } from 'react'

export default function PricingCalendarWidget() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    // Prevent duplicate injection on re-renders/fast refresh
    if (containerRef.current.childElementCount > 0) return

    const script = document.createElement('script')
    script.async = true
    script.charset = 'utf-8'
    script.src = 'https://tpembd.com/content?currency=usd&trs=546392&shmarker=746660.flights_calendar_heatmap&searchUrl=www.aviasales.com%2Fsearch&locale=en&powered_by=true&origin=RGN&destination=BKK&one_way=false&only_direct=false&period=current_month&range=7%2C14&primary=%23D4AF37&color_background=%23ffffff&dark=%23000000&light=%23FFFFFF&achieve=%2345AD35&promo_id=4041&campaign_id=100'
    containerRef.current.appendChild(script)
  }, [])

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        ရက်အလိုက် ဈေးနှုန်းများ
      </h3>
      <div ref={containerRef} className="w-full flex justify-center min-h-[300px]" />
    </div>
  )
}
