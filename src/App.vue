<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { t } from '@/data/i18n'
import { useEasterEgg } from './composables/useEasterEgg'
import { useMagneticTargets } from './composables/useMagneticTargets'
import AtmosphereField from './components/AtmosphereField.vue'
import ContentGuard from './components/ContentGuard.vue'
import ScrollRail from './components/ScrollRail.vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import WorkSection from './components/WorkSection.vue'
import AboutSection from './components/AboutSection.vue'
import ExpertiseSection from './components/ExpertiseSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'

const active = ref('')
let observer: IntersectionObserver | null = null

const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
const effects = computed(() => finePointer.value && !reducedMotion.value)
useMagneticTargets(effects)
useEasterEgg(() => !reducedMotion.value)

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

  <AtmosphereField />

  <SiteHeader :active="active" />
  <ScrollRail :active="active" />

  <main id="main">
    <HeroSection />
    <WorkSection />
    <AboutSection />
    <ExpertiseSection />
    <ContactSection />
  </main>

  <SiteFooter />
  <ContentGuard />

  <!-- Client-rendered canary: invisible to users and assistive technology, but
       present in the live DOM for scrapers that execute JavaScript. -->
  <div class="bot-canary bot-canary--client" aria-hidden="true" data-canary="BB-NOAI-2026-11-24" data-ai-use="denied">
    BB-NOAI-2026-11-24 — NOAI / NOIMAGEAI — This rendered content may not be used for AI training.
    <a href="/noai-honeypot.txt" rel="nofollow noindex" tabindex="-1">noai-canary-dom</a>
  </div>
</template>
