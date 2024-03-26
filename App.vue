<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
</script>

<template>
  <ClientOnly v-if="frontmatter.plum">
    <Plum />
  </ClientOnly>
</template>
