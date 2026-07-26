import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import ProductIndex from "./ProductIndex";
import { CATEGORIES, productsIn } from "@/data/products";

const siteUrl = "https://cybiqon.in";

/** Shared body for /products/apps, /products/extensions and any future category. */
export default function CategoryPage({ categorySlug }: { categorySlug: string }) {
  const cat = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!cat) notFound();
  const items = productsIn(cat.key);
  if (items.length === 0) notFound(); // an empty category page is a thin page

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products` },
      {
        "@type": "ListItem",
        position: 3,
        name: cat.label,
        item: `${siteUrl}/products/${cat.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-[60vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="pt-28 pb-10 md:pt-32 md:pb-14">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <Link
            href="/products"
            className="mb-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft strokeWidth={1.5} className="h-3.5 w-3.5" />
            All products
          </Link>

          <div className="grid gap-6 md:grid-cols-[1fr_18rem] md:items-end">
            <h1 className="max-w-xl text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-4xl">
              {cat.label}
            </h1>
            <p className="text-[15px] leading-relaxed text-muted-foreground md:pb-1">
              {cat.blurb}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <ProductIndex products={items} />
        </div>
      </section>
    </div>
  );
}
