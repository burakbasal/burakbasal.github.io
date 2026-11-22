<script setup lang="ts">
const areas = [
  {
    n: '01',
    name: 'Frontend engineering',
    detail: 'Component systems, typed data flows and interfaces that stay fast as they grow.',
    tags: ['Vue 3', 'React', 'TypeScript', 'Vite'],
  },
  {
    n: '02',
    name: 'Interface & motion',
    detail: 'CSS architecture, considered transitions and micro-interactions that guide without distracting.',
    tags: ['CSS', 'Motion design', 'Accessibility'],
  },
  {
    n: '03',
    name: 'Game development',
    detail: 'Browser worlds, input handling, rendering budgets and the performance work behind them.',
    tags: ['Three.js', 'Game logic', 'Mobile input'],
  },
  {
    n: '04',
    name: 'Backend foundations',
    detail: 'Enough systems work to ship the whole thing: data layers, APIs and real-time infrastructure.',
    tags: ['Node.js', 'PostgreSQL', 'Supabase', 'Cloudflare'],
  },
]
</script>

<template>
  <section id="expertise" class="section" aria-labelledby="expertise-title">
    <div class="shell">
      <header class="section-head">
        <div v-reveal>
          <p class="eyebrow"><i class="eyebrow__dot" aria-hidden="true"></i> 04 / Expertise</p>
          <h2 id="expertise-title" class="section-head__title" style="margin-top: 22px">
            What I <em class="serif">work with.</em>
          </h2>
        </div>
        <p v-reveal="120" class="section-head__aside">
          A practical mix of interface craft and engineering — verified by the public work above.
        </p>
      </header>

      <div class="expertise__list">
        <article v-for="(area, i) in areas" :key="area.n" v-reveal="i * 70" class="expertise__row">
          <span class="expertise__num" aria-hidden="true">{{ area.n }}</span>
          <h3 class="expertise__name">{{ area.name }}</h3>
          <p class="expertise__detail">{{ area.detail }}</p>
          <ul class="tags" :aria-label="`Skills in ${area.name}`">
            <li v-for="tag in area.tags" :key="tag">{{ tag }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
