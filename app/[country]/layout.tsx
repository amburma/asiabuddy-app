import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import Navbar from '../../components/shared/Navbar'
import FloatingChatButtonLoader from '../../components/shared/FloatingChatButtonLoader'
import FloatingContactButtonLoader from '../../components/shared/FloatingContactButtonLoader'
import { normalizeLocale } from '../../lib/i18n'
import { countries } from '../../data/countries'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

const COUNTRY_META: Record<string, { name: string; description: string }> = {
  thailand: {
    name: 'Thailand',
    description:
      'Explore Thailand with AsiaBuddy — tours, travel tips, chat assistance, and booking services for your perfect Thai adventure.',
  },
  myanmar: {
    name: 'Myanmar',
    description:
      'Discover Myanmar with AsiaBuddy — curated tours, local insights, and seamless booking for an unforgettable experience.',
  },
  vietnam: {
    name: 'Vietnam',
    description:
      'Experience Vietnam with AsiaBuddy — travel guides, tours, and personalized booking support.',
  },
  cambodia: {
    name: 'Cambodia',
    description:
      'Explore Cambodia with AsiaBuddy — tours, travel tips, and booking services for your perfect adventure.',
  },
  laos: {
    name: 'Laos',
    description:
      'Discover Laos with AsiaBuddy — curated tours, local insights, and seamless booking for an unforgettable experience.',
  },
  singapore: {
    name: 'Singapore',
    description:
      'Discover Singapore with AsiaBuddy — curated tours, local insights, and seamless booking for an unforgettable experience.',
  },
  malaysia: {
    name: 'Malaysia',
    description:
      'Explore Malaysia with AsiaBuddy — tours, travel tips, and booking services for your perfect adventure.',
  },
  indonesia: {
    name: 'Indonesia',
    description:
      'Discover Indonesia with AsiaBuddy — curated tours, local insights, and seamless booking for an unforgettable experience.',
  },
  philippines: {
    name: 'Philippines',
    description:
      'Explore Philippines with AsiaBuddy — tours, travel tips, and booking services for your perfect adventure.',
  },
  japan: {
    name: 'Japan',
    description:
      'Plan your Japan trip with AsiaBuddy — expert travel guides, tours, and booking assistance.',
  },
  germany: {
    name: 'Germany',
    description:
      'Discover Germany with AsiaBuddy — curated tours, local insights, and seamless booking for an unforgettable experience.',
  },
  uk: {
    name: 'United Kingdom',
    description:
      'Explore the UK with AsiaBuddy — tours, travel tips, and booking services for your perfect adventure.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>
}): Promise<Metadata> {
  const { country } = await params
  const activeCountryIds = countries.filter(c => c.status === 'live').map(c => c.id)
  if (!activeCountryIds.includes(country.toLowerCase())) {
    return {
      title: 'Page Not Found',
      description: 'The requested page does not exist.',
    }
  }
  const meta = COUNTRY_META[country.toLowerCase()]
  const countryName = meta?.name ?? country.charAt(0).toUpperCase() + country.slice(1)
  const description =
    meta?.description ??
    `Explore ${countryName} with AsiaBuddy — tours, travel tips, and booking services.` 

  return {
    title: `${countryName} Travel Guide — AsiaBuddy`,
    description,
    icons: {
      icon: `/api/site-icon/${country}`,
      apple: `/api/site-icon/${country}`,
    },
    openGraph: {
      title: `${countryName} Travel Guide — AsiaBuddy`,
      description,
      url: `https://asiabuddy.app/${country}`,
      siteName: 'AsiaBuddy',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${countryName} Travel Guide — AsiaBuddy`,
      description,
    },
    alternates: {
      canonical: `https://asiabuddy.app/${country}`,
    },
  }
}

export default async function CountryLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const activeCountryIds = countries.filter(c => c.status === 'live').map(c => c.id)
  if (!activeCountryIds.includes(country.toLowerCase())) {
    notFound()
  }
  const cookieStore = await cookies()
  const language = normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value)
  const isFirstVisit = !cookieStore.has('NEXT_LOCALE')

  return (
    <div className="min-h-screen" data-country={country}>
      <Navbar country={country} language={language.toUpperCase()} isFirstVisit={isFirstVisit} />
      {children}
      {activeCountryIds.includes(country.toLowerCase()) && (
        <>
          <FloatingChatButtonLoader language={language} country={country} />
          <FloatingContactButtonLoader language={language} country={country} />
        </>
      )}
    </div>
  )
}
