'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const featured = [
  {
    name: 'Voice Evacuation Systems',
    desc: 'EN54-certified emergency PA — PAVA9500, PAVA8500, PAVA4600 for any building size.',
    href: '/products/voice-evacuation',
    color: '#DC2626',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>),
  },
  {
    name: 'IP Network Audio',
    desc: 'Dante-networked PA servers, PoE amplifiers and remote paging stations.',
    href: '/products/ip-network-audio',
    color: '#2563EB',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>),
  },
  {
    name: 'Conference Cameras (PTZ)',
    desc: 'AI tracking PTZ cameras from Tenveo — 4K@60fps, NDI, 20× optical zoom.',
    href: '/products/conference-cameras',
    color: '#0891B2',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.845v6.31a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>),
  },
  {
    name: 'Wireless Presentation',
    desc: 'InfoBit iShare X200 — 4K60Hz, 0.1s latency, 16 users, dongle-free.',
    href: '/products/wireless-presentation',
    color: '#6366F1',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>),
  },
  {
    name: 'Smart Podiums',
    desc: 'Focus electric height-adjustable podiums with touch screen and built-in PC.',
    href: '/products/smart-podiums',
    color: '#1E40AF',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>),
  },
  {
    name: 'Mixer Amplifiers',
    desc: 'DSPPA DMA series — 60W to 650W with USB, FM, Bluetooth and multi-zone.',
    href: '/products/amplifiers',
    color: '#D97706',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>),
  },
]

export default function ProductEcosystem() {
  return (
    <section className="section-padding" id="products" style={{ background: '#FFFFFF', borderTop: '1px solid rgba(11,30,61,0.06)' }}>
      <div className="container-site">
        <div className="text-center mb-14">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563EB', marginBottom: 12 }}>Product Ecosystem</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,4vw,48px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0B1E3D', marginBottom: 16 }}>
            Every Component, One Source
          </h2>
          <p style={{ fontSize: 16, maxWidth: 500, margin: '0 auto', lineHeight: 1.7, color: '#475569' }}>
            From individual components to complete turnkey systems — sourced from four world-class manufacturers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((item) => (
            <Link
              key={item.href + item.name}
              href={item.href}
              style={{
                display: 'flex',
                gap: 18,
                alignItems: 'flex-start',
                padding: '22px',
                borderRadius: 16,
                background: '#FFFFFF',
                border: '1.5px solid rgba(11,30,61,0.08)',
                textDecoration: 'none',
                boxShadow: '0 1px 6px rgba(11,30,61,0.04)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = `${item.color}35`
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = `0 6px 24px ${item.color}12`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = 'rgba(11,30,61,0.08)'
                el.style.transform = 'none'
                el.style.boxShadow = '0 1px 6px rgba(11,30,61,0.04)'
              }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${item.color}0D`, color: item.color, border: `1.5px solid ${item.color}20`, flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#0B1E3D', marginBottom: 6, lineHeight: 1.3 }}>{item.name}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: '#64748B', marginBottom: 10 }}>{item.desc}</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: item.color }}>
                  View Products <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#2563EB', textDecoration: 'none' }}>
            Browse all product categories <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
