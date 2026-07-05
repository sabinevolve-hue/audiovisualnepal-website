import type { SceneConfig } from "../InteractiveScene";
const A = "#14B8A6", V = "#8B5CF6";
const art = (
  <>
    <rect x={24} y={24} width={632} height={278} rx={4} fill="none" stroke="#94A3B8" strokeWidth={1} />
    <line x1={24} y1={44} x2={656} y2={44} stroke="#CBD5E1" strokeWidth={1} />
    <line x1={24} y1={272} x2={656} y2={272} stroke="#94A3B8" strokeWidth={1} />
    <line x1={225} y1={44} x2={225} y2={272} stroke="#CBD5E1" strokeWidth={1} strokeDasharray="4 4" />
    <g fill="#DDD6FE" stroke="#7C3AED" strokeWidth={1}>
      <rect x={60} y={90} width={64} height={38} /><rect x={126} y={90} width={64} height={38} />
      <rect x={60} y={130} width={64} height={38} /><rect x={126} y={130} width={64} height={38} />
      <rect x={300} y={86} width={120} height={70} rx={3} />
      <rect x={315} y={158} width={90} height={10} rx={3} />
    </g>
    <g fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1}>
      <rect x={260} y={228} width={300} height={12} rx={2} />
      <rect x={280} y={240} width={10} height={32} /><rect x={530} y={240} width={10} height={32} />
      <rect x={596} y={164} width={50} height={108} rx={3} />
    </g>
    <g fill="#99F6E4" stroke="#0D9488" strokeWidth={1}>
      <rect x={280} y={44} width={44} height={10} rx={2} /><rect x={480} y={44} width={44} height={10} rx={2} />
      <circle cx={410} cy={222} r={7} />
      <rect x={602} y={172} width={38} height={12} rx={2} /><rect x={602} y={190} width={38} height={12} rx={2} /><rect x={602} y={208} width={38} height={12} rx={2} />
    </g>
    <g fill="#64748B" fontSize={11} textAnchor="middle" fontFamily="inherit">
      <text x={125} y={185}>lobby video wall</text>
      <text x={360} y={186}>display + video bar</text>
      <text x={410} y={256}>speakerphone</text>
      <text x={302} y={72}>ceiling speakers</text>
      <text x={621} y={288}>matrix amp rack</text>
    </g>
  </>
);
export const corporateScene: SceneConfig = {
  viewBox: "0 0 680 330",
  ariaLabel: "Corporate office diagram: lobby video wall, boardroom display with video bar, ceiling speakers, speakerphone and matrix amplifier rack",
  art,
  hotspots: [
    { id: "wall", x: 125, y: 129, color: V, product: { name: "iWall 204 video wall controller", brand: "InfoBit", desc: "Drives 2×2 lobby video walls in 4K — brand content, dashboards and welcome screens.", href: "/products/video-walls/infobit-iwall-204" } },
    { id: "vbar", x: 360, y: 163, color: V, product: { name: "iCam VB60 video bar", brand: "InfoBit", desc: "All-in-one 4K camera, mics and speakers under the boardroom display for hybrid meetings.", href: "/products/video-conferencing/infobit-vb60" } },
    { id: "spk", x: 302, y: 49, color: A, product: { name: "DSP6011 frameless ceiling speakers", brand: "DSPPA", desc: "Discreet background music and paging across office zones, cafeterias and corridors.", href: "/products/ceiling-speakers/dsppa-dsp6011" } },
    { id: "sph", x: 410, y: 220, color: A, product: { name: "iSpeaker M500 speakerphone", brand: "InfoBit", desc: "USB speakerphone with echo cancellation for smaller huddle spaces.", href: "/products/conference-audio/infobit-ispeaker-m500" } },
    { id: "rack", x: 621, y: 199, color: A, product: { name: "DMA6112 matrix amplifier", brand: "DSPPA", desc: "Zone-controlled audio routing — different music in reception, cafeteria and work floors.", href: "/products/amplifiers/dsppa-dma6112" } },
  ],
  flow: [
    { id: "a1", path: "M410,229 V295 H621 V230", color: A, label: "Audio: speakerphone → matrix amplifier", dur: 1200 },
    { id: "a2", path: "M621,164 V58 H302 V50", color: A, label: "Audio: amplifier → ceiling zones", dur: 1200 },
    { id: "v1", path: "M596,200 H160 V172", color: V, label: "Video: iWall controller → lobby wall", dur: 1200 },
  ],
};
