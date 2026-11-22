# Burak Başal — Portfolio

A single-page portfolio for **Burak Başal** (English: Burak Basal), built from scratch as a greenfield project. Positioning is deliberately simple: **developer** — the work spans software, interfaces, real-time systems and games.

Live: <https://burakbasal.github.io/>

## Stack

- Vue 3 + TypeScript + Vite 8
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Inspira UI v3 patterns, adapted selectively with `motion-v` and `@vueuse/core`
- Self-hosted variable fonts: Space Grotesk (latin + latin-ext for Turkish `ş/ğ/ı`) and Instrument Serif
- GitHub Pages + GitHub Actions

## Local development

```bash
npm ci
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

## Features added in the latest pass

- **Seven featured projects, every one with a verified public URL.** Roamcroft and satkolay link to their own sites; endless-wordle, neon-grid-smash, wall-race and rezonans link to live GitHub Pages demos; Global Bilgi · CallSim links to its published Cloudflare Pages address (`aksa.pages.dev`). The CallSim demo depends on a local origin and can return 503 while it is offline — the card says so explicitly.
- **Real screenshots** captured from the live pages are used as card visuals (`public/images/*.jpg`). The one project whose live page was offline at capture time uses an original, clearly non-screenshot SVG tile.
- **TR / EN language switch** in the header and mobile menu. Choice is persisted in `localStorage`; it also updates `<html lang>`, `document.title`, meta description and OG/Twitter titles. Turkish renders the surname as **Başal**, English as **Basal**.
- **Black / white theme switch** using semantic CSS custom properties. Black is the default regardless of OS preference; the light theme is an explicit choice and is persisted.
- **Larger name and denser layout**: the hero name scales up to 304px on wide screens, section padding was reduced, the work grid is three columns on desktop, and hero stats, credentials and certificates fill the page instead of leaving large gaps.
- **Credentials, without invented detail**: every project was designed and built solo (no team); education is Vocational & Technical Anatolian High School, Information Technologies / Software Development; certificates shown are CCNA: Introduction to Networks, CyberOps Associate and Ethical Hacker. The certificate PDFs themselves are not published because they contain a personal email address.

## Design and motion

The visual system is monochromatic: near-black surfaces (`#050505`, `#0B0B0D`), broken-white type, cool grey secondary text and low-opacity white hairlines. The light theme mirrors the same hierarchy with paper-white surfaces and near-black type. No neon, terminal or code-rain aesthetics.

Motion is deliberately restrained:

- CSS-only staggered entrance for the hero
- `IntersectionObserver` scroll reveals, disconnected after first visibility
- Desktop-only, rAF-throttled pointer spotlight and magnetic CTA
- Desktop-only card spotlight using cached rects and CSS custom properties
- One slow, transform-only ambient drift; no canvas, WebGL or shaders
- Full `prefers-reduced-motion` and `prefers-reduced-data` fallbacks

Pointer effects are gated behind `(hover: hover) and (pointer: fine)` and never run on touch devices.

## Content provenance

Project content is limited to verifiable, high-level information from the public GitHub profile, public repository metadata and live sites. Private repositories are labelled and link only to their public demos — no source, configuration or internal links are included. The former portfolio repository and its terminal aesthetic were not reused.

Social links were verified: GitHub (`burakbasal`), LinkedIn, X, Instagram and Discord (`dev.burak`, user ID supplied by the owner). GitLab had no matching user, the old `user02718281828.github.io/projects/` URL returned 404, and the old GitHub username is not used in any GitHub profile link.

The live `satkolay.com` demo currently redirects to a maintenance page; the card states this and keeps the source link primary-adjacent. `aksa.pages.dev` returned 503 during verification because its local origin was offline; the link and limitation are both shown honestly.

## Performance and validation

Local production build (latest pass): JS **40.8 kB gzip**, CSS **6.9 kB gzip**, plus 6 small JPEG screenshots and one SVG tile, all lazy-loaded.

Manual checks passed at 320×568, 375×667, 390×844, 430×932, 768×1024, 1440×900 and 1920×1080: zero horizontal overflow, zero console errors, all seven card images loaded after scroll. Mobile menu open/close, Escape handling, focus return, skip link, language persistence, theme persistence, `document.title` updates and both font subsets were verified in headless Chrome. axe-core (WCAG 2.0/2.1 A+AA) reports zero violations in both dark/TR and light/EN modes.

Lighthouse scores from the previous production deployment were 99/100/100/100 (Perf/A11y/BP/SEO) with LCP 1.4 s and CLS 0. The current pass adds screenshots, i18n and theming, so the live-site scores are re-measured after deployment rather than assumed here.

## Deployment

`main` is deployed by `.github/workflows/deploy.yml` using the official GitHub Pages Actions flow. Vite uses `base: '/'`. No `CNAME` file is included because the site uses the default `burakbasal.github.io` domain.

The older private repository `user02718281828.github.io` has a `CNAME` pointing at `burakbasal.github.io`, but no conflict occurred and no change was needed. That repository was not modified.

No credentials or secrets are stored in this repository.
