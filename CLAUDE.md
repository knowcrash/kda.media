# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
hugo           # Build static site to /public/
hugo server    # Dev server with hot reload at localhost:1313
```

No npm or Node.js required - pure Hugo static site.

## Project Overview

Single-page portfolio website for KDA Media, a drone photography/videography business. Built with Hugo using a custom theme called "kda".

## Architecture

### File Structure

```
config/_default/hugo.toml    # Site config, params, navigation menu
content/_index.md            # Homepage (minimal - just front matter)
themes/kda/
  layouts/
    _default/baseof.html     # Base template: header, nav, contact overlay, footer
    index.html               # Homepage sections (extends baseof via "main" block)
  static/
    css/style.css            # All styling (710 lines, CSS custom properties)
    js/main.js               # Scroll effects + contact modal (27 lines)
    fonts/                   # Grozen font family (5 weights: 300-700)
    img/                     # Theme images (bio photos)
static/
  img/logo.png               # Site logo
  video/hero-optimized.mp4   # Hero background video (24MB)
```

### Hugo Templating

- `baseof.html` defines the document structure and the "main" block placeholder
- `index.html` fills the "main" block with homepage sections
- Site params accessed via `.Site.Params.*` (heroTitle, heroTagline, description)
- Menu items defined in hugo.toml as `[[menus.main]]` entries with name, url, weight
- New content archetypes use TOML front matter (see `archetypes/default.md`)

### CSS Architecture

All styles in `/themes/kda/static/css/style.css`:

**Color variables** (`:root` selector):
- Background gradient: `--color-bg-darkest` (#151213) through `--color-bg-lighter` (#383334)
- Accents: `--color-navy`, `--color-light-blue` (#B0C0E3), `--color-red` (#F04C32), `--color-yellow`
- Fonts: `--font-heading` (Grozen), `--font-body` (Montserrat)

**Section modifiers**: `.section-light`, `.section-lighter`, `.section-dark`, `.section-darkest`, `.section-mini`

**Section-specific heading colors**: #why uses `--color-light-blue`, #about and #contact use `--color-red`

**Mobile breakpoint**: 768px - triggers hamburger menu and stacked layouts

### JavaScript Behavior

`/themes/kda/static/js/main.js` handles:
1. Header scroll effect: adds `.scrolled` class after 100px scroll (solid background)
2. Contact overlay: `#contact-toggle` toggles `.active` on `#contact-overlay`, click-outside-to-close

### Z-Index Layering

- `.site-header`: 1000 (1002 on mobile)
- `.btn-contact`: 1001 (stays above overlay)
- `.contact-overlay`: 999

## Page Sections

Homepage sections (in order): Hero, Why (#why), Contact (#contact), About (#about)

**Hero**: Full-viewport with autoplay/muted/loop video background, gradient overlay, content positioned at bottom

**Content sections**: Use `.float-left` class for images with text wrap, clearfix via `::after` pseudo-element

## Key Patterns

**Adding a new section**:
1. Add `<section id="newsection">` in `themes/kda/layouts/index.html`
2. Add styles in `style.css`
3. Add `[[menus.main]]` entry in `hugo.toml` for navigation

**Updating site copy**: Hero text comes from `hugo.toml` params; section content is hardcoded in `index.html`

**Contact modal content**: Located in `baseof.html` lines 18-35 (not in index.html)

**Anchor scroll**: `scroll-padding-top: 80px` in html element accounts for fixed header height
