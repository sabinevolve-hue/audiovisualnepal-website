import type { Metadata } from "next";
import SolutionPageTemplate, { type SolutionPageData } from "@/components/solutions/SolutionPageTemplate";
import { hotelsScene } from "@/components/solutions/scenes/hotels";

const PAGE_URL = "https://www.audiovisualnepal.com/solutions/hotels";

export const metadata: Metadata = {
  title: "Hotel AV Solutions in Nepal — Ballroom Sound & Background Music",
  description:
    "Ballroom sound systems, multi-zone background music and event AV for hotels and resorts in Nepal. Design, supply and installation by AudioVisual Nepal.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Hotel AV Solutions in Nepal | AudioVisual Nepal",
    description: "Ballroom sound, multi-zone background music and event AV for hotels and resorts.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/images/heroes/hotels-hero.webp", width: 1376, height: 768 }],
  },
};

const data: SolutionPageData = {
  pageUrl: PAGE_URL,
  serviceName: "Hotel & Hospitality AV Integration",
  heroVideo: "hotels",
  heroImage: "/images/heroes/hotels-hero.webp",
  heroAlt: "Luxury hotel ballroom in Kathmandu with stage sound system and chandeliers",
  kicker: "Hotels & hospitality",
  h1: "Hotel AV solutions in Nepal",
  intro:
    "Ballroom sound for weddings and conferences, multi-zone background music for lobby to spa — systems your staff can run from one panel.",
  sceneIntro:
    "From stage columns to BGM zones — click the pulse points to see the recommended equipment, then play the signal flow.",
  scene: hotelsScene,
  systems: [
    { name: "Ballroom & event sound", desc: "DSPPA DSP255II column speakers — elegant, high-clarity sound for events, indoor or poolside.", href: "/products/column-speakers/dsppa-dsp255ii", img: "/images/products/dsppa/dsppa-dsp255ii/main.jpg" },
    { name: "Background music zones", desc: "DSP6011 frameless ceiling speakers with zone control for lobby, restaurant, spa and corridors.", href: "/products/ceiling-speakers/dsppa-dsp6011", img: "/images/products/dsppa/dsppa-dsp6011/main.jpg" },
    { name: "Mixing & amplification", desc: "DMA6250U integrated mixer amplifier — USB, Bluetooth and multi-zone routing from one panel.", href: "/products/amplifiers/dsppa-dma6250u", img: "/images/products/dsppa/dsppa-dma6250u/main.jpg" },
    { name: "Event presentation", desc: "iShare X400 wireless presentation — presenters cast to event screens from any seat.", href: "/products/wireless-presentation/infobit-ishare-x400", img: "/images/products/infobit/infobit-ishare-x400/main.webp" },
  ],
  projectsBlurb: "Display and AV installations for hospitality venues — verified completed projects.",
  projects: [
    { title: "Inland Multi Cuisine & Stay", location: "Budhanilkantha, Kathmandu" },
    { title: "Auranex Restaurant", location: "Townplanning, Kathmandu" },
    { title: "FCube Cinemas", location: "Boudha, Kathmandu" },
  ],
  faqs: [
    { q: "Can different areas play different music at different volumes?", a: "Yes — matrix amplifiers give each zone its own source and volume: calm lobby music, upbeat restaurant playlists and silence in meeting rooms, all scheduled or set by staff." },
    { q: "Can hotel staff operate the system without an engineer?", a: "Yes — day-to-day operation is one wall panel or tablet per zone. We train your team at handover, and event presets recall full ballroom configurations in one touch." },
    { q: "Do you handle both fixed installation and event rental support?", a: "Our systems are designed for permanent installation, with tie-in points for touring and rental gear during large productions." },
  ],
};

export default function Page() {
  return <SolutionPageTemplate data={data} />;
}
