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
import { getProjects, getPosts, getBrands } from '@/lib/wordpress'

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

  // Static fallback articles shown when no real blog content exists
  const STATIC_POSTS = [
    {
      id: 1, slug: 'choosing-ceiling-speaker-commercial-installation',
      title: { rendered: 'How to Choose the Right Ceiling Speaker for Your Commercial Installation' },
      excerpt: { rendered: 'Driver size, power taps, sensitivity ratings and backcan requirements explained — what every AV specifier needs to know before selecting a ceiling speaker.' },
      _embedded: { 'wp:featuredmedia': [{ source_url: '/images/heroes/education-hero.webp' }] }
    },
    {
      id: 2, slug: 'ip-network-audio-vs-traditional-pa',
      title: { rendered: 'IP Network Audio vs Traditional 100V Line PA — Which Is Right for Your Project?' },
      excerpt: { rendered: 'A practical comparison of IP-based PA systems and traditional 100V line distributed audio — cost, scalability, zone control and future-proofing compared.' },
      _embedded: { 'wp:featuredmedia': [{ source_url: '/images/heroes/transportation-hero.webp' }] }
    },
    {
      id: 3, slug: 'conference-room-microphone-guide-nepal',
      title: { rendered: 'Conference Room Microphone Guide for Nepal — Wired, Wireless & Ceiling Array' },
      excerpt: { rendered: 'From gooseneck delegate units to wireless 6GHz systems and ceiling MEMS arrays — a complete guide to choosing the right conference microphone for your room size and use case.' },
      _embedded: { 'wp:featuredmedia': [{ source_url: '/images/heroes/corporate-hero.webp' }] }
    },
  ]

  const posts = realPosts.length >= 2 ? realPosts.slice(0, 3) : STATIC_POSTS

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
      {realPosts.length >= 2 && <BlogSection posts={realPosts.slice(0, 3)} />}
      <CTASection />
    </>
  )
}
