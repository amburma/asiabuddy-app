import { cookies } from 'next/headers'
import HotelsPageClient from './HotelsPageClient'
import { UI_TRANSLATIONS, normalizeLocale } from '../../../lib/i18n'
import { SupportedLanguage } from '../../../types/country'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country: countrySlug } = await params
  const country = countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)

  return {
    title: `${country} Hotels — AsiaBuddy`,
    description: `Discover hotels in ${country} with curated options and competitive prices.`,
    openGraph: {
      title: `${country} Hotels — AsiaBuddy`,
      description: `Find the best hotels in ${country}.`,
      url: `https://asiabuddy.app/${countrySlug}/hotels`,
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
}

export default async function HotelsPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params

  const cookieStore = await cookies()
  const targetLanguage = normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value) as SupportedLanguage

  return (
    <HotelsPageClient country={country} targetLanguage={targetLanguage} />
  )
}
