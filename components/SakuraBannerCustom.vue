<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ideas } from '../constants/index'

onMounted(async () => {
  const ScrollTriggerModule = await import('gsap/ScrollTrigger')
  const ScrollTrigger = ScrollTriggerModule.default

  gsap.registerPlugin(ScrollTrigger)

  const gTl = gsap.timeline()

  gTl.from('.gasp_title .char', {
    duration: 1,
    opacity: 0,
    yPercent: 130,
    stagger: 0.06,
    ease: 'back.out',
  })

  gTl.to(
    '.gsap_header__img',
    {
      duration: 2,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      scale: 1,
      ease: 'expo.out',
    },
    '-=1',
  )

  gTl.from(
    '.header__marq',
    { duration: 2, opacity: 0, yPercent: 100, ease: 'expo.out' },
    '-=1.5',
  )

  const gsapSq = gsap.utils.toArray('.section-title__square') as Element[]
  gsapSq.forEach((gSq) => {
    const rotationAnim = gsap.from(gSq, 3, { rotation: 720 })
    ScrollTrigger.create({
      trigger: gSq,
      animation: rotationAnim,
      start: 'top bottom',
      scrub: 1.9,
    })
  })

  gsap_header()
  gsap_about()
  gsap_skills()
  gsap_portfolio()
  gsap_service()
  gsap_footer()
})

function gsap_header() {
  gsap.to('.title_parallax', {
    scrollTrigger: {
      trigger: '.gsap_header',
      start: 'top top',
      scrub: 1.9,
    },
    yPercent: -150,
  })
  gsap.to('.gsap_header .theme-stroke', {
    scrollTrigger: {
      trigger: '.gsap_header',
      start: 'top top',
      scrub: 1.9,
    },
    xPercent: 50,
  })
  gsap.to('.gsap_header__img', {
    scrollTrigger: {
      trigger: '.gsap_header',
      start: 'top top',
      scrub: 1.9,
    },
    xPercent: -70,
  })
  gsap.to('.gsap_header__img img', {
    scrollTrigger: {
      trigger: '.gsap_header',
      start: 'top top',
      scrub: 1.9,
    },
    scale: 1.3,
  })
  gsap.to('.header__marq-wrapp', {
    scrollTrigger: {
      trigger: '.gsap_header',
      start: 'top top',
      scrub: 1.9,
    },
    xPercent: -50,
  })
  gsap.to('.header__marq-star img', {
    scrollTrigger: {
      trigger: '.gsap_header',
      start: 'top top',
      scrub: 1.9,
    },
    rotate: -720,
  })
}

function gsap_about() {
  gsap.from('.about__img', {
    scrollTrigger: {
      trigger: '.about',
      start: 'top bottom',
      scrub: 1.9,
    },
    yPercent: 80,
  })
  gsap.from('.about__img img', {
    scrollTrigger: {
      trigger: '.about',
      start: 'top bottom',
      scrub: 1.9,
    },
    scale: 1.6,
  })
  gsap.to('.about__txt', {
    scrollTrigger: {
      trigger: '.about__wrapp',
      start: 'top bottom',
      scrub: 1.9,
    },
    yPercent: 50,
  })
}

function gsap_skills() {
  gsap.from('.skills__num', {
    x: (i, el) => 1 - Number.parseFloat(el.getAttribute('data-speed')),
    scrollTrigger: {
      trigger: '.skills__list',
      start: 'top bottom',
      scrub: 1.9,
    },
  })
}

function gsap_portfolio() {
  gsap.from('.work__item, .work__item-num', {
    y: (i, el) => 1 - Number.parseFloat(el.getAttribute('data-speed')),
    scrollTrigger: {
      trigger: '.work',
      start: 'top bottom',
      scrub: 1.9,
    },
  })
  gsap.from('.work__item-img img', {
    scale: 1.6,
    scrollTrigger: {
      trigger: '.work__container',
      start: 'top bottom',
      scrub: 1.9,
    },
  })
}

function gsap_service() {
  gsap.from('.service__item-arrow', {
    x: (i, el) => 1 - Number.parseFloat(el.getAttribute('data-speed')),
    scrollTrigger: {
      trigger: '.service__list',
      start: 'top bottom',
      scrub: 1.9,
    },
  })
}

function gsap_footer() {
  gsap.from('.footer__div span', {
    y: (i, el) => 1 - Number.parseFloat(el.getAttribute('data-speed')),
    opacity: 0,
    scrollTrigger: {
      trigger: '.footer',
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: 1.9,
    },
  })
}
</script>

<template>
  <SakuraBanner>
    <template #info-overlay>
      <h1 class="gasp_title my-element">
        <span class="title_parallax">WRXinYue's</span>
        <span class="theme-stroke">Home</span>
      </h1>
    </template>
    <template #background-display>
      <div class="gsap_header__img">
        <SakuraBackgroundDisplay />
      </div>
    </template>
    <template #banner-overlay-bar>
      <div class="header__marq absolute bottom-0 left-0">
        <div class="header__marq-wrapp">
          <span v-for="idea in ideas" :key="idea.text" class="header__marq-txt flex items-center">
            <span>{{ idea.text }}</span>
            <span class="header__marq-star">
              <img :src="idea.url" alt="">
            </span>
          </span>
        </div>
      </div>
    </template>
  </SakuraBanner>
</template>
