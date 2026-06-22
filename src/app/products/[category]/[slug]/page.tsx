import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Download, MessageCircle } from 'lucide-react'
import { getProduct, getProductSlugs, getProducts, parseJsonMeta, stripHtml } from '@/lib/wordpress'
import { SITE } from '@/lib/constants'

export const revalidate = 3600

interface Props { params: Promise<{ category: string; slug: string }> }

export async function generateStaticParams() {
  const pairs = await getProductSlugs()
  return pairs.map(p => ({ category: p.category, slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, category } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Product — AudioVisual Nepal' }
  const title = stripHtml(product.title.rendered)
  const desc  = product.meta.meta_description || stripHtml(product.excerpt.rendered).slice(0, 160)
  return {
    title: `${title} | ${category.replace(/-/g, ' ')} | AudioVisual Nepal`,
    description: desc || `Buy ${title} in Nepal. Professional grade AV equipment with full warranty and technical support.`,
    openGraph: { title, description: desc, images: product.featured_image_url ? [product.featured_image_url] : [] },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { category, slug } = await params
  const [product, related] = await Promise.all([
    getProduct(slug),
    getProducts({ categorySlug: category, perPage: 4 }),
  ])
  if (!product || product.status !== 'publish') notFound()

  const title        = stripHtml(product.title.rendered)
  const specs        = parseJsonMeta<Array<{ label: string; value: string }>>(product.meta.specifications, [])
  const features     = parseJsonMeta<string[]>(product.meta.features, [])
  const applications = parseJsonMeta<string[]>(product.meta.applications, [])
  const relFiltered  = related.filter(r => r.slug !== slug).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',     item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE.url}/products` },
          { '@type': 'ListItem', position: 3, name: category,   item: `${SITE.url}/products/${category}` },
          { '@type': 'ListItem', position: 4, name: title,      item: `${SITE.url}/products/${category}/${slug}` },
        ],
      },
      {
        '@type': 'Product',
        name: title,
        sku: product.meta.sku,
        brand: { '@type': 'Brand', name: product.meta.brand_name || 'AudioVisual Nepal' },
        description: product.meta.short_desc || stripHtml(product.excerpt.rendered),
        image: product.featured_image_url,
        offers: {
          '@type': 'Offer',
          availability: product.meta.in_stock === 'no' ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: 'AudioVisual Nepal' },
          url: `${SITE.url}/products/${category}/${slug}`,
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main style={{ paddingTop: 64, background: 'var(--bg-base)', minHeight: '100vh' }}>

        {/* ── Hero / Product Info ──────────────────────────────────────────── */}
        <section
          className="relative px-6 py-16 overflow-hidden"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,113,227,0.06) 0%, transparent 70%)',
          }} />

          <div className="container-site relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[12px] mb-10 flex-wrap" style={{ color: 'var(--text-tertiary)' }}>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              <ChevronRight size={12} />
              <Link href={`/products/${category}`} className="hover:text-white transition-colors capitalize">
                {category.replace(/-/g, ' ')}
              </Link>
              <ChevronRight size={12} />
              <span style={{ color: 'var(--text-brand)' }}>{title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Product Image */}
              <div className="lg:sticky lg:top-24">
                <div
                  className="relative aspect-square rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--border-default)' }}
                >
                  {product.featured_image_url ? (
                    <Image
                      src={product.featured_image_url}
                      alt={title}
                      fill
                      className="object-contain p-8"
                      priority
                    />
                  ) : (
                    <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 opacity-20">
                      <rect x="6" y="14" width="52" height="36" rx="4" stroke="white" strokeWidth="2"/>
                      <path d="M18 14v-4a4 4 0 018 0v4M38 14v-4a4 4 0 018 0v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                  {product.meta.badge && (
                    <span className="absolute top-4 left-4 text-[11px] font-bold px-3 py-1 rounded-full text-white" style={{ background: 'var(--brand)' }}>
                      {product.meta.badge}
                    </span>
                  )}
                  {product.meta.in_stock === 'no' && (
                    <span className="absolute top-4 right-4 text-[11px] font-bold px-3 py-1 rounded-full text-white bg-red-500/80">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div>
                {product.meta.brand_name && (
                  <div className="text-[12px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: 'var(--text-brand)' }}>
                    {product.meta.brand_name}
                  </div>
                )}
                <h1 className="font-display font-extrabold text-white leading-tight mb-3 tracking-tight" style={{ fontSize: 'clamp(26px,3.5vw,42px)' }}>
                  {title}
                </h1>
                {product.meta.sku && (
                  <div className="text-[12px] mb-5" style={{ color: 'var(--text-tertiary)' }}>SKU: {product.meta.sku}</div>
                )}
                <p className="text-[17px] leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                  {product.meta.short_desc || stripHtml(product.excerpt.rendered)}
                </p>

                {/* Quick Specs Grid */}
                {specs.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {specs.slice(0, 4).map((s, i) => (
                      <div key={i} className="rounded-xl p-3.5" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
                        <div className="text-[11px] mb-1" style={{ color: 'var(--text-tertiary)' }}>{s.label}</div>
                        <div className="text-[14px] font-semibold text-white">{s.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTAs */}
                <div className="flex gap-3 flex-wrap mb-6">
                  <Link
                    href="/contact"
                    className="flex-1 flex items-center justify-center gap-2 text-[15px] font-semibold text-white rounded-full py-3.5 px-6 transition-all duration-300 hover:opacity-90 hover:shadow-[var(--shadow-brand)]"
                    style={{ background: 'var(--brand)', minWidth: 160 }}
                  >
                    Request Quote
                    <ArrowRight size={15} />
                  </Link>
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-[15px] font-semibold text-white rounded-full py-3.5 px-6 transition-all duration-300 hover:opacity-90"
                    style={{ background: '#25D366' }}
                  >
                    <MessageCircle size={15} />
                    WhatsApp
                  </a>
                </div>

                {product.meta.datasheet_url && (
                  <a
                    href={product.meta.datasheet_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold transition-colors duration-300 hover:text-white"
                    style={{ color: 'var(--text-brand)' }}
                  >
                    <Download size={13} />
                    Download Datasheet (PDF)
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Content Sections ─────────────────────────────────────────────── */}
        <section className="px-6 py-16">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Main content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Overview */}
                {product.content.rendered && (
                  <div>
                    <h2 className="font-display font-bold text-[22px] text-white mb-5">Overview</h2>
                    <div
                      className="prose-dark text-[16px] leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                      dangerouslySetInnerHTML={{ __html: product.content.rendered }}
                    />
                  </div>
                )}

                {/* Features */}
                {features.length > 0 && (
                  <div>
                    <h2 className="font-display font-bold text-[22px] text-white mb-5">Key Features</h2>
                    <ul className="space-y-2.5">
                      {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-[15px]" style={{ color: 'var(--text-secondary)' }}>
                          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 mt-0.5 flex-shrink-0">
                            <circle cx="8" cy="8" r="7" stroke="var(--brand)" strokeWidth="1.5"/>
                            <path d="M5 8l2 2 4-4" stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Applications */}
                {applications.length > 0 && (
                  <div>
                    <h2 className="font-display font-bold text-[22px] text-white mb-5">Applications</h2>
                    <div className="flex flex-wrap gap-2.5">
                      {applications.map((a, i) => (
                        <span
                          key={i}
                          className="px-4 py-1.5 rounded-full text-[13px] font-medium"
                          style={{ background: 'var(--brand-dim)', color: 'var(--text-brand)', border: '1px solid var(--border-brand)' }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Specifications sidebar */}
              {specs.length > 0 && (
                <div>
                  <div className="rounded-2xl overflow-hidden sticky top-24" style={{ border: '1px solid var(--border-default)' }}>
                    <div className="px-5 py-4" style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                      <h3 className="font-display font-bold text-[16px] text-white">Specifications</h3>
                    </div>
                    <div style={{ background: 'var(--surface-1)' }}>
                      {specs.map((s, i) => (
                        <div
                          key={i}
                          className="flex justify-between gap-4 px-5 py-3 text-[13px]"
                          style={{ borderBottom: i < specs.length - 1 ? '1px solid var(--border-subtle)' : '' }}
                        >
                          <span style={{ color: 'var(--text-tertiary)' }}>{s.label}</span>
                          <span className="text-white font-medium text-right">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Related Products ─────────────────────────────────────────────── */}
        {relFiltered.length > 0 && (
          <section className="px-6 py-16" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <div className="container-site">
              <div className="flex items-center justify-between mb-10">
                <h2 className="font-display font-bold text-[24px] text-white">Related Products</h2>
                <Link href={`/products/${category}`} className="text-[13px] font-semibold flex items-center gap-1 hover:text-white transition-colors" style={{ color: 'var(--text-brand)' }}>
                  View all <ArrowRight size={13} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relFiltered.map(r => {
                  const rTitle = stripHtml(r.title.rendered)
                  return (
                    <Link
                      key={r.id}
                      href={`/products/${category}/${r.slug}`}
                      className="group block rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1"
                      style={{ background: 'var(--surface-1)', border: '1px solid var(--border-default)' }}
                    >
                      <div className="relative h-44 overflow-hidden flex items-center justify-center" style={{ background: 'var(--surface-2)' }}>
                        {r.featured_image_url ? (
                          <Image src={r.featured_image_url} alt={rTitle} fill className="object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                          <div className="text-white/20 text-4xl">📦</div>
                        )}
                      </div>
                      <div className="p-5">
                        {r.meta.brand_name && <div className="text-[11px] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: 'var(--text-brand)' }}>{r.meta.brand_name}</div>}
                        <h3 className="font-display font-bold text-[15px] text-white line-clamp-2">{rTitle}</h3>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

      </main>
    </>
  )
}
