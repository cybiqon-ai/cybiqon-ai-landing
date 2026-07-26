import AppDetail from "@/components/apps/AppDetail";
import { appMetadata } from "@/components/apps/meta";

export const metadata = appMetadata("vitaloop");

export default function Page() {
  return <AppDetail slug="vitaloop" />;
}
