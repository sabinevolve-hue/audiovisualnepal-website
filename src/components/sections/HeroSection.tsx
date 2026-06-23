'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Typewriter } from '@/components/ui/AnimatedText'

const WORDS = ['Boardrooms', 'Classrooms', 'Hotel Ballrooms', 'Government Halls', 'Houses of Worship']

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh', background: '#060D1A' }}
    >
      {/* Background photography */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.32 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(6,13,26,0.92) 0%, rgba(6,13,26,0.35) 45%, rgba(6,13,26,0.88) 100%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 110%, rgba(0,113,227,0.20) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 110% 100% at 50% 50%, transparent 55%, rgba(6,13,26,0.5) 100%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[960px] mx-auto text-center px-6 pt-28 pb-20">

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 999, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.28)', color: '#93C5FD', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3B82F6', display: 'inline-block', boxShadow: '0 0 8px #3B82F6' }} />
            Nepal&apos;s Leading AV Solutions Provider
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display), Manrope, sans-serif', fontSize: 'clamp(42px, 6.5vw, 84px)', fontWeight: 900, lineHeight: 1.06, letterSpacing: '-0.035em', color: '#FFFFFF', marginBottom: 28 }}>
          Professional AV for
          <br />
          <span style={{ background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 40%, #818CF8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            <Typewriter words={WORDS} interval={2600} />
          </span>
        </h1>

        <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.72, color: '#94A3B8', maxWidth: 600, margin: '0 auto 44px' }}>
          Complete audio visual design, supply and installation across Nepal —
          PA systems, conference rooms, IP network audio and voice evacuation.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/solutions"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 32px', borderRadius: 999, background: '#0071E3', color: '#FFFFFF', fontSize: 15, fontWeight: 700, textDecoration: 'none', letterSpacing: '-0.01em', boxShadow: '0 4px 24px rgba(0,113,227,0.4)', transition: 'all 0.2s' }}
          >
            Explore Solutions <ArrowRight size={15} />
          </Link>
          <Link
            href="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 32px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', transition: 'all 0.2s', letterSpacing: '-0.01em' }}
          >
            Request Quotation
          </Link>
        </div>

        <div style={{ marginTop: 56, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px 48px', paddingTop: 48, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {[
            { n: '500+', l: 'Projects Delivered' },
            { n: '77',   l: 'Districts Covered' },
            { n: '100%', l: 'Genuine Products' },
            { n: '15+',  l: 'Premium Brands' },
          ].map(({ n, l }) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 28, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 4, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, color: '#475569', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>Scroll</span>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)', animation: 'scrollAnim 2s ease infinite' }} />
      </div>
    </section>
  )
}
