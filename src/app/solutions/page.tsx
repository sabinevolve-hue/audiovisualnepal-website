import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SOLUTIONS_NAV } from '@/lib/constants'
import Reveal from '@/components/solutions/Reveal'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'AV Solutions for Every Industry in Nepal',
  description:
    'Professional AV solutions for corporate offices, government, education, hotels, hospitals, religious venues and transportation hubs across Nepal — designed, supplied and installed by AudioVisual Nepal.',
  openGraph: {
    title: 'AV Solutions for Every Sector | AudioVisual Nepal',
    description:
      'Professional audio visual solutions for corporate offices, government, education, hotels, hospitals, religious venues and transportation hubs across Nepal.',
    url: 'https://audiovisualnepal.com/solutions',
    siteName: 'AudioVisual Nepal',
    images: [{ url: '/images/heroes/corporate-hero.webp', width: 1376, height: 768 }],
    type: 'website',
  },
  alternates: { canonical: 'https://audiovisualnepal.com/solutions' },
}

const DETAILS: Record<string, { desc: string; tags: string[]; project: string }> = {
  '/solutions/corporate': { desc: 'Smart meeting rooms, boardroom AV, background music and video walls for modern workplaces.', tags: ['Conference Room AV', 'Video Walls', 'BGM Systems'], project: 'NIC Asia Bank HQ · Kathmandu' },
  '/solutions/government': { desc: 'Delegate conferencing, smart podiums and secure PA for ministries and public offices.', tags: ['Conference Systems', 'Smart Podiums', 'IP PA'], project: 'Province 1 CM Office · Biratnagar' },
  '/solutions/education': { desc: 'Smart podiums, classroom audio and campus-wide PA with scheduled bells.', tags: ['Campus PA', 'Smart Podiums', 'Classroom Audio'], project: 'Kathmandu University · Dhulikhel' },
  '/solutions/hotels': { desc: 'Ballroom sound, multi-zone background music and event AV for hotels and resorts.', tags: ['Ballroom Sound', 'BGM Zones', 'Event AV'], project: 'Hyatt Regency · Kathmandu' },
  '/solutions/hospitals': { desc: 'Zone paging, nurse-station announcements and EN54 voice evacuation for healthcare.', tags: ['IP Paging', 'Voice Evacuation', 'Signage'], project: 'Grande International Hospital · Kathmandu' },
  '/solutions/religious': { desc: 'High-clarity sound for temples, churches, mosques and monasteries.', tags: ['Column Speakers', 'Horn Speakers', 'Scheduled Broadcast'], project: 'Pashupatinath Temple Complex · Kathmandu' },
  '/solutions/transportation': { desc: 'IP network PA and passenger information audio for airports and transit hubs.', tags: ['IP PA Backbone', 'Zone Paging', 'FIDS Integration'], project: 'Tribhuvan International Airport · Kathmandu' },
  '/solutions/smart-meeting-rooms': { desc: 'One-touch hybrid meeting rooms with AI cameras and wireless presentation.', tags: ['AI Cameras', 'Wireless Sharing', 'One-Touch Control'], project: 'Leapfrog HQ · Kathmandu' },
}

const STEPS = [
  { n: '01', t: 'Site Survey', d: 'We visit your space, understand acoustics, layout, and usage requirements.' },
  { n: '02', t: 'Design', d: 'System design with BOQ, drawings, and brand recommendations.' },
  { n: '03', t: 'Supply', d: 'Genuine products sourced from authorized brand channels.' },
  { n: '04', t: 'Install', d: 'Professional installation by certified AV engineers.' },
  { n: '05', t: 'Commission', d: 'Full testing, tuning, and user training before handover.' },
  { n: '06', t: 'Support', d: 'AMC, warranty, and ongoing support after go-live.' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AV Solutions by Industry',
  itemListElement: SOLUTIONS_NAV.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: s.label,
    url: `https://audiovisualnepal.com${s.href}`,
  })),
}

export default function SolutionsPage() {
  return (
    <main className="pt-20 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative flex min-h-[46vh] items-end overflow-hidden bg-slate-900">
        <Image
          src="/images/heroes/corporate-hero.webp"
          alt="Professional AV installation in a Kathmandu boardroom"
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">Industry solutions</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold text-white sm:text-5xl" style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.03em' }}>
            Solutions for every space
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-200">
            From government chambers to hotel ballrooms — complete AV systems designed, supplied and installed across Nepal.
          </p>
        </div>
      </section>

      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-4 text-sm font-medium text-slate-600">
          <span>Authorized distributor — 4 brands</span>
          <span className="hidden text-slate-300 sm:inline">•</span>
          <span>500+ projects delivered</span>
          <span className="hidden text-slate-300 sm:inline">•</span>
          <span>All 77 districts</span>
          <span className="hidden text-slate-300 sm:inline">•</span>
          <span>100% genuine, manufacturer warranty</span>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS_NAV.map((sol, i) => {
            const d = DETAILS[sol.href]
            const slug = sol.href.replace('/solutions/', '')
            return (
              <Reveal key={sol.href} delay={(i % 3) * 0.06}>
                <Link
                  href={sol.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    <Image
                      src={`/images/heroes/${slug}-hero.webp`}
                      alt={`${sol.label} AV solution in Nepal`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {sol.label}
                    </h2>
                    {d && (
                      <>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.desc}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {d.tags.map((t) => (
                            <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{t}</span>
                          ))}
                        </div>
                        <p className="mt-4 text-xs text-slate-400">Featured: {d.project}</p>
                      </>
                    )}
                    <p className="mt-auto pt-4 text-sm font-semibold text-blue-600">
                      Explore solution <span className="inline-block transition group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">How we work</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              From brief to commissioning — we own the entire delivery
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-blue-500 text-sm font-bold text-blue-600">
                      {s.n}
                    </span>
                    <span className="hidden h-0.5 flex-1 bg-slate-200 lg:block" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-bold text-slate-900">{s.t}</h3>
                  <p className="mt-1 text-sm text-slate-600">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
        <Reveal>
          <h2 className="text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Ready to get started?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            Share your project requirements and we&apos;ll put together a design and quotation.
          </p>
          <Link href="/contact" className="mt-8 inline-block rounded-full bg-blue-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
            Request a Quotation
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
