import type { Metadata } from "next";
import SolutionPageTemplate, { type SolutionPageData } from "@/components/solutions/SolutionPageTemplate";
import { educationScene } from "@/components/solutions/scenes/education";

const PAGE_URL = "https://www.audiovisualnepal.com/solutions/education";

export const metadata: Metadata = {
  title: "School & Campus PA Systems and Smart Podiums in Nepal",
  description:
    "Classroom audio, campus-wide IP PA, scheduled bells and Focus smart podiums for schools and universities in Nepal. Design, supply and installation by AudioVisual Nepal.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "School & Campus PA and Smart Podiums in Nepal | AudioVisual Nepal",
    description: "Classroom audio, campus PA, scheduled bells and smart podiums for schools and universities.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/images/heroes/education-hero.webp", width: 1376, height: 768 }],
  },
};

const data: SolutionPageData = {
  pageUrl: PAGE_URL,
  serviceName: "Education AV & Campus PA Integration",
  heroImage: "/images/heroes/education-hero.webp",
  heroAlt: "University lecture hall in Nepal with smart podium and interactive display",
  kicker: "Education",
  h1: "School and campus AV solutions in Nepal",
  intro:
    "Smart podiums, classroom audio and campus-wide IP PA with scheduled bells — learning spaces that carry every word to the back row.",
  sceneIntro:
    "One classroom, one campus — click the pulse points to see what we install in each, then play the signal flow.",
  scene: educationScene,
  systems: [
    { name: "Smart podiums", desc: "Focus ST100 height-adjustable teaching podium with touch screen and built-in PC.", href: "/products/smart-podiums/focus-st100", img: "/images/products/focus/focus-st100/main.jpg" },
    { name: "Wireless presentation", desc: "iShare X200 — teachers and students cast to the interactive panel from any device, no dongles.", href: "/products/wireless-presentation/infobit-ishare-x200", img: "/images/products/infobit/infobit-ishare-x200/main.webp" },
    { name: "Classroom audio", desc: "DSPPA DSP5211 coaxial ceiling speakers — even speech coverage without feedback.", href: "/products/ceiling-speakers/dsppa-dsp5211", img: "/images/products/dsppa/dsppa-dsp5211/main.webp" },
    { name: "Campus IP PA & bells", desc: "MAG6182II IP PA server — scheduled bells, zone announcements and emergency broadcast over the LAN.", href: "/products/ip-network-audio/dsppa-mag6182ii", img: "/images/products/dsppa/dsppa-mag6182ii/main.jpg" },
  ],
  projectsBlurb: "Classroom, campus and display installations for schools — verified completed projects.",
  projects: [
    { title: "Jeevan Jyoti School — 266 sq ft LED", location: "Kohalpur, Banke" },
    { title: "Awarded International Education", location: "Putalisadak, Kathmandu" },
  ],
  faqs: [
    { q: "Can the PA system ring class bells automatically?", a: "Yes — IP PA servers schedule bells, anthem and announcements per calendar, with manual override from the office and priority for emergency messages." },
    { q: "Can we roll the system out building by building?", a: "Yes — IP network audio scales naturally: start with one block and add zones over the existing LAN as budget allows, without replacing earlier equipment." },
    { q: "Do smart podiums come with warranty and training?", a: "All Focus podiums carry manufacturer warranty, and we train teachers and IT staff during handover with AMC support after." },
  ],
};

export default function Page() {
  return <SolutionPageTemplate data={data} />;
}
