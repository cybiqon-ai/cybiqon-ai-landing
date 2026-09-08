import ServiceDetail from "@/components/services/ServiceDetail";
import { serviceMetadata } from "@/components/services/meta";

export const metadata = serviceMetadata("whatsapp-automation");

export default function Page() {
  return <ServiceDetail slug="whatsapp-automation" />;
}
