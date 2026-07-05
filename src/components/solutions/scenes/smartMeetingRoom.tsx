import type { SceneConfig } from "../InteractiveScene";

const AUDIO = "#14B8A6";
const VIDEO = "#8B5CF6";

const art = (
  <>
    <rect x={24} y={24} width={632} height={278} rx={4} fill="none" stroke="#94A3B8" strokeWidth={1} />
    <line x1={24} y1={44} x2={656} y2={44} stroke="#CBD5E1" strokeWidth={1} />
    <line x1={24} y1={272} x2={656} y2={272} stroke="#94A3B8" strokeWidth={1} />

    <g fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1}>
      <rect x={180} y={44} width={44} height={10} rx={2} />
      <rect x={460} y={44} width={44} height={10} rx={2} />
      <rect x={140} y={228} width={400} height={12} rx={2} />
      <rect x={160} y={240} width={10} height={32} />
      <rect x={510} y={240} width={10} height={32} />
      <rect x={580} y={164} width={62} height={108} rx={3} />
    </g>

    <g fill="#99F6E4" stroke="#0D9488" strokeWidth={1}>
      <rect x={586} y={172} width={50} height={14} rx={2} />
      <rect x={586} y={192} width={50} height={14} rx={2} />
      <rect x={586} y={212} width={50} height={14} rx={2} />
      <rect x={236} y={200} width={8} height={28} rx={2} />
      <circle cx={240} cy={196} r={5} />
      <rect x={436} y={200} width={8} height={28} rx={2} />
      <circle cx={440} cy={196} r={5} />
    </g>

    <g fill="#DDD6FE" stroke="#7C3AED" strokeWidth={1}>
      <rect x={270} y={82} width={140} height={72} rx={3} />
      <rect x={330} y={60} width={24} height={14} rx={3} />
      <circle cx={342} cy={67} r={4} />
    </g>

    <g fill="#64748B" fontSize={11} textAnchor="middle" fontFamily="inherit">
      <text x={202} y={72}>ceiling speakers</text>
      <text x={340} y={170}>4K display + PTZ camera</text>
      <text x={340} y={256}>gooseneck mics</text>
      <text x={611} y={288}>DSP + amp rack</text>
    </g>
  </>
);

export const smartMeetingRoomScene: SceneConfig = {
  viewBox: "0 0 680 330",
  ariaLabel:
    "Smart meeting room diagram showing ceiling speakers, display with PTZ camera, table microphones and equipment rack, with clickable product hotspots",
  art,
  hotspots: [
    {
      id: "spk",
      x: 202,
      y: 49,
      color: AUDIO,
      product: {
        name: "Ceiling speakers",
        brand: "DSPPA",
        desc: "Multi-zone in-ceiling speakers for speech and background music, fed from the DSP rack.",
        href: "/products/ceiling-speakers/dsppa-dsp5211",
      },
    },
    {
      id: "cam",
      x: 342,
      y: 67,
      color: VIDEO,
      product: {
        name: "AI-tracking PTZ camera",
        brand: "Tenveo",
        desc: "4K@60fps, 20× optical zoom, NDI. Automatically frames the active speaker.",
        href: "/products/conference-cameras/tenveo-nv20a-ai",
      },
    },
    {
      id: "disp",
      x: 340,
      y: 118,
      color: VIDEO,
      product: {
        name: "iShare X200 wireless presentation",
        brand: "InfoBit",
        desc: "4K60Hz, 0.1s latency, up to 16 users, dongle-free casting to the room display.",
        href: "/products/wireless-presentation/infobit-ishare-x200",
      },
    },
    {
      id: "mic",
      x: 240,
      y: 212,
      color: AUDIO,
      product: {
        name: "Conference gooseneck microphones",
        brand: "DSPPA",
        desc: "Discussion-system microphones routed into the DSP for echo-free hybrid meetings.",
        href: "/products/conference-audio",
      },
    },
    {
      id: "rack",
      x: 611,
      y: 199,
      color: AUDIO,
      product: {
        name: "DMA mixer amplifier + DSP",
        brand: "DSPPA",
        desc: "60W–650W amplification with USB, Bluetooth and multi-zone routing — the heart of the room.",
        href: "/products/amplifiers/dsppa-dma250u",
      },
    },
  ],
  flow: [
    { id: "a1", path: "M240,218 V292 H610 V228", color: AUDIO, label: "Audio: microphones → DSP + amplifier", dur: 1300 },
    { id: "a2", path: "M610,164 V58 H200 V50", color: AUDIO, label: "Audio: amplifier → ceiling speakers", dur: 1300 },
    { id: "v1", path: "M354,64 H610 V162", color: VIDEO, label: "Video: PTZ camera → switcher", dur: 1100 },
    { id: "v2", path: "M580,200 H412 V152", color: VIDEO, label: "Video: switcher → display", dur: 1100 },
  ],
};
