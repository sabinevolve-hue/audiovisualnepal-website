import Link from 'next/link'

const SpeakerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
)

const AmplifierIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
)

const ConferenceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
)

const NetworkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
)

const EvacuationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
)

const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
  </svg>
)

const featured = [
  {
    Icon: SpeakerIcon,
    name: 'Professional Speakers',
    tagline: 'Ceiling, wall mount, column, horn & subwoofers for every space',
    href: '/products/speakers',
  },
  {
    Icon: AmplifierIcon,
    name: 'Amplifiers',
    tagline: '60W to 1000W — single and multi-zone with Bluetooth & FM',
    href: '/products/amplifiers',
  },
  {
    Icon: ConferenceIcon,
    name: 'Conference Systems',
    tagline: 'Wired & wireless, chairman/delegate units, voting & recording',
    href: '/products/conference-systems',
  },
  {
    Icon: NetworkIcon,
    name: 'IP Network Audio',
    tagline: 'PoE speakers, IP amplifiers, paging stations & management servers',
    href: '/products/ip-network-audio',
  },
  {
    Icon: EvacuationIcon,
    name: 'Voice Evacuation',
    tagline: 'EN54-compliant emergency systems with battery backup & fire integration',
    href: '/products/voice-evacuation',
  },
  {
    Icon: MicIcon,
    name: 'Wireless Microphones',
    tagline: 'Handheld, lavalier, gooseneck & boundary conference capsules',
    href: '/products/wireless-systems',
  },
]

export default function ProductEcosystem() {
  return (
    <section id="products" className="section-padding bg-[#111111]">
      <div className="container-site">
        <div className="text-center mb-16 reveal">
          <div className="eyebrow mb-4">Product Ecosystem</div>
          <h2 className="heading-section text-white mb-4">Professional-Grade Equipment</h2>
          <p className="text-lg text-white/50 max-w-[560px] mx-auto leading-relaxed">
            Complete portfolio from source to speaker — everything you need, nothing you don&apos;t.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 rounded-2xl overflow-hidden">
          {featured.map((product, i) => (
            <Link
              key={i}
              href={product.href}
              className="group bg-[#1a1a1a] hover:bg-[#222] px-9 py-12 text-center transition-colors duration-300 reveal"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/[0.06] flex items-center justify-center mx-auto mb-6 text-white group-hover:bg-[#0071E3]/20 group-hover:text-[#60a5fa] transition-colors duration-300">
                <product.Icon />
              </div>
              <h3 className="font-display font-bold text-[17px] text-white mb-3 leading-tight">
                {product.name}
              </h3>
              <p className="text-sm text-white/45 leading-relaxed">
                {product.tagline}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10 reveal">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-white/70 hover:text-white transition-colors"
          >
            Browse all 18 product categories
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
