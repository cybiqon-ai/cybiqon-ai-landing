import AppDetail from "@/components/apps/AppDetail";
import { appMetadata } from "@/components/apps/meta";

export const metadata = appMetadata("llmbytes");

export default function Page() {
  return <AppDetail slug="llmbytes" />;
}
