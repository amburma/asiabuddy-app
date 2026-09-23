import './globals.css'
import CookieBanner from '../components/shared/CookieBanner'
import { Playfair_Display, Inter, DM_Mono, Cormorant_Garamond, Cinzel, Noto_Sans_Myanmar, Padauk } from 'next/font/google'
import { cookies } from 'next/headers'
import Script from "next/script"
import { normalizeLocale } from '../lib/i18n'
import type { Metadata } from 'next'

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

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cinzel',
  display: 'swap',
})

const notoSansMyanmar = Noto_Sans_Myanmar({
  subsets: ['myanmar'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-sans-myanmar',
  display: 'swap',
})

const padauk = Padauk({
  subsets: ['myanmar'],
  weight: ['400', '700'],
  variable: '--font-padauk',
  display: 'swap',
})

export const metadata: Metadata = {
  verification: {
    google: 'i90KoyVumPGoX8hfDXlDxntRlz92crpHUnMUx7Fj6ZM',
  },
  openGraph: {
    images: [
      {
        url: 'https://asiabuddy.app/images/thailand-destination-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'AsiaBuddy - Travel Asia Like a Local',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://asiabuddy.app/images/thailand-destination-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'AsiaBuddy - Travel Asia Like a Local',
      },
    ],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const language = normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value).toLowerCase()

  return (
    <html lang={language} className={`${playfair.variable} ${inter.variable} ${dmMono.variable} ${cormorant.variable} ${cinzel.variable} ${notoSansMyanmar.variable} ${padauk.variable}`}>
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body>{children}<CookieBanner /></body>
    </html>
  )
}