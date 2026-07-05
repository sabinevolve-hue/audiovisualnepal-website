"use client";

import { useState } from "react";
import Link from "next/link";

type Space = {
  id: string; label: string; href: string; solution: string;
  base: { name: string; href: string }[];
};

const SPACES: Space[] = [
  { id: "meeting", label: "Boardroom / meeting room", href: "/solutions/smart-meeting-rooms", solution: "Smart meeting room", base: [{ name: "Tenveo NV20A AI camera", href: "/products/conference-cameras/tenveo-nv20a-ai" }, { name: "InfoBit iShare X200", href: "/products/wireless-presentation/infobit-ishare-x200" }] },
  { id: "office", label: "Office building", href: "/solutions/corporate", solution: "Corporate office AV", base: [{ name: "InfoBit iCam VB60 video bar", href: "/products/video-conferencing/infobit-vb60" }, { name: "DSPPA DMA6112 matrix amplifier", href: "/products/amplifiers/dsppa-dma6112" }] },
  { id: "gov", label: "Government hall / chamber", href: "/solutions/government", solution: "Government conference & PA", base: [{ name: "Focus ST600 smart podium", href: "/products/smart-podiums/focus-st600" }, { name: "DSPPA MAG6182II IP PA server", href: "/products/ip-network-audio/dsppa-mag6182ii" }] },
  { id: "edu", label: "School / campus", href: "/solutions/education", solution: "Education & campus PA", base: [{ name: "Focus ST100 smart podium", href: "/products/smart-podiums/focus-st100" }, { name: "DSPPA MAG6182II IP PA server", href: "/products/ip-network-audio/dsppa-mag6182ii" }] },
  { id: "hotel", label: "Hotel / banquet venue", href: "/solutions/hotels", solution: "Hotel & ballroom AV", base: [{ name: "DSPPA DSP255II column speakers", href: "/products/column-speakers/dsppa-dsp255ii" }, { name: "DSPPA DMA6250U mixer amplifier", href: "/products/amplifiers/dsppa-dma6250u" }] },
  { id: "hospital", label: "Hospital / clinic", href: "/solutions/hospitals", solution: "Hospital PA & voice evacuation", base: [{ name: "DSPPA PAVA8500 voice evacuation", href: "/products/voice-evacuation/dsppa-pava8500" }, { name: "DSPPA MAG6806 IP paging", href: "/products/ip-network-audio/dsppa-mag6806" }] },
  { id: "worship", label: "Temple / mosque / church", href: "/solutions/religious", solution: "House of worship sound", base: [{ name: "DSPPA DSP255II column speakers", href: "/products/column-speakers/dsppa-dsp255ii" }, { name: "DSPPA DSP161HD horn speakers", href: "/products/horn-speakers/dsppa-dsp161hd" }] },
  { id: "transit", label: "Airport / bus park", href: "/solutions/transportation", solution: "Transit PA & passenger information", base: [{ name: "DSPPA MAG6182II Pro IP PA", href: "/products/ip-network-audio/dsppa-mag6182ii-pro" }, { name: "DSPPA DSP161HD horn speakers", href: "/products/horn-speakers/dsppa-dsp161hd" }] },
];

const SIZES = [
  { id: "small", label: "Single room (up to 20 people)", note: "A compact, one-room system — quick to install, simple to operate." },
  { id: "medium", label: "Multiple rooms / up to 200 people", note: "Zoned system with central control across several rooms or halls." },
  { id: "large", label: "Whole building or campus", note: "IP-networked backbone with zone control, scheduling and priority broadcast." },
];

