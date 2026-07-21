import type { Metadata } from "next";
import SolutionPageTemplate, { type SolutionPageData } from "@/components/solutions/SolutionPageTemplate";
import { religiousScene } from "@/components/solutions/scenes/religious";

const PAGE_URL = "https://www.audiovisualnepal.com/solutions/religious";

export const metadata: Metadata = {
  title: "Mosque, Temple & Church Sound Systems in Nepal",
  description:
    "High-clarity PA for mosques, temples, churches and monasteries in Nepal — column speakers, horn speakers and reliable amplification, installed nationwide by AudioVisual Nepal.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Mosque, Temple & Church Sound Systems in Nepal | AudioVisual Nepal",
    description: "High-clarity PA for houses of worship — column speakers, horns and reliable amplification.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/images/heroes/religious-hero.webp", width: 1376, height: 768 }],
  },
};

const data: SolutionPageData = {
  pageUrl: PAGE_URL,
  serviceName: "House of Worship Sound System Integration",
  heroVideo: "religious",
  heroImage: "/images/heroes/religious-hero.webp",
  heroAlt: "Nepali temple courtyard at dusk with discreet sound system",
  kicker: "Religious places",
  h1: "Mosque, temple and church sound systems in Nepal",
  intro:
    "Every word reaches the whole congregation — weatherproof columns and horns with simple, reliable amplification that respects the space.",
  sceneIntro:
    "From the shrine microphone to the outer horn coverage — click the pulse points to see the recommended equipment, then play the signal flow.",
  scene: religiousScene,
  systems: [
    { name: "Courtyard column speakers", desc: "DSPPA DSP255II waterproof columns — high clarity for the congregation without harshness.", href: "/products/column-speakers/dsppa-dsp255ii", img: "/images/products/dsppa/dsppa-dsp255ii/main.jpg" },
    { name: "Long-throw horn speakers", desc: "DSP161HD hi-fi horns for outer courtyards and surrounding areas.", href: "/products/horn-speakers/dsppa-dsp161hd", img: "/images/products/dsppa/dsppa-dsp161hd/main.jpg" },
    { name: "Simple amplification", desc: "DMA250U mixer amplifier — USB, Bluetooth and one knob per zone for daily use.", href: "/products/amplifiers/dsppa-dma250u", img: "/images/products/dsppa/dsppa-dma250u/main.jpg" },
    { name: "Scheduled broadcasts", desc: "MAG6182II IP PA server automates azan, bells and chants on calendar schedules.", href: "/products/ip-network-audio/dsppa-mag6182ii", img: "/images/products/dsppa/dsppa-mag6182ii/main.jpg" },
  ],
  projectsBlurb: "Client references for this sector are shared on request during consultation — contact us and we'll connect you with comparable completed projects.",
  projects: [],
  faqs: [
    { q: "Will outdoor speakers survive monsoon weather?", a: "Yes — we specify IP-rated waterproof columns and horns designed for permanent outdoor mounting, with protected cabling and earthing." },
    { q: "Can calls to prayer or bells play automatically on schedule?", a: "Yes — IP PA servers schedule daily broadcasts by calendar, with instant manual override from a microphone when needed." },
    { q: "Can the system be simple enough for volunteers to operate?", a: "Daily use is one switch and one volume knob; the complexity stays in the rack. We train your caretakers at handover." },
  ],
};

export default function Page() {
  return <SolutionPageTemplate data={data} />;
}
