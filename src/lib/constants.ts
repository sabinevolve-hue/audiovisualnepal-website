// ─── SITE CONFIG ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'AudioVisual Nepal',
  // Registered company behind audiovisualnepal.com (Evolve Tech Pvt. Ltd. runs the other brand sites).
  legalName: 'Audio Visual Solutions Pvt. Ltd.',
  tagline: "Nepal's Leading Professional Audio Visual Solutions Provider",
  url: 'https://www.audiovisualnepal.com',
  phone: '+977 9762109538',
  phoneRaw: '+9779762109538',
  email: 'info@audiovisualnepal.com',
  address: 'Kathmandu, Nepal',
  map: 'https://maps.app.goo.gl/iVCohsMztxcbBk8Q6',
  whatsapp: 'https://wa.me/+9779762109538',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61591762197024',
    instagram: 'https://www.instagram.com/audiovisualsolutionnepal/',
    tiktok: 'https://www.tiktok.com/@audiovisualnepal',
    youtube: 'https://youtube.com/audiovisualnepal',
    linkedin: 'https://www.linkedin.com/company/audio-visual-nepal/',
  },
} as const

// ─── SITE NETWORK (LED / AV cluster) ─────────────────────────────────────────
// Sister sites linked from the footer and llms.txt. Keep to the LED/AV cluster only.
export const SISTER_SITES = [
  { domain: 'evolvetech.com.np', href: 'https://evolvetech.com.np/', role: 'LED display shop: prices, buy online, Novastar controllers' },
  { domain: 'lampronepal.com', href: 'https://lampronepal.com/', role: 'Lampro LED display series, specs and warranty in Nepal' },
  { domain: 'leddisplaynepal.com', href: 'https://leddisplaynepal.com/', role: 'LED video wall solutions, guides, rental and installation across Nepal' },
] as const

// ─── NAV ─────────────────────────────────────────────────────────────────────

