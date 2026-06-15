import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProduct, getProductSlugs, getProducts, parseJsonMeta, stripHtml } from '@/lib/wordpress'

export const revalidate = 3600

interface Props {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  const pairs = await getProductSlugs()
  return pairs.map(p => ({ category: p.category, slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, category } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Product — AudioVisual Nepal' }
  const title    = stripHtml(product.title.rendered)
  const desc     = product.meta.meta_description || stripHtml(product.excerpt.rendered).slice(0, 160)
  return {
    title: `${title} | ${category.replace(/-/g, ' ')} | AudioVisual Nepal`,
    description: desc || `Buy ${title} in Nepal. Professional grade AV equipment with full warranty and technical support.`,
    openGraph: {
      title,
      description: desc,
      images: product.featured_image_url ? [product.featured_image_url] : [],
    },
  }
}

const TABS = ['Overview', 'Features', 'Specifications', 'Applications', 'FAQ']

export default async function ProductDetailPage({ params }: Props) {
  const { category, slug } = await params
  const [product, related] = await Promise.all([
    getProduct(slug),
    getProducts({ categorySlug: category, perPage: 4 }),
  ])

  if (!product || product.status !== 'publish') notFound()

  const title       = stripHtml(product.title.rendered)
  const specs       = parseJsonMeta<Array<{label:string;value:string}>>(product.meta.specifications, [])
  const features    = parseJsonMeta<string[]>(product.meta.features, [])
  const applications= parseJsonMeta<string[]>(product.meta.applications, [])
  const relFiltered = related.filter(r => r.slug !== slug).slice(0, 3)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://audiovisualnepal.com'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',     item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
          { '@type': 'ListItem', position: 3, name: category,   item: `${siteUrl}/products/${category}` },
          { '@type': 'ListItem', position: 4, name: title,      item: `${siteUrl}/products/${category}/${slug}` },
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
          url: `${siteUrl}/products/${category}/${slug}`,
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Product Hero */}
      <section style={{ paddingTop: 80, background: '#F5F5F7' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', gap: 8, fontSize: 13, color: '#6E6E73', padding: '20px 0', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#0071E3', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/products" style={{ color: '#0071E3', textDecoration: 'none' }}>Products</Link>
            <span>/</span>
            <Link href={`/products/${category}`} style={{ color: '#0071E3', textDecoration: 'none', textTransform: 'capitalize' }}>
              {category.replace(/-/g, ' ')}
            </Link>
            <span>/</span>
            <span style={{ color: '#1D1D1F', fontWeight: 500 }}>{title}</span>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, paddingBottom: 48, alignItems: 'start' }}>
            {/* Image */}
            <div style={{ position: 'sticky', top: 88 }}>
              <div style={{ background: '#FFFFFF', borderRadius: 20, aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
                {product.featured_image_url
                  ? <Image src={product.featured_image_url} alt={title} fill style={{ objectFit: 'contain', padding: 32 }} priority />
                  : <span style={{ fontSize: 96 }}>📦</span>}
                {product.meta.badge && (
                  <span style={{ position: 'absolute', top: 16, left: 16, background: '#0071E3', color: '#fff', padding: '4px 12px', borderRadius: 980, fontSize: 12, fontWeight: 600 }}>
                    {product.meta.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div>
              {product.meta.brand_name && (
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  {product.meta.brand_name}
                </div>
              )}
              <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
                {title}
              </h1>
              {product.meta.sku && (
                <div style={{ fontSize: 12, color: '#6E6E73', marginBottom: 16 }}>SKU: {product.meta.sku}</div>
              )}
              <p style={{ fontSize: 17, color: '#6E6E73', lineHeight: 1.7, marginBottom: 28 }}>
                {product.meta.short_desc || stripHtml(product.excerpt.rendered)}
              </p>

              {/* Quick specs preview */}
              {specs.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
                  {specs.slice(0, 4).map((s, i) => (
                    <div key={i} style={{ background: '#FFFFFF', borderRadius: 12, padding: '12px 16px' }}>
                      <div style={{ fontSize: 11, color: '#6E6E73', marginBottom: 2 }}>{s.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1D1D1F' }}>{s.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
                <Link href="/contact"
                  style={{ flex: 1, minWidth: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#0071E3', color: '#FFFFFF', padding: '14px 24px', borderRadius: 980, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
                  Request Quote →
                </Link>
                <a href="https://wa.me/9779851081866" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: '#FFFFFF', padding: '14px 24px', borderRadius: 980, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
                  WhatsApp
                </a>
              </div>

              {product.meta.datasheet_url && (
                <a href={product.meta.datasheet_url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#0071E3', textDecoration: 'none', fontWeight: 500 }}>
                  ↓ Download Datasheet
                </a>
              )}
            </div>
          </div>

          {/* Tab nav */}
          <nav style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.08)', overflowX: 'auto' }}>
            {TABS.map((tab, i) => (
              <a key={tab} href={`#${tab.toLowerCase()}`}
                style={{ padding: '16px 24px', fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', borderBottom: i === 0 ? '2px solid #0071E3' : '2px solid transparent', color: i === 0 ? '#0071E3' : '#6E6E73', textDecoration: 'none' }}>
                {tab}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" style={{ padding: '64px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, color: '#1D1D1F', marginBottom: 24 }}>Overview</h2>
          {product.content.rendered
            ? <div className="wp-content" style={{ fontSize: 17, lineHeight: 1.75, color: '#1D1D1F' }}
                dangerouslySetInnerHTML={{ __html: product.content.rendered }} />
            : <p style={{ fontSize: 17, color: '#6E6E73', lineHeight: 1.75 }}>
                {product.meta.short_desc || stripHtml(product.excerpt.rendered) || `The ${title} is a professional-grade AV product distributed by AudioVisual Nepal with full manufacturer warranty.`}
              </p>
          }
        </div>
      </section>

      {/* Features */}
      {features.length > 0 && (
        <section id="features" style={{ padding: '64px 24px', background: '#F5F5F7' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, color: '#1D1D1F', marginBottom: 32 }}>Features</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {features.map((feat, i) => (
                <div key={i} style={{ background: '#FFFFFF', borderRadius: 16, padding: '24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,113,227,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <span style={{ color: '#0071E3', fontSize: 11, fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{ fontSize: 15, color: '#1D1D1F', lineHeight: 1.5 }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specifications */}
      {specs.length > 0 && (
        <section id="specifications" style={{ padding: '64px 24px', background: '#FFFFFF' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, color: '#1D1D1F', marginBottom: 32 }}>Specifications</h2>
            <div style={{ borderRadius: 16, border: '1px solid #E8E8ED', overflow: 'hidden' }}>
              {specs.map((spec, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '14px 24px', fontSize: 15, background: i % 2 === 0 ? '#F5F5F7' : '#FFFFFF' }}>
                  <span style={{ color: '#6E6E73' }}>{spec.label}</span>
                  <span style={{ fontWeight: 500, color: '#1D1D1F' }}>{spec.value}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#6E6E73', marginTop: 12 }}>* Specifications subject to change without notice.</p>
          </div>
        </section>
      )}

      {/* Applications */}
      {applications.length > 0 && (
        <section id="applications" style={{ padding: '64px 24px', background: '#F5F5F7' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, color: '#1D1D1F', marginBottom: 32 }}>Applications</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
              {applications.map((app, i) => (
                <div key={i} style={{ background: '#FFFFFF', borderRadius: 14, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,113,227,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#0071E3', fontSize: 12, fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{ fontWeight: 500, fontSize: 14, color: '#1D1D1F' }}>{app}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ placeholder */}
      <section id="faq" style={{ padding: '64px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, color: '#1D1D1F', marginBottom: 32 }}>FAQ</h2>
          {[
            { q: 'Is this covered by manufacturer warranty?', a: 'Yes. All products carry a minimum 1-year manufacturer warranty. As authorized distributors, we handle all warranty claims directly with no hassle for you.' },
            { q: 'Do you offer installation services?', a: 'Absolutely. We offer full supply-and-install packages across Nepal. Contact us with your floor plan for a complete system design and quotation.' },
            { q: 'Can I see a demo before purchasing?', a: 'Yes — visit our Kathmandu showroom or request an on-site demonstration for larger projects. Call or WhatsApp us to schedule.' },
          ].map((faq, i) => (
            <details key={i} style={{ background: '#F5F5F7', borderRadius: 14, marginBottom: 12, overflow: 'hidden' }}>
              <summary style={{ padding: '18px 24px', fontSize: 16, fontWeight: 600, color: '#1D1D1F', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {faq.q} <span style={{ color: '#0071E3', fontSize: 20 }}>+</span>
              </summary>
              <div style={{ padding: '0 24px 18px', fontSize: 15, color: '#6E6E73', lineHeight: 1.65 }}>{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relFiltered.length > 0 && (
        <section style={{ padding: '64px 24px', background: '#F5F5F7' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, color: '#1D1D1F', marginBottom: 32, textAlign: 'center' }}>Related Products</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {relFiltered.map(rel => {
                const rTitle = stripHtml(rel.title.rendered)
                return (
                  <Link key={rel.id} href={`/products/${category}/${rel.slug}`}
                    style={{ textDecoration: 'none', background: '#FFFFFF', borderRadius: 16, border: '1px solid #E8E8ED', overflow: 'hidden', display: 'block' }}>
                    <div style={{ height: 180, background: '#F5F5F7', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      {rel.featured_image_url
                        ? <Image src={rel.featured_image_url} alt={rTitle} fill style={{ objectFit: 'contain', padding: 16 }} />
                        : <span style={{ fontSize: 48 }}>📦</span>}
                    </div>
                    <div style={{ padding: '18px 20px' }}>
                      {rel.meta.brand_name && <div style={{ fontSize: 11, color: '#0071E3', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>{rel.meta.brand_name}</div>}
                      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 15, fontWeight: 700, color: '#1D1D1F' }}>{rTitle}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: '#1D1D1F', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#FFFFFF', marginBottom: 16, letterSpacing: '-0.03em' }}>
          Need Help Specifying the Right System?
        </h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>
          Our engineers will design, supply and install the perfect AV solution for your space.
        </p>
        <Link href="/contact"
          style={{ display: 'inline-block', background: '#0071E3', color: '#FFFFFF', padding: '16px 40px', borderRadius: 980, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
          Get Free Consultation
        </Link>
      </section>

      <style>{`
        .wp-content h2 { font-family: Manrope, sans-serif; font-size: 24px; font-weight: 800; color: #1D1D1F; margin: 32px 0 12px; }
        .wp-content p { margin-bottom: 18px; }
        .wp-content ul { padding-left: 24px; margin-bottom: 18px; }
        .wp-content li { margin-bottom: 8px; }
        .wp-content a { color: #0071E3; }
        .wp-content img { width: 100%; height: auto; border-radius: 12px; margin: 20px 0; }
      `}</style>
    </>
  )
}
