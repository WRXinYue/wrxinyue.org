<template>
  <div class="page overflow-auto z-1 h-auto">
    <header class="gsap_header relative flex px-70px justify-center flex-items-center w-full h-100vh">
      <h1 class="gasp_title my-element"
        ><span class="title_paralax">WRXinYue's</span><span class="theme-stroke">Home</span></h1
      >
      <div class="gsap_header__img absolute h-full w-full top-0 overflow-hidden">
        <img class="object-cover block bg-cover" src="https://w.wallhaven.cc/full/3l/wallhaven-3lgk6y.png" alt="1" />
      </div>
      <div class="header__marq absolute bottom-0 left-0">
        <div class="header__marq-wrapp">
          <span class="header__marq-txt" v-for="idea in ideas">
            {{ idea.text }}
            <span class="header__marq-star">
              <img :src="idea.url" alt="" />
            </span>
          </span>
        </div>
      </div>
    </header>

    <main class="container">
      <section class="about">
        <div class="about__wrapp flex justify-between">
          <div class="about__img h-auto theme-about">
            <img src="https://w.wallhaven.cc/full/q2/wallhaven-q21ezq.jpg" alt="2" />
          </div>
          <div class="about__txt pr-70px h-auto theme-about">
            <h2 class="theme-section-title">
              abo<span class="theme-stroke">ut</span>
              <span class="section-title__square"></span>
            </h2>
            <p class="text-xl theme-text">
              Software Engineer, be good at Java and C#, also love developing games and visual computing
            </p>
          </div>
        </div>
      </section>

      <section class="skills">
        <div class="content">
          <h2 class="theme-section-title">
            Tech<span class="theme-stroke">Stack</span>
            <span class="section-title__square"></span>
          </h2>

          <ul class="skills__list">
            <li class="skills__item" v-for="skill in skills">
              <span class="skills__num" :data-speed="skill.speed">{{ skill.id }}</span>
              <p class="color-white font-size-5">{{ skill.introduce }} </p>
              <p class="color-[#4b4b4b] font-size-4">{{ skill.description }} </p>
            </li>
          </ul>
        </div>
      </section>

      <section class="work">
        <div class="content">
          <h2 class="theme-section-title">
            portfo<span class="theme-stroke">lio</span>
            <span class="section-title__square"></span>
          </h2>
        </div>

        <div class="work__wrapp">
          <div class="work__item" :data-speed="project.workItemSpeed" v-for="project in projects">
            <span class="work__item-num" :data-speed="project.workItemNumSpeed">{{ project.id }}</span>
            <div class="work__item-img">
              <img :src="project.url" :alt="project.alt" />
            </div>
          </div>
        </div>
      </section>

      <section class="serv">
        <div class="content">
          <h2 class="theme-section-title">
            servic<span class="theme-stroke">es</span>
            <span class="section-title__square"></span>
          </h2>

          <div class="serv__list">
            <div class="serv__item" v-for="service in services">
              <span class="serv__item-arrow" :data-speed="service.speed">
                <img :src="service.url" alt="" />
              </span>
              <div class="serv__item-txt">
                <span class="serv__item-text">{{ service.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer flex justify-center items-center h-100vh">
      <div class="footer__div theme-pr-color">
        <span data-speed="-300">a</span>
        <span data-speed="100">p</span>
        <span data-speed="300">p</span>
        <span data-speed="-300">r</span>
        <span data-speed="350">o</span>
        <span data-speed="200">v</span>
        <span data-speed="-310">e</span>
        <span data-speed="200">c</span>
        <span data-speed="-340">o</span>
        <span data-speed="-100">d</span>
        <span data-speed="300">e</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Splitting from 'splitting'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ideas, projects, services, skills } from '~/constants/index'

onMounted(() => {
  Splitting({
    target: '.my-element',
    by: 'chars',
  })

  gsap.registerPlugin(ScrollTrigger)

  const gTl = gsap.timeline()

  gTl.from('.gasp_title .char', 1, {
    opacity: 0,
    yPercent: 130,
    stagger: 0.06,
    ease: 'back.out',
  })
  gTl.to(
    '.gsap_header__img',
    2,
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      scale: 1,
      ease: 'expo.out',
    },
    '-=1',
  )
  gTl.from('.header__marq', 2, { opacity: 0, yPercent: 100, ease: 'expo.out' }, '-=1.5')

  const gsapSq = gsap.utils.toArray('.section-title__square')
  gsapSq.forEach((gSq, i) => {
    const rotat = gsap.from(gSq, 3, { rotation: 720 })
    ScrollTrigger.create({
      trigger: gSq,
      animation: rotat,
      start: 'top bottom',
      scrub: 1.9,
    })
  })

  gsap_header()
  gsap_about()
  gsap_skills()
  gsap_portfolio()
  gsap_serv()
  gsap_footer()
})

const gsap_header = () => {
  gsap.to('.title_paralax', {
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

const gsap_about = () => {
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

const gsap_skills = () => {
  gsap.from('.skills__num', {
    x: (i, el) => 1 - parseFloat(el.getAttribute('data-speed')),
    scrollTrigger: {
      trigger: '.skills__list',
      start: 'top bottom',
      scrub: 1.9,
    },
  })
}

const gsap_portfolio = () => {
  gsap.from('.work__item, .work__item-num', {
    y: (i, el) => 1 - parseFloat(el.getAttribute('data-speed')),
    scrollTrigger: {
      trigger: '.work',
      start: 'top bottom',
      scrub: 1.9,
    },
  })
  gsap.from('.work__item-img img', {
    scale: 1.6,
    scrollTrigger: {
      trigger: '.work__wrapp',
      start: 'top bottom',
      scrub: 1.9,
    },
  })
}

const gsap_serv = () => {
  gsap.from('.serv__item-arrow', {
    x: (i, el) => 1 - parseFloat(el.getAttribute('data-speed')),
    scrollTrigger: {
      trigger: '.serv__list',
      start: 'top bottom',
      scrub: 1.9,
    },
  })
}

const gsap_footer = () => {
  gsap.from('.footer__div span', {
    y: (i, el) => 1 - parseFloat(el.getAttribute('data-speed')),
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

<route lang="yaml">
name: home
meta:
  enterClass: animate__animated animate__fadeIn
  leaveClass: animate__animated animate__fadeOutLeft
</route>
