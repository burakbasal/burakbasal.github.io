<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const wrap = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)

let ctx: CanvasRenderingContext2D | null = null
let frame = 0
let last = 0
let rgb = '255, 255, 255'
let width = 0
let height = 0
let reduced = false
let themeObserver: MutationObserver | null = null
let motionQuery: MediaQueryList | null = null

type Node = { x: number; y: number; vx: number; vy: number; pulse: number }
type Ripple = { x: number; y: number; r: number; alpha: number }

let nodes: Node[] = []
const ripples: Ripple[] = []
const trail: { x: number; y: number; alpha: number }[] = []
const pointer = { x: -999, y: -999, active: false }
let scrollY = 0
let scrollImpulse = 0

function readTheme() {
  rgb = getComputedStyle(document.documentElement).getPropertyValue('--rgb').trim() || '255, 255, 255'
}

function resize() {
  if (!canvas.value) return
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  width = window.innerWidth
  height = window.innerHeight
  canvas.value.width = Math.round(width * dpr)
  canvas.value.height = Math.round(height * dpr)
  canvas.value.style.width = `${width}px`
  canvas.value.style.height = `${height}px`
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)

  const count = Math.min(28, Math.max(12, Math.round(width / 44)))
  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.16,
    vy: (Math.random() - 0.5) * 0.16,
    pulse: 0,
  }))
  if (reduced) draw()
}

function stepNode(node: Node) {
  node.x += node.vx
  node.y += node.vy - scrollImpulse * 0.045

  if (pointer.active) {
    const dx = pointer.x - node.x
    const dy = pointer.y - node.y
    const distance = Math.hypot(dx, dy)
    if (distance < 170 && distance > 1) {
      const pull = (1 - distance / 170) * 0.035
      node.vx += (dx / distance) * pull
      node.vy += (dy / distance) * pull
      node.pulse = Math.min(1, node.pulse + pull * 9)
    }
  }

  node.vx *= 0.99
  node.vy *= 0.99
  node.pulse *= 0.94

  if (node.x < -20) node.x = width + 20
  if (node.x > width + 20) node.x = -20
  if (node.y < -20) node.y = height + 20
  if (node.y > height + 20) node.y = -20
}

function draw() {
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const distance = Math.hypot(dx, dy)
      if (distance > 115) continue
      ctx.strokeStyle = `rgba(${rgb}, ${((1 - distance / 115) * 0.13).toFixed(3)})`
      ctx.lineWidth = 0.6
      ctx.beginPath()
      ctx.moveTo(nodes[i].x, nodes[i].y)
      ctx.lineTo(nodes[j].x, nodes[j].y)
      ctx.stroke()
    }
  }

  for (const node of nodes) {
    const radius = 1.1 + node.pulse * 1.7
    ctx.fillStyle = `rgba(${rgb}, ${(0.3 + node.pulse * 0.5).toFixed(3)})`
    ctx.beginPath()
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
    ctx.fill()
    if (node.pulse > 0.25) {
      ctx.strokeStyle = `rgba(${rgb}, ${(node.pulse * 0.18).toFixed(3)})`
      ctx.lineWidth = 0.7
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius + 5 + node.pulse * 8, 0, Math.PI * 2)
      ctx.stroke()
    }
  }

  for (let i = ripples.length - 1; i >= 0; i--) {
    const ripple = ripples[i]
    ripple.r += 3.2
    ripple.alpha -= 0.018
    if (ripple.alpha <= 0) {
      ripples.splice(i, 1)
      continue
    }
    ctx.strokeStyle = `rgba(${rgb}, ${ripple.alpha.toFixed(3)})`
    ctx.lineWidth = 0.8
    ctx.beginPath()
    ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2)
    ctx.stroke()
  }

  if (trail.length > 1) {
    ctx.lineWidth = 1
    ctx.lineCap = 'round'
    for (let i = 1; i < trail.length; i++) {
      ctx.strokeStyle = `rgba(${rgb}, ${(trail[i].alpha * 0.16).toFixed(3)})`
      ctx.beginPath()
      ctx.moveTo(trail[i - 1].x, trail[i - 1].y)
      ctx.lineTo(trail[i].x, trail[i].y)
      ctx.stroke()
    }
  }
}

