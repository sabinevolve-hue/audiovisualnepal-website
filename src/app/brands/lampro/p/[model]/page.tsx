import type { Metadata } from "next";
import { notFound } from "next/navigation";
import catalog from "@/data/lampro-catalog.json";
import media from "@/data/lampro-catalog-media.json";
import { ALL_PRODUCTS } from "@/data/products";
import relations from "@/data/relations.json";
import CatalogProductShell from "@/components/products/CatalogProductShell";

type MediaEntry = { slug: string; img: string; desc: string; source: string; gallery?: string[] };
type Rel = { label: string; href: string };
const CATEGORY_SOLUTIONS = (relations as { categorySolutions: Record<string, Record<string, Rel[]>> }).categorySolutions["lampro"] || {};
const MEDIA = media as Record<string, MediaEntry>;
const BRAND = "Lampro";
const BRAND_COLOR = "#0F58FB";

type Props = { params: Promise<{ model: string }> };
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function fullPageSlugs(): Set<string> {
  return new Set(ALL_PRODUCTS.filter((pr) => pr.brandSlug === "lampro").map((pr) => pr.name.replace(new RegExp(`^${BRAND}\\s+`, "i"), "").toLowerCase()));
}

function findModel(modelSlug: string) {
  for (const cat of catalog.categories)
    for (const s of cat.series)
      for (const g of s.groups)
        for (const m of g.models)
          if (slugify(m) === modelSlug)
            return { model: m, category: cat.category, series: s.name, type: g.type, siblings: g.models };
  return null;
}

export function generateStaticParams() {
  const full = fullPageSlugs();
  const seen = new Set<string>();
  const out: { model: string }[] = [];
  for (const cat of catalog.categories)
    for (const s of cat.series)
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
    alternates: { canonical: `https://www.audiovisualnepal.com/brands/lampro/p/${model}` },
    openGraph: { title: `${BRAND} ${hit.model} | AudioVisual Nepal`, description: desc, ...(e ? { images: [{ url: e.img }] } : {}) },
  };
}

export default async function CatalogProductPage({ params }: Props) {
  const { model } = await params;
  const hit = findModel(model);
  if (!hit) notFound();
  const e = MEDIA[hit.model];
  const full = fullPageSlugs();

  const related = hit.siblings.filter((m) => m !== hit.model).slice(0, 4).map((m) => ({
    name: m,
    img: MEDIA[m]?.img,
    href: full.has(m.toLowerCase()) ? null : `/brands/lampro/p/${slugify(m)}`,
  }));

  const description = e?.desc || `${hit.model} is part of ${BRAND}'s ${hit.series} range (${hit.type.toLowerCase()}), within the ${hit.category.toLowerCase()} lineup we supply and support across Nepal — genuine product with manufacturer warranty.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${BRAND} ${hit.model}`,
    ...(e ? { image: `https://www.audiovisualnepal.com${e.img}` } : {}),
    description,
    brand: { "@type": "Brand", name: BRAND },
    category: hit.category,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CatalogProductShell
        brand={BRAND}
        brandSlug="lampro"
        brandColor={BRAND_COLOR}
        model={hit.model}
        category={hit.category}
        series={hit.series}
        type={hit.type}
        images={e ? [e.img, ...(e.gallery || [])] : []}
        description={description}
        hasMedia={!!e}
        whereFits={CATEGORY_SOLUTIONS[hit.category] || []}
        related={related}
        brandHref="/brands/lampro"
        catalogHref="/brands/lampro/catalog"
      />
    </>
  );
}
