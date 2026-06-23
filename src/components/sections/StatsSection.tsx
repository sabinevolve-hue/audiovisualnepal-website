'use client'

import { useEffect, useRef, useState } from 'react'

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [displayed, setDisplayed] = useState(value)  // start at real value for SSR
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1400
          const startVal = Math.round(value * 0.4)  // start from 40% of target
          const start = performance.now()
          const ease = (t: number) => 1 - Math.pow(1 - t, 3)
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1)
            setDisplayed(Math.round(startVal + ease(p) * (value - startVal)))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '32px 24px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(36px,4.5vw,56px)', color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.03em' }}>
        {displayed.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 8, fontWeight: 500 }}>{label}</div>
    </div>
  )
}

const STATS = [
  { value: 500, suffix: '+', label: 'Successful Projects' },
  { value: 20,  suffix: '+', label: 'Product Categories' },
  { value: 77,  suffix: '',  label: 'Districts Served' },
  { value: 100, suffix: '%', label: 'Genuine Products' },
]

export default function StatsSection() {
  return (
    <section style={{ background: 'linear-gradient(135deg, #0D1B3E 0%, #0F2456 50%, #0D1B3E 100%)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container-site">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              <AnimatedStat value={s.value} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
