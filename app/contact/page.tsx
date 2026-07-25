import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — WhatsApp or Book a Free Call",
  description:
    "Ask anything about our process, pricing or timeline. No jargon, no sales pitch. Reach us on WhatsApp at +91 92507 11473 or book a free 30-minute call.",
  keywords: "contact web developer India, hire website developer, WhatsApp web development enquiry, book consultation",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us — WhatsApp or Book a Free Call | Cybiqon AI Solutions",
    description:
      "Ask anything about our process, pricing or timeline. No jargon, no sales pitch. Reach us on WhatsApp at +91 92507 11473 or book a free 30-minute call.",
    url: "https://cybiqon.in/contact",
    type: "website",
  },
};

export default function Page() {
  return <ContactClient />;
}
