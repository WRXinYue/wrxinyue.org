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
const lenis = ref(null)

onMounted(async () => {
  const LenisModule = await import('@studio-freight/lenis')
  const Lenis = LenisModule.default

  lenis.value = new Lenis({ lerp: 0.04 })
  requestAnimationFrame(raf)
})

const raf = (time) => {
  if (lenis.value) {
    lenis.value.raf(time)
  }
  requestAnimationFrame(raf)
}
</script>
