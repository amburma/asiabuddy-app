'use client'
import Script from 'next/script'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'onetwogo-travelto-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        city?: string
        width?: string
        agent?: string
        lang?: string
        fxcode?: string
        wl?: string
      }
    }
  }
}

export default function TwelveGoWidget({ city = 'Bangkok', lang = 'en' }: { city?: string; lang?: string }) {
  return (
    <>
      <Script
        src="https://agent.12go.asia/tools/widget/widget.js"
        strategy="afterInteractive"
      />
      <onetwogo-travelto-widget
        city={city}
        width="400"
        agent="16583584"
        lang={lang}
        fxcode="THB"
        wl="12go.asia"
      />
    </>
  )
}
