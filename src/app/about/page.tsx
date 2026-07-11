import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600

export const metadata: Metadata = {
  title: "About | Nepal's Leading AV Company",
  description: 'AudioVisual Nepal has been delivering professional audio visual solutions across Nepal since 2010.',
  openGraph: {
    title: "About AudioVisual Nepal — Nepal's Leading AV Company",
    description: 'Since 2010, AudioVisual Nepal delivers professional AV and LED display installations across Nepal — 100+ verified projects and counting. Authorised distributor for DSPPA, InfoBit, Tenveo and Focus.',
    url: 'https://audiovisualnepal.com/about',
    siteName: 'AudioVisual Nepal',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'AudioVisual Nepal' }],
    type: 'website',
  },
  alternates: { canonical: 'https://audiovisualnepal.com/about' },
}

const MILESTONES = [
  { year: '2010', event: 'Founded in Kathmandu with a focus on professional audio systems.' },
  { year: '2013', event: "Became authorized distributor for DSPPA — Nepal's first PA specialist." },
  { year: '2016', event: 'Expanded into video conferencing with Tenveo and Jabra.' },
  { year: '2019', event: 'Crossed 100 completed projects across 77 districts.' },
  { year: '2022', event: 'Added IP network audio, control systems, and smart room solutions.' },
  { year: '2024', event: "Crossed 100+ verified installations across Nepal." },
]

export default function AboutPage() {
  return (
    <main style={{ paddingTop: 80, background: '#FFFFFF' }}>
      {/* Hero */}
      <section style={{ padding: '100px 24px 80px', background: 'linear-gradient(180deg, #F0F4F8 0%, #FFFFFF 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Our Story</p>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(40px,6vw,68px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 24 }}>
            Nepal&apos;s Most Trusted<br />AV Company
          </h1>
          <p style={{ fontSize: 19, color: '#64748B', lineHeight: 1.75, maxWidth: 620, margin: '0 auto' }}>
            For over a decade, AudioVisual Nepal has designed and delivered professional audio visual systems — from village community halls to five-star hotel ballrooms.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '72px 24px', background: '#F1F5F9', borderTop: '1px solid rgba(11,30,61,0.05)', borderBottom: '1px solid rgba(11,30,61,0.05)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 40, textAlign: 'center' }}>
            {[
              { num: '100+', label: 'Projects Completed' },
              { num: '15+', label: 'Years in Nepal' },
              { num: '77', label: 'Districts Served' },
              { num: '20+', label: 'Brand Partners' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 52, fontWeight: 800, color: '#3B82F6', letterSpacing: '-0.04em', lineHeight: 1 }}>{stat.num}</div>
                <div style={{ fontSize: 14, color: '#64748B', marginTop: 10, fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section style={{ padding: '96px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Our Mission</p>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.03em', marginBottom: 20, lineHeight: 1.15 }}>
                Making World-Class AV Accessible
              </h2>
              <p style={{ fontSize: 17, color: '#64748B', lineHeight: 1.85 }}>
                To make world-class professional audio visual technology accessible to every organization in Nepal — with genuine products, expert design, and reliable long-term support.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { title: 'Genuine Only', desc: 'We never compromise on product authenticity. Every item is sourced directly from authorized channels with full manufacturer warranty.' },
                { title: 'Long-Term Partners', desc: 'We build relationships, not just installations. Our clients stay with us for maintenance, upgrades, and expansions.' },
                { title: 'Best-in-Class', desc: "We only recommend what we'd install ourselves. No overselling, no unnecessary complexity — just the right solution." },
              ].map(v => (
                <div key={v.title} style={{ background: '#FFFFFF', border: '1px solid rgba(11,30,61,0.1)', borderRadius: 16, padding: '24px 28px' }}>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 700, color: '#0B1E3D', marginBottom: 8 }}>{v.title}</div>
                  <div style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7 }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '96px 24px', background: '#F1F5F9' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Since 2010</p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.03em' }}>Our Journey</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {MILESTONES.map((m, i) => (
              <div key={m.year} style={{ display: 'flex', gap: 28, alignItems: 'flex-start', paddingBottom: i < MILESTONES.length - 1 ? 36 : 0 }}>
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 800, color: '#3B82F6', width: 56, textAlign: 'center', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 8, padding: '4px 0' }}>{m.year}</div>
                  {i < MILESTONES.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 36, background: 'rgba(59,130,246,0.2)', marginTop: 8 }} />}
                </div>
                <div style={{ background: '#FFFFFF', border: '1px solid rgba(11,30,61,0.1)', borderRadius: 14, padding: '16px 22px', flex: 1 }}>
                  <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.65, margin: 0 }}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '96px 24px', background: 'linear-gradient(135deg, #F0F4F8 0%, #FFFFFF 100%)', textAlign: 'center', borderTop: '1px solid rgba(11,30,61,0.05)' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Work With Us</p>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#0B1E3D', marginBottom: 16, letterSpacing: '-0.03em' }}>
          Let&apos;s Build Something Great
        </h2>
        <p style={{ fontSize: 18, color: '#64748B', maxWidth: 480, margin: '0 auto 40px' }}>
          Tell us about your project — we&apos;ll design a solution that fits your space and budget.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" style={{ display: 'inline-block', background: '#3B82F6', color: '#0B1E3D', padding: '16px 40px', borderRadius: 980, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>Get in Touch</Link>
          <Link href="/projects" style={{ display: 'inline-block', background: 'transparent', color: '#0B1E3D', padding: '16px 40px', borderRadius: 980, fontSize: 16, fontWeight: 600, textDecoration: 'none', border: '1.5px solid rgba(11,30,61,0.15)' }}>View Projects</Link>
        </div>
      </section>
    </main>
  )
}
