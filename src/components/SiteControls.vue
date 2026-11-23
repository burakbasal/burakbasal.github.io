<script setup lang="ts">
import { locale, setLocale, t, type Locale } from '@/data/i18n'
import { theme, toggleTheme } from '@/composables/useTheme'

const options: Locale[] = ['tr', 'en']
</script>

<template>
  <div class="controls" role="group" aria-label="Language and theme">
    <div class="controls__lang" role="group" aria-label="Language">
      <button
        v-for="option in options"
        :key="option"
        type="button"
        :class="{ 'is-active': locale === option }"
        :aria-pressed="locale === option"
        @click="setLocale(option)"
      >
        {{ option.toUpperCase() }}
      </button>
    </div>
    <button
      class="controls__theme"
      type="button"
      :aria-label="theme === 'dark' ? t('controls.theme') : t('controls.themeDark')"
      @click="toggleTheme({ x: $event.clientX, y: $event.clientY })"
    >
      <svg v-if="theme === 'dark'" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6" />
        <path
          d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
        />
      </svg>
      <svg v-else viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>
