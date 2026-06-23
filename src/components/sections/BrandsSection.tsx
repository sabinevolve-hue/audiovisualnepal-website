'use client'

import Link from 'next/link'
import { BRANDS } from '@/lib/constants'
import { InfiniteMarquee } from '@/components/ui/InfiniteMarquee'

// ─── Inline SVG Brand Logos ───────────────────────────────────────────────────
// All logos rendered as inline SVGs — no external dependencies, perfect on dark bg

function LogoDSPPA({ size = 90 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 0.38)} viewBox="0 0 90 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="90" height="34" rx="2" fill="none"/>
      {/* D */}
      <text x="0" y="26" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="28" fill="#3B82F6" letterSpacing="-1">DSPPA</text>
    </svg>
  )
}

// Inline SVG wordmarks per brand — styled to match brand identity
const BRAND_SVGS: Record<string, (props: { large?: boolean }) => JSX.Element> = {
  'DSPPA': ({ large }) => (
    <svg width={large ? 110 : 88} height={large ? 36 : 28} viewBox="0 0 110 36" fill="none">
      <text x="2" y="28" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize={large ? 30 : 24} fill="#3B82F6" letterSpacing="-0.5">DSPPA</text>
      <rect x="2" y="31" width="50" height="2.5" rx="1.25" fill="#3B82F6" opacity="0.5"/>
    </svg>
  ),
  'ITC': ({ large }) => (
    <svg width={large ? 80 : 64} height={large ? 36 : 28} viewBox="0 0 80 36" fill="none">
      <rect x="0" y="4" width="22" height="26" rx="3" fill="#E53E3E"/>
      <text x="5" y="24" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize={large ? 16 : 13} fill="white">ITC</text>
      <text x="26" y="24" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="700" fontSize={large ? 14 : 11} fill="#E2E8F0" letterSpacing="0.5">AUDIO</text>
    </svg>
  ),
  'Shure': ({ large }) => (
    <svg width={large ? 110 : 90} height={large ? 36 : 28} viewBox="0 0 110 36" fill="none">
      <text x="2" y="27" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize={large ? 28 : 22} fill="#CC0000" letterSpacing="-0.5">SHURE</text>
      <rect x="2" y="31" width="100" height="2" rx="1" fill="#CC0000" opacity="0.4"/>
    </svg>
  ),
  'JBL': ({ large }) => (
    <svg width={large ? 90 : 72} height={large ? 36 : 28} viewBox="0 0 90 36" fill="none">
      <rect x="0" y="0" width="90" height="36" rx="6" fill="#FF6600"/>
      <text x="10" y="27" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize={large ? 26 : 20} fill="white" letterSpacing="2">JBL</text>
    </svg>
  ),
  'Bose': ({ large }) => (
    <svg width={large ? 100 : 80} height={large ? 36 : 28} viewBox="0 0 100 36" fill="none">
      <text x="2" y="27" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize={large ? 28 : 22} fill="#E2E8F0" letterSpacing="3">BOSE</text>
      <rect x="2" y="31" width="88" height="1.5" rx="0.75" fill="rgba(255,255,255,0.25)"/>
    </svg>
  ),
  'Yamaha': ({ large }) => (
    <svg width={large ? 120 : 96} height={large ? 36 : 28} viewBox="0 0 120 36" fill="none">
      {/* Yamaha tuning forks mark */}
      <circle cx="14" cy="18" r="12" fill="none" stroke="#22C55E" strokeWidth="2"/>
      <circle cx="14" cy="18" r="4" fill="#22C55E"/>
      <line x1="14" y1="6" x2="14" y2="10" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="14" y1="26" x2="14" y2="30" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="5" y1="11" x2="8.5" y2="14" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
      <line x1="23" y1="11" x2="19.5" y2="14" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
      <text x="30" y="26" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize={large ? 22 : 18} fill="#22C55E" letterSpacing="-0.5">YAMAHA</text>
    </svg>
  ),
  'TOA': ({ large }) => (
    <svg width={large ? 90 : 72} height={large ? 36 : 28} viewBox="0 0 90 36" fill="none">
      <text x="2" y="27" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize={large ? 30 : 24} fill="#60A5FA" letterSpacing="2">TOA</text>
      <rect x="2" y="31" width="70" height="2.5" rx="1.25" fill="#60A5FA" opacity="0.4"/>
    </svg>
  ),
  'Sennheiser': ({ large }) => (
    <svg width={large ? 160 : 130} height={large ? 36 : 28} viewBox="0 0 160 36" fill="none">
      <text x="1" y="26" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize={large ? 21 : 17} fill="#94A3B8" letterSpacing="0.5">SENNHEISER</text>
      <rect x="1" y="29" width="148" height="2" rx="1" fill="#94A3B8" opacity="0.35"/>
    </svg>
  ),
}

