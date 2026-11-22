<script setup lang="ts">
type IconName = 'arrow-up-right' | 'arrow-down' | 'arrow-up'

defineProps<{ name: IconName }>()
</script>

<template>
  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path v-if="name === 'arrow-up-right'" d="M7 17 17 7M9 7h8v8" />
    <path v-else-if="name === 'arrow-down'" d="M12 5v14M6 13l6 6 6-6" />
    <path v-else d="M12 19V5M6 11l6-6 6 6" />
  </svg>
</template>
