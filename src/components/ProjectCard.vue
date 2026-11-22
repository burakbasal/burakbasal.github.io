<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { locale, t } from '@/data/i18n'
import type { Project } from '@/data/projects'
import { useTilt } from '@/composables/useTilt'
import { linkCheckedAt, liveState } from '@/utils/linkStatus'
import AppIcon from './AppIcon.vue'

const props = defineProps<{ project: Project; delay?: number }>()

const kind = computed(() => props.project.kind[locale.value])
const description = computed(() => props.project.description[locale.value])
const note = computed(() => props.project.note?.[locale.value])
const liveHref = computed(() => props.project.links.find((link) => link.label === 'live')?.href)
const liveLabel = computed(() => `${props.project.title} — ${t('project.live')} (${t('a11y.newTab')})`)
const state = computed(() => (liveHref.value ? liveState(liveHref.value) : 'online'))
const stateLabel = computed(() =>
  state.value === 'online' ? t('status.online') : state.value === 'maintenance' ? t('status.maintenance') : t('status.offline'),
)
const stateTitle = computed(() => `${t('status.checked')}: ${linkCheckedAt}`)
const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
const card = ref<HTMLElement | null>(null)
useTilt(computed(() => finePointer.value && !reducedMotion.value), card)

function linkLabel(label: 'live' | 'source') {
  return t(label === 'live' ? 'project.live' : 'project.source')
}
</script>

<template>
  <article ref="card" v-reveal="props.delay" class="project">
    <a class="project__frame" :href="liveHref" target="_blank" rel="noopener noreferrer" :aria-label="liveLabel">
      <img
        :src="props.project.image"
        :alt="`${props.project.title} — live site screenshot`"
        width="1200"
        height="675"
        loading="lazy"
        decoding="async"
      />
      <span class="project__index" aria-hidden="true">{{ props.project.index }}</span>
      <span v-if="props.project.privateRepo" class="project__badge">{{ t('project.private') }}</span>
      <span class="project__frame-live" aria-hidden="true">{{ t('project.live') }} <AppIcon name="arrow-up-right" /></span>
    </a>

    <div class="project__body">
      <p class="project__kind">
        {{ kind }}
        <span class="project__status" :data-state="state" :title="stateTitle">{{ stateLabel }}</span>
      </p>
      <h3 class="project__title">
        <a :href="liveHref" target="_blank" rel="noopener noreferrer" :aria-label="liveLabel">
          {{ props.project.title }} <AppIcon class="project__title-icon" name="arrow-up-right" />
        </a>
      </h3>
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
          :aria-label="`${linkLabel(link.label)} — ${props.project.title} (${t('a11y.newTab')})`"
        >
          {{ linkLabel(link.label) }} <AppIcon name="arrow-up-right" />
        </a>
      </div>
    </div>
  </article>
</template>
