import type { Metadata } from "next";
import SiteLegalPage from "@/components/SiteLegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Cybiqon AI Solutions LLP collects on cybiqon.in, which processors it reaches, and how to ask for a copy, a correction or deletion under India's DPDP Act 2023.",
  keywords: "Cybiqon privacy policy, DPDP Act, data protection India",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return <SiteLegalPage kind="privacy" />;
}
