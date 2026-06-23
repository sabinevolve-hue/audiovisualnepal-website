'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const solutions = [
  {
    label: 'Corporate Offices',
    href: '/solutions/corporate',
    desc: 'Smart meeting rooms, boardroom conferencing, multi-zone audio for modern offices.',
    tags: ['Smart Rooms','Conference','BGM'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    color: '#3B82F6',
  },
  {
    label: 'Government Projects',
    href: '/solutions/government',
    desc: 'Large-scale PA, emergency broadcast and conference systems for ministries and public offices.',
    tags: ['PA Systems','Conference','Emergency'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 22h18M4 9h16M2 9l10-7 10 7M12 2v7M6 9v13M18 9v13M10 13h4v9h-4z"/>
      </svg>
    ),
    color: '#8B5CF6',
  },
  {
    label: 'Education',
    href: '/solutions/education',
    desc: 'Classroom audio, campus-wide PA and digital learning systems.',
    tags: ['Classroom','Campus PA','Digital'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    color: '#10B981',
  },
  {
    label: 'Hotels & Hospitality',
    href: '/solutions/hotels',
    desc: 'Background music, multi-zone audio and ballroom sound for hotels and hospitality.',
    tags: ['BGM','Ballroom','Multi-zone'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 22V12h18v10M3 12V7h18v5"/><path d="M3 7h18M12 2v5M8 7V2M16 7V2"/>
      </svg>
    ),
    color: '#F59E0B',
  },
  {
    label: 'Hospitals',
    href: '/solutions/hospitals',
    desc: 'Patient announcements, zone paging and nurse-call integrated audio for healthcare.',
    tags: ['Paging','Announcements','Zones'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 8v8M8 12h8"/><rect x="2" y="6" width="20" height="16" rx="2"/><path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
      </svg>
    ),
    color: '#EF4444',
  },
  {
    label: 'Religious Places',
    href: '/solutions/religious',
    desc: 'High-clarity systems for mosques, temples, churches and monasteries.',
    tags: ['Mosque','Temple','Church'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
    color: '#06B6D4',
  },
  {
    label: 'Transportation',
    href: '/solutions/transportation',
    desc: 'Robust PA and passenger information for airports and transit hubs.',
    tags: ['Airport','Bus Park','IP Audio'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    color: '#F97316',
  },
  {
    label: 'Smart Meeting Rooms',
    href: '/solutions/smart-meeting-rooms',
    desc: 'Wireless conferencing, ceiling microphone arrays and Dante-networked room integration.',
    tags: ['Wireless','Ceiling Mic','Dante'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.845v6.31a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      </svg>
    ),
    color: '#A855F7',
  },
]

export default function SolutionsSection() {
  return (
    <section className="section-padding" style={{ background: '#0A0F1E', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container-site">
        <div className="text-center mb-14">
          <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#60A5FA', marginBottom: 12 }}>Industries We Serve</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#FFFFFF', marginBottom: 16 }}>Solutions for Every Space</h2>
          <p style={{ fontSize: 17, maxWidth: 480, margin: '0 auto', lineHeight: 1.65, color: '#64748B' }}>
            From government boardrooms to hotel ballrooms — we design and deliver complete AV systems.
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
                borderRadius: 20,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(255,255,255,0.06)'
                el.style.borderColor = `${sol.color}30`
                el.style.transform = 'translateY(-3px)'
                el.style.boxShadow = `0 8px 32px ${sol.color}18`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(255,255,255,0.03)'
                el.style.borderColor = 'rgba(255,255,255,0.07)'
                el.style.transform = 'none'
                el.style.boxShadow = 'none'
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${sol.color}18`, color: sol.color, border: `1.5px solid ${sol.color}28`, marginBottom: 16 }}>
                {sol.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#F1F5F9', marginBottom: 8, lineHeight: 1.3 }}>{sol.label}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: '#64748B', marginBottom: 14 }}>{sol.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                {sol.tags.map(t => (
                  <span key={t} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 999, fontWeight: 600, background: 'rgba(255,255,255,0.05)', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.08)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t}
                  </span>
                ))}
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: sol.color }}>
                Learn more <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
