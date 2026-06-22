'use client'

import Link from 'next/link'
import { BRANDS } from '@/lib/constants'
import { InfiniteMarquee } from '@/components/ui/InfiniteMarquee'
import { RevealSection } from '@/components/ui/RevealSection'

export default function BrandsSection() {
  return (
    <section className="py-20 bg-white" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container-site mb-10">
        <RevealSection className="text-center">
          <div className="eyebrow mb-3">Trusted Partners</div>
          <h2 className="heading-section mb-3">World-Class Brands</h2>
          <p className="text-[17px] max-w-[440px] mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Authorised distributor for industry-leading manufacturers — every product is genuine.
          </p>
        </RevealSection>
      </div>

      <InfiniteMarquee speed={28} direction="left" className="mb-3">
        {BRANDS.map((brand) => (
          <Link
            key={brand.name}
            href={brand.href}
            className="flex-shrink-0 flex flex-col items-center justify-center px-8 py-4 rounded-xl bg-white border transition-all duration-200 hover:border-[var(--border-brand)] hover:shadow-[var(--shadow-sm)] group"
            style={{ minWidth: 140, border: '1px solid var(--border-default)' }}
          >
            <span className="font-display font-extrabold text-[18px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors tracking-tight">
              {brand.name}
            </span>
            <span className="text-[10px] mt-1" style={{ color: 'var(--text-tertiary)' }}>{brand.category}</span>
          </Link>
        ))}
      </InfiniteMarquee>

      <InfiniteMarquee speed={20} direction="right">
        {[...BRANDS].reverse().map((brand) => (
          <Link
            key={brand.name}
            href={brand.href}
            className="flex-shrink-0 flex items-center justify-center px-8 py-3.5 rounded-xl bg-[var(--bg-subtle)] border transition-all duration-200 hover:bg-white"
            style={{ minWidth: 130, border: '1px solid var(--border-subtle)' }}
          >
            <span className="font-display font-bold text-[15px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] tracking-tight transition-colors">
              {brand.name}
            </span>
          </Link>
        ))}
      </InfiniteMarquee>
    </section>
  )
}
