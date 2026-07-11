import type { Metadata } from "next";
import Link from "next/link";
import catalog from "@/data/infobit-catalog.json";
import { ALL_PRODUCTS } from "@/data/products";
import Image from "next/image";
import media from "@/data/infobit-catalog-media.json";

type MediaEntry = { slug: string; img: string; desc: string; source: string };
const MEDIA = media as Record<string, MediaEntry>;

const PAGE_URL = "https://audiovisualnepal.com/brands/infobit/catalog";

export const metadata: Metadata = {
  title: "InfoBit Product Catalog — Full Range in Nepal",
  description:
    "The complete InfoBit AV catalog available in Nepal: wireless presentation, video walls, matrix switching, AV over IP, Dante audio, cameras, conference systems, KVM, extenders, cables and mounts — 550+ models from the authorised distributor.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "InfoBit Product Catalog | AudioVisual Nepal",
    description: "Complete InfoBit range in Nepal — 550+ models across 28 categories.",
    url: PAGE_URL,
    type: "website",
  },
};

type GroupX = { type: string; models: string[]; featured?: boolean; featuredModels?: string[] };
type SeriesX = { name: string; groups: GroupX[]; featured?: boolean };

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function InfobitCatalogPage() {
  const detailPages = new Map(
    ALL_PRODUCTS.filter((p) => p.brandSlug === "infobit").map((p) => [
      p.name.replace(/^InfoBit\s+/i, "").toLowerCase(),
      `/products/${p.category}/${p.slug}`,
    ])
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "InfoBit product categories",
    itemListElement: catalog.categories.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.category,
      url: `${PAGE_URL}#${slug(c.category)}`,
    })),
  };

  return (
    <main className="pt-20 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-slate-200 bg-slate-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            <Link href="/brands/infobit" className="hover:underline">InfoBit</Link> / Full catalog
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-slate-900" style={{ fontFamily: "Manrope, sans-serif", letterSpacing: "-0.03em" }}>
            InfoBit product catalog
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            {catalog.totalModels}+ models across {catalog.categories.length} categories — every
            item available in Nepal with manufacturer warranty. Highlighted models link to full
            product pages; for anything else, quote it by model number.
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-slate-500">Distributor highlights</p>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            iMatrix M modular matrix · iWall X video wall controllers · iMatrix C604, HU44, UB44-V2, H44AM, H88AM ·
            iWall 104C &amp; 206 · iSwitch 265K AV-over-IP · iControl K06 · iSwitch 402UC &amp; 402KVM · iTrans E100HC3K,
            WP70HBC &amp; fiber extenders · iBox Flex2 table boxes · UC hubs · iSpeaker CM360 · iTrans DB44 Dante —
            marked with a <span className="rounded bg-blue-100 px-1.5 py-0.5 font-semibold text-blue-800">blue tag</span> below.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {catalog.categories.map((c) => (
              <a key={c.category} href={`#${slug(c.category)}`} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-blue-400 hover:text-blue-600">
                {c.category}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        {catalog.categories.map((c) => (
          <div key={c.category} id={slug(c.category)} className="scroll-mt-24 border-b border-slate-100 py-8">
            <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "Manrope, sans-serif" }}>
              {c.category}
            </h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {c.series.map((s) => (
                <details key={s.name} className={(s as SeriesX).featured ? "rounded-xl border-2 border-blue-300 bg-blue-50/40" : "rounded-xl border border-slate-200 open:border-blue-200 open:bg-slate-50"} open={c.series.length <= 2 || (s as SeriesX).featured}>
                  <summary className="cursor-pointer list-none px-5 py-3.5 font-semibold text-slate-800">
                    {s.name}
                    {(s as SeriesX).featured && (
                      <span className="ml-2 rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Featured</span>
                    )}
                    <span className="ml-2 text-xs font-normal text-slate-400">
                      {s.groups.reduce((n, g) => n + g.models.length, 0)} models
                    </span>
                  </summary>
                  <div className="px-5 pb-4">
                    {s.groups.map((g) => (
                      <div key={g.type} className="mt-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{g.type}</p>
                        {g.models.some((m) => MEDIA[m]) && (
                          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {g.models.filter((m) => MEDIA[m]).map((m) => {
                              const full = detailPages.get(m.toLowerCase());
                              const href = full || `/brands/infobit/p/${MEDIA[m].slug}`;
                              const hot = (g as GroupX).featuredModels?.includes(m) || (g as GroupX).featured;
                              return (
                                <Link key={m} href={href} className={hot ? "rounded-xl border-2 border-blue-300 bg-white p-3 transition hover:shadow-md" : "rounded-xl border border-slate-200 bg-white p-3 transition hover:border-blue-300 hover:shadow-md"}>
                                  <div className="relative mx-auto h-20 w-full">
                                    <Image src={MEDIA[m].img} alt={m} fill className="object-contain" sizes="140px" />
                                  </div>
                                  <p className="mt-2 truncate text-center text-xs font-semibold text-slate-800">{m}</p>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                        {g.models.some((m) => !MEDIA[m]) && (
                          <p className="mt-2 text-sm leading-relaxed text-slate-700">
                            {g.models.filter((m) => !MEDIA[m]).map((m, i, arr) => {
                              const href = detailPages.get(m.toLowerCase());
                              const hot = (g as GroupX).featuredModels?.includes(m) || (g as GroupX).featured;
                              const lite = `/brands/infobit/p/${slug(m)}`;
                              const inner = href ? (
                                <Link href={href} className="font-medium text-blue-600 hover:underline">{m}</Link>
                              ) : hot ? (
                                <Link href={lite} className="rounded bg-blue-100 px-1.5 py-0.5 font-semibold text-blue-800 hover:underline">{m}</Link>
                              ) : (
                                <Link href={lite} className="text-slate-700 hover:text-blue-600 hover:underline">{m}</Link>
                              );
                              return (
                                <span key={m}>
                                  {inner}
                                  {i < arr.length - 1 ? ", " : ""}
                                </span>
                              );
                            })}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 text-center">
        <div className="rounded-2xl bg-slate-50 p-8">
          <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "Manrope, sans-serif" }}>
            Need a model from this list?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            Send us the model number — we quote any InfoBit product with genuine manufacturer warranty.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">Request a quote</Link>
            <a href="https://wa.me/+9779762109538" className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-400">WhatsApp us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
