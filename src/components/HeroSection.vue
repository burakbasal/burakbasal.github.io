<script setup lang="ts">
import { computed, onScopeDispose, ref } from 'vue'
import { useEventListener, useMediaQuery } from '@vueuse/core'
import { useMagnetic } from '@/composables/useMagnetic'

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
</script>

<template>
  <section id="top" ref="hero" class="hero" aria-labelledby="hero-title">
    <div class="hero__spotlight" aria-hidden="true"></div>

    <div class="shell hero__inner">
      <div class="hero__meta enter" style="--d: 60ms">
        <span class="eyebrow"><i class="eyebrow__dot" aria-hidden="true"></i> Developer · Interfaces · Games</span>
        <span class="hero__index" aria-hidden="true">01 / 05</span>
      </div>

      <h1 id="hero-title" class="hero__title">
        <span class="hero__line enter" style="--d: 140ms">Burak</span>
        <span class="hero__line hero__line--second enter" style="--d: 240ms"> Basal<span class="hero__period">.</span></span>
      </h1>

      <div class="hero__lower">
        <p class="hero__role enter" style="--d: 360ms">Interfaces, interactions and games for the web.</p>
        <p class="hero__desc enter" style="--d: 450ms">
          I build software with attention to the part people feel — pace, weight and detail. Fast, accessible,
          <em class="serif">quietly distinct.</em>
        </p>
        <div class="hero__actions enter" style="--d: 540ms">
          <a ref="primaryButton" class="btn btn--solid" href="#work">Selected work <span aria-hidden="true">↓</span></a>
          <a class="btn btn--ghost" href="#contact">Get in touch <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>

    <div class="hero__scroll" aria-hidden="true">
      <span>Scroll</span>
      <span class="hero__scroll-line"></span>
    </div>
  </section>
</template>
