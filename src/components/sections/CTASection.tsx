'use client'

import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { SITE } from '@/lib/constants'

export default function CTASection() {
  return (
    <section
      className="py-28 px-6 text-center relative overflow-hidden"
      style={{ background: '#060D1A' }}
    >
      {/* Background photo */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1511578194003-00c80e42dc9b?auto=format&fit=crop&w=1920&q=80"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,113,227,0.25) 0%, rgba(6,13,26,0.95) 70%)' }} />
      </div>

      {/* Glow ring */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,113,227,0.12) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="container-site relative" style={{ zIndex: 1, maxWidth: 720 }}>
        <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#60A5FA', marginBottom: 20 }}>Get Started</div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, letterSpacing: '-0.035em', color: '#FFFFFF', marginBottom: 20, lineHeight: 1.08 }}>
          Ready to Transform<br />Your Space?
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: '#94A3B8', marginBottom: 44, maxWidth: 560, margin: '0 auto 44px' }}>
          Tell us about your project. Our engineers will design a custom AV solution that fits your space, timeline and budget.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          <Link
            href="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 32px', borderRadius: 999, background: '#0071E3', color: '#FFFFFF', fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 28px rgba(0,113,227,0.45)', transition: 'all 0.2s', letterSpacing: '-0.01em' }}
          >
            Request Free Consultation <ArrowRight size={15} />
          </Link>
          <Link
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 32px', borderRadius: 999, background: 'rgba(255,255,255,0.07)', color: '#FFFFFF', fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', transition: 'all 0.2s', letterSpacing: '-0.01em' }}
          >
            <MessageCircle size={15} /> WhatsApp Us
          </Link>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 32px', fontSize: 13, color: '#475569' }}>
          {['500+ Projects Delivered', 'All 77 Districts', '100% Genuine Products', 'AMC & After-Sales'].map(b => (
            <span key={b} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg viewBox="0 0 12 12" style={{ width: 12, height: 12, flexShrink: 0 }}>
                <circle cx="6" cy="6" r="5" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>
                <path d="M3.5 6l1.8 1.8L8.5 4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
