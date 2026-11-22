/**
 * Cloudflare Worker in front of burakbasal.github.io.
 * Adds real HTTP security headers and replaces the static fallback nonce with
 * a fresh nonce on every HTML response. Deploy with `wrangler deploy`.
 */
const ORIGIN = 'https://burakbasal.github.io'
const STATIC_NONCE = 'bb-portfolio-2026'

const CSP = [
  "default-src 'self'",
  "script-src 'self' __NONCE__",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

function createNonce() {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  const raw = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('')
  return btoa(raw).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const origin = new URL(ORIGIN)
    url.protocol = origin.protocol
    url.host = origin.host

    const upstream = await fetch(new Request(url, request), { redirect: 'manual' })
    const headers = new Headers(upstream.headers)
    const isHtml = (headers.get('content-type') || '').includes('text/html')
    const nonce = createNonce()

    const securityHeaders = {
      'Content-Security-Policy': CSP.replace('__NONCE__', `'nonce-${nonce}'`),
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'same-origin',
      'X-XSS-Protection': '0',
    }
    for (const [name, value] of Object.entries(securityHeaders)) headers.set(name, value)

    const init = { status: upstream.status, statusText: upstream.statusText, headers }
    if (!isHtml) return new Response(upstream.body, init)

    const body = (await upstream.text()).split(STATIC_NONCE).join(nonce)
    headers.delete('content-length')
    headers.delete('content-encoding')
    headers.set('content-type', 'text/html; charset=utf-8')
    return new Response(body, init)
  },
}
