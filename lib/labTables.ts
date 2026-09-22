import manifest from "@/data/lab-tables.json";
import { htmlToText } from "@/lib/lab";

/**
 * Download links under /lab tables, and the Dataset markup that tells search engines
 * they exist.
 *
 * The files are written at build time by scripts/build-lab-data.mjs from the repo
 * markdown; this page renders D1's HTML at request time. The two are matched by a key
 * made from each table's header row — never by position — so a table present in one and
 * not the other costs a link rather than pointing a link at the wrong data. The script's
 * header comment has the full reasoning.
 *
 * Same trust boundary as extractHeadings in lib/lab.ts: the HTML is ours, generated at
 * publish time, so a regex over <table> is sound here and would not be anywhere else.
 */

export const DATA_LICENSE = {
  name: "CC BY 4.0",
  url: "https://creativecommons.org/licenses/by/4.0/",
};

type Entry = { id: string; key: string; section: string | null };
const MANIFEST = manifest as Record<string, Entry[]>;

/** Must match headerKey() in scripts/build-lab-data.mjs exactly. */
export function headerKey(cells: string[]): string {
  return cells.map((c) => c.toLowerCase().replace(/[^a-z0-9]/g, "")).join("|");
}

export type LinkedTable = Entry & { csv: string };

export function dataUrl(slug: string, file: string): string {
  return `/data/lab/${slug}/${file}`;
}

/**
 * Append a download line after every table the manifest knows. Returns the new HTML and
 * the tables that got a link, in page order.
 */
export function attachTableData(
  html: string,
  slug: string,
): { html: string; tables: LinkedTable[] } {
  const entries = MANIFEST[slug] ?? [];
  if (entries.length === 0) return { html, tables: [] };

  const used = new Set<number>();
  const tables: LinkedTable[] = [];
  const json = dataUrl(slug, "tables.json");

  const out = html.replace(/<table[\s\S]*?<\/table>/gi, (table) => {
    const headRow = table.match(/<thead[\s\S]*?<tr[^>]*>([\s\S]*?)<\/tr>/i)?.[1] ?? "";
    const cells = [...headRow.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map((m) => htmlToText(m[1]));
    const key = headerKey(cells);

    // First unused entry with this key: two tables with the same header pair up in order.
    const i = entries.findIndex((e, n) => !used.has(n) && e.key === key);
    if (i === -1) return table;
    used.add(i);

    const entry = entries[i];
    const csv = dataUrl(slug, `${entry.id}.csv`);
    tables.push({ ...entry, csv });

    return (
      `${table}\n<p class="lab-table-data">` +
      `<a href="${csv}" download>Download CSV</a>` +
      `<span aria-hidden="true"> · </span><a href="${json}">all tables as JSON</a>` +
      `<span aria-hidden="true"> · </span><a href="${DATA_LICENSE.url}" rel="license">${DATA_LICENSE.name}</a>` +
      `</p>`
    );
  });

  return { html: out, tables };
}

/**
 * schema.org Dataset for a post that has downloadable tables — what Google Dataset
 * Search indexes. Its description must run 50–5,000 characters; the section names and the
 * excerpt clear the floor on every current post.
 */
export function datasetSchema(
  post: { slug: string; title: string; excerpt: string | null },
  tables: LinkedTable[],
  siteUrl: string,
  author: { name: string; url: string },
  datePublished: string,
) {
  if (tables.length === 0) return null;
  const sections = [...new Set(tables.map((t) => t.section).filter(Boolean))];
  const noun = tables.length === 1 ? "table" : "tables";
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `Data from “${post.title}”`,
    description:
      `${tables.length} ${noun} published in the Cybiqon Lab post “${post.title}”` +
      (sections.length ? `, covering: ${sections.join("; ")}.` : ".") +
      (post.excerpt ? ` ${post.excerpt}` : ""),
    url: `${siteUrl}/lab/${post.slug}`,
    isAccessibleForFree: true,
    license: DATA_LICENSE.url,
    creator: { "@type": "Person", name: author.name, url: author.url },
    datePublished,
    distribution: [
      ...tables.map((t) => ({
        "@type": "DataDownload",
        name: t.section ?? t.id,
        encodingFormat: "text/csv",
        contentUrl: `${siteUrl}${t.csv}`,
      })),
      {
        "@type": "DataDownload",
        name: "All tables",
        encodingFormat: "application/json",
        contentUrl: `${siteUrl}${dataUrl(post.slug, "tables.json")}`,
      },
    ],
  };
}
