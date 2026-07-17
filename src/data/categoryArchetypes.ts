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
  glance?: { v: string; k: string }[]
  trust?: { tt: string; ts: string }[]
  builder?: {
    eyebrow: string; title: string; lead: string; segLabel: string
    segs: Seg[]; sliders: Slider[]; note: string
    compute: (segKey: string, vals: Record<string, number>) => { host: string; hostSub: string; cells: { cv: string; ck: string }[]; note: string }
  }
  diagram?: {
    title: string; lead: string; playLabel: string; viewBox: string
    center: CenterNode
    nodes: SideNode[]; edges: Edge[]; flow: Flow[]
    legend: { c: string; t: string }[]; note: string
  }
  packs?: { pt: string; pf: string; items: string[] }[]
  whyUs?: { st: string; sd: string }[]
  compare?: { mn: string; tier: string; rows: string[]; here?: boolean }[]
  faq?: { q: string; a: string }[]
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

/* ============================================================================
   Shared engine + family archetypes for the remaining product categories.
   Component supplies default whyUs/trust and derives glance from spec highlights,
   so each entry stays lean: accent + outcome + builder + diagram + packs + faq.
   ============================================================================ */

const stdEdges = [
  { d: 'M250,80 H330 Q360,80 360,120 V175', lx: 270, ly: 72, lt: 'in' },
  { d: 'M250,205 H360', lx: 270, ly: 197, lt: 'in' },
  { d: 'M250,330 H330 Q360,330 360,290 V235', lx: 270, ly: 322, lt: 'in' },
  { d: 'M540,150 H620 Q650,150 650,110 V95', lx: 556, ly: 142, lt: 'out' },
  { d: 'M540,205 H650', lx: 556, ly: 197, lt: 'out' },
  { d: 'M540,255 H620 Q650,255 650,300 V320', lx: 556, ly: 247, lt: 'out' },
]

type StdOpt = { title: string; lead: string; play: string; cs: string; cs2: string; l: SideNode[]; r: SideNode[]; el: string[]; f: [string, string]; ac: string; note: string }
function stdDiagram(o: StdOpt): Archetype['diagram'] {
  const pos = [{ x: 70, y: 48 }, { x: 70, y: 173 }, { x: 70, y: 298 }, { x: 650, y: 63 }, { x: 650, y: 173 }, { x: 650, y: 298 }]
  const nodes = [...o.l, ...o.r].map((n, i) => ({ x: pos[i].x, y: pos[i].y, w: 180, h: 64, title: n.title, sub: n.sub, shop: n.shop, pair: n.pair }))
  return {
    title: o.title, lead: o.lead, playLabel: o.play, viewBox: '0 0 900 470',
    center: { x: 360, y: 150, w: 180, h: 115, sub: o.cs, sub2: o.cs2 },
    nodes,
    edges: stdEdges.map((e, i) => ({ ...e, lt: o.el[i] })),
    flow: [{ d: stdEdges[1].d, label: o.f[0], dur: 1000 }, { d: stdEdges[3].d, label: o.f[1], dur: 1000 }],
    legend: [{ c: '#CBD5E1', t: 'Connection' }, { c: o.ac, t: 'Signal path' }, { c: '#0B1E3D', t: 'This product' }],
    note: o.note,
  }
}

