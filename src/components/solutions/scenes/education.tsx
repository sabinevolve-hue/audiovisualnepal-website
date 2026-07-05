import type { SceneConfig } from "../InteractiveScene";
const A = "#14B8A6", V = "#8B5CF6", P = "#F59E0B";
const art = (
  <>
    <rect x={24} y={24} width={632} height={278} rx={4} fill="none" stroke="#94A3B8" strokeWidth={1} />
    <line x1={24} y1={44} x2={656} y2={44} stroke="#CBD5E1" strokeWidth={1} />
    <line x1={24} y1={272} x2={656} y2={272} stroke="#94A3B8" strokeWidth={1} />
    <line x1={280} y1={44} x2={280} y2={272} stroke="#CBD5E1" strokeWidth={1} strokeDasharray="4 4" />
    <rect x={60} y={88} width={120} height={74} rx={3} fill="#DDD6FE" stroke="#7C3AED" strokeWidth={1} />
    <g fill="#FDE68A" stroke="#D97706" strokeWidth={1}>
      <rect x={200} y={190} width={34} height={70} rx={2} />
      <rect x={195} y={183} width={44} height={8} rx={2} />
    </g>
    <g fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1}>
      <rect x={320} y={160} width={80} height={112} /><rect x={430} y={185} width={70} height={87} /><rect x={510} y={150} width={80} height={122} />
      <rect x={596} y={180} width={50} height={92} rx={3} />
    </g>
    <path d="M315,160 L360,130 L405,160" fill="none" stroke="#94A3B8" strokeWidth={1} />
    <path d="M505,150 L550,118 L595,150" fill="none" stroke="#94A3B8" strokeWidth={1} />
    <g fill="#99F6E4" stroke="#0D9488" strokeWidth={1}>
      <rect x={100} y={44} width={44} height={10} rx={2} />
      <rect x={338} y={146} width={24} height={12} rx={2} />
      <rect x={528} y={134} width={24} height={12} rx={2} />
      <rect x={602} y={188} width={38} height={12} rx={2} /><rect x={602} y={206} width={38} height={12} rx={2} />
    </g>
    <g fill="#64748B" fontSize={11} textAnchor="middle" fontFamily="inherit">
      <text x={120} y={180}>interactive panel</text>
      <text x={217} y={288}>smart podium</text>
      <text x={122} y={72}>class speaker</text>
      <text x={455} y={292}>campus buildings + PA</text>
      <text x={621} y={288}>IP PA server</text>
    </g>
  </>
);
export const educationScene: SceneConfig = {
  viewBox: "0 0 680 330",
  ariaLabel: "Education diagram: classroom with interactive panel, smart podium and ceiling speaker, plus campus buildings with IP PA speakers and server",
  art,
  hotspots: [
    { id: "pan", x: 120, y: 125, color: V, product: { name: "iShare X200 wireless presentation", brand: "InfoBit", desc: "Teachers and students cast to the interactive panel dongle-free from any device.", href: "/products/wireless-presentation/infobit-ishare-x200" } },
    { id: "pod", x: 217, y: 215, color: P, product: { name: "Focus Smart Podium ST100", brand: "Focus", desc: "Height-adjustable teaching podium with touch screen, built-in PC and document camera.", href: "/products/smart-podiums/focus-st100" } },
    { id: "spk", x: 122, y: 49, color: A, product: { name: "DSP5211 coaxial ceiling speaker", brand: "DSPPA", desc: "Even speech coverage across the classroom without feedback.", href: "/products/ceiling-speakers/dsppa-dsp5211" } },
    { id: "horn", x: 350, y: 152, color: A, product: { name: "DSP161HD hi-fi horn speaker", brand: "DSPPA", desc: "Weatherproof horn speakers for playgrounds, assembly areas and bells.", href: "/products/horn-speakers/dsppa-dsp161hd" } },
    { id: "srv", x: 621, y: 210, color: A, product: { name: "MAG6182II IP network PA server", brand: "DSPPA", desc: "Campus-wide announcements, scheduled bells and emergency broadcast over the LAN.", href: "/products/ip-network-audio/dsppa-mag6182ii" } },
  ],
  flow: [
    { id: "v1", path: "M212,195 V125 H182", color: V, label: "Video: podium → interactive panel", dur: 1000 },
    { id: "a1", path: "M621,180 V60 H122 V50", color: A, label: "Audio: amplifier → classroom speaker", dur: 1200 },
    { id: "a2", path: "M621,200 H350 V154", color: A, label: "Campus PA: IP server → building speakers", dur: 1400 },
  ],
};
