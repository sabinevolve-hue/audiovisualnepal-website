'use client'

import React from 'react'

// Word/char animations replaced with instant rendering — scroll-triggered opacity:0
// caused text to appear invisible until viewport threshold was met.

interface AnimatedTextProps {
  text: string
  el?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  variant?: 'words' | 'chars' | 'fade'
  delay?: number
  once?: boolean
}

export function AnimatedText({ text, el = 'p', className = '' }: AnimatedTextProps) {
  const Tag = el as keyof JSX.IntrinsicElements
  return <Tag className={className}>{text}</Tag>
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
  const [displayed, setDisplayed] = React.useState(words[0] || '')
  const [phase, setPhase] = React.useState<'typing' | 'waiting' | 'deleting'>('waiting')

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
      timeout = setTimeout(() => setPhase('deleting'), interval)
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
      <span
        style={{
          color: cursorColor,
          animation: 'avn-cursor-blink 1s step-start infinite',
          display: 'inline-block',
        }}
        aria-hidden="true"
      >
        |
        <style>{`@keyframes avn-cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      </span>
    </span>
  )
}
