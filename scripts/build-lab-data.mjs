/**
 * Publish every table in /lab as data: one CSV per table, one JSON per post, one index.
 *
 *   public/data/lab/index.json                  every post that has tables, with URLs
 *   public/data/lab/<slug>/tables.json          all of a post's tables, with citation + licence
 *   public/data/lab/<slug>/<table-id>.csv       one table, UTF-8 with a BOM so Excel reads ₹
 *   data/lab-tables.json                        the manifest the post page reads (committed)
 *
 * Why. The lab posts carry original measurements — 400-trial clear rates, red-team pass
 * counts, generator yields — and until 22 Sep 2026 none of it could be downloaded, so
 * anyone wanting to cite a number had to retype a table. Data people can cite is the
 * cheapest thing this site has that other sites might link to.
 *
 * Why build-time files and not a route. A route handler costs ~100 KiB gzipped of a Worker
 * with ~180 KiB of headroom; static assets cost none. Same argument, and same source, as
 * build-agent-markdown.mjs: lab/posts/<slug>.md is what D1's HTML is rendered from.
 *
 * Why the page matches tables by header, not by position. The page renders D1's HTML at
 * request time; these files come from the repo markdown at build time. They agree when
 * the post was published from the file, which is the rule, but a table added in one and
 * not the other must not shift every download link onto the wrong table. So each table
 * carries a key made from its header row, and the page only links a table whose key it
 * finds. A mismatch loses a link; it never mislabels data. The same normalisation lives
 * in lib/labTables.ts — keep the two `headerKey`s identical.
 *
 * Why ids come from the heading above the table: `results-by-gravity.csv` survives a
 * new table being added earlier in the post; `table-3.csv` would not, and inbound links
 * to a dataset are the point.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { readPosts } from "./lib/frontmatter.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const POSTS_DIR = join(root, "lab", "posts");
const OUT_DIR = join(root, "public", "data", "lab");
const MANIFEST = join(root, "data", "lab-tables.json");

const SITE = "https://cybiqon.in";
const AUTHOR = "Prajjwal Pathak";
export const LICENSE = {
  name: "CC BY 4.0",
  url: "https://creativecommons.org/licenses/by/4.0/",
};

/** Must match headerKey() in lib/labTables.ts exactly. */
export function headerKey(cells) {
  return cells.map((c) => c.toLowerCase().replace(/[^a-z0-9]/g, "")).join("|");
}

