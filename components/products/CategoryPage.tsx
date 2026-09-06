import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
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

      <section className="bg-surface pb-12 pt-32 lg:pb-16 lg:pt-40">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="t-label-sm mb-7 inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft weight="bold" aria-hidden className="h-3.5 w-3.5" />
            All products
          </Link>

          <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-end">
            <h1 className="t-h1 max-w-[18ch] text-primary">{cat.label}</h1>
            <p className="t-body text-muted-foreground lg:pb-1">{cat.blurb}</p>
          </div>
        </div>
      </section>

      <section className="bg-surface-lowest pb-20 pt-14 lg:pb-28">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <ProductIndex products={items} />
        </div>
      </section>
    </div>
  );
}
