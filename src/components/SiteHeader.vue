<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { onKeyStroke, useWindowScroll } from '@vueuse/core'
import { t } from '@/data/i18n'
import AppIcon from './AppIcon.vue'
import SiteControls from './SiteControls.vue'

const props = defineProps<{ active: string }>()

const links = [
  { id: 'work', key: 'nav.work', n: '01' },
  { id: 'about', key: 'nav.about', n: '02' },
  { id: 'expertise', key: 'nav.expertise', n: '03' },
  { id: 'contact', key: 'nav.contact', n: '04' },
] as const

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

onKeyStroke('Escape', () => {
  if (open.value) close(true)
})
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled, 'menu-is-open': open }">
    <div class="shell site-header__inner">
      <a class="brand" href="#top" :aria-label="t('brand.label')" @click="close()">
        <span class="brand__mark">BB<span>.</span></span>
        <span class="brand__meta">{{ t('brand.meta') }}</span>
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
          {{ t(link.key) }}
        </a>
      </nav>

      <div class="header__end">
        <SiteControls class="controls--header" />
        <a class="header__cta" href="#contact">{{ t('nav.cta') }} <AppIcon name="arrow-up-right" /></a>
        <button
          ref="toggle"
          class="menu-toggle"
          type="button"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? t('menu.close') : t('menu.open')"
          @click="open = !open"
        >
          <span class="menu-toggle__lines" aria-hidden="true"><i></i><i></i></span>
        </button>
      </div>
    </div>

    <Transition name="menu">
      <nav v-if="open" id="mobile-menu" ref="menu" class="mobile-menu" aria-label="Mobile navigation">
        <div class="mobile-menu__top">
          <SiteControls />
        </div>
        <ul class="mobile-menu__list">
          <li v-for="link in links" :key="link.id">
            <a class="mobile-menu__link" :href="`#${link.id}`" @click="close()">
              {{ t(link.key) }} <span aria-hidden="true">{{ link.n }}</span>
            </a>
          </li>
        </ul>
        <div class="mobile-menu__foot">
          <a href="https://github.com/burakbasal" target="_blank" rel="noopener noreferrer">GitHub <AppIcon name="arrow-up-right" /></a>
          <a href="https://www.linkedin.com/in/burak-basal/" target="_blank" rel="noopener noreferrer">LinkedIn <AppIcon name="arrow-up-right" /></a>
          <a href="https://discord.com/users/1163182429331259574" target="_blank" rel="noopener noreferrer">Discord <AppIcon name="arrow-up-right" /></a>
        </div>
      </nav>
    </Transition>
  </header>
</template>
