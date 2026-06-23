'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const featured = [
  {
    name: 'Professional Speakers',
    desc: 'Ceiling, wall mount, column, horn & subwoofers for every space',
    href: '/products/speakers',
    color: '#3B82F6',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><circle cx="12" cy="14" r="1.5" fill="currentColor"/><circle cx="12" cy="6" r="1.5"/>
      </svg>
    ),
  },
  {
    name: 'Amplifiers',
    desc: '60W to 1000W — single and multi-zone with Bluetooth & FM',
    href: '/products/amplifiers',
    color: '#F59E0B',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    name: 'Conference Systems',
    desc: 'Wired & wireless, chairman/delegate units, voting & recording',
    href: '/products/conference-systems',
    color: '#8B5CF6',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
      </svg>
    ),
  },
  {
    name: 'IP Network Audio',
    desc: 'PoE speakers, IP amplifiers, paging stations & management servers',
    href: '/products/ip-network-audio',
    color: '#10B981',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    name: 'Voice Evacuation',
    desc: 'EN 54-certified systems for life safety and emergency broadcast',
    href: '/products/voice-evacuation',
    color: '#EF4444',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    name: 'Video Conferencing',
    desc: 'PTZ cameras, all-in-one bars, speakerphones & USB webcams',
    href: '/products/conference-systems',
    color: '#06B6D4',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.845v6.31a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      </svg>
    ),
  },
]

export default function ProductEcosystem() {
  return (
    <section className="section-padding" id="products" style={{ background: '#060D1A', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container-site">
        <div className="text-center mb-14">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#60A5FA', marginBottom: 12 }}>Product Ecosystem</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#FFFFFF', marginBottom: 16 }}>Every Component, One Source</h2>
          <p style={{ fontSize: 17, maxWidth: 500, margin: '0 auto', lineHeight: 1.65, color: '#64748B' }}>
            From individual components to complete turnkey systems — sourced from world-class manufacturers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((item) => (
            <Link
              key={item.href + item.name}
              href={item.href}
              style={{
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start',
                padding: '24px',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(255,255,255,0.055)'
                el.style.borderColor = `${item.color}35`
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = `0 6px 28px ${item.color}15`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(255,255,255,0.03)'
                el.style.borderColor = 'rgba(255,255,255,0.07)'
                el.style.transform = 'none'
                el.style.boxShadow = 'none'
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${item.color}18`, color: item.color, border: `1.5px solid ${item.color}28`, flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#F1F5F9', marginBottom: 6, lineHeight: 1.3 }}>{item.name}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: '#64748B', marginBottom: 12 }}>{item.desc}</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: item.color }}>
                  View Products <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/products"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#3B82F6', textDecoration: 'none', transition: 'gap 0.2s' }}
          >
            Browse all product categories <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
