import type { Metadata } from "next";
import SolutionPageTemplate, { type SolutionPageData } from "@/components/solutions/SolutionPageTemplate";
import { governmentScene } from "@/components/solutions/scenes/government";

const PAGE_URL = "https://www.audiovisualnepal.com/solutions/government";

export const metadata: Metadata = {
  title: "Government Conference & PA System Solutions in Nepal",
  description:
    "Conference systems, smart podiums, PA and broadcast AV for ministries, assemblies and public offices across Nepal. Tender-ready specifications and nationwide installation by AudioVisual Nepal.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Government Conference & PA Solutions in Nepal | AudioVisual Nepal",
    description: "Delegate conference systems, smart podiums and IP PA for ministries and public offices.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/images/heroes/government-hero.webp", width: 1376, height: 768 }],
  },
};

const data: SolutionPageData = {
  pageUrl: PAGE_URL,
  serviceName: "Government Conference & PA System Integration",
  heroImage: "/images/heroes/government-hero.webp",
  heroAlt: "Government conference hall in Nepal with delegate microphones and presentation screen",
  kicker: "Government projects",
  h1: "Government conference and PA solutions in Nepal",
  intro:
    "Delegate conference systems, smart podiums and campus-wide PA — robust, secure and maintainable AV for chambers, ministries and service centers.",
  sceneIntro:
    "From delegate microphones to the broadcast camera — click the pulse points to see the recommended equipment, then play the signal flow.",
  scene: governmentScene,
  systems: [
    { name: "Smart podiums", desc: "Focus ST600 electric height-adjustable podium with touch screen and built-in PC for addresses and briefings.", href: "/products/smart-podiums/focus-st600", img: "/images/products/focus/focus-st600/main.jpg" },
    { name: "Chamber displays", desc: "iWall 109 video wall controllers for main screens, committee rooms and public information displays.", href: "/products/video-walls/infobit-iwall-109", img: "/images/products/infobit/infobit-iwall-109/main.png" },
    { name: "Session broadcast", desc: "Tenveo X60 NDI PTZ cameras record and stream proceedings in broadcast quality.", href: "/products/conference-cameras/tenveo-x60ndi", img: "/images/products/tenveo/tenveo-x60ndi/main.png" },
    { name: "Building-wide IP PA", desc: "DSPPA MAG6182II IP network PA server — announcements and emergency broadcast across every floor.", href: "/products/ip-network-audio/dsppa-mag6182ii", img: "/images/products/dsppa/dsppa-mag6182ii/main.jpg" },
  ],
  projectsBlurb: "Client references for this sector are shared on request during consultation — contact us and we'll connect you with comparable completed projects.",
  projects: [],
  faqs: [
    { q: "Can you supply tender-ready specifications and compliance documents?", a: "Yes — we prepare detailed technical specifications, manufacturer authorisation letters and warranty documentation for public procurement, with genuine products only." },
    { q: "Do you support simultaneous interpretation systems?", a: "Yes — delegate conference systems can be extended with interpretation booths, channel selectors and language distribution for international sessions." },
    { q: "What about after-sales support outside Kathmandu?", a: "We deliver and service projects in all 77 districts, with AMC contracts, spare parts and remote diagnostics for IP-based systems." },
  ],
};

export default function Page() {
  return <SolutionPageTemplate data={data} />;
}
