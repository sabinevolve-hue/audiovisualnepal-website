'use client'

import { ReactNode } from 'react'

// Animations replaced with instant-visible — scroll-triggered opacity:0 caused content
// to appear grey/broken to customers on first scroll. Content is now always visible.

interface RevealSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
  once?: boolean
}

export function RevealSection({ children, className = '' }: RevealSectionProps) {
  return <div className={className}>{children}</div>
}

interface StaggerRevealProps {
  children: ReactNode[]
  className?: string
  stagger?: number
  delay?: number
  once?: boolean
}

export function StaggerReveal({ children, className = '' }: StaggerRevealProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <div key={i}>{child}</div>
      ))}
    </div>
  )
}
