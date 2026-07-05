'use client'

import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'

const projects = [
  {
    type: 'Government', name: 'Federal Parliament Complex', slug: 'federal-parliament-complex',
    desc: '250-seat conference hall with simultaneous interpretation, voting system & HD video.',
    location: 'Kathmandu', color: '#2563EB',
    photo: '/images/heroes/government-hero.webp',
  },
  {
    type: 'Education', name: 'Tribhuvan University Campus', slug: 'tribhuvan-university-campus-pa',
    desc: 'IP-based campus PA system covering 40+ buildings with centralised management.',
    location: 'Kirtipur', color: '#059669',
    photo: '/images/heroes/education-hero.webp',
  },
  {
    type: 'Hospitality', name: '5-Star Hotel Ballroom', slug: 'five-star-hotel-ballroom',
    desc: '18-zone background music, line array for ballroom events & conference room AV.',
    location: 'Kathmandu', color: '#D97706',
    photo: '/images/heroes/hotels-hero.webp',
  },
  {
    type: 'Corporate', name: 'Smart Meeting Rooms — Leapfrog HQ', slug: 'leapfrog-smart-meeting-rooms',
    desc: 'Wireless conferencing, ceiling mic arrays & Dante-networked audio distribution.',
    location: 'Kathmandu', color: '#7C3AED',
    photo: '/images/heroes/smart-meeting-rooms-hero.webp',
  },
  {
    type: 'Healthcare', name: 'Grande International Hospital', slug: 'grande-international-hospital',
    desc: 'Multi-zone IP paging integrated with nurse call, covering 12 floors.',
    location: 'Kathmandu', color: '#DC2626',
    photo: '/images/heroes/hospitals-hero.webp',
  },
  {
    type: 'Religious', name: 'Central Mosque, Kathmandu', slug: 'central-mosque-kathmandu',
    desc: 'High-intelligibility PA with outdoor horn speakers for 5,000+ congregation.',
    location: 'Kathmandu', color: '#0891B2',
    photo: '/images/heroes/religious-hero.webp',
  },
]

export default function FeaturedProjects() {
  return (
    <section className="section-padding" style={{ background: '#F8FAFC', borderTop: '1px solid rgba(11,30,61,0.06)' }}>
      <div className="container-site">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 44, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563EB', marginBottom: 12 }}>Our Work</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,4vw,48px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0B1E3D', lineHeight: 1.1 }}>Featured Projects</h2>
          </div>
          <Link href="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#2563EB', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <Link key={i} href={`/projects/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
              style={{ borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(11,30,61,0.08)', background: '#FFFFFF', boxShadow: '0 1px 8px rgba(11,30,61,0.06)', transition: 'all 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = 'translateY(-4px)'
                el.style.boxShadow = `0 10px 36px rgba(11,30,61,0.12), 0 0 0 1.5px ${p.color}30`
                el.style.borderColor = `${p.color}30`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = 'none'
                el.style.boxShadow = '0 1px 8px rgba(11,30,61,0.06)'
                el.style.borderColor = 'rgba(11,30,61,0.08)'
              }}
            >
              {/* Photo */}
              <div style={{ position: 'relative', height: 190, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,30,61,0.5) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', top: 12, left: 14 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 999, background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30`, backdropFilter: 'blur(4px)' }}>
                    {p.type}
                  </span>
                </div>
                <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 9, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', background: 'rgba(11,30,61,0.45)', padding: '2px 7px', borderRadius: 999 }}>Illustration</div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: p.color }} />
              </div>
              {/* Content */}
              <div style={{ padding: '18px 20px 20px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#0B1E3D', marginBottom: 7, lineHeight: 1.35 }}>{p.name}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: '#64748B', marginBottom: 12 }}>{p.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#94A3B8' }}>
                  <MapPin size={11} /> {p.location}
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
