import './globals.css'
import CookieBanner from '@/components/shared/CookieBanner'
import { Playfair_Display, Inter, DM_Mono } from 'next/font/google'
import { cookies } from 'next/headers'
import Script from "next/script";

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const dmMono = DM_Mono({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-mono',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const language = cookieStore.get('NEXT_LOCALE')?.value?.toLowerCase() ?? 'en'

  return (
    <html lang={language} className={`${playfair.variable} ${inter.variable} ${dmMono.variable}`}>
      <head>
        <Script
          id="travelpayouts-drive"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                  var script = document.createElement("script");
                  script.async = 1;
                  script.src = 'https://emrldtp.com/NTQ2Mzky.js?t=546392';
                  document.head.appendChild(script);
              })();
            `,
          }}
        />
        <meta name="google" content="notranslate" />
      </head>
      <body>{children}<CookieBanner /></body>
    </html>
  )
}