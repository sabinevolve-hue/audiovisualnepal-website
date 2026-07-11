import type { Metadata } from "next";
import CaseStudyPage from "@/components/solutions/CaseStudyPage";
import { CASE_STUDIES } from "@/data/caseStudies";

const cs = CASE_STUDIES.find((c) => c.slug === "fcube-cinemas")!;

export const metadata: Metadata = {
  title: `${cs.title} — Completed Project`,
  description: cs.summary,
  alternates: { canonical: `https://audiovisualnepal.com/projects/${cs.slug}` },
  openGraph: { title: `${cs.title} — Completed Project`, description: cs.summary, url: `https://audiovisualnepal.com/projects/${cs.slug}`, type: "article", images: [{ url: cs.hero }] },
};

export default function Page() {
  return <CaseStudyPage cs={cs} />;
}
