import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ExternalLink, Phone } from 'lucide-react'
import { ProductImg } from '@/components/ui/ProductImg'
import { SITE } from '@/lib/constants'
import { PRODUCTS_BY_BRAND } from '@/data/products'

export const revalidate = 86400

type Props = { params: Promise<{ slug: string }> }

const BRAND_DATA = {
  dsppa: {
    name: 'DSPPA',
    tagline: "Asia's Leading PA & IP Network Audio Manufacturer",
    country: 'China',
    website: 'https://www.dsppatech.com',
    founded: '1988',
    description: "DSPPA (Guangzhou DSPPA Audio Co., Ltd.) is one of Asia's largest professional audio manufacturers. Specialising in IP network audio, voice evacuation systems, PA amplifiers and ceiling speakers, DSPPA products are deployed in airports, universities, hospitals and government facilities across 100+ countries. Their EN54-certified voice evacuation systems are a benchmark for life-safety installations.",
    categories: ['IP Network Audio', 'Voice Evacuation (EN54)', 'Mixer Amplifiers', 'Ceiling Speakers', 'Column Speakers', 'Horn Speakers', 'Remote Paging Stations'],
    highlights: ['EN54-16 Voice Evacuation Certified', '35+ Years Manufacturing', 'ISO 9001:2015 Certified', 'Deployed in 100+ Countries'],
    color: '#00AEAD',
  },
  infobit: {
    name: 'InfoBit',
    tagline: 'Enterprise Conference AV & Collaboration',
    country: 'China',
    website: 'https://www.infobitav.com',
    founded: '2012',
    description: "InfoBit is a professional AV manufacturer specialising in conference room solutions. Their product range covers 4K video conference bars, PTZ cameras with AI tracking, wireless presentation systems (iShare), video wall controllers (iWall), and USB speakerphones. InfoBit products are Zoom Rooms, Teams Rooms and Webex certified — trusted by Fortune 500 companies and government agencies globally.",
    categories: ['Conference Video Bars', 'AI PTZ Cameras', 'Wireless Presentation', 'Video Wall Controllers', 'HDMI Matrix Switchers', 'USB Speakerphones'],
    highlights: ['Zoom & Teams Rooms Certified', 'Dante Audio Integration', '4K60 Throughout', '10-Year Enterprise Track Record'],
    color: '#6366F1',
  },
  tenveo: {
    name: 'Tenveo',
    tagline: 'AI-Tracking PTZ Cameras & Video Conferencing',
    country: 'China',
    website: 'https://www.tenveo.com',
    founded: '2010',
    description: "Tenveo is a leading manufacturer of professional PTZ conference cameras and video conferencing equipment. Known for their AI auto-tracking cameras (the UV620A achieving 4K@60fps with NDI|HX2), Tenveo serves education institutions, houses of worship, government chambers and corporate offices. Their products support all major protocols: NDI, RTMP, RTSP, SRT, ONVIF and GB28181.",
    categories: ['AI Auto-Tracking PTZ Cameras', 'All-in-One Conference Bars', 'USB Speakerphones', 'NDI PTZ Cameras', 'PTZ Keyboard Controllers', 'Conference Room Kits'],
    highlights: ['4K@60fps AI Tracking', 'NDI|HX2 Native Support', 'PoE Powered Cameras', '3-Year Warranty'],
    color: '#0891B2',
  },
  focus: {
    name: 'Evolve Podium',
    tagline: 'Premium Smart Podiums for Education & Government',
    country: '',
    website: '',
    founded: '',
    description: "Evolve Podium is our house line of premium smart podiums and digital lecterns for government halls, university auditoriums and corporate boardrooms. The E series features electric height adjustment, fully bonded touch screens, built-in OPS computers (Intel i5/i7) and Sapele wood construction. The C series provides a more compact option for classrooms and training rooms.",
    categories: ['Electric Height-Adjustable Smart Podiums', 'Compact Smart Podiums', 'Digital Lecterns', 'OPS Computer Integration', 'Touch Screen Podiums'],
    highlights: ['Sapele Wood Handcrafted', 'Electric 200mm Height Adjustment', 'Intel OPS Computer Built-in', '23.8" Fully Bonded Touch Screen'],
    color: '#1E40AF',
  },
  lampro: {
    name: 'Lampro',
    tagline: 'LED Screens & Displays — Display a Better World',
    country: 'China',
    website: 'https://www.lampro.net',
    founded: '2004',
    description: "LAMPRO (Shenzhen LAMP Technology Co., Ltd.) is a dedicated LED display brand with 21 years of manufacturing expertise and 600,000+ sqm annual production. Their range spans fine-pitch COB Mini LED for boardrooms and control rooms, indoor creative splicing panels, rental and staging screens, and high-brightness outdoor DOOH billboards — installed across six continents with 3,000+ global partners.",
    categories: ['Fine-Pitch Mini LED (COB)', 'Fine-Pitch HD Indoor', 'Indoor Creative Splicing', 'Rental & Staging', 'Outdoor Advertising (DOOH)', 'Creative Displays', 'LED Modules & Distribution'],
    highlights: ['21 Years LED Manufacturing', '600,000+ sqm Annual Production', 'COB Fine-Pitch down to P1.2', '3,000+ Global Partners'],
    color: '#0F58FB',
  },
}

