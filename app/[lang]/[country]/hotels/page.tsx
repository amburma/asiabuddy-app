import HotelsPageClient from './HotelsPageClient'
import { UI_TRANSLATIONS, normalizeLocale } from '@/lib/i18n'
import { SupportedLanguage } from '@/types/country'
import { buildAlternates } from '@/lib/seo-alternates'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; country: string }>
}) {
  const { lang, country: countrySlug } = await params
  const country = countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)

  const alternates = buildAlternates(lang, `/${countrySlug}/hotels`)

  return {
    title: `${country} Hotels — AsiaBuddy`,
    description: `Discover hotels in ${country} with curated options and competitive prices.`,
    openGraph: {
      title: `${country} Hotels — AsiaBuddy`,
      description: `Find the best hotels in ${country}.`,
      url: `https://asiabuddy.app/${lang}/${countrySlug}/hotels`,
      images: [
        {
          url: 'https://asiabuddy.app/images/thailand-destination-hero.jpg',
          width: 1200,
          height: 630,
          alt: 'AsiaBuddy - Travel Asia Like a Local',
        },
      ],
    },
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
  }
}

export default async function HotelsPage({
  params,
}: {
  params: Promise<{ lang: string; country: string }>
}) {
  const { lang, country } = await params

  const targetLanguage = normalizeLocale(lang) as SupportedLanguage

  return (
    <HotelsPageClient country={country} targetLanguage={targetLanguage} />
  )
}
