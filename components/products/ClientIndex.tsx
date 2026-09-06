import { ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import { STATUS_LABEL } from "@/data/products";
import type { ClientProject } from "@/data/clients";

/**
 * The client ledger — cards now, matching the rest of the site, but still not links.
 *
 * A product card links because there is a product page behind it. Client work has no page
 * behind it and should not get one: a detail page per engagement, written out of what we
 * are allowed to say, is exactly the thin page the category pages already refuse to be.
 * The card carries its own summary and deliverables, and only links out where the client's
 * site is actually live and ours to point at.
 */
export default function ClientIndex({ projects }: { projects: ClientProject[] }) {
  return (
    <ul className="grid gap-5 lg:grid-cols-2">
      {projects.map((project) => (
        <li
          key={project.slug}
          className="flex flex-col rounded-2xl border border-border/60 bg-surface-lowest p-6 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)]"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 className="t-h3 text-primary">{project.name}</h3>
            <span
              className={`t-label-sm rounded-full px-2.5 py-1 ${
                project.status === "live"
                  ? "bg-secondary/15 text-tertiary-deep"
                  : "bg-surface-high text-primary"
              }`}
            >
              {project.status === "live" ? "Live" : STATUS_LABEL[project.status]}
            </span>
          </div>

          <p className="t-body-sm mt-1 text-muted-foreground">{project.tagline}</p>
          <p className="t-body mt-4 text-foreground">{project.summary}</p>

          <ul className="mt-4 flex-1 space-y-2">
            {project.work.map((item) => (
              <li key={item} className="flex gap-2.5">
                <Check
                  weight="bold"
                  aria-hidden
                  className="mt-1 h-3.5 w-3.5 shrink-0 text-secondary"
                />
                <span className="t-body-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>

          {project.unnamed && (
            <p className="t-body-sm mt-4 rounded-lg bg-surface-low px-4 py-3 text-muted-foreground">
              {project.unnamed}
            </p>
          )}

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-track="client_site_click"
              data-track-label={project.slug}
              className="t-label mt-5 inline-flex items-center gap-1.5 self-start text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
            >
              {project.url.replace(/^https?:\/\//, "")}
              <ArrowUpRight weight="bold" aria-hidden className="h-3.5 w-3.5" />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
