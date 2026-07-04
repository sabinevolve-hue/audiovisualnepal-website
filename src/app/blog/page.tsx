import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPosts, getCategories, stripHtml } from '@/lib/wordpress'

export const metadata: Metadata = {
  title: 'Blog | AV Tips, Guides & Industry News',
  description: 'Expert articles on PA systems, conference setups, IP audio, video conferencing and AV installations across Nepal.',
  openGraph: {
    title: 'AV Insights & Guides',
    description: 'Expert guides on PA systems, conference room design, IP audio networks, voice evacuation and professional AV best practices for Nepal.',
    url: 'https://audiovisualnepal.com/blog',
    siteName: 'AudioVisual Nepal',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'AudioVisual Nepal' }],
    type: 'website',
  },
  alternates: { canonical: 'https://audiovisualnepal.com/blog' },
}

export const revalidate = 3600

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string; category?: string }> }) {
  const params  = await searchParams
  const page    = Number(params.page ?? 1)
  const catSlug = params.category

  const [categories, posts] = await Promise.all([
    getCategories(),
    getPosts({ page, perPage: 9, embed: true }),
  ])

  return (
    <main style={{ paddingTop: 80, background: '#FFFFFF' }}>
      {/* Hero */}
      <section style={{ padding: '100px 24px 80px', background: 'linear-gradient(180deg, #F0F4F8 0%, #FFFFFF 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Knowledge Base</p>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>
            AV Insights &amp; Guides
          </h1>
          <p style={{ fontSize: 18, color: '#64748B', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
            Expert knowledge on audio visual systems, video conferencing, and AV installations across Nepal.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section style={{ padding: '20px 24px', background: '#F1F5F9', borderBottom: '1px solid rgba(11,30,61,0.05)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/blog" style={{ padding: '8px 20px', borderRadius: 980, fontSize: 13, fontWeight: 600, textDecoration: 'none', background: !catSlug ? '#3B82F6' : 'rgba(11,30,61,0.05)', color: !catSlug ? '#FFFFFF' : '#94A3B8', border: `1px solid ${!catSlug ? '#3B82F6' : 'rgba(11,30,61,0.1)'}` }}>All</Link>
            {categories.map(cat => (
              <Link key={cat.id} href={`/blog?category=${cat.slug}`} style={{ padding: '8px 20px', borderRadius: 980, fontSize: 13, fontWeight: 600, textDecoration: 'none', background: catSlug === cat.slug ? '#3B82F6' : 'rgba(11,30,61,0.05)', color: catSlug === cat.slug ? '#FFFFFF' : '#94A3B8', border: `1px solid ${catSlug === cat.slug ? '#3B82F6' : 'rgba(11,30,61,0.1)'}` }}>{cat.name}</Link>
            ))}
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#64748B' }}>
              <p style={{ fontSize: 18 }}>No posts yet — check back soon.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
              {posts.map(post => {
                const thumb   = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
                const excerpt = stripHtml(post.excerpt.rendered).slice(0, 130) + '…'
                const date    = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                return (
                  <article key={post.id} style={{ background: '#FFFFFF', border: '1px solid rgba(11,30,61,0.1)', borderRadius: 20, overflow: 'hidden' }}>
                    <div style={{ position: 'relative', height: 200 }}>
                      {thumb ? (
                        <Image src={thumb} alt={stripHtml(post.title.rendered)} fill style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ height: '100%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>📰</div>
                      )}
                    </div>
                    <div style={{ padding: '24px' }}>
                      <p style={{ fontSize: 12, color: '#64748B', marginBottom: 10 }}>{date}</p>
                      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, fontWeight: 700, color: '#0B1E3D', lineHeight: 1.4, marginBottom: 10 }}>{stripHtml(post.title.rendered)}</h2>
                      <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.65, marginBottom: 16 }}>{excerpt}</p>
                      <Link href={`/blog/${post.slug}`} style={{ fontSize: 13, fontWeight: 600, color: '#3B82F6', textDecoration: 'none' }}>Read more →</Link>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
