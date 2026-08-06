# lab/posts

Source of truth for everything at [cybiqon.in/lab](https://cybiqon.in/lab). One markdown
file per post, named for its slug. D1 holds the rendered HTML; this holds the words.

Publish with the pipeline repo's publisher — it needs Cloudflare credentials, and **this
repo is public**:

```bash
cd ../../../tools/social-media-manager
python3 lab/publish_lab.py ../../products/cybiqon-ai-landing/lab/posts/<slug>.md --dry-run
```

Drop `--dry-run` to write. `--draft` forces `published = 0`. `--no-touch` republishes
without moving `updated_at`.

## Frontmatter

| Field | Required | Notes |
|---|---|---|
| `title` | yes | The `h1`, the OG card and the RSS item. Written to be read. |
| `seo_title` | no | The `<title>`, meta description and `BlogPosting.headline`. Written to be searched. Omit when the two would be the same. |
| `excerpt` | yes | Meta description and RSS `<description>`. |
| `date` | no | Authoritative when set; otherwise now. Never changes on republish. |
| `tags` | no | A list. Rendered as links to `/lab?tag=<slug>`. |
| `readouts` | no | `{label, value}` pairs for the measurement rail, max 6. **Only figures that cannot be derived from the body** — word count, reading time and source count are computed at render time so they cannot go stale. |
| `draft` | no | Same as `--draft`. |

`seo_title` exists because the two jobs conflict. "Nobody escaped. The sandbox had a
door." is the right h1 and nobody types it into Google. Splitting them lets the page keep
its voice while the metadata carries the string a reader would actually search for.

## Body conventions

Two blocks are load-bearing beyond prose. The publisher warns when either is missing.

### `## TL;DR`

A bulleted summary, early — after the opening argument, before the first substantive
section. Each bullet states a finding and its number, and stands on its own out of
context, because that is the shape an answer engine quotes. Bold the claim, not the
adjective.

### `## FAQ`

Near the end, immediately before `## Sources`. Each question is an `###`, phrased the way
someone would actually type it. Each answer is two to three self-contained sentences that
name their entities — "Hugging Face", not "the victim" — because retrieval cites the chunk,
not the article around it.

`lib/lab.ts:extractFAQ` reads this section back out of the rendered HTML and emits
`FAQPage` JSON-LD from it. Nothing is stored in a column, for the same reason the rail
derives its figures: two copies of an answer drift, and the one nobody reads is the one
that goes wrong.

> ⚠️ **Sources must be `## Sources`, not `###`.** The FAQ section ends at the next `h2`.
> As a subsection, Sources would be read as a question with twenty links for an answer.

### Internal links

Two or three per post, in the body, to other lab posts. They cost nothing on the
measurement rail — `countSources` counts distinct external hostnames and explicitly
excludes `cybiqon.in`, so linking ourselves is correctly not a citation.
