// ─── SITE CONFIG ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'AudioVisual Nepal',
  tagline: "Nepal's Leading Professional Audio Visual Solutions Provider",
  url: 'https://audiovisualnepal.com',
  phone: '+977 9762109538',
  phoneRaw: '+9779762109538',
  email: 'info@audiovisualnepal.com',
  address: 'Kathmandu, Nepal',
  whatsapp: 'https://wa.me/+9779762109538',
  social: {
    facebook: 'https://facebook.com/audiovisualnepal',
    instagram: 'https://instagram.com/audiovisualnepal',
    youtube: 'https://youtube.com/audiovisualnepal',
    linkedin: 'https://linkedin.com/company/audiovisualnepal',
  },
} as const

// ─── NAV ─────────────────────────────────────────────────────────────────────

interface NavLink { label: string; href: string; hasDropdown?: boolean }
export const NAV_LINKS: NavLink[] = [
  { label: 'Solutions', href: '/solutions', hasDropdown: true },
  { label: 'Products',  href: '/products',  hasDropdown: true },
  { label: 'Projects',  href: '/projects' },
  { label: 'Brands',    href: '/brands' },
  { label: 'Blog',      href: '/blog' },
  { label: 'About',     href: '/about' },
]

export const SOLUTIONS_NAV = [
  { label: 'Corporate Offices',    href: '/solutions/corporate',           icon: 'corporate' },
  { label: 'Government Projects',  href: '/solutions/government',          icon: 'government' },
  { label: 'Education',            href: '/solutions/education',           icon: 'education' },
  { label: 'Hotels & Hospitality', href: '/solutions/hotels',              icon: 'hotel' },
  { label: 'Hospitals',            href: '/solutions/hospitals',           icon: 'hospital' },
  { label: 'Religious Places',     href: '/solutions/religious',           icon: 'religious' },
  { label: 'Transportation',       href: '/solutions/transportation',      icon: 'transport' },
  { label: 'Smart Meeting Rooms',  href: '/solutions/smart-meeting-rooms', icon: 'meeting' },
] as const

export const PRODUCT_CATEGORIES = [
  { label: 'Voice Evacuation',     href: '/products/voice-evacuation',   icon: 'evacuation', count: 3  },
  { label: 'IP Network Audio',     href: '/products/ip-network-audio',   icon: 'network',    count: 2  },
  { label: 'Amplifiers',           href: '/products/amplifiers',         icon: 'amp',        count: 3  },
  { label: 'Ceiling Speakers',     href: '/products/ceiling-speakers',   icon: 'ceiling',    count: 2  },
  { label: 'Column Speakers',      href: '/products/column-speakers',    icon: 'column',     count: 1  },
  { label: 'Horn Speakers',        href: '/products/horn-speakers',      icon: 'horn',       count: 1  },
  { label: 'Conference Cameras',   href: '/products/conference-cameras', icon: 'camera',     count: 7  },
  { label: 'Video Conferencing',   href: '/products/video-conferencing', icon: 'video',      count: 4  },
  { label: 'Wireless Presentation',href: '/products/wireless-presentation',icon: 'wireless', count: 1  },
  { label: 'Video Walls',          href: '/products/video-walls',        icon: 'display',    count: 2  },
  { label: 'Conference Audio',     href: '/products/conference-audio',   icon: 'mic',        count: 3  },
  { label: 'AV Switching',         href: '/products/av-switching',       icon: 'switch',     count: 1  },
  { label: 'Camera Controllers',   href: '/products/camera-controllers', icon: 'control',    count: 1  },
  { label: 'Smart Podiums',        href: '/products/smart-podiums',      icon: 'podium',     count: 6  },
] as const

export const BRANDS = [
  {
    name: 'DSPPA',
    slug: 'dsppa',
    href: '/brands/dsppa',
    category: 'Professional PA & Voice Evacuation',
    tagline: 'Professional PA, IP network audio & voice evacuation systems',
    origin: 'China',
    founded: '1988',
    logoColor: '#E63946',
  },
  {
    name: 'InfoBit',
    slug: 'infobit',
    href: '/brands/infobit',
    category: 'Conference AV & Collaboration',
    tagline: 'Video bars, wireless presentation & AV matrix switching',
    origin: 'China',
    founded: '2012',
    logoColor: '#6366F1',
  },
  {
    name: 'Tenveo',
    slug: 'tenveo',
    href: '/brands/tenveo',
    category: 'PTZ Cameras & Conference Systems',
    tagline: 'AI-tracking PTZ cameras, video conferencing & speakerphones',
    origin: 'China',
    founded: '2010',
    logoColor: '#0EA5E9',
  },
  {
    name: 'Focus',
    slug: 'focus',
    href: '/brands/focus',
    category: 'Smart Podiums & Digital Lecterns',
    tagline: 'Premium electric height-adjustable smart podiums for education & government',
    origin: 'China',
    founded: '2008',
    logoColor: '#1E40AF',
  },
] as const

export const STATS = [
  { value: 500, suffix: '+', label: 'Successful Projects' },
  { value: 14,  suffix: '+', label: 'Product Categories' },
  { value: 77,  suffix: '',  label: 'Districts Served' },
  { value: 100, suffix: '%', label: 'Genuine Products' },
] as const

export const PROJECT_TYPES = [
  'Government',
  'Education',
  'Hotel & Hospitality',
  'Healthcare',
  'Religious',
  'Corporate',
  'Transportation',
  'Other',
] as const

// ─── SEO ─────────────────────────────────────────────────────────────────────

export const DEFAULT_SEO = {
  titleTemplate: '%s | AudioVisual Nepal',
  defaultTitle: 'AudioVisual Nepal — Professional Audio Visual Solutions',
  description:
    "Nepal's leading professional audio visual solutions provider. PA systems, voice evacuation, IP network audio, conference cameras, smart podiums and video conferencing for government, education, hotels and enterprise.",
  keywords: [
    'audio visual nepal',
    'PA system nepal',
    'conference system nepal',
    'DSPPA nepal',
    'InfoBit nepal',
    'Tenveo nepal',
    'smart podium nepal',
    'voice evacuation nepal',
    'PTZ camera nepal',
    'video conferencing nepal',
    'wireless presentation nepal',
  ],
} as const