function loop(time: number) {
  frame = requestAnimationFrame(loop)
  if (time - last < 50) return
  last = time
  for (const node of nodes) stepNode(node)
  scrollImpulse *= 0.86
  if (Math.abs(scrollImpulse) < 0.01) scrollImpulse = 0
  for (let i = trail.length - 1; i >= 0; i--) {
    trail[i].alpha -= 0.045
    if (trail[i].alpha <= 0) trail.splice(i, 1)
  }
  draw()
}

function onPointerMove(event: PointerEvent) {
  if (reduced) return
  pointer.x = event.clientX
  pointer.y = event.clientY
  pointer.active = true
  const previous = trail[trail.length - 1]
  if (!previous || Math.hypot(previous.x - pointer.x, previous.y - pointer.y) > 9) {
    trail.push({ x: pointer.x, y: pointer.y, alpha: 1 })
    if (trail.length > 9) trail.shift()
  }
  wrap.value?.classList.add('is-live')
  document.documentElement.style.setProperty('--atm-x', `${event.clientX}px`)
  document.documentElement.style.setProperty('--atm-y', `${event.clientY}px`)
}

function onScroll() {
  if (reduced) return
  const next = window.scrollY
  scrollImpulse = Math.max(-40, Math.min(40, scrollImpulse + (next - scrollY) * 0.25))
  scrollY = next
}

function onPointerDown(event: PointerEvent) {
  if (reduced) return
  ripples.push({ x: event.clientX, y: event.clientY, r: 4, alpha: 0.22 })
}

function onPointerLeave() {
  pointer.active = false
  wrap.value?.classList.remove('is-live')
}

function onBurst() {
  const cx = pointer.active ? pointer.x : width / 2
  const cy = pointer.active ? pointer.y : height / 2
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    ripples.push({
      x: cx + Math.cos(angle) * 18,
      y: cy + Math.sin(angle) * 18,
      r: 4 + i * 6,
      alpha: 0.3 - i * 0.02,
    })
  }
  for (const node of nodes) node.pulse = Math.min(1, node.pulse + 0.5)
}

function onVisibility() {
  if (document.hidden) {
    cancelAnimationFrame(frame)
    frame = 0
  } else if (!reduced && !frame) {
    frame = requestAnimationFrame(loop)
  }
}

function onMotionChange() {
  reduced = motionQuery?.matches ?? false
  cancelAnimationFrame(frame)
  frame = 0
  if (reduced) {
    wrap.value?.classList.remove('is-live')
    draw()
  } else {
    frame = requestAnimationFrame(loop)
  }
}

onMounted(() => {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d', { alpha: true })
  if (!ctx) return
  readTheme()
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced = motionQuery.matches
  resize()
  themeObserver = new MutationObserver(readTheme)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  window.addEventListener('resize', resize, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
  window.addEventListener('bb:burst', onBurst)
  scrollY = window.scrollY
  if (!reduced) {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)
    motionQuery.addEventListener('change', onMotionChange)
    frame = requestAnimationFrame(loop)
  } else {
    motionQuery.addEventListener('change', onMotionChange)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  themeObserver?.disconnect()
  motionQuery?.removeEventListener('change', onMotionChange)
  window.removeEventListener('resize', resize)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('pointerleave', onPointerLeave)
  document.removeEventListener('visibilitychange', onVisibility)
  window.removeEventListener('bb:burst', onBurst)
})
</script>

<template>
  <div ref="wrap" class="atmosphere" aria-hidden="true">
    <div class="atmosphere__grid"></div>
    <div class="atmosphere__glow"></div>
    <div class="atmosphere__ring"></div>
    <canvas ref="canvas" class="atmosphere__field"></canvas>
  </div>
</template>
