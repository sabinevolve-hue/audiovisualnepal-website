'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { wordRevealContainer, wordRevealItem, charRevealContainer, charRevealItem } from '@/lib/animations'

interface AnimatedTextProps {
  text: string
  el?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  variant?: 'words' | 'chars' | 'fade'
  delay?: number
  once?: boolean
}

export function AnimatedText({
  text,
  el = 'p',
  className = '',
  variant = 'words',
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once, margin: '-60px' })

  const Tag = motion[el] as React.ElementType

  if (variant === 'fade') {
    return (
      <Tag
        ref={ref}
        className={className}
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {text}
      </Tag>
    )
  }

  const units = variant === 'words' ? text.split(' ') : text.split('')
  const container = variant === 'words' ? wordRevealContainer : charRevealContainer
  const item = variant === 'words' ? wordRevealItem : charRevealItem

  return (
    <Tag
      ref={ref as React.RefObject<HTMLParagraphElement>}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', gap: variant === 'words' ? '0.28em' : '0' }}
      variants={{ ...container, animate: { ...container.animate, transition: { ...(container.animate as { transition?: object }).transition, delayChildren: delay } } }}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
    >
      {units.map((unit, i) => (
        <motion.span key={i} variants={item} style={{ display: 'inline-block' }}>
          {unit}
        </motion.span>
      ))}
    </Tag>
  )
}

// ── Typewriter ────────────────────────────────────────────────────────────────
interface TypewriterProps {
  words: string[]
  className?: string
  cursorColor?: string
  interval?: number
}

export function Typewriter({
  words,
  className = '',
  cursorColor = '#0071E3',
  interval = 2800,
}: TypewriterProps) {
  const [index, setIndex] = React.useState(0)
  const [displayed, setDisplayed] = React.useState('')
  const [phase, setPhase] = React.useState<'typing' | 'waiting' | 'deleting'>('typing')

  React.useEffect(() => {
    const current = words[index]
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
      } else {
        timeout = setTimeout(() => setPhase('waiting'), interval)
      }
    } else if (phase === 'waiting') {
      setPhase('deleting')
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
      } else {
        setIndex((i) => (i + 1) % words.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, phase, index, words, interval])

  return (
    <span className={className}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        style={{ color: cursorColor }}
      >
        |
      </motion.span>
    </span>
  )
}

import React from 'react'
