import Link from 'next/link'

const featured = [
  {
    icon: '🔊',
    name: 'Professional Speakers',
    tagline: 'Ceiling, wall mount, column, horn & subwoofers for every space',
    href: '/products/speakers',
  },
  {
    icon: '⚡',
    name: 'Amplifiers',
    tagline: '60W to 1000W — single and multi-zone with Bluetooth & FM',
    href: '/products/amplifiers',
  },
  {
    icon: '🤝',
    name: 'Conference Systems',
    tagline: 'Wired & wireless, chairman/delegate units, voting & recording',
    href: '/products/conference-systems',
  },
  {
    icon: '🌐',
    name: 'IP Network Audio',
    tagline: 'PoE speakers, IP amplifiers, paging stations & management servers',
    href: '/products/ip-network-audio',
  },
  {
    icon: '🚨',
    name: 'Voice Evacuation',
    tagline: 'EN54-compliant emergency systems with battery backup & fire integration',
    href: '/products/voice-evacuation',
  },
  {
    icon: '🎤',
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
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0071E3]/20 to-[#003c96]/30 border border-[#0071E3]/20 flex items-center justify-center text-[32px] mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                {product.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">{product.name}</h3>
              <p className="text-sm text-white/45 leading-relaxed mb-5">{product.tagline}</p>
              <span className="text-sm font-medium text-[#0071E3] flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                View Range →
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <Link href="/products" className="btn-ghost inline-flex">
            Browse All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
