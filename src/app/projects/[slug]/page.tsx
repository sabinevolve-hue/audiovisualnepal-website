import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProject, getProjectSlugs, getProjects, parseJsonMeta, stripHtml } from '@/lib/wordpress'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map(s => ({ slug: s }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project  = await getProject(slug)
  if (!project) return { title: 'Project Not Found' }
  const title = stripHtml(project.title.rendered)
  const desc  = project.meta.meta_description || stripHtml(project.excerpt.rendered).slice(0, 160)
  return {
    title: `${title} — AudioVisual Nepal Case Study`,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images: project.featured_image_url ? [project.featured_image_url] : [],
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const [project, related] = await Promise.all([
    getProject(slug),
    getProjects({ perPage: 3 }),
  ])

  if (!project || project.status !== 'publish') notFound()

  const title       = stripHtml(project.title.rendered)
  const productsUsed = parseJsonMeta<string[]>(project.meta.products_used, [])
  const relFiltered = related.filter(r => r.slug !== slug).slice(0, 3)

  return (
    <main style={{ paddingTop: 80 }}>
      {/* Hero Image */}
      <section style={{ position: 'relative', height: 480, background: '#1D1D1F', overflow: 'hidden' }}>
        {project.featured_image_url && (
          <Image src={project.featured_image_url} alt={title} fill style={{ objectFit: 'cover', opacity: 0.6 }} priority />
        )}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: '48px 48px' }}>
          <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto' }}>
            <nav style={{ display: 'flex', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 16, flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <Link href="/projects" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Projects</Link>
              <span>/</span>
              <span style={{ color: '#FFFFFF' }}>{title}</span>
            </nav>
            {project.meta.client && (
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                {project.meta.client}
              </div>
            )}
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', maxWidth: 720 }}>
              {title}
            </h1>
          </div>
        </div>
      </section>

      {/* Project Meta Strip */}
      <section style={{ background: '#F5F5F7', padding: '24px', borderBottom: '1px solid #E8E8ED' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {project.meta.client && (
            <div>
              <div style={{ fontSize: 11, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Client</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1D1D1F' }}>{project.meta.client}</div>
            </div>
          )}
          {project.meta.location && (
            <div>
              <div style={{ fontSize: 11, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Location</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1D1D1F' }}>{project.meta.location}</div>
            </div>
          )}
          {project.meta.completion_date && (
            <div>
              <div style={{ fontSize: 11, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Completed</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1D1D1F' }}>{project.meta.completion_date}</div>
            </div>
          )}
          {productsUsed.length > 0 && (
            <div>
              <div style={{ fontSize: 11, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Products Used</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1D1D1F' }}>{productsUsed.join(', ')}</div>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '64px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          {project.meta.challenge && (
            <div style={{ background: '#F5F5F7', borderRadius: 16, padding: 32, marginBottom: 40 }}>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 800, color: '#1D1D1F', marginBottom: 12 }}>The Challenge</h2>
              <p style={{ fontSize: 16, color: '#6E6E73', lineHeight: 1.7 }}>{project.meta.challenge}</p>
            </div>
          )}

          <div className="wp-content" style={{ fontSize: 17, lineHeight: 1.75, color: '#1D1D1F' }}
            dangerouslySetInnerHTML={{ __html: project.content.rendered }} />

          {/* Testimonial */}
          {project.meta.testimonial_quote && (
            <blockquote style={{ margin: '48px 0', borderLeft: '3px solid #0071E3', paddingLeft: 28 }}>
              <p style={{ fontSize: 20, fontStyle: 'italic', color: '#1D1D1F', lineHeight: 1.6, marginBottom: 16 }}>
                "{project.meta.testimonial_quote}"
              </p>
              {project.meta.testimonial_name && (
                <footer>
                  <strong style={{ fontSize: 14, color: '#1D1D1F' }}>{project.meta.testimonial_name}</strong>
                  {project.meta.testimonial_role && (
                    <span style={{ fontSize: 14, color: '#6E6E73' }}> — {project.meta.testimonial_role}</span>
                  )}
                </footer>
              )}
            </blockquote>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #0071E3, #005BB5)', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, color: '#FFFFFF', marginBottom: 14, letterSpacing: '-0.03em' }}>
          Need a Similar Solution?
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', marginBottom: 32 }}>
          Tell us about your project and we'll design the right system.
        </p>
        <Link href="/contact"
          style={{ display: 'inline-block', background: '#FFFFFF', color: '#0071E3', padding: '14px 36px', borderRadius: 980, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
          Start a Project
        </Link>
      </section>

      {/* Related Projects */}
      {relFiltered.length > 0 && (
        <section style={{ padding: '64px 24px', background: '#F5F5F7' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, color: '#1D1D1F', marginBottom: 32, textAlign: 'center' }}>More Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {relFiltered.map(rel => {
                const rTitle = stripHtml(rel.title.rendered)
                return (
                  <Link key={rel.id} href={`/projects/${rel.slug}`}
                    style={{ textDecoration: 'none', display: 'block', background: '#FFFFFF', borderRadius: 16, overflow: 'hidden', border: '1px solid #E8E8ED' }}>
                    <div style={{ position: 'relative', height: 180 }}>
                      {rel.featured_image_url
                        ? <Image src={rel.featured_image_url} alt={rTitle} fill style={{ objectFit: 'cover' }} />
                        : <div style={{ height: '100%', background: '#1D1D1F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>🏢</div>}
                    </div>
                    <div style={{ padding: '18px 20px' }}>
                      {rel.meta.client && <div style={{ fontSize: 11, color: '#0071E3', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>{rel.meta.client}</div>}
                      <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 15, fontWeight: 700, color: '#1D1D1F', lineHeight: 1.3 }}>{rTitle}</h3>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .wp-content h2 { font-family: Manrope, sans-serif; font-size: 26px; font-weight: 800; color: #1D1D1F; margin: 36px 0 14px; letter-spacing: -0.02em; }
        .wp-content h3 { font-family: Manrope, sans-serif; font-size: 20px; font-weight: 700; color: #1D1D1F; margin: 28px 0 10px; }
        .wp-content p { margin-bottom: 20px; }
        .wp-content ul, .wp-content ol { padding-left: 24px; margin-bottom: 20px; }
        .wp-content li { margin-bottom: 8px; }
        .wp-content img { width: 100%; height: auto; border-radius: 14px; margin: 24px 0; }
        .wp-content a { color: #0071E3; }
      `}</style>
    </main>
  )
}
