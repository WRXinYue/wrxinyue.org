<script setup lang="ts">
import { computed } from 'vue'
import { demoItems } from '../pages/data'

defineProps<{
  projects: any
}>()

const defaultItems = [
  { title: 'Unknown', src: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/unknown.png', link: '', workItemSpeed: -700, workItemNumSpeed: -400 },
  { title: 'Unknown', src: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/unknown.png', link: '', workItemSpeed: -600, workItemNumSpeed: -600 },
  { title: 'Unknown', src: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/unknown.png', link: '', workItemSpeed: -700, workItemNumSpeed: -800 },
  { title: 'Unknown', src: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/unknown.png', link: '', workItemSpeed: -400, workItemNumSpeed: -1000 },
]

const itemsToShow = computed(() => {
  return [...demoItems, ...defaultItems].slice(0, 4).map((item, i) => ({
    ...defaultItems[i % defaultItems.length],
    ...item,
  }))
})

function isVideoUrl(url: string) {
  return /\.(?:mp4|webm|ogg)$/i.test(url)
}
</script>

<template>
  <div class="work-container">
    <div v-for="(project, i) in itemsToShow" :key="i" class="card" :data-speed="project.workItemSpeed">
      <span class="title" :data-speed="project.workItemNumSpeed">/{{ project.title }}</span>
      <AppLink :to="project.link">
        <div class="media">
          <video v-if="isVideoUrl(project.src)" :src="project.src" w-full autoplay loop muted playsinline />
          <img v-else :src="project.src" alt="">
        </div>
      </AppLink>
    </div>
  </div>
</template>