// ---- builders ----
function zoneBuilder(kind: 'ip' | 'amp'): Archetype['builder'] {
  return {
    eyebrow: 'Plan it in 20 seconds', title: 'Build your system',
    lead: "Tell us the building and we'll size the zones, speakers and amplifier power, then quote it exactly.",
    segLabel: '1 · Building type',
    segs: [{ key: 'office', label: 'Office' }, { key: 'hotel', label: 'Hotel' }, { key: 'retail', label: 'Retail / mall' }, { key: 'campus', label: 'Campus' }, { key: 'factory', label: 'Factory' }],
    sliders: [{ id: 'floors', label: 'Floors / blocks', min: 1, max: 16, value: 5 }, { id: 'area', label: 'Area per floor', min: 1, max: 3, value: 2, fmt: (n) => ['', 'Small', 'Medium', 'Large'][n] }],
    note: 'Indicative — confirmed on a free site survey.',
    compute: (seg, v) => {
      const zpf: Record<string, number> = { office: 2, hotel: 2.5, retail: 2, campus: 2.2, factory: 1.5 }
      const spz: Record<string, number> = { office: 5, hotel: 5, retail: 6, campus: 7, factory: 4 }
      const am: Record<number, number> = { 1: 0.7, 2: 1, 3: 1.4 }
      const zones = Math.max(1, Math.round((v.floors || 5) * (zpf[seg] || 2) * (am[v.area] || 1)))
      const spk = Math.round(zones * (spz[seg] || 5))
      const pwr = Math.max(0.12, +(spk * 0.01).toFixed(1))
      return {
        host: `${zones}-zone ${kind === 'ip' ? 'IP network' : 'PA'} system`,
        hostSub: kind === 'ip' ? 'Scales over the LAN — hundreds of zones' : 'Scale with matching amplifiers',
        cells: [{ cv: String(zones), ck: 'Zones' }, { cv: '~' + spk, ck: 'Speakers (approx.)' }, { cv: '~' + pwr + ' kW', ck: 'Amp power' }, { cv: kind === 'ip' ? 'LAN' : '100V', ck: kind === 'ip' ? 'Networked' : 'Line' }],
        note: `For ${v.floors} ${seg} block${(v.floors || 1) > 1 ? 's' : ''}, ${['', 'small', 'medium', 'large'][v.area]} area.`,
      }
    },
  }
}
function speakerBuilder(): Archetype['builder'] {
  return {
    eyebrow: 'Plan it in 20 seconds', title: 'How many will I need?',
    lead: "Tell us the space and we'll estimate speaker quantity and amplifier power for even coverage.",
    segLabel: '1 · Space type',
    segs: [{ key: 'office', label: 'Office / meeting' }, { key: 'retail', label: 'Retail / lobby' }, { key: 'hall', label: 'Hall / worship' }, { key: 'outdoor', label: 'Outdoor / covered' }],
    sliders: [{ id: 'area', label: 'Floor area', min: 1, max: 40, value: 12, fmt: (n) => (n * 50) + ' m²' }, { id: 'ceil', label: 'Ceiling height', min: 1, max: 3, value: 2, fmt: (n) => ['', 'Low', 'Medium', 'High'][n] }],
    note: 'Indicative coverage — final layout confirmed on survey.',
    compute: (seg, v) => {
      const area = (v.area || 12) * 50
      const cov: Record<number, number> = { 1: 12, 2: 20, 3: 30 }
      const tm: Record<string, number> = { office: 1, retail: 1, hall: 1.2, outdoor: 1.4 }
      const qty = Math.max(2, Math.ceil(area / (cov[v.ceil] || 20) * (tm[seg] || 1)))
      const w = Math.max(30, Math.round(qty * 6))
      return {
        host: `~${qty} speakers`, hostSub: 'for even, intelligible coverage',
        cells: [{ cv: area + ' m²', ck: 'Coverage' }, { cv: String(qty), ck: 'Speakers' }, { cv: '~' + w + 'W', ck: 'Amp power' }, { cv: String(Math.max(1, Math.round(qty / 8))), ck: 'Zones' }],
        note: `${['', 'low', 'medium', 'high'][v.ceil] || ''} ${seg} space, ${area} m².`,
      }
    },
  }
}
function roomBuilder(): Archetype['builder'] {
  return {
    eyebrow: 'Match it to your room', title: 'Build your meeting room',
    lead: "Pick your room type and size — we'll propose the camera, audio, display and presentation to match.",
    segLabel: '1 · Room type',
    segs: [{ key: 'huddle', label: 'Huddle (2-4)' }, { key: 'small', label: 'Small (5-8)' }, { key: 'medium', label: 'Medium (9-16)' }, { key: 'board', label: 'Boardroom' }, { key: 'audi', label: 'Auditorium' }],
    sliders: [{ id: 'seats', label: 'Seats', min: 2, max: 60, value: 10 }],
    note: 'Indicative kit — we tailor it on a site visit.',
    compute: (seg, v) => {
      const m: Record<string, { cam: string; mic: string; disp: string; pres: string }> = {
        huddle: { cam: 'All-in-one bar', mic: 'Built-in', disp: 'Single 55"', pres: 'Wireless 1-src' },
        small: { cam: 'ePTZ camera', mic: '1 speakerphone', disp: 'Single 65"', pres: 'Wireless 2-src' },
        medium: { cam: '4K PTZ + AI', mic: '2 ceiling mics', disp: 'Dual 75"', pres: 'Wireless 4-src' },
        board: { cam: 'AI PTZ + wide', mic: 'Ceiling array', disp: 'Dual 86" / LED', pres: 'Matrix + BYOD' },
        audi: { cam: 'PTZ + track', mic: 'Gooseneck + wireless', disp: 'LED wall', pres: 'Processor + stream' },
      }
      const r = m[seg] || m.medium
      return {
        host: `${seg === 'audi' ? 'Auditorium' : seg.charAt(0).toUpperCase() + seg.slice(1)} room kit`, hostSub: `Sized for ${v.seats} seats`,
        cells: [{ cv: r.cam, ck: 'Camera' }, { cv: r.mic, ck: 'Audio' }, { cv: r.disp, ck: 'Display' }, { cv: r.pres, ck: 'Presentation' }],
        note: `${v.seats}-seat ${seg} room.`,
      }
    },
  }
}
function wallBuilder(): Archetype['builder'] {
  const CW = 0.6, CH = 0.3375
  const u: Record<string, { p: number; pl: string; d: string; n: string }> = {
    control: { p: 0.9375, pl: 'P0.9', d: '~0.9 m', n: 'control room' }, conf: { p: 1.25, pl: 'P1.2', d: '~1.2 m', n: 'conference' },
    lobby: { p: 1.5625, pl: 'P1.5', d: '~1.5 m', n: 'lobby' }, retail: { p: 1.8, pl: 'P1.8', d: '~1.8 m', n: 'retail' },
  }
  return {
    eyebrow: 'Plan it in 20 seconds', title: 'Size your video wall',
    lead: 'Tell us the room and size — we work out cabinets, resolution, power and pixel pitch.',
    segLabel: '1 · Where is it going?',
    segs: [{ key: 'control', label: 'Control room' }, { key: 'conf', label: 'Conference' }, { key: 'lobby', label: 'Lobby' }, { key: 'retail', label: 'Retail / signage' }],
    sliders: [{ id: 'w', label: 'Width', min: 10, max: 120, value: 40, fmt: (n) => (n / 10).toFixed(1) + ' m' }, { id: 'h', label: 'Height', min: 6, max: 60, value: 24, fmt: (n) => (n / 10).toFixed(1) + ' m' }],
    note: 'Cabinet 600×337.5 mm — rounds to whole cabinets. Confirmed on survey.',
    compute: (seg, v) => {
      const uu = u[seg] || u.control
      const W = (v.w || 40) / 10, H = (v.h || 24) / 10
      const cw = Math.max(1, Math.ceil(W / CW)), ch = Math.max(1, Math.ceil(H / CH))
      const pxW = Math.round(600 / uu.p), pxH = Math.round(337.5 / uu.p)
      const aw = cw * CW, ah = ch * CH, pwr = aw * ah * 80 / 1000
      return {
        host: `Fine-pitch LED ${uu.pl}`, hostSub: `Best from ${uu.d} viewing`,
        cells: [{ cv: cw + ' × ' + ch, ck: 'Cabinets (' + (cw * ch) + ')' }, { cv: (cw * pxW) + '×' + (ch * pxH), ck: 'Resolution' }, { cv: aw.toFixed(2) + '×' + ah.toFixed(2) + ' m', ck: 'Actual size' }, { cv: '~' + pwr.toFixed(1) + ' kW', ck: 'Avg power' }],
        note: `${uu.n}, best from ${uu.d}.`,
      }
    },
  }
}
function podiumBuilder(): Archetype['builder'] {
  return {
    eyebrow: 'Plan your rollout', title: 'How many podiums?',
    lead: "Tell us the venue and how many rooms — we'll propose the model and options.",
    segLabel: '1 · Venue',
    segs: [{ key: 'class', label: 'Classroom' }, { key: 'board', label: 'Boardroom' }, { key: 'hall', label: 'Hall / chamber' }, { key: 'audi', label: 'Auditorium' }],
    sliders: [{ id: 'rooms', label: 'Number of rooms', min: 1, max: 30, value: 4 }],
    note: 'Indicative — finishes and integration confirmed on site.',
    compute: (seg, v) => {
      const c: Record<string, { m: string; o: string }> = {
        class: { m: 'Compact touch podium', o: 'Doc cam + wireless mic' }, board: { m: 'Premium OPS podium', o: 'Dual screen + gooseneck' },
        hall: { m: 'Premium OPS podium', o: 'Height-adjust + PA feed' }, audi: { m: 'Flagship OPS podium', o: 'Teleprompter + streaming' },
      }
      const cc = c[seg] || c.board, n = v.rooms || 4
      return {
        host: `${n} × ${cc.m}`, hostSub: 'Consistent finish across rooms',
        cells: [{ cv: String(n), ck: 'Units' }, { cv: cc.m.split(' ')[0], ck: 'Model tier' }, { cv: cc.o, ck: 'Options' }, { cv: 'Yes', ck: 'Install + training' }],
        note: `${n} ${seg} room${n > 1 ? 's' : ''}.`,
      }
    },
  }
}

