import type { SceneConfig } from "../InteractiveScene";
const A = "#14B8A6", V = "#8B5CF6", P = "#F59E0B";
const art = (
  <>
    <rect x={24} y={24} width={632} height={278} rx={4} fill="none" stroke="#94A3B8" strokeWidth={1} />
    <line x1={24} y1={44} x2={656} y2={44} stroke="#CBD5E1" strokeWidth={1} />
    <line x1={24} y1={272} x2={656} y2={272} stroke="#94A3B8" strokeWidth={1} />
    <rect x={50} y={80} width={150} height={90} rx={3} fill="#DDD6FE" stroke="#7C3AED" strokeWidth={1} />
    <g fill="#FDE68A" stroke="#D97706" strokeWidth={1}>
      <rect x={215} y={190} width={30} height={60} rx={2} />
      <rect x={210} y={184} width={40} height={8} rx={2} />
    </g>
    <g fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1}>
      <rect x={280} y={205} width={50} height={10} rx={2} /><rect x={350} y={205} width={50} height={10} rx={2} /><rect x={420} y={205} width={50} height={10} rx={2} /><rect x={490} y={205} width={50} height={10} rx={2} />
      <rect x={280} y={245} width={50} height={10} rx={2} /><rect x={350} y={245} width={50} height={10} rx={2} /><rect x={420} y={245} width={50} height={10} rx={2} /><rect x={490} y={245} width={50} height={10} rx={2} />
      <rect x={570} y={60} width={80} height={50} rx={3} />
      <rect x={596} y={170} width={50} height={100} rx={3} />
    </g>
    <line x1={570} y1={85} x2={650} y2={85} stroke="#94A3B8" strokeWidth={1} />
    <g fill="#99F6E4" stroke="#0D9488" strokeWidth={1}>
      <circle cx={305} cy={198} r={4} /><circle cx={375} cy={198} r={4} /><circle cx={445} cy={198} r={4} /><circle cx={515} cy={198} r={4} />
      <rect x={602} y={178} width={38} height={12} rx={2} /><rect x={602} y={196} width={38} height={12} rx={2} /><rect x={602} y={214} width={38} height={12} rx={2} />
    </g>
    <circle cx={610} cy={98} r={5} fill="#DDD6FE" stroke="#7C3AED" strokeWidth={1} />
    <g fill="#64748B" fontSize={11} textAnchor="middle" fontFamily="inherit">
      <text x={125} y={188}>presentation screen</text>
      <text x={230} y={266}>smart podium</text>
      <text x={410} y={232}>delegate microphones</text>
      <text x={610} y={128}>broadcast camera</text>
      <text x={621} y={288}>IP PA server rack</text>
    </g>
  </>
);
export const governmentScene: SceneConfig = {
  viewBox: "0 0 680 330",
  ariaLabel: "Government conference hall diagram: presentation screen, smart podium, delegate microphone rows, broadcast camera and IP PA server rack",
  art,
  hotspots: [
    { id: "scr", x: 125, y: 125, color: V, product: { name: "iWall 109 video wall controller", brand: "InfoBit", desc: "Drives the chamber's main presentation screen and committee room displays.", href: "/products/video-walls/infobit-iwall-109" } },
    { id: "pod", x: 230, y: 215, color: P, product: { name: "Focus Smart Podium ST600", brand: "Focus", desc: "Electric height-adjustable podium with touch screen and built-in PC for addresses and briefings.", href: "/products/smart-podiums/focus-st600" } },
    { id: "mic", x: 305, y: 196, color: A, product: { name: "Delegate conference microphones", brand: "DSPPA", desc: "Chairman and delegate discussion units with speak-request and voting integration.", href: "/products/conference-audio" } },
    { id: "cam", x: 610, y: 98, color: V, product: { name: "X60 NDI PTZ camera", brand: "Tenveo", desc: "NDI broadcast camera for live coverage, records proceedings and streams sessions.", href: "/products/conference-cameras/tenveo-x60ndi" } },
    { id: "rack", x: 621, y: 205, color: A, product: { name: "MAG6182II IP network PA server", brand: "DSPPA", desc: "Centralised audio management across chambers, offices and public areas.", href: "/products/ip-network-audio/dsppa-mag6182ii" } },
  ],
  flow: [
    { id: "a1", path: "M305,198 H515", color: A, label: "Audio: delegate mics activate in sequence", dur: 1400 },
    { id: "a2", path: "M515,204 V295 H621 V232", color: A, label: "Audio: conference bus → DSP + PA server", dur: 1200 },
    { id: "v1", path: "M596,210 H125 V172", color: V, label: "AV: server → hall speakers and screen", dur: 1200 },
  ],
};
