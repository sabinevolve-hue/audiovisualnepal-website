import type { Metadata } from 'next'
import Link from 'next/link'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import { getProductCategories } from '@/lib/wordpress'
import ProductSearch from './ProductSearch'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Products — AudioVisual Nepal | Professional AV Equipment',
  description: 'Professional audio visual equipment for Nepal — speakers, amplifiers, conference systems, video walls, IP audio, wireless systems and more from authorized brands.',
}

export default async function ProductsPage() {
  const wpCategories = await getProductCategories()

  const categories = wpCategories.length > 0
    ? wpCategories.map((c: { name: string; slug: string; count?: number }) => ({
        label: c.name,
        href: `/products/${c.slug}`,
        icon: PRODUCT_CATEGORIES.find(p => p.href.includes(c.slug))?.icon ?? '📦',
        count: c.count ?? 0,
      }))
    : PRODUCT_CATEGORIES.map(c => ({ ...c }))

  return (
    <main style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ background: '#1D1D1F', padding: '80px 24px 64px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#0071E3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Genuine AV Equipment</p>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: 20 }}>Professional Products</h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', maxWidth: 560, margin: '0 auto 40px' }}>
          Nepal&apos;s widest range of professional audio visual equipment — all genuine, all warranted, all supported.
        </p>
        <Link href="/contact" style={{ display: 'inline-block', background: '#0071E3', color: '#FFFFFF', padding: '14px 32px', borderRadius: 980, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
          Request a Quote
        </Link>
      </section>

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" style={{ background: '#F5F5F7', padding: '12px 24px', borderBottom: '1px solid #E8E8ED' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', fontSize: 13, color: '#6E6E73', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/" style={{ color: '#0071E3', textDecoration: 'none' }}>Home</Link>
          <span aria-hidden="true">›</span>
          <span style={{ color: '#1D1D1F', fontWeight: 500 }}>Products</span>
        </div>
      </nav>

      {/* Category Grid with Search */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em', textAlign: 'center', marginBottom: 12 }}>Browse by Category</h2>
          <p style={{ fontSize: 16, color: '#6E6E73', textAlign: 'center', marginBottom: 40 }}>
            {categories.length} categories &middot; {categories.reduce((s: number, c: { count?: number }) => s + (c.count ?? 0), 0)}+ products
          </p>
          <ProductSearch categories={categories} />
        </div>
      </section>

      {/* Why Buy From Us */}
      <section style={{ padding: '80px 24px', background: '#F5F5F7' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: 48 }}>Why AudioVisual Nepal?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { icon: '✅', title: 'Authorized Dealer', desc: 'Genuine products from official brand distributors. No grey market.' },
              { icon: '🛡️', title: 'Full Warranty', desc: 'Manufacturer warranty honored in Nepal with local support.' },
              { icon: '🔧', title: 'Expert Installation', desc: 'Our engineers design and install complete AV systems.' },
              { icon: '📞', title: 'After-Sales Support', desc: 'AMC, spare parts, and technical support post-installation.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#FFFFFF', borderRadius: 16, padding: 28, textAlign: 'left' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 700, color: '#1D1D1F', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#6E6E73', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: '#1D1D1F', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, color: '#FFFFFF', marginBottom: 16, letterSpacing: '-0.03em' }}>Need Help Choosing?</h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>Our AV engineers will recommend the right products for your space and budget.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" style={{ display: 'inline-block', background: '#0071E3', color: '#FFFFFF', padding: '16px 40px', borderRadius: 980, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>Get Expert Advice</Link>
          <Link href="/projects" style={{ display: 'inline-block', background: 'transparent', color: '#FFFFFF', padding: '16px 40px', borderRadius: 980, fontSize: 16, fontWeight: 600, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.3)' }}>See Projects</Link>
        </div>
      </section>
    </main>
  )
}
