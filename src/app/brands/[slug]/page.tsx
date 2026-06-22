import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ExternalLink, Phone } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { PRODUCTS_BY_BRAND } from '@/data/products'

export const revalidate = 86400

type Props = { params: Promise<{ slug: string }> }

const BRAND_DATA = {
  dsppa: {
    name: 'DSPPA',
    tagline: "China's Leading Professional Audio Brand",
    country: 'China',
    website: 'https://www.dsppatech.com',
    founded: '1989',
    description: 'DSPPA is one of the largest professional audio manufacturers in Asia, specializing in IP network audio, PA systems, conference systems, and voice evacuation solutions. With 30+ years of manufacturing experience, DSPPA products are deployed in airports, universities, hotels, and government facilities across 100+ countries.',
    categories: ['IP Network Audio', 'PA Systems', 'Conference Systems', 'Voice Evacuation', 'Amplifiers', 'Ceiling Speakers', 'Column Speakers'],
    highlights: ['ISO 9001:2015 Certified', '30+ Years Manufacturing', 'CE & FCC Approved', 'Deployed in 100+ Countries'],
    color: '#0071E3',
  },
  itc: {
    name: 'ITC',
    tagline: 'Professional Conference & PA Systems',
    country: 'China',
    website: 'https://www.itc-pub.com',
    founded: '1993',
    description: "ITC is a leading manufacturer of professional audio and conference systems. Known for their high-reliability conference discussion units, simultaneous interpretation systems, and digital PA solutions. ITC products are trusted in parliament buildings, boardrooms, and large conference venues worldwide.",
    categories: ['Conference Systems', 'Discussion Units', 'Interpretation Systems', 'PA Systems', 'Amplifiers', 'Wireless Microphones'],
    highlights: ['ISO 9001 Certified', 'Used in Parliament Buildings', 'Advanced DSP Technology', 'Wide Range Conference Solutions'],
    color: '#E74C3C',
  },
  shure: {
    name: 'Shure',
    tagline: 'The World Standard in Microphones',
    country: 'USA',
    website: 'https://www.shure.com',
    founded: '1925',
    description: "Shure Incorporated is an American audio products corporation. Founded in 1925, Shure is known for manufacturing microphones and audio electronics including phono cartridges, discussion systems, and digital signal processing. The SM58 and SM57 are the world's most iconic microphones, trusted by artists and broadcasters globally.",
    categories: ['Wireless Microphone Systems', 'Wired Microphones', 'Conference Systems', 'In-Ear Monitors', 'DSP Systems'],
    highlights: ['100 Years of Innovation', 'Grammy Award Technology', 'SM58 — Most Iconic Mic', 'Trusted by World Leaders'],
    color: '#CC0000',
  },
  jbl: {
    name: 'JBL',
    tagline: 'Professional Audio. Legendary Sound.',
    country: 'USA',
    website: 'https://www.jblpro.com',
    founded: '1946',
    description: "JBL Professional has been at the forefront of audio innovation since 1946. With products ranging from portable PA systems to permanent install loudspeakers and subwoofers, JBL Professional delivers the high-quality audio performance required by touring artists, live sound engineers, and fixed installation professionals worldwide.",
    categories: ['Professional Loudspeakers', 'Subwoofers', 'Line Arrays', 'Portable PA Systems', 'Install Speakers', 'Amplifiers'],
    highlights: ['75+ Years in Audio', 'Live Sound Industry Standard', 'Harman/Samsung Group', 'Worldwide Tour Standard'],
    color: '#F39C12',
  },
  bose: {
    name: 'Bose',
    tagline: 'Better Sound Through Research',
    country: 'USA',
    website: 'https://www.bose.com/pro',
    founded: '1964',
    description: "Bose Professional produces powerful, intelligible sound systems for commercial, government, and enterprise customers. Their FreeSpace, RoomMatch, and ControlSpace systems are engineered for speech intelligibility and uniform coverage in challenging acoustic environments — from boardrooms to stadiums.",
    categories: ['Commercial Audio Systems', 'Ceiling Speakers', 'Subwoofers', 'DSP Processors', 'Amplifiers', 'Conference Systems'],
    highlights: ['60 Years of Research', 'RoomMatch Modular Arrays', 'ControlSpace DSP', 'Premium Enterprise Audio'],
    color: '#2C3E50',
  },
  yamaha: {
    name: 'Yamaha',
    tagline: 'Pro Audio Mixing & Signal Processing',
    country: 'Japan',
    website: 'https://www.yamahapro.com',
    founded: '1887',
    description: "Yamaha Professional Audio creates mixers, amplifiers, speakers, and signal processors for live sound, installation, and recording applications. The Yamaha TF, QL, and CL series digital mixing consoles are industry standards used in theatres, houses of worship, corporate AV, and broadcast.",
    categories: ['Digital Mixers', 'Power Amplifiers', 'Signal Processors', 'Install Speakers', 'Conference Systems'],
    highlights: ['135+ Years of Excellence', 'CL Series Pro Standard', 'TF Series Compact Mixer', 'Industry-Leading DSP'],
    color: '#27AE60',
  },
  toa: {
    name: 'TOA',
    tagline: 'PA & Voice Evacuation Specialists',
    country: 'Japan',
    website: 'https://www.toa.com.sg',
    founded: '1934',
    description: "TOA Corporation has been a pioneer in public address and voice evacuation systems since 1934. TOA's EN54-certified emergency voice alarm systems, IP network speakers, and amplifiers are specified in airports, train stations, hospitals, and shopping malls across Asia. A benchmark for reliability in life-safety audio.",
    categories: ['Voice Evacuation Systems', 'PA Systems', 'IP Network Audio', 'Amplifiers', 'Horn Speakers', 'Column Speakers'],
    highlights: ['EN54 Life Safety Certified', 'Deployed in Major Airports', '90 Years Manufacturing', 'IP Network Audio Pioneer'],
    color: '#8E44AD',
  },
  sennheiser: {
    name: 'Sennheiser',
    tagline: 'Shaping the Future of Audio',
    country: 'Germany',
    website: 'https://www.sennheiser.com',
    founded: '1945',
    description: "Sennheiser is one of the world's leading manufacturers of headphones, microphones, and wireless transmission systems. Their evolution and MKH series microphones are studio benchmarks, while the EW and XSW wireless series are trusted in broadcast, live performance, and corporate AV environments worldwide.",
    categories: ['Wireless Microphone Systems', 'Lavalier Microphones', 'Headset Microphones', 'Conference Microphones', 'Headphones'],
    highlights: ['German Engineering Excellence', 'Broadcast Industry Standard', 'EW Wireless — Global Benchmark', '75+ Years of Innovation'],
    color: '#2980B9',
  },
}

