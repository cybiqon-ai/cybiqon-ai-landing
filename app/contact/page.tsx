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
    images: [
      {
        url: "/og/contact.png",
        width: 1200,
        height: 630,
        alt: "Talk to the people who build it — Cybiqon AI Solutions",
      },
    ],
  },
};

export default function Page() {
  return <ContactClient />;
}
