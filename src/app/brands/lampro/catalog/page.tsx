import type { Metadata } from "next";
import Link from "next/link";
import catalog from "@/data/lampro-catalog.json";
import { ALL_PRODUCTS } from "@/data/products";
import Image from "next/image";
import media from "@/data/lampro-catalog-media.json";

import BrandCatalog from "@/components/brands/BrandCatalog";
type MediaEntry = { slug: string; img: string; desc: string; source: string };
const MEDIA = media as Record<string, MediaEntry>;

const PAGE_URL = "https://www.audiovisualnepal.com/brands/lampro/catalog";

export const metadata: Metadata = {
  title: "Lampro Product Catalog — Full Range in Nepal",
  description:
    "The complete Lampro AV catalog available in Nepal: fine-pitch COB Mini LED, indoor creative splicing, rental and staging, outdoor DOOH and creative displays — 20 series models from the authorised distributor.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Lampro Product Catalog | AudioVisual Nepal",
    description: "Complete Lampro range in Nepal — 20 series across 7 display segments.",
    url: PAGE_URL,
    type: "website",
  },
};

type GroupX = { type: string; models: string[]; featured?: boolean; featuredModels?: string[] };
type SeriesX = { name: string; groups: GroupX[]; featured?: boolean };

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function LamproCatalogPage() {
  return (
    <BrandCatalog
      brand="Lampro"
      brandSlug="lampro"
      accent="#0F58FB"
      categories={catalog.categories as never}
      media={media as Record<string, MediaEntry>}
      totalModels={catalog.totalModels}
    />
  );
}
