<script setup lang="ts">
import { useFrontmatter } from 'valaxy'
import { onMounted } from 'vue'
import { useThemeConfig } from '../composables'
import { initGsapAnimations } from '../helpers'

const fm = useFrontmatter()
const themeConfig = useThemeConfig()

const { hero } = themeConfig.value

onMounted(() => {
  setTimeout(() => {
    initGsapAnimations()
  }, 0)
})
</script>

<template>
  <div class="hero-overlay">
    <div class="overlay-panel" />
  </div>

  <div class="scrollContainer">
    <SakuraHero :hero>
      <template #background>
        <div class="gsap_header__img">
          <SakuraHeroBackground data-scroll data-scroll-speed="-4" :urls="hero?.urls" />
        </div>
        <div class="title-container" data-scroll data-scroll-speed="2" flex="~ center">
          <h1 class="hero-wc">
            WELCOME
          </h1>
        </div>
        <!-- <div class="hero-container">
          <img data-scroll data-scroll-speed="-4" class="hero" max-w-none src="https://w.wallhaven.cc/full/p9/wallhaven-p9q3yj.jpg" alt="supes and bats">
        </div> -->
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
  </div>
</template>

<style lang="scss" scoped>
section {
  position: relative;
  height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
  color: white;
}

.hero-overlay {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  pointer-events: none;
  user-select: none;

  .overlay-panel {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform-origin: bottom;
    background-color: var(--va-c-bg);
  }
}

.hero-container {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 90%;
  transform: translate(-50%, -50%);
  filter: saturate(0) brightness(83%);

  img {
    height: 100%;
  }
}

.title-container {
  position: absolute;
  inset: 0;
  z-index: 20;
  color: white;
  mix-blend-mode: difference;
}

.hero-wc {
  font-family: 'Nova Flat', cursive;
  font-size: 10.5vw;
  text-align: center;
  user-select: none;
}

p {
  max-width: clamp(500px, 90%, 720px);
  margin: 0 auto;
  line-height: 1.1;
  font-family: 'Epilogue', sans-serif;
  font-size: clamp(20px, 4.4vw, 50px);
  text-align: center;
  user-select: none;
}

.JL {
  z-index: 999;
  position: absolute;
  top: 19.5%;
  font-family: 'Nova Flat', cursive;
  font-size: 7vw;
  letter-spacing: 35px;
  text-align: center;
  user-select: none;
}

.img-container {
  position: relative;
  height: 95%;
  width: 100%;
  overflow: hidden;
  // filter: saturate(0);

  .mask {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: black;
    transform-origin: bottom;
  }

  .img {
    height: 100%;
    width: 100%;
    background-image: url('https://w.wallhaven.cc/full/we/wallhaven-we2ogq.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
