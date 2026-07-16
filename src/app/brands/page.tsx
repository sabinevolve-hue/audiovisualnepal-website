import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const revalidate = 86400

const catSlug = (x: string) => x.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const metadata: Metadata = {
  title: 'Our Brands | Authorized AV Distributor Nepal',
  description: 'AudioVisual Nepal is the authorized distributor and partner for DSPPA, InfoBit, Tenveo, Evolve Podium and Lampro in Nepal. Genuine products, full manufacturer warranty.',
  openGraph: {
    title: 'Authorised AV Brands in Nepal — DSPPA, InfoBit, Tenveo, Evolve Podium',
    description: 'Official authorised distributor and partner for DSPPA, InfoBit, Tenveo, Evolve Podium and Lampro in Nepal. Genuine products, full manufacturer warranty.',
    url: 'https://www.audiovisualnepal.com/brands',
    siteName: 'AudioVisual Nepal',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'AudioVisual Nepal Brands' }],
    type: 'website',
  },
  alternates: { canonical: 'https://www.audiovisualnepal.com/brands' },
}

const brands = [
  {
    name: 'DSPPA',
    slug: 'dsppa',
    tagline: "Asia's Leading PA & Voice Evacuation Manufacturer",
    description: 'IP network audio, EN54 voice evacuation, mixer amplifiers, ceiling speakers and PA systems. 35+ years of manufacturing with deployments in 100+ countries.',
    categories: ['Voice Evacuation (PAVA)', 'IP Network Audio (MAG)', 'Mixer Amplifiers', 'Power Amplifiers', 'Ceiling Speakers', 'Column Speakers'],
    hasCatalog: true,
    country: 'China', founded: '1988',
    color: '#00AEAD', products: 14, range: '200+ models in full catalog',
  },
  {
    name: 'InfoBit',
    slug: 'infobit',
    tagline: 'Enterprise Conference AV & Collaboration',
    description: '4K video conference bars, AI PTZ cameras, wireless presentation systems, video wall controllers and HDMI matrix switchers. Zoom & Teams Rooms certified.',
    categories: ['Wireless Presentation', 'Video Walls', 'Cameras', 'Meeting Group', 'Matrix Switching', 'Digital Conference'],
    hasCatalog: true,
    country: 'China', founded: '2012',
    color: '#6366F1', products: 16, range: '550+ models in full catalog',
  },
  {
    name: 'Tenveo',
    slug: 'tenveo',
    tagline: 'AI-Tracking PTZ Cameras & Video Conferencing',
    description: 'AI auto-tracking PTZ cameras (4K@60fps, NDI|HX2), conference group kits, USB speakerphones and PTZ keyboard controllers. 3-year warranty on all products.',
    categories: ['PTZ Cameras', '360 Cameras & Group Kits', 'Speakerphones', 'Wireless Conference System', 'Controllers & Production'],
    hasCatalog: true,
    country: 'China', founded: '2010',
    color: '#0891B2', products: 12, range: '60+ models in full catalog',
  },
  {
    name: 'Evolve Podium',
    slug: 'focus',
    tagline: 'Premium Smart Podiums for Education & Government',
    description: 'Electric height-adjustable smart podiums with Sapele wood, built-in Intel OPS computers, 23.8" touch screens and dual gooseneck microphones. Made for parliament halls and university auditoriums.',
    categories: ['Smart Podiums', 'Digital Lecterns', 'Touch Screen Podiums'],
    hasCatalog: false,
    country: 'China', founded: '2008',
    color: '#1E40AF', products: 6, range: '',
  },
  {
    name: 'Lampro',
    slug: 'lampro',
    tagline: 'LED Screens & Displays — Display a Better World',
    description: 'Fine-pitch COB Mini LED, indoor creative splicing, rental and staging panels, and high-brightness outdoor DOOH displays. 21 years of LED manufacturing, 600,000+ sqm annual production, installed across six continents.',
    categories: ['Fine-Pitch Mini LED (COB)', 'Fine-Pitch HD Indoor', 'Indoor Commercial & Creative Splicing', 'Rental & Staging', 'Outdoor Advertising (DOOH)', 'Creative Displays', 'LED Modules & Distribution'],
    hasCatalog: true,
    country: 'China', founded: '2004',
    color: '#0F58FB', products: 6, range: '20 series in full catalog',
  },
]

