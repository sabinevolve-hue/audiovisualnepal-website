import Link from 'next/link'
import { SITE } from '@/lib/constants'
import { MessageCircle, Phone, ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section
      id="cta"
      className="section-padding text-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(170deg, #0a0a1a 0%, #000520 50%, #000 100%)',
      }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,113,227,0.2) 0%, transparent 70%)',
        }}
      />

      <div className="container-site relative z-10">
        <h2 className="heading-section text-white mb-6 reveal">
          Ready to Transform<br />Your Audio Experience?
        </h2>
        <p className="text-xl text-white/50 mb-12 reveal">
          Tell us your project. We&apos;ll design the perfect system.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-10 reveal">
          <Link href="/contact" className="btn-primary">
            Request Consultation <ArrowRight size={16} />
          </Link>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2"
          >
            <MessageCircle size={16} /> WhatsApp Us
          </a>
        </div>

        <p className="text-[18px] text-white/50 reveal">
          Or call directly:{' '}
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="text-white font-semibold hover:text-[#60a5fa] transition-colors"
          >
            {SITE.phone}
          </a>
        </p>
      </div>
    </section>
  )
}
