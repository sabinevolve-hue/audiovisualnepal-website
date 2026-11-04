import type { Metadata } from 'next'
import Link from 'next/link'
import { SOUND_GUIDES, PLANNED_GUIDES } from '@/data/soundGuides'
import { STATIC_ARTICLES } from '@/data/staticArticles'

const BASE = 'https://www.audiovisualnepal.com'
export const metadata: Metadata = {
  title: 'Sound System Design Guides for Nepal — Banquet, Conference, Concert, Theatre & More',
  description: 'Free venue-by-venue guides to designing professional sound systems in Nepal: banquet halls, conference halls, auditoriums, theatres, stadiums, outdoor concerts, KTV and studios — with system drawings and equipment lists.',
  alternates: { canonical: `${BASE}/guides` },
  openGraph: { title: 'Sound System Design Guides — AudioVisual Nepal', description: 'Venue system designs with drawings, equipment lists and FAQs.', url: `${BASE}/guides`, type: 'website', images: [{ url: '/images/itc-diagrams/itc-segment-map.png' }] },
}

export default function GuidesHub() {
  const ld = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Venue sound system design guides',
    itemListElement: SOUND_GUIDES.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: `${BASE}/guides/${g.slug}`, name: g.title })) }
  return (
    <main className="bg-white pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="bg-gradient-to-b from-slate-50 to-white px-6 py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-600">Knowledge base · Venue system design</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold text-slate-900 sm:text-5xl" style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.03em' }}>Sound system design guides</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">How we design professional sound for every kind of venue in Nepal — the room first, then the loudspeakers, microphones, mixing and power. Each guide includes a signal-flow drawing, a coverage plan and a recommended equipment list.</p>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOUND_GUIDES.map(g => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
              <div className="aspect-[16/9] overflow-hidden border-b border-slate-100 bg-white p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/itc-diagrams/itc-${g.diagramKey}-plan.svg`} alt={`${g.venue} sound system plan`} loading="lazy" className="h-full w-full object-contain" />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-orange-600">{g.venue} · {g.readMins} min</p>
                <h2 className="mt-1 text-lg font-extrabold leading-snug text-slate-900 group-hover:text-blue-600" style={{ fontFamily: 'Manrope, sans-serif' }}>{g.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{g.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-xl font-extrabold text-slate-900">More from the knowledge base</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {STATIC_ARTICLES.filter(a => !('href' in a)).map(a => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-800 hover:border-blue-400 hover:text-blue-600">{a.title.rendered} →</Link>
          ))}
        </div>
        <h2 className="mt-10 text-xl font-extrabold text-slate-900">Coming next</h2>
        <ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">{PLANNED_GUIDES.map(t => <li key={t} className="rounded-lg bg-slate-50 px-4 py-2">{t}</li>)}</ul>
      </section>
    </main>
  )
}
