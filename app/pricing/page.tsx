import type { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Website Development Pricing in India — from ₹9,999",
  description:
    "Transparent pricing for business websites, mobile apps and AI automation for Indian MSMEs. Fixed quotes, no hidden costs — websites start at ₹9,999.",
  keywords: "website development cost India, website price for small business, MSME website pricing, affordable web development India",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Website Development Pricing in India — from ₹9,999 | Cybiqon AI Solutions",
    description:
      "Transparent pricing for business websites, mobile apps and AI automation for Indian MSMEs. Fixed quotes, no hidden costs — websites start at ₹9,999.",
    url: "https://cybiqon.in/pricing",
    type: "website",
  },
};

export default function Page() {
  return <PricingClient />;
}
