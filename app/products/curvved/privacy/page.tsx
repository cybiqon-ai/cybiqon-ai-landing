import LegalPage from "@/components/products/LegalPage";
import { legalMetadata } from "@/components/products/meta";

export const metadata = legalMetadata("curvved", "privacy");

export default function Page() {
  return <LegalPage slug="curvved" kind="privacy" />;
}
