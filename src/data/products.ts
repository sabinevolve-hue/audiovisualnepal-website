// AVN Product Catalog — 4 Focus Brands
// DSPPA · InfoBit · Tenveo · Focus (GZFocus)
// Sources: Official PDFs, brand websites

export type Segment =
  | "Corporate" | "Government" | "Education" | "Hotel"
  | "Hospital" | "Religious" | "Transportation" | "Stadium"

export interface ProductSpec {
  label: string
  value: string
  highlight?: boolean
  group?: string
}

export interface ProductDownload {
  label: string
  url: string
  type: 'brochure' | 'datasheet' | 'manual' | 'catalog' | 'guide'
  fileSize?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  brandSlug: string
  category: string
  subcategory: string
  tagline: string
  badge?: "Best Seller" | "New" | "Featured" | "Popular"
  imageUrl: string
  imageFallback: string
  description: string
  keyFeatures: { title: string; desc: string }[]
  specs: ProductSpec[]
  applications: Segment[]
  warranty: string
  relatedSlugs: string[]
  downloads?: ProductDownload[]
  brandProductUrl?: string
  priceNPR?: string
  videoUrl?: string
  gallery?: string[]
  pdfUrl?: string
}

// ─── DSPPA ──────────────────────────────────────────────────────────────────
const DSPPA: Product[] = [
  {
    id: "dsppa-pava9500", slug: "dsppa-pava9500",
    name: "DSPPA PAVA9500", brand: "DSPPA", brandSlug: "dsppa",
    category: "voice-evacuation", subcategory: "Integrated Voice Evacuation",
    tagline: "8-Zone 500W EN54 Voice Evacuation PA System",
    badge: "Best Seller",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#0B1E3D",
    description: "The PAVA9500 is DSPPA's flagship integrated voice evacuation system, EN54-16 compliant, delivering 500W across 8 independent speaker zones. Supports up to 160 zones via expansion, with dual amplifier failover and full line supervision. Ideal for large government buildings, hospitals, hotels and campuses.",
    keyFeatures: [
      { title: "EN54-16 Certified", desc: "Fully compliant with European fire alarm and voice evacuation standards — accepted for life-safety installations." },
      { title: "8 Zones, 500W Main + 500W Backup", desc: "Built-in main and standby amplifier with automatic fault-switching ensures uninterrupted emergency broadcast." },
      { title: "Expandable to 160 Zones", desc: "Cascade expansion amplifiers (PAVA9500E) over CAN bus — covers the largest complexes from a single host." },
      { title: "Speaker Line Detection", desc: "Continuous open-circuit and short-circuit monitoring on all speaker lines with fault reporting." },
      { title: "Priority Paging", desc: "Live microphone and emergency signals override background music across selected or all zones instantly." },
    ],
    specs: [
      { label: "Zones", value: "8 (expandable to 160)", highlight: true, group: "Output" },

      { label: "Amplifier Power", value: "500W Main + 500W Backup", highlight: true, group: "Output" },

      { label: "Standard", value: "EN54-16 Certified", highlight: true, group: "Standard" },

      { label: "Mic Inputs", value: "2 Balanced", group: "Input" },

      { label: "AUX Inputs", value: "4 Analog", group: "Input" },

      { label: "Transmission", value: "CAN Bus, up to 800m", group: "Connectivity" },

      { label: "Speaker Output", value: "100V Bridge, AB Line", group: "Output" },

      { label: "Network", value: "Dual RJ45", group: "Connectivity" },

    ],
    applications: ["Government", "Hospital", "Hotel", "Education", "Transportation"],
    warranty: "2 Years",
    priceNPR: "NPR 4,50,000",
    brandProductUrl: "https://www.dsppatech.com/product/pava9500/",
    downloads: [
      { label: "PAVA9500 Product Brochure", url: "https://www.dsppatech.com/product/pava9500/", type: "brochure" as const },
      { label: "DSPPA PAVA Series Catalog", url: "https://www.dsppatech.com/category/voice-alarm-system/", type: "catalog" as const },
    ],
    relatedSlugs: ["dsppa-pava8500", "dsppa-pava4600", "dsppa-dma6112"]
  },
  {
    id: "dsppa-pava8500", slug: "dsppa-pava8500",
    name: "DSPPA PAVA8500", brand: "DSPPA", brandSlug: "dsppa",
    category: "voice-evacuation", subcategory: "Dante Voice Evacuation",
    tagline: "Dante-Networked 8-Zone 500W Voice Evacuation System",
    badge: "New",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#0B1E3D",
    description: "The PAVA8500 brings Dante audio networking to EN54-compliant voice evacuation. 8 zones expandable to 160, with built-in 500W digital amplifier, Dante protocol support, and battery backup monitoring. The PAVA8008 remote paging station enables distributed operation across large facilities.",
    keyFeatures: [
      { title: "Dante Protocol", desc: "Integrates seamlessly with Dante AV networks — ideal for modern AV-over-IP infrastructure." },
      { title: "EN54-16 Compliant", desc: "Meets European life-safety standards for voice alarm control and indicating equipment." },
      { title: "One-Button Alarm", desc: "Built-in EVAC message and chime trigger from any paging station with a single button." },
      { title: "EMC Monitoring", desc: "Real-time monitoring with EMC microphone for emergency situation verification." },
      { title: "DC Battery Backup", desc: "Battery monitoring with automatic AC-to-DC failover maintains broadcast during power outages." },
    ],
    specs: [
      { label: "Zones", value: "8 (expandable to 160)", highlight: true, group: "Output" },

      { label: "Amplifier", value: "500W Digital", highlight: true, group: "Output" },

      { label: "Protocol", value: "Dante + EN54-16", highlight: true, group: "Connectivity" },

      { label: "AUX Inputs", value: "6 channels", group: "Input" },

      { label: "Dry Contact I/O", value: "8 triggers", group: "Input" },

      { label: "Speaker Output", value: "100V AB Line with supervision", group: "Output" },

      { label: "Battery", value: "DC backup monitoring", group: "Power" },

    ],
    applications: ["Government", "Hospital", "Hotel", "Education"],
    warranty: "2 Years",
    priceNPR: "NPR 5,20,000",
    brandProductUrl: "https://www.dsppatech.com/product/pava8500/",
    downloads: [
      { label: "PAVA8500 Product Page", url: "https://www.dsppatech.com/product/pava8500/", type: "brochure" as const },
      { label: "DSPPA Dante VA Catalog", url: "https://www.dsppatech.com/category/voice-alarm-system/", type: "catalog" as const },
    ],
    relatedSlugs: ["dsppa-pava9500", "dsppa-pava4600"]
  },
  {
    id: "dsppa-pava4600", slug: "dsppa-pava4600",
    name: "DSPPA PAVA4600", brand: "DSPPA", brandSlug: "dsppa",
    category: "voice-evacuation", subcategory: "Compact Wall-mount VA",
    tagline: "4-Zone 600W Compact Wall-mount Voice Alarm System",
    badge: "Popular",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#0B1E3D",
    description: "Compact wall-mount voice evacuation solution for smaller buildings. 600W across 4 zones with automatic main/standby amplifier switching. Supports AC and DC24V power supply, built-in battery charger, and speaker line detection. Perfect for offices, retail, small hotels and educational facilities.",
    keyFeatures: [
      { title: "600W Dual Amplifier", desc: "Built-in main and standby 600W digital amplifiers — automatic failover on fault detection." },
      { title: "4 Independent Zones", desc: "AB line speaker output for 4 zones with individual power switch and volume control." },
      { title: "Line Detection", desc: "Monitors all speaker lines for light load, overload and short-circuit conditions." },
      { title: "AC/DC Power", desc: "Operates on mains AC with automatic DC24V battery backup — built-in charger." },
      { title: "Emergency Button", desc: "One-touch emergency broadcast triggers rapid voice alarm across all zones." },
    ],
    specs: [
      { label: "Zones", value: "4 Independent", highlight: true, group: "Output" },

      { label: "Power", value: "600W (Main + Standby)", highlight: true, group: "Output" },

      { label: "Speaker Output", value: "100V, AB Line", group: "Output" },

      { label: "Power Supply", value: "AC220V + DC24V Backup", group: "Power" },

      { label: "Battery Charger", value: "Built-in 24V", group: "Power" },

    ],
    applications: ["Corporate", "Education", "Religious", "Hotel"],
    warranty: "2 Years", relatedSlugs: ["dsppa-pava9500", "dsppa-dma250u"]
    priceNPR: "NPR 1,80,000",
  },
  {
    id: "dsppa-dma250u", slug: "dsppa-dma250u",
    name: "DSPPA DMA250U", brand: "DSPPA", brandSlug: "dsppa",
    category: "amplifiers", subcategory: "Mixer Amplifier",
    tagline: "250W Digital Mixer Amplifier with USB, FM & Bluetooth",
    badge: "Best Seller",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#1E3A5F",
    description: "Professional 250W mixer amplifier with 70V/100V and 4–16Ω output, 3 mic inputs, 2 AUX inputs, USB, FM and Bluetooth. LCD display shows working status, with rack-mount handles for standard 19\" rack. Available in 60W to 650W versions (DMA60U–DMA650U).",
    keyFeatures: [
      { title: "70V/100V & Low-Z Output", desc: "Dual output modes cover constant-voltage distributed systems and 4–16Ω direct speaker loads." },
      { title: "USB / FM / Bluetooth", desc: "Built-in media player, FM tuner and Bluetooth for flexible music source routing." },
      { title: "3 Mic + 2 AUX Inputs", desc: "Mic 2–3 with 48V phantom power for condenser microphones." },
      { title: "Priority MIC", desc: "Mic 1 with priority ducking — live announcements automatically lower background music." },
      { title: "19\" Rack Mount", desc: "Standard rack handles and 1.5U form factor for clean AV rack installations." },
    ],
    specs: [
      { label: "Output Power", value: "250W RMS (60–650W range)", highlight: true, group: "Output" },

      { label: "Speaker Output", value: "70V / 100V / 4–16Ω", highlight: true, group: "Output" },

      { label: "Inputs", value: "3 Mic, 2 AUX, USB, FM, BT", highlight: true, group: "Input" },

      { label: "Phantom Power", value: "48V (Mic 2–3)", group: "Input" },

      { label: "SNR", value: "≥60dB", group: "Audio" },

      { label: "THD", value: "<0.5% @1kHz", group: "Audio" },

      { label: "Rack Mount", value: "Standard 19\"", group: "Physical" },

    ],
    applications: ["Corporate", "Hotel", "Religious", "Education", "Transportation"],
    warranty: "2 Years", relatedSlugs: ["dsppa-dma6112", "dsppa-dma6250u", "dsppa-pava9500"]
    priceNPR: "NPR 45,000",
  },
  {
    id: "dsppa-dma6112", slug: "dsppa-dma6112",
    name: "DSPPA DMA6112", brand: "DSPPA", brandSlug: "dsppa",
    category: "amplifiers", subcategory: "Matrix Amplifier",
    tagline: "6×120W Digital Audio Matrix Amplifier with Touch Control",
    badge: "Featured",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#1E3A5F",
    description: "6-zone digital audio matrix amplifier delivering 6×120W (or 6×240W for DMA6124) with 4.3\" touch screen control. Supports USB, Bluetooth, SD card and FM input. Each zone has independent volume control, with chime and alarm functions. Ideal for multi-zone commercial environments.",
    keyFeatures: [
      { title: "6 Independent Zones", desc: "Each zone has individual volume control and on/off — perfect for restaurants, hotels, retail." },
      { title: "4.3\" Touch Screen", desc: "Intuitive touch-panel control with included stylus for easy configuration." },
      { title: "6×120W / 6×240W", desc: "Available in two power tiers for small-to-medium and large commercial installations." },
      { title: "Mic with Phantom Power", desc: "Mic 2–4 configurable as XLR with 48V phantom power for professional microphones." },
      { title: "USB / BT / SD / FM", desc: "Full media playback without an external source — built into the amplifier." },
    ],
    specs: [
      { label: "Output Power", value: "6×120W / 6×240W", highlight: true, group: "Output" },

      { label: "Zones", value: "6 Independent", highlight: true, group: "Output" },

      { label: "Display", value: "4.3\" Touch Screen", highlight: true, group: "Control" },

      { label: "Speaker Output", value: "100V", group: "Output" },

      { label: "Inputs", value: "2 AUX, 2 Mic/Line, USB, BT, SD, FM", group: "Input" },

      { label: "Phantom Power", value: "48V (Mic 2–4)", group: "Input" },

    ],
    applications: ["Hotel", "Corporate", "Religious", "Education"],
    warranty: "2 Years", relatedSlugs: ["dsppa-dma250u", "dsppa-dma6250u"]
    priceNPR: "NPR 95,000",
  },
  {
    id: "dsppa-dma6250u", slug: "dsppa-dma6250u",
    name: "DSPPA DMA6250U", brand: "DSPPA", brandSlug: "dsppa",
    category: "amplifiers", subcategory: "Integrated Mixer Amplifier",
    tagline: "6-Zone 250W Integrated Mixer Amplifier with Remote Paging",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#1E3A5F",
    description: "250W 6-zone integrated mixer amplifier with 4 mic, 4 AUX inputs, USB/FM/Bluetooth/TF card. Supports up to 6 remote paging microphones via dual RJ45. Built-in chime, priority MIC and 19\" rack mount. Available in 250W, 350W, 500W and 650W.",
    keyFeatures: [
      { title: "6 Remote Paging Mics", desc: "DMA20 or compatible paging stations connect via dual RJ45 for distributed announcement." },
      { title: "4 MIC + 4 AUX Inputs", desc: "Phantom power 48V on mics 2–4, XLR/Phoenix inputs for flexible connectivity." },
      { title: "Full Media Sources", desc: "USB, FM, Bluetooth and TF card with built-in chime for paging announcements." },
      { title: "Priority Broadcast", desc: "Emergency input automatically overrides all sources for life-safety announcements." },
    ],
    specs: [
      { label: "Output Power", value: "250W–650W (4 tiers)", highlight: true, group: "Output" },

      { label: "Zones", value: "6 with individual volume", highlight: true, group: "Output" },

      { label: "Remote Paging", value: "Up to 6 stations", highlight: true },
      { label: "Inputs", value: "4 Mic (48V), 4 AUX, USB, FM, BT, TF", group: "Input" },

      { label: "Speaker Output", value: "70V / 100V / 4–16Ω", group: "Output" },

    ],
    applications: ["Corporate", "Hotel", "Government", "Transportation"],
    warranty: "2 Years", relatedSlugs: ["dsppa-dma6112", "dsppa-dma250u"]
    priceNPR: "NPR 1,20,000",
  },
  {
    id: "dsppa-mag6182ii", slug: "dsppa-mag6182ii",
    name: "DSPPA MAG6182II", brand: "DSPPA", brandSlug: "dsppa",
    category: "ip-network-audio", subcategory: "IP Network PA Server",
    tagline: "IP Network PA Management Server — 17\" Touch Screen",
    badge: "Featured",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#0B1E3D",
    description: "Central management server for DSPPA MAG6000 IP Network PA systems. Industrial circuit board, 17\" true-color touch screen, dual-server redundancy with automatic backup. Supports TTS announcements in Chinese and English, scheduled broadcasts, recording and full web-based remote monitoring.",
    keyFeatures: [
      { title: "17\" Touch Screen", desc: "Large industrial-grade color touchscreen for intuitive system management." },
      { title: "Dual Server Redundancy", desc: "2 servers + 1 database ensure zero single-point-of-failure for mission-critical PA." },
      { title: "TTS Announcements", desc: "Built-in text-to-speech in Chinese and English generates automated timed broadcasts." },
      { title: "Unlimited Zones", desc: "No zone hardware limit — add zones via software as your installation grows." },
      { title: "Remote Web Control", desc: "Full configuration and monitoring from any browser on the network." },
    ],
    specs: [
      { label: "Display", value: "17\" True Color Touch Screen", highlight: true, group: "Control" },

      { label: "Redundancy", value: "Dual Server + Auto Backup", highlight: true, group: "Standard" },

      { label: "Zones", value: "Unlimited (software)", highlight: true, group: "Output" },

      { label: "TTS", value: "Chinese & English", group: "Control" },

      { label: "Storage", value: "SD Card Recording", group: "Media" },

      { label: "Control", value: "Local + Web Browser", group: "Connectivity" },

    ],
    applications: ["Transportation", "Government", "Education", "Hospital"],
    warranty: "2 Years", relatedSlugs: ["dsppa-mag6806", "dsppa-pava9500"]
    priceNPR: "NPR 3,50,000",
  },
  {
    id: "dsppa-mag6806", slug: "dsppa-mag6806",
    name: "DSPPA MAG6806", brand: "DSPPA", brandSlug: "dsppa",
    category: "ip-network-audio", subcategory: "IP Network Amplifier",
    tagline: "60W IP Network Digital Power Amplifier",
    imageUrl: "https://images.unsplash.com/photo-1535223289429-462dc99e4d34?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#0B1E3D",
    description: "Rack-mount IP network amplifier for MAG6000 distributed PA systems. 60W at 100V with TCP/IP control, built-in media player (USB/SD), AUX and EMC inputs. Available in 60W, 120W, 250W, 350W, 650W versions. Digital display shows system status and time.",
    keyFeatures: [
      { title: "60W–650W Range", desc: "One product family from MAG6806 to MAG6865 — select power for each zone's speaker load." },
      { title: "TCP/IP Control", desc: "Self-adaptive 10/100M network for integration with MAG6182II management server." },
      { title: "Built-in Media Player", desc: "USB and SD card slots for local audio playback without a network source." },
      { title: "EMC Emergency Override", desc: "Dedicated EMC input ensures emergency broadcasts override all content instantly." },
    ],
    specs: [
      { label: "RMS Power", value: "60W (120/250/350/650W available)", highlight: true, group: "Output" },

      { label: "Output", value: "100V @90% efficiency", highlight: true },
      { label: "Network", value: "TCP/IP 10/100M adaptive", group: "Connectivity" },

      { label: "Inputs", value: "1 AUX, 1 Mic, 1 EMC", group: "Input" },

      { label: "Media", value: "USB + SD card", group: "Media" },

      { label: "Rack Mount", value: "1U 19\"", group: "Physical" },

    ],
    applications: ["Hotel", "Transportation", "Corporate", "Education"],
    warranty: "2 Years", relatedSlugs: ["dsppa-mag6182ii", "dsppa-dsp6011"]
    priceNPR: "NPR 55,000",
  },
  {
    id: "dsppa-dsp6011", slug: "dsppa-dsp6011",
    name: "DSPPA DSP6011", brand: "DSPPA", brandSlug: "dsppa",
    category: "ceiling-speakers", subcategory: "Frameless Ceiling Speaker",
    tagline: "6W 6.5\" Frameless Ceiling Speaker — 100V & 4Ω",
    badge: "Best Seller",
    imageUrl: "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#2563EB",
    description: "Standard commercial ceiling speaker for background music and PA systems. 6W with 100V transformer taps (3W–6W) and 4Ω direct output. Frameless aluminum grille, spring-clip installation — no screws required. 90Hz–15kHz frequency response, 90dB sensitivity.",
    keyFeatures: [
      { title: "Dual Input Mode", desc: "100V constant-voltage transformer taps AND direct 4Ω input — works with any amplifier type." },
      { title: "Spring-Clip Installation", desc: "Tool-free mounting into 165–170mm cutout — saves installation time." },
      { title: "Aluminum Grille", desc: "Durable aluminum grille resists corrosion in humid environments — hotels, hospitals, spas." },
    ],
    specs: [
      { label: "RMS Power", value: "6W", highlight: true, group: "Output" },

      { label: "100V Taps", value: "3W / 6W", highlight: true, group: "Output" },

      { label: "Driver", value: "6.5\" Full Range", group: "Audio" },

      { label: "Sensitivity", value: "90dB (1W/1m)", group: "Audio" },

      { label: "Max SPL", value: "97±2dB", group: "Audio" },

      { label: "Frequency", value: "110Hz–15kHz", group: "Audio" },

      { label: "Cut-out", value: "Ø165–170mm", group: "Physical" },

      { label: "Grille", value: "Aluminum, White", group: "Physical" },

    ],
    applications: ["Hotel", "Corporate", "Education", "Hospital", "Religious"],
    warranty: "2 Years", relatedSlugs: ["dsppa-dsp5211", "dsppa-mag6806"]
    priceNPR: "NPR 8,500",
  },
  {
    id: "dsppa-dsp5211", slug: "dsppa-dsp5211",
    name: "DSPPA DSP5211", brand: "DSPPA", brandSlug: "dsppa",
    category: "ceiling-speakers", subcategory: "Coaxial Ceiling Speaker",
    tagline: "10W 6.5\" Coaxial Frameless Ceiling Speaker",
    imageUrl: "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#2563EB",
    description: "High-performance coaxial ceiling speaker with 6.5\" woofer and 0.75\" tweeter for extended frequency response. 10W with 100V taps (3W/6W/10W). 93dB sensitivity, 90Hz–18kHz response. Aluminum grille, spring-clip mounting. Ideal for boardrooms and premium hospitality spaces.",
    keyFeatures: [
      { title: "Coaxial 2-Way Design", desc: "6.5\" woofer + 0.75\" tweeter delivers extended high-frequency clarity versus single-driver designs." },
      { title: "10W with 3-Tap Transformer", desc: "100V taps at 3W, 6W and 10W allow fine-tuning of zone volume without a controller." },
      { title: "93dB Sensitivity", desc: "High sensitivity means less amplifier power is needed — reduces system cost and heat." },
    ],
    specs: [
      { label: "RMS Power", value: "10W", highlight: true, group: "Output" },

      { label: "100V Taps", value: "3W / 6W / 10W", highlight: true, group: "Output" },

      { label: "Drivers", value: "6.5\" + 0.75\" Coaxial", highlight: true, group: "Audio" },

      { label: "Sensitivity", value: "93dB (1W/1m)", group: "Audio" },

      { label: "Max SPL", value: "103±2dB", group: "Audio" },

      { label: "Frequency", value: "90Hz–18kHz", group: "Audio" },

      { label: "Cut-out", value: "Ø165–170mm", group: "Physical" },

    ],
    applications: ["Corporate", "Hotel", "Government", "Education"],
    warranty: "2 Years", relatedSlugs: ["dsppa-dsp6011", "dsppa-dsp255ii"]
    priceNPR: "NPR 12,000",
  },
  {
    id: "dsppa-dsp255ii", slug: "dsppa-dsp255ii",
    name: "DSPPA DSP255II", brand: "DSPPA", brandSlug: "dsppa",
    category: "column-speakers", subcategory: "Waterproof Column Speaker",
    tagline: "30W Waterproof Column Speaker — Indoor & Outdoor",
    imageUrl: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#2563EB",
    description: "30W waterproof column speaker with dual 3\" woofers and 1\" tweeter. Aluminum housing with waterproof drivers — built for outdoor courtyards, covered walkways, transit platforms and sports facilities. 100V and 70V compatible with bracket included.",
    keyFeatures: [
      { title: "Waterproof Design", desc: "Waterproof drivers and aluminum housing for permanent outdoor and semi-outdoor installation." },
      { title: "Column Dispersion", desc: "Narrow vertical, wide horizontal pattern reduces ceiling reflection and improves speech clarity." },
      { title: "Bracket Included", desc: "Wall-mount bracket included — adjustable tilt for optimal coverage angle." },
    ],
    specs: [
      { label: "RMS Power", value: "30W", highlight: true, group: "Output" },

      { label: "Drivers", value: "2×3\" Woofer + 1\" Tweeter", highlight: true, group: "Audio" },

      { label: "100V Taps", value: "8W / 15W / 30W", group: "Output" },

      { label: "70V Taps", value: "8W / 15W", group: "Output" },

      { label: "Weather", value: "Waterproof Aluminum", group: "Physical" },

    ],
    applications: ["Transportation", "Education", "Government", "Stadium"],
    warranty: "2 Years", relatedSlugs: ["dsppa-dsp6011", "dsppa-dsp161hd"]
    priceNPR: "NPR 22,000",
  },
  {
    id: "dsppa-dsp161hd", slug: "dsppa-dsp161hd",
    name: "DSPPA DSP161HD", brand: "DSPPA", brandSlug: "dsppa",
    category: "horn-speakers", subcategory: "Hi-Fi Horn Speaker",
    tagline: "25W High-Fidelity Outdoor Horn Speaker — IP66",
    imageUrl: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#2563EB",
    description: "Hi-Fi two-way horn speaker with built-in 70V/100V transformer, IP66 waterproof rating and high-quality alloy-aluminum housing. Wide frequency response and high sensitivity for outdoor background music and paging at railway stations, shopping malls, parking lots and factories.",
    keyFeatures: [
      { title: "IP66 Waterproof", desc: "Fully weatherproof for permanent outdoor installation — rain, dust and UV resistant." },
      { title: "Hi-Fi Two-Way", desc: "Dual-driver design provides clear, wide-frequency audio — not just voice-grade horn clarity." },
      { title: "100V Transformer Built-in", desc: "Direct connection to 70V/100V PA systems — no external matching transformer required." },
    ],
    specs: [
      { label: "RMS Power", value: "25W", highlight: true, group: "Output" },

      { label: "Weather Rating", value: "IP66", highlight: true, group: "Physical" },

      { label: "100V Taps", value: "Multiple", group: "Output" },

      { label: "Housing", value: "Alloy Aluminum", group: "Physical" },

      { label: "Design", value: "2-Way Hi-Fi" },
    ],
    applications: ["Transportation", "Stadium", "Government", "Education"],
    warranty: "2 Years", relatedSlugs: ["dsppa-dsp255ii", "dsppa-dsp6011"]
    priceNPR: "NPR 18,000",
  },
]

