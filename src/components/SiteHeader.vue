<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { onKeyStroke, useWindowScroll } from '@vueuse/core'

const props = defineProps<{ active: string }>()

const links = [
  { id: 'work', label: 'Work', n: '01' },
  { id: 'about', label: 'About', n: '02' },
  { id: 'expertise', label: 'Expertise', n: '03' },
  { id: 'contact', label: 'Contact', n: '04' },
]

const open = ref(false)
const toggle = ref<HTMLButtonElement | null>(null)
const menu = ref<HTMLElement | null>(null)
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 24)

watch(open, async (value) => {
  document.documentElement.classList.toggle('menu-open', value)
  if (value) {
    await nextTick()
    menu.value?.querySelector<HTMLAnchorElement>('a')?.focus()
  }
})

function close(restoreFocus = false) {
  open.value = false
  if (restoreFocus) toggle.value?.focus()
}

function go() {
  close()
}

onKeyStroke('Escape', () => {
  if (open.value) close(true)
})
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled }">
    <div class="shell site-header__inner">
      <a class="brand" href="#top" aria-label="BB. PORTFOLIO / 26 — back to top" @click="close()">
        <span class="brand__mark">BB<span>.</span></span>
        <span class="brand__meta">PORTFOLIO / 26</span>
      </a>

      <nav class="nav" aria-label="Primary navigation">
        <a
          v-for="link in links"
          :key="link.id"
          class="nav__link"
          :class="{ 'is-active': props.active === link.id }"
          :href="`#${link.id}`"
          :aria-current="props.active === link.id ? 'true' : undefined"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="header__end">
        <a class="header__cta" href="#contact">Let's talk <span aria-hidden="true">↗</span></a>
        <button
          ref="toggle"
          class="menu-toggle"
          type="button"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          @click="open = !open"
        >
          <span class="menu-toggle__lines" aria-hidden="true"><i></i><i></i></span>
        </button>
      </div>
    </div>

    <Transition name="menu">
      <nav v-if="open" id="mobile-menu" ref="menu" class="mobile-menu" aria-label="Mobile navigation">
        <ul class="mobile-menu__list">
          <li v-for="link in links" :key="link.id">
            <a class="mobile-menu__link" :href="`#${link.id}`" @click="go">
              {{ link.label }} <span aria-hidden="true">{{ link.n }}</span>
            </a>
          </li>
        </ul>
        <div class="mobile-menu__foot">
          <a href="https://github.com/burakbasal" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/burak-basal/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
      </nav>
    </Transition>
  </header>
</template>
