<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { t } from '@/data/i18n'
import { noteAttempt } from '@/utils/canary'
import { silenceConsole } from '@/utils/silence'

const visible = ref(false)
let timer = 0
let watchdog = 0
let blurTimer = 0
let locked = false
let stickyUntil = 0
let keeper: MutationObserver | null = null

function warn(event?: Event, kind: 'copy' | 'shortcut' | 'devtools' = 'copy') {
  event?.preventDefault()
  noteAttempt(kind)
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

  if (keyEvent.key === 'F12') return warn(event, 'shortcut')
  if (!mod && !keyEvent.altKey) return
  if (['a', 'c', 'x', 'u', 's', 'p'].includes(key)) return warn(event, 'shortcut')
  if ((keyEvent.shiftKey || keyEvent.altKey) && ['i', 'j', 'c', 'k'].includes(key)) warn(event, 'shortcut')
}

function docked() {
  const w = window.outerWidth - window.innerWidth
  const h = window.outerHeight - window.innerHeight
  return window.innerWidth > 700 && (w > 160 || h > 160)
}

function lock(sticky = false) {
  if (sticky) stickyUntil = Date.now() + 8000
  if (locked) return
  locked = true
  noteAttempt('devtools')
  silenceConsole()
  document.documentElement.classList.add('devtools-open')

  const layer = document.createElement('div')
  layer.id = 'bb-lock'
  layer.className = 'shield'
  layer.setAttribute('role', 'alertdialog')
  layer.setAttribute('aria-modal', 'true')

  const title = document.createElement('strong')
  title.textContent = t('shield.title')
  const body = document.createElement('span')
  body.textContent = t('shield.body')
  layer.append(title, body)
  document.body.appendChild(layer)

  // A plain-DOM layer cannot be removed from the console without coming back.
  keeper = new MutationObserver(() => {
    if (!document.body.contains(layer)) document.body.appendChild(layer)
    if (!document.documentElement.classList.contains('devtools-open')) {
      document.documentElement.classList.add('devtools-open')
    }
  })
  keeper.observe(document.body, { childList: true })
  keeper.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  warn(undefined, 'devtools')
}

function unlock() {
  if (!locked) return
  locked = false
  keeper?.disconnect()
  keeper = null
  document.getElementById('bb-lock')?.remove()
  document.documentElement.classList.remove('devtools-open')
}

// An undocked DevTools window steals focus without changing viewport geometry.
function onBlur() {
  window.clearTimeout(blurTimer)
  if (document.visibilityState !== 'visible') return
  blurTimer = window.setTimeout(() => {
    if (document.visibilityState === 'visible' && !document.hasFocus()) lock(true)
  }, 1000)
}

function onFocus() {
  window.clearTimeout(blurTimer)
  check()
}

function check() {
  if (Date.now() < stickyUntil) return
  if (docked()) return lock()

  // No-op when no debugger is attached; an attached debugger pauses here long
  // enough to be measured, including an undocked console.
  const started = performance.now()
  // eslint-disable-next-line no-debugger
  debugger
  if (performance.now() - started > 60) return lock()

  silenceConsole()
  unlock()
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
  [window, 'blur', onBlur],
  [window, 'focus', onFocus],
  [window, 'resize', check],
  [document, 'visibilitychange', check],
]

onMounted(() => {
  targets.forEach(([target, type, handler]) => target.addEventListener(type, handler, { capture: true, passive: false }))
  watchdog = window.setInterval(check, 250)
})

onUnmounted(() => {
  targets.forEach(([target, type, handler]) => target.removeEventListener(type, handler, { capture: true }))
  window.clearInterval(watchdog)
  window.clearTimeout(timer)
  window.clearTimeout(blurTimer)
  unlock()
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
