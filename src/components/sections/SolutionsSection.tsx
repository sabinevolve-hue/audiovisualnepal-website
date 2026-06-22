'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SOLUTIONS_NAV } from '@/lib/constants'
import { RevealSection, StaggerReveal } from '@/components/ui/RevealSection'

const details: Record<string, { desc: string; tags: string[] }> = {
  '/solutions/corporate':           { desc: 'Smart meeting rooms, boardroom conferencing, multi-zone audio for modern offices.',             tags: ['Smart Rooms','Conference','BGM'] },
  '/solutions/government':          { desc: 'Large-scale PA, emergency broadcast and conference systems for ministries and public offices.', tags: ['PA Systems','Conference','Emergency'] },
  '/solutions/education':           { desc: 'Classroom audio, campus-wide PA and digital learning systems.',                                tags: ['Classroom','Campus PA','Digital'] },
  '/solutions/hotels':              { desc: 'Background music, multi-zone audio and ballroom sound for hotels and hospitality.',             tags: ['BGM','Ballroom','Multi-zone'] },
  '/solutions/hospitals':           { desc: 'Patient announcements, zone paging and nurse-call integrated audio for healthcare.',            tags: ['Paging','Announcements','Zones'] },
  '/solutions/religious':           { desc: 'High-clarity systems for mosques, temples, churches and monasteries.',                         tags: ['Mosque','Temple','Church'] },
  '/solutions/transportation':      { desc: 'Robust PA and passenger information for airports and transit hubs.',                           tags: ['Airport','Bus Park','IP Audio'] },
  '/solutions/smart-meeting-rooms': { desc: 'Wireless conferencing, ceiling microphone arrays and Dante-networked room integration.',       tags: ['Wireless','Ceiling Mic','Dante'] },
}

export default function SolutionsSection() {
  return (
    <section className="section-padding bg-white" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container-site">
        <RevealSection className="text-center mb-14">
          <div className="eyebrow mb-3">Industries We Serve</div>
          <h2 className="heading-section mb-4">Solutions for Every Space</h2>
          <p className="text-[17px] max-w-[500px] mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            From government boardrooms to hotel ballrooms — we design and deliver complete AV systems.
          </p>
        </RevealSection>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.06}>
          {SOLUTIONS_NAV.map((sol) => {
            const d = details[sol.href]
            return (
              <Link
                key={sol.href}
                href={sol.href}
                className="group block rounded-[var(--radius-xl)] p-6 border bg-white transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-1"
                style={{ border: '1px solid var(--border-default)' }}
              >
                <div className="text-2xl mb-4">{sol.icon}</div>
                <h3 className="font-display font-bold text-[16px] mb-2 text-[var(--text-primary)]">{sol.label}</h3>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{d?.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {d?.tags.map(t => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--bg-subtle)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--text-brand)] group-hover:gap-2 transition-all duration-200">
                  Learn more <ArrowRight size={12} />
                </span>
              </Link>
            )
          })}
        </StaggerReveal>
      </div>
    </section>
  )
}
