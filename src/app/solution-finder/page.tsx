import type { Metadata } from "next";
import SolutionFinder from "@/components/solutions/SolutionFinder";

const PAGE_URL = "https://audiovisualnepal.com/solution-finder";

export const metadata: Metadata = {
  title: "AV Solution Finder — Get a Recommendation in 30 Seconds",
  description:
    "Answer three quick questions about your space and get a recommended AV system — meeting rooms, PA, background music, voice evacuation and more, tailored for Nepal.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "AV Solution Finder | AudioVisual Nepal",
    description: "Answer three quick questions and get a recommended AV system for your space.",
    url: PAGE_URL,
    type: "website",
  },
};

export default function SolutionFinderPage() {
  return (
    <main className="pt-20 bg-white">
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Solution finder</p>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-900" style={{ fontFamily: "Manrope, sans-serif", letterSpacing: "-0.03em" }}>
          Find the right AV system in 30 seconds
        </h1>
        <p className="mt-3 text-slate-600">
          Three quick questions — we&apos;ll point you to the right solution and the equipment we&apos;d start with.
        </p>
        <div className="mt-8">
          <SolutionFinder />
        </div>
      </section>
    </main>
  );
}
