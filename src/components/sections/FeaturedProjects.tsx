'use client'

import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { RevealSection, StaggerReveal } from '@/components/ui/RevealSection'

const projects = [
  { type: 'Government',   name: 'Federal Parliament Complex',        desc: '250-seat conference hall with simultaneous interpretation, voting system & HD video.', location: 'Kathmandu', color: '#3B82F6' },
  { type: 'Education',    name: 'Tribhuvan University Campus',        desc: 'IP-based campus PA system covering 40+ buildings with centralised management.', location: 'Kirtipur', color: '#10B981' },
  { type: 'Hospitality',  name: '5-Star Hotel Ballroom',             desc: '18-zone background music, line array for ballroom events & conference room AV.', location: 'Kathmandu', color: '#F59E0B' },
  { type: 'Corporate',    name: 'Smart Meeting Rooms — Leapfrog HQ', desc: 'Wireless conferencing, ceiling mic arrays & Dante-networked audio distribution.', location: 'Kathmandu', color: '#8B5CF6' },
  { type: 'Healthcare',   name: 'Grande International Hospital',      desc: 'Multi-zone IP paging integrated with nurse call, covering 12 floors.', location: 'Kathmandu', color: '#EF4444' },
  { type: 'Religious',    name: 'Central Mosque, Kathmandu',          desc: 'High-intelligibility PA with outdoor horn speakers for 5,000+ congregation.', location: 'Kathmandu', color: '#0071E3' },
]

export default function FeaturedProjects() {
  return (
    <section className="section-padding bg-white" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container-site">
        <RevealSection className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="eyebrow mb-3">Our Work</div>
            <h2 className="heading-section">Featured Projects</h2>
          </div>
          <Link href="/projects" className="flex items-center gap-1.5 text-[14px] font-semibold text-[var(--text-brand)] hover:gap-2.5 transition-all duration-200 group pb-1 flex-shrink-0">
            View all <ArrowRight size={14} />
          </Link>
        </RevealSection>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.07}>
          {projects.map((p, i) => (
            <div
              key={i}
              className="group rounded-[var(--radius-xl)] overflow-hidden border bg-white transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-1"
              style={{ border: '1px solid var(--border-default)' }}
            >
              {/* Color bar */}
              <div className="h-1.5" style={{ background: p.color }} />

              <div className="p-6">
                {/* Badge */}
                <span
                  className="inline-block text-[11px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full mb-4"
                  style={{ background: `${p.color}14`, color: p.color }}
                >
                  {p.type}
                </span>

                <h3 className="font-display font-bold text-[17px] text-[var(--text-primary)] mb-2 leading-snug">
                  {p.name}
                </h3>
                <p className="text-[14px] leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {p.desc}
                </p>
                <div className="flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--text-tertiary)' }}>
                  <MapPin size={12} /> {p.location}
                </div>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
