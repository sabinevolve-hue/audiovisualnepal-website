import type { Metadata } from 'next'
import Link from 'next/link'
import { SOLUTIONS_NAV } from '@/lib/constants'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

const SOLUTION_DATA: Record<string, {
  label: string; icon: string; tagline: string; desc: string;
  systems: { name: string; desc: string }[];
  projects: { title: string; location: string }[];
}> = {
  'corporate': {
    label: 'Corporate Offices', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>),
    tagline: 'Smart Workplaces. Seamless Collaboration.',
    desc: 'Modern corporate environments demand AV that just works — one-touch meeting rooms, crystal-clear video conferencing, background music, and digital signage that reinforces your brand.',
    systems: [
      { name: 'Conference Room AV', desc: 'Integrated cameras, microphones, displays, and control systems for hybrid meetings.' },
      { name: 'Video Walls', desc: 'High-impact LED and LCD video walls for lobbies, trading floors, and NOCs.' },
      { name: 'Background Music', desc: 'Zone-controlled BGM for offices, cafeterias, and common areas.' },
      { name: 'Room Booking Displays', desc: 'Real-time room availability panels integrated with calendar systems.' },
      { name: 'Wireless Presentation', desc: 'Cable-free screen sharing for agile workspaces.' },
    ],
    projects: [
      { title: 'NIC Asia Bank HQ Boardroom', location: 'Kathmandu' },
      { title: 'Deloitte Nepal Office', location: 'Kathmandu' },
      { title: 'Ncell Head Office', location: 'Kathmandu' },
    ],
  },
  'government': {
    label: 'Government Projects', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 22h18M4 9h16M2 9l10-7 10 7M6 9v13M18 9v13M10 13h4v9h-4z"/></svg>),
    tagline: 'Reliable AV for Public Service.',
    desc: 'Government institutions need robust, secure, and maintainable AV systems — from parliament chambers to district offices and public service centers.',
    systems: [
      { name: 'PA & Public Address', desc: 'Multi-zone PA for ministries, secretariats, and public halls.' },
      { name: 'Video Conferencing', desc: 'Secure VC for inter-ministry and federal-provincial coordination.' },
      { name: 'Digital Signage', desc: 'Information displays for service counters, waiting areas, and exits.' },
      { name: 'Chamber AV', desc: 'Parliamentary and committee room audio with voting systems.' },
      { name: 'Interpretation Systems', desc: 'Multi-language interpretation for international meetings.' },
    ],
    projects: [
      { title: 'Province 1 Chief Minister Office', location: 'Biratnagar' },
      { title: 'Nepal Electricity Authority', location: 'Kathmandu' },
      { title: 'Lalitpur Metropolitan City Hall', location: 'Lalitpur' },
    ],
  },
  'education': {
    label: 'Education', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>),
    tagline: 'Learning Spaces That Inspire.',
    desc: 'Schools and universities need AV that enhances learning — from interactive classroom displays to campus-wide PA and auditorium sound systems that fill the room without feedback.',
    systems: [
      { name: 'Campus PA Systems', desc: 'Multi-zone public address for announcements, bells, and emergencies.' },
      { name: 'Interactive Flat Panels', desc: 'Touch-enabled smart boards replacing projectors in classrooms.' },
      { name: 'Auditorium Sound', desc: 'Line array systems for large halls with clear intelligibility.' },
      { name: 'Language Labs', desc: 'Complete language lab audio systems with teacher-student intercom.' },
      { name: 'Distance Learning', desc: 'Video conferencing studios for remote education delivery.' },
    ],
    projects: [
      { title: 'Kathmandu University', location: 'Dhulikhel' },
      { title: 'Budhanilkantha School', location: 'Kathmandu' },
      { title: 'GCES School Network', location: 'Nationwide' },
    ],
  },
  'hotels': {
    label: 'Hotels & Hospitality', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 22V8h18v14M3 8V5h18v3M12 2v3M7 8v3h3V8M14 8v3h3V8M7 15h3v7H7zM14 15h3v7h-3z"/></svg>),
    tagline: 'Create Experiences. Delight Every Guest.',
    desc: 'From intimate restaurants to grand ballrooms, hotels need AV that creates atmosphere, handles events, and keeps guests entertained — with systems that are easy for staff to operate.',
    systems: [
      { name: 'Ballroom & Event AV', desc: 'Line array PA, LED lighting, projection, and livestreaming for events.' },
      { name: 'Restaurant BGM', desc: 'Ambient music with zone control for dining areas, bars, and terraces.' },
      { name: 'Pool & Lobby Audio', desc: 'Weather-resistant outdoor speakers and premium lobby sound.' },
      { name: 'IPTV Systems', desc: 'Hotel-grade IPTV for guest rooms with local and international channels.' },
      { name: 'Meeting Room AV', desc: 'Video conferencing and hybrid meeting setups for business guests.' },
    ],
    projects: [
      { title: 'Hyatt Regency Kathmandu', location: 'Kathmandu' },
      { title: 'Tiger Mountain Lodge', location: 'Pokhara' },
      { title: 'Aloft Hotel', location: 'Kathmandu' },
    ],
  },
  'hospitals': {
    label: 'Hospitals', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>),
    tagline: 'Calm, Clear. Exactly When It Matters.',
    desc: 'Hospitals need AV that communicates clearly in critical moments — emergency PA, patient information displays, and nurse call systems that integrate with clinical workflows.',
    systems: [
      { name: 'Emergency PA', desc: 'Life-safety public address with zone control and backup power.' },
      { name: 'Patient Info Displays', desc: 'Digital signage for waiting rooms, OPD, and discharge areas.' },
      { name: 'Nurse Call Audio', desc: 'IP-based nurse call with room audio and central console.' },
      { name: 'Conference AV', desc: 'Medical conference rooms for case discussions and CME events.' },
      { name: 'Waiting Room BGM', desc: 'Soothing background music to reduce patient anxiety.' },
    ],
    projects: [
      { title: 'Grande International Hospital', location: 'Kathmandu' },
      { title: 'B&B Hospital', location: 'Lalitpur' },
      { title: 'National Trauma Center', location: 'Kathmandu' },
    ],
  },
  'religious': {
    label: 'Religious Venues', icon: '🛕',
    tagline: 'Sound That Carries Every Word.',
    desc: 'Temples, churches, mosques, and monasteries need sound systems that deliver speech intelligibility to every corner — even in challenging reverberant environments.',
    systems: [
      { name: 'Line Array Speakers', desc: 'Column and line array speakers for even coverage in large halls.' },
      { name: 'Wireless Microphones', desc: 'UHF/digital wireless for priests, pastors, and worship leaders.' },
      { name: 'PA Control Systems', desc: 'Simple operator interfaces for non-technical staff.' },
      { name: 'Acoustic Treatment', desc: 'Panels and diffusers to control reverberation.' },
      { name: 'Recording Systems', desc: 'Multitrack recording of sermons and religious events.' },
    ],
    projects: [
      { title: 'Pashupatinath Temple Complex', location: 'Kathmandu' },
      { title: 'Cathedral of the Assumption', location: 'Kathmandu' },
      { title: 'Kopan Monastery', location: 'Kathmandu' },
    ],
  },
  'transportation': {
    label: 'Transportation', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 1 16.5 2.5L13 6 4.8 6.2C3.2 6.2 1.5 7.4 1.5 9s0 2.8 1.5 3.5L9 12l-2 3.5L5 16.5l1.5 1.5 1.5-1.5 3.5-2 .3 6c.7 1.5 2 2.5 3.5 2.5s2.8-1.5 3-3z"/></svg>),
    tagline: 'Announce Clearly. Inform Instantly.',
    desc: 'Airports, bus parks, and railway stations demand reliable PA with clear intelligibility, FIDS integration, and fail-safe emergency broadcasting.',
    systems: [
      { name: 'Public Address (PAGA)', desc: 'Zone-controlled PA with pre-recorded and live announcements.' },
      { name: 'FIDS Integration', desc: 'Flight/schedule information display integration with PA triggers.' },
      { name: 'Emergency Broadcasting', desc: 'EN54-compliant emergency voice alarm systems.' },
      { name: 'IP Audio Network', desc: 'Dante/AES67 IP audio networks for large facilities.' },
      { name: 'Digital Signage', desc: 'Arrival/departure boards and wayfinding displays.' },
    ],
    projects: [
      { title: 'Tribhuvan International Airport', location: 'Kathmandu' },
      { title: 'Pokhara Regional Airport', location: 'Pokhara' },
      { title: 'Kathmandu Bus Park', location: 'Kathmandu' },
    ],
  },
  'smart-meeting-rooms': {
    label: 'Smart Meeting Rooms', icon: '💡',
    tagline: 'Press One Button. The Room Does the Rest.',
    desc: 'Modern teams need meeting rooms that start instantly, connect reliably, and require zero technical support. We design and build smart rooms that work every time.',
    systems: [
      { name: 'One-Touch Control', desc: 'Crestron/Extron/CEDES touch panels to start and end meetings instantly.' },
      { name: '4K Video Conferencing', desc: 'PTZ cameras with AI framing for Zoom, Teams, and Google Meet.' },
      { name: 'Wireless Presentation', desc: 'Bring Your Own Device (BYOD) with AirPlay, Miracast, and Google Cast.' },
      { name: 'Room Scheduling', desc: 'Calendar-integrated displays showing real-time room availability.' },
      { name: 'Cloud Integration', desc: 'Microsoft 365, Google Workspace, and Zoom Rooms certified hardware.' },
    ],
    projects: [
      { title: 'Standard Chartered Nepal', location: 'Kathmandu' },
      { title: 'F1Soft International', location: 'Kathmandu' },
      { title: 'Agni Incorporated', location: 'Kathmandu' },
    ],
  },
}

