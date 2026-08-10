# cybiqon-ai-landing

See `.okf/index.md` for how this system works.

## Run the SEO skill on every content change

**After publishing or substantively editing any `/lab` or `/blog` post, or adding or
renaming a page, run the `seo` skill against the live URL and act on what survives
verification.** Not before — most of its checks fetch the deployed page, so it has
nothing to read until Cloudflare Pages has finished the build.

```bash
ops/scripts/seo.sh article_seo.py https://cybiqon.in/lab/<slug>
ops/scripts/seo.sh --list          # 89 scripts; article_seo, schema_diff, canonical_checker, internal_links…
```

Use the wrapper, not `python3`. The system Python is externally managed (PEP 668), so the
skill's deps live in a uv venv and a direct `python3 scripts/foo.py` fails with
`ModuleNotFoundError` — which reads as "the skill is broken" when it is not. The wrapper
also pins the working directory, because the skill's `env_loader.py` reads `.env` from
the *current* directory and `tools/social-media-manager/.env` holds the live Cloudflare
token. **Never run these scripts from inside that repo.**

### Verify before acting — it is an evidence gatherer, not an oracle

Measured against this repo on 10 Aug 2026, on a page that has every signal it asked for:

| It reported | Reality |
|---|---|
| "No author attribution detected" | **False.** `meta name=author`, `article:author`, a visible byline, and JSON-LD `author` as a `Person` with a URL are all present. |
| "No publish date detected" | **False.** `article:published_time`, a `<time>` element and JSON-LD `datePublished` are all present. |
| "Target Keyword: `one`" | Junk — its extractor then returned *oneplus, onedrive, one piece*. Ignore its keyword output. |
| "FAQPage is restricted to government/health sites — remove it" | Outdated *and* wrong. Google removed FAQ rich results for **everyone** on 7 May 2026, but `FAQPage` structured data is **not** deprecated and is explicitly allowed to stay. Ours is derived automatically and feeds answer engines. **Keep it.** |
| "Meta description 245 chars, keep under 155" | Known trade-off, not a bug. Excerpts here are deliberately long because they double as the index dek; they are front-loaded so the first 155 characters carry the finding. See `lab/posts/README.md`. |

Two of its five findings on that run were factually wrong. Treat every finding as a lead
to confirm against the live HTML, exactly as with any outside review.

**Do not let it flatten the writing.** The `title`/`seo_title` split is deliberate and
documented in `lab/posts/README.md`: the `h1` is written to be read, `seo_title` to be
searched. Generic advice to make the `h1` keyword-first should be declined; put query
terms in the `h2`s instead, which is where this section's real gap was.

## Knowledge Bundle (`.okf/`)

This repo carries an **OKF knowledge bundle** at `.okf/` — a graph of markdown
concepts documenting how this system actually works, including the parts that are
broken and why. It is the fastest way to orient before a task: start at
`.okf/index.md` and follow links into the relevant area.

Treat it as the source of truth. Where it and older docs disagree, the bundle
notes which is current.

**Keep it in sync — proactively, without being asked.** After any *substantive*
change, update the affected concept(s) in the **same pass** as the code:

- Triggers: a new/removed/renamed service, endpoint, script or module; a new
  external integration; a schema change; an architectural decision; a changed
  schedule, credential path or deploy flow; discovering that something documented
  is wrong.
- How:
  1. Edit the concept body **and** its `timestamp`; fix or add cross-links; add a
     new concept file for a genuinely new asset; mark removed assets with a
     `**Deprecation**` note rather than deleting the context.
  2. Refresh the relevant `index.md` and append a dated entry to `.okf/log.md`.
  3. Validate before finishing:
     `python3 /mnt/external/dev/cybiqon/.agents/skills/validate/scripts/okf_validate.py .okf --strict`
     Fix every ERROR. The one hard rule: each concept needs non-empty YAML `type`
     frontmatter.

Skip trivial changes (typos, formatting, small internal fixes). When unsure
whether something is substantive, err toward a quick note in `log.md`.

**Company-level context** — strategy, the portfolio, cron inventory, GitHub setup
— lives in the `cybiqon-hq` bundle at the root of the cybiqon tree, not here.
