import type { SceneConfig } from "../InteractiveScene";
const A = "#14B8A6", V = "#8B5CF6";
const art = (
  <>
    <rect x={24} y={24} width={632} height={278} rx={4} fill="none" stroke="#94A3B8" strokeWidth={1} />
    <line x1={24} y1={44} x2={656} y2={44} stroke="#CBD5E1" strokeWidth={1} />
    <line x1={24} y1={272} x2={656} y2={272} stroke="#94A3B8" strokeWidth={1} />
    <rect x={70} y={85} width={130} height={55} rx={3} fill="#DDD6FE" stroke="#7C3AED" strokeWidth={1} />
    <g fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1}>
      <rect x={60} y={220} width={120} height={50} rx={3} />
      <rect x={250} y={230} width={70} height={42} rx={3} /><rect x={350} y={230} width={70} height={42} rx={3} /><rect x={450} y={230} width={70} height={42} rx={3} />
      <rect x={596} y={170} width={50} height={100} rx={3} />
    </g>
    <g fill="#99F6E4" stroke="#0D9488" strokeWidth={1}>
      <rect x={106} y={200} width={8} height={20} rx={2} /><circle cx={110} cy={196} r={5} />
      <rect x={240} y={44} width={40} height={10} rx={2} /><rect x={360} y={44} width={40} height={10} rx={2} /><rect x={480} y={44} width={40} height={10} rx={2} />
      <path d="M528,88 L554,82 L554,106 L528,100 Z" />
      <rect x={602} y={178} width={38} height={12} rx={2} /><rect x={602} y={196} width={38} height={12} rx={2} /><rect x={602} y={214} width={38} height={12} rx={2} />
    </g>
    <g fill="#64748B" fontSize={11} textAnchor="middle" fontFamily="inherit">
      <text x={135} y={162}>flight information display</text>
      <text x={120} y={290}>paging console</text>
      <text x={385} y={292}>check-in counters</text>
      <text x={380} y={72}>concourse IP speakers</text>
      <text x={541} y={126}>apron horn</text>
      <text x={621} y={288}>IP PA server rack</text>
    </g>
  </>
);
export const transportationScene: SceneConfig = {
  viewBox: "0 0 680 330",
  ariaLabel: "Airport concourse diagram: flight information display, paging console, check-in counters, concourse IP speakers, apron horn and IP PA server rack",
  art,
  hotspots: [
    { id: "fid", x: 135, y: 112, color: V, product: { name: "Lampro LED information displays", brand: "Lampro", desc: "Fine-pitch LED departure boards and passenger-information displays, fed by an InfoBit video-wall controller.", href: "/brands/lampro/catalog#fine-pitch-hd-indoor" } },
    { id: "con", x: 110, y: 194, color: A, product: { name: "MAG6806 IP network amplifier", brand: "DSPPA", desc: "Zone paging from the operations desk — gate calls, boarding and security announcements.", href: "/products/ip-network-audio/dsppa-mag6806" } },
    { id: "spk", x: 380, y: 49, color: A, product: { name: "DSP5211 coaxial ceiling speaker", brand: "DSPPA", desc: "High-intelligibility announcements over crowd noise along the concourse.", href: "/products/ceiling-speakers/dsppa-dsp5211" } },
    { id: "horn", x: 541, y: 94, color: A, product: { name: "DSP161HD hi-fi horn speaker", brand: "DSPPA", desc: "Weatherproof horns for aprons, parking and bus park platforms.", href: "/products/horn-speakers/dsppa-dsp161hd" } },
    { id: "rack", x: 621, y: 205, color: A, product: { name: "MAG6182II Pro IP network amplifier", brand: "DSPPA", desc: "Redundant IP PA backbone — hundreds of zones, scheduled and priority-based broadcast.", href: "/products/ip-network-audio/dsppa-mag6182ii-pro" } },
  ],
  flow: [
    { id: "a1", path: "M110,222 V296 H621 V272", color: A, label: "Paging: console → IP PA server", dur: 1300 },
    { id: "a2", path: "M621,170 V58 H240 V50", color: A, label: "Announcement: server → concourse speakers", dur: 1500 },
    { id: "a3", path: "M621,175 V94 H556", color: A, label: "Outdoor: server → apron horn speakers", dur: 1000 },
  ],
};