// ---- family diagrams ----
const audioDiagram = (ac: string) => stdDiagram({ title: 'How it connects', lead: 'This host sits at the centre of a complete audio system. Here is what plugs in and the products we pair with it.', play: '▶ Play the signal path', ac, cs: 'Multi-zone amplification', cs2: 'Priority paging + BGM',
  l: [{ title: 'Paging Microphone', sub: 'Zone / all-call', shop: true, pair: 'Paging microphones' }, { title: 'Audio Source', sub: 'BGM, media, chimes', shop: true, pair: 'BGM / media sources' }, { title: 'Fire / Alarm In', sub: 'Priority trigger' }],
  r: [{ title: 'Zone Speakers', sub: '100V / networked', shop: true, pair: 'Ceiling, column, horn speakers' }, { title: 'Expansion', sub: 'More zones / power', shop: true, pair: 'Matching amplifiers / terminals' }, { title: 'Monitoring', sub: 'Control & health' }],
  el: ['Mic', 'Priority', 'Source', 'Speaker line', 'Expand', 'Control'], f: ['① Source & paging into the host', '② Host drives every zone'], note: 'Each grey box links to the matching product — the diagram doubles as a system builder.' })
const speakerDiagram = (ac: string) => stdDiagram({ title: 'How it connects', lead: 'The speaker sits on an amplified line. Here is what drives it and what it pairs with across the zone.', play: '▶ Play the signal path', ac, cs: '70/100V line speaker', cs2: 'Daisy-chained on the zone',
  l: [{ title: 'Mixer Amplifier', sub: 'Drives the 100V line', shop: true, pair: 'Mixer / power amplifiers' }, { title: 'Audio Source', sub: 'Mic, BGM, media', shop: true, pair: 'Microphones & sources' }, { title: 'Zone Control', sub: 'Volume / paging' }],
  r: [{ title: 'More Speakers', sub: 'Same 100V line', shop: true, pair: 'Matching speakers' }, { title: 'Volume Attenuator', sub: 'Per-room level', shop: true, pair: 'Attenuators & controls' }, { title: 'Next Zone', sub: 'Separate line' }],
  el: ['Line', 'Audio', 'Control', '100V', 'Level', 'Zone'], f: ['① Amplifier feeds the 100V line', '② Speakers cover the zone'], note: 'Each grey box links to the matching product — build the whole zone from here.' })
