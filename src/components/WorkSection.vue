<script setup lang="ts">
import { t } from '@/data/i18n'
import { projects } from '@/data/projects'
import ProjectCard from './ProjectCard.vue'
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

      <div class="work__grid">
        <ProjectCard v-for="(project, i) in projects" :key="project.title" :project="project" :delay="(i % 3) * 80" />
      </div>
    </div>
  </section>
</template>
