import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getProjects, getIndustries, stripHtml } from '@/lib/wordpress'
import { MapPin, ArrowRight } from 'lucide-react'
import NepalProjectMap from '@/components/solutions/NepalProjectMap'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Projects | Case Studies & Installations',
  description: 'Real AV installations across Nepal — hotels, corporate offices, schools, hospitals and more.',
  openGraph: {
    title: 'AV Projects Portfolio — Verified Installations Across Nepal',
    description: "Explore AudioVisual Nepal's verified completed projects — LED displays, PA and AV installations for banks, schools, cinemas, restaurants and retail across Nepal.",
    url: 'https://www.audiovisualnepal.com/projects',
    siteName: 'AudioVisual Nepal',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'AudioVisual Nepal' }],
    type: 'website',
  },
  alternates: { canonical: 'https://www.audiovisualnepal.com/projects' },
}

const fallbackProjects = [
  { title: 'Siddhartha Bank Head Office', location: 'Naxal, Kathmandu', type: 'Banking', img: '/images/projects-real/siddhartha-bank-head-office.webp' },
  { title: 'Jeevan Jyoti School', location: 'Kohalpur, Banke', type: 'Education', img: '/images/projects-real/jeevan-jyoti-school.webp' },
  { title: 'FCube Cinemas', location: 'Boudha, Kathmandu', type: 'Entertainment', img: '/images/projects-real/fcube-cinemas.webp' },
  { title: 'Dibya Ratna Consultant', location: 'Battisputali, Kathmandu', type: 'Corporate', img: '/images/projects-real/dibya-ratna-consultant.webp' },
  { title: 'Awarded International Education', location: 'Putalisadak, Kathmandu', type: 'Education', img: '/images/projects-real/awarded-international-education.webp' },
  { title: 'Auranex Restaurant', location: 'Townplanning, Kathmandu', type: 'Hospitality', img: '/images/projects-real/auranex-restaurant.webp' },
  { title: 'Inland Multi Cuisine & Stay', location: 'Budhanilkantha, Kathmandu', type: 'Hospitality', img: '/images/projects-real/inland-multi-cuisine-stay.webp' },
  { title: 'Anong Store', location: 'Jawalakhel, Lalitpur', type: 'Retail', img: '/images/projects-real/anong-store.webp' },
  { title: 'Shree Shiva Enterprises', location: 'Siddhipur, Lalitpur', type: 'Commercial', img: '/images/projects-real/shree-shiva-enterprises.webp' },
]


export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ industry?: string; page?: string }> }) {
  const sp       = await searchParams
  const industry = sp.industry
  const page     = Number(sp.page ?? 1)

  const [industries, projects] = await Promise.all([
    getIndustries(),
    getProjects({ industrySlug: industry, page, perPage: 12 }),
  ])

  return (
    <main style={{ paddingTop: 80, background: '#FFFFFF' }}>
      {/* Hero */}
      <section style={{ padding: '100px 24px 80px', background: 'linear-gradient(180deg, #F0F4F8 0%, #FFFFFF 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Our Portfolio</p>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>
            Projects &amp; Case Studies
          </h1>
          <p style={{ fontSize: 18, color: '#64748B', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
            From hotel ballrooms to corporate boardrooms — see how we&apos;ve transformed spaces across Nepal.
          </p>
        </div>
      </section>

      {/* Nepal project map */}
      <section style={{ padding: '0 24px 40px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <NepalProjectMap />
        </div>
      </section>

      {/* Industry Filter */}
      {industries.length > 0 && (
        <section style={{ padding: '20px 24px', background: '#F1F5F9', borderBottom: '1px solid rgba(11,30,61,0.05)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/projects" style={{ padding: '8px 20px', borderRadius: 980, fontSize: 13, fontWeight: 600, textDecoration: 'none', background: !industry ? '#3B82F6' : 'rgba(11,30,61,0.05)', color: !industry ? '#FFFFFF' : '#94A3B8', border: `1px solid ${!industry ? '#3B82F6' : 'rgba(11,30,61,0.1)'}` }}>All Projects</Link>
            {industries.map(ind => (
              <Link key={ind.id} href={`/projects?industry=${ind.slug}`} style={{ padding: '8px 20px', borderRadius: 980, fontSize: 13, fontWeight: 600, textDecoration: 'none', background: industry === ind.slug ? '#3B82F6' : 'rgba(11,30,61,0.05)', color: industry === ind.slug ? '#FFFFFF' : '#94A3B8', border: `1px solid ${industry === ind.slug ? '#3B82F6' : 'rgba(11,30,61,0.1)'}` }}>{ind.name}</Link>
            ))}
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {projects.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
              {projects.map(project => {
                const title    = stripHtml(project.title.rendered)
                const excerpt  = stripHtml(project.excerpt?.rendered ?? '').slice(0, 120) + '…'
                const location = project.meta?.location ?? 'Nepal'
                const thumb    = project.featured_image_url
                return (
                  <Link key={project.id} href={`/projects/${project.slug}`} style={{ textDecoration: 'none', display: 'block', background: '#FFFFFF', border: '1px solid rgba(11,30,61,0.1)', borderRadius: 20, overflow: 'hidden' }}>
                    <div style={{ position: 'relative', height: 220 }}>
                      {thumb ? (
                        <Image src={thumb} alt={title} fill style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ height: '100%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>🏗️</div>
                      )}
                    </div>
                    <div style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748B', marginBottom: 10 }}>
                        <MapPin size={11} />{location}
                      </div>
                      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 700, color: '#0B1E3D', lineHeight: 1.4, marginBottom: 8 }}>{title}</h2>
                      <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.65, marginBottom: 16 }}>{excerpt}</p>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#3B82F6', display: 'flex', alignItems: 'center', gap: 4 }}>View project <ArrowRight size={13} /></span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
              {fallbackProjects.map(p => (
                <div key={p.title} style={{ background: '#FFFFFF', border: '1px solid rgba(11,30,61,0.1)', borderRadius: 20, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 220 }}>
                    <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,13,26,0.8) 0%, transparent 50%)' }} />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 980, background: 'rgba(37,99,235,0.1)', color: '#60A5FA', border: '1px solid rgba(59,130,246,0.2)', marginBottom: 12 }}>{p.type}</span>
                    <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 700, color: '#0B1E3D', marginBottom: 8 }}>{p.title}</h2>
                    <p style={{ fontSize: 13, color: '#64748B', display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{p.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