/** Same rules as lib/lab.ts slugifyHeading, so file names read like the section they sit in. */
function slugify(text) {
  return (
    text
      .toLowerCase()
      .replace(/&[a-z]+;/g, " ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "table"
  );
}

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

/** A markdown table cell as the plain text a spreadsheet should hold. */
function cellText(raw) {
  return raw
    .replace(/\\\|/g, "|")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // links and images keep their text
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1$2")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&([a-z]+);/gi, (w, n) => ENTITIES[n.toLowerCase()] ?? w)
    .replace(/\s+/g, " ")
    .trim();
}

/** Split a `| a | b |` row, honouring escaped pipes. */
function splitRow(line) {
  const inner = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return inner.split(/(?<!\\)\|/).map(cellText);
}

const SEPARATOR = /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/;

/** Every pipe table in a post body, with the heading it sits under. Code fences skipped. */
export function extractTables(body) {
  const lines = body.split("\n");
  const tables = [];
  let heading = "";
  let fence = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const f = line.match(/^\s*(```|~~~)/);
    if (f) {
      fence = fence === f[1] ? null : fence ?? f[1];
      continue;
    }
    if (fence) continue;

    const h = line.match(/^#{2,3}\s+(.+?)\s*#*\s*$/);
    if (h) {
      heading = cellText(h[1]);
      continue;
    }

    if (line.trim().startsWith("|") && SEPARATOR.test(lines[i + 1] ?? "")) {
      const columns = splitRow(line);
      const rows = [];
      let j = i + 2;
      while (j < lines.length && lines[j].trim().startsWith("|")) {
        const cells = splitRow(lines[j]);
        // Pad or trim to the header's width: a ragged row must not shift its columns.
        rows.push(columns.map((_, k) => cells[k] ?? ""));
        j++;
      }
      tables.push({ heading, columns, rows });
      i = j - 1;
    }
  }
  return tables;
}

/**
 * The posts set negative numbers with a typographic minus (U+2212), which reads well and
 * which every spreadsheet imports as text. In a cell that is only a number, use the ASCII
 * one; prose cells keep their characters.
 */
function numericMinus(v) {
  return /^[\u2212+-]?[\d.,]+%?$/.test(v) ? v.replace(/^\u2212/, "-") : v;
}

function csvField(raw) {
  const v = numericMinus(raw);
  return /[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

function toCsv(columns, rows) {
  const lines = [columns, ...rows].map((r) => r.map(csvField).join(","));
  // BOM: without it Excel opens UTF-8 as ANSI and ₹, ×, — arrive as mojibake.
  return `﻿${lines.join("\r\n")}\r\n`;
}

function main() {
  const posts = readPosts(readdirSync, readFileSync, join, POSTS_DIR);
  if (posts.length === 0) throw new Error("no posts found — refusing to write empty output");

  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  const manifest = {};
  const index = [];

  for (const { slug, meta, body } of posts) {
    const found = extractTables(body).filter((t) => t.rows.length > 0);
    if (found.length === 0) continue;

    const seen = new Map();
    const tables = found.map((t) => {
      const base = slugify(t.heading);
      const n = (seen.get(base) ?? 0) + 1;
      seen.set(base, n);
      const id = n === 1 ? base : `${base}-${n}`;
      return { id, ...t, key: headerKey(t.columns) };
    });

    const dir = join(OUT_DIR, slug);
    mkdirSync(dir, { recursive: true });
    const postUrl = `${SITE}/lab/${slug}`;
    const base = `${SITE}/data/lab/${slug}`;

    for (const t of tables) writeFileSync(join(dir, `${t.id}.csv`), toCsv(t.columns, t.rows));

    const citation = `${AUTHOR}, “${meta.title}”, Cybiqon Lab, ${meta.date}. ${postUrl}`;
    writeFileSync(
      join(dir, "tables.json"),
      `${JSON.stringify(
        {
          title: meta.title,
          url: postUrl,
          author: AUTHOR,
          published: meta.date,
          license: LICENSE,
          citation,
          tables: tables.map((t) => ({
            id: t.id,
            section: t.heading || null,
            csv: `${base}/${t.id}.csv`,
            columns: t.columns,
            rows: t.rows.map((r) => r.map(numericMinus)),
          })),
        },
        null,
        2,
      )}\n`,
    );

    manifest[slug] = tables.map((t) => ({ id: t.id, key: t.key, section: t.heading || null }));
    index.push({
      title: meta.title,
      url: postUrl,
      published: meta.date,
      tables: tables.length,
      json: `${base}/tables.json`,
      csv: tables.map((t) => `${base}/${t.id}.csv`),
    });
  }

  writeFileSync(
    join(OUT_DIR, "index.json"),
    `${JSON.stringify(
      {
        description:
          "Every table published in the Cybiqon Lab, as CSV and JSON. Each post's tables.json carries its citation.",
        license: LICENSE,
        source: `${SITE}/lab`,
        posts: index,
      },
      null,
      2,
    )}\n`,
  );

  // Sorted keys so the committed manifest only changes when the tables do.
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);

  const total = index.reduce((n, p) => n + p.tables, 0);
  console.log(`lab data: ${total} tables from ${index.length} posts -> public/data/lab/`);
  for (const p of index) console.log(`  ${String(p.tables).padStart(2)}  ${p.url.replace(`${SITE}/lab/`, "")}`);
}

main();
