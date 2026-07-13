import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const heading = { fontFamily: "Manrope, sans-serif" } as const;

export function A({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="text-blue-600 hover:underline">{children}</Link>;
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-10 text-2xl font-extrabold text-slate-900" style={heading}>{children}</h2>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 leading-relaxed text-slate-600">{children}</p>;
}

export default function ArticlePage({
  title, description, slug, hero, date, children,
}: {
  title: string; description: string; slug: string; hero: string; date: string; children: ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    author: { "@type": "Organization", name: "AudioVisual Nepal" },
    publisher: { "@type": "Organization", name: "AudioVisual Nepal", url: "https://www.audiovisualnepal.com" },
    mainEntityOfPage: `https://www.audiovisualnepal.com/blog/${slug}`,
  };
  return (
    <main className="pt-20 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          <Link href="/blog" className="hover:underline">Knowledge center</Link>
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl" style={{ ...heading, letterSpacing: "-0.02em" }}>
          {title}
        </h1>
        <p className="mt-3 text-slate-500">{description}</p>
        <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl bg-slate-900">
          <Image src={hero} alt={title} fill className="object-cover" />
        </div>
        {children}
        <div className="mt-12 rounded-2xl bg-slate-50 p-8 text-center">
          <h2 className="text-xl font-extrabold text-slate-900" style={heading}>Planning a system like this?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            Our engineers design and quote every project free, starting with a site survey.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/solution-finder" className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">Try the solution finder</Link>
            <Link href="/contact" className="rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">Request a consultation</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
