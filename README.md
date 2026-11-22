# Burak Basal — Portfolio

A single-page, dark editorial portfolio for **Burak Basal**, built from scratch as a greenfield project.

Live: <https://burakbasal.github.io/>

## Stack

- Vue 3 + TypeScript + Vite 8
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Inspira UI v3 motion patterns, adapted selectively with `motion-v` and `@vueuse/core`
- Self-hosted variable fonts (Space Grotesk, Instrument Serif)
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

## Design and motion

The visual system is monochromatic: near-black surfaces (`#050505`, `#0B0B0D`), broken-white type, cool grey secondary text and low-opacity white hairlines. No neon, terminal or code-rain aesthetics.

Motion is deliberately restrained:

- CSS-only staggered entrance for the hero
- `IntersectionObserver` scroll reveals, disconnected after first visibility
- Desktop-only, rAF-throttled pointer spotlight and magnetic CTA
- Desktop-only card spotlight using cached rects and CSS custom properties
- One slow, transform-only ambient drift; no canvas, WebGL or shaders
- Full `prefers-reduced-motion` and `prefers-reduced-data` fallbacks

The pointer effects are gated behind `(hover: hover) and (pointer: fine)` and never run on touch devices. Illustrations in the work section are original abstract SVG compositions, not screenshots of products.

## Content provenance

Project content is limited to verifiable, high-level information from the public GitHub profile, public repository metadata and live sites. Two private projects are described only by their repository descriptions; no private source, configuration or internal links are included. The former portfolio repository and its terminal aesthetic were not reused.

## Performance and validation

Local production build and Lighthouse audit (mobile emulation, headless Chrome):

| Check | Result |
| --- | --- |
| Lighthouse Performance | 100 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| FCP / LCP | 1.2 s / 1.2 s |
| TBT / CLS | 60 ms / 0 |
| JS (gzip) | 37.6 kB |
| CSS (gzip) | 6.1 kB |

Manual responsive checks passed at 320×568, 375×667, 390×844, 430×932, 768×1024, 1440×900 and 1920×1080 with no horizontal document overflow. Mobile menu, keyboard dismissal, focus return, skip link and reduced-motion behaviour were also verified.

Scores are measurements of the local production preview, not a guarantee of identical results in every network or device condition.

## Deployment

`main` is deployed by `.github/workflows/deploy.yml` using the official GitHub Pages Actions flow. Vite uses `base: '/'`. No `CNAME` file is included because the site uses the default `burakbasal.github.io` domain.

The older private repository `user02718281828.github.io` had a `CNAME` file pointing at `burakbasal.github.io`. If GitHub reports a domain conflict, that single configuration file must be removed from the old repository — its source code is never touched. (See commit history for whether this transition step was required.)

No credentials or secrets are stored in this repository.
