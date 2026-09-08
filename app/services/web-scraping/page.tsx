import ServiceDetail from "@/components/services/ServiceDetail";
import { serviceMetadata } from "@/components/services/meta";

export const metadata = serviceMetadata("web-scraping");

export default function Page() {
  return <ServiceDetail slug="web-scraping" />;
}
