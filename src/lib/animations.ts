// ─── AVN Animation Library ───────────────────────────────────────────────────
// Framer Motion primitives for audiovisualnepal.com
// All animations respect prefers-reduced-motion via framer-motion's built-in
// system when used with <MotionConfig reducedMotion="user" />

import type { Variants, Transition } from 'framer-motion'

// ── Easing ──────────────────────────────────────────────────────────────────
export const ease = {
  apple:   [0.25, 0.46, 0.45, 0.94] as const,
  spring:  { type: 'spring', stiffness: 300, damping: 30 },
  bounce:  { type: 'spring', stiffness: 400, damping: 25 },
  smooth:  [0.43, 0.13, 0.23, 0.96] as const,
  snappy:  [0.68, -0.55, 0.27, 1.55] as const,
}

// ── Fade + Slide ─────────────────────────────────────────────────────────────
export const fadeUp = (delay = 0, distance = 28): Variants => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0, transition: { duration: 0.72, delay, ease: ease.apple } },
  exit:    { opacity: 0, y: -(distance / 2), transition: { duration: 0.3 } },
})

export const fadeDown = (delay = 0): Variants => ({
  initial: { opacity: 0, y: -24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.72, delay, ease: ease.apple } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.3 } },
})

export const fadeLeft = (delay = 0): Variants => ({
  initial: { opacity: 0, x: -36 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.72, delay, ease: ease.apple } },
  exit:    { opacity: 0, x: -18, transition: { duration: 0.3 } },
})

export const fadeRight = (delay = 0): Variants => ({
  initial: { opacity: 0, x: 36 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.72, delay, ease: ease.apple } },
  exit:    { opacity: 0, x: 18, transition: { duration: 0.3 } },
})

export const fadeIn = (delay = 0, duration = 0.6): Variants => ({
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration, delay } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
})

// ── Blur Reveal ──────────────────────────────────────────────────────────────
export const blurReveal = (delay = 0): Variants => ({
  initial: { opacity: 0, filter: 'blur(12px)', y: 16, scale: 0.98 },
  animate: { opacity: 1, filter: 'blur(0px)', y: 0, scale: 1,
    transition: { duration: 0.8, delay, ease: ease.apple } },
  exit:    { opacity: 0, filter: 'blur(6px)', scale: 0.98, transition: { duration: 0.3 } },
})

// ── Scale ────────────────────────────────────────────────────────────────────
export const scaleIn = (delay = 0): Variants => ({
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, delay, ease: ease.apple } },
  exit:    { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
})

// ── Stagger Container ─────────────────────────────────────────────────────────
export const staggerContainer = (stagger = 0.1, delayChildren = 0.15): Variants => ({
  initial:  {},
  animate:  { transition: { staggerChildren: stagger, delayChildren } },
  exit:     { transition: { staggerChildren: stagger / 2, staggerDirection: -1 } },
})

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.apple } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.25 } },
}

export const staggerItemLeft: Variants = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.55, ease: ease.apple } },
  exit:    { opacity: 0, x: -12, transition: { duration: 0.25 } },
}

// ── Card Interactions ─────────────────────────────────────────────────────────
export const cardHover = {
  rest:  { scale: 1,    y: 0,  boxShadow: '0 4px 24px rgba(0,0,0,0.3)' },
  hover: { scale: 1.02, y: -4, boxShadow: '0 16px 48px rgba(0,113,227,0.22), 0 4px 16px rgba(0,0,0,0.4)' },
  tap:   { scale: 0.98, y: 0 },
}

export const cardHoverSubtle = {
  rest:  { scale: 1,    y: 0 },
  hover: { scale: 1.01, y: -2 },
  tap:   { scale: 0.99 },
}

// ── Page Transition ───────────────────────────────────────────────────────────
export const pageTransition: Variants = {
  initial: { opacity: 0, filter: 'blur(8px)', y: 12 },
  animate: { opacity: 1, filter: 'blur(0px)', y: 0,
    transition: { duration: 0.45, ease: ease.apple } },
  exit:    { opacity: 0, filter: 'blur(4px)', y: -8,
    transition: { duration: 0.25 } },
}

// ── Text Word Reveal ──────────────────────────────────────────────────────────
export const wordRevealContainer: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
}

export const wordRevealItem: Variants = {
  initial: { opacity: 0, y: 32, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.65, ease: ease.apple } },
}

// ── Char Reveal ───────────────────────────────────────────────────────────────
export const charRevealContainer: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.025, delayChildren: 0.05 } },
}

export const charRevealItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: ease.apple } },
}

// ── Marquee ───────────────────────────────────────────────────────────────────
export const marqueeVariants: Variants = {
  animate: {
    x: [0, -1035],
    transition: { x: { repeat: Infinity, repeatType: 'loop', duration: 24, ease: 'linear' } },
  },
}

// ── Spring Pop ────────────────────────────────────────────────────────────────
export const springPop = (delay = 0): Variants => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1,
    transition: { type: 'spring', stiffness: 350, damping: 28, delay } },
})

// ── Viewport defaults ─────────────────────────────────────────────────────────
export const viewportOnce = { once: true, margin: '-80px' }
export const viewportEarly = { once: true, margin: '-40px' }
