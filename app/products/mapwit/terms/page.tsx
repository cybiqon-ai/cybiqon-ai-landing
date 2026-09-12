import LegalPage from "@/components/products/LegalPage";
import { legalMetadata } from "@/components/products/meta";

export const metadata = legalMetadata("mapwit", "terms");

export default function Page() {
  return <LegalPage slug="mapwit" kind="terms" />;
}
