import { STATUS_LABEL } from "@/data/products";
import type { ClientProject } from "@/data/clients";

/**
 * The client ledger — the same ruled rows as ProductIndex, but the row is the whole
 * entry rather than a link to one.
 *
 * A product row is a link because there is a product page behind it. Client work has no
 * page behind it and should not get one: a detail page per engagement, built out of what
 * we are allowed to say, is exactly the thin page the category pages already refuse to
 * be. So the row carries the summary and the deliverables itself, and nothing here
 * pretends to be clickable.
 */
export default function ClientIndex({ projects }: { projects: ClientProject[] }) {
  return (
    <ol className="border-t border-rule-strong/25">
      {projects.map((project, i) => (
        <li
          key={project.slug}
          className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-3 border-b border-border py-6 md:grid-cols-[3.5rem_1fr] md:py-7"
        >
          <span className="text-[13px] font-semibold tabular-nums tracking-[0.1em] text-muted-foreground">
            {String(i + 1).padStart(2, "0")}
          </span>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                {project.name}
              </h3>
              <span
                className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                  project.status === "live" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {project.status === "live" ? "Live" : STATUS_LABEL[project.status]}
              </span>
            </div>

            <p className="mt-0.5 text-[15px] leading-relaxed text-muted-foreground">
              {project.tagline}
            </p>

            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-foreground">
              {project.summary}
            </p>

            <ul className="mt-3 max-w-2xl space-y-1.5">
              {project.work.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[0.75rem_1fr] gap-x-2 text-[14px] leading-relaxed text-muted-foreground"
                >
                  <span aria-hidden="true" className="text-rule-strong">
                    &mdash;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {project.unnamed && (
              <p className="mt-3 max-w-2xl border-l-2 border-ochre/40 pl-3 text-[13px] leading-relaxed text-muted-foreground">
                {project.unnamed}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
