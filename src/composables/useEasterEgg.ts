import { onScopeDispose } from 'vue'
import { useEventListener } from '@vueuse/core'

/** Typing the name triggers a short monochrome constellation burst. */
export function useEasterEgg(enabled: () => boolean) {
  let buffer = ''

  useEventListener(window, 'keydown', (event: KeyboardEvent) => {
    if (!enabled() || event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) return
    buffer = `${buffer}${event.key.toLowerCase()}`.slice(-5)
    if (buffer !== 'basal') return
    buffer = ''
    window.dispatchEvent(new Event('bb:burst'))
  })

  onScopeDispose(() => {
    buffer = ''
  })
}
