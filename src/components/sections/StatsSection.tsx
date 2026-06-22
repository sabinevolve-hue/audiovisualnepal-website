'use client'

import { STATS } from '@/lib/constants'
import { NumberFlow } from '@/components/ui/NumberFlow'

export default function StatsSection() {
  return (
    <section className="py-0" style={{ background: '#0071E3', borderTop: 'none', borderBottom: 'none' }}>
      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="py-10 px-6 text-center"
              style={{ borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none' }}
            >
              <div
                className="font-display font-extrabold leading-none tracking-tight mb-1.5"
                style={{ fontSize: 'clamp(36px,4.5vw,52px)', color: '#FFFFFF' }}
              >
                <NumberFlow value={stat.value} suffix={stat.suffix} duration={1600} />
              </div>
              <div className="text-[14px]" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