const roomDiagram = (ac: string) => stdDiagram({ title: 'How it connects', lead: 'This unit is one part of a complete meeting room. Here is what it connects to and what completes the room.', play: '▶ Play the call path', ac, cs: 'Meeting-room AV', cs2: 'USB / IP to the room PC',
  l: [{ title: 'Room PC / Codec', sub: 'Zoom, Teams, Meet', shop: true, pair: 'Room PC / UC hub' }, { title: 'Microphones', sub: 'Ceiling / table', shop: true, pair: 'Mics & speakerphones' }, { title: 'Presenter', sub: 'Laptop / BYOD' }],
  r: [{ title: 'Display / Projector', sub: 'Show the far end', shop: true, pair: 'Displays & mounts' }, { title: 'Wireless Presentation', sub: 'Dongle-free share', shop: true, pair: 'Wireless presentation' }, { title: 'Far End', sub: 'Remote participants' }],
  el: ['USB/IP', 'Audio', 'BYOD', 'Video', 'Share', 'Cloud'], f: ['① Camera & mics into the PC', '② Room joins the call'], note: 'Each grey box links to the matching product — spec the whole room in one quote.' })
const wallDiagram = (ac: string) => stdDiagram({ title: 'How it connects', lead: 'A wall is more than panels — it is a signal chain. Here is what drives it and what we supply with it.', play: '▶ Play the content path', ac, cs: 'The display surface', cs2: 'Receiving cards inside',
  l: [{ title: 'Content Source', sub: 'PC, player, camera', shop: true, pair: 'Media players / sources' }, { title: 'Video Processor', sub: 'Scaling & layers', shop: true, pair: 'Video processors' }, { title: 'LED Controller', sub: 'Sending card', shop: true, pair: 'Controllers / sending cards' }],
  r: [{ title: 'Power Distribution', sub: 'Redundant supplies', shop: true, pair: 'Power & distribution' }, { title: 'Spare Modules', sub: 'Included', shop: true, pair: 'Spare modules & parts' }, { title: 'Control PC', sub: 'Brightness & health' }],
  el: ['Source', 'Scale', 'Map', 'Power', 'Spares', 'Monitor'], f: ['① Source into the processor & controller', '② Content maps across the wall'], note: 'Each grey box is quoted with the wall — one working system, not just panels.' })