// ─── INFOBIT ─────────────────────────────────────────────────────────────────
const INFOBIT: Product[] = [
  {
    id: "infobit-vb50", slug: "infobit-vb50",
    name: "InfoBit iCam VB50", brand: "InfoBit", brandSlug: "infobit",
    category: "video-conferencing", subcategory: "All-in-One Video Bar",
    tagline: "4K All-in-One Conference Video Bar with AI Auto-Framing",
    badge: "Best Seller",
    imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#6366F1",
    description: "The iCam VB50 combines a 4K camera, microphone array and speaker into a single USB bar — plug-in and your meeting room is ready. AI auto-framing tracks active speakers, 5× digital zoom, 120° wide-angle lens, and Bluetooth. Works with Zoom, Teams, WebEx and all major UC platforms.",
    keyFeatures: [
      { title: "4K + AI Auto-Framing", desc: "Automatically frames and tracks participants — no manual camera adjustment needed." },
      { title: "6m Sound Pickup", desc: "Integrated microphone array covers medium meeting rooms up to 25 sqm." },
      { title: "Single USB 3.0 Connection", desc: "One cable powers and connects — plug-and-play with any laptop or room PC." },
      { title: "Bluetooth Supported", desc: "Connect mobile phones directly to the bar for wireless audio." },
      { title: "HDMI 2.0 Out", desc: "Direct HDMI output to display — works without a PC for dedicated room systems." },
    ],
    specs: [
      { label: "Resolution", value: "4K UHD 30fps", highlight: true, group: "Video" },

      { label: "Zoom", value: "5× Digital", highlight: true },
      { label: "HFOV", value: "110°", highlight: true },
      { label: "Sound Pickup", value: "6m range" },
      { label: "USB", value: "3.0 Host + Device", group: "Connectivity" },

      { label: "HDMI", value: "2.0 Output", group: "Connectivity" },

      { label: "Bluetooth", value: "Supported" },
    ],
    applications: ["Corporate", "Education", "Government", "Hotel"],
    warranty: "2 Years", relatedSlugs: ["infobit-vb60", "infobit-vb80", "infobit-icam-p30"]
    priceNPR: "NPR 85,000",
  },
  {
    id: "infobit-vb60", slug: "infobit-vb60",
    name: "InfoBit iCam VB60", brand: "InfoBit", brandSlug: "infobit",
    category: "video-conferencing", subcategory: "All-in-One Video Bar",
    tagline: "4K Conference Video Bar with 5m Pickup & Expansion Mic",
    badge: "Popular",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#6366F1",
    description: "Upgraded from VB50 with speaker voice tracking, 5m pickup, USB HID support and daisy-chainable expansion microphones up to 4 units via RJ45. Ideal for medium-large meeting rooms. Works with Zoom Rooms, Teams Rooms and WebEx Devices.",
    keyFeatures: [
      { title: "Speaker Voice Tracking", desc: "Camera automatically follows the active speaker — keeps remote participants engaged." },
      { title: "5m Pickup Range", desc: "Covers meeting rooms up to 30 sqm without additional microphones." },
      { title: "4× Daisy-Chain Mics", desc: "Expand coverage by chaining up to 4 expansion microphones via RJ45." },
      { title: "USB HID Support", desc: "Full USB HID for Teams Rooms and Zoom Rooms certified deployments." },
    ],
    specs: [
      { label: "Resolution", value: "4K UHD 30fps", highlight: true, group: "Video" },

      { label: "HFOV", value: "107°", highlight: true },
      { label: "Sound Pickup", value: "5m (up to 4 expansion mics)", highlight: true },
      { label: "Expansion Mics", value: "Up to 4 via RJ45" },
      { label: "USB HID", value: "Supported" },
      { label: "Zoom", value: "5× Digital" },
    ],
    applications: ["Corporate", "Government", "Education"],
    warranty: "2 Years", relatedSlugs: ["infobit-vb50", "infobit-vb80"]
    priceNPR: "NPR 1,25,000",
  },
  {
    id: "infobit-vb80", slug: "infobit-vb80",
    name: "InfoBit iCam VB80", brand: "InfoBit", brandSlug: "infobit",
    category: "video-conferencing", subcategory: "BYOD/BYOM Video Bar",
    tagline: "4K All-in-One BYOD/BYOM Bar with Wireless Presentation",
    badge: "New",
    imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#6366F1",
    description: "The VB80 is InfoBit's premium video bar — 4K with 120° FOV, 4× MEMS microphone array (8m range), HDMI wired BYOD, wireless Airplay/Miracast BYOM, and Android OS for standalone operation. Up to 5 expansion mics, WiFi, and iShare MC dongle support.",
    keyFeatures: [
      { title: "Wireless BYOD via Airplay/Miracast", desc: "Present wirelessly from any device — no dongle required for most platforms." },
      { title: "8m Microphone Range", desc: "4× MEMS digital mic arrays cover large boardrooms up to 50 sqm." },
      { title: "Android OS On-board", desc: "Runs Zoom Rooms or Teams Rooms natively — no external PC required." },
      { title: "5 Expansion Mics", desc: "Up to 5 RJ45 expansion microphones for very large conference rooms." },
    ],
    specs: [
      { label: "Resolution", value: "4K UHD 30fps", highlight: true, group: "Video" },

      { label: "HFOV", value: "107.5°", highlight: true },
      { label: "Mic Range", value: "8m (up to 5 expansion mics)", highlight: true },
      { label: "Wireless BYOD", value: "Airplay + Miracast" },
      { label: "OS", value: "Android (built-in)" },
      { label: "Camera Presets", value: "3" },
    ],
    applications: ["Corporate", "Government"],
    warranty: "2 Years", relatedSlugs: ["infobit-vb50", "infobit-vb60", "infobit-ishare-x200"]
    priceNPR: "NPR 1,85,000",
  },
  {
    id: "infobit-icam-p30", slug: "infobit-icam-p30",
    name: "InfoBit iCam P30", brand: "InfoBit", brandSlug: "infobit",
    category: "conference-cameras", subcategory: "4K PTZ Camera",
    tagline: "4K UHD AI Auto-Tracking PTZ Conference Camera",
    badge: "Featured",
    imageUrl: "https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#6366F1",
    description: "Professional 4K PTZ camera with AI-based human body detection for automatic target tracking. 12× optical zoom, 80.8° HFOV. Outputs via USB 3.0, HDMI and Ethernet. Compatible with Zoom, Teams, WebEx. Ideal for lecture halls, broadcast studios and large boardrooms.",
    keyFeatures: [
      { title: "AI Auto-Tracking", desc: "Deep learning human body detection — tracks presenter even without face-to-camera." },
      { title: "4K@60fps + 12× Optical", desc: "Ultra-sharp 4K output at 60fps with smooth 12× optical zoom for distant subjects." },
      { title: "Triple Output", desc: "Simultaneous USB 3.0, HDMI and IP (Ethernet) outputs for flexible integration." },
      { title: "255 Presets", desc: "Store and recall up to 255 camera positions for automated shot control." },
    ],
    specs: [
      { label: "Resolution", value: "4K UHD @60fps", highlight: true, group: "Video" },

      { label: "Optical Zoom", value: "12×", highlight: true, group: "Video" },

      { label: "HFOV", value: "80.8°", highlight: true },
      { label: "Sensor", value: "1/2.8\" CMOS, 2.14MP", group: "Video" },

      { label: "Outputs", value: "USB 3.0 + HDMI + IP" },
      { label: "Presets", value: "255", group: "AI" },

      { label: "Control", value: "RS232, IP, IR Remote", group: "Connectivity" },

    ],
    applications: ["Education", "Government", "Corporate", "Religious"],
    warranty: "2 Years", relatedSlugs: ["infobit-icam-p40", "infobit-vb50"]
    priceNPR: "NPR 1,20,000",
  },
  {
    id: "infobit-icam-p40", slug: "infobit-icam-p40",
    name: "InfoBit iCam P40", brand: "InfoBit", brandSlug: "infobit",
    category: "conference-cameras", subcategory: "PTZ Lecturer Tracking",
    tagline: "Dual-Lens AI Lecturer Tracking PTZ Camera — 1080P60 SDI",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#6366F1",
    description: "Specialized dual-lens PTZ for lecture capture and distance learning. AI human body detection locks onto the presenter and adjusts pan/tilt/zoom automatically — even adjusts for the lecturer's height. Dedicated 1080P60 SDI tracking output plus wide overview output.",
    keyFeatures: [
      { title: "AI Lecturer Tracking", desc: "Automatically follows the lecturer's movement across the stage — no camera operator needed." },
      { title: "Dual-Lens System", desc: "Separate tracking and overview lenses allow simultaneous tight close-up and wide room shot." },
      { title: "1080P60 SDI Tracking Output", desc: "Broadcast-grade SDI output for recording systems and live streaming encoders." },
      { title: "Height Auto-Adjust", desc: "Adapts framing based on the lecturer's height — consistent shots regardless of presenter." },
    ],
    specs: [
      { label: "Tracking Output", value: "1080P60 3G-SDI", highlight: true },
      { label: "Optical Zoom", value: "20×", highlight: true, group: "Video" },

      { label: "Outputs", value: "3G-SDI, HDMI, USB3.0, Ethernet" },
      { label: "AI Tracking", value: "Body Detection (no face required)", group: "AI" },

      { label: "Control", value: "RS232, RS485, IP", group: "Connectivity" },

    ],
    applications: ["Education", "Government", "Religious"],
    warranty: "2 Years", relatedSlugs: ["infobit-icam-p30", "infobit-vb60"]
    priceNPR: "NPR 1,85,000",
  },
  {
    id: "infobit-ishare-x200", slug: "infobit-ishare-x200",
    name: "InfoBit iShare X200", brand: "InfoBit", brandSlug: "infobit",
    category: "wireless-presentation", subcategory: "Wireless Presentation System",
    tagline: "4K60 Wireless Presentation — 0.1s Latency, 16 Users",
    badge: "Best Seller",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#6366F1",
    description: "Enterprise-grade wireless presentation system with 4K60Hz output, dual WiFi, 0.1-second mirroring latency and 30m range. Supports USB-A, HDMI and USB-C dongles, portrait and landscape screens, and up to 16 simultaneous users. Built-in whiteboard and annotation tools.",
    keyFeatures: [
      { title: "0.1s Ultra-Low Latency", desc: "Essentially zero perceptible lag — no more awkward delays during presentations." },
      { title: "4K60Hz Output", desc: "Full 4K resolution at 60fps — crisp visuals on any 4K display." },
      { title: "16 Simultaneous Users", desc: "Up to 16 participants can connect at once — host selects whose screen to show." },
      { title: "Instant Show/Hide", desc: "One-button screen sharing — no software to install on presenter's device." },
      { title: "Dual WiFi", desc: "Dual-band WiFi ensures reliable connection in crowded RF environments." },
    ],
    specs: [
      { label: "Output Resolution", value: "4K UHD @60Hz", highlight: true },
      { label: "Latency", value: "0.1 seconds", highlight: true },
      { label: "Max Users", value: "16 simultaneous", highlight: true },
      { label: "Range", value: "30m wireless" },
      { label: "Dongles", value: "USB-A, HDMI, USB-C" },
      { label: "Tools", value: "Whiteboard, Annotation" },
    ],
    applications: ["Corporate", "Education", "Government", "Hotel"],
    warranty: "2 Years", relatedSlugs: ["infobit-vb50", "infobit-vb80", "infobit-iwall-204"]
    priceNPR: "NPR 1,50,000",
  },
  {
    id: "infobit-iwall-204", slug: "infobit-iwall-204",
    name: "InfoBit iWall 204", brand: "InfoBit", brandSlug: "infobit",
    category: "video-walls", subcategory: "4K Video Wall Controller",
    tagline: "4K60 2×4 HDMI Video Wall Controller with TCP/IP Control",
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e23?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#6366F1",
    description: "2-input, 4-output HDMI video wall controller with 4K60Hz input and output. Supports flexible M×N video wall configurations up to 6×6, RS232 and TCP/IP control. Built-in audio de-embedding. Ideal for control rooms, lobbies and multi-display signage walls.",
    keyFeatures: [
      { title: "4K60 In and Out", desc: "Full 4K60Hz on both inputs and outputs — no resolution compromise across the wall." },
      { title: "Flexible M×N Layouts", desc: "Configure any video wall layout up to 6×6 via web interface or RS232." },
      { title: "Audio De-embedding", desc: "Extract audio from HDMI signal to 3-pin phoenix or 3.5mm output." },
      { title: "TCP/IP + RS232 Control", desc: "Full API control for AV control systems (Crestron, AMX, Extron compatible)." },
    ],
    specs: [
      { label: "Inputs", value: "2× HDMI 4K60", highlight: true, group: "Input" },

      { label: "Outputs", value: "4× HDMI 4K60", highlight: true },
      { label: "Max Wall Config", value: "M×N up to 6×6", highlight: true },
      { label: "Control", value: "TCP/IP + RS232", group: "Connectivity" },

      { label: "Audio Out", value: "Phoenix + 3.5mm" },
    ],
    applications: ["Corporate", "Government", "Hotel", "Transportation"],
    warranty: "2 Years", relatedSlugs: ["infobit-iwall-109", "infobit-ishare-x200"]
    priceNPR: "NPR 3,80,000",
  },
  {
    id: "infobit-iwall-109", slug: "infobit-iwall-109",
    name: "InfoBit iWall 109", brand: "InfoBit", brandSlug: "infobit",
    category: "video-walls", subcategory: "Video Wall Controller",
    tagline: "1×9 4K30 Video Wall Controller — Plug-and-Play",
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e23?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#6366F1",
    description: "Ultra-simple 1-input to 9-output video wall controller. Plug-and-play with IR remote control and multiple preset video wall modes. Supports 8/10/12-bit deep color. Perfect for retail, hospitality and public space multi-screen setups without complex configuration.",
    keyFeatures: [
      { title: "1 Input → 9 Displays", desc: "Drive up to 9 screens from a single HDMI source — create impressive video walls effortlessly." },
      { title: "Plug-and-Play", desc: "No software needed — preset wall modes selectable via IR remote." },
      { title: "Deep Color", desc: "8/10/12-bit deep color support for accurate, vibrant display reproduction." },
    ],
    specs: [
      { label: "Inputs", value: "1× HDMI 4K30", highlight: true, group: "Input" },

      { label: "Outputs", value: "9× HDMI 1080P", highlight: true },
      { label: "Deep Color", value: "8/10/12-bit" },
      { label: "Control", value: "IR Remote", group: "Connectivity" },

    ],
    applications: ["Hotel", "Corporate", "Transportation", "Religious"],
    warranty: "2 Years", relatedSlugs: ["infobit-iwall-204", "infobit-ishare-x200"]
    priceNPR: "NPR 2,20,000",
  },
  {
    id: "infobit-ispeaker-m500", slug: "infobit-ispeaker-m500",
    name: "InfoBit iSpeaker M500", brand: "InfoBit", brandSlug: "infobit",
    category: "conference-audio", subcategory: "USB Speakerphone",
    tagline: "8-Element Beamforming Speakerphone — 5m Range, 5-Unit Cascade",
    badge: "Popular",
    imageUrl: "https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#6366F1",
    description: "Professional USB omnidirectional speakerphone with 8-element beamforming microphone array, full-duplex communication, and echo cancellation with AGC. Up to 5 units daisy-chainable for large conference rooms up to 100 sqm. Works with all UC platforms.",
    keyFeatures: [
      { title: "8-Element Beamforming", desc: "Electronically steerable beam focuses on the active speaker, rejecting noise from other directions." },
      { title: "5-Unit Daisy Chain", desc: "Chain up to 5 iSpeaker M500 units to cover rooms up to 100 sqm uniformly." },
      { title: "Echo Cancellation + AGC", desc: "DSP processing eliminates echo and automatically adjusts gain for consistent voice levels." },
      { title: "Full Duplex", desc: "Both sides can speak simultaneously — no half-duplex cutting or clipping." },
    ],
    specs: [
      { label: "Microphones", value: "8-element Beamforming", highlight: true },
      { label: "Pickup Range", value: "5m radius", highlight: true },
      { label: "Cascade", value: "Up to 5 units", highlight: true },
      { label: "Connection", value: "USB Type-C" },
      { label: "Coverage", value: "Up to 100 sqm" },
      { label: "Participants", value: "20+" },
    ],
    applications: ["Corporate", "Government", "Education"],
    warranty: "2 Years", relatedSlugs: ["infobit-vb50", "infobit-vb60"]
    priceNPR: "NPR 45,000",
  },
  {
    id: "infobit-iswitch-265", slug: "infobit-iswitch-265",
    name: "InfoBit iSwitch 265", brand: "InfoBit", brandSlug: "infobit",
    category: "av-switching", subcategory: "HDMI Matrix Switcher",
    tagline: "4K60 HDMI 2×6 Seamless Matrix Switcher with Dante DSP",
    badge: "New",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#6366F1",
    description: "Advanced 6-input, 4-output seamless matrix switcher (iMatrix C604) with Dante audio networking and onboard DSP. Full USB-C input with 4K60, USB 3.1, network and 60W PD charging. Seamless switching, USB host switching, and 4K60 4:4:4 HDCP 2.2 compliant.",
    keyFeatures: [
      { title: "USB-C with 60W PD", desc: "Full-featured USB-C input: 4K60 video + data + 60W charging — one cable for laptops." },
      { title: "Dante Audio Integration", desc: "Built-in Dante audio processing for integration with networked audio systems." },
      { title: "Seamless Switching", desc: "No black screen or flicker between source switches — critical for presentations." },
      { title: "USB Host Extension", desc: "Route USB peripherals (webcam, keyboard) to any source in the matrix." },
    ],
    specs: [
      { label: "Inputs", value: "6 (incl. USB-C)", highlight: true, group: "Input" },

      { label: "Outputs", value: "4× HDMI 4K60", highlight: true },
      { label: "Audio", value: "Dante + DSP", highlight: true },
      { label: "USB-C PD", value: "60W Charging" },
      { label: "HDCP", value: "2.2 Compliant", group: "Video" },

    ],
    applications: ["Corporate", "Education", "Government"],
    warranty: "2 Years", relatedSlugs: ["infobit-ishare-x200", "infobit-vb80"]
    priceNPR: "NPR 2,50,000",
  },
]

