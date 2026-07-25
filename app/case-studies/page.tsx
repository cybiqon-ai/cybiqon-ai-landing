import type { Metadata } from "next";
import CaseStudiesClient from "./CaseStudiesClient";

export const metadata: Metadata = {
  title: "Case Studies — Real Projects, Real Results",
  description:
    "A closer look at what we built and what changed: from manual LinkedIn scraping to automated lead intelligence, and other projects with measurable outcomes.",
  keywords: "web development case study India, lead generation case study, MSME software case study",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies — Real Projects, Real Results | Cybiqon AI Solutions",
    description:
      "A closer look at what we built and what changed: from manual LinkedIn scraping to automated lead intelligence, and other projects with measurable outcomes.",
    url: "https://cybiqon.in/case-studies",
    type: "website",
  },
};

export default function Page() {
  return <CaseStudiesClient />;
}
