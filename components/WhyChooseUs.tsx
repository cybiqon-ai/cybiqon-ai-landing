import { DIFFERENTIATORS } from "@/data/homepage";

/**
 * One section where there were three. TrustBar, WhyChooseUs and Stats each asserted a set
 * of guarantees and overlapped badly — "you own the code" was on this page four times.
 *
 * The figure leads at display weight and the claim follows, because these are the answers
 * to "what am I actually getting", and the number is the answer. None of them is a count of
 * customers: while the client count is what it is, promises the company can keep on its own
 * are the only honest kind available.
 */
const WhyChooseUs = () => (
  <section className="bg-background pb-20 lg:pb-28">
    <div className="mx-auto max-w-[82rem] px-6 md:px-10 lg:px-16">
      <h2 className="t-h2 max-w-[20ch] text-foreground">What you are actually buying.</h2>

      <div className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        {DIFFERENTIATORS.map((item, i) => (
          <div key={item.title} className="reveal" style={{ transitionDelay: `${i * 0.05}s` }}>
            <p
              className="font-anek text-[2.75rem] leading-none text-primary"
              style={{ fontVariationSettings: '"wght" 800, "wdth" 80', fontVariantNumeric: "tabular-nums" }}
            >
              {item.value}
            </p>
            <h3 className="t-h3 mt-4 text-foreground">{item.title}</h3>
            <p className="t-body mt-2 max-w-[42ch] text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
