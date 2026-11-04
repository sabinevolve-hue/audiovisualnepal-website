// Topic guides (technology / buying) — same shape as venue guides; diagramKey '' = no venue drawings.
import type { SoundGuide } from './soundGuides'
import { TOPIC_GUIDES_2 } from './topicGuides2'

const P = '/products'
const TOPIC_GUIDES_1: SoundGuide[] = [
  {
    slug: 'temple-church-gumba-sound-system-design', venue: 'Temple, Church & Gumba', diagramKey: '',
    title: 'Sound Systems for Temples, Churches & Gumbas — Speech Clarity in Reverberant Spaces',
    description: 'How to make prayers, sermons and chanting clear in stone, brick and high-ceiling worship spaces — without drowning the atmosphere.',
    hero: '/images/heroes/religious-hero.webp', date: '2026-11-05', readMins: 7,
    keywords: ['temple sound system Nepal', 'church PA system Kathmandu', 'gumba monastery sound system'],
    intro: [
      'Places of worship are some of the hardest rooms to amplify. Stone, brick, marble and tall ceilings make every word ring for two or three seconds; a loud speaker in that room just adds more echo. At the same time the system must respect the space — no harsh sound, no visible clutter, and nothing that spoils the chanting, bells and music that belong there.',
      'The rule that solves most worship spaces is simple: get the sound to the listener directly, and keep it off the hard surfaces.',
    ],
    sections: [
      { h: 'Why ordinary speakers fail here', p: ['A typical box speaker spreads sound in every direction. In a reverberant hall most of that energy hits the ceiling and walls and returns late, blurring the next syllable. Turning it up makes the blur louder, not clearer. That is why many temples and churches "have sound" but still cannot be understood beyond the first rows.'] },
      { h: 'Column speakers and distributed design', p: [
        'Column loudspeakers aim a narrow vertical beam at the congregation and keep sound off the ceiling. A pair of [itc TS-1203C columns](' + P + '/pro-loudspeakers/itc-ts-403c) on pillars covers a long nave; for wide halls and gumbas, more columns or slim wall speakers spaced along the room keep every listener close to a source at a modest level.',
        'For outdoor courtyards and festival grounds, weatherproof horns or outdoor speakers ([itc TS-108HT](' + P + '/pro-loudspeakers/itc-ts-108ht)) on delay keep announcements clear across the compound.',
      ] },
      { h: 'Delay alignment makes it natural', p: ['When speakers are spread down the hall, each one is time-delayed in the processor so its sound arrives just after the sound from the front. The ear then locates the voice at the priest, lama or pastor, not at the nearest speaker. A DSP amplifier ([itc TC-D4350](' + P + '/amplifiers/itc-tc-d4200)) does this per zone.'] },
      { h: 'Microphones for ritual and sermon', list: [
        'Gooseneck or lectern mic for the main speaker ([itc TS-548MD](' + P + '/microphones/itc-ts-548md)).',
        'Wireless lavalier or headset for a moving speaker, so the voice stays consistent.',
        'A small-diaphragm condenser ([itc TS-316M](' + P + '/microphones/itc-ts-316m)) over a choir or chanting group, kept well behind the speakers to avoid feedback.',
      ] },
      { h: 'Respect the space', p: ['Choose speaker colours that match the walls, run cables in conduit, and set a sensible maximum level. Many committees also want recording or live-streaming for devotees abroad — the mixer can provide a clean feed for both.'] },
    ],
    kit: [
      { role: 'Main speakers', model: 'itc TS-1203C column', href: P + '/pro-loudspeakers/itc-ts-403c', why: 'Narrow vertical beam, minimal echo' },
      { role: 'Courtyard', model: 'itc TS-108HT outdoor', href: P + '/pro-loudspeakers/itc-ts-108ht', why: 'Weatherproof, long throw' },
      { role: 'Amplifier', model: 'itc TC-D4350 DSP', href: P + '/amplifiers/itc-tc-d4200', why: 'Zone EQ and delay alignment' },
      { role: 'Lectern mic', model: 'itc TS-548MD', href: P + '/microphones/itc-ts-548md', why: 'Clear speech pickup' },
      { role: 'Choir / chant mic', model: 'itc TS-316M', href: P + '/microphones/itc-ts-316m', why: 'Natural group pickup' },
    ],
    faq: [
      { q: 'Our temple echoes badly — do we need acoustic panels?', a: 'Not usually. Column speakers aimed at the listeners plus delay alignment solve most of the problem without changing the building.' },
      { q: 'Can the system stream ceremonies online?', a: 'Yes — the mixer sends a clean audio feed to a streaming encoder or camera.' },
      { q: 'Can it be used for outdoor festivals and jatras?', a: 'Yes, by adding weatherproof speakers in the courtyard on their own zone and delay.' },
    ],
  },
  {
    slug: 'school-college-auditorium-sound-on-a-budget', venue: 'School & College Auditorium', diagramKey: '',
    title: 'School & College Auditorium Sound on a Budget',
    description: 'A sensible, expandable sound system for assemblies, convocations, cultural programmes and seminars — what to buy first and what can wait.',
    hero: '/images/heroes/education-hero.webp', date: '2026-11-05', readMins: 6,
    keywords: ['school auditorium sound system Nepal', 'college hall PA system', 'convocation sound system'],
    intro: ['School and college halls serve assemblies in the morning, seminars in the afternoon and cultural programmes in the evening — usually operated by a teacher or student. The system must be robust, simple and affordable, and it should grow as the budget allows.'],
    sections: [
      { h: 'Phase 1: speech that works every day', list: [
        'Two good full-range speakers ([itc KS-10H](' + P + '/pro-loudspeakers/itc-ks-10h)) or columns on stands or brackets either side of the stage.',
        'A 2-channel amplifier ([itc TC-2500B](' + P + '/amplifiers/itc-tc-2500b)).',
        'A mixer with DSP effects ([itc TS-12PFX](' + P + '/mixing-consoles/itc-ts-12pfx)).',
        'Two wireless handhelds ([itc T-592UL](' + P + '/microphones/itc-t-592ul)) and one lectern mic.',
      ] },
      { h: 'Phase 2: cultural programmes', list: [
        'One subwoofer ([itc TS-618S](' + P + '/subwoofers/itc-ts-618s)) for music and dance.',
        'Two stage monitors ([itc KS-14F](' + P + '/pro-loudspeakers/itc-ks-14f)) for singers.',
        'Two or four more wireless microphones.',
      ] },
      { h: 'Phase 3: larger halls and recording', list: [
        'Delay speakers for long halls, or a compact line array ([itc KS-210](' + P + '/line-array-speakers/itc-ks-210)) for 500+ seats.',
        'A digital mixer ([itc TS-24PD-12](' + P + '/mixing-consoles/itc-ts-24pd-12)) with recording for events and convocations.',
      ] },
      { h: 'Make it student-proof', p: ['Lock the amplifier rack, label every input, set limiters, and store a "default" scene the teacher can recall when settings go wrong. A short handover training is worth more than any upgrade.'] },
    ],
    kit: [
      { role: 'Main speakers', model: 'itc KS-10H', href: P + '/pro-loudspeakers/itc-ks-10h', why: 'Robust full-range mains' },
      { role: 'Amplifier', model: 'itc TC-2500B', href: P + '/amplifiers/itc-tc-2500b', why: 'Efficient, protected' },
      { role: 'Mixer', model: 'itc TS-12PFX', href: P + '/mixing-consoles/itc-ts-12pfx', why: 'Simple, with effects' },
      { role: 'Wireless', model: 'itc T-592UL', href: P + '/microphones/itc-t-592ul', why: 'Reliable handhelds' },
      { role: 'Later: subwoofer', model: 'itc TS-618S', href: P + '/subwoofers/itc-ts-618s', why: 'Music and dance' },
    ],
    faq: [
      { q: 'Can we start small and expand later?', a: 'Yes — choose a mixer and amplifier with spare channels so subwoofers, monitors and more microphones can be added without replacing anything.' },
      { q: 'Who will operate it?', a: 'We design for teachers and students: presets, labelled inputs and a locked rack, plus training at handover.' },
    ],
  },
  {
    slug: 'line-array-vs-point-source-speakers', venue: 'Line Array vs Point Source', diagramKey: '',
    title: 'Line Array vs Point-Source Speakers — Which One for My Hall?',
    description: 'A plain-language comparison: how each works, when a line array is worth the cost, and when a pair of good boxes is the smarter choice.',
    hero: '/images/heroes/corporate-hero.webp', date: '2026-11-05', readMins: 6,
    keywords: ['line array vs point source', 'line array speaker Nepal', 'which speaker for hall'],
    intro: ['"Should we buy a line array?" is one of the most common questions we hear. The honest answer depends on the room length, the audience and the budget — not on what looks impressive on stage.'],
    sections: [
      { h: 'How a point-source speaker behaves', p: ['A single box ([itc KS-10H](' + P + '/pro-loudspeakers/itc-ks-10h), [KF-D15H](' + P + '/pro-loudspeakers/itc-kf-d15h)) radiates from one spot. Its level falls about 6 dB every time the distance doubles, so the front row hears it far louder than the back. In short rooms that difference is acceptable; in long rooms it is not.'] },
      { h: 'How a line array behaves', p: ['A line array ([itc KS-210](' + P + '/line-array-speakers/itc-ks-210), [LA-2800K](' + P + '/line-array-speakers/itc-la-2800k)) stacks identical boxes in a curved column. Over its working range it behaves like a long source whose level falls more slowly with distance, and its vertical coverage can be shaped by the splay angles to fit the seating. The result is a more even level front-to-back and less energy wasted on the ceiling.'] },
      { h: 'Rules of thumb', list: [
        'Rooms under about 20–25 m deep: point-source speakers are usually the better value.',
        '25–50 m, or balconies: a compact line array (4–8 boxes per side) gives clearly better coverage.',
        'Outdoor events and stadiums: line arrays plus delay towers or distributed fills.',
        'Low ceilings: point-source or distributed speakers — there is no room to hang an array properly.',
      ] },
      { h: 'Do not forget the rest of the system', p: ['Either choice needs correct amplification, subwoofers sized to the music, processing for EQ and delay, and a good mixer. A well-tuned pair of boxes beats a badly-tuned array every time.'] },
    ],
    kit: [
      { role: 'Point source', model: 'itc KS-10H', href: P + '/pro-loudspeakers/itc-ks-10h', why: 'Short and medium rooms' },
      { role: 'Compact array', model: 'itc KS-210', href: P + '/line-array-speakers/itc-ks-210', why: 'Halls 25–50 m' },
      { role: 'Large array', model: 'itc LA-2800K', href: P + '/line-array-speakers/itc-la-2800k', why: 'Outdoor and stadium' },
      { role: 'All line arrays', model: 'Browse the range', href: P + '/line-array-speakers', why: '17 itc models' },
    ],
    faq: [
      { q: 'Is a line array always louder?', a: 'Not louder — more even. It delivers similar level to the front and back rows, which lets the overall level stay lower and clearer.' },
      { q: 'Can we start with point-source and move to an array later?', a: 'Yes; the amplifiers, mixer and subwoofers can usually be reused when the mains are upgraded.' },
    ],
  },
  {
    slug: 'how-to-size-a-power-amplifier', venue: 'Amplifier Sizing', diagramKey: '',
    title: 'How to Size a Power Amplifier — Watts, Ohms and Headroom',
    description: 'Match amplifiers to loudspeakers correctly: impedance, parallel loads, bridging, headroom and why "too small" damages more speakers than "too big".',
    hero: '/images/heroes/government-hero.webp', date: '2026-11-05', readMins: 6,
    keywords: ['how to choose power amplifier', 'amplifier speaker matching', 'professional amplifier Nepal'],
    intro: ['Amplifier mistakes are the most common cause of blown speakers and poor sound we see on site. The good news is that the arithmetic is simple once three ideas are clear: impedance, power rating and headroom.'],
    sections: [
      { h: '1. Impedance: what the amplifier sees', p: ['Each loudspeaker has a nominal impedance (8 Ω, 4 Ω…). Connecting two 8 Ω speakers in parallel on one channel gives 4 Ω; four gives 2 Ω. An amplifier rated for 2 Ω, such as the [itc TC-21000](' + P + '/amplifiers/itc-tc-21000) (2 × 2,900 W continuous at 2 Ω), can drive four 8 Ω cabinets per channel — but never go below the rated minimum.'] },
      { h: '2. Power: match the speaker rating', p: ['Aim for an amplifier that delivers roughly 1.5–2 × the speaker\'s rated (continuous) power at the load you will connect. A 700 W speaker is comfortable on about 1,000–1,400 W. This sounds backwards, but an under-powered amplifier driven into clipping sends harsh distortion that burns tweeters far faster than clean power does.'] },
      { h: '3. Headroom and limiting', p: ['Music peaks are many times louder than the average. Headroom lets the amplifier pass those peaks cleanly; a limiter in the processor or DSP amplifier ([itc TC-D4350](' + P + '/amplifiers/itc-tc-d4200)) then sets a safe maximum so the extra power can never exceed what the speaker can take.'] },
      { h: 'Bridging and 100 V lines', list: [
        'Bridge mode combines two channels into one for very large loads — check the bridge rating (for example 5,800 W at 4 Ω on the TC-21000).',
        '100 V-line distributed speakers (ceilings, corridors) need a 100 V amplifier or mixer-amplifier — see our [ceiling speaker guide](/blog/choosing-ceiling-speaker-commercial-installation).',
      ] },
      { h: 'Quick worked example', p: ['Banquet hall with 4 × KS-210 per side (LF 700 W / 8 Ω each): two boxes per channel = 4 Ω, about 1,400 W needed per channel → one TC-21000 channel per pair (1,700 W at 4 Ω). Two amplifiers cover both sides with headroom.'] },
    ],
    kit: [
      { role: 'High power', model: 'itc TC-21000', href: P + '/amplifiers/itc-tc-21000', why: '2 × 1,000 W @ 8 Ω, 2 Ω stable' },
      { role: 'Very high power', model: 'itc TC-23000', href: P + '/amplifiers/itc-tc-23000', why: 'For subwoofers and large arrays' },
      { role: '4-channel DSP', model: 'itc TC-D4350', href: P + '/amplifiers/itc-tc-d4200', why: 'EQ, delay and limiters built in' },
      { role: 'Network (Dante)', model: 'itc TC-4500DT', href: P + '/amplifiers/itc-tc-4500dt', why: 'Audio over the network' },
    ],
    faq: [
      { q: 'Is a bigger amplifier dangerous for small speakers?', a: 'Not if a limiter is set correctly. Clipping from an undersized amplifier is a bigger risk.' },
      { q: 'How many speakers can one channel drive?', a: 'Until the combined impedance reaches the amplifier\'s minimum rated load — for 8 Ω speakers on a 2 Ω-stable amplifier, four per channel.' },
    ],
  },
  {
    slug: 'wireless-microphone-frequency-planning', venue: 'Wireless Microphones', diagramKey: '',
    title: 'Wireless Microphone Frequency Planning for Events & Venues',
    description: 'Why wireless mics drop out, how many channels can work together, and the antenna, battery and frequency habits that keep a show clean.',
    hero: '/images/heroes/hotels-hero.webp', date: '2026-11-05', readMins: 5,
    keywords: ['wireless microphone dropout', 'UHF wireless microphone Nepal', 'wireless mic frequency plan'],
    intro: ['Wireless microphones fail in predictable ways: interference, weak signal, bad batteries and too many channels on poorly chosen frequencies. Each has a simple fix.'],
    sections: [
      { h: 'Plan the frequencies before the event', p: ['Every receiver must sit on its own frequency, chosen so that combinations of transmitters do not create interference products on another channel. Use the automatic scan on UHF systems such as the [itc T-592UW](' + P + '/microphones/itc-t-592uw), assign frequencies in one sitting, and write them on the receiver and the microphone.'] },
      { h: 'Antennas matter more than power', list: [
        'Keep receivers out of metal racks or use remote antennas ([itc T-522B](' + P + '/audio-peripherals/itc-t-522b) / [T-522S](' + P + '/audio-peripherals/itc-t-522s)).',
        'Above four channels, share two antennas through a splitter ([itc T-523A](' + P + '/audio-peripherals/itc-t-523a)).',
        'Keep line of sight between the stage and the antennas.',
      ] },
      { h: 'Battery discipline', p: ['Start every event on fresh or fully-charged batteries and keep a charger ([itc T-521CF](' + P + '/audio-peripherals/itc-t-521cf)) at the mixing desk. Most "dropouts" are flat batteries.'] },
      { h: 'Phones and LED screens', p: ['A full hall of phones and nearby LED walls raise the noise floor. Scan with the room full if possible, and keep receivers away from LED processors and power supplies.'] },
    ],
    kit: [
      { role: 'Wireless system', model: 'itc T-592UW', href: P + '/microphones/itc-t-592uw', why: 'UHF with auto scan' },
      { role: 'Antenna splitter', model: 'itc T-523A', href: P + '/audio-peripherals/itc-t-523a', why: 'Share antennas across receivers' },
      { role: 'Remote antenna', model: 'itc T-522B', href: P + '/audio-peripherals/itc-t-522b', why: 'Better range and line of sight' },
      { role: 'Charger', model: 'itc T-521CF', href: P + '/audio-peripherals/itc-t-521cf', why: 'Battery routine' },
    ],
    faq: [
      { q: 'How many wireless mics can run at once?', a: 'With planned frequencies and shared antennas, 8–16 channels are routine in a venue; more needs careful coordination.' },
      { q: 'Why does the mic cut out at the back of the hall?', a: 'Usually antenna placement — move antennas out of the rack and into line of sight of the stage.' },
    ],
  },
  {
    slug: 'microphone-feedback-how-to-stop-it', venue: 'Feedback', diagramKey: '',
    title: 'Microphone Feedback: Why It Happens and How to Stop It',
    description: 'The howl explained — speaker placement, microphone choice, gain structure, EQ and feedback suppressors, in the order that actually works.',
    hero: '/images/heroes/smart-meeting-rooms-hero.webp', date: '2026-11-05', readMins: 5,
    keywords: ['microphone feedback howling fix', 'stop speaker feedback', 'feedback suppressor'],
    intro: ['Feedback is a loop: the microphone hears the loudspeaker, the loudspeaker plays it louder, and the sound grows until it howls. Fixes work best in a specific order.'],
    sections: [
      { h: '1. Put the speakers in front of the microphones', p: ['Main speakers should be ahead of the stage line and aimed at the audience, never behind or beside the presenter. This single change fixes most halls.'] },
      { h: '2. Use the right microphone, close to the mouth', p: ['Directional (cardioid or hypercardioid) microphones such as the [itc TS-331](' + P + '/microphones/itc-ts-331) reject sound from behind. A microphone 5 cm from the mouth needs far less gain than one at 30 cm — less gain, less feedback.'] },
      { h: '3. Set the gain structure, then EQ', p: ['Set input gain for the loudest speaker, keep the master at a sensible level, and only then use EQ to notch the few frequencies that ring in the room.'] },
      { h: '4. Add a feedback suppressor', p: ['A dedicated suppressor ([itc TS-224D / TS-224DX](' + P + '/audio-peripherals/itc-ts-224dx)) automatically places narrow filters on ringing frequencies — ideal for halls operated by non-engineers. It is the last step, not the first.'] },
      { h: '5. Fewer open microphones', p: ['Every open microphone adds to the loop. Mute mics that are not in use, or use an automatic mixer.'] },
    ],
    kit: [
      { role: 'Feedback suppressor', model: 'itc TS-224DX', href: P + '/audio-peripherals/itc-ts-224dx', why: 'Automatic notch filters' },
      { role: 'Directional mic', model: 'itc TS-331', href: P + '/microphones/itc-ts-331', why: 'Hypercardioid rejection' },
      { role: 'Processor', model: 'itc TS-3400MIX', href: P + '/audio-peripherals/itc-ts-3400mix', why: 'EQ and system control' },
    ],
    faq: [{ q: 'Will a feedback suppressor alone fix our hall?', a: 'It helps, but speaker placement and microphone technique matter more. Use it as the final layer.' }],
  },
  {
    slug: 'laser-projector-buying-guide-nepal', venue: 'Laser Projectors', diagramKey: '',
    title: 'Laser Projector Buying Guide for Nepal — Lumens, Throw & Screens',
    description: 'How many lumens you need, how far the projector sits from the screen, 4K vs WUXGA, and why laser has replaced lamp projectors.',
    hero: '/images/heroes/education-hero.webp', date: '2026-11-05', readMins: 6,
    keywords: ['laser projector Nepal', 'projector for auditorium', 'how many lumens projector'],
    intro: ['Projectors remain the most economical way to show a very large image — in lecture halls, auditoriums, ballrooms, museums and projection-mapping shows. Laser light sources have removed the old cost of lamps, so the decision now comes down to brightness, resolution and placement.'],
    sections: [
      { h: 'Lumens: match brightness to screen size and room light', list: [
        'Up to 3 m wide: 4,000–7,000 lumens in a normal room.',
        '3–5 m: 7,000–9,000 lumens, more if the room is bright ([Krinda C-WU700L](' + P + '/projectors/krinda-c-wu700l), [C-WU800L](' + P + '/projectors/krinda-c-wu800l)).',
        '5–8 m or bright halls: 12,000–15,000 lumens ([C-WU1200L](' + P + '/projectors/krinda-c-wu1200l), [C-WU1500L](' + P + '/projectors/krinda-c-wu1500l)).',
        'Outdoor and building mapping: 20,000–25,000 lumens or blended units ([Wincomn C-WU2500](' + P + '/projectors/wincomn-c-wu2500)).',
      ] },
      { h: 'Throw distance', p: ['Throw distance = throw ratio × image width. With a 1.5:1 lens, a 4 m image needs the projector 6 m away. Interchangeable lenses on installation projectors range from about 0.3:1 (ultra-short) to 8:1 (long throw), so placement is rarely the problem.'] },
      { h: '4K or WUXGA?', p: ['True 4K ([Wincomn C-4K650](' + P + '/projectors/wincomn-c-4k650)) is worth it for spreadsheets, CAD, detailed images and immersive rooms viewed up close. For presentations and video in large halls, WUXGA (1920×1200) at higher brightness is often better value.'] },
      { h: 'Laser vs lamp', p: ['Laser projectors run 20,000–30,000 hours with no lamp changes and stable brightness, and can be mounted at any angle. Over five years they usually cost less than lamp models once lamps and downtime are counted.'] },
    ],
    kit: [
      { role: 'Classroom / hall', model: 'Krinda C-WU700L', href: P + '/projectors/krinda-c-wu700l', why: '7,000 lm WUXGA, quiet' },
      { role: 'True 4K', model: 'Wincomn C-4K650', href: P + '/projectors/wincomn-c-4k650', why: '6,500 lm UHD with HDR' },
      { role: 'Auditorium', model: 'Krinda C-WU1500L', href: P + '/projectors/krinda-c-wu1500l', why: '15,000 lm, lens options' },
      { role: 'Mapping', model: 'Wincomn C-WU2500', href: P + '/projectors/wincomn-c-wu2500', why: '25,000 lm dual laser' },
      { role: 'All projectors', model: 'Browse 11 models', href: P + '/projectors', why: 'By segment' },
    ],
    faq: [
      { q: 'Projector or LED wall?', a: 'For very large images in rooms that can be dimmed, a projector is far cheaper per square metre. For bright lobbies and 24/7 signage, LED wins.' },
      { q: 'Do laser projectors need maintenance?', a: 'Very little — occasional dust cleaning. There are no lamps to replace.' },
    ],
  },
  {
    slug: 'lcd-vs-led-video-wall-control-room', venue: 'LCD vs LED Video Walls', diagramKey: '',
    title: 'LCD vs LED Video Wall for Control Rooms & Lobbies',
    description: 'Seams, viewing distance, brightness, lifetime and cost — choosing between narrow-bezel LCD walls and fine-pitch LED, plus what controller you need.',
    hero: '/images/heroes/government-hero.webp', date: '2026-11-05', readMins: 5,
    keywords: ['LCD video wall Nepal', 'LED vs LCD video wall', 'video wall controller Nepal'],
    intro: ['Both technologies build a large image from tiles. The right one depends on how close people sit, whether seams matter, and what the wall must show all day.'],
    sections: [
      { h: 'Narrow-bezel LCD walls', p: ['LCD panels ([Triolion 55" B-series](' + P + '/video-walls/triolion-trd1055b)) give full-HD per tile at a lower cost, with bezels down to 0.88 mm. They suit control rooms showing dashboards and CCTV where each tile often carries its own source, and where viewers sit 2–5 m away.'] },
      { h: 'Fine-pitch LED', p: ['[LED walls](' + P + '/led-displays) are seamless, brighter and can be built to any size, which makes them ideal for lobbies, boardrooms and stages. They cost more per square metre at fine pitch, but there are no seams at any distance.'] },
      { h: 'The controller is the brain', p: ['Either wall needs a processor to place sources, windows and layouts. A hardware controller such as the [Triolion TMC6000-G2](' + P + '/video-walls/triolion-tmc6000-g2) takes 4K/8K inputs, decodes IP cameras and drives LCD or LED walls from the same chassis — important for 24/7 rooms.'] },
      { h: 'Quick decision', list: ['Control room, many separate feeds, budget-sensitive → LCD wall + hardware controller.', 'Lobby, brand content, boardroom, stage → LED.', 'Viewing closer than 1.5 m → fine-pitch LED or COB.'] },
    ],
    kit: [
      { role: 'LCD wall panel', model: 'Triolion TRD1055B 55"', href: P + '/video-walls/triolion-trd1055b', why: 'Bezel options to 0.88 mm' },
      { role: 'Controller', model: 'Triolion TMC6000-G2', href: P + '/video-walls/triolion-tmc6000-g2', why: 'FPGA, 8K/4K, IP decoding' },
      { role: 'LED walls', model: 'Lampro LED range', href: P + '/led-displays', why: 'Seamless, any size' },
    ],
    faq: [{ q: 'Will the LCD seams be distracting?', a: 'At 0.88–1.7 mm bezels and normal viewing distances, seams are minor for dashboards and CCTV; for a single full-screen image, LED is better.' }],
  },
]

export const TOPIC_GUIDES: SoundGuide[] = [...TOPIC_GUIDES_2.slice(0, 1), ...TOPIC_GUIDES_1, ...TOPIC_GUIDES_2.slice(1)]
