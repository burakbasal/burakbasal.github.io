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
let focusSuspectedUntil = 0
let baselineW = 0
let baselineH = 0
let keeper: MutationObserver | null = null
let clearing = false

function warn(event?: Event, kind: 'copy' | 'shortcut' | 'devtools' = 'copy') {
  event?.preventDefault()
  noteAttempt(kind)
  visible.value = true
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    visible.value = false
  }, 3600)
}

/** Explicitly published actions (the copy-link button) stay usable. */
function guarded(event: Event, kind: 'copy' | 'shortcut' = 'copy') {
  const target = event.target as Element | null
  if (target?.closest?.('[data-copy-allowed]')) return
  warn(event, kind)
}

/** Collapse any selection almost as soon as it appears. */
function onSelectionChange() {
  if (clearing) return
  const selection = window.getSelection()
  if (!selection || selection.isCollapsed) return
  const anchor = selection.anchorNode instanceof Element ? selection.anchorNode : selection.anchorNode?.parentElement
  if (anchor?.closest?.('[data-copy-allowed]')) return
  clearing = true
  selection.removeAllRanges()
  noteAttempt('copy')
  clearing = false
}

function onKeydown(event: Event) {
  const keyEvent = event as KeyboardEvent
  const mod = keyEvent.ctrlKey || keyEvent.metaKey
  const key = keyEvent.key.toLowerCase()

  if (keyEvent.key === 'F12') return warn(event, 'shortcut')
  if (!mod && !keyEvent.altKey) return
  if (['a', 'c', 'x', 'u', 's', 'p', 'f'].includes(key)) return warn(event, 'shortcut')
  if ((keyEvent.shiftKey || keyEvent.altKey) && ['i', 'j', 'c', 'k', 'o'].includes(key)) warn(event, 'shortcut')
}

function chromeSize() {
  return { w: window.outerWidth - window.innerWidth, h: window.outerHeight - window.innerHeight }
}

/** A docked console adds ~300 px of browser chrome relative to page load. */
function chromeChanged() {
  const size = chromeSize()
  return Math.abs(size.w - baselineW) > 120 || Math.abs(size.h - baselineH) > 120
}

/** Fallback for a window that already had a large chrome gap on first paint. */
function wideChrome() {
  const size = chromeSize()
  return window.innerWidth > 700 && (size.w > 160 || size.h > 160)
}

function lock(sticky = false) {
  if (sticky) stickyUntil = Date.now() + 10000
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
  keeper?.disconnect()
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
    if (document.visibilityState !== 'visible' || document.hasFocus()) return
    // Focus loss is only one signal: switching to another app must not trigger
    // the shield. It is combined with geometry or debugger timing in check().
    focusSuspectedUntil = Date.now() + 6000
    check()
  }, 900)
}

function onFocus() {
  window.clearTimeout(blurTimer)
  focusSuspectedUntil = 0
  check()
}

function check() {
  if (Date.now() < stickyUntil) return

  const changed = chromeChanged()
  const wide = wideChrome()
  const focusSignal = Date.now() < focusSuspectedUntil

  // No-op when no debugger is attached; an attached debugger pauses here long
  // enough to be measured, including an undocked console.
  const started = performance.now()
  // eslint-disable-next-line no-debugger
  debugger
  const timingSignal = performance.now() - started > 60

  // A change relative to the page-load baseline is decisive: the taskbar and
  // display scaling are already in the baseline, so only a real docked console
  // moves it. Otherwise require debugger timing plus a second corroborating
  // signal, which catches an undocked console without punishing an alt-tab.
  if (changed || (timingSignal && (wide || focusSignal))) return lock(true)

  silenceConsole()
  unlock()
}

type Handler = (event: Event) => void

const targets: Array<[EventTarget, string, Handler]> = [
  [document, 'selectstart', guarded],
  [document, 'selectionchange', onSelectionChange],
  [document, 'copy', guarded],
  [document, 'cut', guarded],
  [document, 'contextmenu', warn],
  [document, 'dragstart', guarded],
  [document, 'dragover', guarded],
  [document, 'drop', guarded],
  [document, 'beforeprint', warn],
  [window, 'keydown', onKeydown],
  [window, 'blur', onBlur],
  [window, 'focus', onFocus],
  [window, 'resize', check],
  [document, 'visibilitychange', check],
]

onMounted(() => {
  const initial = chromeSize()
  baselineW = initial.w
  baselineH = initial.h
  targets.forEach(([target, type, handler]) => target.addEventListener(type, handler, { capture: true, passive: false }))
  silenceConsole()
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
