<script setup lang="ts">
import { computed, onScopeDispose, ref } from 'vue'
import { useEventListener, useMediaQuery } from '@vueuse/core'
import { locale, t } from '@/data/i18n'
import type { Project } from '@/data/projects'

const props = defineProps<{ project: Project; delay?: number }>()

const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
const spotlight = computed(() => finePointer.value && !reducedMotion.value)

const kind = computed(() => props.project.kind[locale.value])
const description = computed(() => props.project.description[locale.value])
const note = computed(() => props.project.note?.[locale.value])

const card = ref<HTMLElement | null>(null)
let rect: DOMRect | null = null
let frame = 0
let x = 0
let y = 0

useEventListener(card, 'pointerenter', () => {
  if (!spotlight.value) return
  rect = card.value?.getBoundingClientRect() ?? null
})

useEventListener(
  card,
  'pointermove',
  (event: PointerEvent) => {
    if (!spotlight.value || !rect || event.pointerType !== 'mouse') return
    x = ((event.clientX - rect.left) / rect.width) * 100
    y = ((event.clientY - rect.top) / rect.height) * 100
    if (frame) return
    frame = requestAnimationFrame(() => {
      frame = 0
      card.value?.style.setProperty('--sx', `${x.toFixed(1)}%`)
      card.value?.style.setProperty('--sy', `${y.toFixed(1)}%`)
    })
  },
  { passive: true },
)

useEventListener(card, 'pointerleave', () => {
  rect = null
})

onScopeDispose(() => {
  if (frame) cancelAnimationFrame(frame)
})

function linkLabel(label: 'live' | 'source') {
  return t(label === 'live' ? 'project.live' : 'project.source')
}
</script>

<template>
  <article ref="card" v-reveal="props.delay" class="project">
    <div class="project__frame">
      <img
        :src="props.project.image"
        :alt="`${props.project.title} — live site screenshot`"
        width="1200"
        height="750"
        loading="lazy"
        decoding="async"
      />
      <span class="project__index" aria-hidden="true">{{ props.project.index }}</span>
      <span v-if="props.project.privateRepo" class="project__badge">{{ t('project.private') }}</span>
      <span class="project__frame-link" aria-hidden="true">↗</span>
    </div>

    <div class="project__body">
      <p class="project__kind">{{ kind }}</p>
      <h3 class="project__title">{{ props.project.title }}</h3>
      <p class="project__desc">{{ description }}</p>
      <p v-if="note" class="project__note">{{ note }}</p>
      <p v-else-if="props.project.privateRepo" class="project__private-note">{{ t('project.privateNote') }}</p>

      <ul class="tags" :aria-label="`${props.project.title} — technologies`">
        <li v-for="tag in props.project.tags" :key="tag">{{ tag }}</li>
      </ul>

      <div class="project__links">
        <a
          v-for="link in props.project.links"
          :key="link.href"
          class="project__link"
          :class="{ 'project__link--primary': link.label === 'live' }"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${linkLabel(link.label)} — ${props.project.title} (opens in a new tab)`"
        >
          {{ linkLabel(link.label) }} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </article>
</template>
