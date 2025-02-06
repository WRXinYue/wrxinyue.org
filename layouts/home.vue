<script setup lang="ts">
import { useFrontmatter } from 'valaxy'
import { onMounted } from 'vue'
import { useThemeConfig } from '../composables'
import { initGsapAnimations } from '../helpers'

const fm = useFrontmatter()
const themeConfig = useThemeConfig()

const { hero } = themeConfig.value

onMounted(() => {
  initGsapAnimations()
})
</script>

<template>
  <SakuraHero :hero>
    <template #background-display>
      <div class="gsap_header__img">
        <SakuraHeroBackground :urls="hero?.urls" />
      </div>
    </template>
    <template #info-overlay>
      <h1 class="gasp_title my-element">
        <span class="title_parallax">
          <span class="char">W</span>
          <span class="char">R</span>
          <span class="char">X</span>
          <span class="char">i</span>
          <span class="char">n</span>
          <span class="char">Y</span>
          <span class="char">u</span>
          <span class="char">e</span>
          <span class="char">'</span>
          <span class="char">s</span>
        </span>
        <span class="theme-stroke char">
          <span class="char">H</span>
          <span class="char">o</span>
          <span class="char">m</span>
          <span class="char">e</span>
        </span>
      </h1>
    </template>
    <template #overlay-bar>
      <div class="header__marq absolute bottom-0 left-0">
        <div class="header__marq-wrapp">
          <span v-for="idea in fm.ideas" :key="idea.text" class="header__marq-txt flex items-center">
            <span>{{ idea.text }}</span>
            <span class="header__marq-star">
              <img :src="idea.url" alt="">
            </span>
          </span>
        </div>
      </div>
    </template>
  </SakuraHero>
  <RouterView />
</template>
