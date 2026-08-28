import ProductDetail from "@/components/products/ProductDetail";
import { productMetadata } from "@/components/products/meta";

export const metadata = productMetadata("curvved");

export default function Page() {
  return <ProductDetail slug="curvved" />;
}
