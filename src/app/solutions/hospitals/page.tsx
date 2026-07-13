import type { Metadata } from "next";
import SolutionPageTemplate, { type SolutionPageData } from "@/components/solutions/SolutionPageTemplate";
import { hospitalsScene } from "@/components/solutions/scenes/hospitals";

const PAGE_URL = "https://www.audiovisualnepal.com/solutions/hospitals";

export const metadata: Metadata = {
  title: "Hospital PA & Voice Evacuation Systems in Nepal",
  description:
    "EN54 voice evacuation, IP zone paging and nurse-station announcement systems for hospitals in Nepal. Design, supply and installation by AudioVisual Nepal.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Hospital PA & Voice Evacuation in Nepal | AudioVisual Nepal",
    description: "EN54 voice evacuation, IP zone paging and nurse-station announcements for healthcare facilities.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/images/heroes/hospitals-hero.webp", width: 1376, height: 768 }],
  },
};

const data: SolutionPageData = {
  pageUrl: PAGE_URL,
  serviceName: "Hospital PA & Voice Evacuation Integration",
  heroImage: "/images/heroes/hospitals-hero.webp",
  heroAlt: "Modern hospital reception in Nepal with paging speakers and digital signage",
  kicker: "Hospitals",
  h1: "Hospital PA and voice evacuation in Nepal",
  intro:
    "Calm, clear zone paging for wards and OPD, EN54-certified voice evacuation for life safety — audio infrastructure hospitals can depend on.",
  sceneIntro:
    "From the nurse station to the evacuation rack — click the pulse points to see the recommended equipment, then play the signal flow.",
  scene: hospitalsScene,
  systems: [
    { name: "Voice evacuation (EN54)", desc: "DSPPA PAVA8500 Dante voice alarm — automatic evacuation messaging integrated with the fire panel.", href: "/products/voice-evacuation/dsppa-pava8500", img: "/images/products/dsppa/dsppa-pava8500/main.jpg" },
    { name: "Compact voice alarm", desc: "PAVA4600 wall-mount voice evacuation for clinics, wings and smaller facilities.", href: "/products/voice-evacuation/dsppa-pava4600", img: "/images/products/dsppa/dsppa-pava4600/main.jpg" },
    { name: "IP zone paging", desc: "MAG6806 network amplifiers — nurse-station paging to selected wards and floors over the LAN.", href: "/products/ip-network-audio/dsppa-mag6806", img: "/images/products/dsppa/dsppa-mag6806/main.jpg" },
    { name: "Ward & OPD speakers", desc: "DSP5211 coaxial ceiling speakers — clear, calm announcements in wards and waiting areas.", href: "/products/ceiling-speakers/dsppa-dsp5211", img: "/images/products/dsppa/dsppa-dsp5211/main.webp" },
  ],
  projectsBlurb: "Client references for this sector are shared on request during consultation — contact us and we'll connect you with comparable completed projects.",
  projects: [],
  faqs: [
    { q: "Is the voice evacuation system EN54 certified?", a: "Yes — DSPPA PAVA systems are EN54-certified and integrate with the fire alarm panel for automatic, prioritised evacuation messaging." },
    { q: "Can paging integrate with our nurse call system?", a: "Yes — IP paging integrates with nurse call and telephony, so calls and codes route to the right wards automatically with priority levels." },
    { q: "Can installation happen without disrupting hospital operations?", a: "We plan floor-by-floor rollouts with night and off-peak work windows, keeping wards operational throughout installation." },
  ],
};

export default function Page() {
  return <SolutionPageTemplate data={data} />;
}
