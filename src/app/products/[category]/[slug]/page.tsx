import { Metadata } from 'next'
import Link from 'next/link'
import relationsData from '@/data/relations.json'
import { notFound } from 'next/navigation'
import { ALL_PRODUCTS, getProductBySlug as getProduct, getRelatedProducts } from '@/data/products'
import { ProductImg } from '@/components/ui/ProductImg'
import { SITE } from '@/lib/constants'

export const revalidate = 3600

type Props = { params: Promise<{ category: string; slug: string }> }

export async function generateStaticParams() {
  return ALL_PRODUCTS.map(p => ({ category: p.category, slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.name} — ${product.subcategory}`,
    description: product.description.slice(0, 155),
    openGraph: {
      title: `${product.name} | AudioVisual Nepal`,
      description: product.description.slice(0, 155),
      images: [{ url: product.imageUrl }],
    },
  }
}

const BRAND_COLORS: Record<string, string> = {
  dsppa: '#DC2626', infobit: '#6366F1', tenveo: '#0891B2', focus: '#1E40AF',
}
const BRAND_LOGOS: Record<string, string> = {
  dsppa: 'DSPPA', infobit: 'InfoBit', tenveo: 'Tenveo', focus: 'Focus',
}
const DOWNLOAD_ICONS: Record<string, string> = {
  brochure: '📄',
  datasheet: '📊',
  manual: '📖',
  catalog: '📚',
  guide: '📋',
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product)
  const brandColor = BRAND_COLORS[product.brandSlug] || '#2563EB'
  const heroSpecs = product.specs.filter(s => s.highlight).slice(0, 3)
  const hasDownloads = product.downloads && product.downloads.length > 0

  return (
    <main style={{ background: '#FFFFFF', minHeight: '100vh', paddingTop: 80 }}>

      {/* Breadcrumb */}
      <div style={{ padding: '12px 24px', background: '#F8FAFC', borderBottom: '1px solid rgba(11,30,61,0.08)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: '#64748B', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#2563EB', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/products" style={{ color: '#2563EB', textDecoration: 'none' }}>Products</Link>
          <span>›</span>
          <Link href={`/products/${product.category}`} style={{ color: '#2563EB', textDecoration: 'none', textTransform: 'capitalize' }}>{product.category.replace(/-/g, ' ')}</Link>
          <span>›</span>
          <span style={{ color: '#0B1E3D', fontWeight: 500 }}>{product.name}</span>
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '48px 24px 56px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 64, alignItems: 'start' }}>

          {/* Left — Image + key spec chips */}
          <div>
            <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', background: `linear-gradient(135deg, ${brandColor}12 0%, #F8FAFC 100%)`, border: `1.5px solid ${brandColor}25`, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', top: 16, right: 16, background: '#0B1E3D', border: `1.5px solid ${brandColor}60`, borderRadius: 10, padding: '5px 14px', fontSize: 12, fontWeight: 900, letterSpacing: '0.06em', color: '#FFFFFF', fontFamily: 'Manrope, sans-serif' }}>
                {BRAND_LOGOS[product.brandSlug] || product.brand}
              </div>
              {product.badge && (
                <div style={{ position: 'absolute', top: 16, left: 16, background: product.badge === 'Best Seller' ? '#D97706' : product.badge === 'New' ? '#059669' : brandColor, color: '#fff', padding: '4px 12px', borderRadius: 980, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>
                  {product.badge}
                </div>
              )}
              <ProductImg src={product.imageUrl} alt={product.name} objectFit="contain" brandColor={brandColor} brandName={BRAND_LOGOS[product.brandSlug] || product.brand} />
            </div>

            {/* Key spec chips */}
            {heroSpecs.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${heroSpecs.length}, 1fr)`, gap: 10, marginTop: 14 }}>
                {heroSpecs.map(spec => (
                  <div key={spec.label} style={{ background: '#F8FAFC', border: `1.5px solid ${brandColor}30`, borderRadius: 14, padding: '14px 10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: brandColor, fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{spec.value}</div>
                    <div style={{ fontSize: 10, color: '#64748B', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{spec.label}</div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right — Product info */}
          <div style={{ paddingBottom: 8 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href={`/brands/${product.brandSlug}`} style={{ background: brandColor, color: '#fff', padding: '5px 14px', borderRadius: 980, fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textDecoration: 'none' }}>
                {BRAND_LOGOS[product.brandSlug] || product.brand}
              </Link>
              <span style={{ background: '#F1F5F9', color: '#475569', padding: '5px 14px', borderRadius: 980, fontSize: 12, fontWeight: 500 }}>
                {product.subcategory}
              </span>
            </div>

            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(26px,3.2vw,40px)', fontWeight: 900, color: '#0B1E3D', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 10 }}>
              {product.name}
            </h1>
            <p style={{ fontSize: 17, color: brandColor, fontWeight: 600, marginBottom: 14, lineHeight: 1.4 }}>{product.tagline}</p>


            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.8, marginBottom: 28 }}>{product.description}</p>

            {/* Applications */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Ideal For</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.applications.map(app => (
                  <span key={app} style={{ background: '#F8FAFC', color: '#475569', padding: '6px 14px', borderRadius: 980, fontSize: 12, fontWeight: 600, border: '1px solid rgba(11,30,61,0.1)' }}>{app}</span>
                ))}
              </div>
            </div>

            {/* Warranty badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, marginBottom: 32 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#059669' }}>{product.warranty} Warranty</span>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href={`https://wa.me/9779762109538?text=Hi%2C%20I'm%20interested%20in%20the%20${encodeURIComponent(product.name)}.%20Please%20send%20pricing%20and%20availability.`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: '#fff', padding: '14px 20px', borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none', minWidth: 160 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Enquiry
                </a>
                <Link href={`/contact?product=${encodeURIComponent(product.name)}&brand=${product.brand}`}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: brandColor, color: '#fff', padding: '14px 20px', borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none', minWidth: 160 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  Request Quotation
                </Link>
              </div>
              <a href={`tel:${SITE.phoneRaw}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'transparent', color: '#0B1E3D', padding: '12px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: 'none', border: '1.5px solid rgba(11,30,61,0.2)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92l-.08 2z"/></svg>
                Call {SITE.phone}
              </a>
            </div>

            {/* Trust badges — Tenveo-style */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(11,30,61,0.08)' }}>
              {[
                { label: 'Genuine Product',     sub: 'Authorised dealer' },
                { label: product.warranty + ' Warranty', sub: 'Manufacturer backed' },
                { label: 'Expert Support',      sub: 'Local AV engineers' },
                { label: 'All Nepal Delivery',  sub: 'All 77 districts' },
              ].map(t => (
                <div key={t.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 12px', background: '#F8FAFC', borderRadius: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0B1E3D' }}>{t.label}</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TAB NAVIGATION (anchor-based) ─────────────────────────── */}
      <nav style={{ position: 'sticky', top: 80, zIndex: 40, background: '#FFFFFF', borderBottom: '2px solid rgba(11,30,61,0.08)', borderTop: '1px solid rgba(11,30,61,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {[
            { label: 'Key Features', href: '#features' },
            { label: 'Specifications', href: '#specs' },
            { label: 'Downloads', href: '#downloads' },
            { label: 'Support', href: '#support' },
          ].map(tab => (
            <a key={tab.href} href={tab.href} style={{ padding: '14px 24px', fontSize: 13, fontWeight: 600, color: '#475569', textDecoration: 'none', whiteSpace: 'nowrap', borderBottom: '2px solid transparent', marginBottom: -2, transition: 'color 0.2s' }}>
              {tab.label}
            </a>
          ))}
          {product.brandProductUrl && (
            <a href={product.brandProductUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', padding: '14px 16px', fontSize: 12, fontWeight: 600, color: brandColor, textDecoration: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 5 }}>
              View on {BRAND_LOGOS[product.brandSlug] || product.brand} ↗
            </a>
          )}
        </div>
      </nav>

      {/* ── KEY FEATURES ─────────────────────────────────────────────── */}
      <section id="features" style={{ padding: '72px 24px', background: '#FFFFFF', scrollMarginTop: 140 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: brandColor, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>Why Choose This</p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(26px,3vw,36px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.02em' }}>Key Features</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
            {product.keyFeatures.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: '22px 20px', background: '#FFFFFF', borderRadius: 16, border: '1px solid rgba(11,30,61,0.09)', boxShadow: '0 1px 4px rgba(11,30,61,0.04)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${brandColor}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={brandColor} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0B1E3D', marginBottom: 5, fontFamily: 'Manrope, sans-serif' }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNICAL SPECIFICATIONS ─────────────────────────────────── */}
      <section id="specs" style={{ padding: '72px 24px', background: '#F8FAFC', scrollMarginTop: 140 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: brandColor, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>Technical Data</p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(26px,3vw,36px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.02em' }}>Specifications</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
            {/* Apple-style grouped specs table */}
            <div style={{ border: '1px solid rgba(11,30,61,0.1)', borderRadius: 16, overflow: 'hidden', background: '#FFFFFF' }}>
              <div style={{ padding: '14px 20px', background: `${brandColor}08`, borderBottom: `2px solid ${brandColor}20` }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0B1E3D' }}>Technical Parameters</span>
              </div>
              {(() => {
                // Group specs by spec.group — Apple MacBook Air style
                const groups: Record<string, typeof product.specs> = {}
                const ungrouped: typeof product.specs = []
                product.specs.forEach(s => {
                  if (s.group) {
                    if (!groups[s.group]) groups[s.group] = []
                    groups[s.group].push(s)
                  } else {
                    ungrouped.push(s)
                  }
                })
                const hasGroups = Object.keys(groups).length > 0
                return (
                  <>
                    {hasGroups ? (
                      <>
                        {Object.entries(groups).map(([groupName, groupSpecs]) => (
                          <div key={groupName}>
                            <div style={{ padding: '8px 20px', background: `${brandColor}08`, borderBottom: '1px solid rgba(11,30,61,0.06)', borderTop: '1px solid rgba(11,30,61,0.06)' }}>
                              <span style={{ fontSize: 10, fontWeight: 700, color: brandColor, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{groupName}</span>
                            </div>
                            {groupSpecs.map((spec, i) => (
                              <div key={spec.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 20px', background: spec.highlight ? `${brandColor}06` : i % 2 === 0 ? '#FFFFFF' : '#FAFAFA', borderBottom: '1px solid rgba(11,30,61,0.04)', borderLeft: spec.highlight ? `3px solid ${brandColor}` : '3px solid transparent', gap: 16 }}>
                                <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500, flexShrink: 0 }}>{spec.label}</span>
                                <span style={{ fontSize: 13, color: spec.highlight ? brandColor : '#1E293B', fontWeight: spec.highlight ? 700 : 500, textAlign: 'right' }}>{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                        {ungrouped.map((spec, i) => (
                          <div key={spec.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 20px', background: i % 2 === 0 ? '#FFFFFF' : '#FAFAFA', borderBottom: '1px solid rgba(11,30,61,0.04)', borderLeft: '3px solid transparent', gap: 16 }}>
                            <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500, flexShrink: 0 }}>{spec.label}</span>
                            <span style={{ fontSize: 13, color: '#1E293B', fontWeight: 500, textAlign: 'right' }}>{spec.value}</span>
                          </div>
                        ))}
                      </>
                    ) : (
                      product.specs.map((spec, i) => (
                        <div key={spec.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', background: spec.highlight ? `${brandColor}06` : i % 2 === 0 ? '#FFFFFF' : '#FAFAFA', borderBottom: '1px solid rgba(11,30,61,0.05)', borderLeft: spec.highlight ? `3px solid ${brandColor}` : '3px solid transparent', gap: 16 }}>
                          <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500, flexShrink: 0 }}>{spec.label}</span>
                          <span style={{ fontSize: 13, color: spec.highlight ? brandColor : '#1E293B', fontWeight: spec.highlight ? 700 : 500, textAlign: 'right' }}>{spec.value}</span>
                        </div>
                      ))
                    )}
                  </>
                )
              })()}
              <div style={{ padding: '12px 20px', background: '#F0FDF4', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #BBF7D0' }}>
                <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>Warranty</span>
                <span style={{ fontSize: 13, color: '#059669', fontWeight: 700 }}>{product.warranty}</span>
              </div>
            </div>

            {/* Summary card + quote CTA */}
            <div>
              <div style={{ padding: 28, background: '#FFFFFF', borderRadius: 16, border: '1px solid rgba(11,30,61,0.1)', marginBottom: 16 }}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 700, color: '#0B1E3D', marginBottom: 8 }}>Need the full technical datasheet?</h3>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7, marginBottom: 20 }}>Our engineers will send the complete specification sheet, wiring diagrams, and installation guide within 24 hours.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Link href={`/contact?product=${encodeURIComponent(product.name)}&inquiry=datasheet`}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: brandColor, color: '#fff', padding: '12px 20px', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Request Datasheet
                  </Link>
                  <a href={`https://wa.me/9779762109538?text=Please%20send%20the%20datasheet%20for%20${encodeURIComponent(product.name)}.`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'transparent', color: '#25D366', padding: '12px 20px', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none', border: '1.5px solid #25D366' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Get via WhatsApp
                  </a>
                </div>
              </div>

              {/* Quick specs highlight */}
              {product.specs.filter(s => s.highlight).length > 0 && (
                <div style={{ padding: '20px 24px', background: `${brandColor}08`, border: `1px solid ${brandColor}20`, borderRadius: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: brandColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Highlight Specs</div>
                  {product.specs.filter(s => s.highlight).map(spec => (
                    <div key={spec.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(11,30,61,0.06)' }}>
                      <span style={{ fontSize: 13, color: '#64748B' }}>{spec.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: brandColor }}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── DOWNLOADS ────────────────────────────────────────────────── */}
      <section id="downloads" style={{ padding: '72px 24px', background: '#FFFFFF', scrollMarginTop: 140 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: brandColor, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>Product Resources</p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(26px,3vw,36px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.02em' }}>Downloads & Documentation</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 32 }}>
            {/* Available downloads */}
            {hasDownloads && product.downloads!.map((dl, i) => (
              <a key={i} href={dl.url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px', background: '#FFFFFF', borderRadius: 14, border: '1px solid rgba(11,30,61,0.1)', textDecoration: 'none', transition: 'border-color 0.2s' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${brandColor}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {DOWNLOAD_ICONS[dl.type]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0B1E3D', marginBottom: 3 }}>{dl.label}</div>
                  <div style={{ fontSize: 11, color: brandColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{dl.type}{dl.fileSize ? ` · ${dl.fileSize}` : ''}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={brandColor} strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </a>
            ))}

            {/* Always show: Request brochure card */}
            <Link href={`/contact?product=${encodeURIComponent(product.name)}&inquiry=brochure`}
              style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px', background: '#F8FAFC', borderRadius: 14, border: `1px dashed ${brandColor}40`, textDecoration: 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${brandColor}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                📩
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0B1E3D', marginBottom: 3 }}>Request Full Brochure</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>Delivered to your email within 24h</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={brandColor} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>

            {/* Manufacturer website card */}
            {product.brandProductUrl && (
              <a href={product.brandProductUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px', background: '#F8FAFC', borderRadius: 14, border: '1px solid rgba(11,30,61,0.08)', textDecoration: 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${brandColor}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  🌐
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0B1E3D', marginBottom: 3 }}>View on {BRAND_LOGOS[product.brandSlug] || product.brand} Website</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>Official product page with full resources</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={brandColor} strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            )}
          </div>

          {/* Info note */}
          <div style={{ padding: '16px 20px', background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 12, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p style={{ fontSize: 13, color: '#0369A1', lineHeight: 1.6, margin: 0 }}>
              All technical documents are provided by the manufacturer. For installation support, custom configurations, and Nepal-specific compliance guidance, contact our engineering team.
            </p>
          </div>
        </div>
      </section>

      {/* ── SUPPORT / CTA ────────────────────────────────────────────── */}
      <section id="support" style={{ padding: '72px 24px', background: '#F8FAFC', scrollMarginTop: 140 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 64 }}>
            {/* Quote CTA */}
            <div style={{ padding: 36, background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}CC 100%)`, borderRadius: 20, color: '#fff' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 12 }}>Get a Price</div>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.02em' }}>Request a Quotation</h3>
              <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.7, marginBottom: 24 }}>Tell us your project requirements and we&apos;ll send a detailed quotation with installation cost within 48 hours.</p>
              <Link href={`/contact?product=${encodeURIComponent(product.name)}&brand=${product.brand}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: brandColor, padding: '12px 24px', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                Get Quote →
              </Link>
            </div>

            {/* Contact card */}
            <div style={{ padding: 36, background: '#FFFFFF', borderRadius: 20, border: '1px solid rgba(11,30,61,0.1)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>Speak to an Engineer</div>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 800, color: '#0B1E3D', marginBottom: 10, letterSpacing: '-0.02em' }}>Technical Support</h3>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, marginBottom: 24 }}>Our certified AV engineers can advise on system design, compatibility, and the right configuration for your space.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href={`tel:${SITE.phoneRaw}`} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#0B1E3D', fontWeight: 600, textDecoration: 'none' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={brandColor} strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92l-.08 2z"/></svg>
                  {SITE.phone}
                </a>
                <a href={`mailto:${SITE.email}`} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#0B1E3D', fontWeight: 600, textDecoration: 'none' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={brandColor} strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Product',
                name: product.name,
                image: `https://www.audiovisualnepal.com${product.imageUrl}`,
                description: product.description,
                brand: { '@type': 'Brand', name: product.brand },
                category: product.subcategory,
                url: `https://www.audiovisualnepal.com/products/${product.category}/${product.slug}`,
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Products', item: 'https://www.audiovisualnepal.com/products' },
                  { '@type': 'ListItem', position: 2, name: product.subcategory, item: `https://www.audiovisualnepal.com/products/${product.category}` },
                  { '@type': 'ListItem', position: 3, name: product.name, item: `https://www.audiovisualnepal.com/products/${product.category}/${product.slug}` },
                ],
              },
            ],
          }) }} />

          {/* Used in solutions / projects (derived from relations graph) */}
          {(() => {
            const rel = (relationsData as { products: Record<string, { solutions: { label: string; href: string }[]; cases: { label: string; href: string }[] }> }).products[product.slug]
            if (!rel || (rel.solutions.length === 0 && rel.cases.length === 0)) return null
            return (
              <div style={{ marginBottom: 48 }}>
                <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 24, fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.02em', marginBottom: 16 }}>Where this product is used</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {rel.solutions.map((r) => (
                    <Link key={r.href} href={r.href} style={{ border: '1px solid rgba(11,30,61,0.12)', borderRadius: 999, padding: '8px 18px', fontSize: 13, fontWeight: 600, color: '#2563EB', textDecoration: 'none' }}>
                      {r.label} solution →
                    </Link>
                  ))}
                  {rel.cases.map((r) => (
                    <Link key={r.href} href={r.href} style={{ border: '1px solid rgba(11,30,61,0.12)', borderRadius: 999, padding: '8px 18px', fontSize: 13, fontWeight: 600, color: '#0F766E', textDecoration: 'none' }}>
                      Case study: {r.label} →
                    </Link>
                  ))}
                </div>
                <p style={{ marginTop: 14, fontSize: 12, color: '#94A3B8' }}>Quotations within 24 hours on working days — request via the buttons above or <Link href="/boq-lookup" style={{ color: '#2563EB' }}>check your whole BOQ at once</Link>.</p>
              </div>
            )
          })()}

          {/* Related Products */}
          {related.length > 0 && (
            <>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 24, fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.02em', marginBottom: 24 }}>Related Products</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                {related.map(rp => {
                  const rColor = BRAND_COLORS[rp.brandSlug] || '#2563EB'
                  return (
                    <Link key={rp.slug} href={`/products/${rp.category}/${rp.slug}`} style={{ textDecoration: 'none' }}>
                      <div style={{ background: '#FFFFFF', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(11,30,61,0.08)', height: '100%', transition: 'border-color 0.2s' }}>
                        <div style={{ height: 160, background: `linear-gradient(135deg, ${rColor}12, #F8FAFC)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                          <div style={{ position: 'absolute', top: 10, right: 12, fontSize: 10, fontWeight: 800, color: rColor, letterSpacing: '0.06em', fontFamily: 'Manrope, sans-serif' }}>{BRAND_LOGOS[rp.brandSlug] || rp.brand}</div>
                          <ProductImg src={rp.imageUrl} alt={rp.name} objectFit="contain" brandColor={rColor} brandName={BRAND_LOGOS[rp.brandSlug] || rp.brand} />
                        </div>
                        <div style={{ padding: '16px 18px' }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: rColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{rp.subcategory}</div>
                          <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#0B1E3D', lineHeight: 1.3 }}>{rp.name}</div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>

    </main>
  )
}
