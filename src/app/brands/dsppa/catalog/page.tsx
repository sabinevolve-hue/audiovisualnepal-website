import type { Metadata } from "next";
import Link from "next/link";
import catalog from "@/data/dsppa-catalog.json";
import { ALL_PRODUCTS } from "@/data/products";
import Image from "next/image";
import media from "@/data/dsppa-catalog-media.json";

import BrandCatalog from "@/components/brands/BrandCatalog";
type MediaEntry = { slug: string; img: string; desc: string; source: string };
const MEDIA = media as Record<string, MediaEntry>;

const PAGE_URL = "https://www.audiovisualnepal.com/brands/dsppa/catalog";

export const metadata: Metadata = {
  title: "DSPPA Product Catalog — Full Range in Nepal",
  description:
    "The complete DSPPA AV catalog available in Nepal: mixer amplifiers, ceiling/wall/column speakers, horn speakers, EN54 fireproof, high-performance series, voice evacuation and IP audio — 200+ models from the authorised distributor.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "DSPPA Product Catalog | AudioVisual Nepal",
    description: "Complete DSPPA range in Nepal — 200+ models across 11 categories.",
    url: PAGE_URL,
    type: "website",
  },
};

type GroupX = { type: string; models: string[]; featured?: boolean; featuredModels?: string[] };
type SeriesX = { name: string; groups: GroupX[]; featured?: boolean };

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function DsppaCatalogPage() {
  return (
    <BrandCatalog
      brand="DSPPA"
      brandSlug="dsppa"
      accent="#00AEAD"
      categories={catalog.categories as never}
      media={media as Record<string, MediaEntry>}
      totalModels={catalog.totalModels}
    />
  );
}
