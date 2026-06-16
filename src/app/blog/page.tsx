import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPosts, getCategories, stripHtml } from '@/lib/wordpress'

export const metadata: Metadata = {
  title: 'Blog — AudioVisual Nepal | AV Tips, Guides & Industry News',
  description: 'Expert articles on PA systems, conference setups, IP audio, video conferencing and AV installations across Nepal.',
}

const STATIC_ARTICLES = [
  {
    title: 'How to Choose the Right PA System for Your Venue',
    category: 'Buying Guide',
    date: 'May 12, 2025',
    excerpt: 'From small boardrooms to 1,000-seat auditoriums, we break down wattage, coverage angle, and speaker placement to help you spec the right system.',
    emoji: '🔊',
  },
  {
    title: 'IP Audio vs Traditional PA: Which is Right for Your Building?',
    category: 'Technology',
    date: 'April 28, 2025',
    excerpt: 'Network-based IP audio offers centralised management and zone flexibility. We compare the two architectures and explain when each makes sense.',
    emoji: '🌐',
  },
  {
    title: 'Setting Up a Modern Conference Room in Nepal',
    category: 'Conference Systems',
    date: 'March 15, 2025',
    excerpt: 'Our step-by-step guide covers ceiling microphone placement, display sizing, video conferencing codecs and acoustic treatment for Nepali office environments.',
    emoji: '💼',
  },
  {
    title: 'Top 7 AV Mistakes to Avoid in Hotel Installations',
    category: 'Case Studies',
    date: 'February 20, 2025',
    excerpt: 'Common pitfalls in hospitality AV — from under-spec\'d ballroom speakers to poorly placed ceiling tiles — and how to avoid costly re-work.',
    emoji: '🏨',
  },
  {
    title: 'Voice Evacuation Systems: EN54 Compliance Explained',
    category: 'Safety Systems',
    date: 'January 8, 2025',
    excerpt: 'Nepal\'s fire safety landscape is evolving. We explain EN54 certification, battery backup requirements and why it matters for commercial buildings.',
    emoji: '🚨',
  },
  {
    title: 'Shure vs Sennheiser: Wireless Microphone Comparison 2025',
    category: 'Product Reviews',
    date: 'December 5, 2024',
    excerpt: 'We put two flagship wireless systems side-by-side for range, dropout resistance, battery life and value — tested in real Nepali conditions.',
    emoji: '🎤',
  },
]

export const revalidate = 3600

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>
}) {
  const params  = await searchParams
  const page    = Number(params.page ?? 1)
  const catSlug = params.category

  const [categories, posts] = await Promise.all([
    getCategories(),
    getPosts({ page, perPage: 9, embed: true }),
  ])

  const activeCat = categories.find(c => c.slug === catSlug)

  return (
    <main style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ background: '#1D1D1F', padding: '80px 24px 64px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#0071E3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Knowledge Base</p>
        <h1 style={{ fontFamily: 'Manrope, Inter, sans-serif', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: 20 }}>
          AV Insights &amp; Guides
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', maxWidth: 520, margin: '0 auto' }}>
          Expert knowledge on audio visual systems, video conferencing, and AV installations across Nepal.
        </p>
      </section>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ background: '#F5F5F7', padding: '12px 24px', borderBottom: '1px solid #E8E8ED' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', fontSize: 13, color: '#6E6E73', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/" style={{ color: '#0071E3', textDecoration: 'none' }}>Home</Link>
          <span aria-hidden="true">›</span>
          <span style={{ color: '#1D1D1F', fontWeight: 500 }} aria-current="page">Blog</span>
        </div>
      </nav>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section style={{ background: '#F5F5F7', padding: '24px', borderBottom: '1px solid #E8E8ED' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/blog" style={catSlug ? pillStyle : activePillStyle}>All</Link>
            {categories.map(cat => (
              <Link key={cat.id} href={`/blog?category=${cat.slug}`} style={catSlug === cat.slug ? activePillStyle : pillStyle}>
                {cat.name} {cat.count > 0 && <span style={{ opacity: 0.6, fontSize: 11 }}>({cat.count})</span>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {posts.length === 0 ? (

            <div>
              <p style={{ textAlign: 'center', fontSize: 14, color: '#6E6E73', marginBottom: 40 }}>
                Expert AV knowledge from the AudioVisual Nepal team
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
                {STATIC_ARTICLES.map((post, i) => (
                  <article key={i} style={cardStyle}>
                    <div style={{ height: 200, background: 'linear-gradient(135deg, #1D1D1F, #2a2a2d)', borderRadius: '16px 16px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>
                      {post.emoji}
                    </div>
                    <div style={{ padding: '24px 24px 28px' }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{post.category}</div>
                      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#1D1D1F', marginBottom: 10, lineHeight: 1.3 }}>{post.title}</h2>
                      <p style={{ fontSize: 14, color: '#6E6E73', lineHeight: 1.6, marginBottom: 16 }}>{post.excerpt}</p>
                      <time style={{ fontSize: 12, color: '#6E6E73' }}>{post.date}</time>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {posts.map(post => {
                const thumb = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
                const terms = post._embedded?.['wp:term']?.[0] ?? []
                const excerpt = stripHtml(post.excerpt.rendered).slice(0, 140) + '…'
                return (
                  <article key={post.id} style={cardStyle}>
                    {thumb ? (
                      <div style={{ position: 'relative', height: 200, overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
                        <Image src={thumb} alt={stripHtml(post.title.rendered)} fill style={{ objectFit: 'cover' }} />
                      </div>
                    ) : (
                      <div style={{ height: 200, background: 'linear-gradient(135deg, #1D1D1F, #2a2a2d)', borderRadius: '16px 16px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
                        📰
                      </div>
                    )}
                    <div style={{ padding: '24px 24px 28px' }}>
                      {terms.length > 0 && (
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                          {terms[0].name}
                        </div>
                      )}
                      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#1D1D1F', marginBottom: 10, lineHeight: 1.3 }}
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      <p style={{ fontSize: 14, color: '#6E6E73', lineHeight: 1.6, marginBottom: 16 }}>{excerpt}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <time style={{ fontSize: 12, color: '#6E6E73' }}>
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </time>
                        <Link href={`/blog/${post.slug}`} style={{ fontSize: 13, fontWeight: 600, color: '#0071E3', textDecoration: 'none' }}>
                          Read more →
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {/* Pagination */}
          {posts.length === 9 && (
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Link href={`/blog?page=${page + 1}${catSlug ? `&category=${catSlug}` : ''}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0071E3', color: '#fff', padding: '12px 28px', borderRadius: 980, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
                Load More Articles →
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

const pillStyle: React.CSSProperties = {
  padding: '6px 18px',
  borderRadius: 980,
  fontSize: 13,
  fontWeight: 500,
  color: '#1D1D1F',
  background: '#FFFFFF',
  border: '1px solid #E8E8ED',
  textDecoration: 'none',
  transition: 'all 0.2s',
}

const activePillStyle: React.CSSProperties = {
  ...pillStyle,
  background: '#0071E3',
  color: '#FFFFFF',
  border: '1px solid #0071E3',
}

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  borderRadius: 16,
  border: '1px solid #E8E8ED',
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
}
