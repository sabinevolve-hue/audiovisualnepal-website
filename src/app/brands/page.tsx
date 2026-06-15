import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getBrands, stripHtml } from '@/lib/wordpress'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Brands — AudioVisual Nepal | Authorized Distributor',
  description: 'AudioVisual Nepal is the authorized distributor for DSPPA, Tenveo, Shure, Sennheiser, Biamp, Extron, Crestron, Kramer and more across Nepal.',
}

export default async function BrandsPage() {
  const brands = await getBrands()

  // Static fallback brand data if WordPress has no brands yet
  const fallbackBrands = [
    { name: 'DSPPA', tagline: 'Professional PA & IP Audio Systems', country: 'China', emoji: '🔊' },
    { name: 'Tenveo', tagline: 'AI-Powered Video Conferencing', country: 'China', emoji: '📹' },
    { name: 'Shure', tagline: 'Legendary Microphones & Audio', country: 'USA', emoji: '🎙️' },
    { name: 'Sennheiser', tagline: 'Premium Audio Solutions', country: 'Germany', emoji: '🎧' },
    { name: 'Biamp', tagline: 'Professional AV Signal Processing', country: 'USA', emoji: '🎚️' },
    { name: 'Extron', tagline: 'AV Signal Distribution & Control', country: 'USA', emoji: '🖥️' },
    { name: 'Crestron', tagline: 'Smart Room Automation', country: 'USA', emoji: '🏠' },
    { name: 'Kramer', tagline: 'AV Connectivity & Switching', country: 'Israel', emoji: '🔗' },
    { name: 'Yamaha Pro Audio', tagline: 'Mixing Consoles & Amplifiers', country: 'Japan', emoji: '🎛️' },
  ]

  return (
    <main style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ background: '#1D1D1F', padding: '80px 24px 64px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#0071E3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Authorized Distributor</p>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: 20 }}>
          World-Class Brands
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', maxWidth: 560, margin: '0 auto' }}>
          We're the authorized distributor for Nepal's most trusted professional AV brands — with genuine products, full warranties, and factory support.
        </p>
      </section>

      {/* Brands Grid */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {brands.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {brands.map(brand => {
                const name = stripHtml(brand.title.rendered)
                return (
                  <div key={brand.id}
                    style={{ background: '#F5F5F7', borderRadius: 20, padding: 32, display: 'flex', flexDirection: 'column', gap: 16, border: '1px solid #E8E8ED' }}>
                    {brand.featured_image_url ? (
                      <div style={{ position: 'relative', height: 64, width: 160 }}>
                        <Image src={brand.featured_image_url} alt={name} fill style={{ objectFit: 'contain' }} />
                      </div>
                    ) : (
                      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 24, fontWeight: 800, color: '#1D1D1F' }}>{name}</div>
                    )}
                    {brand.meta.tagline && (
                      <p style={{ fontSize: 15, color: '#6E6E73', lineHeight: 1.5 }}>{brand.meta.tagline}</p>
                    )}
                    {brand.meta.country && (
                      <div style={{ fontSize: 12, color: '#0071E3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {brand.meta.country}
                      </div>
                    )}
                    {brand.meta.website_url && (
                      <a href={brand.meta.website_url} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 13, color: '#0071E3', textDecoration: 'none', fontWeight: 500 }}>
                        Visit Website →
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            /* Fallback static brands */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {fallbackBrands.map(brand => (
                <div key={brand.name}
                  style={{ background: '#F5F5F7', borderRadius: 20, padding: 32, border: '1px solid #E8E8ED' }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{brand.emoji}</div>
                  <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 800, color: '#1D1D1F', marginBottom: 8 }}>{brand.name}</h2>
                  <p style={{ fontSize: 15, color: '#6E6E73', lineHeight: 1.5, marginBottom: 12 }}>{brand.tagline}</p>
                  <div style={{ fontSize: 12, color: '#0071E3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{brand.country}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Genuine */}
      <section style={{ padding: '80px 24px', background: '#F5F5F7' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: 16 }}>
            Why Buy Genuine?
          </h2>
          <p style={{ fontSize: 18, color: '#6E6E73', marginBottom: 48, maxWidth: 540, margin: '0 auto 48px' }}>
            As authorized distributors, every product we sell is 100% genuine with full manufacturer support.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { icon: '✅', title: 'Genuine Products', desc: 'Direct from manufacturer. No grey market, no counterfeits.' },
              { icon: '🛡️', title: 'Full Warranty', desc: 'Manufacturer warranty honored in Nepal. We handle all claims.' },
              { icon: '📞', title: 'Factory Support', desc: 'Access to official tech support and firmware updates.' },
              { icon: '🔧', title: 'Spare Parts', desc: 'Genuine replacement parts available from our local stock.' },
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

      {/* Become Partner CTA */}
      <section style={{ padding: '80px 24px', background: '#1D1D1F', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, color: '#FFFFFF', marginBottom: 16, letterSpacing: '-0.03em' }}>
          Looking for a Specific Brand?
        </h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>
          Contact us — we can source any professional AV brand for your project.
        </p>
        <Link href="/contact"
          style={{ display: 'inline-block', background: '#0071E3', color: '#FFFFFF', padding: '16px 40px', borderRadius: 980, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
          Contact Us
        </Link>
      </section>
    </main>
  )
}
