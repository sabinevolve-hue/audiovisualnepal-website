import type { Metadata } from "next";
import Link from "next/link";
import catalog from "@/data/infobit-catalog.json";
import { ALL_PRODUCTS } from "@/data/products";
import Image from "next/image";
import media from "@/data/infobit-catalog-media.json";

import BrandCatalog from "@/components/brands/BrandCatalog";
type MediaEntry = { slug: string; img: string; desc: string; source: string };
const MEDIA = media as Record<string, MediaEntry>;

const PAGE_URL = "https://www.audiovisualnepal.com/brands/infobit/catalog";

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
  return (
    <BrandCatalog
      brand="InfoBit"
      brandSlug="infobit"
      accent="#6366F1"
      categories={catalog.categories as never}
      media={media as Record<string, MediaEntry>}
      totalModels={catalog.totalModels}
    />
  );
}
