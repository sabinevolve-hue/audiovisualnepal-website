// Per-category "brain" for ProductPageV2. Add one entry per category to upgrade
// every product in that category. Only serializable data + client-run compute fns.

export type Seg = { key: string; label: string }
export type Slider = { id: string; label: string; min: number; max: number; value: number; fmt?: (n: number) => string }
export type CenterNode = { x: number; y: number; w: number; h: number; sub?: string; sub2?: string }
export type SideNode = { x: number; y: number; w: number; h: number; title: string; sub?: string; shop?: boolean; pair?: string }
export type Edge = { d: string; lx?: number; ly?: number; lt?: string }
export type Flow = { d: string; label: string; dur: number }

export type Archetype = {
  accent: string
  outcome: string
  glance: { v: string; k: string }[]
  trust: { tt: string; ts: string }[]
  builder?: {
    eyebrow: string; title: string; lead: string; segLabel: string
    segs: Seg[]; sliders: Slider[]; note: string
    compute: (segKey: string, vals: Record<string, number>) => { host: string; hostSub: string; cells: { cv: string; ck: string }[]; note: string }
  }
  diagram: {
    title: string; lead: string; playLabel: string; viewBox: string
    center: CenterNode
    nodes: SideNode[]; edges: Edge[]; flow: Flow[]
    legend: { c: string; t: string }[]; note: string
  }
  packs: { pt: string; pf: string; items: string[] }[]
  whyUs: { st: string; sd: string }[]
  compare: { mn: string; tier: string; rows: string[]; here?: boolean }[]
  faq: { q: string; a: string }[]
}