const podiumDiagram = (ac: string) => stdDiagram({ title: 'How it connects', lead: 'The podium is the room control point. Here is what plugs into it and what it drives.', play: '▶ Play the room path', ac, cs: 'Touch + OPS PC + mics', cs2: 'One-touch room control',
  l: [{ title: 'Presenter Laptop', sub: 'HDMI / USB-C in', shop: true, pair: 'Cables & connectivity' }, { title: 'Gooseneck Mics', sub: 'To the room PA', shop: true, pair: 'Microphones' }, { title: 'Network', sub: 'Control & content' }],
  r: [{ title: 'Display / Projector', sub: 'HDMI out', shop: true, pair: 'Displays & projectors' }, { title: 'Room PA / Speakers', sub: 'Voice lift', shop: true, pair: 'Speakers & amplifiers' }, { title: 'Recording / Stream', sub: 'Capture the session' }],
  el: ['In', 'Mic', 'LAN', 'Video', 'Audio', 'Capture'], f: ['① Presenter connects at the podium', '② Podium drives the whole room'], note: 'Each grey box links to the matching product — outfit the whole room from here.' })

// ---- family FAQs ----
const audioFaq = [
  { q: 'How many speakers and zones do I need?', a: 'Use the builder above for a starting estimate, or send a floor plan and we size the 100V lines and zone split exactly, then quote it as one BOQ.' },
  { q: 'Will it integrate with fire alarm?', a: 'Yes — priority inputs let emergency signals and live paging override background music across selected or all zones.' },
  { q: 'Do you install and commission it?', a: 'Yes. Free survey, licensed install, commissioning, AMC and spare parts — all handled locally.' },
]
const speakerFaq = [
  { q: 'How many speakers will I need?', a: 'It depends on area, ceiling height and noise. The builder above gives a starting quantity; we confirm the exact layout on a free site survey.' },
  { q: '100V line or low-impedance?', a: 'For most distributed installs we use 100V lines so many speakers run on one amplifier over long cable runs. We spec the right amplifier to match.' },
  { q: 'Do you install and tune it?', a: 'Yes — supply, install, level-balancing and handover, with local service and spares.' },
]
const roomFaq = [
  { q: 'Which platforms does it support?', a: 'Everything is platform-agnostic — Zoom, Microsoft Teams, Google Meet and WebEx — via USB or a native room PC.' },
  { q: 'Will it work with my existing display?', a: 'Usually yes. Tell us what you have and we design around it, adding only what the room needs.' },
  { q: 'Do you install and train staff?', a: 'Yes — install, commissioning and a short staff handover so the room just works, plus local support.' },
]
const wallFaq = [
  { q: 'Which pixel pitch do I need?', a: 'Rule of thumb: pitch in mm ≈ closest comfortable viewing distance in metres. Boardrooms and control rooms want fine pitch; lobbies viewed from further can use larger. The builder suggests one from your use.' },
  { q: 'Can you build any size?', a: 'Yes — cabinets tile seamlessly, so the wall is built to your dimensions. The builder rounds to whole cabinets and shows the finished size.' },
  { q: 'Do you install and calibrate?', a: 'Yes — steel framework, cabinet mapping, brightness and colour calibration, plus content setup and training.' },
]
const podiumFaq = [
  { q: 'Can it match our interiors?', a: 'Yes — finishes and wood options can be specified so podiums look consistent across every room.' },
  { q: 'What computer is inside?', a: 'Premium models carry a built-in Intel OPS PC (i5/i7). We configure the OS and software to your standard image.' },
  { q: 'Do you install and train?', a: 'Yes — delivery, integration with the room display and PA, plus a staff handover and local service.' },
]

