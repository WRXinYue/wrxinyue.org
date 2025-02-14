import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { wrapTextWithSpan } from '../helpers/gsap'

export async function initGsapAnimations() {
  gsap.registerPlugin(ScrollTrigger)

  const gTl = gsap.timeline()

  gsap.to('.overlay-panel', {
    scaleY: 0,
    duration: 1.65,
    ease: 'power4.inOut',
  })

  const heroWcElements = wrapTextWithSpan('.hero-wc')

  gTl
    .set('.hero-wc .char', { scale: 1.4 })
    .from(heroWcElements, {
      yPercent: gsap.utils.wrap([200, -80]),
      opacity: 0,
      stagger: 0.018,
      duration: 1.8,
      ease: 'power4.inOut',
    })
    .to('.hero-wc', { scale: 1, duration: 0.95, ease: 'power3.out' }, '-=0.75')
    .from('.hero', { opacity: 0, duration: 2, ease: 'power2.out' })
    .to('.hero-wc', { opacity: 0, duration: 1.25, ease: 'power2.out' }, '<-=0.35')
  gTl
    .to('.gsap_header__img', {
      duration: 0.75,
      clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)',
      opacity: 0.03,
      scale: 1.2,
      ease: 'expo.out',
      onUpdate() {
        const progress = this.progress() * 100
        this.targets()[0].style.clipPath = `polygon(0% 0%, ${progress}% 0%, ${progress}% 100%, 0% 100%)`
      },
    }, '<')
    .to('.gsap_header__img', {
      duration: 1.25,
      opacity: 1,
      scale: 1,
      ease: 'expo.out',
    })
    .to('.title-container', { display: 'none', duration: 0 }, '>')

  // const nameTL = gsap.timeline()

  gTl.from('.gasp_title .char', {
    duration: 0.75,
    opacity: 0,
    yPercent: 130,
    stagger: 0.06,
    ease: 'back.out',
  }, '-=2.5')
    .from('.gasp_title .char', { fontSize: '2.5vw' }, '<')
    .to('.gasp_title .char', { fontSize: '5.25vw' }, '<')

  gTl.from(
    '.header__marq',
    { duration: 2, opacity: 0, yPercent: 100, ease: 'expo.out' },
    '-=2.5',
  )

  // HACK: Ensure that the previous DOM has been properly rendered.
  setTimeout(() => {
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
  }, 1000)

  gsap_header()
  gsap_portfolio()

  gsap.from('.sec-p', {
    scrollTrigger: {
      trigger: '.sec-p',
      // markers: true,
      start: 'center bottom',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
  })

  gsap.to('.sec-p p', {
    scrollTrigger: {
      trigger: '.sec-p',
      // markers: true,
      start: 'bottom center',
      toggleActions: 'play reverse none none',
    },
    color: '#fff',
    ease: 'power3.out',
  })
}

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
