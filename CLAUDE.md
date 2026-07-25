# cybiqon-ai-landing

See `.okf/index.md` for how this system works.

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
