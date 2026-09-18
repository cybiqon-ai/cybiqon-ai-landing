import LegalPage from "@/components/products/LegalPage";
import { legalMetadata } from "@/components/products/meta";

export const metadata = legalMetadata("chitrayatra", "terms");

export default function Page() {
  return <LegalPage slug="chitrayatra" kind="terms" />;
}
