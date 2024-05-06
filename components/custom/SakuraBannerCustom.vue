<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { useFrontmatter } from 'valaxy'

const fm = useFrontmatter()

onMounted(async () => {
  const ScrollTriggerModule = await import('gsap/ScrollTrigger')
  const ScrollTrigger = ScrollTriggerModule.default

  gsap.registerPlugin(ScrollTrigger)

  const gTl = gsap.timeline()

  gTl.to(
    '.gsap_header__img',
    {
      duration: 0.75,
      clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)',
      opacity: 0.03,
      scale: 1.2,
      ease: 'expo.out',
      onUpdate() {
        const progress = this.progress() * 100
        this.targets()[0].style.clipPath = `polygon(0% 0%, ${progress}% 0%, ${progress}% 100%, 0% 100%)`
      },
    },
  ).to(
    '.gsap_header__img',
    {
      duration: 1.25,
      opacity: 1,
      scale: 1,
      ease: 'expo.out',
    },
  )

  gTl.from('.gasp_title .char', {
    duration: 0.75,
    opacity: 0,
    yPercent: 130,
    stagger: 0.06,
    ease: 'back.out',
  }, '-=2')

  gTl.from(
    '.header__marq',
    { duration: 2, opacity: 0, yPercent: 100, ease: 'expo.out' },
    '-=1.5',
  )

  const gsapSq = gsap.utils.toArray('.section-title__square') as Element[]
  gsapSq.forEach((gSq) => {
    const rotationAnim = gsap.from(gSq, { duration: 3, rotation: 720 })
    ScrollTrigger.create({
      trigger: gSq,
      animation: rotationAnim,
      start: 'top bottom',
      scrub: 1.9,
    })
  })

  gsap_header()
  gsap_portfolio()
  gsap_service()
  gsap_footer()
})

function gsap_header() {
  gsap.to('.title_parallax', {
    scrollTrigger: {
      start: 'top top',
      scrub: 1.9,
    },
    yPercent: -150,
  })
  gsap.to('.theme-stroke', {
    scrollTrigger: {
      start: 'top top',
      scrub: 1.9,
    },
    xPercent: 50,
  })
  gsap.to('.gsap_header__img', {
    scrollTrigger: {
      start: 'top top',
      scrub: 1.9,
    },
    xPercent: -70,
  })
  gsap.to('.gsap_header__img img', {
    scrollTrigger: {
      start: 'top top',
      scrub: 1.9,
    },
    scale: 1.3,
  })
  gsap.to('.header__marq-wrapp', {
    scrollTrigger: {
      start: 'top top',
      scrub: 1.9,
    },
    xPercent: -50,
  })
  gsap.to('.header__marq-star img', {
    scrollTrigger: {
      start: 'top top',
      scrub: 1.9,
    },
    rotate: -720,
  })
}

function gsap_portfolio() {
  gsap.from('.work-container .card, .work-container .title', {
    y: (i, el) => 1 - Number.parseFloat(el.getAttribute('data-speed')),
    scrollTrigger: {
      trigger: '.work',
      start: 'top bottom',
      scrub: 1.9,
    },
  })
  gsap.fromTo('.work-container .media', {
    scale: 1.8,
  }, {
    scrollTrigger: {
      trigger: '.work',
      start: 'top bottom',
      scrub: 1.2,
    },
    scale: 1.2,
  })
}

function gsap_service() {
  gsap.from('.service-item-arrow', {
    x: (i, el) => 1 - Number.parseFloat(el.getAttribute('data-speed')),
    scrollTrigger: {
      trigger: '.service',
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
    <template #background-display>
      <div class="gsap_header__img">
        <SakuraBackgroundDisplay />
      </div>
    </template>
    <template #banner-overlay-bar>
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
  </SakuraBanner>
</template>
