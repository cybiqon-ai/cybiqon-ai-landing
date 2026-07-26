import LegalPage from "@/components/products/LegalPage";
import { legalMetadata } from "@/components/products/meta";

export const metadata = legalMetadata("meflow", "terms");

export default function Page() {
  return <LegalPage slug="meflow" kind="terms" />;
}
