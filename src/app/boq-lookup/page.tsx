import type { Metadata } from "next";
import BoqLookup from "@/components/solutions/BoqLookup";

const PAGE_URL = "https://audiovisualnepal.com/boq-lookup";

export const metadata: Metadata = {
  title: "BOQ Lookup — Check 860+ AV Models Instantly",
  description:
    "Paste model numbers from your BOQ or tender document and instantly check availability across DSPPA, InfoBit, Tenveo, Lampro and Focus — then request one quotation for the full list.",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "BOQ Lookup | AudioVisual Nepal", description: "Paste your BOQ, get availability and one quotation for the full list.", url: PAGE_URL, type: "website" },
};

export default function BoqPage() {
  return (
    <main className="pt-20 bg-white">
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">For consultants & procurement</p>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-900" style={{ fontFamily: "Manrope, sans-serif", letterSpacing: "-0.03em" }}>
          Check your BOQ against our catalog
        </h1>
        <p className="mt-3 text-slate-600">
          Working from a tender document or bill of quantities? Paste the model numbers below —
          we&apos;ll match them against 860+ models we supply and turn the whole list into one quotation request.
        </p>
        <div className="mt-8">
          <BoqLookup />
        </div>
      </section>
    </main>
  );
}
