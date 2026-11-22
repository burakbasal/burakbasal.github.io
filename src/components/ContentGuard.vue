<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { t } from '@/data/i18n'

const visible = ref(false)
let timer = 0

function warn(event?: Event) {
  event?.preventDefault()
  visible.value = true
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    visible.value = false
  }, 3600)
}

function onKeydown(event: Event) {
  const keyEvent = event as KeyboardEvent
  const mod = keyEvent.ctrlKey || keyEvent.metaKey
  const key = keyEvent.key.toLowerCase()

  if (keyEvent.key === 'F12') return warn(event)
  if (!mod) return
  if (['a', 'c', 'x', 'u', 's'].includes(key)) return warn(event)
  if (keyEvent.shiftKey && ['i', 'j', 'c'].includes(key)) warn(event)
}

type Handler = (event: Event) => void

const targets: Array<[EventTarget, string, Handler]> = [
  [document, 'selectstart', warn],
  [document, 'copy', warn],
  [document, 'cut', warn],
  [document, 'contextmenu', warn],
  [document, 'dragstart', warn],
  [window, 'keydown', onKeydown],
]

onMounted(() => {
  targets.forEach(([target, type, handler]) => target.addEventListener(type, handler, { capture: true, passive: false }))
})

onUnmounted(() => {
  targets.forEach(([target, type, handler]) => target.removeEventListener(type, handler, { capture: true }))
  window.clearTimeout(timer)
})
</script>

<template>
  <Transition name="guard">
    <div v-if="visible" class="guard" role="status" aria-live="polite">
      <span class="guard__mark" aria-hidden="true"></span>
      <div class="guard__copy">
        <strong>{{ t('guard.title') }}</strong>
        <span>{{ t('guard.body') }}</span>
      </div>
      <button type="button" :aria-label="t('guard.close')" @click="visible = false">
        <svg viewBox="0 0 24 24" class="icon" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  </Transition>
</template>
