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
bundle exec jekyll build --watch

# Terminal 2: Serve with CORS support
cd _site && python3 ../serve.py
```

**Why Python Server Instead of Jekyll's Default?**

Jekyll's built-in WEBrick server doesn't properly serve web font files (.woff, .woff2) with correct CORS headers, causing Font Awesome and Academicons icons to fail loading in local development. The custom Python server (`serve.py`) adds `Access-Control-Allow-Origin` headers to all responses, fixing icon display issues.

**Key files:**
- `serve.py` - Python HTTP server with CORS headers
- `dev.sh` - Convenience script (build + serve)

**Manual Jekyll commands (if needed):**
```bash
# Install Ruby dependencies
bundle install

# Build site only (output to _site/)
bundle exec jekyll build

# Note: 'jekyll serve' works but icons won't display properly
```

### Docker Development

```bash
# Run with Docker Compose (includes live reload)
docker-compose up

# Access at http://localhost:4000
# Note: Also uses WEBrick, may have icon display issues
```

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
