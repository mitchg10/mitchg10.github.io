---
name: paper-yaml-formatter
description: Create or update a publication entry in the user's academic site's `_publications/` folder — writing the summary frontmatter (plain language summary, contribution, research questions, methods, key findings, implications, tags) and, for new papers, the full file including bibliographic fields. Use whenever the user references one of their papers and asks for frontmatter, metadata, a YAML block, a publication-page summary, wants a paper "added to the site," wants an existing publication entry refined or updated, or says something like "follow the instructions for this paper" / "populate the fields" / "do the usual." Works from a full PDF/Word/LaTeX source (best), from a partial source like an abstract or DOI, or from an existing publication file alone. Output is written in first-person plural ("we," "our") per the bundled VOICE.md style guide, since the user is a co-author of these papers.
---

# Publication Entry Builder

Turns a paper into a properly formatted entry in `_publications/`, either creating the file from
scratch or refining the one already there. The user (an engineering education researcher) runs this
on every paper he adds to his site, and always wants first-person plural voice and adherence to his
house style.

## Before writing anything

1. Read `references/VOICE.md`. Apply it at the **formal/academic register** — full strength:
   frame-before-ask, structural hedging, controlled long sentences, scare quotes as analytic
   markers. This is a publication page, not a casual note.
2. Read `references/PUBLICATION_FORMAT.md` for the exact schema, field order, quoting rules,
   filename/permalink derivation, and the tag-vocabulary command.
3. Write every prose field in **first-person plural** ("we," "our") — never third person or
   "the authors."

## The one rule that never bends

Every field must trace back to something actually stated in the source. A thin source yields
**fewer fields, never invented ones.** Do not infer findings from a title, extrapolate implications
from an abstract, or fill a field because the schema has a slot for it. Omitting a field and saying
why is always the correct move over producing plausible text the paper does not support.

## Step 1 — Assess the source

Work out which tier you're in; it determines which fields are honestly fillable.

**Tier A — full text** (PDF, `.docx`, `.tex`, or full text pasted in). All seven fields.
- PDF: extract text directly — normally sufficient for born-digital academic PDFs. Fall back to
  page rasterization only if extraction is garbled or empty.
- `.docx`: convert via pandoc before reading.
- Read the whole document. Papers are long; that's fine. Do **not** skip findings, discussion, or
  conclusion — `key_findings` and `implications` depend on them specifically.

**Tier B — partial source** (abstract, DOI/publisher page, conference program entry, the user's own
description of the work). Fill only what the source supports. An abstract usually supports
`plain_language_summary`, `contribution_summary`, and a thin `methods`; it usually does **not**
support `key_findings` or `implications` at the level of specificity these fields call for. Leave
unsupported fields out and report which ones and why. If a fuller source exists, say so — offer to
redo it properly rather than quietly shipping a thin entry.

**Tier C — existing file only** (no new source; the user wants the entry improved). Refine the prose
already in the file for voice, clarity, and format compliance. Never introduce a new empirical claim
that isn't already in the file — there is nothing to verify it against.

If there is no source of any kind and no existing file, ask for one. That is the only hard stop.

**Publication status is a separate axis from source tier.** A paper in submission often comes with
its full text, so it's Tier A and every field is honestly fillable — but some of those fields may not
belong on the public page yet. Tier determines what you *can* write; status determines what gets
*rendered*. Note the status here and handle it at the masking gate in Step 3.

## Step 2 — Create or merge

Before writing, check whether the paper already has an entry:

```bash
ls _publications/
```

Match on title and slug, not filename date — an existing entry may use a placeholder date.

**No match → create.** Write the complete file: bibliographic fields extracted from the paper
itself (title, authors, venue, date, category), the summary fields, and the Google Scholar comment
body. Derive the filename and permalink per `PUBLICATION_FORMAT.md`. Ask the user for `citation`
or `paperurl` only when the source doesn't state them — and comment out `paperurl` rather than
inventing a URL.

**Match → merge.** Rewrite only the seven summary fields in place. Leave `title`, `author`, `venue`,
`citation`, `paperurl`, `permalink`, `date`, `masked_sections`, and **the filename** exactly as they
are — these are the user's, and the permalink is load-bearing for already-published links. An
existing `masked_sections` is a deliberate choice; don't drop it while rewriting the prose around it.
Show what changed before writing.

