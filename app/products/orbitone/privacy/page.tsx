import LegalPage from "@/components/products/LegalPage";
import { legalMetadata } from "@/components/products/meta";

export const metadata = legalMetadata("orbitone", "privacy");

export default function Page() {
  return <LegalPage slug="orbitone" kind="privacy" />;
}
