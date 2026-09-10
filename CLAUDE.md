# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Academic personal website built with Jekyll, forked from [academicpages template](https://github.com/academicpages/academicpages.github.io). Hosted on GitHub Pages at https://mitchg10.github.io.

**Site Owner:** Mitch Gerhardt, PhD Candidate in Engineering Education at Virginia Tech (expected 2027), with concurrent M.S. in Computer Science (expected 2026).

**Research Focus:** Sociotechnical studies of generative AI adoption in workplace settings, ethnographic methods, Science and Technology Studies (STS), epistemic cultures, computational approaches to qualitative research, symbolic interactionism, workplace learning and expertise.

**Technical Background:** Python, JavaScript, React, FastAPI, Docker, NLP, LLMs, qualitative research methods, mixed methods, ethnography.

## Development Commands

### Local Development (Recommended)

**Quick Start - Single Command:**
```bash
# Build and serve with CORS-enabled Python server
./dev.sh
```

**Live Reload Workflow - Two Terminals:**
```bash
# Terminal 1: Auto-rebuild on file changes
bundle exec jekyll build --watch --config _config.yml,_config.dev.yml

# Terminal 2: Serve with CORS support
cd _site && python3 ../serve.py
```

**Important — always include `--config _config.yml,_config.dev.yml` for local builds.** `_config.yml` sets `url: https://mitchgerhardt.com` (the production domain) for GitHub Pages. Every page includes assets (JS, CSS) via a `base_path` built from `site.url`, so without the `_config.dev.yml` override (which sets `url: "http://localhost:4000"`), the browser tries to load those assets from the live production domain instead of your local server — they'll 404 or silently fail if the change hasn't been deployed yet, breaking JS-driven features (e.g. the publications search/filter UI) while the rest of the page still renders. `dev.sh` already applies this override; only the manual/two-terminal and Docker workflows need the flag added explicitly.

`_config.dev.yml` is gitignored and never reaches GitHub Pages, so production builds always use the correct `url` from `_config.yml` alone — publishing is unaffected by this override.

**Why Python Server Instead of Jekyll's Default?**

Jekyll's built-in WEBrick server doesn't properly serve web font files (.woff, .woff2) with correct CORS headers, causing Font Awesome and Academicons icons to fail loading in local development. The custom Python server (`serve.py`) adds `Access-Control-Allow-Origin` headers to all responses, fixing icon display issues.

**Key files:**
- `serve.py` - Python HTTP server with CORS headers
- `dev.sh` - Convenience script (build + serve), already applies `_config.dev.yml`
- `_config.dev.yml` - Local-only override (gitignored) that points asset URLs at `localhost:4000` instead of production

**Manual Jekyll commands (if needed):**
```bash
# Install Ruby dependencies
bundle install

# Build site only (output to _site/), using the local dev config override
bundle exec jekyll build --config _config.yml,_config.dev.yml

# Note: 'jekyll serve' works but icons won't display properly
```

### Docker Development

```bash
# Run with Docker Compose (includes live reload)
docker-compose -f docker-compose.yaml up

# Access at http://localhost:4000
# Note: Also uses WEBrick, may have icon display issues
```

The Docker command (`docker-compose.yaml`) also passes `--config _config.yml,_config.dev.yml` to `jekyll serve` for the same reason described above — `_config.dev.yml` is bind-mounted from the host along with the rest of the repo, so it's visible inside the container even though it's gitignored.

### JavaScript Build

```bash
# Install Node dependencies
npm install

# Build minified JavaScript bundle
npm run build:js

# Watch for JS changes and rebuild
npm run watch:js
```

## Site Architecture

### Collections Structure

Jekyll collections define content types with automatic routing:

