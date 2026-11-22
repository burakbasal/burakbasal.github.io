import type { Directive } from 'vue'

type RevealElement = HTMLElement & { __revealObserver?: IntersectionObserver }

/**
 * One IntersectionObserver per revealed element, disconnected as soon as the
 * element has appeared. Falls back to "visible" for reduced-motion users and
 * browsers without IntersectionObserver.
 */
export const reveal: Directive<RevealElement, number | undefined> = {
  mounted(el, binding) {
    if (typeof binding.value === 'number') {
      el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }

    el.classList.add('reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(el)
    el.__revealObserver = observer
  },
  unmounted(el) {
    el.__revealObserver?.disconnect()
  },
}
