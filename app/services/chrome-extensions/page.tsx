import ServiceDetail from "@/components/services/ServiceDetail";
import { serviceMetadata } from "@/components/services/meta";

export const metadata = serviceMetadata("chrome-extensions");

export default function Page() {
  return <ServiceDetail slug="chrome-extensions" />;
}
