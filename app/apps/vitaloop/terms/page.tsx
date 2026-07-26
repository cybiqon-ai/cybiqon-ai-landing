import LegalPage from "@/components/apps/LegalPage";
import { legalMetadata } from "@/components/apps/meta";

export const metadata = legalMetadata("vitaloop", "terms");

export default function Page() {
  return <LegalPage slug="vitaloop" kind="terms" />;
}
