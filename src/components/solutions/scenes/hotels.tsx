import type { SceneConfig } from "../InteractiveScene";
const A = "#14B8A6", V = "#8B5CF6";
const art = (
  <>
    <rect x={24} y={24} width={632} height={278} rx={4} fill="none" stroke="#94A3B8" strokeWidth={1} />
    <line x1={24} y1={44} x2={656} y2={44} stroke="#CBD5E1" strokeWidth={1} />
    <line x1={24} y1={272} x2={656} y2={272} stroke="#94A3B8" strokeWidth={1} />
    <rect x={44} y={230} width={160} height={14} fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1} />
    <rect x={84} y={90} width={90} height={54} rx={3} fill="#DDD6FE" stroke="#7C3AED" strokeWidth={1} />
    <g fill="#99F6E4" stroke="#0D9488" strokeWidth={1}>
      <rect x={48} y={150} width={14} height={70} rx={2} />
      <rect x={185} y={150} width={14} height={70} rx={2} />
      <rect x={340} y={44} width={44} height={10} rx={2} /><rect x={520} y={44} width={44} height={10} rx={2} />
      <rect x={602} y={172} width={38} height={12} rx={2} /><rect x={602} y={190} width={38} height={12} rx={2} /><rect x={602} y={208} width={38} height={12} rx={2} />
    </g>
    <g fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1}>
      <circle cx={300} cy={252} r={16} /><circle cx={420} cy={252} r={16} /><circle cx={540} cy={252} r={16} />
      <rect x={596} y={164} width={50} height={108} rx={3} />
    </g>
    <g fill="#64748B" fontSize={11} textAnchor="middle" fontFamily="inherit">
      <text x={124} y={264}>stage + columns</text>
      <text x={129} y={162}>event screen</text>
      <text x={420} y={292}>banquet tables</text>
      <text x={342} y={72}>BGM ceiling zones</text>
      <text x={621} y={288}>amp + zone rack</text>
    </g>
  </>
);
export const hotelsScene: SceneConfig = {
  viewBox: "0 0 680 330",
  ariaLabel: "Hotel ballroom diagram: stage with column speakers, event screen, banquet tables, ceiling background music zones and amplifier rack",
  art,
  hotspots: [
    { id: "col", x: 55, y: 180, color: A, product: { name: "DSP255II waterproof column speaker", brand: "DSPPA", desc: "Elegant column speakers for ballroom speech and live events — indoor or poolside.", href: "/products/column-speakers/dsppa-dsp255ii" } },
    { id: "scr", x: 129, y: 117, color: V, product: { name: "iShare X400 wireless presentation", brand: "InfoBit", desc: "Presenters cast to the event screen from any seat — up to 4 sources on screen at once.", href: "/products/wireless-presentation/infobit-ishare-x400" } },
    { id: "bgm", x: 342, y: 49, color: A, product: { name: "DSP6011 frameless ceiling speakers", brand: "DSPPA", desc: "Zone-controlled background music for lobby, restaurant, spa and corridors.", href: "/products/ceiling-speakers/dsppa-dsp6011" } },
    { id: "amp", x: 621, y: 199, color: A, product: { name: "DMA6250U integrated mixer amplifier", brand: "DSPPA", desc: "USB, Bluetooth and multi-zone routing — staff switch sources from one panel.", href: "/products/amplifiers/dsppa-dma6250u" } },
  ],
  flow: [
    { id: "a1", path: "M621,230 V298 H55 V225", color: A, label: "Event audio: amplifier → stage columns", dur: 1400 },
    { id: "a2", path: "M621,164 V58 H342 V50", color: A, label: "BGM: zone matrix → ceiling speakers", dur: 1200 },
    { id: "v1", path: "M300,245 H129 V147", color: V, label: "Video: wireless cast → event screen", dur: 1100 },
  ],
};
