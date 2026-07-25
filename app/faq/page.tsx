import type { Metadata } from "next";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Who we are, which businesses we work with, what it costs, how long it takes, and whether you need technical knowledge — answered plainly.",
  keywords: "web development FAQ India, website cost questions, MSME website help, hire developer FAQ",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Cybiqon AI Solutions",
    description:
      "Who we are, which businesses we work with, what it costs, how long it takes, and whether you need technical knowledge — answered plainly.",
    url: "https://cybiqon.in/faq",
    type: "website",
  },
};

export default function Page() {
  return <FaqClient />;
}
