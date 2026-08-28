import LegalPage from "@/components/products/LegalPage";
import { legalMetadata } from "@/components/products/meta";

export const metadata = legalMetadata("curvved", "terms");

export default function Page() {
  return <LegalPage slug="curvved" kind="terms" />;
}
