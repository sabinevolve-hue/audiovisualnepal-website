'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { RevealSection, StaggerReveal } from '@/components/ui/RevealSection'

const featured = [
  { name: 'Professional Speakers', desc: 'Ceiling, wall mount, column, horn & subwoofers for every space', href: '/products/speakers', icon: '🔊' },
  { name: 'Amplifiers', desc: '60W to 1000W — single and multi-zone with Bluetooth & FM', href: '/products/amplifiers', icon: '⚡' },
  { name: 'Conference Systems', desc: 'Wired & wireless, chairman/delegate units, voting & recording', href: '/products/conference-systems', icon: '🎙️' },
  { name: 'IP Network Audio', desc: 'PoE speakers, IP amplifiers, paging stations & management servers', href: '/products/ip-network-audio', icon: '🌐' },
  { name: 'Voice Evacuation', desc: 'EN 54-certified systems for life safety and emergency broadcast', href: '/products/voice-evacuation', icon: '🚨' },
  { name: 'Video Conferencing', desc: 'PTZ cameras, all-in-one bars, speakerphones & USB webcams', href: '/products/conference-systems', icon: '📹' },
]

export default function ProductEcosystem() {
  return (
    <section
      className="section-padding"
      id="products"
      style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-subtle)' }}
    >
      <div className="container-site">
        <RevealSection className="text-center mb-14">
          <div className="eyebrow mb-3">Product Ecosystem</div>
          <h2 className="heading-section mb-4">Every Component, One Source</h2>
          <p className="text-[17px] max-w-[500px] mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            From individual components to complete turnkey systems — sourced from world-class manufacturers.
          </p>
        </RevealSection>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.08}>
          {featured.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex gap-5 items-start p-6 rounded-[var(--radius-xl)] bg-white border transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5"
              style={{ border: '1px solid var(--border-default)' }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                style={{ background: 'var(--brand-dim)' }}
              >
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-[16px] text-[var(--text-primary)] mb-1 leading-snug">{item.name}</h3>
                <p className="text-[13px] leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--text-brand)] group-hover:gap-2 transition-all duration-200">
                  View Products <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </StaggerReveal>

        <RevealSection className="text-center mt-10" delay={0.2}>
          <Link href="/products" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--text-brand)] hover:gap-2.5 transition-all duration-200 group">
            Browse all product categories <ArrowRight size={14} />
          </Link>
        </RevealSection>
      </div>
    </section>
  )
}
