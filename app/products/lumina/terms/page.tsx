import LegalPage from "@/components/products/LegalPage";
import { legalMetadata } from "@/components/products/meta";

export const metadata = legalMetadata("lumina", "terms");

export default function Page() {
  return <LegalPage slug="lumina" kind="terms" />;
}
