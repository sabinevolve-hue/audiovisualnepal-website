// Topic guides — batch 3: simultaneous interpretation and conference-room AV.
// Every product linked here is a real page in ALL_PRODUCTS (src/data/products.ts). No prices are
// published in the catalogue, so these guides say "quote on request" instead of quoting figures.
import type { SoundGuide } from './soundGuides'

const C = '/products/conference-systems'
const VC = '/products/video-conferencing'
const CAM = '/products/conference-cameras'
const AUD = '/products/conference-audio'
const P = '/products'

export const TOPIC_GUIDES_3: SoundGuide[] = [
  {
    slug: 'simultaneous-interpretation-system-nepal', venue: 'Simultaneous Interpretation', diagramKey: '',
    title: 'Simultaneous Interpretation System in Nepal: Equipment, Setup and Costs',
    description: 'What a simultaneous interpretation system needs — booths, interpreter consoles, an infrared transmitter, radiators and delegate receivers — how to size it, rental vs purchase, and who supplies it in Nepal.',
    hero: '/images/heroes/government-hero.webp', heroAlt: 'Government conference hall prepared for a multilingual meeting',
    date: '2026-11-04', readMins: 9,
    keywords: ['simultaneous interpretation system Nepal', 'interpretation equipment Kathmandu', 'infrared interpretation system', 'interpreter booth ISO 4043', 'ISO 20109 interpretation equipment', 'conference translation system Nepal'],
    cta: { label: 'Browse interpretation equipment', href: C, topic: 'Simultaneous interpretation system' },
    intro: [
      'In Nepal, AudioVisual Nepal (Audio Visual Solutions Pvt. Ltd.) supplies and installs complete simultaneous interpretation systems. You need a soundproof booth per language, an interpreter console for each interpreter, an infrared transmitter and radiators that carry each language on its own channel, and a receiver with earphones for every listener.',
      'The interpreters themselves come from interpretation agencies or freelance teams; this guide covers the equipment side — what each part does, how to size a system for your languages, delegates and room, and when renting or buying makes sense. Every system is configured to the event, so pricing is quote on request.',
    ],
    sections: [
      { h: 'What a simultaneous interpretation system is', p: [
        'The speaker talks into a conference microphone. That "floor" audio goes to the interpreters\' headphones in their booths; they interpret in real time into their own microphones, and each language is sent out on a separate channel. Delegates pick a channel on a pocket receiver — channel 0 is the original floor language, channels 1, 2, 3… carry the interpretations.',
      ], list: [
        'Booths — one per target language, with two interpreters taking turns.',
        'Interpreter consoles and headsets — the interpreter\'s microphone, headphone feed, channel and relay controls ([itc TS-0370HY](' + C + '/itc-ts-0370hy)).',
        'Transmitter and radiators — put every language "in the air" across the room ([itc TS-0370H-8](' + C + '/itc-ts-0370h-8) / [TS-0370H-16](' + C + '/itc-ts-0370h-16) with [TS-0370HS](' + C + '/itc-ts-0370hs) radiators).',
        'Receivers and earphones — one per listener, with a charging case ([itc TS-0370HD](' + C + '/itc-ts-0370hd), [TS-0370HC](' + C + '/itc-ts-0370hc)).',
        'Conference microphones — a clean floor feed; interpreters can only interpret what they hear clearly.',
      ] },
      { h: 'Interpreter booths: ISO 4043 and ISO 20109 basics', p: [
        'Booths isolate the interpreters from the room and the room from the interpreters. ISO 4043 covers mobile (transportable) booths — the kind set up at the back of a hotel ballroom — and ISO 2603 covers permanent booths built into a hall. Both were revised in 2024 as ISO 17651-2 and ISO 17651-1; many terms of reference still cite the older numbers, so check which edition your tender names.',
        'In practice the standards ask for the same things: enough room for two interpreters side by side (a mobile booth for two is roughly 1.6 m wide, 1.6 m deep and 2 m high inside), good sound insulation, quiet ventilation, a wide front window with a direct view of the speakers and the screen, and booths placed at the back or side of the room on a slightly raised level.',
        'ISO 20109 sets the requirements for the equipment itself — interpreter consoles, headphones and the distribution chain: individual volume and tone controls, a microphone-on indicator, a cough (mute) key, the ability to listen to another booth (relay), and protection against sudden loud sounds. Booths are not part of our catalogue — they are built on site or hired — but we design the electronics around them and advise on where they go.',
      ] },
      { h: 'Interpreter consoles and headsets', p: [
        'Plan one console per interpreter seat. The [itc TS-0370HY](' + C + '/itc-ts-0370hy) interpreter unit has a 7-inch touch screen, a plug-in cardioid boom microphone with a red speaking indicator, a built-in speaker, a headphone jack and 5-band EQ. It connects over shielded Cat5e with uncompressed 48 kHz audio and under 5 ms delay, so interpretation stays in step with the speaker.',
        'The [itc TS-0370HYW](' + C + '/itc-ts-0370hyw) translation station adds head-mounted microphone support and language presets that can be edited from a PC. Pair either with the [itc TS-930](' + C + '/itc-ts-930) headset — separate listen and speak plugs, a rotatable boom microphone and a folding frame.',
      ] },
      { h: 'Distribution: infrared vs RF vs digital wireless', list: [
        'Infrared (IR) — what we supply. Light-based, so the signal stays inside the room: important for confidential government and donor meetings, and no radio frequency is needed. The itc [TS-0370H-8](' + C + '/itc-ts-0370h-8) (8 channels) and [TS-0370H-16](' + C + '/itc-ts-0370h-16) (16 channels) are digital DQPSK transmitters to IEC 61603-7, working in the 2–6 MHz band, which avoids interference from modern LED and fluorescent lighting. Receivers need a line of sight to a radiator.',
        'RF (FM/UHF "tour-guide" systems) — radio passes through walls and works outdoors and on site visits, but it can be picked up outside the room, offers fewer channels and frequencies must be coordinated. We do not currently list RF interpretation kits; ask if your event needs one.',
        'Digital wireless / app-based — languages streamed over Wi-Fi to an app or dedicated receivers. Convenient for bring-your-own-device events, but only as reliable as the venue network. Not in our current range.',
      ] },
      { h: 'Connecting the conference microphones', p: [
        'The floor feed comes from the conference system. itc digital controllers such as the [TS-0400M](' + C + '/itc-ts-0400m) support 63+1 interpretation channels, and delegate units such as the [TS-0318C](' + C + '/itc-ts-0318c) let a seated delegate choose the language at their own unit — channel 0 for the floor, 1–63 for the interpreters. IR receivers then serve the observers, press and gallery who have no unit.',
        'The 8/16 line outputs on the IR transmitter can feed a recorder, so you keep the floor and every language for the minutes. For how chairman/delegate units, voting and camera tracking fit together, see our [conference system guide](/guides/parliament-council-chamber-conference-system).',
      ] },
      { h: 'How to size a system: languages × delegates × room', list: [
        'Channels = interpreted languages + 1 for the floor. The 8-channel transmitter covers up to 7 languages plus floor; choose 16 channels for larger multilingual events or headroom.',
        'Booths = one per target language. Interpreters = usually two per booth, three for long technical days. Consoles = one per interpreter.',
        'Receivers = number of listeners + about 10% spare, each with earphones (single-use covers or one set per delegate).',
        'Charging = one [TS-0370HC](' + C + '/itc-ts-0370hc) case per 30 receivers; a full charge takes about 3 hours, so charge overnight before each event day.',
        'Radiators = enough that every seat sees one directly. Each [TS-0370HS](' + C + '/itc-ts-0370hs) radiates at 135° with a range of up to 25 m; a small boardroom may need one, a ballroom two or more. We confirm positions on a site survey.',
        'Room = clear lines of sight, curtains on sunlit glass (strong sunlight reduces IR range), cable routes to the booths, and a table for receiver hand-out at registration.',
      ] },
      { h: 'Worked sizing examples', p: ['Indicative only — final quantities depend on the room survey and the interpretation agency\'s team plan.'], table: {
        head: ['Event', 'Languages', 'Listeners', 'Booths / interpreters', 'Transmitter', 'Radiators', 'Receivers / chargers'],
        rows: [
          ['Bilateral meeting in a ministry boardroom', 'Nepali + English', '40', '1 booth / 2', 'TS-0370H-8', '1–2', '44 / 2'],
          ['Regional conference in a hotel ballroom', '4', '300', '3 booths / 6', 'TS-0370H-8', '2–4', '330 / 11'],
          ['International summit hall', '6+', '600', '5+ booths / 10–15', 'TS-0370H-16', '4+ (survey)', '660 / 22'],
        ] } },
      { h: 'Rental vs purchase', list: [
        'Buy when interpretation is recurring — ministries, provincial and municipal assembly halls, convention centres, universities and hotels that host international events every month. Cabling, consoles and radiators are installed once, staff are trained, and every later event costs only the interpreters.',
        'For a single event, the main costs are the equipment for the days, technicians on site, booth transport and receiver hand-out and collection (lost receivers are a real cost). Tell us your dates and we will advise on the most sensible option.',
        'Either way, the cost depends on languages, listeners, room size and event days, so systems are quote on request — share those four numbers and we return an itemised quotation.',
      ] },
      { h: 'What hotels, UN agencies and government events in Kathmandu typically need', list: [
        'Hotel ballrooms (INGO workshops, regional conferences) — 2–4 languages, 100–500 listeners, mobile booths at the back, radiators on stands, receivers issued at registration.',
        'UN agencies and development partners — terms of reference often cite ISO booth and equipment standards, need confidentiality (IR suits this) and a recording of the floor and each language.',
        'Ministries and bilateral meetings — Nepali⇄English is the most common pair; boardrooms with conference units can select the language at each seat, so receivers are only needed for observers.',
        'Assembly and council halls — permanent installation integrated with the [conference system](' + C + '), with interpretation that can be switched on only for sessions that need it.',
        'Power — put the transmitter, conference controller and interpreter consoles on an online UPS. A generator change-over that lasts a second drops every language mid-sentence; receivers run on their own batteries.',
      ] },
    ],
    kit: [
      { role: 'IR transmitter, 8 ch', model: 'itc TS-0370H-8', href: C + '/itc-ts-0370h-8', why: 'Up to 7 languages + floor, IEC 61603-7' },
      { role: 'IR transmitter, 16 ch', model: 'itc TS-0370H-16', href: C + '/itc-ts-0370h-16', why: 'Large multilingual events' },
      { role: 'IR radiator', model: 'itc TS-0370HS', href: C + '/itc-ts-0370hs', why: '135° coverage, up to 25 m, cascadable' },
      { role: 'Interpreter unit', model: 'itc TS-0370HY', href: C + '/itc-ts-0370hy', why: '7" touch screen, boom mic, 5-band EQ' },
      { role: 'Translation station', model: 'itc TS-0370HYW', href: C + '/itc-ts-0370hyw', why: 'Headset or boom mic, PC language presets' },
      { role: 'Interpreter headset', model: 'itc TS-930', href: C + '/itc-ts-930', why: 'Separate listen / speak plugs' },
      { role: 'Delegate receiver', model: 'itc TS-0370HD', href: C + '/itc-ts-0370hd', why: '16 channels, LCD, removable battery' },
      { role: 'Charging case', model: 'itc TS-0370HC', href: C + '/itc-ts-0370hc', why: 'Charges and stores 30 receivers' },
      { role: 'Conference controller', model: 'itc TS-0400M', href: C + '/itc-ts-0400m', why: '63+1 interpretation channels' },
      { role: 'Delegate unit', model: 'itc TS-0318C', href: C + '/itc-ts-0318c', why: 'Language selection at the seat' },
    ],
    faq: [
      { q: 'Who supplies simultaneous interpretation equipment in Nepal?', a: 'AudioVisual Nepal (Audio Visual Solutions Pvt. Ltd.) designs, supplies and installs infrared simultaneous interpretation systems from the itc range — transmitters, radiators, interpreter consoles, receivers and conference microphones. Interpreters are engaged separately through an interpretation agency.' },
      { q: 'How much does a simultaneous interpretation system cost in Nepal?', a: 'It depends on the number of languages, listeners, room size and event days, and on whether you buy or need equipment for a single event. Pricing is quote on request — send those details and we return an itemised quotation.' },
      { q: 'How many interpreters and booths do we need per language?', a: 'One booth per target language with usually two interpreters who take turns; for long or highly technical days, agencies often assign three. Each interpreter needs their own console.' },
      { q: 'Infrared or RF — which is better?', a: 'Infrared keeps the signal inside the room, needs no radio frequency and carries many channels, so it suits confidential and permanent installations. RF passes through walls and suits outdoor events and site visits, but can be overheard outside the room. We supply infrared systems.' },
      { q: 'Can delegates listen on their own phones?', a: 'App-based systems exist, but they depend on the venue Wi-Fi and the delegates\' phones. Our systems use dedicated infrared receivers, which work without a network.' },
      { q: 'Can interpretation be added to our existing conference system?', a: 'Often yes. itc digital controllers such as the TS-0400M support 63+1 interpretation channels and units such as the TS-0318C select the language at the seat. Tell us the controller model you have and we will check compatibility.' },
      { q: 'How do the receivers stay charged?', a: 'Each receiver has a removable lithium battery. The TS-0370HC case charges 30 receivers at once and fully charges them in about 3 hours; we recommend charging overnight before each event day and keeping 10% spare receivers.' },
    ],
  },
  {
    slug: 'conference-room-video-conferencing-system-nepal', venue: 'Conference Room AV', diagramKey: '',
    title: 'Conference Room AV System Guide for Nepal Offices (Huddle to Boardroom)',
    description: 'Which camera, microphones, speakers, display and control to use in huddle rooms, meeting rooms, boardrooms and training halls — with real models supplied and installed in Nepal.',
    hero: '/images/heroes/smart-meeting-rooms-hero.webp', heroAlt: 'Meeting room with display and video conferencing equipment',
    date: '2026-11-04', readMins: 8,
    keywords: ['conference room system Nepal', 'video conferencing system Nepal', 'boardroom AV Kathmandu', 'meeting room video bar Nepal', 'Zoom Teams room setup Nepal'],
    cta: { label: 'Browse video conferencing', href: VC, topic: 'Conference room / video conferencing system' },
    intro: [
      'For most Nepal offices, a conference room system is a USB video bar, a display and wireless presentation for rooms up to about 30 m², and a separate PTZ camera, table or ceiling microphones, ceiling speakers and a matrix switcher for boardrooms and training halls. AudioVisual Nepal supplies, installs and supports every tier.',
      'The table below matches room size to equipment using products on this site; the sections after it explain the choices and the Nepal-specific details — power backup, internet, and how ministries, banks and hotels use their rooms. See also our [corporate AV solutions](/solutions/corporate) and the full [video conferencing range](' + VC + ').',
    ],
    sections: [
      { h: 'Room-size quick guide', p: ['Sizes are indicative; a site survey confirms microphone coverage and display size for your room.'], table: {
        head: ['Room', 'Seats / size', 'Camera', 'Microphones', 'Speakers', 'Display', 'Control & sharing'],
        rows: [
          ['Huddle room', '2–6 seats · up to ~15 m²', '[InfoBit iCam VB40](' + VC + '/infobit-icam-vb40) video bar, or [Tenveo CC600](' + CAM + '/tenveo-cc600) 360° camera', 'Built into the bar; [Tenveo M3B](' + AUD + '/tenveo-m3b) for laptop-only calls', 'Built into the bar', '55–65" flat panel', '[InfoBit iShare X200](' + P + '/wireless-presentation/infobit-ishare-x200) wireless presentation'],
          ['Meeting room', '6–12 seats · ~15–30 m²', '[InfoBit iCam VB50](' + VC + '/infobit-vb50) or [iCam VB60](' + VC + '/infobit-vb60)', 'VB60 + up to 4 expansion mics, or [InfoBit iSpeaker M250](' + AUD + '/infobit-ispeaker-m250)', 'Built into the bar', '65–86" panel or [Lampro LHP](' + P + '/led-displays/lampro-lhp) LED', '[iShare X200](' + P + '/wireless-presentation/infobit-ishare-x200)'],
          ['Boardroom', '12–24 seats · ~30–60 m²', '[InfoBit iCam VB80](' + VC + '/infobit-vb80) bar, or PTZ: [Tenveo UV620A](' + CAM + '/tenveo-uv620a) / [InfoBit iCam P30](' + CAM + '/infobit-icam-p30)', '[itc TS-0318C](' + C + '/itc-ts-0318c) units on a [TS-0400M](' + C + '/itc-ts-0400m) controller, or chained [iSpeaker M500](' + AUD + '/infobit-ispeaker-m500)', '[DSPPA DSP5211](' + P + '/ceiling-speakers/dsppa-dsp5211) ceiling speakers + [DSPPA DMA250U](' + P + '/amplifiers/dsppa-dma250u)', '[Lampro LMini](' + P + '/led-displays/lampro-lmini) COB LED or [Triolion TRD1055B](' + P + '/video-walls/triolion-trd1055b) LCD wall', '[InfoBit iMatrix HU44](' + P + '/av-switching/infobit-imatrix-hu44) + [iShare X400](' + P + '/wireless-presentation/infobit-ishare-x400)'],
          ['Training hall', '30–100+ seats', 'AI tracking PTZ: [InfoBit iCam PT40](' + CAM + '/infobit-icam-pt40) or [Tenveo NV20A AI](' + CAM + '/tenveo-nv20a-ai)', '[itc T-592UH](' + P + '/microphones/itc-t-592uh) wireless + podium mic', 'DSPPA DSP5211 ceiling zones + [DSPPA DMA6250U](' + P + '/amplifiers/dsppa-dma6250u)', 'Laser projector ([Wincomn C-4K650](' + P + '/projectors/wincomn-c-4k650), [Krinda C-WU700L](' + P + '/projectors/krinda-c-wu700l)) or LED', '[InfoBit iSwitch 265](' + P + '/av-switching/infobit-iswitch-265) + [Evolve Podium E1](' + P + '/smart-podiums/focus-st100)'],
        ] } },
      { h: 'Camera: video bar, 360° or PTZ', p: [
        'A video bar puts the camera, microphones and speaker in one USB device, which is why it suits most rooms up to about 30 m². The [iCam VB50](' + VC + '/infobit-vb50) adds AI auto-framing and HDMI output; the [VB60](' + VC + '/infobit-vb60) follows the active speaker and chains up to four expansion microphones. For round tables, a 360° camera such as the [Tenveo CC600](' + CAM + '/tenveo-cc600) shows everyone without repositioning.',
        'Long boardroom tables and training halls need optical zoom. A PTZ camera — [Tenveo UV620A](' + CAM + '/tenveo-uv620a) (4K, 20× zoom, AI tracking, NDI) or [InfoBit iCam P30](' + CAM + '/infobit-icam-p30) (4K, 12× zoom, 255 presets) — frames the far end of the table as well as the near end. For lecturers who walk, the dual-lens [iCam PT40](' + CAM + '/infobit-icam-pt40) tracks the presenter while a wide lens shows the room.',
      ] },
      { h: 'Microphones decide meeting quality', p: [
        'Remote participants judge a meeting by how well they hear the room. Every seat should be inside a microphone\'s pickup range: a video bar covers a meeting room; a boardroom needs chained speakerphones — up to five [iSpeaker M500](' + AUD + '/infobit-ispeaker-m500) units cover around 100 m² — or a conference microphone at each seat.',
        'Formal meetings in ministries, bank boards and councils usually need a [conference system](' + C + ') — chairman and delegate units such as the [itc TS-0318C](' + C + '/itc-ts-0318c), speaking order, and recording — whose output also feeds the video call. If you hold multilingual meetings, the same system can carry interpretation: see our [simultaneous interpretation guide](/guides/simultaneous-interpretation-system-nepal).',
      ] },
      { h: 'Speakers and display', p: [
        'Speakers built into a video bar are enough up to a meeting room. In boardrooms, ceiling speakers such as the [DSPPA DSP5211](' + P + '/ceiling-speakers/dsppa-dsp5211) spread the far-end voice evenly so people at the end of the table hear as clearly as those near the screen.',
        'Size the display for the farthest seat: as a rule of thumb, that seat should be no more than about four to six times the image height away. Above roughly 86", a fine-pitch LED wall or a laser projector usually beats tiling flat panels — compare them in our [LCD vs LED video wall guide](/guides/lcd-vs-led-video-wall-control-room) and [laser projector buying guide](/guides/laser-projector-buying-guide-nepal).',
      ] },
      { h: 'Control and content sharing', p: [
        'Guests should share a screen without cables or drivers. A wireless presentation system such as the [iShare X200](' + P + '/wireless-presentation/infobit-ishare-x200) (4K60, up to 16 users) or the four-source [iShare X400](' + P + '/wireless-presentation/infobit-ishare-x400) does this for laptops and phones.',
        'Boardrooms with several displays, a room PC and guest laptops need a matrix switcher: the [iMatrix HU44](' + P + '/av-switching/infobit-imatrix-hu44) routes HDMI and USB (camera, speakerphone) to the right endpoint, and the [iSwitch 265](' + P + '/av-switching/infobit-iswitch-265) adds USB-C with charging, Dante audio and seamless switching. Program the room so one button starts a meeting.',
      ] },
      { h: 'Nepal specifics: power, internet and how rooms are used', list: [
        'Power backup — put the video bar or room PC, network switch, matrix and display on an online UPS. A generator change-over drops the call and can reboot the display; 15–30 minutes of runtime covers most change-overs.',
        'Internet — connect the room by wired Ethernet, not Wi-Fi, and check upload speed, which video calls depend on. For important calls, a second ISP line gives a fallback.',
        'Platforms — most offices switch between Zoom, Microsoft Teams and Google Meet, so a USB "bring your own meeting" setup (laptop to bar) is the most flexible. Rooms in daily use can run Zoom Rooms or Teams Rooms on a room PC or on the Android-based [iCam VB80](' + VC + '/infobit-vb80).',
        'Ministries and government offices — chair control, recording and sometimes interpretation; plan conference units plus a PTZ camera rather than a video bar alone.',
        'Hotels — meeting rooms rented to different clients each day need simple, laptop-agnostic sharing and a clearly labelled wall plate; avoid anything that needs a password from the IT team.',
        'Acoustics — glass-walled rooms echo. Curtains or wall panels improve call quality more than adding microphones.',
      ] },
    ],
    kit: [
      { role: 'Huddle video bar', model: 'InfoBit iCam VB40', href: VC + '/infobit-icam-vb40', why: '4K camera, mic array, speaker — one USB cable' },
      { role: 'Meeting-room video bar', model: 'InfoBit iCam VB60', href: VC + '/infobit-vb60', why: 'Speaker tracking, 4 expansion mics' },
      { role: 'Boardroom video bar', model: 'InfoBit iCam VB80', href: VC + '/infobit-vb80', why: '8 m mic range, wireless BYOD, Android' },
      { role: 'PTZ camera', model: 'Tenveo UV620A', href: CAM + '/tenveo-uv620a', why: '4K60, 20× zoom, AI tracking, NDI' },
      { role: 'Speakerphone', model: 'InfoBit iSpeaker M500', href: AUD + '/infobit-ispeaker-m500', why: 'Beamforming, chain 5 units' },
      { role: 'Conference units', model: 'itc TS-0318C', href: C + '/itc-ts-0318c', why: 'Chair control, speaking order' },
      { role: 'Ceiling speaker', model: 'DSPPA DSP5211', href: P + '/ceiling-speakers/dsppa-dsp5211', why: 'Coaxial 6.5", even voice coverage' },
      { role: 'Wireless presentation', model: 'InfoBit iShare X200', href: P + '/wireless-presentation/infobit-ishare-x200', why: '4K60, 0.1 s latency' },
      { role: 'Matrix switcher', model: 'InfoBit iMatrix HU44', href: P + '/av-switching/infobit-imatrix-hu44', why: 'HDMI + USB routing' },
      { role: 'Group kit', model: 'Tenveo VA612EX', href: VC + '/tenveo-va612ex', why: 'PTZ camera + speakerphone in one box' },
    ],
    faq: [
      { q: 'What is the best video conferencing system for a small meeting room in Nepal?', a: 'For up to about 12 people, an all-in-one USB video bar such as the InfoBit iCam VB50 or VB60 — camera, microphones and speaker in one device — plus a display and a wireless presentation system.' },
      { q: 'Do these systems work with Zoom, Microsoft Teams and Google Meet?', a: 'Yes. The USB video bars, cameras and speakerphones on this site connect as a standard camera and audio device, so they work with Zoom, Teams, Google Meet and other major platforms on the connected computer.' },
      { q: 'How much does a conference room system cost in Nepal?', a: 'It depends on room size and tier — a huddle room with a video bar is the entry point, while boardrooms with conference units, ceiling audio and LED displays scale with the room. Pricing is quote on request, after a free site survey.' },
      { q: 'Video bar or separate camera and microphones?', a: 'A video bar is simpler and suits rooms up to about 30 m². Larger boardrooms and training halls need a PTZ camera with optical zoom and microphones closer to each seat.' },
      { q: 'Do we need a UPS for the meeting room?', a: 'Yes. Put the video bar or room PC, network switch, matrix and display on an online UPS so a generator change-over does not drop the call.' },
      { q: 'Do you install outside Kathmandu?', a: 'Yes — AudioVisual Nepal designs, supplies and installs conference room systems across Nepal, with training and after-sales support.' },
    ],
  },
]
