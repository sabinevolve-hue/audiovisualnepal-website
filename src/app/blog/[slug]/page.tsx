import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPost, getPostSlugs, getPosts, stripHtml } from '@/lib/wordpress'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const slugs = await getPostSlugs()
    return slugs.map(s => ({ slug: s }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post Not Found' }
  const title   = stripHtml(post.title.rendered)
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 160)
  return {
    title: `${title} — AudioVisual Nepal`,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const [post, relatedPosts] = await Promise.all([
    getPost(slug),
    getPosts({ perPage: 3, embed: true }),
  ])

  if (!post || post.status !== 'publish') notFound()

  const title        = stripHtml(post.title.rendered)
  const thumb        = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const categories   = post._embedded?.['wp:term']?.[0] ?? []
  const publishDate  = new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const relFiltered  = relatedPosts.filter(r => r.slug !== slug).slice(0, 3)

  return (
    <main style={{ paddingTop: 80 }}>
      {/* Breadcrumb */}
      <div style={{ background: '#F5F5F7', padding: '12px 24px', borderBottom: '1px solid #E8E8ED' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', fontSize: 13, color: '#6E6E73' }}>
          <Link href="/" style={{ color: '#0071E3', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link href="/blog" style={{ color: '#0071E3', textDecoration: 'none' }}>Blog</Link>
          {' / '}
          <span>{title}</span>
        </div>
      </div>

      {/* Article */}
      <article style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px' }}>
        {/* Category */}
        {categories.length > 0 && (
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
            {categories[0].name}
          </div>
        )}

        {/* Title */}
        <h1 style={{ fontFamily: 'Manrope, Inter, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}>
          {title}
        </h1>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, paddingBottom: 28, borderBottom: '1px solid #E8E8ED', flexWrap: 'wrap' }}>
          <time style={{ fontSize: 14, color: '#6E6E73' }}>{publishDate}</time>
          <span style={{ fontSize: 14, color: '#6E6E73' }}>·</span>
          <span style={{ fontSize: 14, color: '#6E6E73' }}>AudioVisual Nepal</span>
        </div>

        {/* Featured Image */}
        {thumb && (
          <div style={{ position: 'relative', height: 400, borderRadius: 16, overflow: 'hidden', marginBottom: 48 }}>
            <Image src={thumb} alt={title} fill style={{ objectFit: 'cover' }} priority />
          </div>
        )}

        {/* Content */}
        <div
          className="wp-content"
          style={{ fontSize: 17, lineHeight: 1.75, color: '#1D1D1F' }}
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Tags */}
        {categories.length > 0 && (
          <div style={{ marginTop: 48, paddingTop: 28, borderTop: '1px solid #E8E8ED', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <Link key={cat.id} href={`/blog?category=${cat.slug}`}
                style={{ padding: '5px 14px', background: '#F5F5F7', borderRadius: 980, fontSize: 13, color: '#1D1D1F', textDecoration: 'none', fontWeight: 500 }}>
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: 48, background: 'linear-gradient(135deg, #0071E3, #005BB5)', borderRadius: 20, padding: '40px 40px', color: '#FFFFFF', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 12 }}>
            Need AV Solutions for Your Project?
          </h3>
          <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 24 }}>
            Talk to our engineers. We'll design the perfect system for your space.
          </p>
          <Link href="/contact"
            style={{ display: 'inline-block', background: '#FFFFFF', color: '#0071E3', padding: '12px 28px', borderRadius: 980, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            Get Free Consultation
          </Link>
        </div>
      </article>

      {/* Related Posts */}
      {relFiltered.length > 0 && (
        <section style={{ background: '#F5F5F7', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, color: '#1D1D1F', marginBottom: 32, textAlign: 'center' }}>
              More Articles
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {relFiltered.map(rel => {
                const relThumb = rel._embedded?.['wp:featuredmedia']?.[0]?.source_url
                return (
                  <Link key={rel.id} href={`/blog/${rel.slug}`} style={{ textDecoration: 'none', display: 'block', background: '#FFFFFF', borderRadius: 16, overflow: 'hidden', border: '1px solid #E8E8ED' }}>
                    {relThumb ? (
                      <div style={{ position: 'relative', height: 160 }}>
                        <Image src={relThumb} alt={stripHtml(rel.title.rendered)} fill style={{ objectFit: 'cover' }} />
                      </div>
                    ) : (
                      <div style={{ height: 160, background: '#1D1D1F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>📰</div>
                    )}
                    <div style={{ padding: '20px' }}>
                      <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 700, color: '#1D1D1F', lineHeight: 1.3 }}
                        dangerouslySetInnerHTML={{ __html: rel.title.rendered }} />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .wp-content h2 { font-family: Manrope, sans-serif; font-size: 28px; font-weight: 800; color: #1D1D1F; margin: 40px 0 16px; letter-spacing: -0.02em; }
        .wp-content h3 { font-family: Manrope, sans-serif; font-size: 22px; font-weight: 700; color: #1D1D1F; margin: 32px 0 12px; }
        .wp-content p  { margin-bottom: 20px; }
        .wp-content ul, .wp-content ol { padding-left: 24px; margin-bottom: 20px; }
        .wp-content li { margin-bottom: 8px; }
        .wp-content a  { color: #0071E3; }
        .wp-content img { width: 100%; height: auto; border-radius: 12px; margin: 24px 0; }
        .wp-content blockquote { border-left: 3px solid #0071E3; padding: 16px 24px; margin: 24px 0; background: #F5F5F7; border-radius: 0 12px 12px 0; font-style: italic; color: #6E6E73; }
        .wp-content code { font-family: monospace; background: #F5F5F7; padding: 2px 8px; border-radius: 4px; font-size: 14px; }
        .wp-content table { width: 100%; border-collapse: collapse; margin: 24px 0; }
        .wp-content table th, .wp-content table td { padding: 12px 16px; border: 1px solid #E8E8ED; font-size: 14px; }
        .wp-content table th { background: #F5F5F7; font-weight: 600; }
      `}</style>
    </main>
  )
}
