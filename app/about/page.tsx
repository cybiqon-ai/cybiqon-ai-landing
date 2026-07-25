import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us — Why We Build for Indian MSMEs",
  description:
    "Cybiqon is a small Indian software studio building websites, apps and AI automation for MSMEs. Honest pricing, clear communication, no hidden surprises.",
  keywords: "about Cybiqon, Indian software company, MSME web development team, web development studio India",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us — Why We Build for Indian MSMEs | Cybiqon AI Solutions",
    description:
      "Cybiqon is a small Indian software studio building websites, apps and AI automation for MSMEs. Honest pricing, clear communication, no hidden surprises.",
    url: "https://cybiqon.in/about",
    type: "website",
  },
};

export default function Page() {
  return <AboutClient />;
}
