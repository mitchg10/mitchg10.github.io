# Publication File Format

Mechanical conventions for files in `_publications/`. Derived from the existing corpus and from
what `_layouts/publication.html` and `assets/js/publications-filter.js` actually read.

Update this file when the site's schema changes. `SKILL.md` covers judgment; this file covers format.

## Filename

```
_publications/YYYY-MM-DD-Title-Case-Slug.md
```

Hyphen-separated, Title Case, no articles dropped mechanically — mirror how the existing files read
(`2026-05-24-Inside-Mental-Models.md`, `2025-06-01-Automated-Analysis-of-Knowledge-Types-in-CS-Textbooks.md`).
Long titles are shortened to the distinctive part rather than transcribed whole; punctuation
(colons, apostrophes, ampersands) is dropped from the slug.

The filename date defaults to the `date:` field. Note that several existing files deliberately
diverge: unpublished/submitted work is grouped under placeholder slots (`2026-01-01`, `2026-01-02`,
`2026-01-03`, `2026-01-04`) while `date:` carries the real submission date. When adding an
unpublished paper, take the next free placeholder in that year's sequence.

**When merging into an existing file, never rename it** — the permalink is derived from the filename
and renaming breaks any link already published.

## Frontmatter

Exact field order:

```yaml
---
title: "..."
author: "..."
collection: publications
category: conferences
permalink: /publication/YYYY-MM-DD-Title-Case-Slug
date: YYYY-MM-DD
venue: '...'
citation: '...'
paperurl: '...'
masked_sections:
  - key_findings
  - implications
plain_language_summary: "..."
contribution_summary: "..."
research_questions:
  - "...?"
  - "...?"
methods: "..."
key_findings: "..."
implications: "..."
tags:
  - "..."
  - "..."
---
```

### Field notes

| Field | Rule |
|---|---|
| `title` | Double-quoted. Full title including subtitle after the colon. |
| `author` | Double-quoted, single string, comma-separated, `First Last` order, paper's own author order. Not a list. |
| `collection` | Always literally `publications`. |
| `category` | `manuscripts` for journal articles, `conferences` for conference papers. Defined in `_config.yml` under `publication_category`; drives the section headings on the publications page. |
| `permalink` | `/publication/` + the filename basename without `.md`. **Singular** `publication` — this deliberately overrides the collection default of `/:collection/:path/` in `_config.yml`. |
| `date` | Unquoted `YYYY-MM-DD`. The real publication/presentation date. Sorts the publications page. |
| `venue` | Single-quoted. Conference papers use `'In the proceedings of <YEAR> <NAME>'`; journals use the journal name alone. |
| `citation` | Single-quoted, APA. For unpublished work, mark it: `'Gerhardt, M. (Submitted). Title. Venue.'` |
| `paperurl` | Single-quoted. DOI preferred, then ASEE PEER. **Comment the whole line out** (`# paperurl: '...'`) when the paper is unpublished or has no URL yet — do not write an empty string or a placeholder URL. |
| `masked_sections` | Optional. Unquoted list of bare field names — these are keys, not prose, so no quotes. Omit the field entirely when nothing is masked; never write an empty list. See below. |
| `layout` | Never set in-file. Supplied by the `defaults` block in `_config.yml`. |

### Summary fields

All six prose fields are double-quoted single-line strings. `research_questions` is the exception —
it is a **YAML list**, because `_layouts/publication.html` iterates it into an `<ol>`. A single
quoted string there renders as one run-on list item.

Each question ends in `?` and preserves the paper's own ordering. Do not prefix with `(a)`/`(b)` —
the `<ol>` supplies the numbering.

An empty `research_questions:` (no list items) parses fine and the layout guards against it, skipping
the section — but no current file has one, so don't produce one. A paper with no stated or inferable
questions omits the field instead.

### Masking sections

Work in submission or under review can withhold individual sections from the rendered page while
keeping the prose in the file, ready to unmask on acceptance. List the field names under
`masked_sections:`:

```yaml
masked_sections:
  - key_findings
  - implications
```

A masked section disappears completely — no heading, no placeholder, indistinguishable from a field
that was never filled. Masking `plain_language_summary` also drops the blurb from the paper's card on
`/publications/`; the card itself, its tags, and the Topic filter are unaffected.

The valid names are exactly the `field:` values in `_data/publication_sections.yml`. Derive them
rather than trusting this list — a name that isn't in that file masks nothing and fails silently:

```bash
grep '^- field:' _data/publication_sections.yml | sed 's/^- field: //'
```

Three rules:

- **Still write the masked prose.** The point is to withhold it from the site, not to skip drafting
  it. A masked `key_findings` is a complete, house-style sentence set that happens not to render yet.
- **Omit the field when nothing is masked.** No empty list. Most publications have no
  `masked_sections` at all.
- **Never mask silently** — it's an approval gate in `SKILL.md`, not a default.

One caveat to state plainly if it ever comes up: `_publications/*.md` is public in this GitHub repo,
so masking hides prose from the rendered site, not from the repository. It's the right tool for not
advertising unreviewed findings; it is not an embargo. Genuinely sensitive text should be left out of
the file entirely.

### Quoting and escaping

- Double-quoted: `title`, `author`, all six prose fields, every list item under `research_questions`
  and `tags`.
- Single-quoted: `venue`, `citation`, `paperurl`.
- Escape internal double quotes as `\"`. This matters constantly — scare quotes are a house-style
  feature, so most prose fields contain them.
- Apostrophes inside double-quoted strings need no escaping.
- Do not introduce HTML entities (`&amp;`, `&apos;`). Some existing files contain them
  inconsistently; write plain characters in new content.

## Body

Everything after the closing `---`, a single commented-out line:

```markdown
<!-- Use [Google Scholar](https://scholar.google.com/scholar?q=Title+Words+Joined+By+Plus){:target="_blank"} for full citation -->
```

Use the distinctive words of the title joined by `+`, dropping punctuation. Keep it commented —
the newer files all do, and the rendered page gets its citation from the `citation` field via the
layout instead.

## Tags

Tags are a **controlled vocabulary**, not free-form keywords. `assets/js/publications-filter.js`
builds the publications-page Topic dropdown from the union of tags across every publication, so each
novel tag becomes a permanent dropdown entry. Tag pills also link to `/publications/?tag=<tag>`.

Derive the live vocabulary rather than trusting any list written down here:

```bash
grep -h '^\s*- "' _publications/*.md | sed 's/^ *- //' | grep -v '?"$' | sort | uniq -c | sort -rn
```

The `grep -v '?"$'` drops research-question list items, which share the same `- "..."` shape.

As of this writing the vocabulary is, by frequency: Engineering Education, Artificial Intelligence,
Qualitative Methodologies, Psychology, Behaviors and Interactions, Workforce Development, Graduate
Education, Faculty Development, Quantitative Methodologies, Programs and Curriculum, Computing
Education, Mixed-Methods, Engineering Judgment, Collaboration and Teamwork, Student Evalutations of
Teaching.

Two cautions: the last of those contains a typo in the existing data (`Evalutations`) — do not
propagate it to new files, and do not silently fix it either, since that would orphan the existing
tag link. Indentation of tag list items varies between two and three spaces across existing files;
either parses identically, so use two spaces for new files.
