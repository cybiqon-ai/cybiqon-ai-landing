import type { Block, Inline, LegalDoc as Doc } from "@/data/products";

/**
 * Renders a structured legal document.
 *
 * No `dangerouslySetInnerHTML` anywhere. The previous hand-written llmbytes page used it
 * for exactly one thing — to render an ampersand someone had written as `&amp;` inside a
 * JS string. Structured inline nodes remove the need entirely, which matters more here
 * than elsewhere: this is legally-material copy and it should not share a code path with
 * raw HTML injection.
 */

function Inlines({ nodes }: { nodes: Inline[] }) {
  return (
    <>
      {nodes.map((n, i) => {
        if (typeof n === "string") return <span key={i}>{n}</span>;
        if ("b" in n)
          return (
            <strong key={i} className="font-semibold text-foreground">
              {n.b}
            </strong>
          );
        const external = n.href.startsWith("http");
        return (
          <a
            key={i}
            href={n.href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-ochre underline decoration-ochre/30 underline-offset-4 transition-colors hover:decoration-ochre"
          >
            {n.link}
          </a>
        );
      })}
    </>
  );
}

/** Section headings carry a rule, which is what makes the page read as a document. */
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 border-b border-rule-strong/20 pb-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-foreground">
      {children}
    </h2>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "prose":
      return (
        <section>
          {block.heading && <Heading>{block.heading}</Heading>}
          <div className="space-y-3">
            {block.body.map((para, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-muted-foreground">
                <Inlines nodes={para} />
              </p>
            ))}
          </div>
        </section>
      );

    case "checklist":
      return (
        <section>
          {block.heading && <Heading>{block.heading}</Heading>}
          {block.intro && (
            <p className="mb-3 text-[15px] leading-relaxed text-muted-foreground">
              <Inlines nodes={block.intro} />
            </p>
          )}
          <ul className="divide-y divide-border border-y border-border">
            {block.items.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 py-2.5 text-[15px] leading-relaxed text-muted-foreground"
              >
                <span
                  aria-hidden
                  className="mt-[0.6em] h-px w-3 shrink-0 bg-ochre"
                />
                <span>
                  <Inlines nodes={item} />
                </span>
              </li>
            ))}
          </ul>
          {block.note && (
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              <Inlines nodes={block.note} />
            </p>
          )}
        </section>
      );

    case "deflist":
      return (
        <section>
          {block.heading && <Heading>{block.heading}</Heading>}
          {block.intro && (
            <p className="mb-3 text-[15px] leading-relaxed text-muted-foreground">
              <Inlines nodes={block.intro} />
            </p>
          )}
          <dl className="divide-y divide-border border-y border-border">
            {block.items.map((item, i) => (
              <div key={i} className="grid gap-1 py-3 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="text-[13px] font-semibold uppercase tracking-[0.1em] text-foreground">
                  {item.term}
                </dt>
                <dd className="text-[15px] leading-relaxed text-muted-foreground">
                  <Inlines nodes={item.def} />
                </dd>
              </div>
            ))}
          </dl>
          {block.note && (
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              <Inlines nodes={block.note} />
            </p>
          )}
        </section>
      );

    case "table":
      return (
        <section>
          {block.heading && <Heading>{block.heading}</Heading>}
          {block.intro && (
            <p className="mb-3 text-[15px] leading-relaxed text-muted-foreground">
              <Inlines nodes={block.intro} />
            </p>
          )}
          {/* Wide content scrolls inside its own container; the page never scrolls sideways. */}
          <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <thead>
                <tr className="border-y border-rule-strong/20">
                  {block.columns.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className="py-2 pr-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {block.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="py-3 pr-6 align-top text-[14px] leading-relaxed text-muted-foreground"
                      >
                        <Inlines nodes={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );

    case "contact":
      return (
        <section>
          {block.heading && <Heading>{block.heading}</Heading>}
          {block.intro && (
            <p className="mb-3 text-[15px] leading-relaxed text-muted-foreground">
              <Inlines nodes={block.intro} />
            </p>
          )}
          <dl className="divide-y divide-border border-y border-border">
            {[
              { k: "Email", v: block.email, href: `mailto:${block.email}` },
              { k: "Phone", v: block.phone, href: `tel:${block.phone.replace(/\s/g, "")}` },
              { k: "App", v: block.app },
            ].map(({ k, v, href }) => (
              <div key={k} className="grid gap-1 py-3 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="text-[13px] font-semibold uppercase tracking-[0.1em] text-foreground">
                  {k}
                </dt>
                <dd className="text-[15px] text-muted-foreground">
                  {href ? (
                    <a
                      href={href}
                      className="text-ochre underline decoration-ochre/30 underline-offset-4 hover:decoration-ochre"
                    >
                      {v}
                    </a>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      );
  }
}

export default function LegalDoc({ doc }: { doc: Doc }) {
  return (
    <div className="space-y-10">
      {doc.blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  );
}
