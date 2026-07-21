import Image from 'next/image'
import Link from 'next/link'

const FEATURED = [
  { label: 'Corporate Offices', href: '/solutions/corporate', img: '/images/heroes/corporate-hero.webp',
    desc: 'One-touch boardrooms, lobby video walls and zone-controlled background music.' },
  { label: 'Government Projects', href: '/solutions/government', img: '/images/heroes/government-hero.webp',
    desc: 'Delegate conferencing, smart podiums and secure PA for ministries and public offices.' },
  { label: 'Education', href: '/solutions/education', img: '/images/heroes/education-hero.webp',
    desc: 'Smart podiums, classroom audio and campus-wide PA with scheduled bells.' },
  { label: 'Hotels & Hospitality', href: '/solutions/hotels', img: '/images/heroes/hotels-hero.webp',
    desc: 'Ballroom sound, multi-zone background music and event AV for hotels and resorts.' },
]

const REST = [
  { label: 'Hospitals', href: '/solutions/hospitals' },
  { label: 'Religious Places', href: '/solutions/religious' },
  { label: 'Transportation', href: '/solutions/transportation' },
  { label: 'Smart Meeting Rooms', href: '/solutions/smart-meeting-rooms' },
]

export default function SolutionsSection() {
  return (
    <section className="section-padding" style={{ background: '#FFFFFF', borderTop: '1px solid rgba(11,30,61,0.06)' }}>
      <div className="container-site">
        <div className="mb-12" style={{ maxWidth: 640 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563EB', marginBottom: 12 }}>Industries we serve</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,4vw,48px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0B1E3D', marginBottom: 16 }}>
            Solutions for every space in Nepal
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569' }}>
            From ministry chambers in Kathmandu to school halls in the hills — complete AV systems
            designed, supplied and installed for each sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED.map((s) => (
            <Link key={s.href} href={s.href} className="group" style={{ textDecoration: 'none', display: 'block', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(11,30,61,0.08)', background: '#FFFFFF' }}>
              <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#0B1E3D' }}>
                <Image
                  src={s.img}
                  alt={`${s.label} AV solutions in Nepal`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,30,61,0.72) 0%, rgba(11,30,61,0.1) 55%, transparent 100%)' }} />
                <h3 style={{ position: 'absolute', left: 24, bottom: 18, color: '#FFFFFF', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>
                  {s.label}
                </h3>
              </div>
              <div style={{ padding: '20px 24px 22px' }}>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#64748B', marginBottom: 12 }}>{s.desc}</p>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: '#2563EB' }}>Explore solution →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600 }}>Also serving:</span>
          {REST.map((s) => (
            <Link key={s.href} href={s.href} style={{ fontSize: 13.5, fontWeight: 600, color: '#475569', textDecoration: 'none', border: '1px solid rgba(11,30,61,0.12)', borderRadius: 999, padding: '7px 16px' }}>
              {s.label}
            </Link>
          ))}
          <Link href="/solutions" style={{ fontSize: 13.5, fontWeight: 700, color: '#2563EB', textDecoration: 'none', padding: '7px 4px' }}>
            See all 8 industries →
          </Link>
        </div>
      </div>
    </section>
  )
}
