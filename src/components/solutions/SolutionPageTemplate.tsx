import Image from "next/image";
import Link from "next/link";
import InteractiveScene, { type SceneConfig } from "@/components/solutions/InteractiveScene";
import Reveal from "@/components/solutions/Reveal";
import { SOLUTIONS_NAV } from "@/lib/constants";

export type SolutionSystem = { name: string; desc: string; href: string; img: string };
export type SolutionFaq = { q: string; a: string };
export type SolutionProject = { title: string; location: string };

export type SolutionPageData = {
  pageUrl: string;
  serviceName: string;
  heroImage: string;
  heroAlt: string;
  kicker: string;
  h1: string;
  intro: string;
  sceneIntro: string;
  scene: SceneConfig;
  systems: SolutionSystem[];
  projectsBlurb: string;
  projects: SolutionProject[];
  faqs: SolutionFaq[];
};

const heading = { fontFamily: "Manrope, sans-serif" } as const;

export default function SolutionPageTemplate({ data }: { data: SolutionPageData }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: data.serviceName,
        provider: { "@type": "Organization", name: "AudioVisual Nepal", url: "https://audiovisualnepal.com" },
        areaServed: { "@type": "Country", name: "Nepal" },
        serviceType: "Audio visual system integration",
        url: data.pageUrl,
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Solutions", item: "https://audiovisualnepal.com/solutions" },
          { "@type": "ListItem", position: 2, name: data.kicker, item: data.pageUrl },
        ],
      },
    ],
  };

  return (
    <main className="pt-20 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-slate-900">
        <Image src={data.heroImage} alt={data.heroAlt} fill priority className="object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
            <Link href="/solutions" className="hover:underline">Solutions</Link> / {data.kicker}
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold text-white sm:text-5xl" style={{ ...heading, letterSpacing: "-0.03em" }}>
            {data.h1}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-200">{data.intro}</p>
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
          <h2 className="text-3xl font-extrabold text-slate-900" style={heading}>Explore the space</h2>
          <p className="mt-2 max-w-2xl text-slate-600">{data.sceneIntro}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <InteractiveScene config={data.scene} />
        </Reveal>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-slate-900" style={heading}>Systems we design</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {data.systems.map((s, i) => (
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
          <h2 className="text-3xl font-extrabold text-slate-900" style={heading}>Reference projects</h2>
          <p className="mt-2 max-w-2xl text-slate-600">{data.projectsBlurb}</p>
        </Reveal>
        {data.projects.length > 0 && (
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {data.projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-bold text-slate-900">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{p.location}</p>
              </div>
            </Reveal>
          ))}
        </div>
        )}
        <Reveal delay={0.2} className="mt-6">
          <Link href="/projects" className="text-sm font-semibold text-blue-600 hover:underline">
            View all projects →
          </Link>
        </Reveal>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-slate-900" style={heading}>Frequently asked questions</h2>
          </Reveal>
          <div className="mt-8 divide-y divide-slate-200">
            {data.faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06}>
                <details className="group py-5">
                  <summary className="cursor-pointer list-none font-semibold text-slate-900">{f.q}</summary>
                  <p className="mt-2 text-sm text-slate-600">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Related solutions</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SOLUTIONS_NAV.filter((s) => !data.pageUrl.endsWith(s.href)).slice(0, 7).map((s) => (
            <Link key={s.href} href={s.href} className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-600 transition hover:border-blue-400 hover:text-blue-600">
              {s.label}
            </Link>
          ))}
          <Link href="/boq-lookup" className="rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-700">
            Have a BOQ? Check it instantly →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
        <Reveal>
          <h2 className="text-3xl font-extrabold text-slate-900" style={heading}>Have a project in mind?</h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            Share your requirements — our engineers will design a system and quote it free.
          </p>
          <Link href="/contact" className="mt-8 inline-block rounded-full bg-blue-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
            Get a Free Consultation
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
