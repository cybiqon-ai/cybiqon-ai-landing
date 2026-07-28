import LegalPage from "@/components/products/LegalPage";
import { legalMetadata } from "@/components/products/meta";

export const metadata = legalMetadata("vitaloop", "terms");

export default function Page() {
  return <LegalPage slug="vitaloop" kind="terms" />;
}
