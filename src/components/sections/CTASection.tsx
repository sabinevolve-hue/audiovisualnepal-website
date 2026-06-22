'use client'

import { ArrowRight, MessageCircle } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { SITE } from '@/lib/constants'

export default function CTASection() {
  return (
    <section
      className="py-28 px-6 text-center"
      style={{
        background: 'linear-gradient(135deg, #0058CC 0%, #0071E3 40%, #0093FF 100%)',
      }}
    >
      <div className="container-site max-w-[720px]">
        <div className="eyebrow mb-5" style={{ color: 'rgba(255,255,255,0.75)', borderColor: 'rgba(255,255,255,0.3)' }}>Get Started</div>
        <h2 className="heading-section mb-5" style={{ color: '#FFFFFF' }}>Ready to Transform Your Space?</h2>
        <p className="text-[18px] leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.80)' }}>
          Tell us about your project. Our engineers will design a custom AV solution that fits your space, timeline and budget.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <MagneticButton as="a" href="/contact"
            className="group inline-flex items-center gap-2 bg-white text-[#0071E3] px-8 py-3.5 rounded-full text-[15px] font-semibold transition-all duration-300 hover:bg-[#F0F7FF] hover:shadow-[0_4px_24px_rgba(0,0,0,0.20)] active:scale-[0.98]">
            Request Free Consultation
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </MagneticButton>
          <MagneticButton as="a" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-transparent text-white border-2 border-white/60 px-8 py-3.5 rounded-full text-[15px] font-semibold transition-all duration-300 hover:bg-white/10 active:scale-[0.98]">
            <MessageCircle size={15} /> WhatsApp Us
          </MagneticButton>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[13px]" style={{ color: 'rgba(255,255,255,0.70)' }}>
          {['500+ Projects Delivered', 'All 77 Districts', '100% Genuine Products', 'AMC & After-Sales'].map(b => (
            <span key={b} className="flex items-center gap-1.5">
              <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 flex-shrink-0">
                <circle cx="5" cy="5" r="4" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5"/>
                <path d="M3 5l1.5 1.5L7 3.5" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