type BrandSlug = keyof typeof BRAND_DATA

export async function generateStaticParams() {
  return Object.keys(BRAND_DATA).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const brand = BRAND_DATA[slug as BrandSlug]
  if (!brand) return { title: 'Brand — AudioVisual Nepal' }
  return {
    title: `${brand.name} — Authorised Dealer in Nepal | AudioVisual Nepal`,
    description: `${brand.name} authorised dealer in Nepal. ${brand.description.slice(0, 120)}...`,
  }
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params
  const brand = BRAND_DATA[slug as BrandSlug]
  if (!brand) notFound()

  const brandProducts = PRODUCTS_BY_BRAND[slug] || []
  const otherBrands = Object.entries(BRAND_DATA).filter(([s]) => s !== slug)

  return (
    <main style={{ paddingTop: 64, background: 'var(--bg-base)', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${brand.color}18 0%, transparent 100%)`, borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container-site relative">
          <nav className="flex items-center gap-1.5 text-[12px] mb-8" style={{ color: 'var(--text-tertiary)' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/brands" className="hover:text-white transition-colors">Brands</Link>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--text-brand)' }}>{brand.name}</span>
          </nav>

          <div className="flex items-start gap-8 flex-wrap">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-black text-[28px] text-white flex-shrink-0"
              style={{ background: brand.color }}>
              {brand.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-[280px]">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-[40px] font-black text-white">{brand.name}</h1>
                <a href={brand.website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[12px] px-3 py-1 rounded-full transition-colors hover:text-white"
                  style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>
                  <ExternalLink size={11} /> Website
                </a>
              </div>
              <p className="text-[20px] mb-3" style={{ color: 'var(--text-brand)' }}>{brand.tagline}</p>
              <p className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>
                Founded {brand.founded} · {brand.country} · Authorised dealer in Nepal
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-site px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* About */}
            <div>
              <h2 className="text-[24px] font-bold text-white mb-4">About {brand.name}</h2>
              <p className="text-[16px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{brand.description}</p>
            </div>

            {/* Key Highlights */}
            <div>
              <h2 className="text-[24px] font-bold text-white mb-6">Why {brand.name}?</h2>
              <div className="grid grid-cols-2 gap-4">
                {brand.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
                    <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                      style={{ background: brand.color }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-[14px] text-white font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Categories */}
            <div>
              <h2 className="text-[24px] font-bold text-white mb-6">{brand.name} Products We Supply</h2>
              <div className="flex flex-wrap gap-2">
                {brand.categories.map((c, i) => (
                  <span key={i} className="px-4 py-2 rounded-full text-[13px] font-medium"
                    style={{ background: `${brand.color}20`, color: brand.color, border: `1px solid ${brand.color}40` }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            {brandProducts.length > 0 && (
              <div>
                <h2 className="text-[24px] font-bold text-white mb-6">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {brandProducts.map(product => (
                    <a key={product.slug} href={`/products/${product.category}/${product.slug}`}
                      className="block rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
                      style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', textDecoration: 'none' }}>
                      <div className="h-40 flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${brand.color}18, ${brand.color}08)` }}>
                        <img src={product.imageUrl} alt={product.name}
                          style={{ width: '60%', height: '85%', objectFit: 'contain' }}
                          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }} />
                      </div>
                      <div className="p-4">
                        {product.badge && (
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-2"
                            style={{ background: `${brand.color}25`, color: brand.color }}>
                            {product.badge}
                          </span>
                        )}
                        <div className="text-[15px] font-bold text-white mb-1">{product.name}</div>
                        <div className="text-[12px] mb-3" style={{ color: 'var(--text-tertiary)' }}>{product.subcategory}</div>
                        <div className="text-[13px] leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{product.tagline}</div>
                        {product.specs.filter(s => s.highlight).slice(0,2).length > 0 && (
                          <div className="flex gap-2 mt-3 flex-wrap">
                            {product.specs.filter(s => s.highlight).slice(0,2).map(spec => (
                              <span key={spec.label} className="px-2 py-1 rounded-lg text-[11px] font-semibold"
                                style={{ background: `${brand.color}15`, color: brand.color }}>
                                {spec.value}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Enquiry Card */}
            <div className="rounded-2xl p-6" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
              <h3 className="text-[18px] font-bold text-white mb-2">Get {brand.name} Products</h3>
              <p className="text-[14px] mb-6" style={{ color: 'var(--text-secondary)' }}>
                We stock genuine {brand.name} products with full warranty. Contact us for pricing and availability.
              </p>
              <a href={`tel:${SITE.phoneRaw}`}
                className="flex items-center gap-3 p-4 rounded-xl mb-3 transition-all hover:-translate-y-0.5"
                style={{ background: 'rgba(0,113,227,0.1)', border: '1px solid rgba(0,113,227,0.2)' }}>
                <Phone size={18} style={{ color: 'var(--brand)' }} />
                <div>
                  <div className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>Call now</div>
                  <div className="text-[14px] font-semibold text-white">{SITE.phone}</div>
                </div>
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl mb-4 transition-all hover:-translate-y-0.5"
                style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <div>
                  <div className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>WhatsApp us</div>
                  <div className="text-[14px] font-semibold text-white">Chat Now</div>
                </div>
              </a>
              <Link href="/contact"
                className="block text-center w-full px-6 py-3 rounded-full text-[14px] font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'var(--brand)' }}>
                Send Enquiry
              </Link>
            </div>

            {/* Other Brands */}
            <div className="rounded-2xl p-6" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
              <h3 className="text-[16px] font-bold text-white mb-4">Other Brands We Carry</h3>
              <div className="space-y-2">
                {otherBrands.slice(0, 5).map(([s, b]) => (
                  <Link key={s} href={`/brands/${s}`}
                    className="flex items-center justify-between p-3 rounded-xl text-[14px] transition-all hover:-translate-y-0.5"
                    style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)' }}>
                    <span className="font-medium text-white">{b.name}</span>
                    <span className="text-[12px]" style={{ color: 'var(--text-tertiary)' }}>{b.country}</span>
                  </Link>
                ))}
                <Link href="/brands" className="block text-center text-[13px] mt-3 transition-colors hover:text-white"
                  style={{ color: 'var(--text-brand)' }}>
                  View all brands →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
