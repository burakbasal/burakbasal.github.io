<script setup lang="ts">
import { computed, onScopeDispose, ref } from 'vue'
import { useEventListener, useMediaQuery } from '@vueuse/core'
import type { Project } from '@/data/projects'
import ProjectArt from './ProjectArt.vue'

const props = defineProps<{ project: Project; delay?: number }>()

const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
const spotlight = computed(() => finePointer.value && !reducedMotion.value)

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
</script>

<template>
  <article ref="card" v-reveal="props.delay" class="project" :class="`project--${props.project.span}`">
    <div class="project__frame">
      <ProjectArt :kind="props.project.art" />
      <span class="project__index" aria-hidden="true">{{ props.project.index }}</span>
      <span v-if="props.project.private" class="project__badge">Private</span>
    </div>

    <div class="project__body">
      <p class="project__kind">{{ props.project.kind }}</p>
      <h3 class="project__title">{{ props.project.title }}</h3>
      <p class="project__desc">{{ props.project.description }}</p>
      <p v-if="props.project.note" class="project__note">{{ props.project.note }}</p>

      <ul class="tags" :aria-label="`Technologies used in ${props.project.title}`">
        <li v-for="tag in props.project.tags" :key="tag">{{ tag }}</li>
      </ul>

      <div v-if="props.project.links?.length" class="project__links">
        <a
          v-for="link in props.project.links"
          :key="link.href"
          class="project__link"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${link.label} for ${props.project.title} (opens in a new tab)`"
        >
          {{ link.label }} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p v-else class="project__private-note">Source is not public.</p>
    </div>
  </article>
</template>
