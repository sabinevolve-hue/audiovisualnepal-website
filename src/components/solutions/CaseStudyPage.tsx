import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/solutions/Reveal";
import type { CaseStudy } from "@/data/caseStudies";
import { CASE_STUDIES } from "@/data/caseStudies";

const heading = { fontFamily: "Manrope, sans-serif" } as const;

export default function CaseStudyPage({ cs }: { cs: CaseStudy }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${cs.title} — AV case study`,
    about: cs.sector,
    author: { "@type": "Organization", name: "AudioVisual Nepal" },
    publisher: { "@type": "Organization", name: "AudioVisual Nepal", url: "https://www.audiovisualnepal.com" },
    mainEntityOfPage: `https://www.audiovisualnepal.com/projects/${cs.slug}`,
  };
  const related = CASE_STUDIES.filter((c) => c.slug !== cs.slug).slice(0, 3);

  return (
    <main className="pt-20 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-slate-900">
        <Image src={cs.hero} alt={`${cs.title} — completed installation`} fill priority className="object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-4xl px-6 pb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
            <Link href="/projects" className="hover:underline">Projects</Link> / {cs.sector}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl" style={{ ...heading, letterSpacing: "-0.03em" }}>
            {cs.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-200">{cs.summary}</p>
          <p className="mt-2 text-sm text-slate-400">{cs.location}, Nepal</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {cs.results.map((r) => (
            <div key={r.label} className="rounded-xl bg-slate-50 p-5">
              <p className="text-lg font-extrabold text-slate-900" style={heading}>{r.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{r.label}</p>
            </div>
          ))}
        </div>

        <Reveal className="mt-12">
          <h2 className="text-2xl font-extrabold text-slate-900" style={heading}>The challenge</h2>
          <p className="mt-3 leading-relaxed text-slate-600">{cs.challenge}</p>
        </Reveal>

        <Reveal className="mt-10">
          <h2 className="text-2xl font-extrabold text-slate-900" style={heading}>Our solution</h2>
          <p className="mt-3 leading-relaxed text-slate-600">{cs.solution}</p>
        </Reveal>

        <Reveal className="mt-10">
          <h2 className="text-2xl font-extrabold text-slate-900" style={heading}>Equipment used</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {cs.equipment.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="block rounded-xl border border-slate-200 p-4 text-sm font-medium text-slate-800 transition hover:border-blue-400 hover:text-blue-600">
                  {e.name} →
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-12 rounded-2xl bg-slate-50 p-8 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900" style={heading}>Planning a similar project?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            See the full {cs.sector.toLowerCase()} solution, or talk to the engineers who delivered this one.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href={cs.solutionHref} className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
              Explore the solution
            </Link>
            <Link href="/contact" className="rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
              Request a consultation
            </Link>
          </div>
        </Reveal>

        <div className="mt-12">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">More case studies</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map((c) => (
              <Link key={c.slug} href={`/projects/${c.slug}`} className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-400">
                <p className="text-xs text-slate-500">{c.sector}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{c.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
