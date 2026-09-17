import LegalPage from "@/components/products/LegalPage";
import { legalMetadata } from "@/components/products/meta";

export const metadata = legalMetadata("page-arcade", "terms");

export default function Page() {
  return <LegalPage slug="page-arcade" kind="terms" />;
}
