<script setup lang="ts">
defineProps({
  text: String,
  hlText: String,
})
</script>

<template>
  <h2 class="theme-section-title">
    <span class="relative z-2">{{ text }}</span>
    <span class="theme-stroke relative z-2">{{ hlText }}</span>
    <span class="section-title__square" />
  </h2>
</template>
