<script setup lang="ts">
import { useThemeConfig } from '../../composables'

const themeConfig = useThemeConfig()
</script>

<template>
  <SakuraNavbar auto-hide :navbar="themeConfig.nav" :show-marker="themeConfig.navOptions?.showMarker">
    <template #nav-tool>
      <div flex>
        <SakuraToggleLocale mr-2 />
        <ToggleTheme />
      </div>
    </template>
  </SakuraNavbar>
</template>
