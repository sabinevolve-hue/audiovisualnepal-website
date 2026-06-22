import type { Metadata } from 'next'
import Link from 'next/link'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Products — AudioVisual Nepal | Professional AV Systems',
  description: 'Browse professional audio visual systems — PA systems, conference equipment, video walls, digital signage, and more. Authorized distributor in Nepal.',
}

export const revalidate = 3600

export default function ProductsPage() {
  return (
    <main style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section className="section-padding-sm bg-[var(--bg-subtle)] px-6" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container-site text-center">
          <p className="eyebrow mb-4">Product Catalog</p>
          <h1 className="heading-section mb-4">Professional AV Systems</h1>
          <p className="text-lg max-w-[560px] mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Browse our complete range of audio visual systems — sourced from the world&apos;s leading brands, delivered and installed across Nepal.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-padding bg-white px-6">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group block rounded-2xl p-7 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                style={{ border: '1px solid var(--border-default)' }}
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="text-3xl">{cat.icon}</span>
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
                    style={{ background: 'var(--brand-dim)', color: 'var(--brand)' }}
                  >
                    <ArrowRight size={14} />
                  </span>
                </div>
                <h2 className="font-display font-bold text-[18px] mb-2" style={{ color: 'var(--text-primary)' }}>
                  {cat.label}
                </h2>
                {cat.description && (
                  <p className="text-[14px] leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    {cat.description}
                  </p>
                )}
                <div className="mt-4 text-[13px] font-semibold" style={{ color: 'var(--brand)' }}>
                  Browse products →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding-sm px-6" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container-site text-center">
          <h2 className="font-display font-bold text-2xl mb-3">Can&apos;t find what you need?</h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            Our team can source any professional AV product. Contact us with your requirements.
          </p>
          <Link href="/contact" className="btn-primary">Request Custom Quote</Link>
        </div>
      </section>
    </main>
  )
}
