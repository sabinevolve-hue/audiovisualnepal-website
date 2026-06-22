import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_PRODUCTS, getProduct, getRelatedProducts } from '@/data/products'
import { SITE } from '@/lib/constants'

export const revalidate = 3600

interface Props { params: { category: string; slug: string } }

export async function generateStaticParams() {
  return ALL_PRODUCTS.map(p => ({ category: p.category, slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct(params.slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.name} — ${product.subcategory} | AudioVisual Nepal`,
    description: product.description.slice(0, 155),
  }
}

const BRAND_COLORS: Record<string, string> = {
  dsppa: '#0071E3', itc: '#E74C3C', shure: '#CC0000', jbl: '#F39C12',
  bose: '#2C3E50', yamaha: '#27AE60', toa: '#8E44AD', sennheiser: '#2980B9',
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProduct(params.slug)
  if (!product) notFound()

  const related = getRelatedProducts(product)
  const brandColor = BRAND_COLORS[product.brandSlug] || '#0071E3'
  const heroSpecs = product.specs.filter(s => s.highlight).slice(0, 3)
  const allSpecs = product.specs

  return (
    <main style={{ background: '#FFFFFF', minHeight: '100vh', paddingTop: 80 }}>

      {/* Breadcrumb */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #E8E8ED' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: '#6E6E73', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#0071E3', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/products" style={{ color: '#0071E3', textDecoration: 'none' }}>Products</Link>
          <span>/</span>
          <Link href={`/products/${product.category}`} style={{ color: '#0071E3', textDecoration: 'none', textTransform: 'capitalize' }}>{product.category.replace(/-/g, ' ')}</Link>
          <span>/</span>
          <span style={{ color: '#1D1D1F' }}>{product.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: '48px 24px 0', background: '#FAFAFA', borderBottom: '1px solid #E8E8ED' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>

          {/* Left — Image */}
          <div>
            <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', background: `linear-gradient(135deg, ${brandColor}18 0%, ${brandColor}08 100%)`, border: `1px solid ${brandColor}22`, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {product.badge && (
                <div style={{ position: 'absolute', top: 16, left: 16, background: product.badge === 'Best Seller' ? '#FF9500' : product.badge === 'New' ? '#34C759' : product.badge === 'Featured' ? brandColor : '#5AC8FA', color: '#fff', padding: '4px 12px', borderRadius: 980, fontSize: 12, fontWeight: 700, letterSpacing: '0.04em' }}>
                  {product.badge}
                </div>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>

            {/* Hero Spec Cards */}
            {heroSpecs.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${heroSpecs.length}, 1fr)`, gap: 12, marginTop: 16 }}>
                {heroSpecs.map(spec => (
                  <div key={spec.label} style={{ background: '#FFFFFF', border: `1.5px solid ${brandColor}33`, borderRadius: 16, padding: '16px 12px', textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: brandColor, fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{spec.value}</div>
                    <div style={{ fontSize: 11, color: '#6E6E73', marginTop: 4, fontWeight: 500 }}>{spec.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — Details */}
          <div style={{ paddingBottom: 48 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              <Link href={`/brands/${product.brandSlug}`} style={{ display: 'inline-block', background: `${brandColor}15`, color: brandColor, padding: '4px 12px', borderRadius: 980, fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textDecoration: 'none' }}>
                {product.brand}
              </Link>
              <span style={{ display: 'inline-block', background: '#F5F5F7', color: '#6E6E73', padding: '4px 12px', borderRadius: 980, fontSize: 12, fontWeight: 500 }}>
                {product.subcategory}
              </span>
            </div>

            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 900, color: '#1D1D1F', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 8 }}>
              {product.name}
            </h1>
            <p style={{ fontSize: 18, color: brandColor, fontWeight: 600, marginBottom: 20 }}>{product.tagline}</p>
            <p style={{ fontSize: 15, color: '#3D3D3F', lineHeight: 1.7, marginBottom: 32 }}>{product.description}</p>

            {/* Segment Tags */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Ideal For</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.applications.map(app => (
                  <span key={app} style={{ background: '#F5F5F7', color: '#3D3D3F', padding: '5px 12px', borderRadius: 980, fontSize: 12, fontWeight: 500 }}>{app}</span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={`https://wa.me/+9779762109538?text=Hi%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(product.name)}.%20Please%20provide%20pricing%20and%20availability.`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', padding: '14px 28px', borderRadius: 980, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Enquire on WhatsApp
              </a>
              <a href={`tel:${SITE.phoneRaw}`}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#0071E3', padding: '14px 28px', borderRadius: 980, fontSize: 15, fontWeight: 700, textDecoration: 'none', border: '1.5px solid #0071E3' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92l-.08 2z"/></svg>
                Call Us
              </a>
              <Link href="/contact"
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F5F5F7', color: '#1D1D1F', padding: '14px 28px', borderRadius: 980, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features + Full Specs */}
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>

          {/* Key Features */}
          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 26, fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: 28 }}>
              Key Features
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {product.keyFeatures.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: 20, background: '#FAFAFA', borderRadius: 16, border: '1px solid #E8E8ED' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${brandColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={brandColor} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#1D1D1F', marginBottom: 4 }}>{f.title}</div>
                    <div style={{ fontSize: 13, color: '#6E6E73', lineHeight: 1.6 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs */}
          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 26, fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: 28 }}>
              Technical Specifications
            </h2>
            <div style={{ border: '1px solid #E8E8ED', borderRadius: 16, overflow: 'hidden' }}>
              {allSpecs.map((spec, i) => (
                <div key={spec.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: spec.highlight ? `${brandColor}08` : i % 2 === 0 ? '#FAFAFA' : '#FFFFFF', borderBottom: i < allSpecs.length - 1 ? '1px solid #E8E8ED' : 'none', gap: 16 }}>
                  <span style={{ fontSize: 13, color: '#6E6E73', fontWeight: 500, flexShrink: 0 }}>{spec.label}</span>
                  <span style={{ fontSize: 13, color: spec.highlight ? brandColor : '#1D1D1F', fontWeight: spec.highlight ? 700 : 600, textAlign: 'right' }}>{spec.value}</span>
                </div>
              ))}
              <div style={{ padding: '14px 20px', background: '#F5F5F7', borderTop: '2px solid #E8E8ED' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#6E6E73', fontWeight: 500 }}>Warranty</span>
                  <span style={{ color: '#1D1D1F', fontWeight: 700 }}>{product.warranty}</span>
                </div>
              </div>
            </div>

            {/* Download/Contact CTA card */}
            <div style={{ marginTop: 20, background: `linear-gradient(135deg, ${brandColor}12, ${brandColor}06)`, border: `1px solid ${brandColor}22`, borderRadius: 16, padding: 24, textAlign: 'center' }}>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 15, color: '#1D1D1F', marginBottom: 6 }}>Need full datasheet or demo?</div>
              <p style={{ fontSize: 13, color: '#6E6E73', marginBottom: 16 }}>Our technical team will send detailed specs and arrange an on-site demonstration.</p>
              <Link href="/contact" style={{ display: 'inline-block', background: brandColor, color: '#fff', padding: '10px 24px', borderRadius: 980, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                Request Datasheet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section style={{ padding: '48px 24px 80px', background: '#F5F5F7' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 24, fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: 28 }}>
              Related Products
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {related.map(rp => {
                const rColor = BRAND_COLORS[rp.brandSlug] || '#0071E3'
                return (
                  <Link key={rp.slug} href={`/products/${rp.category}/${rp.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: '#FFFFFF', borderRadius: 20, overflow: 'hidden', border: '1px solid #E8E8ED', transition: 'box-shadow 0.2s', height: '100%' }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.12)')}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                      <div style={{ height: 160, background: `linear-gradient(135deg, ${rColor}18, ${rColor}08)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={rp.imageUrl} alt={rp.name} style={{ width: '60%', height: '80%', objectFit: 'contain' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      </div>
                      <div style={{ padding: 20 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: rColor, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{rp.brand}</div>
                        <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 15, color: '#1D1D1F', marginBottom: 4 }}>{rp.name}</div>
                        <div style={{ fontSize: 13, color: '#6E6E73' }}>{rp.subcategory}</div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
