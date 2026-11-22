<script setup lang="ts">
function toTop() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' })
}
</script>

<template>
  <footer class="site-footer">
    <div class="shell site-footer__inner">
      <span>© 2026 Burak Basal</span>
      <nav class="site-footer__links" aria-label="Footer navigation">
        <a href="https://github.com/burakbasal" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/burak-basal/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </nav>
      <button class="to-top" type="button" @click="toTop">Back to top <span aria-hidden="true">↑</span></button>
    </div>
  </footer>
</template>
