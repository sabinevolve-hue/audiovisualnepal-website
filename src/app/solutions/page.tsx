import type { Metadata } from 'next'
import Link from 'next/link'
import { SOLUTIONS_NAV } from '@/lib/constants'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Solutions — AudioVisual Nepal | AV for Every Industry',
  description: 'Professional AV solutions for corporate offices, government, education, hotels, hospitals, religious venues and more across Nepal.',
}

const SOLUTION_DETAILS: Record<string, { heading: string; desc: string; systems: string[] }> = {
  '/solutions/corporate': {
    heading: 'Corporate Offices',
    desc: 'Smart meeting rooms, boardroom AV, BGM systems, and video walls for modern workplaces.',
    systems: ['Conference Room AV', 'Video Walls', 'BGM Systems', 'Room Booking Displays', 'Wireless Presentation'],
  },
  '/solutions/government': {
    heading: 'Government Projects',
    desc: 'Secure AV for ministries, provincial offices, courts, and public service centers.',
    systems: ['PA Systems', 'Video Conferencing', 'Digital Signage', 'Chamber AV', 'Translation Systems'],
  },
  '/solutions/education': {
    heading: 'Education',
    desc: 'Interactive classrooms, campus PA, and auditorium AV for schools and universities.',
    systems: ['Campus PA', 'Interactive Displays', 'Auditorium Sound', 'Language Labs', 'Distance Learning'],
  },
  '/solutions/hotels': {
    heading: 'Hotels & Hospitality',
    desc: 'Ballroom AV, restaurant BGM, pool audio, and guest room entertainment systems.',
    systems: ['Ballroom & Event AV', 'Restaurant BGM', 'Pool & Lobby Audio', 'Guest Room TV', 'IPTV Systems'],
  },
  '/solutions/hospitals': {
    heading: 'Hospitals',
    desc: 'Patient information displays, nurse call audio, and secure PA for healthcare.',
    systems: ['Patient Info Displays', 'Nurse Call Audio', 'Emergency PA', 'Waiting Room BGM', 'Conference Rooms'],
  },
  '/solutions/religious': {
    heading: 'Religious Venues',
    desc: 'Crystal-clear sound systems for temples, churches, mosques, and monasteries.',
    systems: ['PA Sound Systems', 'Line Array Speakers', 'Wireless Microphones', 'Acoustic Treatment', 'Recording'],
  },
  '/solutions/transportation': {
    heading: 'Transportation',
    desc: 'Announcement systems for airports, bus parks, and railway stations.',
    systems: ['Public Address', 'FIDS Integration', 'Emergency Broadcasting', 'IP Audio Network', 'CCTV Integration'],
  },
  '/solutions/smart-meeting-rooms': {
    heading: 'Smart Meeting Rooms',
    desc: 'One-touch meeting room control with integrated AV, camera, and collaboration tools.',
    systems: ['One-Touch Control', '4K Video Conferencing', 'Wireless Sharing', 'Room Scheduling', 'Cloud Integration'],
  },
}

export default function SolutionsPage() {
  return (
    <main style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ background: '#1D1D1F', padding: '80px 24px 64px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#0071E3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
          Industry Solutions
        </p>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: 20 }}>
          Solutions for Every Space
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', maxWidth: 600, margin: '0 auto' }}>
          From government boardrooms to hotel ballrooms, hospital lobbies to university campuses — we design and deliver complete AV systems for every environment.
        </p>
      </section>

      {/* Solutions Grid */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {SOLUTIONS_NAV.map(sol => {
              const detail = SOLUTION_DETAILS[sol.href]
              return (
                <Link key={sol.href} href={sol.href} style={{ textDecoration: 'none', display: 'block', background: '#F5F5F7', borderRadius: 20, padding: 32, border: '1px solid #E8E8ED' }}>
                  <div style={{ fontSize: 40, marginBottom: 20 }}>{sol.icon}</div>
                  <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 800, color: '#1D1D1F', marginBottom: 10 }}>{sol.label}</h2>
                  {detail && (
                    <>
                      <p style={{ fontSize: 14, color: '#6E6E73', lineHeight: 1.6, marginBottom: 16 }}>{detail.desc}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {detail.systems.slice(0, 3).map(s => (
                          <span key={s} style={{ fontSize: 12, background: '#FFFFFF', border: '1px solid #E8E8ED', borderRadius: 980, padding: '4px 10px', color: '#6E6E73', fontWeight: 500 }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                  <div style={{ marginTop: 20, fontSize: 13, color: '#0071E3', fontWeight: 600 }}>Learn more →</div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '80px 24px', background: '#F5F5F7' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: 12 }}>
            Our Process
          </h2>
          <p style={{ fontSize: 16, color: '#6E6E73', marginBottom: 56 }}>From brief to commissioning — we own the entire delivery.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { step: '01', title: 'Site Survey', desc: 'We visit your space, understand acoustics, layout, and usage requirements.' },
              { step: '02', title: 'Design', desc: 'System design with BOQ, drawings, and brand recommendations.' },
              { step: '03', title: 'Supply', desc: 'Genuine products sourced from authorized brand channels.' },
              { step: '04', title: 'Install', desc: 'Professional installation by certified AV engineers.' },
              { step: '05', title: 'Commission', desc: 'Full testing, tuning, and user training before handover.' },
              { step: '06', title: 'Support', desc: 'AMC, warranty, and ongoing support after go-live.' },
            ].map(p => (
              <div key={p.step} style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, textAlign: 'left' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, color: '#0071E3', marginBottom: 12 }}>{p.step}</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 15, fontWeight: 700, color: '#1D1D1F', marginBottom: 8 }}>{p.title}</div>
                <p style={{ fontSize: 13, color: '#6E6E73', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: '#1D1D1F', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, color: '#FFFFFF', marginBottom: 16, letterSpacing: '-0.03em' }}>
          Ready to Get Started?
        </h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>
          Share your project requirements and we'll put together a design and quotation.
        </p>
        <Link href="/contact" style={{ display: 'inline-block', background: '#0071E3', color: '#FFFFFF', padding: '16px 40px', borderRadius: 980, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
          Request a Quotation
        </Link>
      </section>
    </main>
  )
}
