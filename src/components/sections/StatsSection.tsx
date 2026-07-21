'use client'

import { useEffect, useRef, useState } from 'react'

function AnimatedStat({ value, suffix, label, color }: { value: number; suffix: string; label: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [displayed, setDisplayed] = useState(value)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1400
        const startVal = Math.round(value * 0.4)
        const start = performance.now()
        const ease = (t: number) => 1 - Math.pow(1 - t, 3)
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          setDisplayed(Math.round(startVal + ease(p) * (value - startVal)))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '40px 24px' }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: 'clamp(36px,4.5vw,56px)',
        color: color,
        lineHeight: 1,
        letterSpacing: '-0.03em',
      }}>
        {displayed.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 10, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</div>
    </div>
  )
}

const STATS = [
  { value: 100, suffix: '+', label: 'Projects Delivered',  color: '#60A5FA' },
  { value: 14,  suffix: '+', label: 'Product Categories', color: '#A78BFA' },
  { value: 77,  suffix: '',  label: 'Districts Covered',  color: '#34D399' },
  { value: 100, suffix: '%', label: 'Genuine Products',   color: '#FBBF24' },
]

const EQ_BARS = [12, 26, 18, 34, 22, 40, 15, 30, 20, 38, 16, 28, 24, 42, 14, 32, 19, 36, 21, 27, 13, 33, 17, 29, 23, 39, 15, 31, 18, 25]

export default function StatsSection() {
  return (
    <section style={{
      background: '#0D1220',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/textures/speaker-grille.webp)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08, pointerEvents: 'none' }} />
      <svg aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 48, opacity: 0.07 }} preserveAspectRatio="none" viewBox="0 0 600 48">
        {EQ_BARS.map((h, i) => (
          <rect key={i} x={i * 20 + 6} y={48 - h} width={8} height={h} rx={2} fill="#60A5FA" />
        ))}
      </svg>
      <div className="container-site">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              <AnimatedStat value={s.value} suffix={s.suffix} label={s.label} color={s.color} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
