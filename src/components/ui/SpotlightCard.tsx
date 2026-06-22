'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, MouseEvent, ReactNode } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
  hoverBorderColor?: string
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 113, 227, 0.12)',
  hoverBorderColor = 'rgba(0, 113, 227, 0.35)',
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-999)
  const mouseY = useMotionValue(-999)

  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    mouseX.set(-999)
    mouseY.set(-999)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-colors duration-300 hover:border-[${hoverBorderColor}] ${className}`}
      style={{
        '--hover-border': hoverBorderColor,
      } as React.CSSProperties}
    >
      {/* Spotlight glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at ${springX}px ${springY}px, ${spotlightColor}, transparent 70%)`,
          opacity: 1,
        }}
      />

      {/* Inner border glow on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0"
        style={{ boxShadow: `inset 0 0 0 1px ${hoverBorderColor}` }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// ── GlowCard ─────────────────────────────────────────────────────────────────
interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  glowSize?: number
}

export function GlowCard({
  children,
  className = '',
  glowColor = 'rgba(0,113,227,0.2)',
  glowSize = 250,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        whileHover={{ opacity: 1 }}
        style={{
          background: `radial-gradient(${glowSize}px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
