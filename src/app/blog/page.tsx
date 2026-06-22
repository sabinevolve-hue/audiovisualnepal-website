import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPosts, getCategories, stripHtml } from '@/lib/wordpress'

export const metadata: Metadata = {
  title: 'Blog — AudioVisual Nepal | AV Tips, Guides & Industry News',
  description: 'Expert articles on PA systems, conference setups, IP audio, video conferencing and AV installations across Nepal.',
}

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

  return (
    <main style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section
        className="section-padding-sm px-6 text-center"
        style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="container-site">
          <p className="eyebrow mb-4">Knowledge Base</p>
          <h1 className="heading-section mb-4">AV Insights &amp; Guides</h1>
          <p className="text-lg max-w-[520px] mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Expert knowledge on audio visual systems, video conferencing, and AV installations across Nepal.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section
          className="px-6 py-4"
          style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
        >
          <div className="container-site flex gap-2 flex-wrap justify-center">
            <Link
              href="/blog"
              className="px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors"
              style={{
                background: !catSlug ? 'var(--brand)' : 'white',
                color: !catSlug ? 'white' : 'var(--text-secondary)',
                border: `1px solid ${!catSlug ? 'var(--brand)' : 'var(--border-default)'}`,
                textDecoration: 'none',
              }}
            >
              All
            </Link>
            {categories.map(cat => (
              <Link
                key={cat.id}
                href={`/blog?category=${cat.slug}`}
                className="px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors"
                style={{
                  background: catSlug === cat.slug ? 'var(--brand)' : 'white',
                  color: catSlug === cat.slug ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${catSlug === cat.slug ? 'var(--brand)' : 'var(--border-default)'}`,
                  textDecoration: 'none',
                }}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="section-padding bg-white px-6">
        <div className="container-site">
          {posts.length === 0 ? (
            <div className="text-center py-20" style={{ color: 'var(--text-secondary)' }}>
              <p className="text-lg">No posts yet — check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map(post => {
                const thumb   = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
                const excerpt = stripHtml(post.excerpt.rendered).slice(0, 130) + '…'
                const date    = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

                return (
                  <article
                    key={post.id}
                    className="group rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                    style={{ border: '1px solid var(--border-default)' }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      {thumb ? (
                        <Image
                          src={thumb}
                          alt={stripHtml(post.title.rendered)}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="h-full w-full flex items-center justify-center text-4xl"
                          style={{ background: 'var(--bg-subtle)' }}
                        >
                          📰
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-[12px] font-medium mb-3" style={{ color: 'var(--text-tertiary)' }}>{date}</p>
                      <h2 className="font-display font-bold text-[16px] leading-snug mb-2 line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                        {stripHtml(post.title.rendered)}
                      </h2>
                      <p className="text-[14px] leading-relaxed line-clamp-3 mb-4" style={{ color: 'var(--text-secondary)' }}>
                        {excerpt}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-[13px] font-semibold transition-colors"
                        style={{ color: 'var(--brand)', textDecoration: 'none' }}
                      >
                        Read more →
                      </Link>
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
