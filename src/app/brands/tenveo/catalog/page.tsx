import type { Metadata } from "next";
import Link from "next/link";
import catalog from "@/data/tenveo-catalog.json";
import { ALL_PRODUCTS } from "@/data/products";
import Image from "next/image";
import media from "@/data/tenveo-catalog-media.json";

import BrandCatalog from "@/components/brands/BrandCatalog";
type MediaEntry = { slug: string; img: string; desc: string; source: string };
const MEDIA = media as Record<string, MediaEntry>;

const PAGE_URL = "https://www.audiovisualnepal.com/brands/tenveo/catalog";

export const metadata: Metadata = {
  title: "Tenveo Product Catalog — Full Range in Nepal",
  description:
    "The complete Tenveo AV catalog available in Nepal: PTZ cameras, 360° group kits, speakerphones, wireless conference, controllers and production gear — 50+ models from the authorised distributor.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Tenveo Product Catalog | AudioVisual Nepal",
    description: "Complete Tenveo range in Nepal — 50+ models across 6 categories.",
    url: PAGE_URL,
    type: "website",
  },
};

type GroupX = { type: string; models: string[]; featured?: boolean; featuredModels?: string[] };
type SeriesX = { name: string; groups: GroupX[]; featured?: boolean };

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function TenveoCatalogPage() {
  return (
    <BrandCatalog
      brand="Tenveo"
      brandSlug="tenveo"
      accent="#0891B2"
      categories={catalog.categories as never}
      media={media as Record<string, MediaEntry>}
      totalModels={catalog.totalModels}
    />
  );
}
