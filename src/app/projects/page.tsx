import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getProjects, getIndustries, stripHtml } from '@/lib/wordpress'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Projects — AudioVisual Nepal | Case Studies & Installations',
  description: 'Real AV installations across Nepal — hotels, corporate offices, schools, hospitals and more. See our portfolio of completed projects.',
}

const STATIC_PROJECTS = [
  { slug: '#', title: 'Hyatt Regency Kathmandu', client: 'Hyatt Regency', excerpt: 'Complete ballroom PA system with DSPPA column arrays, multi-zone background music across 8 zones and IP-controlled conference hall audio.', location: 'Kathmandu', industry: 'Hospitality', year: '2024', emoji: '🏨' },
  { slug: '#', title: 'NMB Bank Corporate Headquarters', client: 'NMB Bank Ltd.', excerpt: 'Board room video conferencing, ceiling microphone arrays and Dante-networked audio distribution across 3 floors of the head office.', location: 'Kathmandu', industry: 'Corporate', year: '2024', emoji: '🏦' },
  { slug: '#', title: 'Kathmandu University — Main Auditorium', client: 'Kathmandu University', excerpt: 'Line-array speaker system, wireless Shure microphone system and digital mixing console for 800-seat auditorium and campus PA.', location: 'Dhulikhel', industry: 'Education', year: '2023', emoji: '🎓' },
  { slug: '#', title: 'BICC Conference Centre', client: 'Bhrikutimandap', excerpt: 'International conference centre fitted with simultaneous interpretation booths, delegate voting system and high-capacity PA for 1,200 delegates.', location: 'Kathmandu', industry: 'Government', year: '2023', emoji: '🏛️' },
  { slug: '#', title: 'Grande International Hospital', client: 'Grande Hospital', excerpt: 'Hospital-wide IP audio paging system, nurse-call integrated zone announcements and emergency voice evacuation across 12 floors.', location: 'Kathmandu', industry: 'Healthcare', year: '2023', emoji: '🏥' },
  { slug: '#', title: 'Tribhuvan International Airport — Expansion', client: 'CAAN', excerpt: 'Passenger information and emergency broadcast IP audio system covering all new terminal gates, lounges and baggage claim areas.', location: 'Kathmandu', industry: 'Transportation', year: '2022', emoji: '✈️' },
  { slug: '#', title: 'Everest Hotel Luxury Suites', client: 'Everest Hotel', excerpt: 'Background music, pool-side weather-proof audio, banquet hall line arrays and in-room Bluetooth integration across 180 rooms.', location: 'Kathmandu', industry: 'Hospitality', year: '2022', emoji: '🌄' },
  { slug: '#', title: 'Nepal Electricity Authority HQ', client: 'NEA', excerpt: 'Multi-floor PA, secure boardroom conferencing with recording and emergency voice evacuation integrated with fire alarm panel.', location: 'Kathmandu', industry: 'Government', year: '2022', emoji: '⚡' },
  { slug: '#', title: 'Budhanilkantha School', client: 'Budhanilkantha School', excerpt: 'Campus-wide IP audio network, 40-zone classroom audio, outdoor sports field PA and digital podium system for the main hall.', location: 'Kathmandu', industry: 'Education', year: '2021', emoji: '📚' },
]

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string; page?: string }>
}) {
  const sp       = await searchParams
  const industry = sp.industry
  const page     = Number(sp.page ?? 1)

  const [industries, projects] = await Promise.all([
    getIndustries(),
    getProjects({ industrySlug: industry, page, perPage: 12 }),
  ])

  const useLive = projects.length > 0

  return (
    <main style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ background: '#1D1D1F', padding: '80px 24px 64px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#0071E3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Our Portfolio</p>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: 20 }}>
          Projects &amp; Case Studies
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', maxWidth: 520, margin: '0 auto' }}>
          From hotel ballrooms to corporate boardrooms — see how we&apos;ve transformed spaces across Nepal.
        </p>
      </section>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ background: '#F5F5F7', padding: '12px 24px', borderBottom: '1px solid #E8E8ED' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', fontSize: 13, color: '#6E6E73', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/" style={{ color: '#0071E3', textDecoration: 'none' }}>Home</Link>
          <span aria-hidden="true">›</span>
          <span style={{ color: '#1D1D1F', fontWeight: 500 }} aria-current="page">Projects</span>
        </div>
      </nav>

      {/* Industry Filter (live only) */}
      {useLive && industries.length > 0 && (
        <section style={{ background: '#F5F5F7', padding: '20px 24px', borderBottom: '1px solid #E8E8ED' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/projects" style={{ padding: '6px 18px', borderRadius: 980, fontSize: 13, fontWeight: 500, textDecoration: 'none', background: !industry ? '#0071E3' : '#FFFFFF', color: !industry ? '#FFFFFF' : '#1D1D1F', border: `1px solid ${!industry ? '#0071E3' : '#E8E8ED'}` }}>All Projects</Link>
            {industries.map(ind => (
              <Link key={ind.id} href={`/projects?industry=${ind.slug}`} style={{ padding: '6px 18px', borderRadius: 980, fontSize: 13, fontWeight: 500, textDecoration: 'none', background: industry === ind.slug ? '#0071E3' : '#FFFFFF', color: industry === ind.slug ? '#FFFFFF' : '#1D1D1F', border: `1px solid ${industry === ind.slug ? '#0071E3' : '#E8E8ED'}` }}>
                {ind.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section style={{ padding: '64px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {useLive ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
              {projects.map(project => {
                const title = stripHtml(project.title.rendered)
                const excerpt = stripHtml(project.excerpt.rendered).slice(0, 120)
                return (
                  <Link key={project.id} href={`/projects/${project.slug}`} style={{ textDecoration: 'none', display: 'block', background: '#FFFFFF', borderRadius: 20, border: '1px solid #E8E8ED', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', height: 240, background: '#1D1D1F' }}>
                      {project.featured_image_url
                        ? <Image src={project.featured_image_url} alt={title} fill style={{ objectFit: 'cover' }} />
                        : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>🏢</div>}
                      {project.meta.location && (
                        <div style={{ position: 'absolute', bottom: 14, left: 14, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', color: '#FFFFFF', padding: '4px 12px', borderRadius: 980, fontSize: 12, fontWeight: 500 }}>
                          📍 {project.meta.location}
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '24px' }}>
                      {project.meta.client && <div style={{ fontSize: 12, fontWeight: 600, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{project.meta.client}</div>}
                      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#1D1D1F', marginBottom: 10, lineHeight: 1.3 }}>{title}</h2>
                      {excerpt && <p style={{ fontSize: 14, color: '#6E6E73', lineHeight: 1.6, marginBottom: 16 }}>{excerpt}…</p>}
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#0071E3' }}>View Case Study →</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div>
              <p style={{ textAlign: 'center', fontSize: 14, color: '#6E6E73', marginBottom: 40 }}>Selected highlights from 500+ completed projects across Nepal</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
                {STATIC_PROJECTS.map((p, i) => (
                  <div key={i} style={{ background: '#FFFFFF', borderRadius: 20, border: '1px solid #E8E8ED', overflow: 'hidden' }}>
                    <div style={{ height: 200, background: '#1D1D1F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72 }}>{p.emoji}</div>
                    <div style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{p.client}</span>
                        <span style={{ fontSize: 11, color: '#ADB5BD' }}>·</span>
                        <span style={{ fontSize: 11, color: '#6E6E73' }}>{p.industry}</span>
                        <span style={{ fontSize: 11, color: '#ADB5BD' }}>·</span>
                        <span style={{ fontSize: 11, color: '#6E6E73' }}>📍 {p.location}</span>
                      </div>
                      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#1D1D1F', marginBottom: 10, lineHeight: 1.3 }}>{p.title}</h2>
                      <p style={{ fontSize: 14, color: '#6E6E73', lineHeight: 1.6 }}>{p.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {useLive && projects.length === 12 && (
            <div style={{ textAlign: 'center', marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center' }}>
              {page > 1 && (
                <Link href={`/projects?page=${page - 1}${industry ? `&industry=${industry}` : ''}`} style={{ padding: '10px 24px', border: '1px solid #E8E8ED', borderRadius: 980, fontSize: 14, color: '#1D1D1F', textDecoration: 'none' }}>← Previous</Link>
              )}
              <Link href={`/projects?page=${page + 1}${industry ? `&industry=${industry}` : ''}`} style={{ padding: '10px 24px', background: '#0071E3', color: '#fff', borderRadius: 980, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>Next Page →</Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#F5F5F7', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, textAlign: 'center' }}>
          {[{ num: '500+', label: 'Projects Completed' }, { num: '15+', label: 'Years Experience' }, { num: '77', label: 'Districts Served' }, { num: '98%', label: 'Client Satisfaction' }].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 48, fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.04em' }}>{s.num}</div>
              <div style={{ fontSize: 14, color: '#6E6E73', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: '#1D1D1F', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#FFFFFF', marginBottom: 16, letterSpacing: '-0.03em' }}>Ready to Start Your Project?</h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>Tell us about your space and we&apos;ll design the perfect AV solution.</p>
        <Link href="/contact" style={{ display: 'inline-block', background: '#0071E3', color: '#FFFFFF', padding: '16px 40px', borderRadius: 980, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>Start a Project</Link>
      </section>
    </main>
  )
}
