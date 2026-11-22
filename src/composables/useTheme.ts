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

export function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