export default function BrandsPage() {
  return (
    <main style={{ paddingTop: 64, background: '#FFFFFF', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ padding: '64px 24px 48px', background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)', borderBottom: '1px solid rgba(11,30,61,0.07)' }}>
        <div className="container-site text-center" style={{ maxWidth: 680 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563EB', marginBottom: 14 }}>Our Technology Partners</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0B1E3D', marginBottom: 16 }}>
            5 World-Class Brands
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#475569' }}>
            Authorised distributor and partner for five specialised AV manufacturers — every product is genuine with full manufacturer warranty and local after-sales support.
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section style={{ padding: '64px 24px' }}>
        <div className="container-site">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {brands.map((brand, i) => (
              <div
                key={brand.slug}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  gap: 40,
                  padding: '40px',
                  borderRadius: 24,
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(11,30,61,0.08)',
                  boxShadow: '0 2px 12px rgba(11,30,61,0.06)',
                }}
              >
                {/* Brand identity */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ width: 72, height: 72, borderRadius: 18, background: brand.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 28, color: '#FFFFFF', marginBottom: 20 }}>
                      {brand.name.charAt(0)}
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, color: '#0B1E3D', letterSpacing: '-0.03em', marginBottom: 6 }}>{brand.name}</h2>
                    <p style={{ fontSize: 14, color: brand.color, fontWeight: 600, marginBottom: 16 }}>{brand.tagline}</p>
                    <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#94A3B8' }}>
                      <span>{brand.country}</span>
                      <span>Est. {brand.founded}</span>
                      <span style={{ color: brand.color, fontWeight: 600 }}>{brand.products} featured products{brand.range ? ` · ${brand.range}` : ''}</span>
                    </div>
                  </div>
                  <Link
                    href={`/brands/${brand.slug}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 28, padding: '10px 22px', borderRadius: 999, background: brand.color, color: '#FFFFFF', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
                  >
                    View Catalog <ArrowRight size={13} />
                  </Link>
                </div>

                {/* Brand details */}
                <div>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: '#475569', marginBottom: 24 }}>{brand.description}</p>
                  <div style={{ marginBottom: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 12 }}>Product Categories</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {brand.categories.map(c => (
                        <Link
                          key={c}
                          href={brand.hasCatalog ? `/brands/${brand.slug}/catalog#${catSlug(c)}` : `/brands/${brand.slug}`}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, padding: '5px 12px', borderRadius: 999, background: `${brand.color}0D`, color: brand.color, border: `1px solid ${brand.color}25`, fontWeight: 600, textDecoration: 'none' }}
                        >
                          {c} <ArrowRight size={10} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section style={{ padding: '48px 24px 64px', background: '#F8FAFC', borderTop: '1px solid rgba(11,30,61,0.07)' }}>
        <div className="container-site text-center">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#0B1E3D', marginBottom: 32 }}>Our Brand Commitment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, maxWidth: 800, margin: '0 auto' }}>
            {[
              { title: 'Authorised Distributor', desc: 'Official distributor — not grey market' },
              { title: 'Full Warranty', desc: 'Manufacturer warranty on every product' },
              { title: 'Genuine Products', desc: '100% authentic, verified at import' },
              { title: 'After-Sales Support', desc: 'Local AMC, service and spare parts' },
            ].map(item => (
              <div key={item.title} style={{ padding: '24px', background: '#FFFFFF', borderRadius: 16, border: '1.5px solid rgba(11,30,61,0.08)', textAlign: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(37,99,235,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1E3D', marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
