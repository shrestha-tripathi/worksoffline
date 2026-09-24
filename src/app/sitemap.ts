import type { MetadataRoute } from 'next'
import { site } from '@/config/site'
import { alternatives } from '@/config/alternatives'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, lastModified: site.lastUpdated, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/alternatives/`, lastModified: site.lastUpdated, changeFrequency: 'monthly', priority: 0.8 },
    ...alternatives.map((a) => ({ url: `${site.url}/alternatives/${a.slug}/`, lastModified: site.lastUpdated, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]
}
