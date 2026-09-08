import ServiceDetail from "@/components/services/ServiceDetail";
import { serviceMetadata } from "@/components/services/meta";

export const metadata = serviceMetadata("ai-agents");

export default function Page() {
  return <ServiceDetail slug="ai-agents" />;
}
