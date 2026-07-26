import LegalPage from "@/components/apps/LegalPage";
import { legalMetadata } from "@/components/apps/meta";

export const metadata = legalMetadata("meflow", "terms");

export default function Page() {
  return <LegalPage slug="meflow" kind="terms" />;
}
