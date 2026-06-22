import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600

export const metadata: Metadata = {
  title: "About — AudioVisual Nepal | Nepal's Leading AV Company",
  description: 'AudioVisual Nepal has been delivering professional audio visual solutions across Nepal since 2010. Learn about our team, mission, and values.',
}

const TEAM = [
  { name: 'Sabin Adhikari', role: 'Managing Director', bio: 'AV industry veteran with 15+ years delivering enterprise solutions across Nepal and South Asia.' },
  { name: 'Technical Team', role: 'AV Engineers', bio: 'Certified engineers with expertise in PA systems, video conferencing, control systems, and network audio.' },
  { name: 'Project Team', role: 'Project Managers', bio: 'End-to-end project delivery — from site survey and design to installation and commissioning.' },
  { name: 'Support Team', role: 'After-Sales Support', bio: 'Dedicated support team for AMC, spare parts, and ongoing technical assistance.' },
]

const MILESTONES = [
  { year: '2010', event: 'Founded in Kathmandu with a focus on professional audio systems.' },
  { year: '2013', event: "Became authorized distributor for DSPPA — Nepal's first PA specialist." },
  { year: '2016', event: 'Expanded into video conferencing with Tenveo and Jabra.' },
  { year: '2019', event: 'Crossed 100 completed projects across 30+ districts.' },
  { year: '2022', event: 'Added IP network audio, control systems, and smart room solutions.' },
  { year: '2024', event: "Crossed 300+ projects. Nepal's most trusted AV solutions company." },
]

export default function AboutPage() {
  return (
    <main style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ background: '#1D1D1F', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#0071E3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Our Story</p>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: 20 }}>
            Nepal's Leading AV Company
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
            For over a decade, AudioVisual Nepal has been designing and delivering professional audio visual systems — from village community halls to five-star hotel ballrooms, from government boardrooms to university campuses.
          </p>
        </div>
      </section>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ background: '#F5F5F7', padding: '12px 24px', borderBottom: '1px solid #E8E8ED' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', fontSize: 13, color: '#6E6E73', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/" style={{ color: '#0071E3', textDecoration: 'none' }}>Home</Link>
          <span aria-hidden="true">›</span>
          <span style={{ color: '#1D1D1F', fontWeight: 500 }} aria-current="page">About</span>
        </div>
      </nav>

      {/* Mission & Values */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: 20 }}>Our Mission</h2>
              <p style={{ fontSize: 17, color: '#6E6E73', lineHeight: 1.8 }}>
                To make world-class professional audio visual technology accessible to every organization in Nepal — with genuine products, expert design, and reliable long-term support.
              </p>
            </div>
            <div style={{ display: 'grid', gap: 16 }}>
              {[
                { icon: '🎯', title: 'Genuine Only', desc: 'We never compromise on product authenticity. Every item is sourced directly from authorized channels.' },
                { icon: '🤝', title: 'Long-Term Partners', desc: 'We build relationships, not just installations. Our clients stay with us for maintenance and upgrades.' },
                { icon: '🏆', title: 'Best-in-Class', desc: "We only recommend what we'd install ourselves. No overselling, no unnecessary complexity." },
              ].map(v => (
                <div key={v.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 24, lineHeight: 1 }}>{v.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 15, fontWeight: 700, color: '#1D1D1F', marginBottom: 4 }}>{v.title}</div>
                    <div style={{ fontSize: 14, color: '#6E6E73', lineHeight: 1.6 }}>{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '64px 24px', background: '#0071E3' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, textAlign: 'center' }}>
            {[
              { num: '300+', label: 'Projects Completed' },
              { num: '14+', label: 'Years in Nepal' },
              { num: '37', label: 'Districts Served' },
              { num: '20+', label: 'Brand Partners' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 48, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.04em', lineHeight: 1 }}>{stat.num}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 8, fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '80px 24px', background: '#F5F5F7' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: 48, textAlign: 'center' }}>Our Journey</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {MILESTONES.map((m, i) => (
              <div key={m.year} style={{ display: 'flex', gap: 24, alignItems: 'flex-start', paddingBottom: i < MILESTONES.length - 1 ? 32 : 0 }}>
                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 15, fontWeight: 800, color: '#0071E3', width: 52 }}>{m.year}</div>
                  {i < MILESTONES.length - 1 && (
                    <div style={{ width: 2, height: 32, background: '#E8E8ED', margin: '8px auto 0' }} />
                  )}
                </div>
                <div style={{ background: '#FFFFFF', borderRadius: 12, padding: '16px 20px', flex: 1, border: '1px solid #E8E8ED' }}>
                  <p style={{ fontSize: 15, color: '#1D1D1F', lineHeight: 1.6, margin: 0 }}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: 48, textAlign: 'center' }}>The Team</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {TEAM.map(member => (
              <div key={member.name} style={{ background: '#F5F5F7', borderRadius: 20, padding: 28, border: '1px solid #E8E8ED' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#0071E3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16 }}>
                  👤
                </div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, fontWeight: 700, color: '#1D1D1F', marginBottom: 4 }}>{member.name}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>{member.role}</div>
                <p style={{ fontSize: 14, color: '#6E6E73', lineHeight: 1.6, margin: 0 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: '#1D1D1F', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, color: '#FFFFFF', marginBottom: 16, letterSpacing: '-0.03em' }}>
          Let's Work Together
        </h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>
          Tell us about your project — we'll design a solution that fits your space and budget.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" style={{ display: 'inline-block', background: '#0071E3', color: '#FFFFFF', padding: '16px 40px', borderRadius: 980, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
            Get in Touch
          </Link>
          <Link href="/projects" style={{ display: 'inline-block', background: 'transparent', color: '#FFFFFF', padding: '16px 40px', borderRadius: 980, fontSize: 16, fontWeight: 600, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.3)' }}>
            View Projects
          </Link>
        </div>
      </section>
    </main>
  )
}
