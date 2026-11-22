/**
 * Cloudflare Worker: put this in front of burakbasal.github.io to send real
 * HTTP security headers. Deploy with `wrangler deploy` from the cloudflare/
 * directory after changing the origin in `ORIGIN`.
 *
 * The meta CSP in index.html stays as a fallback for plain GitHub Pages.
 */
const ORIGIN = 'https://burakbasal.github.io'

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'nonce-bb-portfolio-2026'",
  "style-src 'self' 'unsafe-inline'",
  'img-src \'self\' data: https:',
  'font-src \'self\' data:',
  "connect-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const HEADERS = {
  'Content-Security-Policy': CSP,
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'X-XSS-Protection': '0',
}

export default {
  async fetch(request) {
    const url = new URL(request.url)
    url.host = new URL(ORIGIN).host
    url.protocol = 'https:'

    const upstream = await fetch(new Request(url, request), { redirect: 'manual' })
    const headers = new Headers(upstream.headers)
    for (const [name, value] of Object.entries(HEADERS)) headers.set(name, value)

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers,
    })
  },
}
