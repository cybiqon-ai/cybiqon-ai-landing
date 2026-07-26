import CategoryPage from "@/components/products/CategoryPage";
import { categoryMetadata } from "@/components/products/meta";

export const metadata = categoryMetadata("apps");

export default function Page() {
  return <CategoryPage categorySlug="apps" />;
}
