import './globals.css'
import CookieBanner from '@/components/shared/CookieBanner'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}<CookieBanner /></body>
    </html>
  )
}