'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Typewriter } from '@/components/ui/AnimatedText'

const WORDS = ['Boardrooms', 'Classrooms', 'Hotel Ballrooms', 'Government Halls', 'Houses of Worship']

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh', background: '#080C16' }}
    >
      {/* Subtle geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Light blue gradient from top-left */}
        <div style={{ position: 'absolute', top: -200, left: -200, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(59,130,246,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Light blue accent bottom-right */}
        <div style={{ position: 'absolute', bottom: -150, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Grid lines */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)', WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)' }} />
      </div>

      {/* Ambient background video — low opacity, poster fallback */}
      <div className="absolute inset-0" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/heroes/hero-poster.webp"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
          <source src="/videos/hero-loop.webm" type="video/webm" />
        </video>
        {/* Targeted scrim — dark where the type sits, near-clear elsewhere so the film reads */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 50% 52%, rgba(6,10,20,0.78) 0%, rgba(6,10,20,0.5) 45%, rgba(6,10,20,0.12) 75%, rgba(6,10,20,0.05) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,10,20,0.55) 0%, rgba(6,10,20,0.06) 30%, rgba(6,10,20,0.06) 70%, rgba(6,10,20,0.6) 100%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[960px] mx-auto text-center px-6 pt-32 pb-24">

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 999,
            background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(147,197,253,0.35)',
            color: '#BFDBFE', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#60A5FA', display: 'inline-block' }} />
            Nepal&apos;s Leading AV Solutions Provider
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display), Manrope, sans-serif',
          fontSize: 'clamp(40px, 6.5vw, 80px)',
          fontWeight: 900,
          lineHeight: 1.07,
          letterSpacing: '-0.035em',
          color: '#FFFFFF',
          textShadow: '0 2px 24px rgba(0,0,0,0.45)',
          marginBottom: 28,
        }}>
          Professional AV for{' '}
          <br />
          <span style={{ background: 'linear-gradient(135deg, #93C5FD 0%, #BFDBFE 45%, #5EEAD4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            <Typewriter words={WORDS} interval={2600} />
          </span>
        </h1>

        <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.75, color: '#E2E8F0', textShadow: '0 1px 12px rgba(0,0,0,0.4)', maxWidth: 580, margin: '0 auto 44px' }}>
          Complete audio visual design, supply and installation across Nepal —
          PA systems, conference rooms, IP network audio and voice evacuation.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/solutions"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 30px', borderRadius: 999,
              background: '#2563EB', color: '#FFFFFF',
              fontSize: 15, fontWeight: 700, textDecoration: 'none', letterSpacing: '-0.01em',
              boxShadow: '0 4px 20px rgba(37,99,235,0.35)',
            }}
          >
            Explore Solutions <ArrowRight size={15} />
          </Link>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 30px', borderRadius: 999,
              background: 'rgba(255,255,255,0.10)', color: '#FFFFFF',
              fontSize: 15, fontWeight: 700, textDecoration: 'none',
              border: '2px solid rgba(255,255,255,0.45)',
            }}
          >
            Request Quotation
          </Link>
        </div>
      </div>
    </section>
  )
}
