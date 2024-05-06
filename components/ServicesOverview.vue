<script setup lang="ts">
defineProps<{
  services: any
}>()
</script>

<template>
  <div class="service-container">
    <div
      v-for="service in services" :key="service.name" class="service__item"
    >
      <span class="service-item-arrow" :data-speed="service.speed">
        <img :src="service.url" alt="">
      </span>
      <div class="service-item-txt">
        <span class="text">{{ service.name }}</span>
      </div>
    </div>
  </div>
</template>
