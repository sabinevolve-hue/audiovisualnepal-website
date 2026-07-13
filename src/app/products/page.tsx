import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { PRODUCT_GROUPS, VENUE_SOLUTIONS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Products | Professional AV Systems Nepal',
  description: 'Complete professional AV product catalog — PA systems, voice evacuation, conference cameras, smart podiums, video conferencing and display solutions. Authorised brands, NPR pricing, nationwide delivery.',
  openGraph: {
    title: 'Professional AV Products Nepal — PA, Conference & Display Systems',
    description: 'Browse 38+ products across 14 categories. DSPPA, InfoBit, Tenveo, Focus — genuine products with full manufacturer warranty.',
    url: 'https://www.audiovisualnepal.com/products',
    siteName: 'AudioVisual Nepal',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'AudioVisual Nepal Products' }],
    type: 'website',
  },
  alternates: { canonical: 'https://www.audiovisualnepal.com/products' },
}

export const revalidate = 3600

const GROUP_ICONS: Record<string, string> = {
  'pa-systems': '🔊',
  'conference': '📹',
  'smart-classroom': '🎓',
  'display': '🖥️',
}

const GROUP_BG: Record<string, string> = {
  'pa-systems':      'linear-gradient(135deg, #FEF2F2 0%, #FFF5F5 100%)',
  'conference':      'linear-gradient(135deg, #EEF2FF 0%, #F0F4FF 100%)',
  'smart-classroom': 'linear-gradient(135deg, #EFF6FF 0%, #F0F7FF 100%)',
  'display':         'linear-gradient(135deg, #ECFEFF 0%, #F0FDFF 100%)',
}

export default function ProductsPage() {
  return (
    <main style={{ paddingTop: 80, background: '#FFFFFF' }}>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px 60px', background: 'linear-gradient(180deg, #F0F4F8 0%, #FFFFFF 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Product Catalog</p>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 18 }}>
            Professional AV Systems
          </h1>
          <p style={{ fontSize: 17, color: '#64748B', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 36px' }}>
            38+ products across 14 categories — sourced from authorised brands, delivered and installed across Nepal.
          </p>
          {/* Brand strip */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['DSPPA', 'InfoBit', 'Tenveo', 'Focus'].map(b => (
              <span key={b} style={{ background: '#FFFFFF', border: '1px solid rgba(11,30,61,0.12)', borderRadius: 8, padding: '6px 16px', fontSize: 13, fontWeight: 600, color: '#0B1E3D' }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Groups ──────────────────────────────────────────── */}
      <section style={{ padding: '60px 24px 80px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 48 }}>
          {PRODUCT_GROUPS.map(group => (
            <div key={group.id}>
              {/* Group header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 16, borderBottom: `2px solid ${group.brandColor}22` }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ width: 4, height: 24, background: group.brandColor, borderRadius: 2, display: 'block' }} />
                    <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 800, color: '#0B1E3D', margin: 0 }}>{group.label}</h2>
                  </div>
                  <p style={{ fontSize: 14, color: '#64748B', margin: '0 0 0 14px', paddingLeft: 4 }}>{group.tagline}</p>
                </div>
                <span style={{ fontSize: 12, background: group.brandColor + '15', color: group.brandColor, fontWeight: 700, padding: '4px 10px', borderRadius: 6, whiteSpace: 'nowrap', marginTop: 4 }}>{group.brand}</span>
              </div>

              {/* Category cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                {group.categories.map(cat => (
                  <Link key={cat.href} href={cat.href} style={{ textDecoration: 'none', display: 'block', background: GROUP_BG[group.id], border: `1px solid ${group.brandColor}20`, borderRadius: 16, padding: '24px', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: group.brandColor, borderRadius: '16px 16px 0 0' }} />
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                      <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 700, color: '#0B1E3D', margin: 0, lineHeight: 1.3 }}>{cat.label}</h3>
                      <div style={{ width: 28, height: 28, background: group.brandColor + '15', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 8 }}>
                        <ArrowRight size={13} color={group.brandColor} />
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 14px', lineHeight: 1.5 }}>{cat.desc}</p>
                    <div style={{ fontSize: 12, fontWeight: 600, color: group.brandColor }}>
                      {cat.count} product{cat.count !== 1 ? 's' : ''} →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Solutions by Venue ──────────────────────────────────────── */}
      <section style={{ padding: '64px 24px', background: '#F8FAFC', borderTop: '1px solid rgba(11,30,61,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 36, textAlign: 'center' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>By Application</p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, color: '#0B1E3D', margin: 0 }}>Find Products for Your Venue</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {VENUE_SOLUTIONS.map(v => (
              <Link key={v.href} href={v.href} style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: 12, background: '#FFFFFF', border: '1px solid rgba(11,30,61,0.08)', borderRadius: 12, padding: '16px 18px', transition: 'all 0.2s' }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{v.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1E3D', marginBottom: 4 }}>{v.label}</div>
                  <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.45 }}>{v.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────── */}
      <section style={{ padding: '72px 24px', background: '#0B1E3D', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>Need a Custom Solution?</h2>
          <p style={{ fontSize: 16, color: '#94A3B8', marginBottom: 32 }}>Our engineers can design the right system for your space. Tell us your requirements.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2563EB', color: '#FFFFFF', padding: '14px 32px', borderRadius: 980, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Request a Quote <ArrowRight size={16} />
            </Link>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', padding: '14px 28px', borderRadius: 980, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
              WhatsApp Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