export const ARCHETYPES: Record<string, Archetype> = {
  'voice-evacuation': {
    accent: '#00AEAD',
    outcome: 'everyone hears a clear evacuation message in every zone — and your building passes fire inspection the first time.',
    glance: [
      { v: '8', k: 'Zones to 160' },
      { v: '500W+500', k: 'Main + Backup' },
      { v: 'EN54-16', k: 'Certified' },
      { v: '800m', k: 'CAN reach' },
    ],
    trust: [
      { tt: 'EN54 Life-Safety', ts: 'Certified for evacuation' },
      { tt: '2-Year Warranty', ts: 'Genuine, backed locally' },
      { tt: 'Authorised Dealer', ts: 'Not grey market' },
      { tt: 'We Design & Install', ts: 'Local AV engineers' },
    ],
    builder: {
      eyebrow: 'Plan it in 20 seconds',
      title: 'Build your system',
      lead: "Don't know how many zones or speakers your building needs? Tell us the basics and we'll propose a starting configuration, then quote it exactly.",
      segLabel: '1 · Building type',
      segs: [
        { key: 'hospital', label: 'Hospital' }, { key: 'hotel', label: 'Hotel' },
        { key: 'government', label: 'Government' }, { key: 'campus', label: 'School / Campus' },
        { key: 'worship', label: 'Place of worship' },
      ],
      sliders: [
        { id: 'floors', label: 'Floors / blocks', min: 1, max: 16, value: 6 },
        { id: 'area', label: 'Approx. area per floor', min: 1, max: 3, value: 2, fmt: (n) => ['', 'Small', 'Medium', 'Large'][n] },
      ],
      note: 'Indicative sizing to start the conversation — we confirm exact zones and speaker counts on a free site survey.',
      compute: (seg, v) => {
        const P: Record<string, { zpf: number; spz: number; label: string }> = {
          hospital: { zpf: 3, spz: 6, label: 'hospital' }, hotel: { zpf: 2, spz: 5, label: 'hotel' },
          government: { zpf: 2, spz: 5, label: 'government' }, campus: { zpf: 2.2, spz: 8, label: 'campus' },
          worship: { zpf: 1.5, spz: 6, label: 'place of worship' },
        }
        const areaMul: Record<number, number> = { 1: 0.7, 2: 1, 3: 1.4 }
        const areaLbl: Record<number, string> = { 1: 'small', 2: 'medium', 3: 'large' }
        const p = P[seg] || P.hospital
        const floors = v.floors || 6, area = v.area || 2
        const zones = Math.max(2, Math.round(floors * p.zpf * (areaMul[area] || 1)))
        const spk = Math.round(zones * p.spz)
        const exp = zones > 8 ? Math.ceil((zones - 8) / 8) : 0
        let host = 'DSPPA PAVA9500', hostSub = '8-zone flagship with dual-amp failover'
        if (zones <= 4) { host = 'DSPPA PAVA4600'; hostSub = 'Entry host for small sites' }
        else if (zones <= 6) { host = 'DSPPA PAVA8500'; hostSub = 'Mid host for medium sites' }
        return {
          host, hostSub,
          cells: [
            { cv: String(zones), ck: 'Zones needed' },
            { cv: '~' + spk, ck: '100V speakers (approx.)' },
            { cv: exp ? exp + 'x' : '—', ck: 'PAVA9500E expanders' },
            { cv: 'Yes', ck: 'Battery backup' },
          ],
          note: `For ${floors} ${p.label} floor${floors > 1 ? 's' : ''}, ${areaLbl[area]} area.`,
        }
      },
    },
    diagram: {
      title: 'How it connects', lead: "The host sits at the centre of a complete voice-evacuation system. Here's what plugs in — and the products we'd pair with it. Press play to trace an emergency broadcast.",
      playLabel: '▶ Play emergency broadcast', viewBox: '0 0 900 470',
      center: { x: 360, y: 150, w: 180, h: 115, sub: '500W + 500W · EN54-16', sub2: '8 zones · dual-amp failover' },
      nodes: [
        { x: 70, y: 48, w: 180, h: 64, title: 'Paging Microphone', sub: 'Zone / all-call paging', shop: true, pair: 'Remote paging microphone' },
        { x: 70, y: 173, w: 180, h: 64, title: 'Fire Alarm Panel', sub: 'Dry-contact evac trigger' },
        { x: 70, y: 298, w: 180, h: 64, title: 'BGM / AUX Source', sub: 'Music, chimes, announce', shop: true, pair: 'Background-music / IP audio source' },
        { x: 650, y: 63, w: 180, h: 64, title: 'Speaker Zones 1-8', sub: '100V supervised lines', shop: true, pair: '100V ceiling, horn & column speakers' },
        { x: 650, y: 173, w: 180, h: 64, title: 'Expansion (PAVA9500E)', sub: 'Grow 8 to 160 zones', shop: true, pair: 'PAVA9500E expansion amplifiers' },
        { x: 650, y: 298, w: 180, h: 64, title: 'Monitoring PC', sub: 'Fault & line supervision' },
      ],
      edges: [
        { d: 'M250,80 H330 Q360,80 360,120 V175', lx: 270, ly: 72, lt: 'Priority mic' },
        { d: 'M250,205 H360', lx: 270, ly: 197, lt: 'Dry-contact trigger' },
        { d: 'M250,330 H330 Q360,330 360,290 V235', lx: 270, ly: 322, lt: 'AUX / BGM in' },
        { d: 'M540,150 H620 Q650,150 650,110 V95', lx: 556, ly: 142, lt: '100V line' },
        { d: 'M540,205 H650', lx: 556, ly: 197, lt: 'CAN bus' },
        { d: 'M540,255 H620 Q650,255 650,300 V320', lx: 556, ly: 247, lt: 'Dual RJ45' },
      ],
      flow: [
        { d: 'M250,205 H360', label: '(1) Fire panel triggers the host', dur: 1100 },
        { d: 'M540,150 H620 Q650,150 650,110 V95', label: '(2) Host broadcasts to all speaker zones', dur: 1100 },
      ],
      legend: [{ c: '#CBD5E1', t: 'Wired connection' }, { c: '#00AEAD', t: 'Emergency broadcast path' }, { c: '#0B1E3D', t: 'This product' }],
      note: 'Every grey "AV Nepal supplies" box links to the matching product — the diagram doubles as a system builder and cross-sells the kit around the host.',
    },
    packs: [
      { pt: 'Hospital Pack', pf: 'Multi-floor · life-safety', items: ['PAVA9500 host + 1 expander', '~90 ceiling speakers, 12 zones', '2 paging mics + battery backup'] },
      { pt: 'Hotel Pack', pf: 'Guest floors + BGM', items: ['PAVA9500 host, 8 zones', 'Ceiling + column speakers', 'BGM source + reception mic'] },
      { pt: 'Campus Pack', pf: 'Blocks + outdoor', items: ['PAVA9500 host + 2 expanders', 'Horn + ceiling speakers', 'Bell scheduling + all-call mic'] },
    ],
    whyUs: [
      { st: 'Free site survey', sd: 'We visit, measure zones and noise.' },
      { st: 'System design + BOQ', sd: 'Sized to code.' },
      { st: 'Supply, genuine', sd: 'Authorised, full warranty.' },
      { st: 'Licensed install', sd: 'Commissioned, EN54 tested.' },
      { st: 'AMC & training', sd: 'Spares, service, handover.' },
    ],
    compare: [
      { mn: 'PAVA4600', tier: 'Entry · small sites', rows: ['Fewer zones', 'Clinics, small offices', 'Single-block coverage'] },
      { mn: 'PAVA9500', tier: 'Flagship · large sites', rows: ['8 zones to 160', 'Hospitals, government', 'Dual-amp failover, EN54-16'], here: true },
      { mn: 'PAVA8500', tier: 'Mid · medium sites', rows: ['Mid zone count', 'Hotels, mid offices', 'Single amplifier'] },
    ],
    faq: [
      { q: 'Will this pass EN54 / fire inspection in Nepal?', a: 'Yes — EN54-16 certified. We design zones and speaker lines to code and commission the system so it passes inspection; done across government and hospital sites.' },
      { q: 'How many speakers / zones do I need?', a: 'Depends on floor area, ceiling height and noise. Use the builder above for a starting estimate, or send a floor plan for an exact BOQ.' },
      { q: "What is the lead time?", a: 'Common configs are in stock and ship nationwide. Larger multi-zone builds are supplied and installed within a few weeks after survey sign-off.' },
      { q: 'Can it grow later?', a: 'Yes — cascade PAVA9500E expanders over CAN bus to grow from 8 up to 160 zones without replacing the host.' },
      { q: 'Do you install and service it?', a: 'Yes. Free survey, licensed install, commissioning, AMC, spare parts and staff training — all local.' },
    ],
  },
}
