'use client'

const reasons = [
  {
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="20 6 9 17 4 12"/></svg>),
    title: '100% Genuine Products',
    desc: 'Every product sourced directly from authorised manufacturers — full manufacturer warranty on all goods.',
    color: '#2563EB',
  },
  {
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>),
    title: 'Expert Installation',
    desc: 'Certified engineers handle acoustic design, system integration, commissioning and post-installation support.',
    color: '#7C3AED',
  },
  {
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
    title: 'All 77 Districts',
    desc: 'Projects delivered nationwide — from Kathmandu to remote municipalities across all of Nepal.',
    color: '#059669',
  },
  {
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>),
    title: 'Fast Delivery',
    desc: 'Streamlined supply chain and experienced teams mean your project meets its deadline, every time.',
    color: '#D97706',
  },
  {
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>),
    title: 'After-Sales Support',
    desc: 'Dedicated service team for AMC, warranty claims, spare parts and ongoing technical assistance after handover.',
    color: '#DC2626',
  },
  {
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>),
    title: 'Authorised Distributor',
    desc: 'Official distributor for DSPPA, InfoBit, Tenveo and Focus — verified, authorised and fully supported.',
    color: '#0891B2',
  },
]

export default function WhySection() {
  return (
    <section className="section-padding" style={{ background: '#F8FAFC', borderTop: '1px solid rgba(11,30,61,0.06)' }}>
      <div className="container-site">
        <div className="text-center mb-14">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563EB', marginBottom: 12 }}>Why Choose Us</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,4vw,48px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0B1E3D', marginBottom: 16 }}>
            The AudioVisual Nepal Difference
          </h2>
          <p style={{ fontSize: 16, maxWidth: 480, margin: '0 auto', lineHeight: 1.7, color: '#475569' }}>
            500+ completed projects and counting — here&apos;s why customers across Nepal trust us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r) => (
            <div
              key={r.title}
              style={{
                padding: '24px',
                borderRadius: 16,
                background: '#FFFFFF',
                border: '1.5px solid rgba(11,30,61,0.07)',
                boxShadow: '0 1px 6px rgba(11,30,61,0.04)',
              }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${r.color}0D`, color: r.color, border: `1.5px solid ${r.color}20`, marginBottom: 16 }}>
                {r.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#0B1E3D', marginBottom: 8, lineHeight: 1.3 }}>{r.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: '#64748B' }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
