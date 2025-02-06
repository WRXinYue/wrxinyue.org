<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { useAppStore } from 'valaxy'
import { onMounted } from 'vue'
import { initLenis } from './helpers/lenis'

const { width } = useWindowSize()
const appStore = useAppStore()

onMounted(() => {
  if (width.value >= 768)
    initLenis()

  // HACK: siteConfig mode not warking
  if (!appStore.isDark)
    appStore.toggleDark()
})
</script>

<template>
  <div />
</template>
