import type { Metadata } from "next";
import SolutionPageTemplate, { type SolutionPageData } from "@/components/solutions/SolutionPageTemplate";
import { transportationScene } from "@/components/solutions/scenes/transportation";

const PAGE_URL = "https://audiovisualnepal.com/solutions/transportation";

export const metadata: Metadata = {
  title: "Airport & Bus Park PA Systems in Nepal",
  description:
    "IP network PA, zone paging and passenger information audio for airports, bus parks and transit hubs in Nepal. Design, supply and installation by AudioVisual Nepal.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Airport & Bus Park PA Systems in Nepal | AudioVisual Nepal",
    description: "IP network PA, zone paging and passenger information audio for transit hubs.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/images/heroes/transportation-hero.webp", width: 1376, height: 768 }],
  },
};

const data: SolutionPageData = {
  pageUrl: PAGE_URL,
  serviceName: "Transportation PA & Passenger Information Integration",
  heroImage: "/images/heroes/transportation-hero.webp",
  heroAlt: "Airport concourse in Nepal with passenger information displays and PA speakers",
  kicker: "Transportation",
  h1: "Airport and transit PA systems in Nepal",
  intro:
    "Announcements passengers actually understand — redundant IP PA backbones, zone paging and weatherproof coverage from concourse to apron.",
  sceneIntro:
    "From the paging console to the apron horns — click the pulse points to see the recommended equipment, then play the signal flow.",
  scene: transportationScene,
  systems: [
    { name: "IP PA backbone", desc: "DSPPA MAG6182II Pro — redundant network PA for hundreds of zones with priority-based broadcast.", href: "/products/ip-network-audio/dsppa-mag6182ii-pro", img: "/images/products/dsppa/dsppa-mag6182ii-pro/main.jpg" },
    { name: "Zone paging", desc: "MAG6806 network amplifiers — gate calls, boarding and security announcements from the operations desk.", href: "/products/ip-network-audio/dsppa-mag6806", img: "/images/products/dsppa/dsppa-mag6806/main.jpg" },
    { name: "Outdoor coverage", desc: "DSP161HD weatherproof horns for aprons, parking and bus park platforms.", href: "/products/horn-speakers/dsppa-dsp161hd", img: "/images/products/dsppa/dsppa-dsp161hd/main.jpg" },
    { name: "Emergency broadcast", desc: "PAVA9500 integrated voice evacuation — prioritised life-safety messaging across the terminal.", href: "/products/voice-evacuation/dsppa-pava9500", img: "/images/products/dsppa/dsppa-pava9500/main.jpg" },
  ],
  projectsBlurb: "Client references for this sector are shared on request during consultation — contact us and we'll connect you with comparable completed projects.",
  projects: [],
  faqs: [
    { q: "How do you keep announcements intelligible over crowd noise?", a: "Speaker density and placement are modelled for the space, with ambient-noise sensing that raises announcement level automatically during busy periods." },
    { q: "What happens if part of the network fails?", a: "IP PA backbones are designed with redundant servers and ring topologies — a single cable or amplifier failure doesn't silence the terminal." },
    { q: "Can the PA integrate with flight or departure information systems?", a: "Yes — IP PA servers accept triggers from FIDS and scheduling systems for automated gate and boarding announcements." },
  ],
};

export default function Page() {
  return <SolutionPageTemplate data={data} />;
}
