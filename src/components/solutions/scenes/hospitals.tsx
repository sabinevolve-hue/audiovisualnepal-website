import type { SceneConfig } from "../InteractiveScene";
const A = "#14B8A6", V = "#8B5CF6", S = "#EF4444";
const art = (
  <>
    <rect x={24} y={24} width={632} height={278} rx={4} fill="none" stroke="#94A3B8" strokeWidth={1} />
    <line x1={24} y1={44} x2={656} y2={44} stroke="#CBD5E1" strokeWidth={1} />
    <line x1={24} y1={272} x2={656} y2={272} stroke="#94A3B8" strokeWidth={1} />
    <g fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1}>
      <rect x={50} y={210} width={110} height={60} rx={3} />
      <rect x={220} y={180} width={40} height={92} /><rect x={320} y={180} width={40} height={92} /><rect x={420} y={180} width={40} height={92} />
      <rect x={580} y={150} width={60} height={122} rx={3} />
    </g>
    <rect x={300} y={90} width={100} height={50} rx={3} fill="#DDD6FE" stroke="#7C3AED" strokeWidth={1} />
    <g fill="#99F6E4" stroke="#0D9488" strokeWidth={1}>
      <rect x={96} y={190} width={8} height={20} rx={2} /><circle cx={100} cy={186} r={5} />
      <rect x={200} y={44} width={44} height={10} rx={2} /><rect x={360} y={44} width={44} height={10} rx={2} /><rect x={500} y={44} width={44} height={10} rx={2} />
      <rect x={586} y={198} width={48} height={14} rx={2} />
    </g>
    <g fill="#FECACA" stroke="#DC2626" strokeWidth={1}>
      <rect x={586} y={158} width={48} height={14} rx={2} /><rect x={586} y={178} width={48} height={14} rx={2} />
    </g>
    <g fill="#64748B" fontSize={11} textAnchor="middle" fontFamily="inherit">
      <text x={105} y={288}>nurse station + paging</text>
      <text x={340} y={292}>ward corridors</text>
      <text x={350} y={160}>digital signage</text>
      <text x={382} y={72}>zone ceiling speakers</text>
      <text x={610} y={288}>voice evacuation rack</text>
    </g>
  </>
);
export const hospitalsScene: SceneConfig = {
  viewBox: "0 0 680 330",
  ariaLabel: "Hospital diagram: nurse station with paging microphone, ward corridors, digital signage, zone ceiling speakers and voice evacuation rack",
  art,
  hotspots: [
    { id: "pag", x: 100, y: 186, color: A, product: { name: "MAG6806 IP network amplifier", brand: "DSPPA", desc: "Nurse-station paging to selected wards and floors over the hospital LAN.", href: "/products/ip-network-audio/dsppa-mag6806" } },
    { id: "spk", x: 382, y: 49, color: A, product: { name: "DSP5211 coaxial ceiling speaker", brand: "DSPPA", desc: "Clear, calm announcements in wards, OPD and waiting areas.", href: "/products/ceiling-speakers/dsppa-dsp5211" } },
    { id: "sig", x: 350, y: 115, color: V, product: { name: "Digital signage & queue displays", brand: "InfoBit", desc: "Token queues, department wayfinding and health information displays.", href: "/products/video-walls" } },
    { id: "evac", x: 610, y: 170, color: S, product: { name: "PAVA8500 voice evacuation system", brand: "DSPPA", desc: "EN54-certified Dante voice alarm — automatic evacuation messaging integrated with the fire panel.", href: "/products/voice-evacuation/dsppa-pava8500" } },
    { id: "evac2", x: 610, y: 205, color: S, product: { name: "PAVA4600 compact voice alarm", brand: "DSPPA", desc: "Wall-mount voice evacuation for clinics and smaller wings.", href: "/products/voice-evacuation/dsppa-pava4600" } },
  ],
  flow: [
    { id: "a1", path: "M100,212 V296 H610 V274", color: A, label: "Paging: nurse console → IP network", dur: 1300 },
    { id: "a2", path: "M610,150 V58 H200 V50", color: A, label: "Paging: network → zone speakers", dur: 1400 },
    { id: "s1", path: "M610,155 V62 H360 V50", color: S, label: "Emergency: PAVA voice evacuation broadcast", dur: 1200 },
  ],
};
