import Image from 'next/image'
import Link from 'next/link'

const PLACES = [
  { img: '/images/nepal/himalaya-panorama.webp', label: 'All 77 districts', sub: 'Kathmandu to the high hills' },
  { img: '/images/nepal/pagoda-temple.webp', label: 'Heritage venues', sub: 'Temples, monasteries, durbar squares' },
  { img: '/images/heroes/corporate-hero.webp', label: 'Kathmandu valley', sub: 'Banks, offices, boardrooms' },
  { img: '/images/heroes/education-hero.webp', label: 'Beyond the valley', sub: 'Campuses in Banke, Pokhara, Biratnagar' },
]

export default function NepalBand() {
  return (
    <section style={{ background: '#0D1220', padding: '72px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ maxWidth: 620, marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#60A5FA', marginBottom: 12 }}>
            Built for Nepal
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.6vw,42px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#FFFFFF', marginBottom: 14, lineHeight: 1.15 }}>
            We know the buildings you work in
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.7, color: '#CBD5E1' }}>
            Brick-and-timber heritage halls, valley office towers, hill-district campuses and
            monsoon-exposed outdoor sites — systems specified for how buildings and weather
            actually behave here, delivered and serviced nationwide.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PLACES.map((p) => (
            <div key={p.label} style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '3/4', background: '#0B1E3D' }}>
              <Image src={p.img} alt={p.label} fill sizes="(max-width: 1024px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,12,22,0.9) 0%, rgba(8,12,22,0.25) 55%, rgba(8,12,22,0.05) 100%)' }} />
              <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>{p.label}</div>
                <div style={{ fontSize: 12.5, color: '#94A3B8', marginTop: 3, lineHeight: 1.4 }}>{p.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
          <Link href="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2563EB', color: '#FFFFFF', padding: '12px 26px', borderRadius: 999, fontSize: 14.5, fontWeight: 700, textDecoration: 'none' }}>
            See our installations across Nepal →
          </Link>
          <span style={{ fontSize: 13.5, color: '#64748B' }}>Verified projects · references on request</span>
        </div>
      </div>
    </section>
  )
}
