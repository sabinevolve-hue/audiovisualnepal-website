'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef, ReactNode } from 'react'

interface DockItem {
  label: string
  icon: ReactNode
  href: string
}

interface FloatingDockProps {
  items: DockItem[]
  className?: string
}

function DockIcon({ item }: { item: DockItem }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(Infinity)

  // Magnify when mouse is within 100px
  const distance = useTransform(mouseX, (val) => {
    if (!ref.current) return 999
    const rect = ref.current.getBoundingClientRect()
    return Math.abs(val - (rect.left + rect.width / 2))
  })

  const size = useTransform(distance, [0, 100, 150], [64, 48, 40])
  const springSize = useSpring(size, { stiffness: 300, damping: 25 })

  return (
    <Link href={item.href}>
      <motion.div
        ref={ref}
        style={{ width: springSize, height: springSize }}
        className="relative flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 hover:border-brand/50 transition-colors cursor-pointer group"
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-white/70 group-hover:text-white transition-colors">
          {item.icon}
        </span>

        {/* Tooltip */}
        <motion.div
          className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--surface-2)] border border-white/10 text-white text-xs px-2.5 py-1 rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.15 }}
        >
          {item.label}
        </motion.div>
      </motion.div>
    </Link>
  )
}

export function FloatingDock({ items, className = '' }: FloatingDockProps) {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.nav
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-2 px-4 py-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl z-50 ${className}`}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {items.map((item) => (
        <DockIcon key={item.href} item={item} />
      ))}
    </motion.nav>
  )
}
