import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Careers — AudioVisual Nepal',
  description: "Join AudioVisual Nepal — Nepal's leading professional AV company. Explore open positions and career opportunities.",
}

export default function CareersPage() {
  return (
    <main style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--bg-base)' }}>
      <div className="container-site px-6 py-20 max-w-3xl">
        <h1 className="text-[40px] font-black text-white mb-4">Careers at AVN</h1>
        <p className="text-[20px] mb-12" style={{ color: 'var(--text-secondary)' }}>
          Help us build Nepal&apos;s most trusted professional AV company.
        </p>

        <div className="rounded-2xl p-8 mb-12" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
          <h2 className="text-[22px] font-bold text-white mb-4">We&apos;re Hiring</h2>
          <p className="text-[16px] leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            We&apos;re growing fast and always looking for talented people who are passionate about professional audio-visual technology. Whether you&apos;re an AV technician, sales professional, project manager, or engineer — we want to hear from you.
          </p>
          <p className="text-[16px] leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
            Send your CV and a brief note about the role you&apos;re interested in to{' '}
            <a href={`mailto:${SITE.email}`} className="text-white underline">{SITE.email}</a>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { role: 'AV Installation Technician', type: 'Full-time', location: 'Kathmandu' },
              { role: 'Sales Executive', type: 'Full-time', location: 'Kathmandu' },
              { role: 'Project Manager', type: 'Full-time', location: 'Kathmandu' },
              { role: 'Technical Support Engineer', type: 'Full-time', location: 'Kathmandu' },
            ].map(({ role, type, location }) => (
              <div key={role} className="p-5 rounded-xl" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)' }}>
                <h3 className="text-[16px] font-bold text-white mb-2">{role}</h3>
                <div className="flex gap-3 text-[12px]" style={{ color: 'var(--text-tertiary)' }}>
                  <span>{type}</span>
                  <span>·</span>
                  <span>{location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <a href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[15px] font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'var(--brand)' }}>
            Apply Now — Send Your CV
          </a>
          <p className="text-[13px] mt-4" style={{ color: 'var(--text-tertiary)' }}>Or call us at {SITE.phone}</p>
        </div>
      </div>
    </main>
  )
}
