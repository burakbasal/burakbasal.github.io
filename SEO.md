# Search and GitHub visibility

No one can guarantee a number one position: Google and GitHub rank pages from relevance, freshness,
authority and real external signals. Everything that can be controlled in this repository is done;
the remaining items need an account or genuine third-party links.

## Already implemented

- One canonical URL (`https://burakbasal.github.io/`) and a single canonical HTML page.
- Semantic single-page structure: one `h1`, real `nav`, `main`, `section`, `footer`, SVG-only icons.
- Turkish title and description, switched with the language control, plus `og:locale:alternate`.
- Open Graph and Twitter cards with a 1200x630 `og-image.png` and image alt text.
- JSON-LD `@graph`: `Person` (both names, title, verified profiles, `knowsAbout`), `WebSite` and
  `ItemList` with all six real project URLs and screenshots.
- `llms.txt` with verified facts and a preferred citation. `robots.txt` allows Googlebot and Bingbot
  and points to the XML sitemap, but disallows GPTBot, CCBot, ClaudeBot, Google-Extended and other AI
  training crawlers; `noai`/`noimageai` signals are also present in meta and in the Worker's
  `X-Robots-Tag`. Search ranking stays intact while generative-AI training requests are refused.
- Legal layer: `LICENSE` (all rights reserved), `humans.txt`, `legal.txt` (ToS + DMCA/FSEK notice),
  © notice and Legal link in the footer.
- `sitemap.xml`, `robots.txt`, `404.html`, `.well-known/security.txt` and `favicon.svg`.
- Repository description, homepage link and 20 GitHub topics set for GitHub search.
- Weekly CI that checks the live URLs, runs Lighthouse against the deployed site and validates
  the published structured data and assets.

## Needs your account (10 minutes each)

1. **Google Search Console**: add the property, verify with a DNS TXT record, then submit
   `https://burakbasal.github.io/sitemap.xml` and request indexing for the homepage.
2. **Bing Webmaster Tools**: import from Search Console or verify with the same DNS record,
   submit the sitemap.
3. **Cloudflare**: when DNS moves to Cloudflare, enable DNSSEC, add a CAA record
   (`issue "letsencrypt.org"`), and turn on automatic HTTPS rewrites. Deploy the Worker in
   `cloudflare/` for real security headers and per-request CSP nonces.
4. **GitHub profile**: pin this repository and add `https://burakbasal.github.io/` to the public
   profile bio so the site and repository reinforce each other.
5. **Profiles**: add the canonical site link to LinkedIn, X, Instagram and Discord bios.
   These are real, already verified profiles; no new accounts are needed.

## Genuine authority signals (do not fake)

- Publish a short launch or update post on dev.to, Hashnode or Medium that links to the site.
- Share a real project write-up (Roamcroft or CallSim) where the demo itself is relevant.
- Add the site to an existing personal README or portfolio directory you already control.
- Keep the six demo links healthy; the weekly monitor and the live badge expose dead links.
- Add new work only when it is real: every card must have a live URL, a real screenshot and
  no invented metric.

## Why some common tricks are not used

- No keyword meta stuffing, hidden text, doorway pages or link farms: these can produce penalties.
- No client-side cloaking for crawlers: the rendered page is the same for users and bots.
- No separate `/en` and `/tr` URLs, so hreflang would be misleading; language is a user choice
  stored locally. `og:locale:alternate` documents the availability instead.
