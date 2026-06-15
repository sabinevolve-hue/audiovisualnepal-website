import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import SolutionsSection from '@/components/sections/SolutionsSection'
import ProductEcosystem from '@/components/sections/ProductEcosystem'
import WhySection from '@/components/sections/WhySection'
import CTASection from '@/components/sections/CTASection'
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
  // Fetch live WordPress data in parallel
  const [projects, posts, brands] = await Promise.all([
    getProjects({ featured: true, perPage: 3 }).catch(() => []),
    getPosts({ perPage: 3, embed: true }).catch(() => []),
    getBrands(true).catch(() => []),
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <HeroSection />
      <StatsSection />
      <SolutionsSection />
      <ProductEcosystem />
      <WhySection />

      {/* ── Featured Projects (live from WordPress) ─────────────────────── */}
      <section style={{ padding: '96px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0071E3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
              Our Work
            </p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: 16 }}>
              Featured Projects
            </h2>
            <p style={{ fontSize: 18, color: '#6E6E73', maxWidth: 520, margin: '0 auto' }}>
              From Himalayan hotels to corporate HQs — see what Nepal's #1 AV company delivers.
            </p>
          </div>

          {projects.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
              {projects.map(project => {
                const title  = stripHtml(project.title.rendered)
                const excerpt = stripHtml(project.excerpt.rendered).slice(0, 110)
                return (
                  <Link key={project.id} href={`/projects/${project.slug}`}
                    style={{ textDecoration: 'none', display: 'block', background: '#F5F5F7', borderRadius: 20, overflow: 'hidden', border: '1px solid #E8E8ED' }}>
                    <div style={{ position: 'relative', height: 220, background: '#1D1D1F' }}>
                      {project.featured_image_url
                        ? <Image src={project.featured_image_url} alt={title} fill style={{ objectFit: 'cover' }} />
                        : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>🏢</div>}
                      {project.meta.location && (
                        <div style={{ position: 'absolute', bottom: 14, left: 14, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', color: '#FFF', padding: '4px 12px', borderRadius: 980, fontSize: 12, fontWeight: 500 }}>
                          📍 {project.meta.location}
                        </div>
                      )}
                    </div>
                    <div style={{ padding: 24 }}>
                      {project.meta.client && <div style={{ fontSize: 12, fontWeight: 600, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{project.meta.client}</div>}
                      <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#1D1D1F', marginBottom: 10, lineHeight: 1.3 }}>{title}</h3>
                      {excerpt && <p style={{ fontSize: 14, color: '#6E6E73', lineHeight: 1.6 }}>{excerpt}…</p>}
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            /* Static fallback when WordPress has no featured projects yet */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {[
                { emoji: '🏨', title: 'Hyatt Regency Kathmandu', subtitle: 'Hotel Ballroom AV', location: 'Kathmandu', desc: 'Full AV system for 1,200-pax ballroom — line arrays, DSP, wireless mics, projection.' },
                { emoji: '🏦', title: 'NMB Bank Head Office', subtitle: 'Corporate AV', location: 'Kathmandu', desc: 'Video conferencing in 12 meeting rooms with Teams integration and central control.' },
                { emoji: '🎓', title: 'Kathmandu University', subtitle: 'Education AV', location: 'Dhulikhel', desc: 'Smart lecture halls across all faculties with automated AV and recording systems.' },
              ].map(p => (
                <div key={p.title} style={{ background: '#F5F5F7', borderRadius: 20, overflow: 'hidden', border: '1px solid #E8E8ED' }}>
                  <div style={{ height: 200, background: 'linear-gradient(135deg, #1D1D1F, #2a2a2d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>
                    {p.emoji}
                  </div>
                  <div style={{ padding: 24 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>📍 {p.location}</div>
                    <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#1D1D1F', marginBottom: 6 }}>{p.title}</h3>
                    <div style={{ fontSize: 13, color: '#6E6E73', marginBottom: 10 }}>{p.subtitle}</div>
                    <p style={{ fontSize: 14, color: '#6E6E73', lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/projects"
              style={{ display: 'inline-block', border: '1px solid #1D1D1F', color: '#1D1D1F', padding: '12px 32px', borderRadius: 980, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Brands (live from WordPress) ───────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: '#F5F5F7' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#6E6E73', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 32 }}>
            Authorized Distributor
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
            {brands.length > 0 ? brands.map(brand => {
              const name = stripHtml(brand.title.rendered)
              return (
                <div key={brand.id}
                  style={{ background: '#FFFFFF', borderRadius: 14, padding: '14px 28px', border: '1px solid #E8E8ED', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 100 }}>
                  {brand.featured_image_url
                    ? <Image src={brand.featured_image_url} alt={name} width={80} height={32} style={{ objectFit: 'contain' }} />
                    : <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#1D1D1F' }}>{name}</span>}
                </div>
              )
            }) : (
              /* Static fallback */
              ['DSPPA', 'Tenveo', 'Shure', 'Sennheiser', 'Biamp', 'Extron', 'Crestron', 'Kramer', 'Yamaha'].map(b => (
                <div key={b} style={{ background: '#FFFFFF', borderRadius: 14, padding: '14px 28px', border: '1px solid #E8E8ED' }}>
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#1D1D1F' }}>{b}</span>
                </div>
              ))
            )}
          </div>
          <div style={{ marginTop: 32 }}>
            <Link href="/brands" style={{ fontSize: 14, color: '#0071E3', textDecoration: 'none', fontWeight: 500 }}>
              View all brands →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Latest from Blog (live from WordPress) ─────────────────────── */}
      {posts.length > 0 && (
        <section style={{ padding: '96px 24px', background: '#FFFFFF' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0071E3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
                Knowledge Base
              </p>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em' }}>
                AV Insights &amp; Guides
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {posts.map(post => {
                const title  = stripHtml(post.title.rendered)
                const thumb  = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
                const excerpt = stripHtml(post.excerpt.rendered).slice(0, 110)
                return (
                  <Link key={post.id} href={`/blog/${post.slug}`}
                    style={{ textDecoration: 'none', display: 'block', background: '#FFFFFF', borderRadius: 16, border: '1px solid #E8E8ED', overflow: 'hidden' }}>
                    {thumb
                      ? <div style={{ position: 'relative', height: 180 }}><Image src={thumb} alt={title} fill style={{ objectFit: 'cover' }} /></div>
                      : <div style={{ height: 180, background: 'linear-gradient(135deg, #1D1D1F, #2a2a2d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>📰</div>}
                    <div style={{ padding: '22px 24px 26px' }}>
                      <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, fontWeight: 700, color: '#1D1D1F', marginBottom: 10, lineHeight: 1.3 }} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      <p style={{ fontSize: 14, color: '#6E6E73', lineHeight: 1.6, marginBottom: 14 }}>{excerpt}…</p>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#0071E3' }}>Read more →</span>
                    </div>
                  </Link>
                )
              })}
            </div>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link href="/blog" style={{ display: 'inline-block', border: '1px solid #1D1D1F', color: '#1D1D1F', padding: '12px 32px', borderRadius: 980, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
                All Articles →
              </Link>
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  )
}
