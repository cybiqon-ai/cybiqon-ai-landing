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

### The skill is patched — re-apply after any update

Its first run reported five issues on this repo, **two of them factually wrong**. Those
were real bugs, so they are fixed rather than memorised, by
`ops/scripts/seo-skill-patch.py` — idempotent, 17 edits, re-runnable:

| Was broken | Cause | Now |
|---|---|---|
| "No author attribution detected" | Only checked `class~=author`, `span[itemprop]`, `a[rel=author]` — never `meta name=author`, `article:author` or JSON-LD | Reports `Prajjwal Pathak` |
| "No publish date detected" | Searched `{"name": "article:published_time"}`; OpenGraph emits `property=`, so it could never match | Reports the real date |
| "Target Keyword: `one`" (→ *oneplus, onedrive*) | Filler words missing from `STOP_WORDS` | Reports `breadth first search` |
| "FAQPage restricted to government/health — remove it" (×8 files) | Frozen at the Aug 2023 restriction | Correct 7 May 2026 guidance: no rich result for anyone, markup still valid, **keep it** |

⚠️ **A skill reinstall reverts all of it and deletes the venv.** `ops/scripts/seo.sh`
rebuilds the venv automatically and warns if the patch is missing, but the patch itself
must be re-run by hand:

```bash
python3 ops/scripts/seo-skill-patch.py           # re-apply
python3 ops/scripts/seo-skill-patch.py --check   # exit 1 if anything is unpatched
```

If `--check` reports `missing`, an upstream edit moved an anchor and **that fix is not in
effect** — read the source before trusting the finding it covers.

### Still verify before acting

Two findings remain by design and are not bugs:

- **"Title 86 chars"** — the layout appends `| Cybiqon AI Solutions`. `seo_title` alone is
  63; Google truncates from the right, so the brand suffix is what gets cut. Fine.
- **"Meta description 245 chars, keep under 155"** — deliberate. Excerpts double as the
  index dek, and are front-loaded so the first 155 characters carry the finding. See
  `lab/posts/README.md`.

It is an evidence gatherer, not an oracle. Confirm findings against the live HTML.

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
