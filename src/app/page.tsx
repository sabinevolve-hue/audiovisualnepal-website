import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import SolutionsSection from '@/components/sections/SolutionsSection'
import ExploreScene from '@/components/sections/ExploreScene'
import SectionConnector from '@/components/ui/SectionConnector'
import ProductEcosystem from '@/components/sections/ProductEcosystem'
import BrandsSection from '@/components/sections/BrandsSection'
import WhySection from '@/components/sections/WhySection'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import CTASection from '@/components/sections/CTASection'
import BlogSection from '@/components/sections/BlogSection'
import { DEFAULT_SEO, SITE } from '@/lib/constants'
import { getProjects, getPosts, getBrands } from '@/lib/wordpress'
import { STATIC_ARTICLES } from '@/data/staticArticles'

export const revalidate = 3600

export const metadata: Metadata = {
  title: DEFAULT_SEO.defaultTitle,
  description: DEFAULT_SEO.description,
  alternates: { canonical: SITE.url },
  openGraph: {
    title: DEFAULT_SEO.defaultTitle,
    description: DEFAULT_SEO.description,
    url: SITE.url,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AudioVisual Nepal',
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kathmandu',
    addressCountry: 'NP',
  },
  areaServed: { '@type': 'Country', name: 'Nepal' },
  hasMap: 'https://maps.app.goo.gl/iVCohsMztxcbBk8Q6',
  sameAs: Object.values(SITE.social),
  description: DEFAULT_SEO.description,
}

export default async function HomePage() {
  const [projects, rawPosts, brands] = await Promise.all([
    getProjects({ featured: true, perPage: 3 }).catch(() => []),
    getPosts({ perPage: 6, embed: true }).catch(() => []),
    getBrands(true).catch(() => []),
  ])

  // Filter out WordPress default "Hello world" placeholder post
  const PLACEHOLDER_SLUGS = ['hello-world', 'sample-page']
  const realPosts = rawPosts.filter((p: { slug: string }) => !PLACEHOLDER_SLUGS.includes(p.slug))

  const posts = realPosts.length >= 2 ? realPosts.slice(0, 3) : STATIC_ARTICLES

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <StatsSection />
      <SolutionsSection />
      <SectionConnector />
      <ExploreScene />
      <ProductEcosystem />
      <SectionConnector />
      <BrandsSection />
      <FeaturedProjects />
      <WhySection />
      <BlogSection posts={posts} />
      <CTASection />
    </>
  )
}
