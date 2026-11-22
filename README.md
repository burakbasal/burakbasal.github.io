# Burak Başal — Portfolio

A single-page portfolio for **Burak Başal** (English: Burak Basal), built from scratch as a greenfield project. Positioning is deliberately simple: **developer** — the work spans software, interfaces, real-time systems and games.

Live: <https://burakbasal.github.io/>

## Stack

- Vue 3 + TypeScript + Vite 8
- Plain modern CSS with semantic custom properties (no utility framework)
- `@vueuse/core` for the few browser listeners the UI needs
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

## Features

- **Six featured projects, every one with a verified public URL.** Roamcroft and satkolay link to their own `.com` sites; endless-wordle, wall-race and rezonans link to live GitHub Pages demos; Global Bilgi · CallSim links to its current Cloudflare Pages address (`gbsim.pages.dev`). The CallSim demo depends on a local origin, so the card notes that it can be offline.
- **Real screenshots** from the live pages (`public/images/*.jpg`, all 1200×675). Roamcroft uses an owner-supplied gameplay capture, satkolay uses an owner-supplied capture of the storefront, and CallSim uses a fresh capture of the live platform.
- **TR / EN language switch** in the header and mobile menu. The choice persists in `localStorage` and updates `<html lang>`, `document.title`, the meta description, OG/Twitter titles and OG locale. Turkish renders the surname as **Başal**, English as **Basal**.
- **Black / white theme switch** using semantic CSS custom properties. Black is the default regardless of OS preference; the light theme is an explicit choice and persists.
- **Large but viewport-safe name and dense layout**: the hero name scales up to 248px on wide screens, with a shorter rule for laptop windows that also have a Windows taskbar. Phones end the hero with its content instead of leaving an empty band. The work grid is three columns on desktop and every card carries a real screenshot, a live link and a clickable image.
- **CSS interaction layer**: hover focus dims sibling cards with `:has()`, card images lift and reveal a “Live site” pill, a scroll-progress hairline runs under the header, and a pre-rendered noise tile adds texture in both themes. All of it respects reduced motion and touch devices.
- **Inline SVG icons only**: every directional arrow is a stroke SVG from `AppIcon.vue`. There are no emoji or arrow glyphs anywhere in the interface, including CSS pseudo-elements.
- **Aggressive content guard**: selection, copy, cut, drag, the context menu, printing and the usual DevTools shortcuts (`F12`, Ctrl/Cmd+Shift+I/J/C/K, Ctrl+U, Ctrl+S, Ctrl+P) are intercepted; a small localized notice asks “Bu bilgileri ne yapacaksın?” instead. A watchdog also watches window geometry and debugger timing, and masks the page behind a “Geliştirici araçları algılandı” shield when tools are detected. Production overrides `console` methods so the console stays empty. These are deterrents, not a security boundary — anything rendered in a browser can still be screenshotted or fetched from the network tab.
- **Credentials, without invented detail**: every project was designed and built solo (no team); education is Vocational & Technical Anatolian High School, Information Technologies / Software Development; certificates shown are CCNA: Introduction to Networks, CyberOps Associate and Ethical Hacker. The certificate PDFs themselves are not published because they contain a personal email address.

## Design and motion

The visual system is monochromatic: near-black surfaces (`#050505`, `#0B0B0D`), broken-white type, cool grey secondary text and low-opacity white hairlines. The light theme mirrors the same hierarchy with paper-white surfaces and near-black type. No neon, terminal or code-rain aesthetics.

Motion is deliberately restrained:

- CSS-only staggered entrance for the hero
- `IntersectionObserver` scroll reveals, disconnected after first visibility
- Desktop-only, rAF-throttled pointer spotlight and magnetic CTA
- CSS-only card focus dimming, image lift and live-link pill
- Scroll-driven progress hairline (`animation-timeline: scroll()`), with a clean no-support fallback
- One slow, transform-only ambient drift; no canvas, WebGL or shaders
- Full `prefers-reduced-motion` and `prefers-reduced-data` fallbacks

Pointer effects are gated behind `(hover: hover) and (pointer: fine)` and never run on touch devices.

## Content provenance

Project content is limited to verifiable, high-level information from the public GitHub profile, public repository metadata and live sites. Private repositories are labelled and link only to their public demos — no source, configuration or internal links are included. The former portfolio repository and its terminal aesthetic were not reused.

Social links were verified: GitHub (`burakbasal`), LinkedIn, X, Instagram and Discord (`dev.burak`, user ID supplied by the owner). GitLab had no matching user, the old `user02718281828.github.io/projects/` URL returned 404, and the old GitHub username is not used in any GitHub profile link.

`satkolay.com` currently redirects to a maintenance page; the card states this. `gbsim.pages.dev` was live at capture time but needs its local origin, so the card keeps that limitation visible.

## Performance and validation

Production build: JS **41.3 kB gzip**, CSS **5.7 kB gzip**, plus six lazy-loaded JPEG screenshots and a 7 kB noise tile. Tailwind, `motion-v`, the unused font packages and the old SVG tile were removed. The scroll-repaint grain filter and header backdrop blur were replaced with cheaper equivalents; local Lighthouse TBT dropped from 60 ms to 20 ms and LCP from 1.2 s to 1.1 s.

Manual checks passed at 320×568, 375×667, 390×844, 430×932, 768×1024, 1366×640, 1440×900 and 1920×1080: zero horizontal overflow, zero console errors, all six card images loaded at 1200×675, clickable image and title links resolve to the six live URLs. Mobile menu open/close, Escape handling, focus return, skip link, language and theme persistence, `document.title` updates, the live-link pill and both font subsets were verified in headless Chrome. The final live pass also verified zero arrow/emoji glyphs in rendered text, 29 inline SVG icons, the production CSP and Permissions-Policy, an empty browser console, a blocked Ctrl+A with an empty selection, the localized guard notice, a working devtools geometry shield on desktop, and `gbsim.pages.dev` as the CallSim URL. axe-core (WCAG 2.0/2.1 A+AA) reports zero violations in both dark/TR and light/EN modes.

Lighthouse on the current production deployment: **100/100/100/100** (Perf/A11y/BP/SEO), LCP 1.2 s, TBT 60 ms, CLS 0. Local production preview measured 100/100/100/100 with LCP 1.1 s and TBT 20 ms. The content guard, devtools shield, silent console, CSP and inline SVG icons were included in both runs.

## Deployment

`main` is deployed by `.github/workflows/deploy.yml` using the official GitHub Pages Actions flow. Vite uses `base: '/'`. No `CNAME` file is included because the site uses the default `burakbasal.github.io` domain.

The older private repository `user02718281828.github.io` has a `CNAME` pointing at `burakbasal.github.io`, but no conflict occurred and no change was needed. That repository was not modified.

No credentials or secrets are stored in this repository.
