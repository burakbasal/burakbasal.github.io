import fs from 'node:fs'

// The CallSim demo runs against a local origin and may be temporarily offline.
// It stays linked in the portfolio, but its downtime must not fail CI.
const optionalOffline = new Set(['https://gbsim.pages.dev/'])

const urls = [
  'https://roamcroft.com/',
  'https://satkolay.com/',
  'https://burakbasal.github.io/endless-wordle/',
  'https://burakbasal.github.io/wall-race/',
  'https://burakbasal.github.io/rezonans/',
  'https://gbsim.pages.dev/',
]

const results = await Promise.all(
  urls.map(async (url) => {
    try {
      const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000) })
      return { url, status: response.status, ok: response.ok, final: response.url }
    } catch {
      return { url, status: 0, ok: false, final: '' }
    }
  }),
)

const payload = {
  checkedAt: new Date().toISOString(),
  total: results.length,
  online: results.filter((result) => result.ok).length,
  results,
}

fs.writeFileSync('src/data/link-status.json', `${JSON.stringify(payload, null, 2)}\n`)
const offline = results.filter((result) => !result.ok)
console.log(`Live links: ${payload.online}/${payload.total}`)
for (const result of offline) console.log(`${optionalOffline.has(result.url) ? 'Optional' : 'Required'} offline: ${result.url} -> ${result.status}`)
if (offline.some((result) => !optionalOffline.has(result.url))) process.exitCode = 1
