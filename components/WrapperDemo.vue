<script setup lang="ts">
import { formatDate } from '../logics'

const { link, video, date } = defineProps({
  link: {
    type: String,
  },
  video: {
    type: String,
  },
  excerpt: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div>
    <a
      border="~ base rounded-lg" block of-hidden class="group !duration-500 !transition-all" hover="scale-101 shadow-xl z-10"
      bg-base relative :href="link" target="_blank"
    >
      <video v-if="video" :src="video" w-full autoplay loop muted playsinline border="b base" />

      <div class="prose prose-sm p4 m0 pb3">
        <slot>
          <div v-html="excerpt" />
        </slot>
        <div op50 text-sm pt2>{{ formatDate(date, false) }}</div>
      </div>
    </a>
  </div>
</template>
