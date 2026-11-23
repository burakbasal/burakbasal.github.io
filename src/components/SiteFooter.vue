<script setup lang="ts">
import { t } from '@/data/i18n'
import linkStatus from '@/data/link-status.json'
import AppIcon from './AppIcon.vue'

function toTop() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' })
}
</script>

<template>
  <footer class="site-footer">
    <div class="shell site-footer__inner">
      <span>{{ t('footer.rights') }}</span>
      <nav class="site-footer__links" aria-label="Footer navigation">
        <a href="https://github.com/burakbasal" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/burak-basal/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://x.com/user02718281828" target="_blank" rel="noopener noreferrer">X</a>
        <a href="https://instagram.com/user02718281828" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://discord.com/users/1163182429331259574" target="_blank" rel="noopener noreferrer">Discord</a>
        <a href="/legal.txt">{{ t('footer.legal') }}</a>
      </nav>
      <span class="site-footer__status" :title="linkStatus.checkedAt">
        {{ t('footer.status') }} {{ linkStatus.online }}/{{ linkStatus.total }}
      </span>
      <button class="to-top" type="button" @click="toTop">{{ t('footer.top') }} <AppIcon name="arrow-up" /></button>
    </div>
  </footer>
</template>
