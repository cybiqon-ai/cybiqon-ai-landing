import ServiceDetail from "@/components/services/ServiceDetail";
import { serviceMetadata } from "@/components/services/meta";

export const metadata = serviceMetadata("admin-panels");

export default function Page() {
  return <ServiceDetail slug="admin-panels" />;
}
