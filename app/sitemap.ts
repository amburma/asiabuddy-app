import type { MetadataRoute } from 'next'
import { getSupabase } from '../lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://asiabuddy.app'

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/thailand`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/thailand/tours`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/thailand/destination`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Dynamic routes from Supabase
  let dynamicRoutes: MetadataRoute.Sitemap = []

  try {
    const supabase = getSupabase()

    // Fetch tours
    const { data: tours } = await supabase
      .from('tours')
      .select('slug, country, updated_at')
      .eq('status', 'active')

    if (tours) {
      const tourRoutes = tours.map((tour) => ({
        url: `${baseUrl}/${tour.country}/tours/${tour.slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
        lastModified: tour.updated_at ? new Date(tour.updated_at) : undefined,
      }))
      dynamicRoutes.push(...tourRoutes)
    }

    // Fetch destinations
    const { data: destinations } = await supabase
      .from('destinations')
      .select('country, updated_at')

    if (destinations) {
      const destinationRoutes = destinations.map((dest) => ({
        url: `${baseUrl}/${dest.country}/destination`,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        lastModified: dest.updated_at ? new Date(dest.updated_at) : undefined,
      }))
      dynamicRoutes.push(...destinationRoutes)
    }
  } catch {
    // Supabase fetch fails — return static routes only
  }

  return [...staticRoutes, ...dynamicRoutes]
}
