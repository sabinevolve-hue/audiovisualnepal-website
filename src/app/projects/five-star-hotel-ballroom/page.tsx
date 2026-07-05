import type { Metadata } from "next";
import CaseStudyPage from "@/components/solutions/CaseStudyPage";
import { CASE_STUDIES } from "@/data/caseStudies";

const cs = CASE_STUDIES.find((c) => c.slug === "five-star-hotel-ballroom")!;

export const metadata: Metadata = {
  title: `${cs.title} — AV Case Study`,
  description: cs.summary,
  alternates: { canonical: `https://audiovisualnepal.com/projects/${cs.slug}` },
  openGraph: { title: `${cs.title} — AV Case Study`, description: cs.summary, url: `https://audiovisualnepal.com/projects/${cs.slug}`, type: "article", images: [{ url: cs.hero, width: 1376, height: 768 }] },
};

export default function Page() {
  return <CaseStudyPage cs={cs} />;
}
