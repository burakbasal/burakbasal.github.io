<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { t } from '@/data/i18n'

const visible = ref(false)
const shield = ref(false)
let timer = 0
let watchdog = 0

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
  if (!mod && !keyEvent.altKey) return
  if (['a', 'c', 'x', 'u', 's', 'p'].includes(key)) return warn(event)
  if ((keyEvent.shiftKey || keyEvent.altKey) && ['i', 'j', 'c', 'k'].includes(key)) warn(event)
}

function docked() {
  const w = window.outerWidth - window.innerWidth
  const h = window.outerHeight - window.innerHeight
  return window.innerWidth > 700 && (w > 160 || h > 160)
}

function trip() {
  if (!shield.value) warn()
  shield.value = true
  document.documentElement.classList.add('devtools-open')
}

function watchdogTick() {
  if (docked()) return trip()

  // With devtools closed the statement is ignored; when a debugger is attached
  // the pause makes this measurable, which catches undocked windows too.
  const started = performance.now()
  // eslint-disable-next-line no-debugger
  debugger
  if (performance.now() - started > 80) return trip()

  shield.value = false
  document.documentElement.classList.remove('devtools-open')
}

type Handler = (event: Event) => void

const targets: Array<[EventTarget, string, Handler]> = [
  [document, 'selectstart', warn],
  [document, 'copy', warn],
  [document, 'cut', warn],
  [document, 'contextmenu', warn],
  [document, 'dragstart', warn],
  [document, 'beforeprint', warn],
  [window, 'keydown', onKeydown],
  [window, 'resize', watchdogTick],
]

onMounted(() => {
  targets.forEach(([target, type, handler]) => target.addEventListener(type, handler, { capture: true, passive: false }))
  watchdog = window.setInterval(watchdogTick, 1500)
})

onUnmounted(() => {
  targets.forEach(([target, type, handler]) => target.removeEventListener(type, handler, { capture: true }))
  window.clearInterval(watchdog)
  window.clearTimeout(timer)
  document.documentElement.classList.remove('devtools-open')
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

  <Transition name="shield">
    <div v-if="shield" class="shield" role="alertdialog" aria-modal="true" :aria-label="t('shield.title')">
      <span class="shield__mark" aria-hidden="true"></span>
      <strong>{{ t('shield.title') }}</strong>
      <span>{{ t('shield.body') }}</span>
    </div>
  </Transition>
</template>
