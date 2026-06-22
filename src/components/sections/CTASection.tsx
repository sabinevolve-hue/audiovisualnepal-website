'use client'

import { ArrowRight, MessageCircle } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { RevealSection } from '@/components/ui/RevealSection'
import { SITE } from '@/lib/constants'

export default function CTASection() {
  return (
    <section
      className="py-28 px-6 text-center"
      style={{
        background: 'linear-gradient(160deg, #F0F7FF 0%, #FFFFFF 50%, #F5F5F7 100%)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container-site max-w-[700px]">
        <RevealSection>
          <div className="eyebrow mb-5">Get Started</div>
          <h2 className="heading-section mb-5">Ready to Transform Your Space?</h2>
          <p className="text-[18px] leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
            Tell us about your project. Our engineers will design a custom AV solution that fits your space, timeline and budget.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <MagneticButton as="a" href="/contact" className="btn-primary group">
              Request Free Consultation
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
            <MagneticButton as="a" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <MessageCircle size={15} /> WhatsApp Us
            </MagneticButton>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
            {['500+ Projects Delivered', 'All 77 Districts', '100% Genuine Products', 'AMC & After-Sales'].map(b => (
              <span key={b} className="flex items-center gap-1.5">
                <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 flex-shrink-0">
                  <circle cx="5" cy="5" r="4" stroke="var(--brand)" strokeWidth="1.5"/>
                  <path d="M3 5l1.5 1.5L7 3.5" stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {b}
              </span>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
