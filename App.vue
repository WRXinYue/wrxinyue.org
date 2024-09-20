<script setup lang="ts">
import { useFrontmatter } from 'valaxy'
import { startScrollDamping } from 'valaxy-theme-sakura/utils/scrollDamping'
import { onMounted } from 'vue'
import { useWindowSize } from '@vueuse/core'

const frontmatter = useFrontmatter()
const { width } = useWindowSize()

onMounted(() => {
  if (width.value >= 768)
    startScrollDamping()
})
</script>

<template>
  <ClientOnly v-if="frontmatter.plum">
    <Plum />
  </ClientOnly>
</template>
