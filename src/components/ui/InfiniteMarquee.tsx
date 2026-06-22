'use client'

import { motion } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface InfiniteMarqueeProps {
  children: ReactNode
  speed?: number          // pixels per second
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
  gap?: number
}

export function InfiniteMarquee({
  children,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  className = '',
  gap = 32,
}: InfiniteMarqueeProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  // We duplicate content 4x to ensure seamless loop
  const duplicates = [0, 1, 2, 3]

  const duration = 100 / (speed / 50) // approx duration

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <motion.div
        className="flex"
        style={{ gap }}
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : undefined}
      >
        {/* Original + duplicate for seamless loop */}
        {duplicates.map((i) => (
          <div key={i} className="flex flex-shrink-0 items-center" style={{ gap }}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
