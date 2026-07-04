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
      <div style={{ fontSize: 13, color: '#64748B', marginTop: 10, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</div>
    </div>
  )
}

const STATS = [
  { value: 500, suffix: '+', label: 'Projects Delivered',  color: '#2563EB' },
  { value: 14,  suffix: '+', label: 'Product Categories', color: '#7C3AED' },
  { value: 77,  suffix: '',  label: 'Districts Covered',  color: '#059669' },
  { value: 100, suffix: '%', label: 'Genuine Products',   color: '#D97706' },
]

export default function StatsSection() {
  return (
    <section style={{
      background: '#F8FAFC',
      borderTop: '1px solid rgba(11,30,61,0.06)',
      borderBottom: '1px solid rgba(11,30,61,0.06)',
    }}>
      <div className="container-site">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ borderRight: i < STATS.length - 1 ? '1px solid rgba(11,30,61,0.07)' : 'none' }}>
              <AnimatedStat value={s.value} suffix={s.suffix} label={s.label} color={s.color} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