export async function generateStaticParams() {
  return SOLUTIONS_NAV.map(s => ({ slug: s.href.replace('/solutions/', '') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = SOLUTION_DATA[slug]
  if (!data) return { title: 'Solutions' }
  return {
    title: `${data.label} AV Solutions`,
    description: data.desc,
  }
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params
  const data = SOLUTION_DATA[slug]

  if (!data) {
    return (
      <main style={{ paddingTop: 80, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 32, fontWeight: 800, color: '#0B1E3D' }}>Solution not found</h1>
          <Link href="/solutions" style={{ color: '#3B82F6' }}>← All Solutions</Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: 80, background: '#FFFFFF' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(180deg, #F0F4F8 0%, #FFFFFF 100%)', padding: '100px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#3B82F6', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
            <Link href="/solutions" style={{ color: '#3B82F6', textDecoration: 'none' }}>Solutions</Link>
            {' / '}{data.label}
          </p>
          <div style={{ fontSize: 56, marginBottom: 20 }}>{data.icon}</div>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.03em', marginBottom: 16 }}>
            {data.tagline}
          </h1>
          <p style={{ fontSize: 18, color: '#64748B', lineHeight: 1.7, maxWidth: 640 }}>
            {data.desc}
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ display: 'inline-block', background: '#3B82F6', color: '#0B1E3D', padding: '14px 32px', borderRadius: 980, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Request a Quote
            </Link>
            <Link href="/projects" style={{ display: 'inline-block', background: 'transparent', color: '#0B1E3D', padding: '14px 32px', borderRadius: 980, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.3)' }}>
              See Our Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Systems */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(24px,3.5vw,36px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.03em', marginBottom: 48 }}>
            Systems We Design
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {data.systems.map(sys => (
              <div key={sys.name} style={{ background: '#FFFFFF', border: '1px solid rgba(11,30,61,0.1)', borderRadius: 16, padding: 24 }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 700, color: '#0B1E3D', marginBottom: 8 }}>{sys.name}</div>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, margin: 0 }}>{sys.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reference Projects */}
      <section style={{ padding: '64px 24px', background: '#F1F5F9', borderTop: '1px solid rgba(11,30,61,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(24px,3.5vw,36px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.03em', marginBottom: 32 }}>
            Reference Projects
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {data.projects.map(proj => (
              <div key={proj.title} style={{ background: '#FFFFFF', border: '1px solid rgba(11,30,61,0.1)', borderRadius: 14, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#3B82F6' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="15" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg></div>
                <div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, fontWeight: 700, color: '#0B1E3D', marginBottom: 2 }}>{proj.title}</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{proj.location}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <Link href="/projects" style={{ fontSize: 14, color: '#0071E3', fontWeight: 600, textDecoration: 'none' }}>
              View all projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Other Solutions */}
      <section style={{ padding: '64px 24px', background: '#FFFFFF', borderTop: '1px solid rgba(11,30,61,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 800, color: '#0B1E3D', marginBottom: 24 }}>Other Solutions</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {SOLUTIONS_NAV.filter(s => s.href !== `/solutions/${slug}`).map(s => (
              <Link key={s.href} href={s.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 980, padding: '8px 18px', fontSize: 13, fontWeight: 500, color: '#475569', textDecoration: 'none', border: '1px solid rgba(11,30,61,0.08)' }}>
                <span>{s.icon}</span>{s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '96px 24px', background: 'linear-gradient(135deg, #F0F4F8 0%, #FFFFFF 100%)', textAlign: 'center', borderTop: '1px solid rgba(11,30,61,0.05)' }}>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, color: '#0B1E3D', marginBottom: 16, letterSpacing: '-0.03em' }}>
          Have a {data.label} Project?
        </h2>
        <p style={{ fontSize: 18, color: '#64748B', marginBottom: 32 }}>
          Share your requirements and we'll design a system that fits your space perfectly.
        </p>
        <Link href="/contact" style={{ display: 'inline-block', background: '#3B82F6', color: '#0B1E3D', padding: '16px 40px', borderRadius: 980, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
          Get a Free Consultation
        </Link>
      </section>
    </main>
  )
}
