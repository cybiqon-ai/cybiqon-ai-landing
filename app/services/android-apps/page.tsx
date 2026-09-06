import ServiceDetail from "@/components/services/ServiceDetail";
import { serviceMetadata } from "@/components/services/meta";

export const metadata = serviceMetadata("android-apps");

export default function Page() {
  return <ServiceDetail slug="android-apps" />;
}
