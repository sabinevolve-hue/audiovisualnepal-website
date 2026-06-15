import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getProjects, getIndustries, stripHtml } from '@/lib/wordpress'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Projects — AudioVisual Nepal | Case Studies & Installations',
  description: 'Real AV installations across Nepal — hotels, corporate offices, schools, hospitals and more. See our portfolio of completed projects.',
}

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
      <section style={{ background: '#1D1D1F', padding: '80px 24px 64px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#0071E3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Our Portfolio</p>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: 20 }}>
          Projects &amp; Case Studies
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', maxWidth: 520, margin: '0 auto' }}>
          From hotel ballrooms to corporate boardrooms — see how we've transformed spaces across Nepal.
        </p>
      </section>

      {/* Industry Filter */}
      {industries.length > 0 && (
        <section style={{ background: '#F5F5F7', padding: '20px 24px', borderBottom: '1px solid #E8E8ED' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/projects"
              style={{ padding: '6px 18px', borderRadius: 980, fontSize: 13, fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap', background: !industry ? '#0071E3' : '#FFFFFF', color: !industry ? '#FFFFFF' : '#1D1D1F', border: `1px solid ${!industry ? '#0071E3' : '#E8E8ED'}` }}>
              All Projects
            </Link>
            {industries.map(ind => (
              <Link key={ind.id} href={`/projects?industry=${ind.slug}`}
                style={{ padding: '6px 18px', borderRadius: 980, fontSize: 13, fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap', background: industry === ind.slug ? '#0071E3' : '#FFFFFF', color: industry === ind.slug ? '#FFFFFF' : '#1D1D1F', border: `1px solid ${industry === ind.slug ? '#0071E3' : '#E8E8ED'}` }}>
                {ind.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section style={{ padding: '64px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#6E6E73' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🏗️</div>
              <p style={{ fontSize: 18 }}>No projects yet — check back soon.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
              {projects.map(project => {
                const title  = stripHtml(project.title.rendered)
                const excerpt = stripHtml(project.excerpt.rendered).slice(0, 120)
                return (
                  <Link key={project.id} href={`/projects/${project.slug}`}
                    style={{ textDecoration: 'none', display: 'block', background: '#FFFFFF', borderRadius: 20, border: '1px solid #E8E8ED', overflow: 'hidden' }}>
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
                      {project.meta.client && (
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                          {project.meta.client}
                        </div>
                      )}
                      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#1D1D1F', marginBottom: 10, lineHeight: 1.3 }}>
                        {title}
                      </h2>
                      {excerpt && <p style={{ fontSize: 14, color: '#6E6E73', lineHeight: 1.6, marginBottom: 16 }}>{excerpt}…</p>}
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#0071E3' }}>View Case Study →</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Pagination */}
          {projects.length === 12 && (
            <div style={{ textAlign: 'center', marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center' }}>
              {page > 1 && (
                <Link href={`/projects?page=${page - 1}${industry ? `&industry=${industry}` : ''}`}
                  style={{ padding: '10px 24px', border: '1px solid #E8E8ED', borderRadius: 980, fontSize: 14, color: '#1D1D1F', textDecoration: 'none' }}>
                  ← Previous
                </Link>
              )}
              <Link href={`/projects?page=${page + 1}${industry ? `&industry=${industry}` : ''}`}
                style={{ padding: '10px 24px', background: '#0071E3', color: '#fff', borderRadius: 980, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
                Next Page →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Banner */}
      <section style={{ background: '#F5F5F7', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, textAlign: 'center' }}>
          {[
            { num: '500+', label: 'Projects Completed' },
            { num: '15+', label: 'Years Experience' },
            { num: '77', label: 'Districts Served' },
            { num: '98%', label: 'Client Satisfaction' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 48, fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.04em' }}>{s.num}</div>
              <div style={{ fontSize: 14, color: '#6E6E73', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: '#1D1D1F', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#FFFFFF', marginBottom: 16, letterSpacing: '-0.03em' }}>
          Ready to Start Your Project?
        </h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>
          Tell us about your space and we'll design the perfect AV solution.
        </p>
        <Link href="/contact"
          style={{ display: 'inline-block', background: '#0071E3', color: '#FFFFFF', padding: '16px 40px', borderRadius: 980, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
          Start a Project
        </Link>
      </section>
    </main>
  )
}
