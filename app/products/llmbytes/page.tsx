import ProductDetail from "@/components/products/ProductDetail";
import { productMetadata } from "@/components/products/meta";

export const metadata = productMetadata("llmbytes");

export default function Page() {
  return <ProductDetail slug="llmbytes" />;
}
