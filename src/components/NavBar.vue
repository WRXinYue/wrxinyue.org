<script setup lang="ts">
import { useRoute } from 'vue-router'
import styles from '~/style'

defineProps({
  showSpacer: {
    type: Boolean,
    default: true,
  },
})

// function toTop() {
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth',
//   })
// }

// const { y: scroll } = useWindowScroll()

const route = useRoute()

const scrolled = ref(false)
const marker = ref()
// const visibleLeft = ref(false)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  nextTick(() => {
    marker.value = document.querySelector('#marker')
    updateMarker()
  })
})

watch(
  () => route.path,
  () => {
    nextTick(updateMarker)
  },
)

function updateMarker() {
  const routeActive = document.querySelector('.router-link-active') as any
  if (routeActive) {
    marker.value.style.left = `${routeActive.offsetLeft}px`
    marker.value.style.width = `${routeActive.offsetWidth}px`
  }
}

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  const scrollTop = window.scrollY
  scrolled.value = scrollTop > 100
}
</script>

<template>
  <header class="z-40 fixed w-full" :class="scrolled ? 'ground-glass' : 'bg-transparent'">
    <!-- <button
      title="Scroll to top"
      fixed right-3 bottom-3 w-10 h-10 hover:op100 rounded-full
      hover-bg-hex-8883 transition duration-300 z-100 print:hidden
      :class="scroll > 300 ? 'op30' : 'op0! pointer-events-none'"
      @click="toTop()"
    >
      <div i-ri-arrow-up-line />
    </button> -->
    <nav class="px-2.5em items-center" :style="{ height: `${styles.navHeader}px` }">
      <!-- <div class="spacer" /> -->
      <div class="h-full flex items-center">
        <RouterLink to="/" focusable="Home">
          <span class="lt-md:hidden">Home</span>
          <div i-ri-article-line md:hidden />
        </RouterLink>
        <RouterLink to="/posts" title="Blog">
          <span class="lt-md:hidden">Blog</span>
          <div i-ri-article-line md:hidden />
        </RouterLink>
        <RouterLink to="/projects" title="Projects">
          <span class="lt-md:hidden">Projects</span>
          <div i-ri-lightbulb-line class="md:hidden" />
        </RouterLink>
        <RouterLink to="/talks" class="lt-md:hidden" title="Talks">
          Talks
        </RouterLink>
        <RouterLink to="/notes" class="lt-md:hidden" title="Podcasts">
          Notes
        </RouterLink>
        <RouterLink to="/demos" title="Demos">
          <span class="lt-md:hidden">Demos</span>
          <div i-ri-screenshot-line class="md:hidden" />
        </RouterLink>
        <RouterLink to="/music" title="Music">
          <span class="lt-md:hidden">Music</span>
          <div i-ri-screenshot-line class="md:hidden" />
        </RouterLink>
        <RouterLink to="/about" title="About">
          <span class="lt-md:hidden">About</span>
        </RouterLink>
        <!-- <RouterLink to="/sponsors-list" title="Sponsors">
          <div i-ri-user-heart-line />
        </RouterLink> -->
        <a href="https://github.com/WRXinYue" target="_blank" title="GitHub" class="lt-md:hidden">
          <div i-uil-github-alt />
        </a>
        <a href="/feed.xml" target="_blank" title="RSS" class="lt-md:hidden">
          <div i-la-rss-square style="font-size:1.25rem; margin: 0 -0.125rem;" />
        </a>
        <ToggleTheme />
      </div>
      <div id="marker" :class="scrolled ? 'animate__animated animate__zoomIn' : 'animate__animated animate__zoomOut'" />
    </nav>
    <div class="w-full h-1px bg-primary theme-border-b" :class="scrolled ? 'animate__animated animate__zoomIn' : 'animate__animated animate__zoomOut'" />
  </header>
  <div v-if="showSpacer" :style="{ height: `${styles.navHeader}px` }" />
</template>

<style scoped>
a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  margin-right: 1em;
}

/* a:hover,
a.router-link-active {
  border-bottom: 2px solid #08f9ff;
  filter: drop-shadow(0 5px 25px #08f9ff);
} */

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

#marker {
  position: absolute;
  transform: translateY(-2px);
  border-bottom: 2px solid #08f9ff;
  transition: 0.5s;
  pointer-events: none;
  filter: drop-shadow(0 5px 25px #08f9ff);
}

.ground-glass {
  /* box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2); */
  backdrop-filter: blur(10px);
  transition: 0.85s;
  background: transparent;
}
</style>
