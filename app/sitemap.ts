import type { MetadataRoute } from 'next'
import { getSupabase } from '../lib/supabase'
import { countries } from '../data/countries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://asiabuddy.app'
  const activeCountryIds = countries.filter(c => c.status === 'live').map(c => c.id)

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  // Add country-specific static routes for all active countries
  activeCountryIds.forEach((country) => {
    staticRoutes.push({
      url: `${baseUrl}/${country}`,
      changeFrequency: 'weekly',
      priority: 0.9,
    })
    staticRoutes.push({
      url: `${baseUrl}/${country}/tours`,
      changeFrequency: 'daily',
      priority: 0.8,
    })
    staticRoutes.push({
      url: `${baseUrl}/${country}/destination`,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
    staticRoutes.push({
      url: `${baseUrl}/${country}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

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
      const tourRoutes = tours
        .filter(tour => activeCountryIds.includes(tour.country))
        .map((tour) => ({
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
      const destinationRoutes = destinations
        .filter(dest => activeCountryIds.includes(dest.country))
        .map((dest) => ({
        url: `${baseUrl}/${dest.country}/destination`,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
        lastModified: dest.updated_at ? new Date(dest.updated_at) : undefined,
      }))
      dynamicRoutes.push(...destinationRoutes)
    }

    // Fetch blog posts
    const { data: posts } = await supabase
      .from('posts')
      .select('slug, country, updated_at')
      .eq('published', true)

    if (posts) {
      const postRoutes = posts
        .filter(post => activeCountryIds.includes(post.country))
        .map((post) => ({
        url: `${baseUrl}/${post.country}/blog/${post.slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        lastModified: post.updated_at ? new Date(post.updated_at) : undefined,
      }))
      dynamicRoutes.push(...postRoutes)
    }
  } catch {
    // Supabase fetch fails — return static routes only
  }

  return [...staticRoutes, ...dynamicRoutes]
}
