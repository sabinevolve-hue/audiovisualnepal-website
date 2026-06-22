'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface NumberFlowProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  decimals?: number
}

/**
 * Animated counter — counts up from 0 to `value` when in view.
 * Falls back to a simple CSS counter animation if @number-flow/react is not installed.
 */
export function NumberFlow({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
  className = '',
  decimals = 0,
}: NumberFlowProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [displayed, setDisplayed] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!isInView || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()
    const ease = (t: number) => 1 - Math.pow(1 - t, 4) // ease-out-quart

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      setDisplayed(parseFloat((ease(progress) * value).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, value, duration, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayed.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}
