<script setup lang="ts">
import { computed, onScopeDispose, ref } from 'vue'
import { useEventListener, useMediaQuery } from '@vueuse/core'
import { t } from '@/data/i18n'
import { useMagnetic } from '@/composables/useMagnetic'
import AppIcon from './AppIcon.vue'

const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
const effects = computed(() => finePointer.value && !reducedMotion.value)

const hero = ref<HTMLElement | null>(null)
const primaryButton = ref<HTMLElement | null>(null)
useMagnetic(effects, primaryButton)

let rect: DOMRect | null = null
let frame = 0
let x = 0
let y = 0

useEventListener(hero, 'pointerenter', () => {
  if (!effects.value) return
  rect = hero.value?.getBoundingClientRect() ?? null
})

useEventListener(
  hero,
  'pointermove',
  (event: PointerEvent) => {
    if (!effects.value || !rect || event.pointerType !== 'mouse') return
    x = event.clientX - rect.left
    y = event.clientY - rect.top
    if (frame) return
    frame = requestAnimationFrame(() => {
      frame = 0
      if (!hero.value) return
      hero.value.style.setProperty('--px', `${x.toFixed(0)}px`)
      hero.value.style.setProperty('--py', `${y.toFixed(0)}px`)
      hero.value.dataset.lit = 'true'
    })
  },
  { passive: true },
)

useEventListener(hero, 'pointerleave', () => {
  rect = null
  if (hero.value) hero.value.dataset.lit = 'false'
})

onScopeDispose(() => {
  if (frame) cancelAnimationFrame(frame)
})

const stats = [
  { value: '06', key: 'stats.projects' },
  { value: '06', key: 'stats.live' },
  { value: '04', key: 'stats.areas' },
  { value: '05', key: 'stats.profiles' },
] as const
</script>

<template>
  <section id="top" ref="hero" class="hero" aria-labelledby="hero-title">
    <div class="hero__spotlight" aria-hidden="true"></div>

    <div class="shell hero__inner">
      <div class="hero__meta enter" style="--d: 60ms">
        <span class="eyebrow"><i class="eyebrow__dot" aria-hidden="true"></i> {{ t('hero.eyebrow') }}</span>
        <span class="hero__index" aria-hidden="true">{{ t('hero.index') }}</span>
      </div>

      <h1 id="hero-title" class="hero__title">
        <span class="hero__line enter" style="--d: 140ms">Burak</span>
        {{ ' ' }}
        <span class="hero__line hero__line--second enter" style="--d: 240ms">{{ t('name.last') }}<span class="hero__period">.</span></span>
      </h1>

      <div class="hero__lower">
        <p class="hero__role enter" style="--d: 360ms">{{ t('hero.role') }}</p>
        <p class="hero__desc enter" style="--d: 450ms">
          {{ t('hero.descA') }} <em class="serif">{{ t('hero.descB') }}</em>
        </p>
        <div class="hero__actions enter" style="--d: 540ms">
          <a ref="primaryButton" class="btn btn--solid" href="#work">{{ t('hero.ctaWork') }} <AppIcon class="icon--down" name="arrow-down" /></a>
          <a class="btn btn--ghost" href="#contact">{{ t('hero.ctaContact') }} <AppIcon name="arrow-up-right" /></a>
        </div>
      </div>

      <dl class="hero__stats enter" style="--d: 620ms">
        <div v-for="stat in stats" :key="stat.key" class="hero__stat">
          <dt>{{ t(stat.key) }}</dt>
          <dd>{{ stat.value }}</dd>
        </div>
      </dl>
    </div>

    <div class="hero__scroll" aria-hidden="true">
      <span>{{ t('hero.scroll') }}</span>
      <span class="hero__scroll-line"></span>
    </div>
  </section>
</template>
