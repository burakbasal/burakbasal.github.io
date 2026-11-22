const KEY = 'bb-guard-events'

/** Local-only counter: no identifier, no network request, no personal data. */
export function noteAttempt(kind: 'copy' | 'shortcut' | 'devtools') {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || '{}') as Record<string, number>
    data[kind] = (data[kind] || 0) + 1
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    // Storage may be blocked; the guard still works without the counter.
  }
}
