'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Typewriter } from '@/components/ui/AnimatedText'

// Single fast fade — no staggered delays, content visible immediately
const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
}

const WORDS = ['Boardrooms', 'Classrooms', 'Hotel Ballrooms', 'Government Halls', 'Houses of Worship']

export default function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 overflow-hidden bg-white">

      {/* Soft radial tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,113,227,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Fine dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.10) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 0%, black 0%, transparent 75%)',
        }}
      />

      <div className="relative z-10 max-w-[900px] mx-auto">
        {/* Eyebrow */}
        <div className="flex justify-center mb-7">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-dim)] text-[var(--text-brand)] text-[11px] font-semibold tracking-[0.1em] uppercase border border-[var(--border-brand)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
            Nepal&apos;s Leading AV Solutions Provider
          </span>
        </div>

        {/* Headline — visible instantly, just a subtle fade */}
        <motion.h1
          className="heading-hero text-[var(--text-primary)] mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          Professional AV for{' '}
          <br className="hidden sm:block" />
          <span className="gradient-text">
            <Typewriter words={WORDS} interval={2600} />
          </span>
        </motion.h1>

        {/* Sub */}
        <p
          className="text-[clamp(16px,2vw,19px)] leading-relaxed max-w-[620px] mx-auto mb-10"
          style={{ color: '#4A4A4F' }}
        >
          Complete audio visual design, supply and installation across Nepal —
          PA systems, conference rooms, IP network audio and voice evacuation.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center">
          <MagneticButton as="a" href="/solutions" className="btn-primary group">
            Explore Solutions
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </MagneticButton>
          <MagneticButton as="a" href="/contact" className="btn-secondary">
            Request Quotation
          </MagneticButton>
        </div>

        {/* Stats */}
        <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-3">
          {[
            { n: '500+', l: 'Projects' },
            { n: '77',   l: 'Districts' },
            { n: '100%', l: 'Genuine' },
            { n: '15+',  l: 'Brands' },
          ].map(({ n, l }) => (
            <div key={l} className="flex items-center gap-2">
              <span className="font-display font-extrabold text-[22px] text-[var(--text-primary)] tracking-tight">
                {n}
              </span>
              <span className="text-[13px] text-[#8E8E93]">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div
          className="w-px h-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)',
            animation: 'scrollAnim 2s ease infinite',
          }}
        />
      </div>
    </section>
  )
}
