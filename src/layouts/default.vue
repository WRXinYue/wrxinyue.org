<template>
  <main>
    <Navbar />
    <RouterView v-slot="{ Component, route }">
      <Transition :enter-active-class="route.meta.enterClass" :leave-active-class="route.meta.leaveClass">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <!-- <TheFooter /> -->
  </main>
</template>

<script setup>
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({ lerp: 0.04 })

onMounted(() => {
  requestAnimationFrame(raf)
})

const raf = (time) => {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
</script>
