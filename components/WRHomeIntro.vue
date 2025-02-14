<script setup lang="ts">
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
// import LocomotiveScroll from 'locomotive-scroll'
import { onMounted } from 'vue'

onMounted(async () => {
  gsap.registerPlugin(ScrollTrigger)

  setTimeout(async () => {
    // gsap.set('body', { autoAlpha: 1 })

    const LocomotiveScrollMode = await import('locomotive-scroll')
    const LocomotiveScroll = LocomotiveScrollMode.default

    const locoScroll = new LocomotiveScroll({
      el: document.querySelector('.scrollContainer') as HTMLElement,
    // smooth: true,
    })

    locoScroll.on('scroll', ScrollTrigger.update)

    ScrollTrigger.scrollerProxy('.scrollContainer', {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, { offset: 0, duration: 0 })
          : (locoScroll as any).scroll.instance.scroll.y
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: document.querySelector('.scrollContainer').style.transform
        ? 'transform'
        : 'fixed',
    })

    ScrollTrigger.addEventListener('refresh', () => {
      locoScroll.update()
    })

    ScrollTrigger.refresh()

    // const splitName = new SplitText('.hero-wc', {
    //   type: 'chars',
    // })

    // const nameTL = gsap.timeline()

    // nameTL
    //   .set('.hero-wc', { scale: 1.4 })
    //   .from(splitName.chars, {
    //     yPercent: gsap.utils.wrap([200, -80]),
    //     opacity: 0,
    //     stagger: 0.018,
    //     duration: 1.6,
    //     ease: 'power4.inOut',
    //   })
    //   .to('.hero-wc', { scale: 1, duration: 0.95, ease: 'power3.out' }, '-=0.75')
    //   .from('.hero', { opacity: 0, duration: 4, ease: 'power2.out', onComplete: hideElement }, '-=0.55')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.sec-img',
        // markers: true,
        scrub: 0.4,
        scroller: '.scrollContainer',
        pin: true,
        start: 'center center',
        end: '+=100%',
      },
    })

    tl
      .to('.mask', {
        scaleY: 0,
      })
      .from(
        '.img',
        {
          opacity: 0,
          scale: 1.7,
        },
        0,
      )
  }, 0)
})
</script>

<template>
  <div class="scrollContainer">
    <section class="sec-img">
      <div class="img-container">
        <div class="mask" />
        <div class="img" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
section {
  position: relative;
  height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
  color: white;
}

.hero-overlay {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  pointer-events: none;
  user-select: none;

  .overlay-panel {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform-origin: bottom;
    background-color: var(--va-c-bg);
  }
}

.hero-container {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 90%;
  transform: translate(-50%, -50%);
  filter: saturate(0) brightness(83%);

  img {
    height: 100%;
  }
}

.title-container {
  z-index: 999;
  position: relative;
  color: white;
  mix-blend-mode: difference;
}

h1 {
  font-family: 'Nova Flat', cursive;
  font-size: 14.5vw;
  text-align: center;
  user-select: none;
}

.img-container {
  position: relative;
  height: 95%;
  width: 100%;
  overflow: hidden;
  // filter: saturate(0);

  .mask {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: var(--va-c-bg);
    transform-origin: bottom;
  }

  .img {
    height: 100%;
    width: 100%;
    background-image: url('https://wrxinyue.s3.bitiful.net/pc-wallpaper%2Fwallhaven-gp7o9d.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
