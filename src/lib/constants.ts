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
  { label: 'Corporate Offices',     href: '/solutions/corporate',           icon: 'corporate' },
  { label: 'Government Projects',   href: '/solutions/government',          icon: 'government' },
  { label: 'Education',             href: '/solutions/education',           icon: 'education' },
  { label: 'Hotels & Hospitality',  href: '/solutions/hotels',              icon: 'hotel' },
  { label: 'Hospitals',             href: '/solutions/hospitals',           icon: 'hospital' },
  { label: 'Religious Places',      href: '/solutions/religious',           icon: 'religious' },
  { label: 'Transportation',        href: '/solutions/transportation',      icon: 'transport' },
  { label: 'Smart Meeting Rooms',   href: '/solutions/smart-meeting-rooms', icon: 'meeting' },
] as const

export const PRODUCT_CATEGORIES = [
  { label: 'Speakers',           href: '/products/speakers',           icon: 'speaker', count: 45 },
  { label: 'Ceiling Speakers',   href: '/products/ceiling-speakers',   icon: 'ceiling', count: 28 },
  { label: 'Column Speakers',    href: '/products/column-speakers',    icon: 'column', count: 12 },
  { label: 'Wall Mount Speakers',href: '/products/wall-mount-speakers',icon: 'wall', count: 18 },
  { label: 'Horn Speakers',      href: '/products/horn-speakers',      icon: 'horn', count: 15 },
  { label: 'Subwoofers',         href: '/products/subwoofers',         icon: 'sub', count: 8  },
  { label: 'Amplifiers',         href: '/products/amplifiers',         icon: 'amp', count: 32 },
  { label: 'Mixers',             href: '/products/mixers',             icon: 'mixer', count: 10 },
  { label: 'Microphones',        href: '/products/microphones',        icon: 'mic', count: 22 },
  { label: 'Wireless Systems',   href: '/products/wireless-systems',   icon: 'wireless', count: 20 },
  { label: 'Conference Systems', href: '/products/conference-systems', icon: 'conference', count: 35 },
  { label: 'IP Network Audio',   href: '/products/ip-network-audio',   icon: 'network', count: 40 },
  { label: 'PA Systems',         href: '/products/pa-systems',         icon: 'pa', count: 15 },
  { label: 'Voice Evacuation',   href: '/products/voice-evacuation',   icon: 'evacuation', count: 12 },
  { label: 'Digital Podiums',    href: '/products/digital-podiums',    icon: 'podium', count: 6  },
  { label: 'Audio Matrix',       href: '/products/audio-matrix',       icon: 'matrix', count: 8  },
  { label: 'Classroom Audio',    href: '/products/classroom-audio',    icon: 'classroom', count: 14 },
  { label: 'Portable Speakers',  href: '/products/portable-speakers',  icon: 'portable', count: 10 },
] as const

export const BRANDS = [
  { name: 'DSPPA',      href: '/brands/dsppa',      category: 'Professional Audio' },
  { name: 'ITC',        href: '/brands/itc',         category: 'Conference Systems' },
  { name: 'Shure',      href: '/brands/shure',       category: 'Microphones & Wireless' },
  { name: 'JBL',        href: '/brands/jbl',         category: 'Professional Speakers' },
  { name: 'Bose',       href: '/brands/bose',        category: 'Commercial Audio' },
  { name: 'Yamaha',     href: '/brands/yamaha',      category: 'Mixers & Amplifiers' },
  { name: 'TOA',        href: '/brands/toa',         category: 'PA & Evacuation' },
  { name: 'Sennheiser', href: '/brands/sennheiser',  category: 'Microphones & Headsets' },
] as const

export const STATS = [
  { value: 500, suffix: '+', label: 'Successful Projects' },
  { value: 20,  suffix: '+', label: 'Product Categories' },
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
    "Nepal's leading professional audio visual solutions provider. PA systems, conference systems, IP network audio, ceiling speakers, amplifiers and more for government, education, hotels and enterprise.",
  keywords: [
    'audio visual nepal',
    'PA system nepal',
    'conference system nepal',
    'ceiling speaker nepal',
    'professional speaker nepal',
    'amplifier nepal',
    'wireless microphone nepal',
    'voice evacuation nepal',
    'IP audio nepal',
    'DSPPA nepal',
  ],
} as const
