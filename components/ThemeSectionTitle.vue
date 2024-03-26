<script setup lang="ts">
defineProps({
  text: String,
  hlText: String,
})
</script>

<template>
  <h2 class="theme-section-title">
    <span>{{ text }}</span>
    <span class="theme-stroke">{{ hlText }}</span>
    <span class="section-title__square" />
  </h2>
</template>
