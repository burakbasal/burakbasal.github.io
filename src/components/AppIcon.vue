<script setup lang="ts">
type IconName = 'arrow-up-right' | 'arrow-down' | 'arrow-up' | 'link' | 'check'

defineProps<{ name: IconName }>()
</script>

<template>
  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path v-if="name === 'arrow-up-right'" d="M7 17 17 7M9 7h8v8" />
    <path v-else-if="name === 'arrow-down'" d="M12 5v14M6 13l6 6 6-6" />
    <path v-else-if="name === 'arrow-up'" d="M12 19V5M6 11l6-6 6 6" />
    <path v-else-if="name === 'link'" d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.2" />
    <path v-else d="m5 12 4.5 4.5L19 7" />
  </svg>
</template>