interface NavLink { label: string; href: string; hasDropdown?: boolean }
export const NAV_LINKS: NavLink[] = [
  { label: 'Solutions', href: '/solutions', hasDropdown: true },
  { label: 'Products',  href: '/products',  hasDropdown: true },
  { label: 'Projects',  href: '/projects' },
  { label: 'Brands',    href: '/brands' },
  { label: 'Guides',    href: '/guides' },
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
  { label: 'Amplifiers',            href: '/products/amplifiers',            icon: 'amp',        count: 28, description: 'itc TC/DSP/Dante/KT pro amplifiers plus DSPPA mixer & matrix PA amplifiers' },
  { label: 'Line Array Speakers',   href: '/products/line-array-speakers',   icon: 'column',     count: 17, description: 'itc line arrays and array subwoofers for concerts, stadiums and large auditoriums' },
  { label: 'Professional Loudspeakers', href: '/products/pro-loudspeakers',  icon: 'speaker',    count: 61, description: 'itc full-range, conference, column, monitor, cinema, outdoor and horn loudspeakers' },
  { label: 'Subwoofers',            href: '/products/subwoofers',            icon: 'sub',        count: 9,  description: 'itc single and dual 15/18-inch subwoofers for live, club and installation systems' },
  { label: 'Mixing Consoles',       href: '/products/mixing-consoles',       icon: 'mixer',      count: 5,  description: 'itc digital mixers and analog mixers with built-in DSP effects' },
  { label: 'Microphones',           href: '/products/microphones',           icon: 'mic',        count: 16, description: 'itc UHF wireless systems, wired vocal, gooseneck and instrument microphones' },
  { label: 'Immersive Sound',       href: '/products/immersive-sound',       icon: 'wireless',   count: 3,  description: 'itc Ease immersive spatial-audio controllers and 3D positioning software' },
  { label: 'Audio Peripherals',     href: '/products/audio-peripherals',     icon: 'matrix',     count: 15, description: 'Processors, feedback suppressors, smart mixers, antenna splitters, sockets & stands'  },
  { label: 'Ceiling Speakers',      href: '/products/ceiling-speakers',      icon: 'ceiling',    count: 2,  description: 'Frameless & coaxial flush-mount ceiling speakers for commercial spaces' },
  { label: 'Column Speakers',       href: '/products/column-speakers',       icon: 'column',     count: 1,  description: 'Weatherproof column speakers for outdoor & semi-outdoor installations' },
  { label: 'Horn Speakers',         href: '/products/horn-speakers',         icon: 'horn',       count: 1,  description: 'Hi-fi horn speakers for wide-area coverage — transport, worship, stadiums' },
  { label: 'Projectors',            href: '/products/projectors',            icon: 'projector',  count: 11, description: 'Wincomn & Krinda laser projectors — 4K UHD, WUXGA installation, 25,000-lumen large venue and simulation' },
  { label: 'Conference Systems',    href: '/products/conference-systems',    icon: 'conference', count: 122, description: 'itc digital, wireless and paperless conference systems, voting and simultaneous interpretation for chambers and boardrooms' },
  { label: 'Conference Cameras',    href: '/products/conference-cameras',    icon: 'camera',     count: 11,  description: 'PTZ, 4K AI-tracking & 360° cameras for boardrooms and lecture halls' },
  { label: 'Video Conferencing',    href: '/products/video-conferencing',    icon: 'video',      count: 21,  description: 'All-in-one video bars & BYOD/BYOM systems — plug-and-play meeting rooms' },
  { label: 'Wireless Presentation', href: '/products/wireless-presentation', icon: 'wireless',   count: 2,  description: 'Cable-free screen sharing from any device — no software or dongles required' },
  { label: 'LED Displays',          href: '/products/led-displays',          icon: 'display',    count: 6,  description: 'Lampro fine-pitch, rental, creative & outdoor DOOH LED display systems' },
  { label: 'Video Walls',           href: '/products/video-walls',           icon: 'display',    count: 6,  description: 'Triolion narrow-bezel LCD walls, FPGA video wall controllers & 4K processors' },
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
    brand: 'InfoBit · Tenveo · itc',
    brandColor: '#6366F1',
    accent: '#EEF2FF',
    icon: '📹',
    categories: [
      { label: 'Conference Systems',    href: '/products/conference-systems',    count: 122, desc: 'Delegate, wireless, paperless, interpretation' },
      { label: 'Video Conferencing',    href: '/products/video-conferencing',    count: 21, desc: 'Video bars, cameras & terminals' },
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
    brand: 'Evolve Podium · Tenveo',
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
    brand: 'InfoBit · Triolion · Lampro',
    brandColor: '#0891B2',
    accent: '#ECFEFF',
    icon: '🖥️',
    categories: [
      { label: 'Video Walls', href: '/products/video-walls', count: 6, desc: 'LCD walls & controllers' },
      { label: 'LED Displays', href: '/products/led-displays', count: 6, desc: 'Fine-pitch & outdoor LED' },
    ],
  },
  {
    id: 'pro-sound',
    label: 'Professional Sound',
    tagline: 'Line arrays, amplifiers, mixers and microphones for halls, stadiums and live events',
    brand: 'itc',
    brandColor: '#EA580C',
    accent: '#FFF7ED',
    icon: '🎚️',
    categories: [
      { label: 'Line Array Speakers', href: '/products/line-array-speakers', count: 17, desc: 'Arrays & array subs' },
      { label: 'Professional Loudspeakers', href: '/products/pro-loudspeakers', count: 61, desc: 'Full-range, column, monitor' },
      { label: 'Subwoofers', href: '/products/subwoofers', count: 9, desc: '15/18-inch subs' },
      { label: 'Amplifiers', href: '/products/amplifiers', count: 28, desc: 'TC, DSP, Dante, KT' },
      { label: 'Mixing Consoles', href: '/products/mixing-consoles', count: 5, desc: 'Digital & DSP mixers' },
      { label: 'Microphones', href: '/products/microphones', count: 16, desc: 'Wireless & wired' },
      { label: 'Immersive Sound', href: '/products/immersive-sound', count: 3, desc: 'Spatial audio' },
      { label: 'Audio Peripherals', href: '/products/audio-peripherals', count: 15, desc: 'Processors & accessories' },
    ],
  },
  {
    id: 'projection',
    label: 'Projection',
    tagline: 'Laser projectors from boardrooms to 25,000-lumen projection mapping',
    brand: 'Wincomn · Krinda',
    brandColor: '#E11D48',
    accent: '#FFF1F2',
    icon: '📽️',
    categories: [
      { label: 'Projectors', href: '/products/projectors', count: 11, desc: '4K, WUXGA, large venue, simulation' },
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
    logoColor: '#00AEAD',
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
    name: 'Evolve Podium',
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
    logoColor: '#0F58FB',
  },
  {
    name: 'Wincomn',
    slug: 'wincomn',
    href: '/brands/wincomn',
    category: 'Laser Projectors',
    tagline: 'Krinda & Wincomn laser projectors — 4K UHD, large venue and simulation',
    origin: 'China',
    founded: '',
    logoColor: '#E11D48',
  },
  {
    name: 'Triolion',
    slug: 'triolion',
    href: '/brands/triolion',
    category: 'LCD Video Walls & Controllers',
    tagline: 'Narrow-bezel LCD splicing walls and FPGA video wall controllers',
    origin: 'China',
    founded: '2000',
    logoColor: '#0E7490',
  },
  {
    name: 'itc',
    slug: 'itc',
    href: '/brands/itc',
    category: 'Professional Sound Systems',
    tagline: 'Line arrays, digital amplifiers, mixers and microphones — 30+ years of pro-audio manufacturing',
    origin: 'China',
    founded: '',
    logoColor: '#EA580C',
  },
] as const

export const STATS = [
  { value: 100, suffix: '+', label: 'Successful Projects' },
  { value: 16,  suffix: '+', label: 'Product Categories' },
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
    "Nepal's professional AV solutions provider — professional sound (line arrays, amplifiers, mixers, microphones), PA and voice evacuation, conferencing, laser projectors, LED and LCD video walls and smart podiums. Design, supply and installation across Nepal.",
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
    'laser projector nepal',
    'itc pro sound nepal',
    'line array speaker nepal',
    'professional amplifier nepal',
    'video wall nepal',
  ],
} as const
