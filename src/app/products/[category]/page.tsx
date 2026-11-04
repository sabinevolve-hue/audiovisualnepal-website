import NepalProjectMap from '@/components/projects/NepalProjectMap'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { ProductImg } from '@/components/ui/ProductImg'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import { PRODUCTS_BY_CATEGORY, ALL_PRODUCTS } from '@/data/products'

export const revalidate = 3600

const BRAND_COLORS: Record<string, string> = {
  dsppa: '#DC2626', infobit: '#6366F1', tenveo: '#0891B2', focus: '#1E40AF', lampro: '#0F58FB', wincomn: '#E11D48', triolion: '#0E7490', itc: '#EA580C',
}
const BRAND_NAMES: Record<string, string> = { focus: 'Evolve Podium', infobit: 'InfoBit', dsppa: 'DSPPA' }
const brandName = (b: string) => BRAND_NAMES[b] || b.charAt(0).toUpperCase() + b.slice(1)

const STATIC_CATS = PRODUCT_CATEGORIES.map((c, i) => ({
  id: i + 1,
  name: c.label,
  slug: c.href.replace('/products/', ''),
  description: c.description,
  count: c.count,
}))

type Props = { params: Promise<{ category: string }>; searchParams: Promise<{ brand?: string; application?: string; segment?: string }> }

