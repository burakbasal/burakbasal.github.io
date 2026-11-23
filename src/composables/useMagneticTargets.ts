import { onScopeDispose, type Ref } from 'vue'
import { useEventListener } from '@vueuse/core'

const SELECTOR = '.btn, .header__cta, .to-top, .work__filter'

/**
 * One delegated pointer listener for every primary control. Reuses the same
 * --mx/--my convention as the hero button, with a gentler pull (0.07) for
 * small controls. Disabled on touch and for reduced-motion users.
 */
export function useMagneticTargets(enabled: Ref<boolean>) {
  let active: HTMLElement | null = null
  let rect: DOMRect | null = null
  let frame = 0
  let x = 0
  let y = 0

  const write = () => {
    frame = 0
    if (!active) return
    active.style.setProperty('--mx', `${x.toFixed(1)}px`)
    active.style.setProperty('--my', `${y.toFixed(1)}px`)
  }

  const reset = () => {
    if (active) {
      active.style.setProperty('--mx', '0px')
      active.style.setProperty('--my', '0px')
    }
    active = null
    rect = null
    x = 0
    y = 0
  }

  useEventListener(document, 'pointerover', (event: PointerEvent) => {
    if (!enabled.value || event.pointerType !== 'mouse') return
    const el = (event.target as Element | null)?.closest<HTMLElement>(SELECTOR)
    if (!el || el === active || el.classList.contains('btn')) return
    reset()
    active = el
    rect = el.getBoundingClientRect()
  })

  useEventListener(document, 'pointermove', (event: PointerEvent) => {
    if (!enabled.value || !active || !rect || event.pointerType !== 'mouse') return
    x = (event.clientX - (rect.left + rect.width / 2)) * 0.07
    y = (event.clientY - (rect.top + rect.height / 2)) * 0.07
    if (!frame) frame = requestAnimationFrame(write)
  })

  useEventListener(document, 'pointerout', (event: PointerEvent) => {
    if (!active) return
    const el = (event.target as Element | null)?.closest<HTMLElement>(SELECTOR)
    if (el === active && !el.contains(event.relatedTarget as Node | null)) reset()
  })

  useEventListener(window, 'blur', reset)

  onScopeDispose(() => {
    if (frame) cancelAnimationFrame(frame)
    reset()
  })
}
