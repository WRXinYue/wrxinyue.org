<template>
  <div class="w-full fixed z-20" :class="scrolled ? 'ground-glass' : 'bg-transparent'">
    <nav class="px-2.5em items-center" :style="{ height: styles.navHeader + 'px' }">
      <div class="h-full flex items-center">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-link to="/music">Music</router-link>
      </div>
      <div id="marker" :class="scrolled ? 'animate__animated animate__zoomIn' : 'animate__animated animate__zoomOut'" />
    </nav>
    <div class="w-full h-1px bg-primary theme-border-b"
      :class="scrolled ? 'animate__animated animate__zoomIn' : 'animate__animated animate__zoomOut'" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router/auto";
import styles from "~/style";

const route = useRoute();

const scrolled = ref(false);
const marker = ref();

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  nextTick(() => {
    marker.value = document.querySelector("#marker");
    updateMarker();
  });
});

watch(
  () => route.path,
  () => {
    nextTick(updateMarker);
  },
);

const updateMarker = () => {
  const routeActive = document.querySelector(".router-link-active");
  if (routeActive) {
    marker.value.style.left = routeActive.offsetLeft + "px";
    marker.value.style.width = routeActive.offsetWidth + "px";
  }
};

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  const scrollTop = window.scrollY;
  scrolled.value = scrollTop > 100;
};
</script>

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
