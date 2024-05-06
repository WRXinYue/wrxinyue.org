<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
}>()

const textArray = computed(() => props.text.split(''))

function getSpeed(index: number): string {
  let speed
  if (index % 2 === 0)
    speed = Math.floor(Math.random() * 301) * -1
  else
    speed = Math.floor(Math.random() * 300) + 1

  return speed.toString()
}
</script>

<template>
  <footer class="footer justify-center items-center h-100vh">
    <div class="footer__div theme-pr-color">
      <span
        v-for="(char, index) in textArray"
        :key="index"
        :data-speed="getSpeed(index)"
        class="whitespace-pre-wrap"
      >
        {{ char }}
      </span>
    </div>
  </footer>
</template>