// Brand accent colors for card hover
const BRAND_ACCENTS: Record<string, { color: string; bg: string; border: string }> = {
  'DSPPA':      { color: '#3B82F6', bg: 'rgba(59,130,246,0.07)',   border: 'rgba(59,130,246,0.18)' },
  'ITC':        { color: '#EF4444', bg: 'rgba(239,68,68,0.07)',    border: 'rgba(239,68,68,0.18)' },
  'Shure':      { color: '#EF4444', bg: 'rgba(204,0,0,0.07)',      border: 'rgba(204,0,0,0.18)' },
  'JBL':        { color: '#FF6600', bg: 'rgba(255,102,0,0.07)',    border: 'rgba(255,102,0,0.18)' },
  'Bose':       { color: '#CBD5E1', bg: 'rgba(203,213,225,0.05)',  border: 'rgba(203,213,225,0.12)' },
  'Yamaha':     { color: '#22C55E', bg: 'rgba(34,197,94,0.07)',    border: 'rgba(34,197,94,0.18)' },
  'TOA':        { color: '#60A5FA', bg: 'rgba(96,165,250,0.07)',   border: 'rgba(96,165,250,0.18)' },
  'Sennheiser': { color: '#94A3B8', bg: 'rgba(148,163,184,0.05)', border: 'rgba(148,163,184,0.15)' },
}

function BrandCard({ brand, large = false }: { brand: typeof BRANDS[number]; large?: boolean }) {
  const accent = BRAND_ACCENTS[brand.name] || { color: '#94A3B8', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.1)' }
  const Logo = BRAND_SVGS[brand.name]

  return (
    <Link
      href={brand.href}
      style={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: large ? '20px 32px' : '14px 24px',
        borderRadius: 16,
        background: accent.bg,
        border: `1px solid ${accent.border}`,
        minWidth: large ? 176 : 148,
        minHeight: large ? 92 : 76,
        textDecoration: 'none',
        transition: 'all 0.22s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.borderColor = accent.color
        el.style.boxShadow = `0 6px 24px ${accent.color}25, 0 0 0 1px ${accent.color}30`
        el.style.transform = 'translateY(-3px)'
        el.style.background = accent.bg.replace(/[\d.]+\)$/, (m) => String(parseFloat(m) * 2) + ')')
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.background = accent.bg
        el.style.borderColor = accent.border
        el.style.boxShadow = 'none'
        el.style.transform = 'none'
      }}
    >
      {Logo ? (
        <Logo large={large} />
      ) : (
        <span style={{
          fontFamily: 'var(--font-display), Manrope, sans-serif',
          fontWeight: 900,
          fontSize: large ? 22 : 17,
          color: accent.color,
          letterSpacing: '0.04em',
          lineHeight: 1,
        }}>{brand.name}</span>
      )}
      <span style={{
        fontSize: 9,
        color: 'rgba(148,163,184,0.6)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        lineHeight: 1,
      }}>
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
