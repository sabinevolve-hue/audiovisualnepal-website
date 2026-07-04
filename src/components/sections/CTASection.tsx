'use client'

import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { SITE } from '@/lib/constants'

export default function CTASection() {
  return (
    <section
      className="py-24 px-6 text-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0B1E3D 0%, #1E3A6E 50%, #0B1E3D 100%)' }}
    >
      {/* Subtle grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)' }} />
      {/* Blue glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container-site relative" style={{ maxWidth: 680 }}>
        <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(147,197,253,0.9)', marginBottom: 20 }}>Get Started</div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,5vw,60px)', fontWeight: 900, letterSpacing: '-0.035em', color: '#FFFFFF', marginBottom: 20, lineHeight: 1.1 }}>
          Ready to Transform<br />Your Space?
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', marginBottom: 44, maxWidth: 520, margin: '0 auto 44px' }}>
          Tell us about your project. Our engineers will design a custom AV solution that fits your space, timeline and budget.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          <Link
            href="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 30px', borderRadius: 999, background: '#2563EB', color: '#FFFFFF', fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 24px rgba(37,99,235,0.4)', letterSpacing: '-0.01em' }}
          >
            Request Free Consultation <ArrowRight size={14} />
          </Link>
          <Link
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 30px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.18)', letterSpacing: '-0.01em' }}
          >
            <MessageCircle size={14} /> WhatsApp Us
          </Link>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 28px', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
          {['500+ Projects Delivered', 'All 77 Districts', '100% Genuine Products', 'AMC & After-Sales'].map(b => (
            <span key={b} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg viewBox="0 0 12 12" style={{ width: 12, height: 12, flexShrink: 0 }}>
                <circle cx="6" cy="6" r="5" stroke="rgba(147,197,253,0.6)" strokeWidth="1.5" fill="none"/>
                <path d="M3.5 6l1.8 1.8L8.5 4" stroke="rgba(147,197,253,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