export async function generateStaticParams() {
  return STATIC_CATS.map(c => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = STATIC_CATS.find(c => c.slug === category)
  if (!cat) return { title: 'Products' }
  return {
    title: `${cat.name} in Nepal — Authorised Dealer, Supply & Installation`,
    alternates: { canonical: `https://www.audiovisualnepal.com/products/${cat.slug}` },
    keywords: [`${cat.name} Nepal`, `${cat.name} Kathmandu`, `${cat.name} price in Nepal`, `buy ${cat.name.toLowerCase()} Nepal`],
    description: cat.description || `Professional ${cat.name.toLowerCase()} for Nepal — genuine products, manufacturer warranty, expert support, nationwide delivery.`,
  }
}

// Application → colour
const APP_COLORS: Record<string, string> = {
  Corporate: '#6366F1', Government: '#0891B2', Education: '#16A34A',
  Hotel: '#D97706', Hospital: '#DC2626', Religious: '#7C3AED',
  Transportation: '#0B1E3D', Stadium: '#EA580C', Events: '#E11D48', Entertainment: '#DB2777', Simulation: '#4F46E5', Retail: '#CA8A04', Broadcast: '#0F766E',
}

export default async function ProductCategoryPage({ params, searchParams }: Props) {
  const { category } = await params
  const sp = await searchParams
  const activeBrand = sp.brand?.toLowerCase()
  const activeApp   = sp.application
  const activeSeg   = sp.segment

  const cat = STATIC_CATS.find(c => c.slug === category)
  if (!cat) {
    return (
      <main style={{ paddingTop: 80, minHeight: '100vh', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 600, margin: '120px auto', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 32, fontWeight: 800, color: '#0B1E3D', marginBottom: 16 }}>Category Not Found</h1>
          <Link href="/products" style={{ color: '#2563EB', fontWeight: 600 }}>Browse All Products →</Link>
        </div>
      </main>
    )
  }

  // Products for this category
  const allForCat = PRODUCTS_BY_CATEGORY[category] || []

  // Filter
  let products = allForCat
  if (activeBrand) products = products.filter(p => p.brandSlug === activeBrand)
  if (activeApp)   products = products.filter(p => p.applications.includes(activeApp as never))
  if (activeSeg)   products = products.filter(p => p.subcategory === activeSeg)
  const segsInCat = [...new Set(allForCat.map(p => p.subcategory))]

  // Sidebar data — brands & applications available in this category
  const brandsInCat    = [...new Set(allForCat.map(p => p.brandSlug))]
  const appsInCat      = [...new Set(allForCat.flatMap(p => p.applications))]

  // Sibling categories for breadcrumb nav
  const siblings = STATIC_CATS.slice(0, 6)

  return (
    <main style={{ paddingTop: 80, background: '#FFFFFF', minHeight: '100vh' }}>

      {/* ── Breadcrumb ────────────────────────────────────────────── */}
      <div style={{ padding: '12px 24px', background: '#F8FAFC', borderBottom: '1px solid rgba(11,30,61,0.07)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, color: '#64748B', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#CBD5E1" />
          <Link href="/products" style={{ color: '#64748B', textDecoration: 'none' }}>Products</Link>
          <ChevronRight size={13} color="#CBD5E1" />
          <span style={{ color: '#0B1E3D', fontWeight: 600 }}>{cat.name}</span>
        </div>
      </div>

      {/* ── Hero strip ────────────────────────────────────────────── */}
      <section style={{ padding: '48px 24px 40px', background: 'linear-gradient(180deg, #F0F4F8 0%, #FFFFFF 100%)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#0B1E3D', marginBottom: 10 }}>{cat.name}</h1>
          <p style={{ fontSize: 16, color: '#64748B', maxWidth: 560, lineHeight: 1.65 }}>{cat.description}</p>
          {category === 'projectors' && (
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
              {[
                { k: '4K UHD Laser', v: '6,500–11,000 lm', d: 'Boardrooms, lecture theatres, museums & domes' },
                { k: 'Installation Laser (WUXGA)', v: '7,000–8,000 lm', d: 'Conference halls, classrooms, hotels, worship' },
                { k: 'High-Brightness Large Venue', v: '12,000–25,000 lm', d: 'Auditoriums, stadiums, façade & heritage mapping' },
                { k: 'Simulation & Training', v: 'Visible + IR', d: 'Flight, driving & night-vision simulators' },
              ].map(s => (
                <Link key={s.k} href={`/products/projectors?segment=${encodeURIComponent(s.k)}`} style={{ display: 'block', padding: '14px 16px', borderRadius: 14, background: activeSeg === s.k ? '#FFF1F2' : '#FFFFFF', border: `1.5px solid ${activeSeg === s.k ? '#E11D48' : 'rgba(11,30,61,0.08)'}`, textDecoration: 'none' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#E11D48', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.v}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0B1E3D', margin: '4px 0 2px' }}>{s.k}</div>
                  <div style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.5 }}>{s.d}</div>
                </Link>
              ))}
            </div>
          )}
          {category === 'projectors' && (
            <p style={{ marginTop: 16, fontSize: 13, color: '#64748B', maxWidth: 760, lineHeight: 1.6 }}>
              <strong style={{ color: '#0B1E3D' }}>Quick sizing:</strong> throw distance = throw ratio × image width (1.5:1 × 4 m = 6 m). Allow ~7k lumens for a 4 m screen in a normal room, 12–15k for 5–8 m or bright halls, and 20k+ for outdoor mapping. Every projector has a laser light source rated 20,000–30,000 hours — no lamp replacements.
            </p>
          )}
        </div>
      </section>

      {/* ── Main: sidebar + grid ───────────────────────────────────── */}
      <section style={{ padding: '32px 24px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 32, alignItems: 'start' }}>

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <aside style={{ position: 'sticky', top: 96 }}>
            {/* Filter by Segment */}
            {segsInCat.length > 1 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Segment</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Link href={`/products/${category}`} style={{ padding: '7px 10px', borderRadius: 8, fontSize: 13, fontWeight: !activeSeg ? 700 : 500, color: !activeSeg ? '#0B1E3D' : '#64748B', background: !activeSeg ? '#F1F5F9' : 'transparent', textDecoration: 'none', display: 'block' }}>All Segments</Link>
                  {segsInCat.map(sg => (
                    <Link key={sg} href={`/products/${category}?segment=${encodeURIComponent(sg)}`} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 8, fontSize: 13, fontWeight: activeSeg === sg ? 700 : 500, color: activeSeg === sg ? '#0B1E3D' : '#64748B', background: activeSeg === sg ? '#F1F5F9' : 'transparent', textDecoration: 'none' }}>
                      {sg}<span style={{ marginLeft: 'auto', fontSize: 11, color: '#94A3B8' }}>{allForCat.filter(p => p.subcategory === sg).length}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Filter by Brand */}
            {brandsInCat.length > 1 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Brand</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Link href={`/products/${category}`} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 8, fontSize: 13, fontWeight: !activeBrand ? 700 : 500, color: !activeBrand ? '#0B1E3D' : '#64748B', background: !activeBrand ? '#F1F5F9' : 'transparent', textDecoration: 'none' }}>
                    All Brands <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94A3B8' }}>{allForCat.length}</span>
                  </Link>
                  {brandsInCat.map(b => {
                    const count = allForCat.filter(p => p.brandSlug === b).length
                    const isActive = activeBrand === b
                    return (
                      <Link key={b} href={`/products/${category}?brand=${b}`} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 8, fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? (BRAND_COLORS[b] || '#0B1E3D') : '#64748B', background: isActive ? (BRAND_COLORS[b] + '12') : 'transparent', textDecoration: 'none' }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: BRAND_COLORS[b] || '#64748B', flexShrink: 0 }} />
                        {brandName(b)}
                        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94A3B8' }}>{count}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Filter by Application */}
            {appsInCat.length > 1 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Application</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Link href={`/products/${category}${activeBrand ? `?brand=${activeBrand}` : ''}`} style={{ padding: '7px 10px', borderRadius: 8, fontSize: 13, fontWeight: !activeApp ? 700 : 500, color: !activeApp ? '#0B1E3D' : '#64748B', background: !activeApp ? '#F1F5F9' : 'transparent', textDecoration: 'none', display: 'block' }}>
                    All Applications
                  </Link>
                  {appsInCat.map(app => {
                    const isActive = activeApp === app
                    const params = new URLSearchParams()
                    if (activeBrand) params.set('brand', activeBrand)
                    params.set('application', app)
                    return (
                      <Link key={app} href={`/products/${category}?${params}`} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 8, fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? '#0B1E3D' : '#64748B', background: isActive ? '#F1F5F9' : 'transparent', textDecoration: 'none' }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: APP_COLORS[app] || '#64748B', flexShrink: 0 }} />
                        {app}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* All Categories quick nav */}
            <div style={{ borderTop: '1px solid rgba(11,30,61,0.08)', paddingTop: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Categories</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {STATIC_CATS.map(c => (
                  <Link key={c.slug} href={`/products/${c.slug}`} style={{ padding: '6px 10px', borderRadius: 8, fontSize: 13, fontWeight: c.slug === category ? 700 : 400, color: c.slug === category ? '#2563EB' : '#64748B', background: c.slug === category ? '#EFF6FF' : 'transparent', textDecoration: 'none' }}>
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Product Grid ─────────────────────────────────────── */}
          <div>
            {/* Result count + active filters */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
              <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>
                Showing <strong style={{ color: '#0B1E3D' }}>{products.length}</strong> product{products.length !== 1 ? 's' : ''}
                {activeBrand && <> in <strong style={{ color: BRAND_COLORS[activeBrand] || '#0B1E3D' }}>{activeBrand.charAt(0).toUpperCase() + activeBrand.slice(1)}</strong></>}
                {activeApp && <> for <strong style={{ color: '#0B1E3D' }}>{activeApp}</strong></>}
              </p>
              {(activeBrand || activeApp || activeSeg) && (
                <Link href={`/products/${category}`} style={{ fontSize: 13, color: '#64748B', textDecoration: 'underline' }}>Clear filters</Link>
              )}
            </div>

            {products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 24px', background: '#F8FAFC', borderRadius: 16 }}>
                <p style={{ fontSize: 16, color: '#64748B', marginBottom: 16 }}>No products match this filter.</p>
                <Link href={`/products/${category}`} style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>Clear filters →</Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                {products.map(product => {
                  const bc = BRAND_COLORS[product.brandSlug] || '#2563EB'
                  const heroSpecs = product.specs.filter(s => s.highlight).slice(0, 2)
                  return (
                    <Link key={product.id} href={`/products/${product.category}/${product.slug}`} style={{ textDecoration: 'none', display: 'block', background: '#FFFFFF', border: '1px solid rgba(11,30,61,0.09)', borderRadius: 16, overflow: 'hidden', transition: 'all 0.2s' }}>
                      {/* Image */}
                      <div style={{ aspectRatio: '16/9', background: '#F8FAFC', position: 'relative', overflow: 'hidden' }}>
                        <ProductImg src={product.imageUrl} alt={product.name} objectFit="cover" />
                        {/* Brand badge */}
                        <div style={{ position: 'absolute', top: 10, left: 10 }}>
                          <span style={{ background: bc, color: '#FFFFFF', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, letterSpacing: '0.05em' }}>{product.brand}</span>
                        </div>
                        {/* Badge */}
                        {product.badge && (
                          <div style={{ position: 'absolute', top: 10, right: 10 }}>
                            <span style={{ background: '#0B1E3D', color: '#FFFFFF', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>{product.badge}</span>
                          </div>
                        )}
                      </div>
                      {/* Info */}
                      <div style={{ padding: '18px 20px' }}>
                        <p style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>{product.subcategory}</p>
                        <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 700, color: '#0B1E3D', marginBottom: 6, lineHeight: 1.3 }}>{product.name}</h3>
                        <p style={{ fontSize: 13, color: '#64748B', marginBottom: 14, lineHeight: 1.5 }}>{product.tagline}</p>
                        {/* Key specs */}
                        {heroSpecs.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                            {heroSpecs.map(s => (
                              <span key={s.label} style={{ fontSize: 11, background: bc + '12', color: bc, fontWeight: 600, padding: '3px 8px', borderRadius: 6 }}>{s.value}</span>
                            ))}
                          </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: '#2563EB' }}>
                          View Details <ArrowRight size={13} />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}

            {/* CTA */}
            <div style={{ marginTop: 48, padding: '32px', background: '#F8FAFC', borderRadius: 16, textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#0B1E3D', marginBottom: 8 }}>Need help choosing?</h3>
              <p style={{ fontSize: 14, color: '#64748B', marginBottom: 20 }}>Our engineers can recommend the right product for your project and budget.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ background: '#2563EB', color: '#FFFFFF', padding: '12px 28px', borderRadius: 980, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Request a Quote</Link>
                <Link href="/contact" style={{ background: '#FFFFFF', color: '#0B1E3D', padding: '12px 24px', borderRadius: 980, fontSize: 14, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(11,30,61,0.15)' }}>WhatsApp Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: '0 24px 72px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <NepalProjectMap compact lines={[cat.name]} segment={cat.name}
            title={`${cat.name} we have installed in Nepal`}
            subtitle={`Every pin is a completed ${cat.name.toLowerCase()} installation — click a district to see the municipalities and the projects in each.`} />
        </div>
      </section>
    </main>
  )
}
