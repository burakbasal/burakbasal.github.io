import { createApp } from 'vue'
import App from './App.vue'
import { reveal } from './directives/reveal'
import { silenceConsole } from './utils/silence'
import './style.css'

if (import.meta.env.PROD) silenceConsole()

createApp(App).directive('reveal', reveal).mount('#app')