Object.assign(ARCHETYPES, {
  'ip-network-audio': { accent: '#00AEAD', outcome: 'clear, scheduled and emergency audio in every zone across the whole site — managed from one place over your network.', builder: zoneBuilder('ip'), diagram: audioDiagram('#00AEAD'), faq: audioFaq,
    packs: [{ pt: 'Campus PA', pf: 'Blocks + outdoor', items: ['IP PA server + zone terminals', 'Ceiling + horn speakers', 'Scheduled bells + all-call'] }, { pt: 'Hospitality', pf: 'BGM + paging', items: ['IP host, zoned BGM', 'Ceiling + column speakers', 'Reception paging mic'] }, { pt: 'Transport hub', pf: 'Announce + info', items: ['Redundant IP backbone', 'High-SPL speakers', 'Priority announcement mics'] }] },
  'amplifiers': { accent: '#00AEAD', outcome: 'enough clean power for every speaker in the room, with headroom to spare and simple zone control.', builder: zoneBuilder('amp'), diagram: audioDiagram('#00AEAD'), faq: audioFaq,
    packs: [{ pt: 'Meeting room', pf: 'Compact PA', items: ['Mixer amplifier', 'Ceiling speakers', 'Mic + BGM input'] }, { pt: 'Multi-zone', pf: 'Offices / retail', items: ['Matrix amplifier', 'Zoned speakers', 'Per-zone source & level'] }, { pt: 'Hall / worship', pf: 'Higher power', items: ['Power amplifier', 'Column / horn speakers', 'Priority paging'] }] },
  'ceiling-speakers': { accent: '#00AEAD', outcome: 'even, natural sound across the whole ceiling — no hotspots, no dead zones, no visual clutter.', builder: speakerBuilder(), diagram: speakerDiagram('#00AEAD'), faq: speakerFaq,
    packs: [{ pt: 'Office / meeting', pf: 'BGM + speech', items: ['Ceiling speakers', 'Mixer amplifier', 'Mic + BGM source'] }, { pt: 'Retail / lobby', pf: 'Zoned BGM', items: ['Ceiling speakers, zoned', 'Matrix amplifier', 'Per-zone level'] }, { pt: 'Corridors', pf: 'Coverage', items: ['Evenly spaced ceilings', '100V line', 'Paging override'] }] },
  'column-speakers': { accent: '#00AEAD', outcome: 'clear, throw-controlled speech for large or reverberant rooms — intelligible even at the back.', builder: speakerBuilder(), diagram: speakerDiagram('#00AEAD'), faq: speakerFaq,
    packs: [{ pt: 'Worship / hall', pf: 'Speech clarity', items: ['Column speakers on pillars', 'Power amplifier', 'Wireless / gooseneck mics'] }, { pt: 'Atrium', pf: 'Reverberant space', items: ['Directional columns', '100V line', 'BGM + paging'] }, { pt: 'Outdoor covered', pf: 'Weather-ready', items: ['Weatherproof columns', 'Matching amplifier', 'Zone control'] }] },
  'horn-speakers': { accent: '#00AEAD', outcome: 'long-throw, weatherproof announcements that cut through noise across yards, platforms and open areas.', builder: speakerBuilder(), diagram: speakerDiagram('#00AEAD'), faq: speakerFaq,
    packs: [{ pt: 'Industrial', pf: 'High noise', items: ['High-SPL horns', 'Power amplifier', 'Priority paging'] }, { pt: 'Transport', pf: 'Platforms / apron', items: ['Weatherproof horns', '100V line', 'Announcement mics'] }, { pt: 'Campus outdoor', pf: 'Wide area', items: ['Long-throw horns', 'Zoned amplifier', 'Bell + all-call'] }] },
  'conference-audio': { accent: '#00AEAD', outcome: 'everyone in the room is heard clearly on the call — no echo, no dead spots, no shouting at the mic.', builder: roomBuilder(), diagram: roomDiagram('#00AEAD'), faq: roomFaq,
    packs: [{ pt: 'Huddle', pf: '2–4 seats', items: ['USB speakerphone', 'All-in-one bar', 'Wireless share'] }, { pt: 'Boardroom', pf: 'Ceiling audio', items: ['Ceiling mic array', 'DSP + amplifier', 'In-ceiling speakers'] }, { pt: 'Training room', pf: 'Voice lift', items: ['Wireless + gooseneck mics', 'DSP echo-cancel', 'Distributed speakers'] }] },
  'conference-cameras': { accent: '#0891B2', outcome: 'the right person is always framed and sharp — remote participants feel in the room, not watching it.', builder: roomBuilder(), diagram: roomDiagram('#0891B2'), faq: roomFaq,
    packs: [{ pt: 'Huddle', pf: '2–4 seats', items: ['All-in-one video bar', 'Single display', 'Wireless share'] }, { pt: 'Medium room', pf: '9–16 seats', items: ['4K AI-tracking PTZ', 'Ceiling mics + DSP', 'Dual displays'] }, { pt: 'Boardroom', pf: '16+ seats', items: ['AI PTZ + wide camera', 'Ceiling array', 'Room PC + BYOD'] }] },
  'camera-controllers': { accent: '#0891B2', outcome: 'smooth, precise camera control for live production — call up shots and presets without fumbling.', builder: roomBuilder(), diagram: roomDiagram('#0891B2'), faq: roomFaq,
    packs: [{ pt: 'Multi-cam room', pf: 'Presets', items: ['PTZ keyboard controller', 'Multiple PTZ cameras', 'Preset recall'] }, { pt: 'Streaming', pf: 'Production', items: ['Controller + switcher', 'PTZ cameras', 'Encoder / streaming'] }, { pt: 'Auditorium', pf: 'Lecture capture', items: ['Controller + tracking', 'Lecture cameras', 'Recording'] }] },
  'video-conferencing': { accent: '#6366F1', outcome: 'a one-touch room that just joins the call — camera, audio and content working together every time.', builder: roomBuilder(), diagram: roomDiagram('#6366F1'), faq: roomFaq,
    packs: [{ pt: 'Huddle', pf: '2–4 seats', items: ['Video bar', 'Single 55–65" display', 'Wireless share'] }, { pt: 'Medium', pf: '9–16 seats', items: ['4K camera + ceiling mics', 'Room PC / UC hub', 'Dual displays'] }, { pt: 'Boardroom', pf: '16+ seats', items: ['AI camera + array', 'Matrix + BYOD', 'Dual 86" / LED'] }] },
  'wireless-presentation': { accent: '#6366F1', outcome: 'anyone shares to the room screen in seconds — no cables, no dongles, no adapters, no delay.', builder: roomBuilder(), diagram: roomDiagram('#6366F1'), faq: roomFaq,
    packs: [{ pt: 'Meeting room', pf: 'Share', items: ['Wireless presentation kit', 'Single display', 'Up to 4 sources'] }, { pt: 'Training', pf: 'Multi-share', items: ['4-source split screen', 'Dual displays', 'Moderator control'] }, { pt: 'Hybrid room', pf: 'Share + call', items: ['Presentation + camera', 'Room PC', 'BYOD switching'] }] },
  'av-switching': { accent: '#6366F1', outcome: 'every source reaches every screen, switched cleanly and instantly — one tidy signal backbone.', builder: roomBuilder(), diagram: roomDiagram('#6366F1'), faq: roomFaq,
    packs: [{ pt: 'Boardroom', pf: 'Matrix', items: ['HDMI matrix switcher', 'Multiple displays', 'Control panel'] }, { pt: 'Command centre', pf: 'AV-over-IP', items: ['AV-over-IP nodes', 'Video wall + displays', 'Central control'] }, { pt: 'Campus', pf: 'Distribution', items: ['Extenders over Cat-6', 'Room displays', 'Source distribution'] }] },
  'video-walls': { accent: '#6366F1', outcome: 'a seamless multi-screen canvas that shows anything, anywhere on it — dashboards, feeds, or one big image.', builder: wallBuilder(), diagram: wallDiagram('#6366F1'), faq: wallFaq,
    packs: [{ pt: 'Lobby wall', pf: 'Brand content', items: ['Video wall controller', 'Display tiles / LED', 'Media player'] }, { pt: 'Control room', pf: '24/7 monitoring', items: ['Multi-window processor', 'Redundant sources', 'KVM control'] }, { pt: 'Boardroom', pf: 'Presentation', items: ['Wall controller', 'Matrix switching', 'BYOD'] }] },
  'led-displays': { accent: '#0F58FB', outcome: 'a seamless, gap-free video wall in any size you need — razor-sharp up close and built to run all day.', builder: wallBuilder(), diagram: wallDiagram('#0F58FB'), faq: wallFaq,
    packs: [{ pt: 'Boardroom wall', pf: '~3.4 × 1.9 m · P1.2', items: ['LED cabinets + controller', 'Processor & cabling', 'Wall mount + calibration'] }, { pt: 'Control room', pf: 'P0.9 · 24/7', items: ['Fine-pitch, redundant power', 'Multi-window processor', 'Front-service framework'] }, { pt: 'Lobby feature', pf: 'Statement · P1.5', items: ['Brand content wall', 'Media player + scheduler', 'Install + content setup'] }] },
  'smart-podiums': { accent: '#1E40AF', outcome: 'a presenter walks up, plugs in once, and controls the whole room — screen, sound and PC — from the lectern.', builder: podiumBuilder(), diagram: podiumDiagram('#1E40AF'), faq: podiumFaq,
    packs: [{ pt: 'Classroom set', pf: 'Rollout', items: ['Compact touch podiums', 'Doc cam + wireless mic', 'Projector integration'] }, { pt: 'Boardroom', pf: 'Premium', items: ['OPS podium, dual screen', 'Gooseneck mics + PA', 'One-touch control'] }, { pt: 'Auditorium', pf: 'Flagship', items: ['Flagship OPS podium', 'Teleprompter + streaming', 'Full AV integration'] }] },
})
