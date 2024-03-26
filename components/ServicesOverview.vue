<script setup lang="ts">
defineProps<{
  services: any
}>()
</script>

<template>
  <div class="service__list">
    <div v-for="service in services" :key="service.name" class="service__item">
      <span class="service__item-arrow" :data-speed="service.speed">
        <img :src="service.url" alt="">
      </span>
      <div class="service__item-txt">
        <span class="service__item-text">{{ service.name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.service__item {
  position: relative;
  padding: 40px 0;
  border-bottom: 1px solid #2f2e2e;
}

.service__item-arrow {
  position: absolute;
  display: inline-block;
  width: 55px;
  height: 55px;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.service__item-arrow img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: rotate(180deg);
}

.service__item-txt {
  font-size: 50px;
  color: #4b4b4b;
  text-transform: uppercase;
}
</style>
