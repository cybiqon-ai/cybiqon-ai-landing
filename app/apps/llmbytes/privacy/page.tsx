import LegalPage from "@/components/apps/LegalPage";
import { legalMetadata } from "@/components/apps/meta";

export const metadata = legalMetadata("llmbytes", "privacy");

export default function Page() {
  return <LegalPage slug="llmbytes" kind="privacy" />;
}
