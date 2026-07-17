import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600

export const metadata: Metadata = {
  title: "About | Nepal's Leading AV Company",
  description: 'AudioVisual Nepal has been delivering professional audio visual solutions across Nepal since 2010.',
  openGraph: {
    title: "About AudioVisual Nepal — Nepal's Leading AV Company",
    description: 'Since 2010, AudioVisual Nepal delivers professional AV and LED display installations across Nepal — 100+ verified projects and counting. Authorised distributor for DSPPA, InfoBit, Tenveo and Evolve Podium, and Lampro authorised partner.',
    url: 'https://www.audiovisualnepal.com/about',
    siteName: 'AudioVisual Nepal',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'AudioVisual Nepal' }],
    type: 'website',
  },
  alternates: { canonical: 'https://www.audiovisualnepal.com/about' },
}

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

      {/* What we do */}
      <section style={{ padding: '96px 24px', background: '#F1F5F9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>End to End</p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.03em' }}>What We Do</h2>
            <p style={{ fontSize: 17, color: '#64748B', maxWidth: 640, margin: '18px auto 0', lineHeight: 1.75 }}>
              From the first site survey to long-term maintenance, we handle the entire audio-visual project in-house — so you get one accountable partner instead of just a box on a pallet.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { t: 'Design & Consultation', d: 'Free site survey and system design sized to your space, sector and budget — delivered as a clear BOQ.' },
              { t: 'Genuine Supply', d: 'Authorised distribution of premium AV brands, with full manufacturer warranty on every product.' },
              { t: 'Installation & Commissioning', d: 'Licensed installation, wiring and commissioning — tested and handed over ready to use.' },
              { t: 'Service & Support', d: 'AMC contracts, spare parts and a dedicated service team across all 77 districts.' },
            ].map(item => (
              <div key={item.t} style={{ background: '#FFFFFF', border: '1px solid rgba(11,30,61,0.1)', borderRadius: 16, padding: '28px 24px' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, fontWeight: 700, color: '#0B1E3D', marginBottom: 10 }}>{item.t}</div>
                <div style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7 }}>{item.d}</div>
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
