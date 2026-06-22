'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedBorderProps {
  children: ReactNode
  className?: string
  borderColor?: string
  borderWidth?: number
  duration?: number
  radius?: string
}

export function AnimatedBorder({
  children,
  className = '',
  borderColor = 'conic-gradient(from var(--angle), transparent 20%, #0071E3 40%, #60A5FA 60%, transparent 80%)',
  borderWidth = 1,
  duration = 4,
  radius = '1rem',
}: AnimatedBorderProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ padding: borderWidth, borderRadius: radius }}
    >
      {/* Rotating gradient border */}
      <motion.div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: borderColor,
          borderRadius: radius,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      />

      {/* Inner content — masks the gradient to look like a border */}
      <div
        className="relative rounded-[inherit] bg-[var(--surface-1)]"
        style={{ borderRadius: `calc(${radius} - ${borderWidth}px)` }}
      >
        {children}
      </div>
    </div>
  )
}

// Simpler CSS-only variant using border-image
export function GlowBorder({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={`relative rounded-2xl p-px ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(0,113,227,0.5), rgba(96,165,250,0.2), rgba(0,113,227,0.05))',
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
    >
      <div className="relative rounded-[calc(1rem-1px)] bg-[var(--surface-1)]">
        {children}
      </div>
    </motion.div>
  )
}
