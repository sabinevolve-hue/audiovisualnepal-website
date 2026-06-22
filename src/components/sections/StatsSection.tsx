'use client'

import { STATS } from '@/lib/constants'
import { NumberFlow } from '@/components/ui/NumberFlow'
import { RevealSection } from '@/components/ui/RevealSection'

export default function StatsSection() {
  return (
    <section className="py-0" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <RevealSection
              key={i}
              delay={i * 0.08}
              className={`py-10 px-6 text-center ${i < STATS.length - 1 ? 'border-r border-[var(--border-subtle)]' : ''}`}
            >
              <div
                className="font-display font-extrabold leading-none tracking-tight mb-1.5"
                style={{ fontSize: 'clamp(36px,4.5vw,52px)', color: 'var(--text-primary)' }}
              >
                <NumberFlow value={stat.value} suffix={stat.suffix} duration={1600} />
              </div>
              <div className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>
                {stat.label}
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
