'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const solutions = [
  {
    label: 'Corporate Offices',
    href: '/solutions/corporate',
    desc: 'Smart meeting rooms, boardroom conferencing and multi-zone background music for modern offices.',
    tags: ['Smart Rooms','Conference','BGM'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    color: '#2563EB',
  },
  {
    label: 'Government Projects',
    href: '/solutions/government',
    desc: 'Large-scale PA, emergency broadcast and conference systems for ministries and public offices.',
    tags: ['PA Systems','Conference','Emergency'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 22h18M4 9h16M2 9l10-7 10 7M12 2v7M6 9v13M18 9v13M10 13h4v9h-4z"/>
      </svg>
    ),
    color: '#7C3AED',
  },
  {
    label: 'Education',
    href: '/solutions/education',
    desc: 'Classroom audio, campus-wide PA, digital smart podiums and distance learning systems.',
    tags: ['Classroom','Campus PA','Smart Podium'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    color: '#059669',
  },
  {
    label: 'Hotels & Hospitality',
    href: '/solutions/hotels',
    desc: 'Background music, multi-zone audio and ballroom sound for hotels and hospitality venues.',
    tags: ['BGM','Ballroom','Multi-zone'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 22V12h18v10M3 12V7h18v5"/><path d="M3 7h18M12 2v5M8 7V2M16 7V2"/>
      </svg>
    ),
    color: '#D97706',
  },
  {
    label: 'Hospitals',
    href: '/solutions/hospitals',
    desc: 'Patient announcements, zone paging and voice evacuation for healthcare facilities.',
    tags: ['Paging','Voice Evacuation','Zones'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 8v8M8 12h8"/><rect x="2" y="6" width="20" height="16" rx="2"/><path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
      </svg>
    ),
    color: '#DC2626',
  },
  {
    label: 'Religious Places',
    href: '/solutions/religious',
    desc: 'High-clarity PA systems for mosques, temples, churches and monasteries across Nepal.',
    tags: ['Mosque','Temple','Church'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
    color: '#0891B2',
  },
  {
    label: 'Transportation',
    href: '/solutions/transportation',
    desc: 'Robust IP network PA and passenger information for airports, bus parks and transit hubs.',
    tags: ['Airport','Bus Park','IP Audio'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M6 4v16M10 4v16M14 4v16M18 4v16M2 8h20M2 12h20M2 16h20"/>
      </svg>
    ),
    color: '#EA580C',
  },
  {
    label: 'Smart Meeting Rooms',
    href: '/solutions/smart-meeting-rooms',
    desc: 'AI video conferencing, wireless presentation and Dante-networked room integration.',
    tags: ['AI Camera','Wireless','Conference'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.845v6.31a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      </svg>
    ),
    color: '#7C3AED',
  },
]

export default function SolutionsSection() {
  return (
    <section className="section-padding" style={{ background: '#FFFFFF', borderTop: '1px solid rgba(11,30,61,0.06)' }}>
      <div className="container-site">
        <div className="text-center mb-14">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563EB', marginBottom: 12 }}>Industries We Serve</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,4vw,48px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0B1E3D', marginBottom: 16 }}>
            Solutions for Every Space
          </h2>
          <p style={{ fontSize: 16, maxWidth: 480, margin: '0 auto', lineHeight: 1.7, color: '#475569' }}>
            From government boardrooms to hotel ballrooms — we design and deliver complete AV systems tailored to each sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {solutions.map((sol) => (
            <Link
              key={sol.href}
              href={sol.href}
              style={{
                display: 'block',
                padding: '24px',
                borderRadius: 16,
                background: '#FFFFFF',
                border: '1.5px solid rgba(11,30,61,0.08)',
                textDecoration: 'none',
                boxShadow: '0 1px 6px rgba(11,30,61,0.05)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = `${sol.color}40`
                el.style.boxShadow = `0 8px 28px ${sol.color}14`
                el.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = 'rgba(11,30,61,0.08)'
                el.style.boxShadow = '0 1px 6px rgba(11,30,61,0.05)'
                el.style.transform = 'none'
              }}
            >
              {/* Icon */}
              <div style={{ width: 42, height: 42, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${sol.color}10`, color: sol.color, border: `1.5px solid ${sol.color}20`, marginBottom: 16 }}>
                {sol.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#0B1E3D', marginBottom: 8, lineHeight: 1.3 }}>{sol.label}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: '#64748B', marginBottom: 14 }}>{sol.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
                {sol.tags.map(t => (
                  <span key={t} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 999, fontWeight: 600, background: `${sol.color}08`, color: sol.color, border: `1px solid ${sol.color}18`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t}
                  </span>
                ))}
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: sol.color }}>
                Learn more <ArrowRight size={11} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
