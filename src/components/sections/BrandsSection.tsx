'use client'

import Link from 'next/link'
import { BRANDS } from '@/lib/constants'

// Brand accent colors — light theme
const BRAND_ACCENTS: Record<string, { color: string; bg: string; border: string; textColor: string }> = {
  'DSPPA':    { color: '#DC2626', bg: 'rgba(220,38,38,0.05)',    border: 'rgba(220,38,38,0.15)',    textColor: '#DC2626' },
  'InfoBit':  { color: '#6366F1', bg: 'rgba(99,102,241,0.05)',   border: 'rgba(99,102,241,0.15)',   textColor: '#6366F1' },
  'Tenveo':   { color: '#0284C7', bg: 'rgba(2,132,199,0.05)',    border: 'rgba(2,132,199,0.15)',    textColor: '#0284C7' },
  'Focus':    { color: '#1E40AF', bg: 'rgba(30,64,175,0.05)',    border: 'rgba(30,64,175,0.15)',    textColor: '#1E40AF' },
}

function BrandCard({ brand }: { brand: typeof BRANDS[number] }) {
  const accent = BRAND_ACCENTS[brand.name] || { color: '#2563EB', bg: 'rgba(37,99,235,0.05)', border: 'rgba(37,99,235,0.15)', textColor: '#2563EB' }

  return (
    <Link
      href={brand.href}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: '32px 28px',
        borderRadius: 20,
        background: '#FFFFFF',
        border: `1.5px solid ${accent.border}`,
        textDecoration: 'none',
        boxShadow: '0 1px 8px rgba(11,30,61,0.06)',
        transition: 'all 0.2s',
        flex: '1 1 200px',
        minWidth: 0,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.borderColor = accent.color
        el.style.boxShadow = `0 8px 32px ${accent.color}20`
        el.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.borderColor = accent.border
        el.style.boxShadow = '0 1px 8px rgba(11,30,61,0.06)'
        el.style.transform = 'none'
      }}
    >
      {/* Brand name as styled text */}
      <div style={{ fontFamily: 'var(--font-display), Manrope, sans-serif', fontWeight: 900, fontSize: 28, color: accent.textColor, letterSpacing: '-0.02em', lineHeight: 1 }}>
        {brand.name}
      </div>
      {/* Origin badge */}
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#94A3B8' }}>
        {brand.category}
      </div>
      {/* Tagline */}
      <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.55, textAlign: 'center', maxWidth: 180, marginTop: 4 }}>
        {'tagline' in brand ? (brand as { tagline: string }).tagline : ''}
      </p>
      {/* View brand link */}
      <span style={{ fontSize: 12, fontWeight: 600, color: accent.color, marginTop: 8 }}>
        View Catalog →
      </span>
    </Link>
  )
}

export default function BrandsSection() {
  return (
    <section className="section-padding" style={{ background: '#F8FAFC', borderTop: '1px solid rgba(11,30,61,0.06)' }}>
      <div className="container-site">
        <div className="text-center mb-14">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563EB', marginBottom: 12 }}>Our Technology Partners</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,4vw,48px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0B1E3D', marginBottom: 16 }}>
            5 World-Class Brands
          </h2>
          <p style={{ fontSize: 16, maxWidth: 500, margin: '0 auto', lineHeight: 1.7, color: '#475569' }}>
            Authorised distributor for five specialised AV manufacturers — every product is genuine with full manufacturer warranty.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
          {BRANDS.map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </div>

        {/* Trust bar */}
        <div style={{ marginTop: 48, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px 40px', paddingTop: 36, borderTop: '1px solid rgba(11,30,61,0.07)' }}>
          {[
            'Authorised Distributor',
            'Manufacturer Warranty',
            '100% Genuine Products',
            'After-Sales Support',
            'Technical Training',
          ].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#475569', fontWeight: 500 }}>
              <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(37,99,235,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
