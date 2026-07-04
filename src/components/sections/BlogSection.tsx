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

const FALLBACK_THUMBS = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
]

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="section-padding" style={{ background: '#FFFFFF', borderTop: '1px solid rgba(11,30,61,0.06)' }}>
      <div className="container-site">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 44, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563EB', marginBottom: 12 }}>Knowledge Base</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0B1E3D', lineHeight: 1.1 }}>
              AV Insights &amp; Guides
            </h2>
          </div>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#2563EB', textDecoration: 'none', whiteSpace: 'nowrap' }}>
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
                style={{ display: 'block', borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(11,30,61,0.08)', background: '#FFFFFF', textDecoration: 'none', boxShadow: '0 1px 6px rgba(11,30,61,0.05)', transition: 'all 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 10px 36px rgba(11,30,61,0.11)'; el.style.borderColor = 'rgba(37,99,235,0.25)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'none'; el.style.boxShadow = '0 1px 6px rgba(11,30,61,0.05)'; el.style.borderColor = 'rgba(11,30,61,0.08)' }}
              >
                <div style={{ position: 'relative', height: 180, overflow: 'hidden', background: '#F1F5F9' }}>
                  <Image src={thumb} alt={title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '18px 20px 22px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#0B1E3D', marginBottom: 8, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: '#64748B', marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {excerpt}…
                  </p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: '#2563EB' }}>
                    Read more <ArrowRight size={11} />
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
