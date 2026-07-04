import type { MetadataRoute } from 'next'
import { SITE, PRODUCT_CATEGORIES, SOLUTIONS_NAV } from '@/lib/constants'
import { ALL_PRODUCTS } from '@/data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url
  const now  = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/about`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/brands`,  lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/projects`,lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/blog`,    lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${base}/products`,lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
  ]

  const brandPages: MetadataRoute.Sitemap = ['dsppa', 'infobit', 'tenveo', 'focus'].map(slug => ({
    url:             `${base}/brands/${slug}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.8,
  }))

  const solutionPages: MetadataRoute.Sitemap = SOLUTIONS_NAV.map((s) => ({
    url:             `${base}${s.href}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.8,
  }))

  const categoryPages: MetadataRoute.Sitemap = PRODUCT_CATEGORIES.map((cat) => ({
    url:             `${base}${cat.href}`,
    lastModified:    now,
    changeFrequency: 'weekly' as const,
    priority:        0.85,
  }))

  // Individual product pages — highest SEO priority
  const productPages: MetadataRoute.Sitemap = ALL_PRODUCTS.map((p) => ({
    url:             `${base}/products/${p.category}/${p.slug}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.9,
  }))

  return [...staticPages, ...brandPages, ...solutionPages, ...categoryPages, ...productPages]
}
