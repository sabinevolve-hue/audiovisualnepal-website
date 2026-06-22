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
  { name: 'DSPPA',          tagline: 'Professional PA & IP Audio Systems',     country: 'China',   emoji: '🔊' },
  { name: 'Tenveo',         tagline: 'AI-Powered Video Conferencing',           country: 'China',   emoji: '📹' },
  { name: 'Shure',          tagline: 'Legendary Microphones & Audio',           country: 'USA',     emoji: '🎙️' },
  { name: 'Sennheiser',     tagline: 'Premium Audio Solutions',                 country: 'Germany', emoji: '🎧' },
  { name: 'Biamp',          tagline: 'Professional AV Signal Processing',       country: 'USA',     emoji: '🎚️' },
  { name: 'Extron',         tagline: 'AV Signal Distribution & Control',        country: 'USA',     emoji: '🖥️' },
  { name: 'Crestron',       tagline: 'Smart Room Automation',                   country: 'USA',     emoji: '🏠' },
  { name: 'Kramer',         tagline: 'AV Connectivity & Switching',             country: 'Israel',  emoji: '🔗' },
  { name: 'Yamaha Pro Audio',tagline: 'Mixing Consoles & Amplifiers',           country: 'Japan',   emoji: '🎛️' },
]

export default async function BrandsPage() {
  const brands = await getBrands()

  return (
    <main style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section
        className="section-padding-sm px-6 text-center"
        style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="container-site">
          <p className="eyebrow mb-4">Authorized Distributor</p>
          <h1 className="heading-section mb-4">World-Class Brands</h1>
          <p className="text-lg max-w-[560px] mx-auto" style={{ color: 'var(--text-secondary)' }}>
            We&apos;re the authorized distributor for Nepal&apos;s most trusted professional AV brands — genuine products, full warranties, factory support.
          </p>
        </div>
      </section>

      {/* Trust badges */}
      <section className="px-6 py-6 bg-white" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container-site flex flex-wrap gap-x-10 gap-y-3 justify-center">
          {['Genuine Products', 'Full Warranty', 'Factory Training', 'After-Sales Support', 'Certified Engineers'].map(b => (
            <span key={b} className="flex items-center gap-2 text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#0071E3" opacity="0.12"/><path d="M4 7l2 2 4-4" stroke="#0071E3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* Brands Grid */}
      <section className="section-padding bg-white px-6">
        <div className="container-site">
          {brands.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {brands.map(brand => {
                const name = stripHtml(brand.title.rendered)
                return (
                  <div
                    key={brand.id}
                    className="rounded-2xl p-7 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                    style={{ border: '1px solid var(--border-default)' }}
                  >
                    {brand.featured_image_url ? (
                      <div className="relative h-14 w-36 mb-5">
                        <Image src={brand.featured_image_url} alt={name} fill className="object-contain" />
                      </div>
                    ) : (
                      <div className="font-display font-extrabold text-2xl mb-5" style={{ color: 'var(--text-primary)' }}>
                        {name}
                      </div>
                    )}
                    {brand.meta?.tagline && (
                      <p className="text-[14px] leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                        {brand.meta.tagline}
                      </p>
                    )}
                    {brand.meta?.country && (
                      <span
                        className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                        style={{ background: 'var(--brand-dim)', color: 'var(--brand)' }}
                      >
                        {brand.meta.country}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {fallbackBrands.map(b => (
                <div
                  key={b.name}
                  className="rounded-2xl p-7 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                  style={{ border: '1px solid var(--border-default)' }}
                >
                  <div className="text-4xl mb-4">{b.emoji}</div>
                  <div className="font-display font-extrabold text-xl mb-2" style={{ color: 'var(--text-primary)' }}>
                    {b.name}
                  </div>
                  <p className="text-[14px] leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {b.tagline}
                  </p>
                  <span
                    className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                    style={{ background: 'var(--brand-dim)', color: 'var(--brand)' }}
                  >
                    {b.country}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm px-6 text-center" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container-site">
          <h2 className="font-display font-bold text-2xl mb-3">Interested in our brands?</h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Contact us for pricing, availability, and technical specifications.</p>
          <Link href="/contact" className="btn-primary">Get a Quote</Link>
        </div>
      </section>
    </main>
  )
}
