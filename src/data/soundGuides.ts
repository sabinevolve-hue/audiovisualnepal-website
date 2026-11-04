// Venue sound-system design guides — one page per venue, built on the itc professional sound range.
// Rendered at /guides/<slug>. Inline links use [text](/path). Diagrams are original AVN drawings
// in /public/images/itc-diagrams. Figures are rules of thumb; every design is confirmed on survey.

export type GuideSection = { h: string; p?: string[]; list?: string[]; table?: { head: string[]; rows: string[][] } }
export type GuideKit = { role: string; model: string; href: string; why: string }
export type SoundGuide = {
  slug: string; venue: string; diagramKey: string; title: string; description: string; hero: string; date: string
  readMins: number; keywords: string[]; intro: string[]; sections: GuideSection[]; kit: GuideKit[]; faq: { q: string; a: string }[]
  /** Optional overrides for non-sound guides (hero alt text, closing CTA button and contact topic). */
  heroAlt?: string; cta?: { label: string; href: string; topic: string }
}

import { TOPIC_GUIDES } from './topicGuides'

const P = '/products'
export const VENUE_GUIDES: SoundGuide[] = [
  {
    slug: 'banquet-hall-sound-system-design', venue: 'Banquet Hall', diagramKey: 'banquet-hall',
    title: 'Banquet Hall Sound System Design Guide for Nepal',
    description: 'How to design sound for wedding, reception and party venues — clear speeches, full dance music and even coverage for 300–1,000 guests.',
    hero: '/images/heroes/hotels-hero.webp', date: '2026-11-04', readMins: 8,
    keywords: ['banquet hall sound system Nepal', 'party palace sound system', 'wedding venue speakers Kathmandu'],
    intro: [
      'A banquet hall does four jobs in one evening: speeches that must be understood at the back table, a band or DJ that must fill the dance floor, background music that stays out of the way during dinner, and announcements that cut through 500 conversations. Most halls in Kathmandu, Pokhara and Butwal are large flat boxes with hard floors, glass and high false ceilings — an acoustically difficult room.',
      'A well-designed system fixes most of this without touching the building. This is the design approach we use for wedding venues, hotel ballrooms and party palaces across Nepal.',
    ],
    sections: [
      { h: 'Start with the room, not the speakers', p: [
        'Measure three things first: the length of the room (stage to back wall), the ceiling height, and how hard the surfaces are. Length decides between a line array and point-source speakers, ceiling height decides where they can hang, and hard surfaces decide how tightly the coverage must be controlled.',
        'Point-source boxes such as the [itc KS-10H](' + P + '/pro-loudspeakers/itc-ks-10h) cover a hall of up to about 25 m comfortably. Beyond that, a compact line array like the [itc KS-210](' + P + '/line-array-speakers/itc-ks-210) keeps the level far more even from the front tables to the back, because it throws further with less spill onto walls and ceiling.',
      ] },
      { h: 'Design for speech first', p: [
        'Guests forgive a slightly thin band; they do not forgive a speech nobody understood. Aim the main speakers at the seating, not the walls, mount them high enough to clear the first rows, and add delay or fill speakers in long rooms so nobody sits more than about 20 m from a source.',
        'Wireless handhelds are the workhorse of a banquet hall. A UHF set such as the [itc T-592UH](' + P + '/microphones/itc-t-592uh) covers the MC, speeches and a singer; add a lectern microphone like the [itc TS-548MD](' + P + '/microphones/itc-ts-548md) for formal events.',
      ] },
      { h: 'Add the low end — carefully', p: [
        'Subwoofers make dance music work, but in a hard room they also make it boomy. Cluster them on the floor under or beside the stage rather than spreading them around the room, and set the crossover in the processor. One or two dual-18" subs such as the [itc KS-S218](' + P + '/line-array-speakers/itc-ks-s218) are enough for most halls up to 800 guests.',
      ] },
      { h: 'Control: simple for staff, protected from abuse', p: [
        'Banquet halls are run by whoever is on shift. A mixer with built-in DSP and presets — for example the [itc TS-16PFX-4](' + P + '/mixing-consoles/itc-ts-16pfx-4) — lets staff recall "Dinner", "Speeches" and "Dance" in one step. An [audio processor](' + P + '/audio-peripherals/itc-ts-3400mix) with limiters after the mixer stops a visiting DJ from damaging the speakers.',
      ] },
      { h: 'Typical system by hall size', list: [
        'Up to 300 guests: 2 × point-source mains (KS-10H), 1 subwoofer, a 2-channel amplifier, 12–16 channel DSP mixer, 2 wireless mics.',
        '300–800 guests: 3–4 KS-210 line-array boxes per side, 1–2 KS-S218 subs, TC-21000 amplifiers, DSP mixer + processor, 4 wireless mics, 2 stage monitors.',
        '800+ guests or very long rooms: delay speakers half-way down the room, time-aligned in the processor; a digital mixer for multi-band events.',
      ] },
      { h: 'Common mistakes we fix', list: [
        'Speakers on the side walls pointing across the room — they excite the walls and smear speech.',
        'Subwoofers in the corners "for more bass" — they boom and drown the MC.',
        'No limiter — the first loud DJ night ends with blown drivers.',
        'Cheap wireless microphones that drop out when the hall is full of phones.',
      ] },
    ],
    kit: [
      { role: 'Main loudspeakers', model: 'itc KS-210 line array', href: P + '/line-array-speakers/itc-ks-210', why: 'Even coverage to the back tables, controlled spill' },
      { role: 'Subwoofer', model: 'itc KS-S218', href: P + '/line-array-speakers/itc-ks-s218', why: 'Dual 18" low end for dance nights' },
      { role: 'Fill / smaller halls', model: 'itc KS-10H', href: P + '/pro-loudspeakers/itc-ks-10h', why: 'Point-source main or delay fill' },
      { role: 'Amplifier', model: 'itc TC-21000', href: P + '/amplifiers/itc-tc-21000', why: '2 × 1,000 W @ 8 Ω, >95% efficient' },
      { role: 'Mixer', model: 'itc TS-16PFX-4', href: P + '/mixing-consoles/itc-ts-16pfx-4', why: 'DSP effects + presets for staff' },
      { role: 'Wireless mics', model: 'itc T-592UH', href: P + '/microphones/itc-t-592uh', why: 'Reliable UHF handhelds for MC and speeches' },
    ],
    faq: [
      { q: 'How many speakers does a 500-guest banquet hall need?', a: 'Typically 3–4 line-array boxes per side plus one or two subwoofers, with delay fills if the room is longer than about 30 m. We confirm the numbers on a free site survey.' },
      { q: 'Can one system handle both live bands and DJs?', a: 'Yes — design for the DJ level and the band inputs, add stage monitors, and protect everything with a processor and limiter.' },
      { q: 'Can staff operate it without an engineer?', a: 'Yes. Mixer presets cover dinner, speeches and dance, and we train staff at handover.' },
      { q: 'Do you install and service the system?', a: 'Yes — survey, design, rigging, tuning, training and local after-sales support across Nepal.' },
    ],
  },
  {
    slug: 'conference-hall-sound-system-design', venue: 'Conference Hall', diagramKey: 'conference-hall',
    title: 'Conference Hall Sound System Design Guide for Nepal',
    description: 'Speech intelligibility first — loudspeakers, microphones, feedback control and simple operation for government, corporate and university halls.',
    hero: '/images/heroes/government-hero.webp', date: '2026-11-04', readMins: 7,
    keywords: ['conference hall sound system Nepal', 'seminar hall PA system', 'auditorium microphone system Kathmandu'],
    intro: [
      'In a conference hall the only measure of success is whether every person understands every word — the chair, the presenter, the question from row 20. Most halls we survey have the opposite problem: powerful speakers that are loud everywhere and clear nowhere.',
      'This guide covers how we design conference and seminar halls for ministries, banks, universities and hotels: the loudspeakers that suit speech, how many microphones to plan, and how to stop feedback before it starts.',
    ],
    sections: [
      { h: 'Column loudspeakers: the speech specialists', p: [
        'Column speakers are tall and narrow, so their coverage is tight vertically and wide horizontally — sound goes to the audience instead of bouncing off the ceiling and floor as echo. The [itc TS-403C / 603C / 803C / 1203C family](' + P + '/pro-loudspeakers/itc-ts-403c) scales from seminar rooms (TS-403C) to 30 m halls (TS-1203C).',
        'Under low ceilings, distributed wall speakers such as the [itc TS-605T](' + P + '/pro-loudspeakers/itc-ts-605t) keep every listener close to a speaker without raising the level.',
      ] },
      { h: 'Microphones: one per speaker, not one per table', p: [
        'Plan a gooseneck microphone for each person on the dais (for example the [itc TS-301DM2](' + P + '/microphones/itc-ts-301dm2)), two wireless handhelds for audience questions ([itc T-592UL](' + P + '/microphones/itc-t-592ul)) and a lectern mic. For formal sessions with a chair, speaking order or voting, a digital conference system is the better choice — see our [conference microphone guide](/blog/conference-room-microphone-guide-nepal).',
      ] },
      { h: 'Feedback control and DSP', p: [
        'Feedback — the howl when a microphone hears its own loudspeaker — is the most common complaint in Nepali halls. Keep speakers in front of the microphones, use directional mics, and add a feedback suppressor such as the [itc TS-224D](' + P + '/audio-peripherals/itc-ts-224d). A 4-channel DSP amplifier like the [itc TC-D4350](' + P + '/amplifiers/itc-tc-d4200) adds EQ and delay per zone in one box.',
      ] },
      { h: 'Make it operable', p: [
        'Most halls have no sound engineer. A smart mixer ([itc TS-D1604X](' + P + '/audio-peripherals/itc-ts-d1604x)) with a fixed gain structure and one volume control, plus labelled [desktop sockets](' + P + '/audio-peripherals/itc-ts-18d) for laptops at the podium, lets any staff member run a session.',
      ] },
      { h: 'Typical system by hall size', list: [
        'Seminar room (50–100 seats): 2 × TS-603C columns, 2 wall fills, a 2-channel amp, smart mixer, 4 goosenecks, 2 wireless.',
        'Conference hall (100–300 seats): 2 × TS-803C or TS-1203C, rear delay speakers, TC-D4350 DSP amp, feedback suppressor, 8–12 goosenecks, 2–4 wireless.',
        'Large auditorium (300+): compact line array (KS-210) with fills, a digital mixer, recording and streaming feed.',
      ] },
    ],
    kit: [
      { role: 'Main speakers', model: 'itc TS-803C / TS-1203C column', href: P + '/pro-loudspeakers/itc-ts-403c', why: 'Tight vertical coverage = clear speech' },
      { role: 'Fill speakers', model: 'itc TS-605T wall speaker', href: P + '/pro-loudspeakers/itc-ts-605t', why: 'Even level under balconies and in long rooms' },
      { role: 'Amplifier', model: 'itc TC-D4350 DSP', href: P + '/amplifiers/itc-tc-d4200', why: '4 channels with EQ and delay built in' },
      { role: 'Mixer', model: 'itc TS-D1604X smart mixer', href: P + '/audio-peripherals/itc-ts-d1604x', why: 'Simple, preset-driven operation' },
      { role: 'Feedback control', model: 'itc TS-224D', href: P + '/audio-peripherals/itc-ts-224d', why: 'Stops howl before it starts' },
      { role: 'Microphones', model: 'itc TS-301DM2 + T-592UL', href: P + '/microphones/itc-ts-301dm2', why: 'Goosenecks for the dais, wireless for Q&A' },
    ],
    faq: [
      { q: 'Why does our hall echo even though the speakers are powerful?', a: 'Usually the speakers spray sound onto hard walls and ceiling. Column speakers aimed at the audience, plus EQ, fix most halls without acoustic treatment.' },
      { q: 'Should we use a delegate conference system?', a: 'For formal meetings with a chair, speaking order or voting, yes. For seminars and presentations, goosenecks plus wireless are simpler and cheaper.' },
      { q: 'Can the hall record or stream sessions?', a: 'Yes — the mixer provides a clean feed for recording, live-streaming or a video-conference codec.' },
    ],
  },
  {
    slug: 'concert-hall-auditorium-sound-system-design', venue: 'Concert Hall', diagramKey: 'concert-hall',
    title: 'Concert Hall & Auditorium Sound System Design Guide',
    description: 'Line arrays, subwoofers, monitors and digital mixing for concert halls and large auditoriums — full-range music evenly to every seat.',
    hero: '/images/heroes/education-hero.webp', date: '2026-11-04', readMins: 7,
    keywords: ['auditorium sound system Nepal', 'line array speaker Nepal', 'concert hall audio design'],
    intro: ['A concert hall must reproduce everything from a solo singer to a full band at high level, evenly, for every seat — including the balcony and the back corners. That is a different problem from speech reinforcement, and it is where a professional line array earns its cost.'],
    sections: [
      { h: 'Why a line array', p: ['A line array is a vertical column of identical boxes that behaves like one long source. It loses level more slowly with distance than a single box, so the front rows are not deafened to make the back rows hear. The [itc KS-210](' + P + '/line-array-speakers/itc-ks-210) can fly up to 24 boxes; for most Nepali auditoriums 4–8 per side are enough.'] },
      { h: 'Subwoofers, front fills and monitors', p: ['Fly or stack subwoofers ([itc KS-S218](' + P + '/line-array-speakers/itc-ks-s218)) centrally, or in a cardioid arrangement to keep bass off the stage. Front-fill speakers ([itc KS-10H](' + P + '/pro-loudspeakers/itc-ks-10h)) cover the first rows under the array, and coaxial wedges such as the [itc KS-14F](' + P + '/pro-loudspeakers/itc-ks-14f) let performers hear themselves without pushing up the house level.'] },
      { h: 'Mixing and processing', p: ['A 32-channel digital mixer ([itc TS-32PD-12](' + P + '/mixing-consoles/itc-ts-32pd-12)) handles a band, choir or orchestra pickup, with scene recall per act and system EQ and delay for arrays, subs and fills. Power the arrays with high-headroom amplifiers — [itc TC-21200](' + P + '/amplifiers/itc-tc-21200) for the tops and [TC-23000](' + P + '/amplifiers/itc-tc-23000) for subwoofers.'] },
      { h: 'Simulate before you hang', p: ['itc loudspeakers are in the EASE and EASE Focus acoustic libraries. For new auditoriums we model the room, choose array length and splay angles, and show predicted coverage before any steel goes into the ceiling.'] },
    ],
    kit: [
      { role: 'Line array', model: 'itc KS-210', href: P + '/line-array-speakers/itc-ks-210', why: 'Even level front-to-back' },
      { role: 'Subwoofer', model: 'itc KS-S218', href: P + '/line-array-speakers/itc-ks-s218', why: 'Dual 18" array sub' },
      { role: 'Front fill', model: 'itc KS-10H', href: P + '/pro-loudspeakers/itc-ks-10h', why: 'First rows under the array' },
      { role: 'Stage monitor', model: 'itc KS-14F', href: P + '/pro-loudspeakers/itc-ks-14f', why: 'Coaxial wedge' },
      { role: 'Digital mixer', model: 'itc TS-32PD-12', href: P + '/mixing-consoles/itc-ts-32pd-12', why: '32 channels, scenes, system DSP' },
      { role: 'Amplifiers', model: 'itc TC-21200 / TC-23000', href: P + '/amplifiers/itc-tc-21200', why: 'Headroom for full-range music' },
    ],
    faq: [
      { q: 'Is a line array necessary for a 600-seat auditorium?', a: 'Not always, but it is usually the best value: fewer boxes, more even coverage and less echo than spreading point-source speakers around the room.' },
      { q: 'Can the same system handle speeches and convocations?', a: 'Yes — store a speech preset with tighter EQ; a well-tuned array is excellent for speech.' },
      { q: 'Do you provide acoustic simulations?', a: 'Yes, for new builds and major upgrades we model the hall in EASE before the final design.' },
    ],
  },
  {
    slug: 'theatre-sound-system-design', venue: 'Theatre', diagramKey: 'theatre',
    title: 'Theatre Sound System Design Guide for Nepal',
    description: 'Proscenium arrays, wireless headsets, fills and immersive options for drama, musicals, dance and cinema-capable theatres.',
    hero: '/images/heroes/religious-hero.webp', date: '2026-11-04', readMins: 6,
    keywords: ['theatre sound system Nepal', 'stage wireless microphone system', 'immersive audio theatre'],
    intro: ['Theatre sound must be heard but not noticed. The audience should believe the voice comes from the actor, not from a speaker on the wall — while every word still reaches the balcony.'],
    sections: [
      { h: 'Proscenium left, right and centre', p: ['Mount compact arrays ([itc KS-210](' + P + '/line-array-speakers/itc-ks-210)) either side of the proscenium and, where possible, a centre cluster for vocals so the image stays on stage. Front fills ([KS-10H](' + P + '/pro-loudspeakers/itc-ks-10h)) and balcony fills complete the coverage.'] },
      { h: 'Wireless microphones are the heart of the show', p: ['Musicals and dramas use headset or lavalier microphones — one channel per principal actor plus spares. The [itc T-592UT](' + P + '/microphones/itc-t-592ut) bodypack system with an antenna splitter ([T-523A](' + P + '/audio-peripherals/itc-t-523a)) and remote antennas ([T-522B](' + P + '/audio-peripherals/itc-t-522b)) keeps 8–16 channels stable on a busy stage.'] },
      { h: 'Going immersive', p: ['The [itc Ease immersive system](' + P + '/immersive-sound/itc-ts-cj00a) positions each voice or effect in space and follows the performer in real time, with Art-Net/PSN tracking that can also drive the lighting — for premium theatres, exhibitions and cultural shows.'] },
    ],
    kit: [
      { role: 'Proscenium arrays', model: 'itc KS-210', href: P + '/line-array-speakers/itc-ks-210', why: 'Stalls and balcony coverage' },
      { role: 'Subwoofer', model: 'itc KS-S218', href: P + '/line-array-speakers/itc-ks-s218', why: 'Music and effects' },
      { role: 'Wireless', model: 'itc T-592UT', href: P + '/microphones/itc-t-592ut', why: 'Bodypack headsets for actors' },
      { role: 'Digital mixer', model: 'itc TS-24PD-12', href: P + '/mixing-consoles/itc-ts-24pd-12', why: 'Scene-based show control' },
      { role: 'Immersive (option)', model: 'itc TS-CJ00A', href: P + '/immersive-sound/itc-ts-cj00a', why: 'Object-based spatial audio' },
    ],
    faq: [
      { q: 'How many wireless channels does a theatre need?', a: 'One per speaking actor plus 10–20% spares — typically 8–12 channels for a school or community production.' },
      { q: 'Can the theatre also screen films?', a: 'Yes — add a cinema processor feed and surrounds; itc also makes a dedicated cinema loudspeaker series.' },
    ],
  },
  {
    slug: 'stadium-sports-ground-sound-system-design', venue: 'Stadium', diagramKey: 'stadium',
    title: 'Stadium & Sports Ground Sound System Design Guide',
    description: 'Long-throw line arrays, stand fills, weatherproofing and announcement priority for stadiums, cricket grounds and sports complexes.',
    hero: '/images/heroes/transportation-hero.webp', date: '2026-11-04', readMins: 6,
    keywords: ['stadium sound system Nepal', 'sports ground PA system', 'outdoor line array speakers'],
    intro: ['Stadium sound fights distance, crowd noise and weather at the same time. The announcement must be understood across 100+ metres, over thousands of voices, after a monsoon season outdoors.'],
    sections: [
      { h: 'Long-throw mains plus distributed fills', p: ['Use long-throw line arrays ([itc KF-D212](' + P + '/line-array-speakers/itc-kf-d212)) at the corners or on the main stand roof, with [KF-D218S](' + P + '/line-array-speakers/itc-kf-d218s) subwoofers for concerts. Then add fills along each stand ([itc KF-D15H](' + P + '/pro-loudspeakers/itc-kf-d15h)) and horns ([itc TS-3H](' + P + '/pro-loudspeakers/itc-ts-3h)) for concourses — closer sources beat louder sources.'] },
      { h: 'Announcer priority and emergency messages', p: ['Announcer and emergency microphones must override music automatically — build this into the digital mixer ([itc TS-24PD-12](' + P + '/mixing-consoles/itc-ts-24pd-12)) and, for life-safety, integrate a certified [voice-evacuation system](/products/voice-evacuation).'] },
      { h: 'Built for weather', p: ['Exposed positions need IP-rated speakers such as the [itc TS-108HT / TS-115HT](' + P + '/pro-loudspeakers/itc-ts-108ht), stainless hardware and sealed connectors, with amplifiers in a ventilated, locked rack room.'] },
    ],
    kit: [
      { role: 'Long-throw array', model: 'itc KF-D212', href: P + '/line-array-speakers/itc-kf-d212', why: 'Reach across the field' },
      { role: 'Array subwoofer', model: 'itc KF-D218S', href: P + '/line-array-speakers/itc-kf-d218s', why: 'Events and concerts' },
      { role: 'Stand fills', model: 'itc KF-D15H', href: P + '/pro-loudspeakers/itc-kf-d15h', why: 'Close, clear coverage per stand' },
      { role: 'Horns', model: 'itc TS-3H', href: P + '/pro-loudspeakers/itc-ts-3h', why: 'Concourses and gates' },
      { role: 'Amplifiers', model: 'itc TC-21000', href: P + '/amplifiers/itc-tc-21000', why: 'High efficiency, full protection' },
    ],
    faq: [
      { q: 'Can one big speaker cover a stadium?', a: 'No — distance and crowd noise make a single source unintelligible. Long-throw mains plus distributed fills is the reliable design.' },
      { q: 'Will it survive the monsoon?', a: 'Yes, with IP-rated outdoor models, proper rigging and drainage, and amplifiers kept indoors.' },
    ],
  },
  {
    slug: 'outdoor-concert-festival-sound-system-design', venue: 'Outdoor Concert', diagramKey: 'vocal-concert',
    title: 'Outdoor Concert & Festival Sound System Design Guide',
    description: 'Flown line arrays, ground subs, monitors and FOH for concerts, jatras, college fests and outdoor events of 1,000–10,000 people.',
    hero: '/images/heroes/hero-poster.webp', date: '2026-11-04', readMins: 6,
    keywords: ['concert sound system Nepal', 'outdoor event PA system', 'festival line array'],
    intro: ['Outdoor shows in Nepal — college fests, jatras, concerts on open grounds and lakesides — have no walls to help or hurt. Everything the audience hears comes straight from the system, so coverage and power must be planned for the crowd size.'],
    sections: [
      { h: 'Size the system by audience', list: [
        '1,000 people: 4–6 LA-series boxes per side, 2–4 subs per side.',
        '3,000 people: 8 boxes per side flown or on towers, 4–6 subs per side, delay towers beyond about 60 m.',
        '5,000+: large-format arrays ([itc LA-2800K / LA-1800K](' + P + '/line-array-speakers/itc-la-2800k)), ground-stacked subs, delay towers and side fills.',
      ] },
      { h: 'Stage: monitors and microphones', p: ['Give each performer a wedge ([itc KS-14F](' + P + '/pro-loudspeakers/itc-ks-14f)), add side fills ([KS-12A35](' + P + '/pro-loudspeakers/itc-ks-12a35)) for dancers, and run wireless vocals ([itc T-592UW](' + P + '/microphones/itc-t-592uw)) on a frequency plan agreed before the show.'] },
      { h: 'FOH and power', p: ['Mix from a 32-channel digital console ([itc TS-32PD-12](' + P + '/mixing-consoles/itc-ts-32pd-12)) placed about two-thirds of the way back. Use a stable generator with proper earthing and power distribution — power problems stop more shows than speakers do.'] },
    ],
    kit: [
      { role: 'Flown array', model: 'itc LA-2800K', href: P + '/line-array-speakers/itc-la-2800k', why: 'Large-format line array' },
      { role: 'Side fill', model: 'itc KS-12A35', href: P + '/pro-loudspeakers/itc-ks-12a35', why: 'Portable active column' },
      { role: 'Monitors', model: 'itc KS-14F', href: P + '/pro-loudspeakers/itc-ks-14f', why: 'Coaxial wedges' },
      { role: 'Digital mixer', model: 'itc TS-32PD-12', href: P + '/mixing-consoles/itc-ts-32pd-12', why: 'FOH with scenes' },
      { role: 'Amplifiers', model: 'itc TC-23000', href: P + '/amplifiers/itc-tc-23000', why: 'Power for arrays and subs' },
    ],
    faq: [
      { q: 'How far can a line array throw?', a: 'Large-format arrays cover about 60–80 m well; beyond that, add delay towers time-aligned to the main system.' },
      { q: 'Do you supply systems for event companies?', a: 'Yes — we supply, install and train for permanent and touring systems.' },
    ],
  },
  {
    slug: 'ktv-karaoke-room-sound-system-design', venue: 'KTV / Karaoke', diagramKey: 'ktv',
    title: 'KTV & Karaoke Room Sound System Design Guide',
    description: 'Full-range speakers, subwoofers, KTV processors and wireless microphones for karaoke rooms, lounges and clubs.',
    hero: '/images/heroes/hotels-hero.webp', date: '2026-11-04', readMins: 4,
    keywords: ['karaoke sound system Nepal', 'KTV speakers', 'club sound system Kathmandu'],
    intro: ['A karaoke room is a small, hard, crowded space where untrained singers hold microphones close to loudspeakers. The system must make amateur vocals sound good, resist feedback and survive enthusiastic use.'],
    sections: [
      { h: 'The core system', p: ['Two full-range speakers ([itc KT-H12](' + P + '/pro-loudspeakers/itc-kt-h12)) at the screen end, a subwoofer ([itc KT-DS218](' + P + '/subwoofers/itc-kt-ds218)), and a KTV amplifier with built-in echo, reverb and anti-feedback ([itc T-2350KS](' + P + '/amplifiers/itc-t-2350ks)). Add effect speakers ([TS-29B](' + P + '/pro-loudspeakers/itc-ts-29b)) for larger rooms.'] },
      { h: 'Microphones that make singers sound better', p: ['Wireless handhelds ([itc T-592US](' + P + '/microphones/itc-t-592us)) with a warm response and good off-axis rejection reduce feedback. Keep a charging routine so the evening rush never starts with dead batteries.'] },
      { h: 'Room treatment matters', p: ['Soft furnishings, carpet and a few absorptive panels make a bigger difference in a KTV room than a more expensive speaker. We advise on treatment as part of the design.'] },
    ],
    kit: [
      { role: 'Full-range', model: 'itc KT-H12', href: P + '/pro-loudspeakers/itc-kt-h12', why: 'Vocal-forward KTV speaker' },
      { role: 'Subwoofer', model: 'itc KT-DS218', href: P + '/subwoofers/itc-kt-ds218', why: 'Dual 18" for larger rooms and clubs' },
      { role: 'KTV amplifier', model: 'itc T-2350KS', href: P + '/amplifiers/itc-t-2350ks', why: 'DSP echo, reverb, anti-feedback' },
      { role: 'Wireless mics', model: 'itc T-592US', href: P + '/microphones/itc-t-592us', why: 'Forgiving, feedback-resistant' },
    ],
    faq: [{ q: 'Why does our karaoke room keep howling?', a: 'Microphones near speakers, hard surfaces and no anti-feedback DSP. A KTV processor plus speakers placed in front of the singers fixes most rooms.' }],
  },
  {
    slug: 'studio-room-monitoring-recording-design', venue: 'Studio Room', diagramKey: 'studio-room',
    title: 'Studio Room Monitoring & Recording Design Guide',
    description: 'Monitors, microphones and mixing for rehearsal rooms, small studios, podcast and broadcast rooms.',
    hero: '/images/heroes/smart-meeting-rooms-hero.webp', date: '2026-11-04', readMins: 4,
    keywords: ['studio monitor speakers Nepal', 'podcast room setup', 'recording studio equipment Kathmandu'],
    intro: ['A studio room must tell the truth. Monitors that flatter the mix produce recordings that sound wrong everywhere else — accuracy, quiet and a treated room matter more than loudness.'],
    sections: [
      { h: 'Monitoring', p: ['Place two monitors ([itc TS-610P / TS-612P](' + P + '/pro-loudspeakers/itc-ts-610p)) in an equilateral triangle with the listening position, tweeters at ear height, away from walls. Add a subwoofer only if the room is treated for low frequencies.'] },
      { h: 'Microphones', p: ['A dynamic vocal microphone ([itc TS-304DM](' + P + '/microphones/itc-ts-304dm)) rejects room noise for voice-over and podcasts; small-diaphragm condensers ([itc TS-316M](' + P + '/microphones/itc-ts-316m)) capture acoustic instruments and choirs.'] },
      { h: 'Mixing and recording', p: ['A digital mixer ([itc TS-32PD-12](' + P + '/mixing-consoles/itc-ts-32pd-12)) records multitrack to a computer and recalls session settings, so one room works for rehearsal, recording and live-streaming.'] },
    ],
    kit: [
      { role: 'Monitors', model: 'itc TS-610P / TS-612P', href: P + '/pro-loudspeakers/itc-ts-610p', why: 'Accurate monitoring' },
      { role: 'Vocal mic', model: 'itc TS-304DM', href: P + '/microphones/itc-ts-304dm', why: 'Voice-over, podcast, vocals' },
      { role: 'Instrument mic', model: 'itc TS-316M', href: P + '/microphones/itc-ts-316m', why: 'Acoustic instruments, choirs' },
      { role: 'Digital mixer', model: 'itc TS-32PD-12', href: P + '/mixing-consoles/itc-ts-32pd-12', why: 'Multitrack recording + recall' },
    ],
    faq: [{ q: 'Do I need acoustic treatment?', a: 'Yes — absorption at the first-reflection points and bass traps in the corners improve accuracy more than any monitor upgrade.' }],
  },
]

export { TOPIC_GUIDES }
export const SOUND_GUIDES: SoundGuide[] = [...VENUE_GUIDES, ...TOPIC_GUIDES]

export const GUIDE_BY_SLUG: Record<string, SoundGuide> = Object.fromEntries(SOUND_GUIDES.map(g => [g.slug, g]))

/** Next guides to write (brainstorm) — shown on the hub as "coming next". */
export const PLANNED_GUIDES = [
  'Smart classroom AV: podium, projector, camera and sound together',
  'IP network PA vs analog PA for campuses',
  'Voice evacuation (EN54) — what fire inspectors check',
  'Live-streaming a hall or temple event: audio and camera chain',
  'LED screen vs projector for wedding venues',
  'AMC for sound systems — what a maintenance contract should cover',
]
