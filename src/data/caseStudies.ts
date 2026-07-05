export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  location: string;
  hero: string;
  solutionHref: string;
  summary: string;
  challenge: string;
  solution: string;
  equipment: { name: string; href: string }[];
  results: { label: string; value: string }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "federal-parliament-complex",
    title: "Federal Parliament Complex",
    sector: "Government",
    location: "Kathmandu",
    hero: "/images/heroes/government-hero.webp",
    solutionHref: "/solutions/government",
    summary: "A 250-seat conference hall with simultaneous interpretation, delegate voting and HD video for Nepal's federal legislature.",
    challenge: "A national-level chamber needs every delegate heard clearly, multiple language channels running simultaneously, and voting captured reliably — with zero tolerance for downtime during sessions and strict security requirements for all networked equipment.",
    solution: "We designed a delegate conference system with individual microphone units on a redundant conference bus, interpretation booths feeding multi-channel language distribution, and an integrated voting layer. Chamber audio runs through DSP with automatic mix-minus so interpretation feeds never loop back into the floor mix. HD cameras track the active speaker for the record and for broadcast.",
    equipment: [
      { name: "Delegate conference microphones", href: "/products/conference-audio" },
      { name: "DSPPA MAG6182II IP network PA server", href: "/products/ip-network-audio/dsppa-mag6182ii" },
      { name: "Tenveo X60 NDI broadcast camera", href: "/products/conference-cameras/tenveo-x60ndi" },
      { name: "InfoBit iWall 109 display controller", href: "/products/video-walls/infobit-iwall-109" },
    ],
    results: [
      { label: "Delegate seats", value: "250" },
      { label: "Language channels", value: "Multi-channel" },
      { label: "Session downtime", value: "Zero tolerance design" },
    ],
  },
  {
    slug: "tribhuvan-university-campus-pa",
    title: "Tribhuvan University Campus PA",
    sector: "Education",
    location: "Kirtipur",
    hero: "/images/heroes/education-hero.webp",
    solutionHref: "/solutions/education",
    summary: "IP-based campus public address covering 40+ buildings with centralised management for Nepal's largest university.",
    challenge: "Nepal's largest university needed announcements, scheduled bells and emergency broadcast across a campus of more than 40 buildings — without pulling dedicated audio cable between every block, and manageable by a small central team.",
    solution: "An IP network PA backbone runs over the university's existing LAN. Each building has network amplifier endpoints feeding ceiling and horn speakers, all managed from one central server: scheduled bells per faculty calendar, zone announcements from the administration office, and campus-wide priority override for emergencies.",
    equipment: [
      { name: "DSPPA MAG6182II IP network PA server", href: "/products/ip-network-audio/dsppa-mag6182ii" },
      { name: "DSPPA MAG6806 IP network amplifiers", href: "/products/ip-network-audio/dsppa-mag6806" },
      { name: "DSPPA DSP5211 ceiling speakers", href: "/products/ceiling-speakers/dsppa-dsp5211" },
      { name: "DSPPA DSP161HD horn speakers", href: "/products/horn-speakers/dsppa-dsp161hd" },
    ],
    results: [
      { label: "Buildings covered", value: "40+" },
      { label: "New audio cabling between blocks", value: "None — runs on LAN" },
      { label: "Management", value: "Single central server" },
    ],
  },
  {
    slug: "five-star-hotel-ballroom",
    title: "5-Star Hotel Ballroom & BGM",
    sector: "Hospitality",
    location: "Kathmandu",
    hero: "/images/heroes/hotels-hero.webp",
    solutionHref: "/solutions/hotels",
    summary: "18-zone background music with ballroom event sound and conference room AV for a five-star property.",
    challenge: "The property needed three systems that usually fight each other: elegant background music in 18 distinct zones, a ballroom that converts between weddings, conferences and gala events, and meeting room AV — all operable by rotating hotel staff, not engineers.",
    solution: "A matrix amplifier core gives every zone — lobby, restaurants, spa, corridors, pool — its own source and schedule. The ballroom runs column speakers with DSP presets, so staff recall 'Wedding', 'Conference' or 'Gala' from a wall panel in one touch. Meeting rooms received wireless presentation and video bars matched to their size.",
    equipment: [
      { name: "DSPPA DMA6112 matrix amplifier", href: "/products/amplifiers/dsppa-dma6112" },
      { name: "DSPPA DSP255II column speakers", href: "/products/column-speakers/dsppa-dsp255ii" },
      { name: "DSPPA DSP6011 ceiling speakers", href: "/products/ceiling-speakers/dsppa-dsp6011" },
      { name: "InfoBit iShare X400 wireless presentation", href: "/products/wireless-presentation/infobit-ishare-x400" },
    ],
    results: [
      { label: "Independent audio zones", value: "18" },
      { label: "Ballroom configurations", value: "One-touch presets" },
      { label: "Operator", value: "Hotel staff, no engineer" },
    ],
  },
  {
    slug: "leapfrog-smart-meeting-rooms",
    title: "Smart Meeting Rooms — Leapfrog HQ",
    sector: "Corporate",
    location: "Kathmandu",
    hero: "/images/heroes/smart-meeting-rooms-hero.webp",
    solutionHref: "/solutions/smart-meeting-rooms",
    summary: "Wireless conferencing, ceiling microphone coverage and Dante-networked audio across a technology company's meeting spaces.",
    challenge: "A distributed engineering team lives on video calls. Rooms had to start meetings in seconds, sound natural to remote participants, and work identically across every room so nobody relearns AV per room.",
    solution: "Each room follows one standard: an all-in-one video bar or PTZ camera sized to the room, wireless presentation with no dongles, and microphone coverage tuned so remote participants hear conversation — not the room. Audio distributes over a Dante network, letting IT monitor and reconfigure every room centrally.",
    equipment: [
      { name: "Tenveo NV20A AI tracking camera", href: "/products/conference-cameras/tenveo-nv20a-ai" },
      { name: "InfoBit iShare X200 wireless presentation", href: "/products/wireless-presentation/infobit-ishare-x200" },
      { name: "InfoBit iCam VB60 video bar", href: "/products/video-conferencing/infobit-vb60" },
      { name: "DSPPA DSP5211 ceiling speakers", href: "/products/ceiling-speakers/dsppa-dsp5211" },
    ],
    results: [
      { label: "Meeting start time", value: "Seconds, one touch" },
      { label: "Room standard", value: "Identical across all rooms" },
      { label: "Management", value: "Central via Dante network" },
    ],
  },
  {
    slug: "grande-international-hospital",
    title: "Grande International Hospital",
    sector: "Healthcare",
    location: "Kathmandu",
    hero: "/images/heroes/hospitals-hero.webp",
    solutionHref: "/solutions/hospitals",
    summary: "Multi-zone IP paging integrated with nurse call across 12 floors of a leading private hospital.",
    challenge: "Announcements in a hospital must reach the right ward at the right volume — calm in patient areas, clearly audible at nurse stations — and integrate with the nurse call system, across 12 floors, without disturbing recovery areas with irrelevant pages.",
    solution: "Floor-by-floor IP paging zones let the nurse stations page exactly where a message belongs. The system ties into nurse call so codes route automatically, with priority levels ensuring emergency pages override background audio instantly. Speaker placement and level tuning keep patient areas calm while corridors and stations stay intelligible.",
    equipment: [
      { name: "DSPPA MAG6806 IP network amplifiers", href: "/products/ip-network-audio/dsppa-mag6806" },
      { name: "DSPPA DSP5211 ceiling speakers", href: "/products/ceiling-speakers/dsppa-dsp5211" },
      { name: "DSPPA PAVA8500 voice evacuation", href: "/products/voice-evacuation/dsppa-pava8500" },
    ],
    results: [
      { label: "Floors covered", value: "12" },
      { label: "Nurse call integration", value: "Automatic code routing" },
      { label: "Patient areas", value: "Calm-tuned zones" },
    ],
  },
  {
    slug: "central-mosque-kathmandu",
    title: "Central Mosque, Kathmandu",
    sector: "Religious",
    location: "Kathmandu",
    hero: "/images/heroes/religious-hero.webp",
    solutionHref: "/solutions/religious",
    summary: "High-intelligibility PA with outdoor horn speakers serving a congregation of more than 5,000.",
    challenge: "A congregation of 5,000+ spans the prayer hall, courtyard and surrounding streets. Speech must stay intelligible everywhere through monsoon weather, and the daily call to prayer must run reliably on schedule.",
    solution: "Weatherproof column speakers cover the hall and courtyard with even, natural speech reproduction, while long-throw horns extend coverage to outer areas. A scheduled broadcast system automates the call to prayer with instant microphone override, and the amplifier chain is simple enough for the mosque's caretakers to operate daily.",
    equipment: [
      { name: "DSPPA DSP255II waterproof column speakers", href: "/products/column-speakers/dsppa-dsp255ii" },
      { name: "DSPPA DSP161HD horn speakers", href: "/products/horn-speakers/dsppa-dsp161hd" },
      { name: "DSPPA DMA250U mixer amplifier", href: "/products/amplifiers/dsppa-dma250u" },
    ],
    results: [
      { label: "Congregation served", value: "5,000+" },
      { label: "Weather rating", value: "Monsoon-proof outdoor" },
      { label: "Daily operation", value: "Automated schedule" },
    ],
  },
];
