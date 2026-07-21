import Image from 'next/image'
import Link from 'next/link'

const SOLUTIONS = [
  { label: 'Corporate Offices', href: '/solutions/corporate', img: '/images/heroes/corporate-hero.webp', tag: 'Boardrooms · Video walls' },
  { label: 'Government', href: '/solutions/government', img: '/images/heroes/government-hero.webp', tag: 'Chambers · Smart podiums' },
  { label: 'Education', href: '/solutions/education', img: '/images/heroes/education-hero.webp', tag: 'Campus PA · Classrooms' },
  { label: 'Hotels & Hospitality', href: '/solutions/hotels', img: '/images/heroes/hotels-hero.webp', tag: 'Ballrooms · BGM zones' },
  { label: 'Hospitals', href: '/solutions/hospitals', img: '/images/heroes/hospitals-hero.webp', tag: 'Paging · Voice evacuation' },
  { label: 'Religious Places', href: '/solutions/religious', img: '/images/heroes/religious-hero.webp', tag: 'Temples · Mosques · Churches' },
  { label: 'Transportation', href: '/solutions/transportation', img: '/images/heroes/transportation-hero.webp', tag: 'Airports · Bus parks' },
  { label: 'Smart Meeting Rooms', href: '/solutions/smart-meeting-rooms', img: '/images/heroes/smart-meeting-rooms-hero.webp', tag: 'AI cameras · Wireless' },
]

export default function SolutionsSection() {
  return (
    <section className="section-padding" style={{ background: '#FFFFFF', borderTop: '1px solid rgba(11,30,61,0.06)' }}>
      <div className="container-site">
        <div className="mb-10" style={{ maxWidth: 620 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563EB', marginBottom: 12 }}>Industries we serve</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.8vw,44px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0B1E3D', marginBottom: 14, lineHeight: 1.15 }}>
            Solutions for every space in Nepal
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.7, color: '#475569' }}>
            From ministry chambers in Kathmandu to school halls in the hills — eight sectors,
            one engineering team, complete systems designed and installed nationwide.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {SOLUTIONS.map((s) => (
            <Link key={s.href} href={s.href} className="group" style={{ textDecoration: 'none', display: 'block', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(11,30,61,0.08)', background: '#FFFFFF' }}>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#0B1E3D' }}>
                <Image
                  src={s.img}
                  alt={`${s.label} AV solutions in Nepal`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,30,61,0.78) 0%, rgba(11,30,61,0.08) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', left: 14, right: 12, bottom: 12 }}>
                  <h3 style={{ color: '#FFFFFF', fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                    {s.label}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 11.5, marginTop: 3, lineHeight: 1.35 }}>{s.tag}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
          <Link href="/solutions" style={{ fontSize: 14, fontWeight: 700, color: '#2563EB', textDecoration: 'none' }}>
            Compare all solutions →
          </Link>
          <span style={{ color: 'rgba(11,30,61,0.15)' }}>|</span>
          <Link href="/solution-finder" style={{ fontSize: 14, fontWeight: 600, color: '#475569', textDecoration: 'none' }}>
            Not sure which fits? Try the solution finder
          </Link>
        </div>
      </div>
    </section>
  )
}
