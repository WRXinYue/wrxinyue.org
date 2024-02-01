<script setup>
import { projects } from '~/constants/index'
</script>

<template>
  <section class="work">
    <div class="content">
      <h2 class="theme-section-title">
        portfo<span class="theme-stroke">lio</span>
        <span class="section-title__square" />
      </h2>
    </div>

    <div grid="~ cols-1 lg:cols-2 xl:cols-3 gap-4">
      <a
        v-for="project in projects"
        :key="project.id"
        block
        of-hidden
        transition-all
        duration-500
        relative
        border="~ base rounded-lg"
        hover="scale-101 shadow-xl z-10"
        :data-speed="project.workItemSpeed"
      >
        <img class="max-w-full" :src="project.url" :alt="project.alt">
        <div class="h-40" :data-speed="project.workItemNumSpeed">{{ project.id }}</div>
      </a>
    </div>
  </section>
</template>
