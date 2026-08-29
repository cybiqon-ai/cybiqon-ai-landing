import CategoryPage from "@/components/products/CategoryPage";
import { categoryMetadata } from "@/components/products/meta";

export const metadata = categoryMetadata("extensions");

export default function Page() {
  return <CategoryPage categorySlug="extensions" />;
}
