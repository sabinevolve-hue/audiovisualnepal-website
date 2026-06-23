'use client'

import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'

const projects = [
  {
    type: 'Government',
    name: 'Federal Parliament Complex',
    desc: '250-seat conference hall with simultaneous interpretation, voting system & HD video.',
    location: 'Kathmandu',
    color: '#3B82F6',
    photo: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
  },
  {
    type: 'Education',
    name: 'Tribhuvan University Campus',
    desc: 'IP-based campus PA system covering 40+ buildings with centralised management.',
    location: 'Kirtipur',
    color: '#10B981',
    photo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
  },
  {
    type: 'Hospitality',
    name: '5-Star Hotel Ballroom',
    desc: '18-zone background music, line array for ballroom events & conference room AV.',
    location: 'Kathmandu',
    color: '#F59E0B',
    photo: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
  },
  {
    type: 'Corporate',
    name: 'Smart Meeting Rooms — Leapfrog HQ',
    desc: 'Wireless conferencing, ceiling mic arrays & Dante-networked audio distribution.',
    location: 'Kathmandu',
    color: '#8B5CF6',
    photo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  },
  {
    type: 'Healthcare',
    name: 'Grande International Hospital',
    desc: 'Multi-zone IP paging integrated with nurse call, covering 12 floors.',
    location: 'Kathmandu',
    color: '#EF4444',
    photo: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
  },
  {
    type: 'Religious',
    name: 'Central Mosque, Kathmandu',
    desc: 'High-intelligibility PA with outdoor horn speakers for 5,000+ congregation.',
    location: 'Kathmandu',
    color: '#06B6D4',
    photo: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80',
  },
]

export default function FeaturedProjects() {
  return (
    <section className="section-padding" style={{ background: '#0A0F1E', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container-site">
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 48, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#60A5FA', marginBottom: 12 }}>Our Work</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#FFFFFF', lineHeight: 1.1 }}>Featured Projects</h2>
          </div>
          <Link href="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#3B82F6', textDecoration: 'none', paddingBottom: 4, whiteSpace: 'nowrap' }}>
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <div
              key={i}
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.07)',
                background: '#111827',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = 'translateY(-4px)'
                el.style.boxShadow = `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${p.color}25`
                el.style.borderColor = `${p.color}30`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = 'none'
                el.style.boxShadow = 'none'
                el.style.borderColor = 'rgba(255,255,255,0.07)'
              }}
            >
              {/* Photo */}
              <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.photo}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                />
                {/* Gradient overlay on photo */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,24,39,0.9) 0%, rgba(17,24,39,0.2) 60%, transparent 100%)' }} />
                {/* Type badge on photo */}
                <div style={{ position: 'absolute', top: 14, left: 14 }}>
                  <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999, background: `${p.color}22`, color: p.color, border: `1px solid ${p.color}40`, backdropFilter: 'blur(8px)' }}>
                    {p.type}
                  </span>
                </div>
                {/* Color accent line */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: p.color }} />
              </div>

              {/* Content */}
              <div style={{ padding: '20px 22px 22px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: '#F1F5F9', marginBottom: 8, lineHeight: 1.35 }}>
                  {p.name}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: '#64748B', marginBottom: 14 }}>
                  {p.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#475569' }}>
                  <MapPin size={11} /> {p.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
