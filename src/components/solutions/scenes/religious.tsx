import type { SceneConfig } from "../InteractiveScene";
const A = "#14B8A6";
const art = (
  <>
    <rect x={24} y={24} width={632} height={278} rx={4} fill="none" stroke="#94A3B8" strokeWidth={1} />
    <line x1={24} y1={272} x2={656} y2={272} stroke="#94A3B8" strokeWidth={1} />
    <rect x={80} y={180} width={140} height={92} fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1} />
    <path d="M60,180 L150,120 L240,180" fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1} />
    <path d="M108,132 L150,80 L192,132" fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1} />
    <g fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1}>
      <rect x={300} y={160} width={12} height={112} /><rect x={370} y={160} width={12} height={112} />
      <rect x={596} y={210} width={50} height={62} rx={3} />
    </g>
    <line x1={560} y1={272} x2={560} y2={95} stroke="#94A3B8" strokeWidth={2} />
    <g fill="#99F6E4" stroke="#0D9488" strokeWidth={1}>
      <rect x={296} y={170} width={20} height={50} rx={2} />
      <rect x={366} y={170} width={20} height={50} rx={2} />
      <path d="M552,90 L578,84 L578,108 L552,102 Z" />
      <rect x={602} y={220} width={38} height={12} rx={2} /><rect x={602} y={238} width={38} height={12} rx={2} />
      <rect x={146} y={190} width={8} height={22} rx={2} /><circle cx={150} cy={186} r={5} />
    </g>
    <g fill="#64748B" fontSize={11} textAnchor="middle" fontFamily="inherit">
      <text x={150} y={292}>shrine + microphone</text>
      <text x={341} y={292}>courtyard columns</text>
      <text x={565} y={130}>horn speaker</text>
      <text x={621} y={292}>amplifier room</text>
    </g>
  </>
);
export const religiousScene: SceneConfig = {
  viewBox: "0 0 680 330",
  ariaLabel: "Temple or mosque courtyard diagram: shrine microphone, column speakers on pillars, horn speaker on pole and amplifier room",
  art,
  hotspots: [
    { id: "mic", x: 150, y: 184, color: A, product: { name: "Announcement microphones", brand: "DSPPA", desc: "Clear speech pickup for prayers, sermons and announcements.", href: "/products/conference-audio" } },
    { id: "col", x: 306, y: 190, color: A, product: { name: "DSP255II waterproof column speaker", brand: "DSPPA", desc: "Weatherproof columns on pillars — high clarity for the congregation without harshness.", href: "/products/column-speakers/dsppa-dsp255ii" } },
    { id: "horn", x: 564, y: 96, color: A, product: { name: "DSP161HD hi-fi horn speaker", brand: "DSPPA", desc: "Long-throw outdoor coverage for courtyards and surrounding areas.", href: "/products/horn-speakers/dsppa-dsp161hd" } },
    { id: "amp", x: 621, y: 235, color: A, product: { name: "DMA250U mixer amplifier", brand: "DSPPA", desc: "Simple, reliable amplification with USB and Bluetooth — one knob per zone.", href: "/products/amplifiers/dsppa-dma250u" } },
  ],
  flow: [
    { id: "a1", path: "M150,214 V296 H621 V266", color: A, label: "Audio: microphone → mixer amplifier", dur: 1300 },
    { id: "a2", path: "M596,240 H306 V222", color: A, label: "Audio: amplifier → courtyard columns", dur: 1200 },
    { id: "a3", path: "M621,210 V96 H580", color: A, label: "Audio: amplifier → horn (outer coverage)", dur: 1100 },
  ],
};
