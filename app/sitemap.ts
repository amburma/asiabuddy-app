import type { MetadataRoute } from 'next'
import { getSupabase } from '@/lib/supabase'

const SUPPORTED_COUNTRIES = ['thailand', 'singapore', 'japan', 'vietnam']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://asiabuddy.app'
  const supabase = getSupabase()

  // Static country pages
  const countryRoutes: MetadataRoute.Sitemap = SUPPORTED_COUNTRIES.map((country) => ({
    url: `${baseUrl}/${country}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Dynamic tour pages from Supabase
  let tourRoutes: MetadataRoute.Sitemap = []
  try {
    const { data: tours } = await supabase
      .from('tours')
      .select('slug, country, updated_at')
      .eq('published', true)

    if (tours) {
      tourRoutes = tours.map((tour) => ({
        url: `${baseUrl}/${tour.country}/tours/${tour.slug}`,
        lastModified: tour.updated_at ? new Date(tour.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }))
    }
  } catch {
    // Supabase unavailable — return static routes only
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...countryRoutes,
    ...tourRoutes,
  ]
}
