<script setup lang="ts">
import { computed, ref } from 'vue'
import { t, type MessageKey } from '@/data/i18n'
import { projects } from '@/data/projects'
import ProjectCard from './ProjectCard.vue'

type FilterId = 'all' | 'web' | 'game' | 'systems'

const filters: Array<{ id: FilterId; key: MessageKey }> = [
  { id: 'all', key: 'filter.all' },
  { id: 'web', key: 'filter.web' },
  { id: 'game', key: 'filter.game' },
  { id: 'systems', key: 'filter.systems' },
]

// Classification uses only tags already published on the cards.
const groups: Record<Exclude<FilterId, 'all'>, string[]> = {
  web: ['Next.js', 'HTML', 'CSS', 'React', 'TypeScript'],
  game: ['Three.js', 'Game logic', 'Game AI', 'Local multiplayer', 'Interactive'],
  systems: ['Python', 'PostgreSQL', 'Cloudflare'],
}

const active = ref<FilterId>('all')
const visible = computed(() => {
  const id = active.value
  if (id === 'all') return projects
  const tags = groups[id]
  return projects.filter((project) => project.tags.some((tag) => tags.includes(tag)))
})
</script>

<template>
  <section id="work" class="section" aria-labelledby="work-title">
    <div class="shell">
      <header class="section-head">
        <div v-reveal>
          <p class="eyebrow"><i class="eyebrow__dot" aria-hidden="true"></i> {{ t('work.eyebrow') }}</p>
          <h2 id="work-title" class="section-head__title">
            {{ t('work.lead') }} <em class="serif">{{ t('work.accent') }}</em>
          </h2>
        </div>
        <p v-reveal="120" class="section-head__aside">{{ t('work.aside') }}</p>
      </header>

      <div v-reveal="160" class="work__filters" role="group" :aria-label="t('filter.label')">
        <button
          v-for="filter in filters"
          :key="filter.id"
          class="work__filter"
          :class="{ 'is-active': active === filter.id }"
          type="button"
          :aria-pressed="active === filter.id"
          @click="active = filter.id"
        >
          {{ t(filter.key) }}
        </button>
      </div>

      <div class="work__grid">
        <ProjectCard v-for="(project, i) in visible" :key="project.title" :project="project" :delay="(i % 3) * 80" />
      </div>
    </div>
  </section>
</template>
