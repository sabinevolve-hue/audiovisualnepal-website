import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import SolutionsSection from '@/components/sections/SolutionsSection'
import ProductEcosystem from '@/components/sections/ProductEcosystem'
import BrandsSection from '@/components/sections/BrandsSection'
import WhySection from '@/components/sections/WhySection'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import CTASection from '@/components/sections/CTASection'
import BlogSection from '@/components/sections/BlogSection'
import { DEFAULT_SEO, SITE } from '@/lib/constants'
import { getProjects, getPosts, getBrands, stripHtml } from '@/lib/wordpress'

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
  sameAs: Object.values(SITE.social),
  description: DEFAULT_SEO.description,
}

export default async function HomePage() {
  const [projects, posts, brands] = await Promise.all([
    getProjects({ featured: true, perPage: 3 }).catch(() => []),
    getPosts({ perPage: 3, embed: true }).catch(() => []),
    getBrands(true).catch(() => []),
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <StatsSection />
      <SolutionsSection />
      <ProductEcosystem />
      <BrandsSection />
      <FeaturedProjects />
      <WhySection />
      {posts.length > 0 && <BlogSection posts={posts} stripHtml={stripHtml} />}
      <CTASection />
    </>
  )
}
