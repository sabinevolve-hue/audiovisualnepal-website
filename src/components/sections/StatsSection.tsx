'use client'

import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { STATS } from '@/lib/constants'

export default function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section className="bg-[#F5F5F7] py-20" ref={ref}>
      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5 rounded-2xl overflow-hidden">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="bg-white px-8 py-12 text-center hover:-translate-y-1 transition-transform duration-300 group"
            >
              <div className="font-display font-extrabold text-[52px] leading-none tracking-[-0.03em] text-[#111] mb-2">
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={1.6}
                    delay={i * 0.15}
                    suffix={stat.suffix}
                    useEasing
                  />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <div className="text-[15px] text-[#6E6E73]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
