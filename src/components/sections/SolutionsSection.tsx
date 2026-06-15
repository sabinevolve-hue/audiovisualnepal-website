import Link from 'next/link'
import { SOLUTIONS_NAV } from '@/lib/constants'

const solutionDetails: Record<string, { desc: string; tags: string[] }> = {
  '/solutions/corporate': {
    desc: 'Smart meeting rooms, boardroom conferencing, multi-zone audio and display integration for modern offices.',
    tags: ['Smart Rooms', 'Conference', 'BGM'],
  },
  '/solutions/government': {
    desc: 'Large-scale PA, emergency broadcasting and conference systems for ministries and public offices.',
    tags: ['PA Systems', 'Conference', 'Emergency'],
  },
  '/solutions/education': {
    desc: 'Classroom audio, campus-wide PA and digital learning systems for schools and universities.',
    tags: ['Classroom Audio', 'Campus PA', 'Digital'],
  },
  '/solutions/hotels': {
    desc: 'Background music, multi-zone audio, conference halls and ballroom sound for guest experience.',
    tags: ['BGM', 'Ballroom', 'Conference'],
  },
  '/solutions/hospitals': {
    desc: 'Patient announcements, zone paging and nurse-call integrated audio for healthcare facilities.',
    tags: ['Paging', 'Announcements', 'Zone Audio'],
  },
  '/solutions/religious': {
    desc: 'High-clarity systems for mosques, temples, churches and monasteries — optimized for prayer.',
    tags: ['Mosque', 'Temple', 'Church'],
  },
  '/solutions/transportation': {
    desc: 'Robust PA and passenger information systems for airports, bus parks and railway stations.',
    tags: ['Airport', 'Bus Park', 'IP Audio'],
  },
  '/solutions/smart-meeting-rooms': {
    desc: 'Wireless conferencing, ceiling microphone arrays and Dante-networked smart room integration.',
    tags: ['Wireless', 'Ceiling Mic', 'Dante'],
  },
}

export default function SolutionsSection() {
  return (
    <section id="solutions" className="section-padding bg-white">
      <div className="container-site">
        <div className="section-header text-center mb-16 reveal">
          <div className="eyebrow mb-4">Industries We Serve</div>
          <h2 className="heading-section mb-4">Solutions for Every Space</h2>
          <p className="text-lg text-[#6E6E73] max-w-[560px] mx-auto leading-relaxed">
            From government boardrooms to hotel ballrooms — we design and deliver complete AV systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOLUTIONS_NAV.map((sol) => {
            const details = solutionDetails[sol.href]
            return (
              <Link
                key={sol.href}
                href={sol.href}
                className="group relative bg-[#F5F5F7] rounded-2xl p-10 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 reveal"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#0071E3] to-[#60a5fa] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-13 h-13 bg-gradient-to-br from-[#0071E3] to-[#005BB5] rounded-[14px] flex items-center justify-center text-2xl mb-6">
                  {sol.icon}
                </div>

                <h3 className="font-display font-bold text-xl mb-3 text-[#111]">{sol.label}</h3>
                <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-5">{details?.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {details?.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-[#0071E3] bg-[#0071E3]/[0.08] px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 text-sm font-medium text-[#0071E3] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more →
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
