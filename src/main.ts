import { createApp } from 'vue'
import App from './App.vue'
import { reveal } from './directives/reveal'
import { silenceConsole } from './utils/silence'
import './style.css'

if (import.meta.env.PROD) silenceConsole()

/**
 * Client-side refusal for AI/training crawlers that actually execute scripts.
 * The authoritative signals are robots.txt, X-Robots-Tag and the Worker's 403;
 * this gate makes the rendered content unavailable to the same user agents in
 * browsers that report them. Real visitors are never matched.
 */
const AI_BOT_UA = /GPTBot|CCBot|ClaudeBot|Google-Extended|Applebot-Extended|Bytespider|PerplexityBot|Amazonbot|Meta-ExternalAgent|ChatGPT-User|Omgilibot/i

const root = document.getElementById('app')

if (root && AI_BOT_UA.test(navigator.userAgent)) {
  root.textContent = ''
  const notice = document.createElement('p')
  notice.className = 'bot-gate'
  notice.textContent =
    'BB-NOAI-2026-11-24 — Bu site yapay zekâ eğitimi ve otomatik veri toplama için kullanılamaz. This site may not be used for AI training or automated scraping.'
  root.appendChild(notice)
} else if (root) {
  createApp(App).directive('reveal', reveal).mount(root)
}
