<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { useAppStore, useFrontmatter } from 'valaxy'
import { onMounted } from 'vue'
import { initLenis } from './helpers/lenis'

const { width } = useWindowSize()
const appStore = useAppStore()
const frontmatter = useFrontmatter()

onMounted(() => {
  if (width.value >= 768)
    initLenis()

  // HACK: siteConfig mode not warking
  if (!appStore.isDark)
    appStore.toggleDark()
})

onMounted(() => {
  appStore.showLoading = false
})
</script>

<template>
  <ClientOnly v-if="frontmatter.plum">
    <AntfuPlum />
  </ClientOnly>
  <Transition name="fade">
    <WRLoading v-if="appStore.showLoading" />
  </Transition>
</template>
