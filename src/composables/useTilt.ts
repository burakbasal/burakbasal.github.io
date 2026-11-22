import { onScopeDispose, ref, type Ref } from 'vue'
import { useEventListener } from '@vueuse/core'

/**
 * Desktop-only, rAF-throttled card tilt + spotlight. One layout read per
 * pointer entry and four CSS custom properties per frame; no layout writes.
 * Touch, reduced-motion and keyboard users keep the static card.
 */
export function useTilt(enabled: Ref<boolean>, target = ref<HTMLElement | null>(null)) {
  const el = target
  let rect: DOMRect | null = null
  let frame = 0
  let tiltX = 0
  let tiltY = 0
  let spotX = 50
  let spotY = 50

  const write = () => {
    frame = 0
    if (!el.value) return
    const style = el.value.style
    style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`)
    style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`)
    style.setProperty('--spot-x', `${spotX.toFixed(1)}%`)
    style.setProperty('--spot-y', `${spotY.toFixed(1)}%`)
  }

  useEventListener(el, 'pointerenter', (event: PointerEvent) => {
    if (!enabled.value || event.pointerType !== 'mouse' || !el.value) return
    rect = el.value.getBoundingClientRect()
    el.value.classList.add('is-tilting')
  })

  useEventListener(el, 'pointermove', (event: PointerEvent) => {
    if (!enabled.value || !rect || event.pointerType !== 'mouse') return
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    tiltX = (0.5 - y) * 4
    tiltY = (x - 0.5) * 5
    spotX = x * 100
    spotY = y * 100
    if (!frame) frame = requestAnimationFrame(write)
  })

  const reset = () => {
    rect = null
    tiltX = 0
    tiltY = 0
    spotX = 50
    spotY = 50
    el.value?.classList.remove('is-tilting')
    if (!frame) frame = requestAnimationFrame(write)
  }

  useEventListener(el, 'pointerleave', reset)
  useEventListener(el, 'blur', reset)

  onScopeDispose(() => {
    if (frame) cancelAnimationFrame(frame)
  })

  return el
}
