import type { Metadata } from 'next'
import Link from 'next/link'
import { SOLUTIONS_NAV } from '@/lib/constants'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Solutions | AV for Every Industry',
  description: 'Professional AV solutions for corporate offices, government, education, hotels, hospitals, religious venues and more across Nepal.',
  openGraph: {
    title: 'AV Solutions for Every Sector',
    description: 'Professional audio visual solutions for corporate offices, government, education, hotels, hospitals, religious venues and transportation hubs across Nepal.',
    url: 'https://audiovisualnepal.com/solutions',
    siteName: 'AudioVisual Nepal',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'AudioVisual Nepal' }],
    type: 'website',
  },
  alternates: { canonical: 'https://audiovisualnepal.com/solutions' },
}

const SOLUTION_DETAILS: Record<string, { desc: string; systems: string[] }> = {
  '/solutions/corporate':          { desc: 'Smart meeting rooms, boardroom AV, BGM systems, and video walls for modern workplaces.',                     systems: ['Conference Room AV', 'Video Walls', 'BGM Systems', 'Room Booking Displays', 'Wireless Presentation'] },
  '/solutions/government':         { desc: 'Secure AV for ministries, provincial offices, courts, and public service centers.',                          systems: ['PA Systems', 'Video Conferencing', 'Digital Signage', 'Chamber AV', 'Translation Systems'] },
  '/solutions/education':          { desc: 'Interactive classrooms, campus PA, and auditorium AV for schools and universities.',                          systems: ['Campus PA', 'Interactive Displays', 'Auditorium Sound', 'Language Labs', 'Distance Learning'] },
  '/solutions/hotels':             { desc: 'Ballroom AV, restaurant BGM, pool audio, and guest room entertainment systems.',                              systems: ['Ballroom & Event AV', 'Restaurant BGM', 'Pool & Lobby Audio', 'Guest Room TV', 'IPTV Systems'] },
  '/solutions/hospitals':          { desc: 'Patient information displays, nurse call audio, and secure PA for healthcare.',                               systems: ['Patient Info Displays', 'Nurse Call Audio', 'Emergency PA', 'Waiting Room BGM', 'Conference Rooms'] },
  '/solutions/religious':          { desc: 'Crystal-clear sound systems for temples, churches, mosques, and monasteries.',                                systems: ['PA Sound Systems', 'Line Array Speakers', 'Wireless Microphones', 'Acoustic Treatment', 'Recording'] },
  '/solutions/transportation':     { desc: 'Announcement systems for airports, bus parks, and railway stations.',                                         systems: ['Public Address', 'FIDS Integration', 'Emergency Broadcasting', 'IP Audio Network', 'CCTV Integration'] },
  '/solutions/smart-meeting-rooms':{ desc: 'One-touch meeting room control with integrated AV, camera, and collaboration tools.',                         systems: ['One-Touch Control', '4K Video Conferencing', 'Wireless Sharing', 'Room Scheduling', 'Cloud Integration'] },
}

export default function SolutionsPage() {
  return (
    <main style={{ paddingTop: 80, background: '#FFFFFF' }}>
      {/* Hero */}
      <section style={{ padding: '100px 24px 80px', background: 'linear-gradient(180deg, #F0F4F8 0%, #FFFFFF 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Industry Solutions</p>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>
            Solutions for Every Space
          </h1>
          <p style={{ fontSize: 18, color: '#64748B', lineHeight: 1.7, maxWidth: 580, margin: '0 auto' }}>
            From government boardrooms to hotel ballrooms — we design and deliver complete AV systems for every environment.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {SOLUTIONS_NAV.map(sol => {
              const detail = SOLUTION_DETAILS[sol.href]
              return (
                <Link key={sol.href} href={sol.href} style={{ textDecoration: 'none', display: 'block', background: '#FFFFFF', border: '1px solid rgba(11,30,61,0.1)', borderRadius: 20, padding: '32px', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: 40, marginBottom: 20 }}>{sol.icon}</div>
                  <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 800, color: '#0B1E3D', marginBottom: 10 }}>{sol.label}</h2>
                  {detail && (
                    <>
                      <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.65, marginBottom: 16 }}>{detail.desc}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {detail.systems.slice(0, 3).map(s => (
                          <span key={s} style={{ fontSize: 12, background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 980, padding: '3px 10px', color: '#60A5FA', fontWeight: 500 }}>{s}</span>
                        ))}
                      </div>
                    </>
                  )}
                  <div style={{ marginTop: 20, fontSize: 13, color: '#3B82F6', fontWeight: 600 }}>Learn more →</div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '80px 24px', background: '#F1F5F9', borderTop: '1px solid rgba(11,30,61,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>How We Work</p>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.03em', marginBottom: 12 }}>Our Process</h2>
          <p style={{ fontSize: 16, color: '#64748B', marginBottom: 56 }}>From brief to commissioning — we own the entire delivery.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { step: '01', title: 'Site Survey', desc: 'We visit your space, understand acoustics, layout, and usage requirements.' },
              { step: '02', title: 'Design', desc: 'System design with BOQ, drawings, and brand recommendations.' },
              { step: '03', title: 'Supply', desc: 'Genuine products sourced from authorized brand channels.' },
              { step: '04', title: 'Install', desc: 'Professional installation by certified AV engineers.' },
              { step: '05', title: 'Commission', desc: 'Full testing, tuning, and user training before handover.' },
              { step: '06', title: 'Support', desc: 'AMC, warranty, and ongoing support after go-live.' },
            ].map(p => (
              <div key={p.step} style={{ background: '#FFFFFF', border: '1px solid rgba(11,30,61,0.1)', borderRadius: 16, padding: 24, textAlign: 'left' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, color: '#3B82F6', marginBottom: 12 }}>{p.step}</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 15, fontWeight: 700, color: '#0B1E3D', marginBottom: 8 }}>{p.title}</div>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '96px 24px', background: 'linear-gradient(135deg, #F0F4F8 0%, #FFFFFF 100%)', textAlign: 'center', borderTop: '1px solid rgba(11,30,61,0.05)' }}>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#0B1E3D', marginBottom: 16, letterSpacing: '-0.03em' }}>Ready to Get Started?</h2>
        <p style={{ fontSize: 18, color: '#64748B', maxWidth: 480, margin: '0 auto 40px' }}>Share your project requirements and we&apos;ll put together a design and quotation.</p>
        <Link href="/contact" style={{ display: 'inline-block', background: '#3B82F6', color: '#0B1E3D', padding: '16px 40px', borderRadius: 980, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>Request a Quotation</Link>
      </section>
    </main>
  )
}
