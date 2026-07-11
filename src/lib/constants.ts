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
  { label: 'Voice Evacuation',      href: '/products/voice-evacuation',      icon: 'evacuation', count: 3,  description: 'EN54-certified life-safety PA & voice alarm systems for large buildings' },
  { label: 'IP Network Audio',      href: '/products/ip-network-audio',      icon: 'network',    count: 4,  description: 'TCP/IP-based distributed audio over Cat5/6 for campuses & multi-building sites' },
  { label: 'Amplifiers',            href: '/products/amplifiers',            icon: 'amp',        count: 3,  description: 'Mixer amplifiers, matrix amplifiers & integrated PA amplifiers' },
  { label: 'Ceiling Speakers',      href: '/products/ceiling-speakers',      icon: 'ceiling',    count: 2,  description: 'Frameless & coaxial flush-mount ceiling speakers for commercial spaces' },
  { label: 'Column Speakers',       href: '/products/column-speakers',       icon: 'column',     count: 1,  description: 'Weatherproof column speakers for outdoor & semi-outdoor installations' },
  { label: 'Horn Speakers',         href: '/products/horn-speakers',         icon: 'horn',       count: 1,  description: 'Hi-fi horn speakers for wide-area coverage — transport, worship, stadiums' },
  { label: 'Conference Cameras',    href: '/products/conference-cameras',    icon: 'camera',     count: 11,  description: 'PTZ, 4K AI-tracking & 360° cameras for boardrooms and lecture halls' },
  { label: 'Video Conferencing',    href: '/products/video-conferencing',    icon: 'video',      count: 6,  description: 'All-in-one video bars & BYOD/BYOM systems — plug-and-play meeting rooms' },
  { label: 'Wireless Presentation', href: '/products/wireless-presentation', icon: 'wireless',   count: 2,  description: 'Cable-free screen sharing from any device — no software or dongles required' },
  { label: 'Video Walls',           href: '/products/video-walls',           icon: 'display',    count: 2,  description: '4K video wall processors & controllers for multi-screen display arrays' },
  { label: 'Conference Audio',      href: '/products/conference-audio',      icon: 'mic',        count: 5,  description: 'USB & Bluetooth speakerphones for crystal-clear remote meeting audio' },
  { label: 'AV Switching',          href: '/products/av-switching',          icon: 'switch',     count: 2,  description: 'HDMI matrix switchers for routing AV signals across multiple rooms' },
  { label: 'Camera Controllers',    href: '/products/camera-controllers',    icon: 'control',    count: 1,  description: 'PTZ keyboard controllers with joystick for professional broadcast setups' },
  { label: 'Smart Podiums',         href: '/products/smart-podiums',         icon: 'podium',     count: 6,  description: 'Electric height-adjustable smart podiums with built-in PC & touchscreen' },
] as const

// ─── AVN PRO: Grouped product catalog (ITC-inspired type-first structure) ────

export const PRODUCT_GROUPS = [
  {
    id: 'pa-systems',
    label: 'Public Address & PA Systems',
    tagline: 'Life-safety voice evacuation to distributed background music',
    brand: 'DSPPA',
    brandColor: '#DC2626',
    accent: '#FEF2F2',
    icon: '🔊',
    categories: [
      { label: 'Voice Evacuation', href: '/products/voice-evacuation', count: 3, desc: 'EN54-certified emergency PA' },
      { label: 'IP Network Audio', href: '/products/ip-network-audio', count: 4, desc: 'TCP/IP distributed audio' },
      { label: 'Amplifiers',       href: '/products/amplifiers',       count: 3, desc: 'Mixer & matrix amplifiers' },
      { label: 'Ceiling Speakers', href: '/products/ceiling-speakers', count: 2, desc: 'Flush-mount ceiling speakers' },
      { label: 'Column Speakers',  href: '/products/column-speakers',  count: 1, desc: 'Outdoor column speakers' },
      { label: 'Horn Speakers',    href: '/products/horn-speakers',    count: 1, desc: 'Wide-area horn speakers' },
    ],
  },
  {
    id: 'conference',
    label: 'Conference & Collaboration',
    tagline: 'Video bars, cameras, speakerphones and wireless presentation',
    brand: 'InfoBit · Tenveo',
    brandColor: '#6366F1',
    accent: '#EEF2FF',
    icon: '📹',
    categories: [
      { label: 'Video Conferencing',    href: '/products/video-conferencing',    count: 6, desc: 'All-in-one video bars' },
      { label: 'Conference Cameras',    href: '/products/conference-cameras',    count: 11, desc: 'PTZ & AI-tracking cameras' },
      { label: 'Conference Audio',      href: '/products/conference-audio',      count: 5, desc: 'USB & BT speakerphones' },
      { label: 'Wireless Presentation', href: '/products/wireless-presentation', count: 2, desc: 'Cable-free screen sharing' },
      { label: 'AV Switching',          href: '/products/av-switching',          count: 2, desc: 'HDMI matrix switchers' },
    ],
  },
  {
    id: 'smart-classroom',
    label: 'Smart Classroom & Auditorium',
    tagline: 'Electric podiums, lecterns and precision camera control',
    brand: 'Focus · Tenveo',
    brandColor: '#1E40AF',
    accent: '#EFF6FF',
    icon: '🎓',
    categories: [
      { label: 'Smart Podiums',      href: '/products/smart-podiums',      count: 6, desc: 'Height-adjustable e-podiums' },
      { label: 'Camera Controllers', href: '/products/camera-controllers', count: 1, desc: 'PTZ keyboard controllers' },
    ],
  },
  {
    id: 'display',
    label: 'Display & Video Wall',
    tagline: 'Multi-screen video wall processors for command centres and lobbies',
    brand: 'InfoBit',
    brandColor: '#0891B2',
    accent: '#ECFEFF',
    icon: '🖥️',
    categories: [
      { label: 'Video Walls', href: '/products/video-walls', count: 2, desc: '4K video wall controllers' },
    ],
  },
] as const

// ─── SOLUTIONS BY VENUE (ITC-inspired: application-first) ────────────────────

export const VENUE_SOLUTIONS = [
  { label: 'Boardroom & Conference', href: '/solutions/corporate',           icon: '🏢', desc: 'Video bars, PTZ cameras & wireless presentation' },
  { label: 'Lecture Hall & Campus',  href: '/solutions/education',           icon: '🎓', desc: 'Smart podiums, PA systems & ceiling speakers' },
  { label: 'Hotel & Hospitality',    href: '/solutions/hotels',              icon: '🏨', desc: 'Background music, PA & guest communication' },
  { label: 'Government Building',    href: '/solutions/government',          icon: '🏛️', desc: 'Voice evacuation, IP audio & conference systems' },
  { label: 'Hospital & Healthcare',  href: '/solutions/hospitals',           icon: '🏥', desc: 'EN54 VA systems, paging & nurse communication' },
  { label: 'House of Worship',       href: '/solutions/religious',           icon: '⛪', desc: 'Column speakers, amplifiers & mic systems' },
  { label: 'Transportation Hub',     href: '/solutions/transportation',      icon: '✈️', desc: 'Horn speakers, PA & emergency broadcast' },
  { label: 'Smart Meeting Room',     href: '/solutions/smart-meeting-rooms', icon: '📡', desc: 'Full AV-over-IP collaboration suites' },
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
  {
    name: 'Lampro',
    slug: 'lampro',
    href: '/brands/lampro',
    category: 'LED Screens & Displays',
    tagline: 'Fine-pitch, rental and outdoor LED displays — 21 years of manufacturing',
    origin: 'China',
    founded: '2004',
    logoColor: '#E4002B',
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
