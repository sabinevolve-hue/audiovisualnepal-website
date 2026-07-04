import type { Metadata } from 'next'
import Link from 'next/link'
import { CategoryIcon } from '@/lib/icons'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Products | Professional AV Systems',
  description: 'Browse professional audio visual systems — PA systems, conference equipment, video walls, digital signage, and more.',
  openGraph: {
    title: 'Professional AV Products Nepal — Speakers, Amplifiers, Conference Systems',
    description: 'Browse 35+ categories of professional AV equipment in Nepal. PA systems, ceiling speakers, conference systems, IP network audio, wireless microphones and more.',
    url: 'https://audiovisualnepal.com/products',
    siteName: 'AudioVisual Nepal',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'AudioVisual Nepal' }],
    type: 'website',
  },
  alternates: { canonical: 'https://audiovisualnepal.com/products' },
}

export const revalidate = 3600

export default function ProductsPage() {
  return (
    <main style={{ paddingTop: 80, background: '#FFFFFF' }}>
      {/* Hero */}
      <section style={{ padding: '100px 24px 80px', background: 'linear-gradient(180deg, #F0F4F8 0%, #FFFFFF 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Product Catalog</p>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>
            Professional AV Systems
          </h1>
          <p style={{ fontSize: 18, color: '#64748B', lineHeight: 1.7, maxWidth: 540, margin: '0 auto' }}>
            Browse our complete range of audio visual systems — sourced from the world&apos;s leading brands, delivered and installed across Nepal.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {PRODUCT_CATEGORIES.map(cat => (
              <Link key={cat.href} href={cat.href} style={{ textDecoration: 'none', display: 'block', background: '#FFFFFF', border: '1px solid rgba(11,30,61,0.1)', borderRadius: 20, padding: '32px', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ color: '#3B82F6', display: 'flex' }}><CategoryIcon name={cat.icon} size={28} /></span>
                  <span style={{ width: 32, height: 32, background: 'rgba(37,99,235,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                    <ArrowRight size={14} />
                  </span>
                </div>
                <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#0B1E3D', marginBottom: 10 }}>{cat.label}</h2>
                {cat.description && (
                  <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.65, marginBottom: 16 }}>{cat.description}</p>
                )}
                <div style={{ fontSize: 13, fontWeight: 600, color: '#3B82F6' }}>Browse products →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '80px 24px', background: '#F1F5F9', textAlign: 'center', borderTop: '1px solid rgba(11,30,61,0.05)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, color: '#0B1E3D', marginBottom: 12 }}>Can&apos;t find what you need?</h2>
          <p style={{ fontSize: 16, color: '#64748B', marginBottom: 32 }}>Our team can source any professional AV product. Contact us with your requirements.</p>
          <Link href="/contact" style={{ display: 'inline-block', background: '#3B82F6', color: '#0B1E3D', padding: '16px 40px', borderRadius: 980, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>Request Custom Quote</Link>
        </div>
      </section>
    </main>
  )
}
