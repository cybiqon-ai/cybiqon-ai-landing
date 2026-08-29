import CategoryPage from "@/components/products/CategoryPage";
import { categoryMetadata } from "@/components/products/meta";

export const metadata = categoryMetadata("games");

export default function Page() {
  return <CategoryPage categorySlug="games" />;
}
