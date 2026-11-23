/**
 * Cloudflare Worker in front of burakbasal.github.io.
 * Adds real HTTP security headers, refuses known AI training crawlers and
 * replaces the static fallback nonce with a fresh nonce on every HTML response.
 * Deploy with `wrangler deploy`.
 */
const ORIGIN = 'https://burakbasal.github.io'
const STATIC_NONCE = 'bb-portfolio-2026'

// Edge-level refusal for generative-AI / training crawlers. Googlebot and
// Bingbot are deliberately not listed: search ranking must stay intact.
const BLOCKED_AI_BOTS = /GPTBot|CCBot|ClaudeBot|Google-Extended|Applebot-Extended|Bytespider|PerplexityBot|Amazonbot|Meta-ExternalAgent|ChatGPT-User|Omgilibot|Omgili|Webzio-Extended|AI2Bot|YouBot|Kangaroo Bot|PanguBot|Timpibot|ImagesiftBot|Diffbot|Crawlspace|DuckAssistBot|VelenPublicWebCrawler/i

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
  'report-uri /_csp-report',
  'report-to csp',
].join('; ')

const PERMISSIONS_POLICY = [
  'accelerometer=()',
  'autoplay=()',
  'camera=()',
  'display-capture=()',
  'document-domain=()',
  'encrypted-media=()',
  'fullscreen=()',
  'gamepad=()',
  'geolocation=()',
  'gyroscope=()',
  'magnetometer=()',
  'microphone=()',
  'midi=()',
  'payment=()',
  'picture-in-picture=()',
  'publickey-credentials-get=()',
  'screen-wake-lock=()',
  'usb=()',
  'xr-spatial-tracking=()',
].join(', ')

function createNonce() {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  const raw = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('')
  return btoa(raw).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const userAgent = request.headers.get('user-agent') || ''

    // A hidden link in the served HTML points here. Following it proves the
    // client ignored robots.txt or scraped the DOM; log it for enforcement.
    if (url.pathname.startsWith('/noai-honeypot')) {
      console.log('HONEYPOT_HIT', JSON.stringify({ path: url.pathname, userAgent, referer: request.headers.get('referer') || '' }))
      return new Response('Forbidden', {
        status: 403,
        headers: {
          'Cache-Control': 'no-store',
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Robots-Tag': 'none, noai, noimageai',
        },
      })
    }

    if (BLOCKED_AI_BOTS.test(userAgent)) {
      console.log('AI_BOT_BLOCKED', JSON.stringify({ path: url.pathname, userAgent }))
      return new Response('Forbidden', {
        status: 403,
        headers: {
          'Cache-Control': 'no-store',
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Robots-Tag': 'none, noai, noimageai',
        },
      })
    }

    // Browser CSP violation reports are logged in the Worker's live tail.
    if (url.pathname === '/_csp-report' && request.method === 'POST') {
      const report = await request.text()
      console.log('CSP_REPORT', report.slice(0, 4000))
      return new Response(null, {
        status: 204,
        headers: { 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': ORIGIN },
      })
    }

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
      'Referrer-Policy': 'no-referrer',
      'Permissions-Policy': PERMISSIONS_POLICY,
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Resource-Policy': 'same-origin',
      'X-Permitted-Cross-Domain-Policies': 'none',
      'X-Robots-Tag': 'index, follow, max-image-preview:large, noai, noimageai',
      'X-XSS-Protection': '0',
      'Reporting-Endpoints': 'csp="https://burakbasal.github.io/_csp-report"',
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
