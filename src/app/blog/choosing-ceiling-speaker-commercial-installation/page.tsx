import type { Metadata } from "next";
import ArticlePage, { A, H2, P } from "@/components/solutions/ArticlePage";

const TITLE = "How to Choose the Right Ceiling Speaker for Your Commercial Installation";
const DESC = "Driver size, power taps, sensitivity and backcans explained — what every specifier in Nepal should check before selecting a ceiling speaker.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "https://audiovisualnepal.com/blog/choosing-ceiling-speaker-commercial-installation" },
  openGraph: { title: TITLE, description: DESC, type: "article", images: [{ url: "/images/heroes/corporate-hero.webp" }] },
};

export default function Page() {
  return (
    <ArticlePage title={TITLE} description={DESC} slug="choosing-ceiling-speaker-commercial-installation" hero="/images/heroes/corporate-hero.webp" date="2026-07-05">
      <P>Ceiling speakers look interchangeable in a catalogue — white grille, round frame, done. Then the system goes live and speech is muddy at the back of the room, music distorts at volume, or half the zone is loud while the other half whispers. Almost every one of those problems traces back to four specifications that took thirty seconds each to check.</P>
      <H2>Driver size decides what the speaker is for</H2>
      <P>A 4-inch driver reproduces speech clearly and is fine for paging and announcements in corridors and small offices. For background music with any warmth you want 5–6.5 inches — the larger cone moves the air that music needs below 150Hz. Our most-installed all-rounder, the <A href="/products/ceiling-speakers/dsppa-dsp5211">DSPPA DSP5211 coaxial</A>, pairs a 6.5-inch woofer with a separate tweeter, which is why it handles both paging and BGM without sounding like a telephone.</P>
      <H2>Power taps matter more than watts</H2>
      <P>Commercial ceiling speakers in Nepal almost always run on 100V line systems, where each speaker is "tapped" at a power setting — typically 3W, 6W, or 10W. The tap, not the amplifier, sets each speaker's volume ceiling. The rule that saves projects: add up all taps, then choose an amplifier with at least 20% headroom. A corridor of twenty speakers tapped at 6W needs at least 150W of amplifier — not the 120W the arithmetic suggests.</P>
      <H2>Sensitivity is the hidden volume spec</H2>
      <P>Sensitivity (dB at 1W/1m) tells you how loud a speaker is per watt. The difference between 88dB and 91dB sounds trivial but means you need roughly half the amplifier power for the same loudness — a real cost difference across a 40-speaker campus. In noisy spaces like restaurants or terminals, prioritise sensitivity over rated wattage.</P>
      <H2>Backcans, fire dampers and Nepali ceilings</H2>
      <P>A backcan — the enclosure behind the speaker — protects the driver from dust, improves bass, and is required for plenum ceilings and fire-rated installations such as hospitals and hotels. Open-back speakers cost less and are acceptable in simple offices, but if the project involves <A href="/products/voice-evacuation">voice evacuation</A>, specify certified speakers with metal backcans and thermal fuses from the start — retrofitting them later means opening every ceiling again.</P>
      <H2>Quick selection checklist</H2>
      <P>Speech only: 4–5 inch, 3–6W taps, high sensitivity. Speech + music: 6.5-inch coaxial like the DSP5211, 6–10W taps. Life safety: EN54-path certified with backcan. And always: amplifier wattage = total taps + 20%. If a quotation lists speakers without taps and sensitivity, ask why — those two numbers are the design.</P>
    </ArticlePage>
  );
}
