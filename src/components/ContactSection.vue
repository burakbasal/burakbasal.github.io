<script setup lang="ts">
const channels = [
  { label: 'GitHub', handle: '@burakbasal', href: 'https://github.com/burakbasal' },
  { label: 'LinkedIn', handle: 'in/burak-basal', href: 'https://www.linkedin.com/in/burak-basal/' },
]
</script>

<template>
  <section id="contact" class="section" aria-labelledby="contact-title">
    <div class="shell">
      <p v-reveal class="eyebrow"><i class="eyebrow__dot" aria-hidden="true"></i> 05 / Contact</p>

      <h2 v-reveal="100" id="contact-title" class="contact__title" style="margin-top: 28px">
        Let's build something <em class="serif">worth keeping.</em>
      </h2>

      <div v-reveal="180" class="contact__links">
        <a
          v-for="channel in channels"
          :key="channel.href"
          class="contact__row"
          :href="channel.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${channel.label} profile (opens in a new tab)`"
        >
          <span class="contact__row-label">
            <small>{{ channel.label }}</small>
            <strong>{{ channel.handle }}</strong>
          </span>
          <span class="contact__arrow" aria-hidden="true">↗</span>
        </a>
      </div>

      <p v-reveal="240" class="contact__foot">
        For work, collaborations or a good conversation about interfaces, these are the best ways to reach me.
      </p>
    </div>
  </section>
</template>
