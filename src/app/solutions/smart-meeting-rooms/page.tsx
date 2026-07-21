import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InteractiveScene from "@/components/solutions/InteractiveScene";
import Reveal from "@/components/solutions/Reveal";
import { smartMeetingRoomScene } from "@/components/solutions/scenes/smartMeetingRoom";

const PAGE_URL = "https://www.audiovisualnepal.com/solutions/smart-meeting-rooms";

export const metadata: Metadata = {
  title: "Smart Meeting Room Solutions in Nepal — Video Conferencing & Wireless Presentation",
  description:
    "Design and installation of smart meeting rooms in Nepal: AI-tracking PTZ cameras, wireless presentation, ceiling audio and Dante-networked conferencing. Authorised distributor for Tenveo, InfoBit and DSPPA.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Smart Meeting Room Solutions in Nepal | AudioVisual Nepal",
    description:
      "One-touch hybrid meeting rooms: AI cameras, wireless presentation and networked audio, designed and installed across Nepal.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/images/heroes/smart-meeting-rooms-hero.webp", width: 1376, height: 768 }],
  },
};

const systems = [
  {
    name: "Video conferencing",
    desc: "Tenveo AI-tracking PTZ cameras and video bars for Zoom, Teams and Meet — 4K with auto-framing.",
    href: "/products/conference-cameras/tenveo-nv20a-ai",
    img: "/images/products/tenveo/tenveo-nv20a-ai/main.webp",
  },
  {
    name: "Wireless presentation",
    desc: "InfoBit iShare X200 — dongle-free 4K casting for up to 16 users with 0.1s latency.",
    href: "/products/wireless-presentation/infobit-ishare-x200",
    img: "/images/products/infobit/infobit-ishare-x200/main.webp",
  },
  {
    name: "Room audio",
    desc: "Ceiling speakers, gooseneck and array microphones with DSP echo cancellation for natural hybrid calls.",
    href: "/products/ceiling-speakers/dsppa-dsp5211",
    img: "/images/products/dsppa/dsppa-dsp5211/main.webp",
  },
  {
    name: "Amplification & control",
    desc: "DSPPA DMA mixer amplifiers with multi-zone routing, USB and Bluetooth — one rack runs the room.",
    href: "/products/amplifiers/dsppa-dma250u",
    img: "/images/products/dsppa/dsppa-dma250u/main.webp",
  },
];

const faqs = [
  {
    q: "What does a smart meeting room cost in Nepal?",
    a: "A complete huddle room (camera, wireless presentation, audio) typically starts from a modest budget, while large boardrooms with Dante networking and ceiling mic arrays scale up. Every project is quoted after a free site survey.",
  },
  {
    q: "Which video platforms do your rooms support?",
    a: "All systems are platform-agnostic: Zoom, Microsoft Teams, Google Meet and WebEx work out of the box via USB or native room licences.",
  },
  {
    q: "Do you provide after-sales support?",
    a: "Yes — AMC contracts, manufacturer warranty on all Tenveo, InfoBit and DSPPA equipment, spare parts and a dedicated service team in Kathmandu.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Smart Meeting Room Design & Installation",
      provider: { "@type": "Organization", name: "AudioVisual Nepal", url: "https://www.audiovisualnepal.com" },
      areaServed: { "@type": "Country", name: "Nepal" },
      serviceType: "Audio visual system integration",
      url: PAGE_URL,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Solutions", item: "https://www.audiovisualnepal.com/solutions" },
        { "@type": "ListItem", position: 2, name: "Smart Meeting Rooms", item: PAGE_URL },
      ],
    },
  ],
};

export default function SmartMeetingRoomsPage() {
  return (
    <main className="pt-20 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-slate-900">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/heroes/smart-meeting-rooms-hero.webp"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        >
          <source src="/videos/solution-smart-meeting-rooms.mp4" type="video/mp4" />
          <source src="/videos/solution-smart-meeting-rooms.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
            <Link href="/solutions" className="hover:underline">Solutions</Link> / Smart meeting rooms
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold text-white sm:text-5xl" style={{ fontFamily: "Manrope, sans-serif", letterSpacing: "-0.03em" }}>
            Smart meeting room solutions in Nepal
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-200">
            One-touch hybrid meetings: AI cameras that frame the speaker, wireless presentation
            without dongles, and audio engineered so everyone is heard.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
              Request a Quote
            </Link>
            <a href="https://wa.me/+9779762109538" className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Reveal>
          <h2 className="text-3xl font-extrabold text-slate-900" style={{ fontFamily: "Manrope, sans-serif" }}>Explore the room</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Every device in a smart meeting room has a job. Click the pulse points to see what we
            install and why, then play the signal flow to see how it all connects.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <InteractiveScene config={smartMeetingRoomScene} />
        </Reveal>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-slate-900" style={{ fontFamily: "Manrope, sans-serif" }}>Systems we design</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {systems.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.06}>
                <Link
                  href={s.href}
                  className="group flex h-full gap-5 rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                >
                  <div className="relative h-20 w-20 shrink-0">
                    <Image src={s.img} alt={s.name} fill className="object-contain" sizes="80px" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600">{s.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Reveal>
          <h2 className="text-3xl font-extrabold text-slate-900" style={{ fontFamily: "Manrope, sans-serif" }}>Smart room references</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Smart meeting room references are shared on request during consultation — see our verified completed installations on the projects page.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-6">
          <Link href="/projects" className="text-sm font-semibold text-blue-600 hover:underline">
            View all projects →
          </Link>
        </Reveal>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-slate-900" style={{ fontFamily: "Manrope, sans-serif" }}>Frequently asked questions</h2>
          </Reveal>
          <div className="mt-8 divide-y divide-slate-200">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06}>
                <details className="group py-5">
                  <summary className="cursor-pointer list-none font-semibold text-slate-900">
                    {f.q}
                  </summary>
                  <p className="mt-2 text-sm text-slate-600">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
        <Reveal>
          <h2 className="text-3xl font-extrabold text-slate-900" style={{ fontFamily: "Manrope, sans-serif" }}>Have a meeting room project?</h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            Share your room dimensions and requirements — our engineers will design a system and quote it free.
          </p>
          <Link href="/contact" className="mt-8 inline-block rounded-full bg-blue-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
            Get a Free Consultation
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
