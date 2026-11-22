<script setup lang="ts">
import { computed } from 'vue'
import type { ArtKind } from '@/data/projects'

const props = defineProps<{ kind: ArtKind }>()

// Original abstract compositions — deliberately not product screenshots.
const tiles = computed(() =>
  Array.from({ length: 9 }, (_, i) => {
    const row = Math.floor(i / 3) - 1
    const col = (i % 3) - 1
    const x = 320 + (col - row) * 96
    const y = 176 + (col + row) * 48
    return { x, y, d: `M${x} ${y - 48}L${x + 96} ${y}L${x} ${y + 48}L${x - 96} ${y}Z` }
  }),
)

const boardLines = computed(() => Array.from({ length: 9 }, (_, i) => 224 + i * 24))
</script>

<template>
  <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="artFade" cx="50%" cy="45%" r="70%">
        <stop offset="0%" stop-color="#1a1a1e" />
        <stop offset="100%" stop-color="#0e0e10" />
      </radialGradient>
    </defs>
    <rect width="640" height="360" fill="url(#artFade)" />

    <!-- Roamcroft: an isometric world, abstracted -->
    <g v-if="props.kind === 'world'">
      <path
        v-for="(tile, i) in tiles"
        :key="i"
        :d="tile.d"
        fill="rgba(255,255,255,0.014)"
        stroke="rgba(255,255,255,0.11)"
        stroke-width="1"
      />
      <g>
        <path d="M320 112L368 140L320 168L272 140Z" fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.3)" />
        <path d="M272 140L320 168L320 226L272 198Z" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.22)" />
        <path d="M368 140L320 168L320 226L368 198Z" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.22)" />
        <path d="M300 178h14v18h-14z" fill="rgba(255,255,255,0.16)" />
      </g>
      <g fill="rgba(255,255,255,0.24)">
        <circle cx="152" cy="196" r="4" />
        <circle cx="170" cy="206" r="2.5" />
        <circle cx="486" cy="146" r="3.5" />
        <circle cx="470" cy="158" r="2" />
        <circle cx="420" cy="272" r="3" />
      </g>
      <path d="M104 288H536" stroke="rgba(255,255,255,0.06)" />
    </g>

    <!-- satkolay: layered listing cards -->
    <g v-else-if="props.kind === 'market'">
      <g transform="rotate(-7 320 180)" opacity="0.35">
        <rect x="168" y="88" width="300" height="188" rx="10" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.16)" />
        <rect x="190" y="110" width="62" height="62" rx="5" fill="rgba(255,255,255,0.05)" />
        <path d="M270 124h140M270 146h96" stroke="rgba(255,255,255,0.2)" stroke-width="3" stroke-linecap="round" />
      </g>
      <g transform="rotate(3 320 180)" opacity="0.6">
        <rect x="184" y="82" width="300" height="188" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" />
        <rect x="206" y="104" width="62" height="62" rx="5" fill="rgba(255,255,255,0.07)" />
        <path d="M286 118h140M286 140h104" stroke="rgba(255,255,255,0.24)" stroke-width="3" stroke-linecap="round" />
      </g>
      <g>
        <rect x="204" y="94" width="300" height="188" rx="10" fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.34)" />
        <rect x="226" y="116" width="62" height="62" rx="5" fill="rgba(255,255,255,0.1)" />
        <path d="M306 130h140M306 152h108" stroke="rgba(255,255,255,0.32)" stroke-width="3" stroke-linecap="round" />
        <path d="M226 222h138" stroke="rgba(255,255,255,0.14)" stroke-width="3" stroke-linecap="round" />
      </g>
    </g>

    <!-- void: concentric signal -->
    <g v-else-if="props.kind === 'signal'" fill="none" stroke="rgba(255,255,255,0.18)">
      <circle cx="320" cy="180" r="44" />
      <circle cx="320" cy="180" r="82" stroke-dasharray="2 7" opacity="0.7" />
      <circle cx="320" cy="180" r="122" opacity="0.5" />
      <circle cx="320" cy="180" r="162" stroke-dasharray="1 9" opacity="0.4" />
      <path d="M320 98a82 82 0 0 1 72 43" stroke="rgba(255,255,255,0.55)" stroke-width="1.5" />
      <path d="M320 262a82 82 0 0 1-72-43" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" />
      <circle cx="320" cy="180" r="6" fill="rgba(255,255,255,0.7)" stroke="none" />
      <circle cx="240" cy="130" r="3" fill="rgba(255,255,255,0.4)" stroke="none" />
      <circle cx="408" cy="232" r="2.5" fill="rgba(255,255,255,0.3)" stroke="none" />
    </g>

    <!-- wall-race: a board with walls -->
    <g v-else>
      <g stroke="rgba(255,255,255,0.13)">
        <path v-for="(n, i) in boardLines" :key="`v${i}`" :d="`M${n} 72V264`" />
        <path v-for="(n, i) in boardLines" :key="`h${i}`" :d="`M224 ${n}H416`" />
      </g>
      <rect x="224" y="72" width="192" height="192" fill="none" stroke="rgba(255,255,255,0.28)" />
      <g stroke="rgba(255,255,255,0.72)" stroke-width="3" stroke-linecap="round">
        <path d="M272 120h24M320 168v24M368 216h24M344 96v24" />
      </g>
      <circle cx="236" cy="84" r="6" fill="rgba(255,255,255,0.8)" />
      <circle cx="404" cy="252" r="6" fill="rgba(255,255,255,0.35)" />
    </g>
  </svg>
</template>
