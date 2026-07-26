import type { Metadata } from "next";
import Link from "next/link";
import ProductIndex from "@/components/products/ProductIndex";
import { PRODUCTS, activeCategories, productsIn } from "@/data/products";

const siteUrl = "https://cybiqon.in";

export const metadata: Metadata = {
  title: "Products We've Built and Shipped",
  description:
    "The apps, extensions and tools Cybiqon has built and published — including LLMBytes, MeFlow and VitaLoop on Android.",
  keywords: "Cybiqon products, Android apps, Chrome extensions, LLMBytes, MeFlow, VitaLoop",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products We've Built and Shipped | Cybiqon AI Solutions",
    description:
      "Apps, extensions and tools built and shipped by a one-person studio in India.",
    url: `${siteUrl}/products`,
    type: "website",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products` },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Cybiqon products",
  itemListElement: PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": p.category === "app" ? "MobileApplication" : "SoftwareApplication",
      name: p.name,
      description: p.summary,
      url: `${siteUrl}/products/${p.slug}`,
    },
  })),
};

export default function ProductsPage() {
  const categories = activeCategories();
  let counter = 1;

  return (
    <div className="min-h-[60vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <section className="pt-28 pb-10 md:pt-32 md:pb-14">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-6 md:grid-cols-[1fr_18rem] md:items-end">
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Products
              </p>
              <h1 className="max-w-xl text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-4xl">
                What we&apos;ve built and shipped.
              </h1>
            </div>
            <p className="text-[15px] leading-relaxed text-muted-foreground md:pb-1">
              We build for clients, and we build for ourselves. These are the ones with our
              own name on them — same standard, no client to blame.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16 space-y-14">
          {categories.map((cat) => {
            const items = productsIn(cat.key);
            const start = counter;
            counter += items.length;
            return (
              <div key={cat.key}>
                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {cat.label}
                  </h2>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="text-[13px] text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
                  >
                    All {cat.label.toLowerCase()}
                  </Link>
                </div>
                <ProductIndex products={items} startAt={start} />
              </div>
            );
          })}

          <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Want something like these built for your business?{" "}
            <Link
              href="/contact"
              className="text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
            >
              Tell us what you need
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
