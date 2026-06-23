import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getBrands, stripHtml } from '@/lib/wordpress'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Brands — AudioVisual Nepal | Authorized Distributor',
  description: 'AudioVisual Nepal is the authorized distributor for DSPPA, Tenveo, Shure, Sennheiser, Biamp, Extron, Crestron, Kramer and more across Nepal.',
}

// Brand accent colours for card styling
const BRAND_ACCENTS: Record<string, { color: string; bg: string; border: string }> = {
  'DSPPA':           { color: '#3B82F6', bg: 'rgba(59,130,246,0.07)',   border: 'rgba(59,130,246,0.18)' },
  'Tenveo':          { color: '#8B5CF6', bg: 'rgba(139,92,246,0.07)',   border: 'rgba(139,92,246,0.18)' },
  'Shure':           { color: '#EF4444', bg: 'rgba(204,0,0,0.07)',      border: 'rgba(204,0,0,0.18)' },
  'Sennheiser':      { color: '#94A3B8', bg: 'rgba(148,163,184,0.05)', border: 'rgba(148,163,184,0.15)' },
  'Biamp':           { color: '#F59E0B', bg: 'rgba(245,158,11,0.07)',   border: 'rgba(245,158,11,0.18)' },
  'Extron':          { color: '#10B981', bg: 'rgba(16,185,129,0.07)',   border: 'rgba(16,185,129,0.18)' },
  'Crestron':        { color: '#60A5FA', bg: 'rgba(96,165,250,0.07)',   border: 'rgba(96,165,250,0.18)' },
  'Kramer':          { color: '#F97316', bg: 'rgba(249,115,22,0.07)',   border: 'rgba(249,115,22,0.18)' },
  'Yamaha Pro Audio':{ color: '#22C55E', bg: 'rgba(34,197,94,0.07)',    border: 'rgba(34,197,94,0.18)' },
  'ITC':             { color: '#EF4444', bg: 'rgba(239,68,68,0.07)',    border: 'rgba(239,68,68,0.18)' },
  'JBL':             { color: '#FF6600', bg: 'rgba(255,102,0,0.07)',    border: 'rgba(255,102,0,0.18)' },
  'Bose':            { color: '#CBD5E1', bg: 'rgba(203,213,225,0.05)', border: 'rgba(203,213,225,0.12)' },
  'TOA':             { color: '#60A5FA', bg: 'rgba(96,165,250,0.07)',   border: 'rgba(96,165,250,0.18)' },
  'Yamaha':          { color: '#22C55E', bg: 'rgba(34,197,94,0.07)',    border: 'rgba(34,197,94,0.18)' },
}

const fallbackBrands = [
  { name: 'DSPPA',           tagline: 'Professional PA & IP Audio Systems',   country: 'China',   slug: 'dsppa' },
  { name: 'Tenveo',          tagline: 'AI-Powered Video Conferencing',         country: 'China',   slug: 'tenveo' },
  { name: 'Shure',           tagline: 'Legendary Microphones & Audio',         country: 'USA',     slug: 'shure' },
  { name: 'Sennheiser',      tagline: 'Premium Audio Solutions',               country: 'Germany', slug: 'sennheiser' },
  { name: 'Biamp',           tagline: 'Professional AV Signal Processing',     country: 'USA',     slug: 'biamp' },
  { name: 'Extron',          tagline: 'AV Signal Distribution & Control',      country: 'USA',     slug: 'extron' },
  { name: 'Crestron',        tagline: 'Smart Room Automation',                 country: 'USA',     slug: 'crestron' },
  { name: 'Kramer',          tagline: 'AV Connectivity & Switching',           country: 'Israel',  slug: 'kramer' },
  { name: 'Yamaha Pro Audio', tagline: 'Mixing Consoles & Amplifiers',         country: 'Japan',   slug: 'yamaha' },
]

export default async function BrandsPage() {
  const brands = await getBrands()

  return (
    <main style={{ paddingTop: 80, background: '#060D1A' }}>
      {/* Hero */}
      <section style={{ padding: '100px 24px 80px', background: 'linear-gradient(180deg, #0A1628 0%, #060D1A 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Authorized Distributor</p>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>
            World-Class Brands
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
            We&apos;re the authorized distributor for Nepal&apos;s most trusted professional AV brands — genuine products, full warranties, factory support.
          </p>
        </div>
      </section>

      {/* Trust badges */}
      <section style={{ padding: '24px', background: '#0A0F1E', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
          {['Genuine Products', 'Full Warranty', 'Factory Training', 'After-Sales Support', 'Certified Engineers'].map(b => (
            <span key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, color: '#94A3B8' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#3B82F6" fillOpacity="0.15"/><path d="M4 7l2 2 4-4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* Brands Grid */}
      <section style={{ padding: '80px 24px', background: '#060D1A' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {brands.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {brands.map(brand => {
                const name = stripHtml(brand.title.rendered)
                return (
                  <div key={brand.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '32px' }}>
                    {brand.featured_image_url ? (
                      <div style={{ position: 'relative', height: 56, width: 144, marginBottom: 20 }}>
                        <Image src={brand.featured_image_url} alt={name} fill style={{ objectFit: 'contain' }} />
                      </div>
                    ) : (
                      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 24, fontWeight: 800, color: '#FFFFFF', marginBottom: 20 }}>{name}</div>
                    )}
                    {brand.meta?.tagline && <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.65, marginBottom: 16 }}>{brand.meta.tagline}</p>}
                    {brand.meta?.country && (
                      <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 980, background: 'rgba(59,130,246,0.1)', color: '#60A5FA', border: '1px solid rgba(59,130,246,0.2)' }}>{brand.meta.country}</span>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {fallbackBrands.map(b => (
                <Link key={b.name} href={`/brands/${b.slug}`} style={{ background: BRAND_ACCENTS[b.name]?.bg || 'rgba(255,255,255,0.03)', border: `1px solid ${BRAND_ACCENTS[b.name]?.border || 'rgba(255,255,255,0.07)'}`, borderRadius: 20, padding: '32px', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}>
                  {/* SVG wordmark */}
                  <div style={{ marginBottom: 20 }}>
                    <svg width="auto" height="38" viewBox="0 0 220 38" style={{ overflow: 'visible' }}>
                      <text x="0" y="30" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900"
                        fontSize="28" fill={BRAND_ACCENTS[b.name]?.color || '#94A3B8'} letterSpacing="-0.5">{b.name}</text>
                    </svg>
                  </div>
                  <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.65, marginBottom: 16 }}>{b.tagline}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, padding: '5px 14px', borderRadius: 980, background: 'rgba(59,130,246,0.1)', color: '#60A5FA', border: '1px solid rgba(59,130,246,0.2)' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4.5" stroke="#3B82F6" strokeWidth="1"/><circle cx="5" cy="5" r="2" fill="#3B82F6" opacity="0.4"/></svg>
                    {b.country}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: '#0A0F1E', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>Interested in our brands?</h2>
          <p style={{ fontSize: 16, color: '#94A3B8', marginBottom: 32 }}>Contact us for pricing, availability, and technical specifications.</p>
          <Link href="/contact" style={{ display: 'inline-block', background: '#3B82F6', color: '#FFFFFF', padding: '16px 40px', borderRadius: 980, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>Get a Quote</Link>
        </div>
      </section>
    </main>
  )
}
