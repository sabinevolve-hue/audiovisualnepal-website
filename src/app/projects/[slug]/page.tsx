import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProject, getProjectSlugs, getProjects, parseJsonMeta, stripHtml } from '@/lib/wordpress'
import { MapPin, ArrowLeft } from 'lucide-react'

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
    title: `${title} — Case Study`,
    description: desc,
    openGraph: { title, description: desc, images: project.featured_image_url ? [project.featured_image_url] : [] },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const [project, related] = await Promise.all([
    getProject(slug),
    getProjects({ perPage: 3 }),
  ])

  if (!project || project.status !== 'publish') notFound()

  const title        = stripHtml(project.title.rendered)
  const productsUsed = parseJsonMeta<string[]>(project.meta.products_used, [])
  const relFiltered  = related.filter(r => r.slug !== slug).slice(0, 3)

  return (
    <main style={{ paddingTop: 80 }}>
      {/* Breadcrumb */}
      <nav
        className="px-6 py-3 text-[13px]"
        style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
      >
        <div className="container-site flex items-center gap-2 flex-wrap">
          <Link href="/" style={{ color: 'var(--brand)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/projects" style={{ color: 'var(--brand)', textDecoration: 'none' }}>Projects</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)' }}>{title}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="section-padding-sm px-6" style={{ background: 'linear-gradient(180deg, #F0F4F8 0%, #FFFFFF 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container-site">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-[13px] mb-6 transition-colors hover:text-[var(--brand)]"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
            <ArrowLeft size={13} /> Back to Projects
          </Link>

          {project.meta.client && (
            <p className="eyebrow mb-3">{project.meta.client}</p>
          )}
          <h1 className="heading-section mb-4 max-w-[760px]">{title}</h1>

          {project.meta.location && (
            <div className="flex items-center gap-1.5 text-[14px]" style={{ color: 'var(--text-secondary)' }}>
              <MapPin size={14} />
              {project.meta.location}
            </div>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {project.featured_image_url && (
        <div className="relative w-full overflow-hidden" style={{ height: 480 }}>
          <Image
            src={project.featured_image_url}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Project Meta Strip */}
      <section className="px-6 py-6" style={{ background: '#F1F5F9', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container-site flex gap-10 flex-wrap">
          {[
            { label: 'Client',    value: project.meta.client },
            { label: 'Location',  value: project.meta.location },
            { label: 'Completed', value: project.meta.completion_date },
            { label: 'Products',  value: productsUsed.length > 0 ? productsUsed.join(', ') : null },
          ].filter(m => m.value).map(m => (
            <div key={m.label}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.06em] mb-1" style={{ color: 'var(--text-tertiary)' }}>
                {m.label}
              </div>
              <div className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="section-padding px-6" style={{ background: '#FFFFFF' }}>
        <div className="container-site max-w-[860px]">
          {project.meta.challenge && (
            <div className="rounded-2xl p-8 mb-10" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
              <h2 className="font-display font-bold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>The Challenge</h2>
              <p className="text-[16px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.meta.challenge}</p>
            </div>
          )}

          <div
            className="wp-content"
            style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--text-primary)' }}
            dangerouslySetInnerHTML={{ __html: project.content.rendered }}
          />

          {/* Testimonial */}
          {project.meta.testimonial_quote && (
            <blockquote
              className="my-12 pl-7"
              style={{ borderLeft: '3px solid var(--brand)' }}
            >
              <p className="text-xl italic mb-4 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                &ldquo;{project.meta.testimonial_quote}&rdquo;
              </p>
              {project.meta.testimonial_name && (
                <footer>
                  <strong className="text-[14px]" style={{ color: 'var(--text-primary)' }}>
                    {project.meta.testimonial_name}
                  </strong>
                  {project.meta.testimonial_role && (
                    <span className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>
                      {' '}&mdash;{' '}{project.meta.testimonial_role}
                    </span>
                  )}
                </footer>
              )}
            </blockquote>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-padding-sm px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #F0F4F8 0%, #FFFFFF 100%)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="container-site">
          <h2 className="font-display font-bold text-3xl mb-3" style={{ color: 'var(--text-primary)' }}>
            Need a Similar Solution?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
            Tell us about your project and we&apos;ll design the right system.
          </p>
          <Link href="/contact" className="btn-primary">Start a Project</Link>
        </div>
      </section>

      {/* Related Projects */}
      {relFiltered.length > 0 && (
        <section className="section-padding px-6" style={{ background: 'var(--bg-subtle)' }}>
          <div className="container-site">
            <h2 className="font-display font-bold text-2xl mb-8 text-center" style={{ color: 'var(--text-primary)' }}>
              More Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relFiltered.map(rel => {
                const rTitle = stripHtml(rel.title.rendered)
                return (
                  <Link
                    key={rel.id}
                    href={`/projects/${rel.slug}`}
                    className="block rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(11,30,61,0.08)" }}
                    style={{ border: '1px solid var(--border-default)', textDecoration: 'none' }}
                  >
                    <div className="relative h-44">
                      {rel.featured_image_url
                        ? <Image src={rel.featured_image_url} alt={rTitle} fill className="object-cover" />
                        : <div className="h-full bg-[var(--bg-subtle)] flex items-center justify-center text-4xl">🏢</div>
                      }
                    </div>
                    <div className="p-5">
                      {rel.meta?.client && (
                        <div className="text-[11px] font-semibold mb-1 uppercase tracking-wide" style={{ color: 'var(--brand)' }}>
                          {rel.meta.client}
                        </div>
                      )}
                      <h3 className="font-display font-bold text-[15px] leading-snug" style={{ color: 'var(--text-primary)' }}>
                        {rTitle}
                      </h3>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .wp-content h2 { font-family: Manrope, sans-serif; font-size: 26px; font-weight: 800; color: var(--text-primary); margin: 36px 0 14px; letter-spacing: -0.02em; }
        .wp-content h3 { font-family: Manrope, sans-serif; font-size: 20px; font-weight: 700; color: var(--text-primary); margin: 28px 0 10px; }
        .wp-content p  { margin-bottom: 20px; color: var(--text-secondary); }
        .wp-content ul, .wp-content ol { padding-left: 24px; margin-bottom: 20px; }
        .wp-content li { margin-bottom: 8px; color: var(--text-secondary); }
        .wp-content img { width: 100%; height: auto; border-radius: 14px; margin: 24px 0; }
        .wp-content a  { color: var(--brand); }
      `}</style>
    </main>
  )
}
