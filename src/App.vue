<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { t } from '@/data/i18n'
import ContentGuard from './components/ContentGuard.vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import WorkSection from './components/WorkSection.vue'
import AboutSection from './components/AboutSection.vue'
import ExpertiseSection from './components/ExpertiseSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'

const active = ref('')
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!('IntersectionObserver' in window)) return
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) active.value = entry.target.id
      }
    },
    { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
  )
  document.querySelectorAll<HTMLElement>('main section[id]').forEach((section) => observer?.observe(section))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <a class="skip-link" href="#main">{{ t('skip') }}</a>

  <div class="atmosphere" aria-hidden="true">
    <div class="atmosphere__grid"></div>
    <div class="atmosphere__glow"></div>
  </div>

  <SiteHeader :active="active" />

  <main id="main">
    <HeroSection />
    <WorkSection />
    <AboutSection />
    <ExpertiseSection />
    <ContactSection />
  </main>

  <SiteFooter />
  <ContentGuard />
</template>
