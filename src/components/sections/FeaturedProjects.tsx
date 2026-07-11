'use client'

import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'

const projects = [
  {
    type: 'Banking', name: 'Siddhartha Bank Head Office', slug: 'siddhartha-bank-head-office',
    desc: 'COB LMini P1.25 fine-pitch LED display — 110 sq ft in the head office at Naxal.',
    location: 'Naxal, Kathmandu', color: '#2563EB',
    photo: '/images/projects-real/siddhartha-bank-head-office.webp',
  },
  {
    type: 'Education', name: 'Jeevan Jyoti School', slug: 'jeevan-jyoti-school',
    desc: 'LC P3 indoor large-format display — 266 sq ft, one of the largest school installs outside the valley.',
    location: 'Kohalpur, Banke', color: '#059669',
    photo: '/images/projects-real/jeevan-jyoti-school.webp',
  },
  {
    type: 'Entertainment', name: 'FCube Cinemas', slug: 'fcube-cinemas',
    desc: 'LC P2.5 fine-pitch foyer display, calibrated for trailer content and daily long-hours playback.',
    location: 'Boudha, Kathmandu', color: '#7C3AED',
    photo: '/images/projects-real/fcube-cinemas.webp',
  },
  {
    type: 'Hospitality', name: 'Auranex Restaurant', slug: '',
    desc: 'LC P4 outdoor LED display — 50 sq ft of street-facing digital signage.',
    location: 'Townplanning, Kathmandu', color: '#D97706',
    photo: '/images/projects-real/auranex-restaurant.webp',
  },
  {
    type: 'Hospitality', name: 'Inland Multi Cuisine & Stay', slug: '',
    desc: 'LC P2.5 outdoor display — 31 sq ft for the Budhanilkantha property.',
    location: 'Budhanilkantha, Kathmandu', color: '#DC2626',
    photo: '/images/projects-real/inland-multi-cuisine-stay.webp',
  },
  {
    type: 'Education', name: 'Awarded International Education', slug: '',
    desc: 'LCM P2.5 indoor display — 30 sq ft at Star Mall, Putalisadak.',
    location: 'Putalisadak, Kathmandu', color: '#0891B2',
    photo: '/images/projects-real/awarded-international-education.webp',
  },
]


export default function FeaturedProjects() {
  return (
    <section className="section-padding" style={{ background: '#F8FAFC', borderTop: '1px solid rgba(11,30,61,0.06)', position: 'relative', overflow: 'hidden' }}>
      <svg aria-hidden="true" style={{ position: 'absolute', top: 18, left: 0, width: '100%', height: 40, opacity: 0.05, pointerEvents: 'none' }} preserveAspectRatio="none" viewBox="0 0 600 40">
        <path d="M0,20 Q10,4 20,20 T40,20 T60,20 Q68,34 76,20 T96,20 Q104,2 112,20 T132,20 T152,20 Q162,36 172,20 T192,20 Q200,6 208,20 T228,20 T248,20 Q258,34 268,20 T288,20 Q296,4 304,20 T324,20 T344,20 Q354,36 364,20 T384,20 Q392,6 400,20 T420,20 T440,20 Q450,32 460,20 T480,20 Q488,4 496,20 T516,20 T536,20 Q546,34 556,20 T576,20 T600,20" fill="none" stroke="#2563EB" strokeWidth="1.5" />
      </svg>
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
            <Link key={i} href={p.slug ? `/projects/${p.slug}` : '/projects'} style={{ textDecoration: 'none', color: 'inherit' }}>
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
