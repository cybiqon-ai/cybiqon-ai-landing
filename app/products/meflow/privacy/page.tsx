import LegalPage from "@/components/products/LegalPage";
import { legalMetadata } from "@/components/products/meta";

export const metadata = legalMetadata("meflow", "privacy");

export default function Page() {
  return <LegalPage slug="meflow" kind="privacy" />;
}
