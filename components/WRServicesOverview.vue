<script setup lang="ts">
import gsap from 'gsap'
// import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { onMounted } from 'vue'

defineProps<{
  services: any
}>()

// gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // const textElements = gsap.utils.toArray('.service-item-text')

  // textElements.forEach((text) => {
  //   gsap.to(text, {
  //     backgroundSize: '100%',
  //     ease: 'none',
  //     scrollTrigger: {
  //       marker: true,
  //       trigger: text,
  //       start: 'center 80%',
  //       end: 'center 20%',
  //       scrub: true,
  //     },
  //   })
  // })

  gsap.from('.service-item-arrow', {
    x: (i, el) => 1 - Number.parseFloat(el.getAttribute('data-speed')),
    scrollTrigger: {
      trigger: '.service',
      start: 'top bottom',
      scrub: 1.9,
    },
  })
})
</script>

<template>
  <div class="service-container">
    <h1 v-for="service in services" :key="service.name" class="service__item service-item-text">
      <div class="service-highlight-overlay" px-1 />
      <div px-1>
        <span class="text">{{ service.name }}</span>
        <a class="service-item-arrow" :data-speed="service.speed">
          <img :src="service.url" alt="">
        </a>
      </div>
    </h1>
  </div>
</template>

<style lang="scss" scoped>
@use 'valaxy/client/styles/mixins/index.scss' as *;

.service-item-text {
  font-size: 5vw;
  letter-spacing: -0.01em;
  line-height: 100%;

  width: 100%;
  color: rgb(182, 182, 182, 0.2);
  background: linear-gradient(to right, #b6b6b6, #b6b6b6) no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  background-size: 0%;
  transition: background-size cubic-bezier(0.1, 0.5, 0.5, 1) 0.5s;

  border-bottom: 1px solid #2f2b28;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;

  color: #4b4b4b;
  text-transform: uppercase;

  &:hover {
    color: #ffffff;
    transition: color ease 0.3s;
  }
}

.service-highlight-overlay {
  position: absolute;
  width: 100%;
  height: 90%;
  background-color: var(--va-c-brand);
  border-radius: var(--card-radius);
  color: #0d0d0d;

  clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%);
  transform-origin: center;
  transition: all cubic-bezier(0.1, 0.5, 0.5, 1) 0.4s;

  display: flex;
  flex-direction: column;
  justify-content: center;
  // mix-blend-mode: darken;
  mix-blend-mode: color-burn;
}

.service-item-text:hover > .service-highlight-overlay {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

.service-container {
  .service__item {
    position: relative;
    padding: 40px 0;
    border-radius: var(--card-radius);
    overflow: hidden;
  }

  .service-item-arrow {
    position: absolute;
    display: inline-block;
    width: 55px;
    height: 55px;
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    & img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      transform: rotate(180deg);
      transition: filter 0.3s ease;

      &:hover {
        filter: brightness(20);
      }
    }

    @include tablet {
      & {
        display: none;
      }
    }

    @include mobile {
      & {
        display: none;
      }
    }
  }
}
</style>
