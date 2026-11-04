// Topic guides — batch 2 (completes the "coming next" list).
import type { SoundGuide } from './soundGuides'

const P = '/products'
const C = '/products/conference-systems'
export const TOPIC_GUIDES_2: SoundGuide[] = [
  {
    slug: 'parliament-council-chamber-conference-system', venue: 'Parliament & Council Chamber', diagramKey: '',
    title: 'Parliament & Council Chamber Audio — Conference Systems Explained',
    description: 'Chairman and delegate units, speaking order, voting, simultaneous interpretation, paperless terminals and camera tracking for assemblies, councils and boardrooms.',
    hero: '/images/heroes/government-hero.webp', date: '2026-11-05', readMins: 8,
    keywords: ['conference system Nepal', 'parliament conference microphone system', 'digital conference system for municipality', 'simultaneous interpretation system Nepal'],
    intro: [
      'Provincial assemblies, municipal and rural-municipal councils, ministries, courts and corporate boards share the same need: an orderly meeting where every member can be heard, the chair stays in control, and the record is complete. That is a different job from a seminar PA, and it is done by a conference system.',
      'A conference system gives every seat its own microphone unit with a speak button, a small speaker and an indicator, all managed by a central controller. On top of that sit optional layers — voting, interpretation, paperless screens and automatic camera tracking.',
    ],
    sections: [
      { h: 'The core: controller, chairman and delegate units', p: [
        'A central host ([itc TS-0300GC](' + C + '/itc-ts-0300gc) fully digital controller) powers and manages the units over network-style cabling. The chairman unit ([TS-0318C](' + C + '/itc-ts-0318c)) has a priority key that can mute all delegates; delegate units request to speak and the controller enforces how many microphones may be open at once (FIFO, request or free modes).',
        'Digital systems transmit uncompressed audio with automatic fallback to an analog link if the digital link is interrupted, so a meeting never goes silent. Each unit can also be configured from a web page — microphone ID, sensitivity and EQ.',
      ] },
      { h: 'Wired or wireless?', list: [
        'Wired (digital) units: the most reliable choice for permanent chambers, with no batteries to charge — e.g. [TS-0332](' + C + '/itc-ts-0332) microphone units.',
        'Wireless units: for halls that change layout or listed buildings where cables cannot be run — e.g. the 5 GHz [TS-W310](' + C + '/itc-ts-w310) chairman unit; plan a charging routine.',
      ] },
      { h: 'Voting, sign-in and agenda', p: ['Many controllers support sign-in and voting keys on each unit, with results shown on the chamber display. Paperless terminals ([TS-8300](' + C + '/itc-ts-8300) controller with motorised screens such as the [TS-FE173MT3](' + C + '/itc-ts-fe173mt3)) add agendas, documents, voting and video on each desk, and retract flush when not in use.'] },
      { h: 'Simultaneous interpretation', p: ['For multilingual sessions — Nepali, English and other languages, or international delegations — an infrared interpretation system distributes each language on its own channel: a digital IR transmitter ([TS-0370H-16](' + C + '/itc-ts-0370h-16)), radiators ([TS-0370HS](' + C + '/itc-ts-0370hs)), interpreter desks ([TS-0370HY](' + C + '/itc-ts-0370hy)) and personal receivers ([TS-0370HD](' + C + '/itc-ts-0370hd)). Infrared stays inside the room, which matters for confidential meetings.'] },
      { h: 'Camera tracking and recording', p: ['Link the conference controller to PTZ cameras so the camera turns to whoever presses the speak button — ideal for live broadcast and records of proceedings. itc video-conference cameras such as the [TV-6124HK](' + P + '/video-conferencing/itc-tv-6124hk) and our [conference camera range](' + P + '/conference-cameras) integrate this way.'] },
      { h: 'Typical configurations', list: [
        'Municipal board room (15–30 seats): controller, 1 chairman + delegate units, PA speakers, recording.',
        'Council chamber (40–100 seats): digital controller with expansion, voting, chamber display, camera tracking.',
        'Assembly hall (100+ seats): add interpretation, paperless terminals, redundant controllers and broadcast feed.',
      ] },
    ],
    kit: [
      { role: 'Conference host', model: 'itc TS-0300GC', href: C + '/itc-ts-0300gc', why: 'Fully digital controller' },
      { role: 'Chairman / delegate unit', model: 'itc TS-0318C', href: C + '/itc-ts-0318c', why: 'Priority, request-to-speak' },
      { role: 'Wireless unit', model: 'itc TS-W310', href: C + '/itc-ts-w310', why: '5 GHz wireless chairman unit' },
      { role: 'Interpretation', model: 'itc TS-0370H-16', href: C + '/itc-ts-0370h-16', why: '16-channel digital infrared' },
      { role: 'Paperless controller', model: 'itc TS-8300', href: C + '/itc-ts-8300', why: 'Agenda, documents, voting' },
      { role: 'All conference systems', model: 'Browse the range', href: C, why: 'Digital, wireless, paperless, interpretation' },
    ],
    faq: [
      { q: 'How many microphones can be open at once?', a: 'The chair sets it — typically 1 to 6 — so the meeting stays orderly and feedback-free.' },
      { q: 'Can the system record minutes?', a: 'Yes — audio is recorded centrally, and with camera tracking the video record follows the speaker automatically.' },
      { q: 'Do we need interpretation?', a: 'Only for multilingual sessions. It can be added later on the same controller.' },
    ],
  },
  {
    slug: 'hotel-ballroom-divisible-room-audio', venue: 'Hotel Ballroom', diagramKey: '',
    title: 'Hotel Ballroom Audio That Divides and Combines',
    description: 'Sound for ballrooms with movable partitions — zoning, source routing, combine/split presets and the wall panels staff actually use.',
    hero: '/images/heroes/hotels-hero.webp', date: '2026-11-05', readMins: 6,
    keywords: ['hotel ballroom sound system Nepal', 'divisible room audio', 'banquet hall partition audio'],
    intro: ['Hotel ballrooms earn more when one hall can become two or three rooms. The audio has to follow: when the partition is closed each room needs its own microphones, music and level; when it opens, everything must play as one.'],
    sections: [
      { h: 'Zone the loudspeakers by room section', p: ['Design each section as a complete room — its own mains ([itc KS-10H](' + P + '/pro-loudspeakers/itc-ks-10h) or ceiling/column speakers) and fills — on separate amplifier channels. A 4-channel DSP amplifier ([itc TC-D4350](' + P + '/amplifiers/itc-tc-d4200)) per section keeps wiring simple and adds delay alignment when combined.'] },
      { h: 'Route sources, not just speakers', p: ['Each section needs microphone and music inputs (wall plates or [desktop sockets](' + P + '/audio-peripherals/itc-ts-18d)) that follow the room mode. A digital mixer or matrix processor ([itc TS-3400MIX](' + P + '/audio-peripherals/itc-ts-3400mix)) holds presets such as "A+B+C combined", "A | B+C", "A | B | C".'] },
      { h: 'One button for staff', p: ['Banquet staff should never touch a mixer. A simple wall control or preset recall that matches the partition position is the goal; we label it with the room names the hotel already uses.'] },
      { h: 'Wireless microphones per room', p: ['Give each section its own wireless channels ([itc T-592UH](' + P + '/microphones/itc-t-592uh)) on planned frequencies so neighbouring events never pick each other up.'] },
    ],
    kit: [
      { role: 'Section speakers', model: 'itc KS-10H', href: P + '/pro-loudspeakers/itc-ks-10h', why: 'Full-range per section' },
      { role: 'Amplifier', model: 'itc TC-D4350', href: P + '/amplifiers/itc-tc-d4200', why: '4 zones with DSP' },
      { role: 'Processor', model: 'itc TS-3400MIX', href: P + '/audio-peripherals/itc-ts-3400mix', why: 'Combine/split presets' },
      { role: 'Wireless', model: 'itc T-592UH', href: P + '/microphones/itc-t-592uh', why: 'Channels per room' },
    ],
    faq: [{ q: 'Can one event use the whole hall and another split it next day?', a: 'Yes — that is exactly what the presets are for. Staff recall the mode that matches the partition.' }],
  },
  {
    slug: 'digital-vs-analog-mixers-for-venues', venue: 'Digital vs Analog Mixers', diagramKey: '',
    title: 'Digital vs Analog Mixers for Venues',
    description: 'When an analog mixer with DSP is enough, when a digital console pays for itself, and how to choose channel counts.',
    hero: '/images/heroes/corporate-hero.webp', date: '2026-11-05', readMins: 5,
    keywords: ['digital mixer vs analog mixer', 'audio mixer Nepal', 'digital mixing console Nepal'],
    intro: ['The mixer is where every microphone and source meets. The choice between analog and digital is less about sound quality — both can sound excellent — and more about how the venue is operated.'],
    sections: [
      { h: 'Analog with DSP: simple and robust', p: ['An analog mixer with built-in effects ([itc TS-12PFX](' + P + '/mixing-consoles/itc-ts-12pfx), [TS-16PFX-4](' + P + '/mixing-consoles/itc-ts-16pfx-4)) has one knob per function — easy for occasional operators, quick to troubleshoot, and ideal for schools, banquet halls and small churches with 4–12 inputs.'] },
      { h: 'Digital: scenes, recall and processing', p: ['A digital console ([itc TS-24PD-12](' + P + '/mixing-consoles/itc-ts-24pd-12), [TS-32PD-12](' + P + '/mixing-consoles/itc-ts-32pd-12)) stores complete set-ups as scenes, includes EQ, compression, delay and effects on every channel, and can record multitrack. For auditoriums, theatres and venues hosting different events every day, recall alone saves hours.'] },
      { h: 'Choosing the channel count', list: [
        'Count every microphone, instrument and playback source — then add 25% for growth.',
        'Count outputs: mains, subs, fills, monitors, recording and streaming feeds.',
        'If more than about 12 inputs or 4 outputs, digital is usually the better value.',
      ] },
      { h: 'Installed vs operated', p: ['For rooms with no operator, a smart preset mixer ([itc TS-D1604X](' + P + '/audio-peripherals/itc-ts-d1604x)) with locked settings may be better than either console.'] },
    ],
    kit: [
      { role: 'Analog + DSP', model: 'itc TS-16PFX-4', href: P + '/mixing-consoles/itc-ts-16pfx-4', why: 'Simple, effects built in' },
      { role: 'Digital 24-ch', model: 'itc TS-24PD-12', href: P + '/mixing-consoles/itc-ts-24pd-12', why: 'Scenes and recall' },
      { role: 'Digital 32-ch', model: 'itc TS-32PD-12', href: P + '/mixing-consoles/itc-ts-32pd-12', why: 'Large events and recording' },
      { role: 'Unattended rooms', model: 'itc TS-D1604X', href: P + '/audio-peripherals/itc-ts-d1604x', why: 'Locked presets' },
    ],
    faq: [{ q: 'Is digital harder to use?', a: 'For a trained operator it is faster; for occasional users we set up simple scenes and lock the rest.' }],
  },
  {
    slug: 'outdoor-speakers-monsoon-ip-ratings', venue: 'Outdoor Speakers & IP Ratings', diagramKey: '',
    title: 'Outdoor Speakers for the Monsoon: IP Ratings Explained',
    description: 'What IP54, IP56 and IP65 actually mean, how rain, dust and UV damage speakers, and how to install outdoor sound that lasts in Nepal.',
    hero: '/images/heroes/transportation-hero.webp', date: '2026-11-05', readMins: 5,
    keywords: ['outdoor speaker IP rating', 'waterproof speaker Nepal', 'outdoor PA system monsoon'],
    intro: ['Nepal\'s monsoon, dust and high-altitude UV are hard on outdoor equipment. An "outdoor" label is not enough — the IP rating, mounting and cabling decide whether a speaker survives three seasons or one.'],
    sections: [
      { h: 'Reading an IP rating', list: [
        'First digit = dust: 5 is dust-protected, 6 is dust-tight.',
        'Second digit = water: 4 splashing, 5 water jets, 6 powerful jets, 7 temporary immersion.',
        'IP56 — like the [itc TS-108HT / TS-115HT](' + P + '/pro-loudspeakers/itc-ts-108ht) — means dust-protected and resistant to powerful water jets: suitable for exposed outdoor installation.',
      ] },
      { h: 'Install for the weather', list: [
        'Tilt speakers slightly downward so water runs off the grille.',
        'Use stainless brackets and hardware, and drip loops on every cable.',
        'Seal cable entries; use outdoor-rated cable and junction boxes.',
        'Keep amplifiers and processors indoors in a ventilated rack.',
      ] },
      { h: 'Coverage outdoors', p: ['Outdoors there are no walls to reflect sound, so plan more, smaller sources closer to listeners — horns ([itc TS-3H](' + P + '/pro-loudspeakers/itc-ts-3h)) for long throw, full-range outdoor boxes for courtyards and grounds, with delay alignment between them.'] },
    ],
    kit: [
      { role: 'Outdoor full-range', model: 'itc TS-108HT / TS-115HT', href: P + '/pro-loudspeakers/itc-ts-108ht', why: 'IP56, coaxial' },
      { role: 'Long-throw horn', model: 'itc TS-3H', href: P + '/pro-loudspeakers/itc-ts-3h', why: 'Stadiums and grounds' },
      { role: 'Outdoor series', model: 'itc TP-10 / TP-12 / TP-15', href: P + '/pro-loudspeakers/itc-tp-12', why: 'Outdoor loudspeaker range' },
    ],
    faq: [{ q: 'Can indoor speakers be used under a roof outdoors?', a: 'Under a deep canopy sometimes, but humidity and wind-driven rain still damage them. Use rated outdoor models.' }],
  },
  {
    slug: 'immersive-spatial-audio-exhibitions-theatres', venue: 'Immersive Audio', diagramKey: '',
    title: 'Immersive (Spatial) Audio for Exhibitions and Theatres',
    description: 'How object-based immersive sound works, where it adds value, and what a system like itc Ease needs: speakers, processing and tracking.',
    hero: '/images/heroes/religious-hero.webp', date: '2026-11-05', readMins: 5,
    keywords: ['immersive audio system', 'spatial audio theatre', 'immersive exhibition sound Nepal'],
    intro: ['Conventional stereo places sound between two speakers, so only the middle seats hear the intended picture. Immersive audio treats each voice, instrument or effect as an object with a position, and renders it across many speakers so the whole audience hears it in the right place.'],
    sections: [
      { h: 'How it works', p: ['A processor ([itc TS-CJ00A](' + P + '/immersive-sound/itc-ts-cj00a)) receives each source separately and calculates its contribution to every loudspeaker in real time, using wave-field and object-based techniques. The itc system claims more than 90% of the audience inside the good listening area, versus a narrow sweet spot for stereo.'] },
      { h: 'Tracking performers', p: ['With positioning software ([itc TS-CJ00R](' + P + '/immersive-sound/itc-ts-cj00r)) and PSN/Art-Net tracking, a moving actor\'s voice follows them across the stage — and the same data can steer lighting automatically.'] },
      { h: 'Where it is worth it', list: ['Theatres and musicals', 'Museums, exhibitions and theme venues', 'Premium auditoriums and planetaria', 'Brand experience centres'] },
      { h: 'What it needs', p: ['More loudspeakers than a standard system — typically a front array of evenly spaced full-range boxes plus surrounds — careful calibration, and a management controller ([itc TS-CJ00G](' + P + '/immersive-sound/itc-ts-cj00g)).'] },
    ],
    kit: [
      { role: 'Immersive processor', model: 'itc TS-CJ00A', href: P + '/immersive-sound/itc-ts-cj00a', why: 'Object rendering' },
      { role: 'Management controller', model: 'itc TS-CJ00G', href: P + '/immersive-sound/itc-ts-cj00g', why: 'System control' },
      { role: 'Positioning software', model: 'itc TS-CJ00R', href: P + '/immersive-sound/itc-ts-cj00r', why: '3D tracking' },
    ],
    faq: [{ q: 'Can immersive audio be added to an existing theatre?', a: 'Often yes, by adding speakers and the processor around the existing system; a survey decides how many.' }],
  },
  {
    slug: 'cinema-hall-sound-system-design', venue: 'Cinema Hall', diagramKey: '',
    title: 'Cinema Hall Sound: Screen Channels, Surrounds and Subs',
    description: 'Screen speakers behind the screen, surround arrays, subwoofers and calibration for cinema halls, mini-theatres and screening rooms.',
    hero: '/images/heroes/education-hero.webp', date: '2026-11-05', readMins: 5,
    keywords: ['cinema sound system Nepal', 'movie theatre speakers', 'cinema hall audio design'],
    intro: ['Cinema sound is a standard, not a style: dialogue anchored to the screen, effects that move around the room and low frequencies that are felt as well as heard, all calibrated so the film sounds as the mixers intended.'],
    sections: [
      { h: 'Screen channels', p: ['Left, centre and right speakers sit behind a perforated screen. Cinema full-range models such as the [itc KF-Y215](' + P + '/pro-loudspeakers/itc-kf-y215) or [KF-Y15](' + P + '/pro-loudspeakers/itc-kf-y15) are designed for this position and for high, clean dialogue levels.'] },
      { h: 'Surrounds', p: ['Smaller full-range speakers ([itc KF-Y10](' + P + '/pro-loudspeakers/itc-kf-y10) / [KF-Y12](' + P + '/pro-loudspeakers/itc-kf-y12)) line the side and rear walls in arrays, so every seat hears surround effects evenly rather than from one nearby box.'] },
      { h: 'Low-frequency effects', p: ['Cinema subwoofers ([itc KF-YS218](' + P + '/subwoofers/itc-kf-ys218) / [KF-YS18](' + P + '/subwoofers/itc-kf-ys18)) behind or below the screen reproduce the LFE channel; size them to the room volume and level standard.'] },
      { h: 'Power and calibration', p: ['Use high-headroom amplifiers ([itc TC-21200](' + P + '/amplifiers/itc-tc-21200)) and calibrate every channel for level, delay and EQ at the main listening positions. Re-check after any change to the screen or seating.'] },
    ],
    kit: [
      { role: 'Screen speakers', model: 'itc KF-Y215', href: P + '/pro-loudspeakers/itc-kf-y215', why: 'Behind-screen L/C/R' },
      { role: 'Surrounds', model: 'itc KF-Y10 / KF-Y12', href: P + '/pro-loudspeakers/itc-kf-y10', why: 'Side and rear arrays' },
      { role: 'Subwoofer', model: 'itc KF-YS218', href: P + '/subwoofers/itc-kf-ys218', why: 'LFE channel' },
      { role: 'Amplifiers', model: 'itc TC-21200', href: P + '/amplifiers/itc-tc-21200', why: 'Headroom for film peaks' },
    ],
    faq: [{ q: 'Can a school auditorium also work as a cinema?', a: 'Yes, by adding a centre channel, surrounds and a cinema processor feed alongside the existing PA.' }],
  },
]
