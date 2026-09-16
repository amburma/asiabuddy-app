import type { MetadataRoute } from 'next'
import { getSupabase } from '../lib/supabase'
import { countries } from '../data/countries'
import { SUPPORTED_LANGUAGES, buildAlternates } from '../lib/seo-alternates'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://asiabuddy.app'
  const activeCountryIds = countries.filter(c => c.status === 'live').map(c => c.id)

  // Helper function to generate language-specific entries for a given path
  function generateLanguageEntries(
    pathWithoutLangPrefix: string,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: number,
    lastModified?: Date
  ): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = []

    for (const lang of SUPPORTED_LANGUAGES) {
      const alternates = buildAlternates(lang, pathWithoutLangPrefix)
      
      entries.push({
        url: alternates.canonical,
        changeFrequency,
        priority,
        lastModified,
        alternates: {
          languages: alternates.languages,
        },
      })
    }

    return entries
  }

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
    staticRoutes.push(
      ...generateLanguageEntries(
        `/${country}`,
        'weekly',
        0.9
      )
    )
    staticRoutes.push(
      ...generateLanguageEntries(
        `/${country}/tours`,
        'daily',
        0.8
      )
    )
    staticRoutes.push(
      ...generateLanguageEntries(
        `/${country}/destination`,
        'weekly',
        0.8
      )
    )
    staticRoutes.push(
      ...generateLanguageEntries(
        `/${country}/blog`,
        'weekly',
        0.8
      )
    )
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
        .flatMap((tour) =>
          generateLanguageEntries(
            `/${tour.country}/tours/${tour.slug}`,
            'weekly',
            0.8,
            tour.updated_at ? new Date(tour.updated_at) : undefined
          )
        )
      dynamicRoutes.push(...tourRoutes)
    }

    // Fetch destinations
    const { data: destinations } = await supabase
      .from('destinations')
      .select('country, updated_at')

    if (destinations) {
      const destinationRoutes = destinations
        .filter(dest => activeCountryIds.includes(dest.country))
        .flatMap((dest) =>
          generateLanguageEntries(
            `/${dest.country}/destination`,
            'weekly',
            0.8,
            dest.updated_at ? new Date(dest.updated_at) : undefined
          )
        )
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
        .flatMap((post) =>
          generateLanguageEntries(
            `/${post.country}/blog/${post.slug}`,
            'weekly',
            0.7,
            post.updated_at ? new Date(post.updated_at) : undefined
          )
        )
      dynamicRoutes.push(...postRoutes)
    }
  } catch {
    // Supabase fetch fails — return static routes only
  }

  return [...staticRoutes, ...dynamicRoutes]
}
