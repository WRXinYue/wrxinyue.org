<script setup lang="ts">
import gsap from 'gsap'
import { computed, onMounted } from 'vue'

const props = defineProps<{
  text: string
}>()
const textArray = computed(() => props.text.split(''))
function getSpeed(index: number): string {
  let speed
  if (index % 2 === 0)
    speed = Math.floor(Math.random() * 301) * -1
  else
    speed = Math.floor(Math.random() * 300) + 1
  return speed.toString()
}

onMounted(() => {
  // HACK: Ensure that the previous DOM has been properly rendered.
  setTimeout(() => {
    gsap.from('.footer__div span', {
      y: (i, el) => 1 - Number.parseFloat(el.getAttribute('data-speed')),
      opacity: 0,
      markers: true,
      scrollTrigger: {
        trigger: '.footer',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1.9,
      },
    })
  }, 1000)
})
</script>

<template>
  <footer class="footer h-100vh items-center justify-center">
    <div class="footer__div theme-pr-color">
      <span
        v-for="(char, index) in textArray"
        :key="index"
        :data-speed="getSpeed(index)"
        class="whitespace-pre-wrap"
      >
        {{ char }}
      </span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;

  .footer__div {
    font-size: 4vw;
    letter-spacing: 15px;
    text-transform: uppercase;

    & span {
      display: inline-block;
    }
  }
}
</style>
