'use client'

import Script from 'next/script'

export default function WhiteLabelFlightWidget() {
  return (
    <>
      <Script
        src="https://tpembd.com/wl_web/main.js?wl_id=20123"
        strategy="afterInteractive"
        type="module"
      />
      <div id="tpwl-search" className="w-full" />
      <div id="tpwl-tickets" className="w-full min-h-[400px] mt-6" />
    </>
  )
}
