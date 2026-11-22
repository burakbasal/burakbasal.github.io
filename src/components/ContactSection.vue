<script setup lang="ts">
import { t } from '@/data/i18n'
import AppIcon from './AppIcon.vue'

const channels = [
  { label: 'GitHub', handle: '@burakbasal', href: 'https://github.com/burakbasal' },
  { label: 'LinkedIn', handle: 'in/burak-basal', href: 'https://www.linkedin.com/in/burak-basal/' },
  { label: 'X', handle: '@user02718281828', href: 'https://x.com/user02718281828' },
  { label: 'Instagram', handle: '@user02718281828', href: 'https://instagram.com/user02718281828' },
  { label: 'Discord', handle: 'dev.burak', href: 'https://discord.com/users/1163182429331259574' },
]
</script>

<template>
  <section id="contact" class="section" aria-labelledby="contact-title">
    <div class="shell">
      <p v-reveal class="eyebrow"><i class="eyebrow__dot" aria-hidden="true"></i> {{ t('contact.eyebrow') }}</p>

      <h2 v-reveal="100" id="contact-title" class="contact__title">
        {{ t('contact.lead') }} <em class="serif">{{ t('contact.accent') }}</em>
      </h2>

      <div v-reveal="180" class="contact__links">
        <a
          v-for="channel in channels"
          :key="channel.href"
          class="contact__row"
          :href="channel.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${channel.label} ${channel.handle} — ${t('contact.profile')} (${t('a11y.newTab')})`"
        >
          <span class="contact__row-label">
            <small>{{ channel.label }}</small>
            <strong>{{ channel.handle }}</strong>
          </span>
          <AppIcon class="contact__arrow" name="arrow-up-right" />
        </a>
      </div>

      <p v-reveal="240" class="contact__foot">{{ t('contact.foot') }}</p>
    </div>
  </section>
</template>
