import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { RevealSection, StaggerReveal } from '@/components/ui/RevealSection'

interface BlogPost {
  id: number; slug: string
  title: { rendered: string }; excerpt: { rendered: string }
  _embedded?: { 'wp:featuredmedia'?: Array<{ source_url: string }> }
}
interface BlogSectionProps { posts: BlogPost[]; stripHtml: (h: string) => string }

export default function BlogSection({ posts, stripHtml }: BlogSectionProps) {
  return (
    <section className="section-padding bg-white" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container-site">
        <RevealSection className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="eyebrow mb-3">Knowledge Base</div>
            <h2 className="heading-section">AV Insights &amp; Guides</h2>
          </div>
          <Link href="/blog" className="flex items-center gap-1.5 text-[14px] font-semibold text-[var(--text-brand)] hover:gap-2.5 transition-all duration-200 flex-shrink-0 pb-1">
            View all <ArrowRight size={14} />
          </Link>
        </RevealSection>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-4" stagger={0.09}>
          {posts.map((post) => {
            const title   = stripHtml(post.title.rendered)
            const thumb   = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
            const excerpt = stripHtml(post.excerpt.rendered).slice(0, 100)
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block rounded-[var(--radius-xl)] overflow-hidden border bg-white transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-1"
                style={{ border: '1px solid var(--border-default)' }}
              >
                <div className="relative h-44 overflow-hidden bg-[var(--bg-subtle)]">
                  {thumb ? (
                    <Image src={thumb} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  ) : (
                    <div className="h-full flex items-center justify-center text-4xl">📰</div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-[16px] text-[var(--text-primary)] mb-2 leading-snug line-clamp-2 group-hover:text-[var(--text-brand)] transition-colors">
                    {title}
                  </h3>
                  <p className="text-[13px] leading-relaxed mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{excerpt}…</p>
                  <span className="text-[13px] font-semibold text-[var(--text-brand)] inline-flex items-center gap-1 group-hover:gap-1.5 transition-all duration-200">
                    Read more <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            )
          })}
        </StaggerReveal>
      </div>
    </section>
  )
}
