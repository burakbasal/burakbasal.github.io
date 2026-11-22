import status from '@/data/link-status.json'

export type LiveState = 'online' | 'maintenance' | 'offline'

/** Maps a project URL to the weekly monitor result, without inventing status. */
export function liveState(href: string): LiveState {
  const result = status.results.find((item) => item.url === href || item.final === href)
  if (!result) return 'online'
  if (!result.ok) return 'offline'
  if (/maintenance|bakim/i.test(result.final)) return 'maintenance'
  return 'online'
}

export const linkCheckedAt = status.checkedAt
