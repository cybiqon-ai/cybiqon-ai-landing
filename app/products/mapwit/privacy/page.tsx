import LegalPage from "@/components/products/LegalPage";
import { legalMetadata } from "@/components/products/meta";

export const metadata = legalMetadata("mapwit", "privacy");

export default function Page() {
  return <LegalPage slug="mapwit" kind="privacy" />;
}
