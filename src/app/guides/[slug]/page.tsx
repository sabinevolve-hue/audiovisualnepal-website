import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { SOUND_GUIDES, GUIDE_BY_SLUG } from '@/data/soundGuides'
import type { ReactNode } from 'react'

const BASE = 'https://www.audiovisualnepal.com'
type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return SOUND_GUIDES.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const g = GUIDE_BY_SLUG[slug]
  if (!g) return { title: 'Guide not found' }
  return {
    title: g.title,
    description: g.description,
    keywords: g.keywords,
    alternates: { canonical: `${BASE}/guides/${g.slug}` },
    openGraph: { title: g.title, description: g.description, type: 'article', url: `${BASE}/guides/${g.slug}`, images: [{ url: g.diagramKey ? `/images/itc-diagrams/itc-${g.diagramKey}-flow.png` : g.hero }] },
  }
}

/** Renders "text [label](/href) more" with internal links. */
function Rich({ text }: { text: string }) {
  const out: ReactNode[] = []
  const re = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0, m: RegExpExecArray | null, i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    out.push(<Link key={i++} href={m[2]} className="font-semibold text-blue-600 hover:underline">{m[1]}</Link>)
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return <>{out}</>
}
const strip = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const g = GUIDE_BY_SLUG[slug]
  if (!g) notFound()
  const others = SOUND_GUIDES.filter(x => x.slug !== g.slug)
  const ld = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.description, datePublished: g.date, dateModified: g.date,
      image: g.diagramKey ? `${BASE}/images/itc-diagrams/itc-${g.diagramKey}-flow.png` : `${BASE}${g.hero}`, author: { '@type': 'Organization', name: 'AudioVisual Nepal' },
      publisher: { '@type': 'Organization', name: 'AudioVisual Nepal', url: BASE }, mainEntityOfPage: `${BASE}/guides/${g.slug}`, keywords: g.keywords.join(', ') },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: g.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE }, { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guides` },
      { '@type': 'ListItem', position: 3, name: g.venue, item: `${BASE}/guides/${g.slug}` }] },
  ]
  return (
    <main className="bg-white pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-3">
        <nav className="mx-auto flex max-w-5xl items-center gap-1.5 text-[13px] text-slate-500">
          <Link href="/" className="hover:text-slate-900">Home</Link><ChevronRight size={13} />
          <Link href="/guides" className="hover:text-slate-900">Guides</Link><ChevronRight size={13} />
          <span className="font-semibold text-slate-900">{g.venue}</span>
        </nav>
      </div>
      <article className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">{g.diagramKey ? 'Venue system design' : 'Technology & buying guide'} · {g.readMins} min read</p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl" style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>{g.title}</h1>
        <p className="mt-3 text-lg text-slate-500">{g.description}</p>
        <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl bg-slate-900">
          <Image src={g.hero} alt={`${g.venue} sound system`} fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
        </div>
        {g.intro.map((p, i) => <p key={i} className="mt-6 text-[17px] leading-relaxed text-slate-700"><Rich text={p} /></p>)}

        <nav aria-label="On this page" className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">On this page</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
            {g.sections.map((s, i) => <li key={i}><a href={`#s${i}`} className="hover:text-blue-600">{s.h}</a></li>)}
            {g.diagramKey && <li><a href="#design" className="hover:text-blue-600">System design drawings</a></li>}
            <li><a href="#kit" className="hover:text-blue-600">Recommended equipment</a></li>
            <li><a href="#faq" className="hover:text-blue-600">FAQ</a></li>
          </ol>
        </nav>

        {g.sections.map((s, i) => (
          <section key={i} id={`s${i}`} className="scroll-mt-24">
            <h2 className="mt-10 text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>{s.h}</h2>
            {s.p?.map((p, j) => <p key={j} className="mt-4 leading-relaxed text-slate-600"><Rich text={p} /></p>)}
            {s.list && <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">{s.list.map((l, j) => <li key={j}><Rich text={l} /></li>)}</ul>}
          </section>
        ))}

        {g.diagramKey && <section id="design" className="scroll-mt-24">
          <h2 className="mt-12 text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>System design drawings</h2>
          <p className="mt-3 text-slate-600">Indicative AudioVisual Nepal design for a typical {g.venue.toLowerCase()} — signal flow and loudspeaker coverage. Quantities are confirmed on a free site survey.</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/itc-diagrams/itc-${g.diagramKey}-flow.svg`} alt={`${g.venue} sound system signal flow`} className="mt-5 w-full rounded-xl border border-slate-200" loading="lazy" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/itc-diagrams/itc-${g.diagramKey}-plan.svg`} alt={`${g.venue} loudspeaker plan view and coverage`} className="mt-4 w-full rounded-xl border border-slate-200" loading="lazy" />
        </section>}

        <section id="kit" className="scroll-mt-24">
          <h2 className="mt-12 text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Recommended equipment</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Role</th><th className="px-4 py-3">Model</th><th className="px-4 py-3">Why</th></tr></thead>
              <tbody>
                {g.kit.map(k => (
                  <tr key={k.role} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-semibold text-slate-900">{k.role}</td>
                    <td className="px-4 py-3"><Link href={k.href} className="font-semibold text-blue-600 hover:underline">{k.model}</Link></td>
                    <td className="px-4 py-3 text-slate-600">{k.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24">
          <h2 className="mt-12 text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {g.faq.map(f => (
              <details key={f.q} className="rounded-xl border border-slate-200 p-4">
                <summary className="cursor-pointer font-semibold text-slate-900">{f.q}</summary>
                <p className="mt-2 text-slate-600">{strip(f.a)}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-12 rounded-2xl bg-slate-900 p-8 text-center text-white">
          <h2 className="text-xl font-extrabold" style={{ fontFamily: 'Manrope, sans-serif' }}>{g.diagramKey ? `Planning a ${g.venue.toLowerCase()} sound system?` : 'Want an engineer to check your plan?'}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-300">Free site survey, system design and an itemised quotation from our engineers.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href={`/contact?product=${encodeURIComponent(g.venue + ' sound system')}`} className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">Request a design</Link>
            <Link href="/brands/itc" className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Browse itc pro sound</Link>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-lg font-extrabold text-slate-900">More guides</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {others.map(o => <Link key={o.slug} href={`/guides/${o.slug}`} className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-700 hover:border-blue-400 hover:text-blue-600">{o.venue} →</Link>)}
          </div>
        </section>
      </article>
    </main>
  )
}
