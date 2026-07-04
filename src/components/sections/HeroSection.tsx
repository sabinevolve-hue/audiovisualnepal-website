'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Typewriter } from '@/components/ui/AnimatedText'

const WORDS = ['Boardrooms', 'Classrooms', 'Hotel Ballrooms', 'Government Halls', 'Houses of Worship']

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh', background: '#F8FAFC' }}
    >
      {/* Subtle geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Light blue gradient from top-left */}
        <div style={{ position: 'absolute', top: -200, left: -200, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Light blue accent bottom-right */}
        <div style={{ position: 'absolute', bottom: -150, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Grid lines */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(11,30,61,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11,30,61,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)', WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)' }} />
      </div>

      {/* Background image — low opacity */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=60"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.06 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[960px] mx-auto text-center px-6 pt-32 pb-24">

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 999,
            background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.20)',
            color: '#2563EB', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB', display: 'inline-block' }} />
            Nepal&apos;s Leading AV Solutions Provider
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display), Manrope, sans-serif',
          fontSize: 'clamp(40px, 6.5vw, 80px)',
          fontWeight: 900,
          lineHeight: 1.07,
          letterSpacing: '-0.035em',
          color: '#0B1E3D',
          marginBottom: 28,
        }}>
          Professional AV for
          <br />
          <span style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #3B82F6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            <Typewriter words={WORDS} interval={2600} />
          </span>
        </h1>

        <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.75, color: '#475569', maxWidth: 580, margin: '0 auto 44px' }}>
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
              background: 'transparent', color: '#0B1E3D',
              fontSize: 15, fontWeight: 700, textDecoration: 'none',
              border: '2px solid #0B1E3D',
            }}
          >
            Request Quotation
          </Link>
        </div>
      </div>
    </section>
  )
}