The one time to raise it unprompted: if the file carries a mask but the paper has since been
published (the user says so, or the new source is a DOI/final version), point that out and offer to
remove the mask. That's the transition the field exists for, and it's easy to forget.

## Step 3 — Approval gates

Three things get confirmed with `AskUserQuestion` before the file is written, never decided silently.

### Research questions

- **Stated explicitly in the paper** → use them verbatim (or closely paraphrased), in the paper's own
  order. No prompt needed.
- **Not stated** → infer the 1–3 questions the study is clearly designed to answer, then present them
  for approval before writing. Many of these papers have no explicit RQs, so this is the common case.
  Offer the inferred set as the recommended option and make clear they're inferred rather than quoted.

### Tags

Tags are a controlled vocabulary — the site's Topic dropdown is built from the union of all tags
across all publications, so a one-off tag becomes a permanent dropdown entry. Derive the live list
(command in `PUBLICATION_FORMAT.md`), then:

- Select **3–5** that fit, drawn from the existing vocabulary.
- Present that selection for approval.
- A genuinely novel tag may be **proposed** alongside the matches, never written silently. Note in
  the prompt that accepting it adds a new entry to the Topic dropdown.

### Masked sections (unpublished work only)

A paper in submission or under review can withhold sections from the rendered page while keeping the
prose in the file — see "Masking sections" in `PUBLICATION_FORMAT.md` for the mechanics.

Treat the paper as a masking candidate when any of these hold:

- the user describes it as submitted, under review, in review, or in submission;
- the `citation` carries `(Submitted)` or `(In Press)`;
- it's on a placeholder-date filename (`YYYY-01-0N`).

When one holds, ask which sections to withhold. Recommend `key_findings` + `implications` — the two
that assert results a review hasn't validated — and offer "mask nothing" as a real option, because it
often is the right answer for a paper whose findings are already public in a preprint or talk. Draw
the option list from `_data/publication_sections.yml`, not from memory.

Two things this gate must not do:

- **Never mask a paper the user hasn't indicated is unpublished.** Published work renders in full.
- **Never mask silently, and never skip the prose.** Masked fields are still written, in full
  house-style — the mask governs rendering, not drafting. Writing thin prose because it "won't show"
  defeats the point: it has to be ready the day the mask comes off.

If the paper is published, skip this gate entirely — don't raise it.

## Field guidance

- **plain_language_summary** — 2–4 sentences on what the paper is about and why it matters, for a
  general educated reader with no domain background. Avoid jargon; define any technical term you must
  use. This is the one field where VOICE.md's density dials back: clarity for a lay reader beats the
  dense, subordinated academic register.
- **contribution_summary** — 1 sentence, more technical. The specific novel contribution versus prior
  work. State plainly what's new here that wasn't already established.
- **research_questions** — a YAML **list**, each item ending in `?`, in the paper's own order. See the
  approval gate above.
- **methods** — 2–4 sentences: study design, sample/data (interview counts, institutions, data
  source), and analysis approach (coding scheme, framework applied, statistical or qualitative
  method).
- **key_findings** — 2–4 sentences on the main results. Favor concrete, quantified findings (counts,
  percentages, named themes) over "we found interesting patterns."
- **implications** — 2–3 sentences on what the findings mean for practice, policy, or future
  research, drawn from the paper's own discussion/conclusion — not invented.
- **tags** — see the approval gate above.

For a conceptual or narrative paper with no empirical study, adapt `methods` and `key_findings`
honestly: describe the argumentative structure or synthesis approach rather than forcing an
empirical template onto it. Several existing entries do exactly this.

## What to report back

Write the file, then report concisely:

- the file path, and whether it was **created** or **merged**;
- which fields were filled;
- which were left out and why (Tier B especially);
- which sections were masked, if any — and that the prose is written and waiting;
- anything still needing the user's input — a missing `citation`, an absent `paperurl`, a proposed
  new tag.

Do not narrate the summarization process itself, restate the summaries you just wrote, or explain
how you read the PDF. The file is the deliverable; the report is a short receipt.
