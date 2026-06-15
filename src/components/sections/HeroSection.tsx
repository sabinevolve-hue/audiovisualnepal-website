'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6 pt-20 pb-20 overflow-hidden bg-[#000]">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 30%, rgba(0,113,227,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 20% 70%, rgba(0,80,200,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 70%, rgba(0,150,255,0.08) 0%, transparent 60%),
            linear-gradient(180deg, #000 0%, #0a0a1a 60%, #111827 100%)
          `,
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[900px]">
        <motion.div {...fadeUp(0.15)} className="eyebrow mb-6">
          Nepal&apos;s Leading AV Solutions Provider
        </motion.div>

        <motion.h1 {...fadeUp(0.3)} className="heading-hero text-white mb-7">
          Experience Sound<br />
          <span className="gradient-text">Beyond Expectations.</span>
        </motion.h1>

        <motion.p {...fadeUp(0.45)} className="text-[clamp(16px,2.2vw,21px)] text-white/60 leading-relaxed max-w-[680px] mx-auto mb-12">
          Professional Audio Visual Solutions for Government, Education,<br className="hidden sm:block" />
          Hospitality and Enterprise Projects Across Nepal.
        </motion.p>

        <motion.div {...fadeUp(0.6)} className="flex flex-wrap gap-4 justify-center">
          <Link href="/solutions" className="btn-primary">
            Explore Solutions <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="btn-ghost">
            Request Quotation
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="text-[11px] text-white/35 uppercase tracking-[0.12em]">Scroll</span>
        <div
          className="w-px h-12"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
            animation: 'scrollAnim 2s ease infinite',
          }}
        />
      </motion.div>
    </section>
  )
}
