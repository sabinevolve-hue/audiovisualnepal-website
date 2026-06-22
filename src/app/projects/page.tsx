import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getProjects, getIndustries, stripHtml } from '@/lib/wordpress'
import { MapPin, ArrowRight } from 'lucide-react'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Projects — AudioVisual Nepal | Case Studies & Installations',
  description: 'Real AV installations across Nepal — hotels, corporate offices, schools, hospitals and more. See our portfolio of completed projects.',
}

const fallbackProjects = [
  { title: 'Grand Hyatt Conference Centre', location: 'Kathmandu', type: 'Hotel', color: '#0071E3', emoji: '🏨' },
  { title: 'Nepal Telecom HQ Boardrooms', location: 'Kathmandu', type: 'Corporate', color: '#34C759', emoji: '🏢' },
  { title: 'Tribhuvan University Auditorium', location: 'Kirtipur', type: 'Education', color: '#FF9500', emoji: '🎓' },
  { title: 'Bir Hospital ICU System', location: 'Kathmandu', type: 'Healthcare', color: '#FF3B30', emoji: '🏥' },
  { title: 'Pokhara Convention Centre', location: 'Pokhara', type: 'Events', color: '#AF52DE', emoji: '🎪' },
  { title: 'Nepal Army HQ PA System', location: 'Kathmandu', type: 'Government', color: '#5856D6', emoji: '🏛️' },
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

  return (
    <main style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section
        className="section-padding-sm px-6 text-center"
        style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="container-site">
          <p className="eyebrow mb-4">Our Portfolio</p>
          <h1 className="heading-section mb-4">Projects &amp; Case Studies</h1>
          <p className="text-lg max-w-[520px] mx-auto" style={{ color: 'var(--text-secondary)' }}>
            From hotel ballrooms to corporate boardrooms — see how we&apos;ve transformed spaces across Nepal.
          </p>
        </div>
      </section>

      {/* Industry Filter */}
      {industries.length > 0 && (
        <section className="px-6 py-4 bg-white" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="container-site flex gap-2 flex-wrap justify-center">
            <Link
              href="/projects"
              className="px-4 py-1.5 rounded-full text-[13px] font-medium"
              style={{
                background: !industry ? 'var(--brand)' : 'white',
                color: !industry ? 'white' : 'var(--text-secondary)',
                border: `1px solid ${!industry ? 'var(--brand)' : 'var(--border-default)'}`,
                textDecoration: 'none',
              }}
            >
              All Projects
            </Link>
            {industries.map(ind => (
              <Link
                key={ind.id}
                href={`/projects?industry=${ind.slug}`}
                className="px-4 py-1.5 rounded-full text-[13px] font-medium"
                style={{
                  background: industry === ind.slug ? 'var(--brand)' : 'white',
                  color: industry === ind.slug ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${industry === ind.slug ? 'var(--brand)' : 'var(--border-default)'}`,
                  textDecoration: 'none',
                }}
              >
                {ind.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section className="section-padding bg-white px-6">
        <div className="container-site">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map(project => {
                const title    = stripHtml(project.title.rendered)
                const excerpt  = stripHtml(project.excerpt?.rendered ?? '').slice(0, 120) + '…'
                const location = project.meta?.location ?? 'Nepal'
                const thumb    = project.featured_image_url

                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group block rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                    style={{ border: '1px solid var(--border-default)', textDecoration: 'none' }}
                  >
                    <div className="relative h-52 overflow-hidden bg-[var(--bg-subtle)]">
                      {thumb ? (
                        <Image src={thumb} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-5xl" style={{ background: 'var(--bg-subtle)' }}>🏗️</div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-1.5 mb-3 text-[12px]" style={{ color: 'var(--text-tertiary)' }}>
                        <MapPin size={11} />
                        {location}
                      </div>
                      <h2 className="font-display font-bold text-[16px] leading-snug mb-2 line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                        {title}
                      </h2>
                      <p className="text-[13px] leading-relaxed line-clamp-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
                        {excerpt}
                      </p>
                      <span className="text-[13px] font-semibold flex items-center gap-1 transition-colors group-hover:gap-2" style={{ color: 'var(--brand)' }}>
                        View project <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            /* Static fallback */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {fallbackProjects.map(p => (
                <div
                  key={p.title}
                  className="rounded-2xl overflow-hidden bg-white"
                  style={{ border: '1px solid var(--border-default)' }}
                >
                  <div className="h-48 flex items-center justify-center text-5xl" style={{ background: `${p.color}12` }}>
                    {p.emoji}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${p.color}15`, color: p.color }}>
                        {p.type}
                      </span>
                    </div>
                    <h2 className="font-display font-bold text-[16px] mb-2" style={{ color: 'var(--text-primary)' }}>{p.title}</h2>
                    <p className="text-[13px] flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                      <MapPin size={11} />{p.location}
                    </p>
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
