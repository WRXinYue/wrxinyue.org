<script setup lang="ts">
defineProps<{
  projects: any
}>()
</script>

<template>
  <div class="work__container">
    <div v-for="project in projects" :key="project.id" class="work__item" :data-speed="project.workItemSpeed">
      <span class="work__item-num" :data-speed="project.workItemNumSpeed">{{ project.id }}</span>
      <div class="work__item-img">
        <img :src="project.url" :alt="project.alt">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.work__container {
  display: flex;
  flex-wrap: wrap;
  row-gap: 120px;
  justify-content: space-between;
  padding: 0 120px;
}

.work__item {
  position: relative;
  width: calc(50% - 60px);
  height: 400px;
}

.work__item-num {
  position: absolute;
  display: inline-block;
  font-size: 70px;
  color: var(--pr-color);
  mix-blend-mode: difference;
  z-index: 2;
}

.work__item-img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.work__item-img img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
