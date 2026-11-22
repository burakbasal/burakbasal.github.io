<script setup lang="ts">
import { computed } from 'vue'
import { locale, t } from '@/data/i18n'

const areas = [
  {
    n: '01',
    name: { en: 'Software engineering', tr: 'Yazılım mühendisliği' },
    detail: {
      en: 'Component systems, typed data flows and interfaces that stay fast as they grow.',
      tr: 'Bileşen sistemleri, tipli veri akışları ve büyüdükçe hızlı kalan arayüzler.',
    },
    tags: ['Vue 3', 'React', 'TypeScript', 'Vite'],
  },
  {
    n: '02',
    name: { en: 'Interface & motion', tr: 'Arayüz & hareket' },
    detail: {
      en: 'CSS architecture, considered transitions and micro-interactions that guide without distracting.',
      tr: 'CSS mimarisi, özenli geçişler ve dikkat dağıtmadan yönlendiren mikro etkileşimler.',
    },
    tags: ['CSS', 'Motion', 'Accessibility'],
  },
  {
    n: '03',
    name: { en: 'Game development', tr: 'Oyun geliştirme' },
    detail: {
      en: 'Browser worlds, input handling, rendering budgets and the performance work behind them.',
      tr: 'Tarayıcı dünyaları, girdi yönetimi, render bütçeleri ve arkasındaki performans çalışması.',
    },
    tags: ['Three.js', 'Game logic', 'Mobile input'],
  },
  {
    n: '04',
    name: { en: 'Backend foundations', tr: 'Backend temelleri' },
    detail: {
      en: 'Enough systems work to ship the whole thing: data layers, APIs and real-time infrastructure.',
      tr: 'Ürünü baştan sona yayınlamak için gereken sistem çalışması: veri katmanları, API’ler ve gerçek zamanlı altyapı.',
    },
    tags: ['Node.js', 'PostgreSQL', 'Supabase', 'Cloudflare'],
  },
]

const localized = computed(() =>
  areas.map((area) => ({
    ...area,
    nameText: area.name[locale.value],
    detailText: area.detail[locale.value],
  })),
)
</script>

<template>
  <section id="expertise" class="section" aria-labelledby="expertise-title">
    <div class="shell">
      <header class="section-head">
        <div v-reveal>
          <p class="eyebrow"><i class="eyebrow__dot" aria-hidden="true"></i> {{ t('expertise.eyebrow') }}</p>
          <h2 id="expertise-title" class="section-head__title">
            {{ t('expertise.lead') }} <em class="serif">{{ t('expertise.accent') }}</em>
          </h2>
        </div>
        <p v-reveal="120" class="section-head__aside">{{ t('expertise.aside') }}</p>
      </header>

      <div class="expertise__list">
        <article v-for="(area, i) in localized" :key="area.n" v-reveal="i * 70" class="expertise__row">
          <span class="expertise__num" aria-hidden="true">{{ area.n }}</span>
          <h3 class="expertise__name">{{ area.nameText }}</h3>
          <p class="expertise__detail">{{ area.detailText }}</p>
          <ul class="tags" :aria-label="`${t('expertise.skills')} ${area.nameText}`">
            <li v-for="tag in area.tags" :key="tag">{{ tag }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
