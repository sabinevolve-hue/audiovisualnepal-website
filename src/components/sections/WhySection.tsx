'use client'

import { RevealSection, StaggerReveal } from '@/components/ui/RevealSection'

const reasons = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="20 6 9 17 4 12"/></svg>
    ),
    title: '100% Genuine Products',
    desc: 'Every product sourced directly from authorised manufacturers. No grey-market items — full manufacturer warranty on all goods.',
    color: '#0071E3',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
    ),
    title: 'Expert Installation',
    desc: 'Certified engineers handle acoustic design, system integration, commissioning and post-installation support.',
    color: '#7B2FBE',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
    title: 'All 77 Districts',
    desc: 'Projects delivered nationwide — from Kathmandu to remote municipalities. No location is too far.',
    color: '#1A7A3C',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    ),
    title: 'Fast Delivery',
    desc: 'Streamlined supply chain and experienced teams mean your project meets its deadline, every time.',
    color: '#CC6600',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
    ),
    title: 'After-Sales Support',
    desc: 'Dedicated service team for AMC, warranty claims, spare parts and ongoing technical assistance long after handover.',
    color: '#CC2200',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    ),
    title: 'Authorised Distributor',
    desc: 'Official distributor for DSPPA, ITC, Shure, JBL, Bose, Yamaha, TOA and Sennheiser in Nepal.',
    color: '#0F5FA0',
  },
]

export default function WhySection() {
  return (
    <section className="section-padding" style={{ background: '#111827' }}>
      <div className="container-site">
        <RevealSection className="text-center mb-14">
          <div className="eyebrow mb-3" style={{ color: '#60A5FA' }}>Why Choose Us</div>
          <h2 className="heading-section mb-4" style={{ color: '#FFFFFF' }}>The AudioVisual Nepal Difference</h2>
          <p className="text-[17px] max-w-[500px] mx-auto leading-relaxed" style={{ color: '#9CA3AF' }}>
            500+ completed projects and counting — here&apos;s why customers trust us.
          </p>
        </RevealSection>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.07}>
          {reasons.map((r) => (
            <div
              key={r.title}
              className="p-6 rounded-2xl"
              style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${r.color}22`, color: r.color, border: `1.5px solid ${r.color}35` }}
              >
                {r.icon}
              </div>
              <h3 className="font-display font-bold text-[16px] mb-2" style={{ color: '#F9FAFB' }}>{r.title}</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: '#9CA3AF' }}>{r.desc}</p>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
