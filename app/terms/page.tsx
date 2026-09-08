import type { Metadata } from "next";
import SiteLegalPage from "@/components/SiteLegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "How Cybiqon AI Solutions LLP works: published one-time prices, 50/50 payment over ₹20,000, and full source code ownership transferred to you on final payment.",
  keywords: "Cybiqon terms of service, service agreement, web development contract India",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return <SiteLegalPage kind="terms" />;
}
