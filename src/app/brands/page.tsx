import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getBrands, stripHtml } from '@/lib/wordpress'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Brands — AudioVisual Nepal | Authorized Distributor',
  description: 'AudioVisual Nepal is the authorized distributor for DSPPA, Tenveo, Shure, Sennheiser, Biamp, Extron, Crestron, Kramer and more across Nepal.',
}

const fallbackBrands = [
  { name: 'DSPPA',           tagline: 'Professional PA & IP Audio Systems',   country: 'China',   emoji: '🔊' },
  { name: 'Tenveo',          tagline: 'AI-Powered Video Conferencing',         country: 'China',   emoji: '📹' },
  { name: 'Shure',           tagline: 'Legendary Microphones & Audio',         country: 'USA',     emoji: '🎙️' },
  { name: 'Sennheiser',      tagline: 'Premium Audio Solutions',               country: 'Germany', emoji: '🎧' },
  { name: 'Biamp',           tagline: 'Professional AV Signal Processing',     country: 'USA',     emoji: '🎚️' },
  { name: 'Extron',          tagline: 'AV Signal Distribution & Control',      country: 'USA',     emoji: '🖥️' },
  { name: 'Crestron',        tagline: 'Smart Room Automation',                 country: 'USA',     emoji: '🏠' },
  { name: 'Kramer',          tagline: 'AV Connectivity & Switching',           country: 'Israel',  emoji: '🔗' },
  { name: 'Yamaha Pro Audio', tagline: 'Mixing Consoles & Amplifiers',         country: 'Japan',   emoji: '🎛️' },
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
                <div key={b.name} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '32px' }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{b.emoji}</div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 800, color: '#FFFFFF', marginBottom: 10 }}>{b.name}</div>
                  <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.65, marginBottom: 16 }}>{b.tagline}</p>
                  <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 980, background: 'rgba(59,130,246,0.1)', color: '#60A5FA', border: '1px solid rgba(59,130,246,0.2)' }}>{b.country}</span>
                </div>
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
