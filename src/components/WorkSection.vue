<script setup lang="ts">
import { projects } from '@/data/projects'
import ProjectCard from './ProjectCard.vue'
</script>

<template>
  <section id="work" class="section" aria-labelledby="work-title">
    <div class="shell">
      <header class="section-head">
        <div v-reveal>
          <p class="eyebrow"><i class="eyebrow__dot" aria-hidden="true"></i> 02 / Selected work</p>
          <h2 id="work-title" class="section-head__title" style="margin-top: 22px">
            Selected <em class="serif">work.</em>
          </h2>
        </div>
        <p v-reveal="120" class="section-head__aside">
          A small set of things I've designed and built — browser worlds, marketplaces and quiet utilities.
        </p>
      </header>

      <div class="work__grid">
        <ProjectCard v-for="(project, i) in projects" :key="project.title" :project="project" :delay="i * 90" />
      </div>
    </div>
  </section>
</template>
