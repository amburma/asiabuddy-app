import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import FloatingChatButton from '@/components/shared/FloatingChatButton'

const COUNTRY_META: Record<string, { name: string; description: string }> = {
  thailand: {
    name: 'Thailand',
    description:
      'Explore Thailand with AsiaBuddy — tours, travel tips, chat assistance, and booking services for your perfect Thai adventure.',
  },
  singapore: {
    name: 'Singapore',
    description:
      'Discover Singapore with AsiaBuddy — curated tours, local insights, and seamless booking for an unforgettable experience.',
  },
  japan: {
    name: 'Japan',
    description:
      'Plan your Japan trip with AsiaBuddy — expert travel guides, tours, and booking assistance.',
  },
  vietnam: {
    name: 'Vietnam',
    description:
      'Experience Vietnam with AsiaBuddy — travel guides, tours, and personalized booking support.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>
}): Promise<Metadata> {
  const { country } = await params
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
  const cookieStore = await cookies()
  const language = cookieStore.get('NEXT_LOCALE')?.value ?? 'EN'

  return (
    <div className="min-h-screen" data-country={country}>
      {children}
      {country === 'thailand' && (
        <FloatingChatButton language={language} />
      )}
    </div>
  )
}
