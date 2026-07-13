import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import catalog from "@/data/dsppa-catalog.json";
import media from "@/data/dsppa-catalog-media.json";
import { ALL_PRODUCTS } from "@/data/products";
import relations from "@/data/relations.json";
import ImageGallery from "@/components/solutions/ImageGallery";

type MediaEntry = { slug: string; img: string; desc: string; source: string; gallery?: string[] };
type Rel = { label: string; href: string };
const CATEGORY_SOLUTIONS = (relations as { categorySolutions: Record<string, Record<string, Rel[]>> }).categorySolutions["dsppa"] || {};
const MEDIA = media as Record<string, MediaEntry>;
const BRAND = "DSPPA";

type Props = { params: Promise<{ model: string }> };

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function fullPageSlugs(): Set<string> {
  return new Set(
    ALL_PRODUCTS.filter((p) => p.brandSlug === "dsppa").map((p) =>
      p.name.replace(new RegExp(`^${BRAND}\\s+`, "i"), "").toLowerCase()
    )
  );
}

function findModel(modelSlug: string) {
  for (const c of catalog.categories)
    for (const s of c.series)
      for (const g of s.groups)
        for (const m of g.models)
          if (slugify(m) === modelSlug)
            return { model: m, category: c.category, series: s.name, type: g.type, siblings: g.models };
  return null;
}

export function generateStaticParams() {
  const full = fullPageSlugs();
  const seen = new Set<string>();
  const out: { model: string }[] = [];
  for (const c of catalog.categories)
    for (const s of c.series)
      for (const g of s.groups)
        for (const m of g.models) {
          const sl = slugify(m);
          if (full.has(m.toLowerCase()) || seen.has(sl)) continue;
          seen.add(sl);
          out.push({ model: sl });
        }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { model } = await params;
  const hit = findModel(model);
  if (!hit) return { title: "Product not found" };
  const e = MEDIA[hit.model];
  const desc = (e?.desc || `${BRAND} ${hit.model} — ${hit.type} in the ${hit.series} series. Available in Nepal from the authorised ${BRAND} distributor with manufacturer warranty.`).slice(0, 160);
  return {
    title: `${BRAND} ${hit.model} in Nepal — ${hit.type}`,
    description: desc,
    alternates: { canonical: `https://www.audiovisualnepal.com/brands/dsppa/p/${model}` },
    openGraph: { title: `${BRAND} ${hit.model} | AudioVisual Nepal`, description: desc, ...(e ? { images: [{ url: e.img }] } : {}) },
  };
}

export default async function CatalogProductPage({ params }: Props) {
  const { model } = await params;
  const hit = findModel(model);
  if (!hit) notFound();
  const e = MEDIA[hit.model];
  const full = fullPageSlugs();
  const related = hit.siblings.filter((m) => m !== hit.model).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${BRAND} ${hit.model}`,
    ...(e ? { image: `https://www.audiovisualnepal.com${e.img}` } : {}),
    description: e?.desc || `${hit.type} — ${hit.series} series`,
    brand: { "@type": "Brand", name: BRAND },
    category: hit.category,
  };

  return (
    <main className="pt-20 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          <Link href="/brands/dsppa" className="hover:underline">{BRAND}</Link>
          {" / "}
          <Link href="/brands/dsppa/catalog" className="hover:underline">Catalog</Link>
          {" / "}{hit.category}
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          {e ? (
            <ImageGallery images={[e.img, ...(e.gallery || [])]} alt={`${BRAND} ${hit.model}`} />
          ) : (
            <div className="relative flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-200 text-4xl font-black text-slate-400">
                  {BRAND.charAt(0)}
                </div>
                <p className="mt-4 text-sm text-slate-400">Photos available on request — genuine product</p>
              </div>
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-blue-600">{hit.series} · {hit.type}</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl" style={{ fontFamily: "Manrope, sans-serif", letterSpacing: "-0.02em" }}>
              {BRAND} {hit.model}
            </h1>
            <p className="mt-4 leading-relaxed text-slate-600">
              {e?.desc || `${hit.model} is part of ${BRAND}'s ${hit.series} range (${hit.type.toLowerCase()}), within the ${hit.category.toLowerCase()} lineup we distribute in Nepal.`}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Genuine {BRAND} product with full manufacturer warranty, supplied and supported in Nepal
              by the authorised distributor. Detailed specifications and datasheets available on request.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
                Request a quote
              </Link>
              <a href={`https://wa.me/+9779762109538?text=${encodeURIComponent(`Hello! I'd like a quote for the ${BRAND} ${hit.model}.`)}`} className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-400">
                WhatsApp us
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-500">We reply with a formal quotation within 24 hours on working days.</p>
            {(CATEGORY_SOLUTIONS[hit.category] || []).length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Where this fits</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(CATEGORY_SOLUTIONS[hit.category] || []).map((r) => (
                    <Link key={r.href} href={r.href} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-blue-400 hover:text-blue-600">
                      {r.label} →
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {e && <p className="mt-4 text-xs text-slate-400">Product summary courtesy of {BRAND}. Images © {BRAND}.</p>}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Related models in {hit.series}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((m) => {
                const me = MEDIA[m];
                const href = full.has(m.toLowerCase()) ? null : `/brands/dsppa/p/${slugify(m)}`;
                const card = (
                  <div className="h-full rounded-xl border border-slate-200 p-4 transition hover:border-blue-400">
                    {me ? (
                      <div className="relative mx-auto h-24 w-24">
                        <Image src={me.img} alt={m} fill className="object-contain" sizes="96px" />
                      </div>
                    ) : (
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-xl bg-slate-100 text-2xl font-black text-slate-300">
                        {BRAND.charAt(0)}
                      </div>
                    )}
                    <p className="mt-2 text-center text-sm font-medium text-slate-800">{m}</p>
                  </div>
                );
                return href ? <Link key={m} href={href}>{card}</Link> : <div key={m}>{card}</div>;
              })}
            </div>
          </div>
        )}

        <div className="mt-14 flex flex-wrap items-center gap-3 rounded-2xl bg-slate-50 p-5 text-sm">
          <span className="font-semibold text-slate-700">Keep exploring:</span>
          <Link href="/brands/dsppa/catalog" className="text-blue-600 hover:underline">Full {BRAND} catalog</Link>
          <span className="text-slate-300">•</span>
          <Link href="/boq-lookup" className="text-blue-600 hover:underline">Check a whole BOQ at once</Link>
          <span className="text-slate-300">•</span>
          <Link href="/solution-finder" className="text-blue-600 hover:underline">Solution finder</Link>
        </div>
      </section>
    </main>
  );
}
