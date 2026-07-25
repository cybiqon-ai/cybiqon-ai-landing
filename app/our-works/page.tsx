import type { Metadata } from "next";
import OurWorksClient from "./OurWorksClient";

export const metadata: Metadata = {
  title: "Our Work — Websites, Apps & Automations We've Built",
  description:
    "See the websites, Chrome extensions and 3D experiences we've built for businesses — e-commerce, booking systems, delivery platforms and lead-generation tools.",
  keywords: "web development portfolio India, website examples, MSME website portfolio, Chrome extension development India",
  alternates: { canonical: "/our-works" },
  openGraph: {
    title: "Our Work — Websites, Apps & Automations We've Built | Cybiqon AI Solutions",
    description:
      "See the websites, Chrome extensions and 3D experiences we've built for businesses — e-commerce, booking systems, delivery platforms and lead-generation tools.",
    url: "https://cybiqon.in/our-works",
    type: "website",
  },
};

export default function Page() {
  return <OurWorksClient />;
}
