import { createApp } from 'vue'
import App from './App.vue'
import { reveal } from './directives/reveal'
import './style.css'

// Production console stays silent. Dev builds keep native logging for debugging.
if (import.meta.env.PROD) {
  const sink = () => {}
  const muted = console as unknown as Record<string, unknown>
  for (const method of ['log', 'info', 'warn', 'error', 'debug', 'trace', 'dir', 'table', 'group', 'groupEnd']) {
    muted[method] = sink
  }
}

createApp(App).directive('reveal', reveal).mount('#app')
