import type { Metadata } from "next";
import CaseStudyPage from "@/components/solutions/CaseStudyPage";
import { CASE_STUDIES } from "@/data/caseStudies";

const cs = CASE_STUDIES.find((c) => c.slug === "siddhartha-bank-head-office")!;

export const metadata: Metadata = {
  title: `${cs.title} — Completed Project`,
  description: cs.summary,
  alternates: { canonical: `https://www.audiovisualnepal.com/projects/${cs.slug}` },
  openGraph: { title: `${cs.title} — Completed Project`, description: cs.summary, url: `https://www.audiovisualnepal.com/projects/${cs.slug}`, type: "article", images: [{ url: cs.hero }] },
};

export default function Page() {
  return <CaseStudyPage cs={cs} />;
}
