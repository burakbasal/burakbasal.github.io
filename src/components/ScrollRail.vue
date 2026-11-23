<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { t } from '@/data/i18n'

const props = defineProps<{ active: string }>()

const sections = [
  { id: 'work', key: 'nav.work', n: '01' },
  { id: 'about', key: 'nav.about', n: '02' },
  { id: 'expertise', key: 'nav.expertise', n: '03' },
  { id: 'contact', key: 'nav.contact', n: '04' },
] as const

const progress = ref(0)
const fill = computed(() => `scaleY(${progress.value.toFixed(4)})`)

function update() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
}

onMounted(update)
useEventListener(window, 'scroll', update, { passive: true })
useEventListener(window, 'resize', update)
</script>

<template>
  <nav class="rail" :aria-label="t('rail.label')">
    <a
      v-for="section in sections"
      :key="section.id"
      class="rail__link"
      :class="{ 'is-active': props.active === section.id }"
      :href="`#${section.id}`"
      :aria-current="props.active === section.id ? 'location' : undefined"
    >
      <span class="rail__n" aria-hidden="true">{{ section.n }}</span>
      <span class="rail__label">{{ t(section.key) }}</span>
    </a>
    <span class="rail__track" aria-hidden="true"><span class="rail__fill" :style="{ transform: fill }"></span></span>
  </nav>
</template>
