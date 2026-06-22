'use client'

import Link from 'next/link'
import { BRANDS } from '@/lib/constants'
import { InfiniteMarquee } from '@/components/ui/InfiniteMarquee'

// Brand colors & styles that make each pill visually distinct
const BRAND_STYLES: Record<string, { color: string; bg: string; border: string; weight: string }> = {
  'DSPPA':      { color: '#0071E3', bg: '#EBF4FF', border: '#C0DCFF', weight: '900' },
  'ITC':        { color: '#CC2200', bg: '#FFF0EE', border: '#FFCCC4', weight: '900' },
  'Shure':      { color: '#B30000', bg: '#FFF0F0', border: '#FFC5C5', weight: '800' },
  'JBL':        { color: '#CC6600', bg: '#FFF8EC', border: '#FFD999', weight: '900' },
  'Bose':       { color: '#1D2D44', bg: '#F0F2F5', border: '#C5CDD8', weight: '800' },
  'Yamaha':     { color: '#1A7A3C', bg: '#EDFAF3', border: '#B3E8CA', weight: '800' },
  'TOA':        { color: '#6B1FA0', bg: '#F6EEFF', border: '#DDB8FF', weight: '800' },
  'Sennheiser': { color: '#0F5FA0', bg: '#EBF3FF', border: '#BEDAFF', weight: '700' },
}

function BrandPill({ brand, large = false }: { brand: typeof BRANDS[number]; large?: boolean }) {
  const style = BRAND_STYLES[brand.name] || { color: '#333', bg: '#F5F5F7', border: '#E0E0E5', weight: '700' }
  return (
    <Link
      href={brand.href}
      style={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: large ? '14px 32px' : '10px 24px',
        borderRadius: 16,
        background: style.bg,
        border: `1.5px solid ${style.border}`,
        minWidth: large ? 160 : 130,
        textDecoration: 'none',
        transition: 'all 0.2s',
        gap: 3,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.boxShadow = `0 4px 20px ${style.color}22`
        el.style.borderColor = style.color
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.boxShadow = 'none'
        el.style.borderColor = style.border
      }}
    >
      <span style={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: style.weight,
        fontSize: large ? 20 : 15,
        color: style.color,
        letterSpacing: brand.name === 'Sennheiser' ? '-0.01em' : '0.04em',
        lineHeight: 1,
      }}>
        {brand.name}
      </span>
      <span style={{ fontSize: 10, color: '#8E8E93', fontWeight: 500, marginTop: 2 }}>
        {brand.category}
      </span>
    </Link>
  )
}

export default function BrandsSection() {
  return (
    <section className="py-20 bg-white" style={{ borderTop: '1px solid #EBEBEB' }}>
      <div className="container-site mb-12 text-center">
        <div className="eyebrow mb-3">Trusted Partners</div>
        <h2 className="heading-section mb-4">World-Class Brands</h2>
        <p className="text-[17px] max-w-[480px] mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Authorised distributor for industry-leading manufacturers — every product is genuine with full warranty.
        </p>
      </div>

      <InfiniteMarquee speed={28} direction="left" className="mb-3">
        {BRANDS.map((brand) => (
          <BrandPill key={brand.name} brand={brand} large />
        ))}
      </InfiniteMarquee>

      <InfiniteMarquee speed={20} direction="right">
        {[...BRANDS].reverse().map((brand) => (
          <BrandPill key={brand.name} brand={brand} />
        ))}
      </InfiniteMarquee>
    </section>
  )
}