type BrandSlug = keyof typeof BRAND_DATA

export async function generateStaticParams() {
  return Object.keys(BRAND_DATA).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const brand = BRAND_DATA[slug as BrandSlug]
  if (!brand) return { title: 'Brand' }
  return {
    title: slug === 'lampro' ? `${brand.name} Authorised Partner Nepal` : `${brand.name} Authorised Dealer Nepal`,
    description: `${brand.name} authorised dealer in Nepal. ${brand.description.slice(0, 140)}`,
    alternates: { canonical: `https://www.audiovisualnepal.com/brands/${slug}` },
    openGraph: {
      title: `${brand.name} — Official Distributor in Nepal`,
      description: `${brand.name} authorised dealer in Nepal. ${brand.description.slice(0, 140)}`,
      url: `https://www.audiovisualnepal.com/brands/${slug}`,
      siteName: 'AudioVisual Nepal',
      images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: `${brand.name} — AudioVisual Nepal` }],
      type: 'website',
    },
  }
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params
  const brand = BRAND_DATA[slug as BrandSlug]
  if (!brand) notFound()

  const brandProducts = PRODUCTS_BY_BRAND[slug] || []
  const otherBrands = Object.entries(BRAND_DATA).filter(([s]) => s !== slug)

  return (
    <main style={{ paddingTop: 64, background: '#FFFFFF', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="relative py-16 px-6 overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${brand.color}08 0%, #FFFFFF 100%)`, borderBottom: '1px solid rgba(11,30,61,0.08)' }}>
        <div className="container-site relative">
          <nav className="flex items-center gap-1.5 text-[12px] mb-8" style={{ color: '#94A3B8' }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none' }} className="hover:text-[#0B1E3D] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/brands" style={{ color: '#94A3B8', textDecoration: 'none' }} className="hover:text-[#0B1E3D] transition-colors">Brands</Link>
            <ChevronRight size={12} />
            <span style={{ color: brand.color }}>{brand.name}</span>
          </nav>

          <div className="flex items-start gap-8 flex-wrap">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-black text-[28px] text-white flex-shrink-0"
              style={{ background: brand.color }}>
              {brand.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-[280px]">
              <div className="flex items-center gap-3 mb-2">
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, color: '#0B1E3D', letterSpacing: '-0.03em' }}>{brand.name}</h1>
              </div>
              <p className="text-[18px] mb-2" style={{ color: brand.color, fontWeight: 600 }}>{brand.tagline}</p>
              <p className="text-[14px]" style={{ color: '#64748B' }}>
                {brand.founded ? `Founded ${brand.founded} · ` : ''}{brand.country ? `${brand.country} · ` : ''}{slug === 'lampro' ? 'Authorised partner in Nepal' : 'Authorised dealer in Nepal'}
              </p>
              {(slug === 'infobit' || slug === 'dsppa' || slug === 'tenveo' || slug === 'lampro') && (
                <Link href={`/brands/${slug}/catalog`}
                  className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-bold text-white transition hover:opacity-90"
                  style={{ background: brand.color, textDecoration: 'none' }}>
                  Browse the full {brand.name} catalog — {slug === 'infobit' ? '550+ models' : slug === 'dsppa' ? '200+ models' : slug === 'tenveo' ? '60+ models' : '20 series'} →
                </Link>
              )}
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
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#0B1E3D', marginBottom: 16 }}>About {brand.name}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: '#475569' }}>{brand.description}</p>
            </div>

            {/* Key Highlights */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#0B1E3D', marginBottom: 20 }}>Why {brand.name}?</h2>
              <div className="grid grid-cols-2 gap-4">
                {brand.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: '#F8FAFC', border: '1.5px solid rgba(11,30,61,0.07)' }}>
                    <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                      style={{ background: brand.color }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 14, color: '#0B1E3D', fontWeight: 600 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Categories */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#0B1E3D', marginBottom: 20 }}>{brand.name} Products We Supply</h2>
              <div className="flex flex-wrap gap-2">
                {brand.categories.map((c, i) => (
                  <span key={i} className="px-4 py-2 rounded-full text-[13px] font-medium"
                    style={{ background: `${brand.color}10`, color: brand.color, border: `1px solid ${brand.color}30` }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            {brandProducts.length > 0 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#0B1E3D', marginBottom: 20 }}>Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {brandProducts.map(product => (
                    <a key={product.slug} href={`/products/${product.category}/${product.slug}`}
                      className="block rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
                      style={{ background: '#FFFFFF', border: '1.5px solid rgba(11,30,61,0.08)', boxShadow: '0 1px 6px rgba(11,30,61,0.05)', textDecoration: 'none' }}>
                      <div className="h-40 relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${brand.color}08, ${brand.color}04)` }}>
                        <ProductImg src={product.imageUrl} alt={product.name} objectFit="contain" brandColor={brand.color} brandName={brand.name} />
                      </div>
                      <div className="p-4">
                        {product.badge && (
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-2"
                            style={{ background: `${brand.color}15`, color: brand.color }}>
                            {product.badge}
                          </span>
                        )}
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#0B1E3D', marginBottom: 4 }}>{product.name}</div>
                        <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 8 }}>{product.subcategory}</div>
                        <div style={{ fontSize: 13, lineHeight: 1.55, color: '#475569' }}>{product.tagline}</div>
                        {product.specs.filter(s => s.highlight).slice(0,2).length > 0 && (
                          <div className="flex gap-2 mt-3 flex-wrap">
                            {product.specs.filter(s => s.highlight).slice(0,2).map(spec => (
                              <span key={spec.label} className="px-2 py-1 rounded-lg text-[11px] font-semibold"
                                style={{ background: `${brand.color}10`, color: brand.color }}>
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
            <div className="rounded-2xl p-6" style={{ background: '#F8FAFC', border: '1.5px solid rgba(11,30,61,0.08)' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0B1E3D', marginBottom: 8 }}>Get {brand.name} Products</h3>
              <p style={{ fontSize: 14, color: '#475569', marginBottom: 20, lineHeight: 1.65 }}>
                We stock genuine {brand.name} products with full warranty. Contact us for pricing and availability.
              </p>
              <a href={`tel:${SITE.phoneRaw}`}
                className="flex items-center gap-3 p-4 rounded-xl mb-3 transition-all hover:-translate-y-0.5"
                style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.15)', textDecoration: 'none' }}>
                <Phone size={18} style={{ color: '#2563EB' }} />
                <div>
                  <div style={{ fontSize: 11, color: '#94A3B8' }}>Call now</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0B1E3D' }}>{SITE.phone}</div>
                </div>
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl mb-4 transition-all hover:-translate-y-0.5"
                style={{ background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.2)', textDecoration: 'none' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <div>
                  <div style={{ fontSize: 11, color: '#94A3B8' }}>WhatsApp us</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0B1E3D' }}>Chat Now</div>
                </div>
              </a>
              <Link href="/contact"
                className="block text-center w-full px-6 py-3 rounded-full text-[14px] font-semibold text-white transition-all hover:opacity-90"
                style={{ background: '#2563EB' }}>
                Send Enquiry
              </Link>
            </div>

            {/* Other Brands */}
            <div className="rounded-2xl p-6" style={{ background: '#F8FAFC', border: '1.5px solid rgba(11,30,61,0.08)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0B1E3D', marginBottom: 16 }}>Other Brands We Carry</h3>
              <div className="space-y-2">
                {otherBrands.map(([s, b]) => (
                  <Link key={s} href={`/brands/${s}`}
                    className="flex items-center justify-between p-3 rounded-xl text-[14px] transition-all hover:-translate-y-0.5"
                    style={{ background: '#FFFFFF', border: '1.5px solid rgba(11,30,61,0.08)', textDecoration: 'none' }}>
                    <span style={{ fontWeight: 600, color: '#0B1E3D' }}>{b.name}</span>
                    <span style={{ fontSize: 12, color: '#94A3B8' }}>{b.country}</span>
                  </Link>
                ))}
                <Link href="/brands" className="block text-center text-[13px] mt-3 transition-colors"
                  style={{ color: '#2563EB', textDecoration: 'none' }}>
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