- **_publications/** - Research papers (journal articles and conference papers)
- **_talks/** - Conference presentations and invited talks
- **_teaching/** - Course materials and teaching experience
- **_portfolio/** - Project showcases
- **_posts/** - Blog posts (standard Jekyll posts)

Each collection outputs to `/:collection/:path/` (e.g., `/publications/2024-paper-title/`).

### Content Generation Workflow

**markdown_generator/** contains Python scripts and Jupyter notebooks for batch content creation:

1. Edit TSV files (`publications.tsv`, `talks.tsv`) with structured data
2. Run Python scripts or notebooks to generate individual markdown files:
   ```bash
   python markdown_generator/publications.py
   python markdown_generator/talks.py
   ```
3. Scripts parse TSV and create markdown files in respective collection directories

**Alternative workflow** - `PubsFromBib.ipynb` and `OrcidToBib.ipynb` for importing from BibTeX/ORCID.

### Page Templates

**_layouts/** defines page structures:
- `single.html` - Default content page (publications, posts, pages)
- `talk.html` - Specialized layout for talks
- `cv-layout.html` - CV page layout
- `archive.html`, `archive-taxonomy.html` - Collection listing pages

**_includes/** contains reusable components:
- `author-profile.html` - Sidebar author information
- `archive-single.html` - Content card for listings
- `archive-single-cv.html` - Compact CV format
- `cv-template.html` - Structured CV generation

### Configuration

**_config.yml** controls site behavior:

- **Lines 12-35:** Site metadata and author info (name, bio, location, email)
- **Lines 37-80:** Social/academic profile links (Google Scholar, ORCID, GitHub)
- **Lines 83-90:** Publication categories configuration
- **Lines 219-231:** Collections definitions (determines content types)
- **Lines 235-289:** Default frontmatter for each collection type

**_data/navigation.yml** defines header menu (currently shows Publications and CV only).

### Publication Organization

Publications use `category` frontmatter field:
- `manuscripts` → "Journal Articles"
- `conferences` → "Conference Papers"

Categories defined in `_config.yml` under `publication_category` (lines 83-90).

Publication permalinks through journal sites (not local PDFs) - see `paperurl` field in publication markdown files.

### Talkmap Feature

**talkmap.py** and **talkmap.ipynb** generate geographic map of talk locations:

1. Scrapes `location` field from `_talks/*.md` files
2. Geocodes locations using geopy/Nominatim
3. Generates Leaflet cluster map with getorg library
4. Output embedded in `/talkmap/` page

Note: Currently disabled in navigation (see `_data/navigation.yml` line 14-15).

## Key Technical Details

### Local Development Server

**Font/Icon Display Issue:** Jekyll's default WEBrick server doesn't send proper CORS headers for web fonts, causing Font Awesome and Academicons icons to fail loading in browsers. This is a **local development only** issue - GitHub Pages production serving works correctly.

**Solution:** Use the custom Python HTTP server (`serve.py`) which adds `Access-Control-Allow-Origin: *` headers to all responses. The `dev.sh` script automates the build-and-serve workflow.

**Icon Verification:**
- Check browser DevTools → Network tab for font files (.woff2)
- Should see `200 OK` status with `Content-Type: font/woff2`
- No CORS errors in Console tab
- Icons visible in author profile sidebar (location, email, Google Scholar, ORCID)

**Font Files Location:**
- Font Awesome 6.5.2: `assets/webfonts/` (fa-solid-900.woff2, fa-brands-400.woff2, etc.)
- Academicons: `assets/fonts/`
- SCSS configuration: `_sass/vendor/font-awesome/_variables.scss` sets `$fa-font-path: "../webfonts"`

### Jekyll Plugins

Site uses GitHub Pages-compatible plugins only:
- `jekyll-feed` - RSS feed generation
- `jekyll-redirect-from` - URL redirects
- `jemoji` - Emoji support
- `jekyll-paginate` - Pagination (currently disabled)

Note: `jekyll-sitemap` commented out in both `_config.yml` and `Gemfile`.

Note: `_plugins/font_mime_types.rb` exists but is no longer needed with Python server approach.

### Sass Compilation

- Source: `_sass/` directory
- Output style: compressed
- Uses `breakpoint-sass` gem for responsive breakpoints

### Build Exclusions

Important directories excluded from Jekyll build (see `_config.yml` lines 164-190):
- `vendor/` (currently commented in .gitignore)
- `node_modules/`
- `markdown_generator/`
- Docker/deployment files

## Data Files

**_data/cv.json** - Structured CV data (14KB) for alternative JSON-based CV rendering (currently disabled in navigation).

**_data/ui-text.yml** - Internationalization strings and UI labels.

## Common Workflows

### Adding New Publication

**Option 1: Manual**
1. Create markdown file in `_publications/` with format: `YYYY-MM-DD-title-slug.md`
2. Add frontmatter with required fields: `title`, `author`, `collection: publications`, `category`, `venue`, `date`, `citation`, `paperurl`
3. File automatically appears on `/publications/` page

**Option 2: Batch Import**
1. Add row to `markdown_generator/publications.tsv`
2. Run: `python markdown_generator/publications.py`
3. Review generated markdown files

### Updating Site Content

After modifying `_config.yml`, restart Jekyll server (changes not auto-reloaded).

For all other files (markdown, layouts, includes), Jekyll live reload applies changes automatically.

### Attaching Slides and Other Resources to Any Item

Any item in **any** collection (publications, talks, teaching, portfolio, posts)
can attach resource links purely through frontmatter — no layout edits:

```yaml
slidesurl: "https://mitchg10.github.io/slides/<slug>/"
paperurl:  "https://doi.org/..."
posterurl: "/files/poster.pdf"
codeurl:   "https://github.com/..."
videourl:  "https://..."
bibtexurl: "/files/ref.bib"
link:      "https://..."
```

Each field present renders a button; slides gets the theme accent
(`.btn--primary`), the rest are plain `.btn`. Items declaring none of these
fields emit nothing at all — not even whitespace.

**Every resource button opens in a new tab** (`target="_blank"
rel="noopener noreferrer"`) with a hidden `.screen-reader-text` "(opens in a new
tab)" cue. Published decks are self-contained Reveal pages that capture the
browser and offer no way back to the site; the other fields point off-site or at
a file. This is unconditional — there is no per-entry opt-out. Slide links written
inline in body copy need the same treatment by hand, via a kramdown span IAL:
`[Deck](url){:target="_blank" rel="noopener noreferrer"}` (see
`_teaching/2026-05-fulbright-dc.md`).

**The single source of truth is `_data/resource_links.yml`.** To add a new
resource type, add one entry there (field, label, Font Awesome icon, optional
class); nothing else needs editing. The order in that file is the button order.

Three consumers read that spec:
- `_includes/resource-links.html` — the shared renderer. Call it as
  `{% include resource-links.html item=page %}` on detail pages, or
  `{% include resource-links.html item=post size="small" %}` on listing cards.
  It relies on Jekyll document drops supporting dynamic key lookup
  (`item[spec.field]`), which is verified working.
- `_pages/publications.html` — serializes the fields into
  `window.publicationsData[].resources` and emits the spec list as
  `window.resourceLinkSpecs`.
- `assets/js/publications-filter.js` — `buildResourceLinks()` mirrors the Liquid
  include for the JS-rendered publication cards. **The publications index hides
  the static Liquid list once JS runs, so a change to the include alone is
  invisible there** — both halves must stay in sync, which is why they share the
  data file.

Buttons are suppressed on related-post grid cards (`include.type == "grid"` in
`_includes/archive-single.html`), where they would be noise.

Styling lives in `_sass/layout/_buttons.scss` (`.resource-links` flex row).

The decks themselves live in `mitchg10/presentations` and are published as
single self-contained HTML files (via its `build-slides.sh`) to the separate
`mitchg10/slides` GitHub Pages repo — deliberately kept out of this repo so the
Jekyll build stays fast and the site stays small. **That repo does not exist
yet**, so `_talks/2027-06-23-asee-like-X.md` keeps its `slidesurl` commented
out; uncomment it once the deck is actually published, or the button 404s.

### AI Summary Disclosure

Publication, talk, and teaching pages carry a discreet footnote disclosing that
their summaries and descriptions are LLM-drafted and human-checked, with a link
to `/contact/`.

The note is rendered by `_includes/ai-summary-note.html` and is **config-driven,
not hard-coded in a layout**. It renders only when a page has `ai_summary: true`,
which is set per collection in the `defaults:` block of `_config.yml` for
`publications`, `talks`, and `teaching`.

Two consequences worth knowing:

- To add or remove a whole collection from the disclosure, edit `_config.yml` —
  don't touch the layouts. To exempt one page, set `ai_summary: false` in its own
  frontmatter.
- The flag (rather than the layout) is what scopes the note, because
  `_layouts/single.html` is shared by `_posts`, `_pages`, `_portfolio`, and
  `_teaching`. Only `_teaching` sets the flag, so the others render nothing —
  the include emits no output at all, not even whitespace, when the flag is absent.

The include is called from all three layouts (`publication.html`, `talk.html`,
`single.html`) as the last element inside `<section class="page__content">`.
Styling lives in `_sass/layout/_ai-note.scss` (imported from
`assets/css/main.scss`), deliberately quieter than the `.notice--*` family and
themed via the `--global-*` custom properties so dark mode needs no extra rules.

`llms.txt` carries the machine-readable counterpart of the same disclosure —
keep the two in sync if the wording changes.

Note that `_config.yml` changes are not picked up by `--watch`; restart the server.

### Masking Summary Sections on Unpublished Publications

A publication that is in submission or under review can withhold individual
summary sections from its rendered page while keeping the prose in the file,
ready to reveal on acceptance. List the field names in its frontmatter:

```yaml
masked_sections:
  - key_findings
  - implications
```

A masked section emits nothing at all — no heading, no placeholder — so it looks
exactly like a field that was never filled. Most publications have no
`masked_sections`; omit the field rather than writing an empty list.

**The single source of truth is `_data/publication_sections.yml`**, which defines
what sections exist, their order on the page, their headings, and their render
type (`prose`, `list`, `tags`). The `field:` values there are also the only valid
entries in `masked_sections` — a name not in that file masks nothing and fails
silently, with no build error. To add or reorder a section, edit that file alone.

Two consumers read the spec:

- `_includes/publication-sections.html` — the renderer, called from
  `_layouts/publication.html` as
  `{% include publication-sections.html item=page %}`. It is deliberately
  generic (`item=`, not `page.`), so `talk.html` / `single.html` could adopt it
  if those collections ever grow structured summaries.
- `_pages/publications.html` — applies the mask to `plain_language_summary`
  when serializing `window.publicationsData`, so a masked summary also drops the
  blurb from the card on `/publications/`.

Unlike the resource-links pattern, **`assets/js/publications-filter.js` needs no
masking logic** — it consumes the already-masked value and its existing
`${summary ? … : ''}` guard renders no `.pub-card-summary` for an empty string.
There is no duplicated half to keep in sync here.

One asymmetry by design: masking `tags` hides only the detail page's Tags
section. The index cards' keyword pills and the Topic dropdown are built from the
tag union in `getUniqueTags()`, so the paper stays filterable — silently dropping
it from topic navigation would be worse than the inconsistency.

**This is not an embargo.** `_publications/*.md` is public in this repo, so
masking hides prose from the rendered site, not from github.com. It is the right
tool for not advertising unreviewed findings; genuinely sensitive text should be
left out of the file entirely.

The `paper-yaml-formatter` skill treats masking as an approval gate — it offers
`key_findings` + `implications` for papers whose citation reads `(Submitted)` or
`(In Press)`, and never masks silently.

`_data/*.yml` changes do require a rebuild, but `--watch` picks them up; only
`_config.yml` needs a restart.

### Modifying Navigation

Edit `_data/navigation.yml` to add/remove header menu items. Order in file determines display order.

### CV Updates

**Source of Truth:** `files/resume.tex` - LaTeX resume is the canonical CV document.

**Website CV Options:**

**Option 1 (Active):** Edit `_pages/cv.md` directly (markdown format).
- When updating, reference `files/resume.tex` to maintain consistency
- Key sections: Education, Publications, Research Experience, Professional Experience, Projects, Service, Teaching, Technical Skills

**Option 2 (Inactive):** Update `_data/cv.json` and enable `/cv-json/` in navigation (structured JSON format).

### Syncing Resume Content to Website

When publications, projects, or experience updates occur in `files/resume.tex`:
1. Update corresponding markdown files in `_publications/`, `_portfolio/`, or `_teaching/`
2. Update `_pages/cv.md` if using markdown CV
3. Ensure publication categories match between resume and website:
   - Resume distinguishes: Journal Publications, Conference Publications, Book Chapters
   - Website uses: `category: manuscripts` (journals) or `category: conferences`

## Content Context

### Research Areas & Publications

Primary research involves:
- **Generative AI in Education:** Faculty mental models, student use patterns, policy development, workplace adoption
- **Computational Qualitative Methods:** NLP for qualitative codebook generation, LLM-based analysis workflows
- **Engineering Education Research:** Collaborative behaviors, epistemic cognition, knowledge representation
- **Workplace Studies:** Ethnographic methods, STS frameworks, expertise and workplace learning

Publication venues include:
- ASEE Annual Conference (primary venue for engineering education)
- International Journal of Engineering Education
- International Journal of Qualitative Methods
- Capstone Design Conference
- Frontiers in Education Conference

### Projects

Technical projects showcased on site span:
- **AI/ML Applications:** Ducky (AI software assistant with ReAct agents), epistemic climate analysis using LLMs
- **Web Applications:** React + TypeScript e-commerce (Between the Lines), FastAPI + React course analysis tools
- **Educational Technology:** Graduate course enrollment analysis, automated ETL pipelines
- **Research Tools:** NLP workflows for qualitative research, DuckDB-based job market analysis

All projects emphasize practical applications combining software engineering and research methodologies.

### External Links

Publications should link to:
- Official journal DOIs (preferred): `https://doi.org/...`
- ASEE PEER repository: `https://peer.asee.org/...`
- Google Scholar search (fallback): `https://scholar.google.com/scholar?q=...`

Avoid hosting PDFs directly on site - use publisher links or institutional repositories.
