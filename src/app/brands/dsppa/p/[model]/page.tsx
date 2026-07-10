import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import catalog from "@/data/dsppa-catalog.json";
import media from "@/data/dsppa-catalog-media.json";
import { ALL_PRODUCTS } from "@/data/products";

type MediaEntry = { slug: string; img: string; desc: string; source: string };
const MEDIA = media as Record<string, MediaEntry>;

type Props = { params: Promise<{ model: string }> };

function fullPageSlugs(): Set<string> {
  return new Set(
    ALL_PRODUCTS.filter((p) => p.brandSlug === "dsppa").map((p) =>
      p.name.replace(/^DSPPA\s+/i, "").toLowerCase()
    )
  );
}

function findModel(modelSlug: string) {
  for (const c of catalog.categories)
    for (const s of c.series)
      for (const g of s.groups)
        for (const m of g.models)
          if (MEDIA[m]?.slug === modelSlug)
            return { model: m, category: c.category, series: s.name, type: g.type, siblings: g.models };
  return null;
}

export function generateStaticParams() {
  const full = fullPageSlugs();
  return Object.entries(MEDIA)
    .filter(([model]) => !full.has(model.toLowerCase()))
    .map(([, e]) => ({ model: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { model } = await params;
  const hit = findModel(model);
  if (!hit) return { title: "Product not found" };
  const e = MEDIA[hit.model];
  const desc = e.desc || `DSPPA ${hit.model} — ${hit.type} in the ${hit.series} series. Available in Nepal from the authorised DSPPA distributor with manufacturer warranty.`;
  return {
    title: `DSPPA ${hit.model} in Nepal — ${hit.type}`,
    description: desc.slice(0, 160),
    alternates: { canonical: `https://audiovisualnepal.com/brands/dsppa/p/${model}` },
    openGraph: { title: `DSPPA ${hit.model} | AudioVisual Nepal`, description: desc.slice(0, 160), images: [{ url: e.img }] },
  };
}

export default async function CatalogProductPage({ params }: Props) {
  const { model } = await params;
  const hit = findModel(model);
  if (!hit) notFound();
  const e = MEDIA[hit.model];
  const full = fullPageSlugs();

  const related = hit.siblings.filter((m) => m !== hit.model && MEDIA[m]).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `DSPPA ${hit.model}`,
    image: `https://audiovisualnepal.com${e.img}`,
    description: e.desc || `${hit.type} — ${hit.series} series`,
    brand: { "@type": "Brand", name: "DSPPA" },
    category: hit.category,
  };

  return (
    <main className="pt-20 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          <Link href="/brands/dsppa" className="hover:underline">DSPPA</Link>
          {" / "}
          <Link href="/brands/dsppa/catalog" className="hover:underline">Catalog</Link>
          {" / "}{hit.category}
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="relative flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <Image src={e.img} alt={`DSPPA ${hit.model}`} width={640} height={480} className="h-auto max-h-[420px] w-auto object-contain" priority />
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-600">{hit.series} · {hit.type}</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl" style={{ fontFamily: "Manrope, sans-serif", letterSpacing: "-0.02em" }}>
              DSPPA {hit.model}
            </h1>
            {e.desc && <p className="mt-4 leading-relaxed text-slate-600">{e.desc}</p>}
            <p className="mt-4 text-sm text-slate-500">
              Genuine DSPPA product with full manufacturer warranty, supplied and supported in Nepal
              by the authorised distributor. Detailed specifications and datasheets available on request.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
                Request a quote
              </Link>
              <a href={`https://wa.me/+9779762109538?text=${encodeURIComponent(`Hello! I'd like a quote for the DSPPA ${hit.model}.`)}`} className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-400">
                WhatsApp us
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-400">Product summary courtesy of DSPPA. Images © DSPPA.</p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Related models in {hit.series}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((m) => {
                const me = MEDIA[m];
                const href = full.has(m.toLowerCase())
                  ? undefined
                  : `/brands/dsppa/p/${me.slug}`;
                const card = (
                  <div className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-400">
                    <div className="relative mx-auto h-24 w-24">
                      <Image src={me.img} alt={m} fill className="object-contain" sizes="96px" />
                    </div>
                    <p className="mt-2 text-center text-sm font-medium text-slate-800">{m}</p>
                  </div>
                );
                return href ? <Link key={m} href={href}>{card}</Link> : <div key={m}>{card}</div>;
              })}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
