'use client'

import Link from 'next/link'
import { BRANDS } from '@/lib/constants'
import { InfiniteMarquee } from '@/components/ui/InfiniteMarquee'

// Official brand logo image URLs (SVG/PNG from brand press kits or Wikipedia commons)
const BRAND_LOGOS: Record<string, { logo: string; color: string; bg: string; border: string }> = {
  'DSPPA':      { logo: 'https://www.dsppatech.com/static/images/logo.png',                                                                 color: '#0071E3', bg: 'rgba(0,113,227,0.08)',    border: 'rgba(0,113,227,0.18)' },
  'ITC':        { logo: 'https://www.itc-pub.com/images/logo.png',                                                                          color: '#CC2200', bg: 'rgba(204,34,0,0.08)',     border: 'rgba(204,34,0,0.18)' },
  'Shure':      { logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Shure_logo.svg/320px-Shure_logo.svg.png',               color: '#B30000', bg: 'rgba(179,0,0,0.08)',      border: 'rgba(179,0,0,0.18)' },
  'JBL':        { logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/JBL_logo.svg/320px-JBL_logo.svg.png',                  color: '#FF6B00', bg: 'rgba(255,107,0,0.08)',    border: 'rgba(255,107,0,0.18)' },
  'Bose':       { logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Bose_logo.svg/320px-Bose_logo.svg.png',                color: '#E8E8E8', bg: 'rgba(232,232,232,0.06)',   border: 'rgba(232,232,232,0.15)' },
  'Yamaha':     { logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Yamaha_logo.svg/320px-Yamaha_logo.svg.png',            color: '#1A7A3C', bg: 'rgba(26,122,60,0.08)',     border: 'rgba(26,122,60,0.18)' },
  'TOA':        { logo: 'https://www.toa.com.sg/wp-content/themes/toa/img/toa-logo-white.png',                                             color: '#A855F7', bg: 'rgba(168,85,247,0.08)',   border: 'rgba(168,85,247,0.18)' },
  'Sennheiser': { logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Sennheiser_logo.svg/320px-Sennheiser_logo.svg.png',   color: '#60A5FA', bg: 'rgba(96,165,250,0.08)',   border: 'rgba(96,165,250,0.18)' },
}

function BrandCard({ brand, large = false }: { brand: typeof BRANDS[number]; large?: boolean }) {
  const style = BRAND_LOGOS[brand.name] || { logo: '', color: '#94A3B8', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)' }

  return (
    <Link
      href={brand.href}
      style={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: large ? '18px 36px' : '14px 28px',
        borderRadius: 16,
        background: style.bg,
        border: `1px solid ${style.border}`,
        minWidth: large ? 180 : 150,
        minHeight: large ? 90 : 76,
        textDecoration: 'none',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.background = `${style.bg.replace('0.08', '0.15').replace('0.06', '0.12')}`
        el.style.borderColor = style.color
        el.style.boxShadow = `0 4px 20px ${style.color}20, 0 0 0 1px ${style.color}30`
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.background = style.bg
        el.style.borderColor = style.border
        el.style.boxShadow = 'none'
        el.style.transform = 'none'
      }}
    >
      {/* Brand name as styled text (logo fallback) */}
      <span style={{
        fontFamily: 'var(--font-display), Manrope, sans-serif',
        fontWeight: 900,
        fontSize: large ? 22 : 17,
        color: style.color,
        letterSpacing: brand.name === 'Sennheiser' ? '-0.01em' : '0.04em',
        lineHeight: 1,
      }}>
        {brand.name}
      </span>
      <span style={{ fontSize: 10, color: 'rgba(148,163,184,0.7)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {brand.category}
      </span>
    </Link>
  )
}

export default function BrandsSection() {
  return (
    <section className="py-20" style={{ background: '#060D1A', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container-site mb-14 text-center">
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#60A5FA', marginBottom: 12 }}>Trusted Partners</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#FFFFFF', marginBottom: 16 }}>World-Class Brands</h2>
        <p style={{ fontSize: 17, maxWidth: 480, margin: '0 auto', lineHeight: 1.65, color: '#64748B' }}>
          Authorised distributor for industry-leading manufacturers — every product is genuine with full warranty.
        </p>
      </div>

      <InfiniteMarquee speed={28} direction="left" className="mb-3">
        {BRANDS.map((brand) => (
          <BrandCard key={brand.name} brand={brand} large />
        ))}
      </InfiniteMarquee>

      <InfiniteMarquee speed={20} direction="right">
        {[...BRANDS].reverse().map((brand) => (
          <BrandCard key={brand.name} brand={brand} />
        ))}
      </InfiniteMarquee>
    </section>
  )
}