const PRIORITIES = [
  { id: "vc", label: "Video conferencing", add: { name: "Tenveo NV20A AI camera", href: "/products/conference-cameras/tenveo-nv20a-ai" } },
  { id: "pa", label: "Announcements / PA", add: { name: "DSPPA MAG6182II IP PA server", href: "/products/ip-network-audio/dsppa-mag6182ii" } },
  { id: "bgm", label: "Background music", add: { name: "DSPPA DSP6011 ceiling speakers", href: "/products/ceiling-speakers/dsppa-dsp6011" } },
  { id: "evac", label: "Emergency / life safety", add: { name: "DSPPA PAVA8500 voice evacuation", href: "/products/voice-evacuation/dsppa-pava8500" } },
  { id: "present", label: "Presentation / displays", add: { name: "InfoBit iShare X400 wireless presentation", href: "/products/wireless-presentation/infobit-ishare-x400" } },
];

export default function SolutionFinder() {
  const [step, setStep] = useState(0);
  const [space, setSpace] = useState<Space | null>(null);
  const [size, setSize] = useState<(typeof SIZES)[0] | null>(null);
  const [prios, setPrios] = useState<string[]>([]);

  const togglePrio = (id: string) =>
    setPrios((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const products = space
    ? [...space.base, ...PRIORITIES.filter((p) => prios.includes(p.id)).map((p) => p.add)]
        .filter((v, i, a) => a.findIndex((x) => x.href === v.href) === i)
        .slice(0, 4)
    : [];

  const waText = space && size
    ? encodeURIComponent(`Hello! I used your solution finder. Space: ${space.label}. Size: ${size.label}. Needs: ${prios.map((id) => PRIORITIES.find((p) => p.id === id)?.label).join(", ") || "general AV"}. Please contact me with a recommendation.`)
    : "";

  const btn = "rounded-xl border border-slate-200 bg-white p-4 text-left text-sm font-medium text-slate-800 transition hover:border-blue-400 hover:shadow-md";
  const btnActive = "rounded-xl border-2 border-blue-500 bg-blue-50 p-4 text-left text-sm font-semibold text-blue-800";

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-blue-500" : "bg-slate-200"}`} />
        ))}
      </div>

      {step === 0 && (
        <div>
          <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: "Manrope, sans-serif" }}>What are you building?</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {SPACES.map((s) => (
              <button key={s.id} className={space?.id === s.id ? btnActive : btn} onClick={() => { setSpace(s); setStep(1); }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: "Manrope, sans-serif" }}>How big is the space?</h2>
          <div className="mt-5 grid gap-3">
            {SIZES.map((s) => (
              <button key={s.id} className={size?.id === s.id ? btnActive : btn} onClick={() => { setSize(s); setStep(2); }}>
                {s.label}
              </button>
            ))}
          </div>
          <button className="mt-5 text-sm text-slate-500 hover:underline" onClick={() => setStep(0)}>← Back</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: "Manrope, sans-serif" }}>What matters most? (choose any)</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {PRIORITIES.map((p) => (
              <button key={p.id} className={prios.includes(p.id) ? btnActive : btn} onClick={() => togglePrio(p.id)}>
                {p.label}
              </button>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4">
            <button className="rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600" onClick={() => setStep(3)}>
              See my recommendation
            </button>
            <button className="text-sm text-slate-500 hover:underline" onClick={() => setStep(1)}>← Back</button>
          </div>
        </div>
      )}

      {step === 3 && space && size && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Our recommendation</p>
          <h2 className="mt-2 text-2xl font-extrabold text-slate-900" style={{ fontFamily: "Manrope, sans-serif" }}>
            {space.solution}
          </h2>
          <p className="mt-2 text-sm text-slate-600">{size.note}</p>

          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-slate-900">Typical equipment for your space</p>
            <ul className="mt-3 space-y-2">
              {products.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-sm text-blue-600 hover:underline">{p.name} →</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={space.href} className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
              Explore the full solution
            </Link>
            <a href={`https://wa.me/+9779762109538?text=${waText}`} className="rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
              Send this to our engineers
            </a>
            <button className="text-sm text-slate-500 hover:underline" onClick={() => { setStep(0); setSpace(null); setSize(null); setPrios([]); }}>
              Start over
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Every project is confirmed with a free site survey before quotation.
          </p>
        </div>
      )}
    </div>
  );
}
