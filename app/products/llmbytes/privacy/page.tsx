import LegalPage from "@/components/products/LegalPage";
import { legalMetadata } from "@/components/products/meta";

export const metadata = legalMetadata("llmbytes", "privacy");

export default function Page() {
  return <LegalPage slug="llmbytes" kind="privacy" />;
}
