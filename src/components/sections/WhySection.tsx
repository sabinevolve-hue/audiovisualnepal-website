'use client'

import { RevealSection, StaggerReveal } from '@/components/ui/RevealSection'

const reasons = [
  { icon: '✓', title: '100% Genuine Products', desc: 'Every product sourced directly from authorised manufacturers. No grey-market items — full manufacturer warranty on all goods.' },
  { icon: '⚙', title: 'Expert Installation', desc: 'Certified engineers handle acoustic design, system integration, commissioning and post-installation support.' },
  { icon: '🗺', title: 'All 77 Districts', desc: 'Projects delivered nationwide — from Kathmandu to remote municipalities. No location is too far.' },
  { icon: '⚡', title: 'Fast Delivery', desc: 'Streamlined supply chain and experienced teams mean your project meets its deadline, every time.' },
  { icon: '🛠', title: 'After-Sales Support', desc: 'Dedicated service team for AMC, warranty claims, spare parts and ongoing technical assistance long after handover.' },
  { icon: '💰', title: 'Competitive Pricing', desc: 'Direct importer pricing — enterprise-grade AV at the right price for your budget, with no hidden costs.' },
]

export default function WhySection() {
  return (
    <section
      className="section-padding"
      style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-subtle)' }}
    >
      <div className="container-site">
        <RevealSection className="text-center mb-14">
          <div className="eyebrow mb-3">Why Choose Us</div>
          <h2 className="heading-section mb-4">The AudioVisual Nepal Difference</h2>
          <p className="text-[17px] max-w-[480px] mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            500+ completed projects and counting — here&apos;s why customers trust us.
          </p>
        </RevealSection>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.07}>
          {reasons.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-[var(--radius-xl)] p-7 border transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5"
              style={{ border: '1px solid var(--border-default)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-[var(--text-brand)] font-bold text-[18px]"
                style={{ background: 'var(--brand-dim)' }}
              >
                {r.icon}
              </div>
              <h3 className="font-display font-bold text-[16px] mb-2 text-[var(--text-primary)]">{r.title}</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{r.desc}</p>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
