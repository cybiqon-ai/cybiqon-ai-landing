import LegalPage from "@/components/products/LegalPage";
import { legalMetadata } from "@/components/products/meta";

export const metadata = legalMetadata("vitaloop", "privacy");

export default function Page() {
  return <LegalPage slug="vitaloop" kind="privacy" />;
}
