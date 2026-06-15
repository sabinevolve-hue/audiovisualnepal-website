import Link from 'next/link'

const projects = [
  {
    type: 'Government',
    name: 'Federal Parliament Complex',
    desc: '250-seat conference hall with simultaneous interpretation, voting system & HD video tracking.',
    gradient: 'linear-gradient(135deg, #0f172a, #1e3a5f)',
    emoji: '🏛️',
  },
  {
    type: 'Education',
    name: 'Tribhuvan University Campus',
    desc: 'IP-based campus PA system covering 40+ buildings with centralized management software.',
    gradient: 'linear-gradient(135deg, #064e3b, #065f46)',
    emoji: '🎓',
  },
  {
    type: 'Hospitality',
    name: '5-Star Hotel Ballroom, Kathmandu',
    desc: '18-zone background music, line array for ballroom events & conference room AV integration.',
    gradient: 'linear-gradient(135deg, #1c1917, #44403c)',
    emoji: '🏨',
  },
  {
    type: 'Corporate',
    name: 'Smart Meeting Rooms, Leapfrog HQ',
    desc: 'Wireless conference system, ceiling mic arrays & Dante-networked audio distribution.',
    gradient: 'linear-gradient(135deg, #1e1b4b, #312e81)',
    emoji: '🏢',
  },
  {
    type: 'Healthcare',
    name: 'Grande International Hospital',
    desc: 'Multi-zone IP paging system integrated with nurse call, covering 12 floors and all public areas.',
    gradient: 'linear-gradient(135deg, #4c0519, #881337)',
    emoji: '🏥',
  },
  {
    type: 'Religious',
    name: 'Grand Mosque, Butwal',
    desc: 'High-intelligibility horn speaker system with digital matrix mixer for crystal-clear adhan & khutbah.',
    gradient: 'linear-gradient(135deg, #1a2e05, #365314)',
    emoji: '🕌',
  },
]

export default function FeaturedProjects() {
  return (
    <section id="projects" className="section-padding bg-[#F5F5F7]">
      <div className="container-site">
        <div className="text-center mb-16 reveal">
          <div className="eyebrow mb-4">Featured Projects</div>
          <h2 className="heading-section mb-4">Work That Speaks.</h2>
          <p className="text-lg text-[#6E6E73] max-w-[560px] mx-auto leading-relaxed">
            Real installations. Real results. Across Nepal&apos;s most demanding environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((proj, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 group reveal"
            >
              {/* Image placeholder */}
              <div
                className="h-[220px] flex items-center justify-center text-5xl"
                style={{ background: proj.gradient }}
              >
                {proj.emoji}
              </div>

              <div className="p-7">
                <div className="text-xs font-semibold text-[#0071E3] uppercase tracking-[0.08em] mb-2">
                  {proj.type}
                </div>
                <h3 className="font-display font-bold text-[18px] text-[#111] mb-2">{proj.name}</h3>
                <p className="text-sm text-[#6E6E73] leading-relaxed">{proj.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <Link href="/projects" className="btn-secondary inline-flex">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