// ─── TENVEO ─────────────────────────────────────────────────────────────────
const TENVEO: Product[] = [
  {
    id: "tenveo-cc600", slug: "tenveo-cc600",
    name: "Tenveo CC600", brand: "Tenveo", brandSlug: "tenveo",
    category: "conference-cameras", subcategory: "360° All-in-One Camera",
    tagline: "4K 360° All-in-One Conference Webcam with Auto-Framing",
    badge: "Best Seller",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#0EA5E9",
    description: "The CC600 is a 4K 360-degree all-in-one conference camera with omnidirectional microphone, designed for small to medium meeting rooms. Auto-framing adjusts to keep all participants in view. Portable, compact design — works with any UC platform via USB. No drivers needed.",
    keyFeatures: [
      { title: "360° Field of View", desc: "Full panoramic coverage — everyone in the room is visible without camera repositioning." },
      { title: "4K UHD CMOS", desc: "High-resolution sensor with minimal distortion across the full 360° view." },
      { title: "Auto-Framing", desc: "Automatically adjusts digital zoom and crop to keep active participants centered." },
      { title: "Omnidirectional Microphone", desc: "Integrated omni microphone picks up voices from all directions simultaneously." },
      { title: "Plug-and-Play USB", desc: "No drivers or software required — connects instantly to any Windows or Mac laptop." },
    ],
    specs: [
      { label: "Resolution", value: "4K UHD", highlight: true, group: "Video" },

      { label: "Field of View", value: "360°", highlight: true },
      { label: "Connection", value: "USB" },
      { label: "Microphone", value: "Omnidirectional", group: "Audio" },

      { label: "Compatibility", value: "Zoom, Teams, WebEx, Google Meet" },
    ],
    applications: ["Corporate", "Education", "Government"],
    warranty: "3 Years", relatedSlugs: ["tenveo-vhd612a", "tenveo-m5b"]
    priceNPR: "NPR 1,20,000",
  },
  {
    id: "tenveo-vhd612a", slug: "tenveo-vhd612a",
    name: "Tenveo VHD612A", brand: "Tenveo", brandSlug: "tenveo",
    category: "conference-cameras", subcategory: "PTZ Camera",
    tagline: "12× Optical Zoom HD PTZ Camera — USB/HDMI/SDI/IP",
    badge: "Popular",
    imageUrl: "https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#0EA5E9",
    description: "Professional 1080P PTZ conference camera with 12× optical zoom, 8× digital zoom and 77.5° wide angle. Quad output: USB, HDMI, SDI and IP/RJ45 simultaneously. RS232/RS485/USB control, 10 IR presets (256 via RS232). Ideal for medium-to-large conference rooms and live streaming.",
    keyFeatures: [
      { title: "12× Optical + 8× Digital Zoom", desc: "Total 96× zoom range for precise framing of presenters at any distance." },
      { title: "Quad Output", desc: "USB, HDMI, 3G-SDI and IP outputs available simultaneously — connect to any system." },
      { title: "RS232/RS485 Control", desc: "Professional PTZ control via serial and IP — compatible with all major control systems." },
      { title: "256 Presets", desc: "Store 256 camera positions for automated multi-angle production workflows." },
      { title: "Smooth & Silent PTZ", desc: "Precision motor drive — no noise or jitter during pan, tilt or zoom movements." },
    ],
    specs: [
      { label: "Optical Zoom", value: "12×", highlight: true, group: "Video" },

      { label: "Resolution", value: "1080P Full HD", highlight: true, group: "Video" },

      { label: "Outputs", value: "USB + HDMI + SDI + RJ45", highlight: true },
      { label: "Sensor", value: "2.38MP 1/2.8\" CMOS", group: "Video" },

      { label: "Wide Angle", value: "77.5°" },
      { label: "Digital Zoom", value: "8×", group: "Video" },

      { label: "Presets", value: "10 (IR) / 256 (RS232)", group: "AI" },

      { label: "Control", value: "RS232, RS485, USB, IP", group: "Connectivity" },

    ],
    applications: ["Corporate", "Education", "Government", "Religious"],
    warranty: "3 Years", relatedSlugs: ["tenveo-vhd620a", "tenveo-uv620a", "tenveo-cc600"]
    priceNPR: "NPR 1,85,000",
  },
  {
    id: "tenveo-vhd620a", slug: "tenveo-vhd620a",
    name: "Tenveo VHD620A", brand: "Tenveo", brandSlug: "tenveo",
    category: "conference-cameras", subcategory: "PTZ Camera",
    tagline: "20× Optical Zoom HD PTZ Camera — HDMI/USB/SDI/IP",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#0EA5E9",
    description: "Extended-reach PTZ camera with 20× optical zoom and 69.5° wide angle for large auditoriums and lecture halls. H.264/H.265 video encoding, simultaneous HDMI/USB/SDI/IP outputs, ceiling and wall mount support. NDI optional for broadcast-grade IP production.",
    keyFeatures: [
      { title: "20× Optical Zoom", desc: "Ideal for large rooms — clearly frame a speaker at 20–30m without quality loss." },
      { title: "H.264/H.265 Encoding", desc: "Efficient video compression for low-bandwidth IP streaming and recording." },
      { title: "NDI Optional", desc: "Optional NDI|HX support for integration into professional broadcast IP workflows." },
      { title: "Reverse Mountable", desc: "Ceiling and wall mount support with reverse mounting for inverted ceiling installation." },
    ],
    specs: [
      { label: "Optical Zoom", value: "20×", highlight: true, group: "Video" },

      { label: "Resolution", value: "1080P Full HD", highlight: true, group: "Video" },

      { label: "Encoding", value: "H.264 / H.265", highlight: true },
      { label: "Sensor", value: "2.38MP 1/2.8\" CMOS", group: "Video" },

      { label: "Wide Angle", value: "69.5°" },
      { label: "Outputs", value: "HDMI, USB, SDI, IP" },
      { label: "Control", value: "RS232, RS485, USB, IP", group: "Connectivity" },

    ],
    applications: ["Education", "Government", "Religious", "Corporate"],
    warranty: "3 Years", relatedSlugs: ["tenveo-vhd612a", "tenveo-uv620a"]
    priceNPR: "NPR 2,50,000",
  },
  {
    id: "tenveo-uv620a", slug: "tenveo-uv620a",
    name: "Tenveo UV620A", brand: "Tenveo", brandSlug: "tenveo",
    category: "conference-cameras", subcategory: "4K AI PTZ Camera",
    tagline: "4K@60fps AI Auto-Tracking 20× PTZ Camera with NDI",
    badge: "Featured",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#0EA5E9",
    description: "Flagship 4K AI tracking PTZ camera with 8.29MP 1/1.8\" Sony CMOS sensor delivering 4K@60fps on HDMI/USB/IP and 1080P60 on 3G-SDI. AI auto-tracking with Auto Framing, Presenter Tracking and Zone Tracking. NDI|HX2, SRT, ONVIF, RTSP, RTMP support.",
    keyFeatures: [
      { title: "4K@60fps High Frame Rate", desc: "Ultra-smooth 4K video at 60fps — eliminates motion blur in fast-paced presentations." },
      { title: "AI Triple Tracking Modes", desc: "Auto Framing, Presenter Tracking and Zone Tracking — adapts to any presentation style." },
      { title: "NDI|HX2 + SRT", desc: "Professional IP production protocols for broadcast, streaming and AV-over-IP systems." },
      { title: "8.29MP Sony CMOS", desc: "Large 1/1.8\" Sony sensor for exceptional low-light performance in any room." },
      { title: "PoE Powered", desc: "Single CAT cable for power + data — simplifies installation, eliminates power cables." },
    ],
    specs: [
      { label: "Resolution", value: "4K UHD @60fps", highlight: true, group: "Video" },

      { label: "Optical Zoom", value: "20×", highlight: true, group: "Video" },

      { label: "Sensor", value: "8.29MP Sony 1/1.8\"", highlight: true, group: "Video" },

      { label: "SDI Output", value: "1080P60 3G-SDI" },
      { label: "Protocols", value: "NDI|HX2, SRT, ONVIF, RTSP, RTMP" },
      { label: "Power", value: "PoE (IEEE 802.3at)", group: "Output" },

      { label: "AI Tracking", value: "Auto Frame + Presenter + Zone", group: "AI" },

    ],
    applications: ["Education", "Government", "Corporate", "Religious"],
    warranty: "3 Years", relatedSlugs: ["tenveo-vhd620a", "tenveo-vhd612a", "tenveo-kb200pro"]
    priceNPR: "NPR 2,80,000",
  },
  {
    id: "tenveo-va612ex", slug: "tenveo-va612ex",
    name: "Tenveo VA612EX", brand: "Tenveo", brandSlug: "tenveo",
    category: "video-conferencing", subcategory: "Conference Group Kit",
    tagline: "4K 12× PTZ + Speakerphone Conference Group Kit",
    badge: "New",
    imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#0EA5E9",
    description: "Complete conference room group kit: 4K 12× optical zoom PTZ camera with HDMI/USB output plus omnidirectional speakerphone with 9m pickup radius, HUB and all-in-one DP interface. AI tracking built-in. Designed for medium-to-large meeting rooms that need a single-box solution.",
    keyFeatures: [
      { title: "Complete Room Kit", desc: "Camera + speakerphone + HUB in one package — ready to deploy in under 30 minutes." },
      { title: "9m Pickup Radius", desc: "Speakerphone covers large rooms without additional microphone expansion." },
      { title: "4K 12× AI Tracking", desc: "PTZ camera with AI presenter tracking automatically keeps the speaker in frame." },
    ],
    specs: [
      { label: "Camera", value: "4K 12× Optical Zoom PTZ", highlight: true },
      { label: "Pickup Radius", value: "9m omnidirectional", highlight: true },
      { label: "Outputs", value: "HDMI, USB" },
      { label: "Encoding", value: "H.264, H.265, MJPG" },
      { label: "Control", value: "VISCA, Pelco-D, Pelco-P", group: "Connectivity" },

    ],
    applications: ["Corporate", "Education", "Government"],
    warranty: "3 Years", relatedSlugs: ["tenveo-vhd612a", "tenveo-m5b"]
    priceNPR: "NPR 1,20,000",
  },
  {
    id: "tenveo-m3b", slug: "tenveo-m3b",
    name: "Tenveo M3B", brand: "Tenveo", brandSlug: "tenveo",
    category: "conference-audio", subcategory: "Bluetooth Speakerphone",
    tagline: "USB-C & Bluetooth Speakerphone — 5m Pickup, Up to 5 People",
    imageUrl: "https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#0EA5E9",
    description: "Compact speakerphone with 2 omnidirectional microphones, 5m pickup range for up to 5 people. Connects via USB-C, Bluetooth (with dongle) or 3.5mm. Works with Zoom, Teams, Skype, Google Meet. LED indicators, 6-hour battery, plug-and-play on Windows, Mac, Android and Linux.",
    keyFeatures: [
      { title: "3 Connection Options", desc: "USB-C, Bluetooth dongle and 3.5mm jack — works with laptops, phones and tablets." },
      { title: "5m Coverage", desc: "Covers small to medium meeting rooms up to 20 sqm with 2 omnidirectional mics." },
      { title: "6-Hour Battery", desc: "Full-day meeting without plugging in — USB-C charging for quick top-up." },
    ],
    specs: [
      { label: "Microphones", value: "2 Omnidirectional", highlight: true },
      { label: "Pickup Range", value: "5m (up to 5 people)", highlight: true },
      { label: "Connection", value: "USB-C + Bluetooth + 3.5mm" },
      { label: "Battery", value: "6 hours", group: "Power" },

      { label: "Compatibility", value: "Zoom, Teams, WebEx, Google Meet" },
    ],
    applications: ["Corporate", "Education"],
    warranty: "3 Years", relatedSlugs: ["tenveo-m5b", "tenveo-cc600"]
    priceNPR: "NPR 45,000",
  },
  {
    id: "tenveo-m5b", slug: "tenveo-m5b",
    name: "Tenveo M5B", brand: "Tenveo", brandSlug: "tenveo",
    category: "conference-audio", subcategory: "USB Speakerphone",
    tagline: "4-Mic USB Speakerphone — 6m Pickup, 8000mAh Battery",
    badge: "Popular",
    imageUrl: "https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#0EA5E9",
    description: "Professional speakerphone with 4 high-fidelity omnidirectional microphones, 360° pickup up to 6m. USB, Bluetooth and 3.5mm connectivity. 8000mAh battery for 27-hour talk time. DSP noise cancellation and echo suppression. Works with all UC platforms on Windows, Mac, Android and Linux.",
    keyFeatures: [
      { title: "4 Omnidirectional Mics", desc: "360° pickup at 6m — no one gets cut off, even at the far end of the table." },
      { title: "27-Hour Talk Time", desc: "8000mAh battery lasts multiple full days of meetings on a single charge." },
      { title: "Triple Connectivity", desc: "USB, Bluetooth and 3.5mm cover any device — phone, tablet or laptop." },
    ],
    specs: [
      { label: "Microphones", value: "4 Omnidirectional", highlight: true },
      { label: "Pickup Range", value: "6m", highlight: true },
      { label: "Battery", value: "8000mAh / 27-hour talk", highlight: true, group: "Power" },

      { label: "Connection", value: "USB + Bluetooth + 3.5mm" },
      { label: "Compatibility", value: "All UC platforms" },
    ],
    applications: ["Corporate", "Education", "Government"],
    warranty: "3 Years", relatedSlugs: ["tenveo-m3b", "tenveo-cc600", "tenveo-vhd612a"]
    priceNPR: "NPR 65,000",
  },
  {
    id: "tenveo-kb200pro", slug: "tenveo-kb200pro",
    name: "Tenveo KB200 Pro", brand: "Tenveo", brandSlug: "tenveo",
    category: "camera-controllers", subcategory: "PTZ Keyboard Controller",
    tagline: "Professional PTZ Camera Keyboard Controller — NDI, ONVIF, 5\" LCD",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#0EA5E9",
    description: "Advanced PTZ controller with 5\" industrial LCD (4-split screen), 4D joystick, ONVIF/NDI/VISCA/PELCO-P/D support, independent IP control, up to 7 quick-select camera buttons and knob-based zoom/speed control. Ideal for live events, broadcasts and large lecture halls.",
    keyFeatures: [
      { title: "5\" 4-Split LCD", desc: "Monitor up to 4 camera feeds simultaneously on the built-in screen." },
      { title: "NDI + ONVIF + VISCA", desc: "Controls all major PTZ camera protocols — single controller for mixed camera systems." },
      { title: "4D Joystick", desc: "Smooth 4D joystick with variable speed for precise Pan, Tilt, Zoom and Focus." },
      { title: "7 Camera Quick-Select", desc: "Instant recall of up to 7 cameras — critical for fast-paced live production." },
    ],
    specs: [
      { label: "Display", value: "5\" LCD, 4-split screens", highlight: true, group: "Control" },

      { label: "Protocols", value: "NDI, ONVIF, VISCA, Pelco-P/D", highlight: true },
      { label: "Camera Buttons", value: "7 quick-select", highlight: true },
      { label: "Control", value: "4D Joystick + Knob", group: "Connectivity" },

      { label: "PoE", value: "Supported", group: "Connectivity" },

      { label: "Presets", value: "255", group: "AI" },

    ],
    applications: ["Education", "Religious", "Corporate", "Government"],
    warranty: "3 Years", relatedSlugs: ["tenveo-uv620a", "tenveo-vhd620a"]
    priceNPR: "NPR 85,000",
  },
  {
    id: "tenveo-nv20a-ai", slug: "tenveo-nv20a-ai",
    name: "Tenveo NV20A AI", brand: "Tenveo", brandSlug: "tenveo",
    category: "conference-cameras", subcategory: "AI Tracking PTZ Camera",
    tagline: "20× AI Auto-Tracking PTZ — USB/SDI/HDMI/IP with PoE",
    imageUrl: "https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#0EA5E9",
    description: "Full-featured 1080P AI tracking PTZ with 20× optical zoom, 65° wide angle and PoE power supply. Quad output: USB 3.0, SDI, HDMI and IP. RTSP, RTMP, ONVIF, GB28181 streaming protocols. VISCA over IP control. Perfect for mid-budget AI tracking installations.",
    keyFeatures: [
      { title: "AI Auto-Tracking", desc: "Tracks presenters automatically — reduces need for a dedicated camera operator." },
      { title: "PoE Powered", desc: "Single CAT cable runs power and data — no power supply or separate cable required." },
      { title: "Quad Output", desc: "USB, SDI, HDMI and IP simultaneously — connect to any recording or switching system." },
    ],
    specs: [
      { label: "Optical Zoom", value: "20×", highlight: true, group: "Video" },

      { label: "Resolution", value: "1080P Full HD", group: "Video" },

      { label: "AI Tracking", value: "Yes", highlight: true, group: "AI" },

      { label: "Outputs", value: "USB + SDI + HDMI + IP" },
      { label: "Power", value: "PoE 802.3af", group: "Output" },

      { label: "Protocols", value: "RTSP, RTMP, ONVIF, GB28181" },
    ],
    applications: ["Education", "Corporate", "Government"],
    warranty: "3 Years", relatedSlugs: ["tenveo-vhd620a", "tenveo-uv620a"]
    priceNPR: "NPR 2,20,000",
  },
  {
    id: "tenveo-x60ndi", slug: "tenveo-x60ndi",
    name: "Tenveo X60 NDI", brand: "Tenveo", brandSlug: "tenveo",
    category: "conference-cameras", subcategory: "NDI PTZ Camera",
    tagline: "4K NDI PTZ Camera — 8.29MP Sony Sensor, AI Tracking",
    badge: "New",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#0EA5E9",
    description: "Professional-grade NDI PTZ camera with 8.29MP Sony 1/2.8\" CMOS sensor, AI tracking, 20× optical zoom and 51.9° wide angle. Full NDI|HX2, RTSP, RTMP, VISCA over IP, SRT protocol support. HDMI, USB 3.0, SDI, IP output with 3.5mm audio I/O.",
    keyFeatures: [
      { title: "8.29MP Sony Sensor", desc: "Large 1/2.8\" Sony CMOS delivers exceptional image quality even in low light." },
      { title: "Full NDI|HX2", desc: "Native NDI for seamless integration with NewTek/vMix/OBS production environments." },
      { title: "AI Presenter Tracking", desc: "Automatically follows and frames the presenter throughout a session." },
    ],
    specs: [
      { label: "Sensor", value: "8.29MP Sony 1/2.8\"", highlight: true, group: "Video" },

      { label: "NDI", value: "NDI|HX2 Full Support", highlight: true },
      { label: "Optical Zoom", value: "20×", group: "Video" },

      { label: "Outputs", value: "HDMI + USB3.0 + SDI + IP" },
      { label: "Audio", value: "Line In/Out 3.5mm" },
      { label: "Protocols", value: "NDI|HX2, SRT, RTSP, RTMP, ONVIF" },
    ],
    applications: ["Corporate", "Education", "Religious"],
    warranty: "3 Years", relatedSlugs: ["tenveo-uv620a", "tenveo-vhd620a"]
    priceNPR: "NPR 3,80,000",
  },
]

