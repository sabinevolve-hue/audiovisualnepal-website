import type { MetadataRoute } from 'next'
import { SITE, PRODUCT_CATEGORIES, SOLUTIONS_NAV } from '@/lib/constants'

// In production, extend this to pull dynamic routes from Sanity:
// const products = await sanityClient.fetch(`*[_type == "product"]{ slug, _updatedAt }`)
// const posts    = await sanityClient.fetch(`*[_type == "post"]{ slug, _updatedAt }`)
// const projects = await sanityClient.fetch(`*[_type == "project"]{ slug, _updatedAt }`)

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url
  const now  = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/about`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/brands`,  lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/projects`,lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/blog`,    lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${base}/products`,lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
  ]

  const solutionPages: MetadataRoute.Sitemap = SOLUTIONS_NAV.map((s) => ({
    url:             `${base}${s.href}`,
    lastModified:    now,
    changeFrequency: 'monthly',
    priority:        0.8,
  }))

  const categoryPages: MetadataRoute.Sitemap = PRODUCT_CATEGORIES.map((cat) => ({
    url:             `${base}${cat.href}`,
    lastModified:    now,
    changeFrequency: 'weekly',
    priority:        0.85,
  }))

  return [...staticPages, ...solutionPages, ...categoryPages]
}
