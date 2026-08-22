import LegalPage from "@/components/products/LegalPage";
import { legalMetadata } from "@/components/products/meta";

export const metadata = legalMetadata("orbitone", "terms");

export default function Page() {
  return <LegalPage slug="orbitone" kind="terms" />;
}
