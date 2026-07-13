import type { Metadata } from "next";
import SolutionPageTemplate, { type SolutionPageData } from "@/components/solutions/SolutionPageTemplate";
import { corporateScene } from "@/components/solutions/scenes/corporate";

const PAGE_URL = "https://www.audiovisualnepal.com/solutions/corporate";

export const metadata: Metadata = {
  title: "Corporate Office AV Solutions in Nepal — Boardrooms, Video Walls & BGM",
  description:
    "Complete AV for corporate offices in Nepal: one-touch boardrooms, lobby video walls, zone-controlled background music and wireless presentation. Design, supply and installation by AudioVisual Nepal.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Corporate Office AV Solutions in Nepal | AudioVisual Nepal",
    description: "One-touch boardrooms, lobby video walls and background music for modern offices across Nepal.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/images/heroes/corporate-hero.webp", width: 1376, height: 768 }],
  },
};

const data: SolutionPageData = {
  pageUrl: PAGE_URL,
  serviceName: "Corporate Office AV Design & Installation",
  heroImage: "/images/heroes/corporate-hero.webp",
  heroAlt: "Modern corporate boardroom in Kathmandu with video wall and conference AV",
  kicker: "Corporate offices",
  h1: "Corporate office AV solutions in Nepal",
  intro:
    "One-touch boardrooms, lobby video walls and zone-controlled background music — AV that just works, from reception to the executive floor.",
  sceneIntro:
    "From the lobby video wall to the boardroom video bar — click the pulse points to see what we install and why, then play the signal flow.",
  scene: corporateScene,
  systems: [
    { name: "Boardroom video conferencing", desc: "InfoBit iCam VB60 all-in-one video bar — 4K camera, mics and speakers for Zoom, Teams and Meet.", href: "/products/video-conferencing/infobit-vb60", img: "/images/products/infobit/infobit-vb60/main.webp" },
    { name: "Lobby video walls", desc: "iWall 204 controllers drive 4K video walls for reception, NOCs and trading floors.", href: "/products/video-walls/infobit-iwall-204", img: "/images/products/infobit/infobit-iwall-204/main.webp" },
    { name: "Wireless presentation", desc: "iShare X400 — dongle-free casting with up to 4 sources on screen for agile workspaces.", href: "/products/wireless-presentation/infobit-ishare-x400", img: "/images/products/infobit/infobit-ishare-x400/main.webp" },
    { name: "Background music zones", desc: "DSPPA DMA6112 matrix amplifier — different sources in reception, cafeteria and work floors.", href: "/products/amplifiers/dsppa-dma6112", img: "/images/products/dsppa/dsppa-dma6112/main.jpg" },
  ],
  projectsBlurb: "LED and AV installations for Nepal's corporate and banking sector — verified completed projects.",
  projects: [
    { title: "Siddhartha Bank Head Office", location: "Naxal, Kathmandu" },
    { title: "Dibya Ratna Consultant", location: "Battisputali, Kathmandu" },
    { title: "Awarded International Education", location: "Putalisadak, Kathmandu" },
  ],
  faqs: [
    { q: "What does a corporate boardroom AV setup cost in Nepal?", a: "A huddle room with a video bar and wireless presentation is an affordable starting point; executive boardrooms with video walls, ceiling audio and control systems scale with room size. Every project is quoted after a free site survey." },
    { q: "Can one system run the boardroom, background music and signage?", a: "Yes — we design integrated systems where a single matrix amplifier and network handle meeting audio, multi-zone BGM and paging, with displays managed centrally." },
    { q: "Do your systems work with Zoom, Teams and Google Meet?", a: "All conferencing hardware we install is platform-agnostic and certified for the major platforms, connected via USB or native room licences." },
  ],
};

export default function Page() {
  return <SolutionPageTemplate data={data} />;
}
