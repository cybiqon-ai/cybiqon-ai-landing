import type { Metadata } from "next";
import Link from "next/link";
import ProductIndex from "@/components/products/ProductIndex";
import ClientIndex from "@/components/products/ClientIndex";
import { PRODUCTS, activeCategories, productsIn } from "@/data/products";
import { CLIENT_PROJECTS } from "@/data/clients";

const siteUrl = "https://cybiqon.in";

export const metadata: Metadata = {
  title: "Products We've Built and Shipped",
  description:
    "The apps, games, Chrome extensions and client work Cybiqon has built and shipped — LLMBytes, MeFlow, VitaLoop, Lumina and Orbitone, and MapWit.",
  keywords:
    "Cybiqon products, Android apps, Android games, Chrome extensions, LLMBytes, MeFlow, VitaLoop, Lumina, Orbitone, MapWit",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products We've Built and Shipped | Cybiqon AI Solutions",
    description:
      "Apps, games, Chrome extensions and client work built and shipped by a studio in India.",
    url: `${siteUrl}/products`,
    type: "website",
    images: [
      {
        url: "/og/products.png",
        width: 1200,
        height: 630,
        alt: "Everything we have shipped — Cybiqon AI Solutions",
      },
    ],
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

      <section className="bg-surface pb-12 pt-32 lg:pb-16 lg:pt-40">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div>
              <p className="t-eyebrow text-accent-ink">Products</p>
              <h1 className="t-h1 mt-2.5 max-w-[18ch] text-primary">
                What we&apos;ve built and shipped
              </h1>
            </div>
            <p className="t-body text-muted-foreground lg:pb-1">
              We build for ourselves and we build for clients. The ones with our own name on
              them come first — same standard, no client to blame — and the client work is at
              the end.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface-lowest pb-20 pt-14 lg:pb-28">
        <div className="mx-auto max-w-[1240px] space-y-14 px-4 sm:px-6 lg:px-8">
          {categories.map((cat) => {
            const items = productsIn(cat.key);
            return (
              <div key={cat.key}>
                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h2 className="t-h3 text-primary">{cat.label}</h2>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="t-body-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
                  >
                    All {cat.label.toLowerCase()}
                  </Link>
                </div>
                <ProductIndex products={items} />
              </div>
            );
          })}

          <div id="client-work" className="scroll-mt-28">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h2 className="t-h3 text-primary">Client work</h2>
              <span className="t-body-sm text-muted-foreground">
                Built for someone else, on their terms
              </span>
            </div>
            <ClientIndex projects={CLIENT_PROJECTS} />
          </div>

          <p className="t-body max-w-xl text-muted-foreground">
            Want something like these built for your business?{" "}
            <Link
              href="/contact"
              className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
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
