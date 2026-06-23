'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { stripHtml } from '@/lib/wordpress'

interface BlogPost {
  id: number; slug: string
  title: { rendered: string }; excerpt: { rendered: string }
  _embedded?: { 'wp:featuredmedia'?: Array<{ source_url: string }> }
}
interface BlogSectionProps { posts: BlogPost[] }

// Fallback thumbnails for posts without featured images
const FALLBACK_THUMBS = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
]

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="section-padding" style={{ background: '#060D1A', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container-site">
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 48, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#60A5FA', marginBottom: 12 }}>Knowledge Base</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#FFFFFF', lineHeight: 1.1 }}>AV Insights &amp; Guides</h2>
          </div>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#3B82F6', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, idx) => {
            const title   = stripHtml(post.title.rendered)
            const thumb   = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || FALLBACK_THUMBS[idx % 3]
            const excerpt = stripHtml(post.excerpt.rendered).slice(0, 110)
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                style={{ display: 'block', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: '#111827', textDecoration: 'none', transition: 'all 0.25s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)'; el.style.borderColor = 'rgba(59,130,246,0.25)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'none'; el.style.boxShadow = 'none'; el.style.borderColor = 'rgba(255,255,255,0.07)' }}
              >
                <div style={{ position: 'relative', height: 180, overflow: 'hidden', background: '#1F2937' }}>
                  <Image src={thumb} alt={title} fill style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,24,39,0.6) 0%, transparent 60%)' }} />
                </div>
                <div style={{ padding: '20px 22px 22px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#F1F5F9', marginBottom: 8, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: '#64748B', marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{excerpt}…</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: '#3B82F6' }}>
                    Read more <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
