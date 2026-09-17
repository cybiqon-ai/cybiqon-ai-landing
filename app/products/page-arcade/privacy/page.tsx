import LegalPage from "@/components/products/LegalPage";
import { legalMetadata } from "@/components/products/meta";

export const metadata = legalMetadata("page-arcade", "privacy");

export default function Page() {
  return <LegalPage slug="page-arcade" kind="privacy" />;
}