// ─── FOCUS (GZFocus Smart Podiums) ───────────────────────────────────────────
const FOCUS: Product[] = [
  {
    id: "focus-st100", slug: "focus-st100",
    name: "Focus Smart Podium ST100", brand: "Focus", brandSlug: "focus",
    category: "smart-podiums", subcategory: "Premium Smart Podium",
    tagline: "Electric Height-Adjustable Smart Podium with 23.8\" Touch Screen",
    badge: "Best Seller",
    imageUrl: "https://img03.71360.com/w3/2vzk06/20240810/dd6c822824ff9e40be609268bf53cdbc.jpg",
    imageFallback: "#1E40AF",
    description: "The ST100 is a premium all-in-one smart podium crafted from solid Sapele wood with electric height adjustment (200mm lift range). Integrates a 23.8\" touch screen, 18.5\" advertising screen, OPS computer (Intel i5/i7, 16GB, 512GB SSD), dual gooseneck microphones and magnetic timer.",
    keyFeatures: [
      { title: "Electric Height Adjustment", desc: "200mm motorized lift range — accommodates speakers of all heights at the push of a button." },
      { title: "23.8\" Fully Bonded Touch Screen", desc: "10-point touch, fully bonded for anti-glare clarity — control presentations directly from the podium." },
      { title: "18.5\" Advertising Screen", desc: "Rear-facing acrylic advertising display for branding or session information." },
      { title: "OPS Computer Built-in", desc: "Intel i5/i7-11th Gen, 16GB DDR4, 512GB SSD, Windows 10 — fully self-contained computing." },
      { title: "Dual Gooseneck Microphones", desc: "Two 60cm professional gooseneck mics ensure clear voice capture at any podium position." },
      { title: "Sapele Wood Construction", desc: "Pure handmade solid wood carving — elegant enough for parliament halls and boardrooms." },
    ],
    specs: [
      { label: "Touch Screen", value: "23.8\", 10-point, Fully Bonded", highlight: true },
      { label: "Advertising Screen", value: "18.5\" Rear Display", highlight: true },
      { label: "Computer", value: "Intel i5/i7-11, 16GB, 512GB SSD", highlight: true },
      { label: "Height Adjustment", value: "Electric, 200mm range" },
      { label: "Microphones", value: "2× 60cm Gooseneck" },
      { label: "Interfaces", value: "USB×2, HDMI×1, Power Socket×1" },
      { label: "Material", value: "Sapele Wood + Aluminum + Steel" },
      { label: "Color", value: "Chinese Red & Black" },
      { label: "Size (Folded)", value: "750×620×1110mm" },
      { label: "Power", value: "110–240V 50–60Hz", group: "Output" },

    ],
    applications: ["Government", "Education", "Religious", "Corporate"],
    warranty: "1 Year", relatedSlugs: ["focus-st200", "focus-st400", "focus-fk535n"]
    priceNPR: "NPR 2,80,000",
  },
  {
    id: "focus-st200", slug: "focus-st200",
    name: "Focus Smart Podium ST200", brand: "Focus", brandSlug: "focus",
    category: "smart-podiums", subcategory: "Premium Smart Podium",
    tagline: "Smart Podium with 33\" Advertising Screen & Wireless Charging",
    badge: "Featured",
    imageUrl: "https://img03.71360.com/w3/2vzk06/20240810/7616046b3e0a35d57be45893ed46105e.jpg",
    imageFallback: "#1E40AF",
    description: "Upgraded ST200 features a 21.5\" touch screen plus a large 33\" built-in advertising screen, wireless phone charging module, dual 65cm gooseneck mics, mini keyboard and aluminum volume knob. Same OPS computer as ST100. Solid Sapele wood in walnut and black finish.",
    keyFeatures: [
      { title: "33\" Built-in Advertising Screen", desc: "Large rear display dominates the room — perfect for branding in government halls and universities." },
      { title: "Wireless Phone Charging", desc: "Built-in Qi wireless charging module keeps the speaker's phone topped up at the podium." },
      { title: "21.5\" Touch Screen", desc: "10-point touch for controlling presentations, media and podium functions." },
      { title: "Mini Keyboard + Volume Knob", desc: "Aluminum volume adjustment knob and built-in mini keyboard for intuitive podium control." },
    ],
    specs: [
      { label: "Touch Screen", value: "21.5\", 10-point, Fully Bonded", highlight: true },
      { label: "Advertising Screen", value: "33\" Built-in", highlight: true },
      { label: "Wireless Charging", value: "Built-in Qi module", highlight: true },
      { label: "Computer", value: "Intel i5/i7-11, 16GB, 512GB SSD" },
      { label: "Height Adjustment", value: "Electric, 200mm" },
      { label: "Microphones", value: "2× 65cm Gooseneck" },
      { label: "Material", value: "Sapele Wood + Aluminum" },
      { label: "Color", value: "Walnut & Black" },
      { label: "Size (Folded)", value: "750×680×1000mm" },
    ],
    applications: ["Government", "Education", "Corporate", "Religious"],
    warranty: "1 Year", relatedSlugs: ["focus-st100", "focus-st400"]
    priceNPR: "NPR 3,50,000",
  },
  {
    id: "focus-st400", slug: "focus-st400",
    name: "Focus Smart Podium ST400", brand: "Focus", brandSlug: "focus",
    category: "smart-podiums", subcategory: "Premium Smart Podium",
    tagline: "Full-Featured Smart Podium with Dual Touch Screens",
    imageUrl: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#1E40AF",
    description: "ST400 is Focus's flagship podium with dual interactive touch screens, advanced AV integration and premium Sapele wood construction. Designed for parliament halls, large auditoriums and flagship university lecture theatres where nothing less than the best will do.",
    keyFeatures: [
      { title: "Dual Interactive Displays", desc: "Two touch screens give the presenter simultaneous access to content and system controls." },
      { title: "Full AV Integration", desc: "Integrates with room AV systems — control projectors, screens and audio from the podium." },
      { title: "Premium Craftsmanship", desc: "Hand-carved Sapele wood — a statement piece for high-visibility environments." },
    ],
    specs: [
      { label: "Screens", value: "Dual Touch Displays", highlight: true },
      { label: "Computer", value: "Intel i7-11, 16GB, 512GB SSD", highlight: true },
      { label: "Height Adjustment", value: "Electric, 200mm" },
      { label: "Microphones", value: "2× Professional Gooseneck" },
      { label: "Material", value: "Premium Sapele Wood" },
      { label: "Power", value: "110–240V 50–60Hz", group: "Output" },

    ],
    applications: ["Government", "Education", "Religious"],
    warranty: "1 Year", relatedSlugs: ["focus-st100", "focus-st200", "focus-fk535n"]
    priceNPR: "NPR 4,80,000",
  },
  {
    id: "focus-fk535n", slug: "focus-fk535n",
    name: "Focus Smart Podium FK535N 2.0", brand: "Focus", brandSlug: "focus",
    category: "smart-podiums", subcategory: "Compact Smart Podium",
    tagline: "Compact Smart Podium with Integrated AV & Touch Control",
    badge: "Popular",
    imageUrl: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#1E40AF",
    description: "Compact and cost-effective smart podium integrating touch screen, OPS computer and microphone in a slimmer profile. Ideal for schools, churches and training rooms where space is limited but full smart podium capability is needed.",
    keyFeatures: [
      { title: "Compact Footprint", desc: "Slimmer profile than the ST series — fits smaller stages and platform areas." },
      { title: "Touch Screen Control", desc: "Full touch screen for presentation control and system management." },
      { title: "OPS Computer", desc: "Intel-based OPS module with Windows — pre-installed and ready to use." },
    ],
    specs: [
      { label: "Form Factor", value: "Compact Smart Podium", highlight: true, group: "Physical" },

      { label: "Computer", value: "OPS Intel (i5 or i7)", highlight: true },
      { label: "Microphone", value: "Gooseneck Professional", group: "Audio" },

      { label: "Material", value: "Aluminum + Wood" },
      { label: "Power", value: "110–240V", group: "Output" },

    ],
    applications: ["Education", "Religious", "Corporate"],
    warranty: "1 Year", relatedSlugs: ["focus-st100", "focus-fk500n"]
    priceNPR: "NPR 2,20,000",
  },
  {
    id: "focus-fk500n", slug: "focus-fk500n",
    name: "Focus Smart Podium FK500N", brand: "Focus", brandSlug: "focus",
    category: "smart-podiums", subcategory: "Compact Smart Podium",
    tagline: "Entry Smart Podium with Touch Screen & Built-in Microphone",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#1E40AF",
    description: "Entry-level smart podium offering core functionality — touch screen, OPS computer and professional microphone — at the most accessible price point. Suitable for training rooms, conference halls and worship spaces that are upgrading from traditional lecterns.",
    keyFeatures: [
      { title: "Essential Smart Features", desc: "Touch screen + computer + mic in one unit — everything needed for modern presentations." },
      { title: "Easy Installation", desc: "Arrives fully assembled and pre-configured — plug in and start presenting." },
      { title: "Durable Construction", desc: "Aluminum and wood construction built for years of daily use." },
    ],
    specs: [
      { label: "Form Factor", value: "Entry Smart Podium", highlight: true, group: "Physical" },

      { label: "Computer", value: "OPS Intel i5" },
      { label: "Microphone", value: "Built-in Professional", group: "Audio" },

      { label: "Material", value: "Aluminum + Wood" },
    ],
    applications: ["Education", "Religious", "Corporate", "Government"],
    warranty: "1 Year", relatedSlugs: ["focus-fk535n", "focus-st100"]
    priceNPR: "NPR 1,85,000",
  },
  {
    id: "focus-st600", slug: "focus-st600",
    name: "Focus Smart Podium ST600", brand: "Focus", brandSlug: "focus",
    category: "smart-podiums", subcategory: "Premium Smart Podium",
    tagline: "Premium Conference Podium with Advanced AV Integration",
    badge: "New",
    imageUrl: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80",
    imageFallback: "#1E40AF",
    description: "The ST600 combines the ST series' premium craftsmanship with enhanced AV control capability — larger display, extended height adjustment and comprehensive connectivity for integration with room control systems. Perfect for VIP boardrooms and high-profile government facilities.",
    keyFeatures: [
      { title: "Extended AV Control", desc: "Integrates with room automation systems for one-touch control of all AV equipment." },
      { title: "Premium Materials", desc: "Sapele wood with enhanced metalwork for the most demanding environments." },
      { title: "Large Touch Display", desc: "Bigger interactive screen for comfortable presentation control." },
    ],
    specs: [
      { label: "Form Factor", value: "Premium Smart Podium", highlight: true, group: "Physical" },

      { label: "Computer", value: "Intel i7, 16GB, 512GB SSD", highlight: true },
      { label: "Height Adjustment", value: "Electric, Extended range" },
      { label: "Material", value: "Premium Sapele Wood" },
    ],
    applications: ["Government", "Corporate", "Education"],
    warranty: "1 Year", relatedSlugs: ["focus-st400", "focus-st200"]
    priceNPR: "NPR 5,50,000",
  },
]

// ─── Exports ─────────────────────────────────────────────────────────────────
export const ALL_PRODUCTS: Product[] = [
  ...DSPPA, ...INFOBIT, ...TENVEO, ...FOCUS,
]

export const PRODUCTS_BY_BRAND: Record<string, Product[]> = {
  dsppa: DSPPA,
  infobit: INFOBIT,
  tenveo: TENVEO,
  focus: FOCUS,
}

export const PRODUCTS_BY_CATEGORY: Record<string, Product[]> = ALL_PRODUCTS.reduce(
  (acc, p) => { acc[p.category] = [...(acc[p.category] || []), p]; return acc }, {} as Record<string, Product[]>
)

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find(p => p.slug === slug)
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedSlugs.map(s => ALL_PRODUCTS.find(p => p.slug === s)).filter(Boolean) as Product[]
}

export function getProductsBySegment(segment: Segment): Product[] {
  return ALL_PRODUCTS.filter(p => p.applications.includes(segment))
}
