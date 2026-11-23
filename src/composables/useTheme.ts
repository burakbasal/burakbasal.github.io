import { ref, watch } from 'vue'

export type Theme = 'dark' | 'light'

const KEY = 'bb-theme'
const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(KEY) : null

// The portfolio is black by default; light is an explicit user choice.
export const theme = ref<Theme>(stored === 'light' || stored === 'dark' ? stored : 'dark')

watch(
  theme,
  (next) => {
    document.documentElement.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#050505' : '#fafaf8')
    localStorage.setItem(KEY, next)
  },
  { immediate: true },
)

/** A pointer-origin monochrome wipe; skipped automatically for reduced motion. */
export function toggleTheme(origin?: { x: number; y: number }) {
  const root = document.documentElement
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduced) {
    root.style.setProperty('--iris-x', `${origin?.x ?? window.innerWidth / 2}px`)
    root.style.setProperty('--iris-y', `${origin?.y ?? window.innerHeight / 2}px`)
    root.classList.remove('theme-iris')
    // Force a restart when the toggle is clicked twice in quick succession.
    void root.offsetWidth
    root.classList.add('theme-iris')
    window.setTimeout(() => root.classList.remove('theme-iris'), 560)
  }
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
