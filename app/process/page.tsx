import type { Metadata } from "next";
import ProcessClient from "./ProcessClient";

export const metadata: Metadata = {
  title: "Our Process — How We Build Your Website",
  description:
    "From the first conversation to launch: how we understand your business, design, build, review and ship your website — with clear timelines at every stage.",
  keywords: "web development process, how websites are built, website design steps India, web project timeline",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "Our Process — How We Build Your Website | Cybiqon AI Solutions",
    description:
      "From the first conversation to launch: how we understand your business, design, build, review and ship your website — with clear timelines at every stage.",
    url: "https://cybiqon.in/process",
    type: "website",
  },
};

export default function Page() {
  return <ProcessClient />;
}
