import Link from "next/link";
import { CalendarBlank, CaretDown, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { FAQ_CATEGORIES, ALL_FAQS } from "@/data/faq";
import { TIDYCAL } from "@/data/homepage";

/**
 * /faq, on the design system — and every question is now in the served HTML.
 *
 * The old page filtered by category in React state, so only the active category reached
 * the DOM: 3 of 16 questions, while the FAQPage schema declared all 16. Google requires
 * FAQ markup to correspond to content visible on the page, so that was a mismatch worth
 * fixing on its own, quite apart from thirteen answers being invisible to a crawler.
 *
 * Native <details>/<summary> rather than a React accordion. It opens without JavaScript,
 * it is keyboard accessible and screen-reader announced for free, and it takes the page
 * off useScrollReveal.
 */
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://cybiqon.in/" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://cybiqon.in/faq" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const Faq = () => (
  <div className="min-h-screen bg-background">
    {[breadcrumbSchema, faqSchema].map((schema, i) => (
      <script
        key={i}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    ))}

    <section className="relative overflow-hidden bg-surface pb-14 pt-32 lg:pb-16 lg:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent-softer opacity-50 blur-3xl"
      />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <p className="t-eyebrow text-accent">Questions</p>
        <h1 className="t-h1 mt-2.5 max-w-[18ch] text-primary">
          Everything people ask before signing
        </h1>
        <p className="t-body-lg mt-5 max-w-[56ch] text-muted-foreground">
          Sixteen answers, all on this page. If yours is not here, the call is free and
          there is no pitch attached to it.
        </p>

        {/* In-page jumps rather than a filter — every answer stays in the document. */}
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {FAQ_CATEGORIES.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="t-label-sm inline-flex rounded-full border border-border/70 bg-surface-lowest px-3.5 py-2 text-primary transition-colors hover:border-primary/40 hover:bg-surface-low"
              >
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="bg-surface-lowest py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] space-y-14 px-4 sm:px-6 lg:px-8">
        {FAQ_CATEGORIES.map((cat) => (
          <div key={cat.id} id={cat.id} className="scroll-mt-32">
            <h2 className="t-h2 text-primary">{cat.name}</h2>
            <div className="mt-6 space-y-3">
              {cat.questions.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-border/60 bg-surface-lowest shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                    <h3 className="t-h3 text-primary">{item.q}</h3>
                    <CaretDown
                      weight="bold"
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <p className="t-body border-t border-border/60 px-5 py-4 text-muted-foreground">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-primary py-16 text-primary-foreground lg:py-20">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="t-h2 max-w-[20ch] text-white">Still have a question?</h2>
          <p className="t-body-lg mt-3 max-w-[52ch] text-white/70">
            Ask it on a call or over WhatsApp. Thirty minutes, no commitment, and no sales
            pressure attached to either.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <a
            href={TIDYCAL}
            target="_blank"
            rel="noopener noreferrer"
            data-track="book_call"
            data-track-label="faq_cta"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-[15px] font-semibold text-accent-foreground shadow-[0_4px_14px_rgba(253,101,30,0.35)] transition-all hover:shadow-[0_6px_20px_rgba(253,101,30,0.5)]"
          >
            <CalendarBlank weight="bold" aria-hidden className="h-4 w-4" />
            Book a free call
          </a>
          <a
            href="https://wa.me/919250711473"
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            data-track-label="faq_cta"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-7 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
          >
            <WhatsappLogo weight="fill" aria-hidden className="h-4 w-4" />
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  </div>
);

export default Faq;
