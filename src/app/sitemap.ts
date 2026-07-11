import type { MetadataRoute } from 'next'
import { SITE, PRODUCT_CATEGORIES, SOLUTIONS_NAV } from '@/lib/constants'
import { ALL_PRODUCTS } from '@/data/products'
import { CASE_STUDIES } from '@/data/caseStudies'
import { STATIC_ARTICLES } from '@/data/staticArticles'
import infobitCat from '@/data/infobit-catalog.json'
import dsppaCat from '@/data/dsppa-catalog.json'
import tenveoCat from '@/data/tenveo-catalog.json'
import lamproCat from '@/data/lampro-catalog.json'

const liteSlug = (x: string) => x.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

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
    { url: `${base}/solutions`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/solution-finder`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/brands/infobit/catalog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/brands/dsppa/catalog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/brands/tenveo/catalog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/brands/lampro/catalog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
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

  const caseStudyPages: MetadataRoute.Sitemap = CASE_STUDIES.map((c) => ({
    url: `${base}/projects/${c.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8,
  }))

  const articlePages: MetadataRoute.Sitemap = STATIC_ARTICLES.map((a) => ({
    url: `${base}/blog/${a.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8,
  }))

  // catalog-lite model pages — high-intent model-number searches
  const fullSlugs = new Set(ALL_PRODUCTS.map((p) => p.name.replace(/^\S+\s+/, '').toLowerCase()))
  const litePages: MetadataRoute.Sitemap = []
  const cats: Array<[string, typeof infobitCat]> = [['infobit', infobitCat], ['dsppa', dsppaCat], ['tenveo', tenveoCat], ['lampro', lamproCat]]
  const seen = new Set<string>()
  for (const [b, cat] of cats)
    for (const c of cat.categories)
      for (const se of c.series)
        for (const g of se.groups)
          for (const m of g.models) {
            if (fullSlugs.has(m.toLowerCase())) continue
            const sl = `${b}/${liteSlug(m)}`
            if (seen.has(sl)) continue
            seen.add(sl)
            litePages.push({ url: `${base}/brands/${b}/p/${liteSlug(m)}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 })
          }

  return [...staticPages, ...brandPages, ...solutionPages, ...categoryPages, ...productPages, ...caseStudyPages, ...articlePages, ...litePages]
}
