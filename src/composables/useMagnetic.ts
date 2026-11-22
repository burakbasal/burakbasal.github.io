import { onScopeDispose, ref, type Ref } from 'vue'
import { useEventListener } from '@vueuse/core'

/**
 * Desktop-only, rAF-throttled "magnetic" offset. One layout read per pointer
 * entry, never per move. Disabled entirely for touch and reduced-motion users.
 */
export function useMagnetic(enabled: Ref<boolean>, target = ref<HTMLElement | null>(null)) {
  const el = target
  let rect: DOMRect | null = null
  let frame = 0
  let x = 0
  let y = 0

  const write = () => {
    frame = 0
    if (!el.value) return
    el.value.style.setProperty('--mx', `${x.toFixed(1)}px`)
    el.value.style.setProperty('--my', `${y.toFixed(1)}px`)
  }

  useEventListener(el, 'pointerenter', () => {
    if (!enabled.value || !el.value) return
    rect = el.value.getBoundingClientRect()
  })

  useEventListener(el, 'pointermove', (event: PointerEvent) => {
    if (!enabled.value || !rect || event.pointerType !== 'mouse') return
    x = (event.clientX - (rect.left + rect.width / 2)) * 0.12
    y = (event.clientY - (rect.top + rect.height / 2)) * 0.12
    if (!frame) frame = requestAnimationFrame(write)
  })

  const reset = () => {
    rect = null
    x = 0
    y = 0
    el.value?.style.setProperty('--mx', '0px')
    el.value?.style.setProperty('--my', '0px')
  }

  useEventListener(el, 'pointerleave', reset)
  useEventListener(el, 'blur', reset)

  onScopeDispose(() => {
    if (frame) cancelAnimationFrame(frame)
  })

  return el
}
