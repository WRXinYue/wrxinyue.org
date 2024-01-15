<template>
  <div class="mt-30">
    <div class="play-backdrop"></div>
    <div class="play-button">
      <svg class="play-circles" viewBox="0 0 152 152">
        <circle class="play-circle-01" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="343 343" cx="76" cy="76" r="72.7" />
        <circle class="play-circle-02" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="309 309" cx="76" cy="76" r="65.5" />
      </svg>
      <div class="play-perspective">
        <button class="play-close"></button>
        <div class="play-triangle">
          <div class="play-video">
            <div class="w-600px h-400px"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'

onMounted(async () => {
  gsap.set('.play-circle-01', {
    rotation: 90,
    transformOrigin: 'center',
  })

  gsap.set('.play-circle-02', {
    rotation: -90,
    transformOrigin: 'center',
  })

  gsap.set('.play-perspective', {
    xPercent: 6.5,
    scale: 0.175,
    transformOrigin: 'center',
    perspective: 1,
  })

  gsap.set('.play-video', {
    visibility: 'hidden',
    opacity: 0,
  })

  gsap.set('.play-triangle', {
    transformOrigin: 'left center',
    transformStyle: 'preserve-3d',
    rotationY: 10,
    scaleX: 2,
  })

  const rotateTL = gsap.timeline({ paused: true })

  rotateTL.to(
    '.play-circle-01',
    0.7,
    {
      opacity: 0.1,
      rotation: '+=360',
      strokeDasharray: '456 456',
      ease: 'power1.inOut',
    },
    0,
  )
  rotateTL.to(
    '.play-circle-02',
    0.7,
    {
      opacity: 0.1,
      rotation: '-=360',
      strokeDasharray: '411 411',
      ease: 'power1.inOut',
    },
    0,
  )

  const openTL = gsap.timeline({ paused: true })

  openTL.to(
    '.play-backdrop',
    1,
    {
      opacity: 0.95,
      visibility: 'visible',
      ease: 'power2.inOut',
    },
    0,
  )
  openTL.to(
    '.play-close',
    1,
    {
      opacity: 1,
      ease: 'power2.inOut',
    },
    0,
  )
  openTL.to(
    '.play-perspective',
    1,
    {
      xPercent: 0,
      scale: 1,
      ease: 'power2.inOut',
    },
    0,
  )
  openTL.to(
    '.play-triangle',
    1,
    {
      scaleX: 1,
      ease: 'expoScale(2, 1, power2.inOut)',
    },
    0,
  )
  openTL.to(
    '.play-triangle',
    1,
    {
      rotationY: 0,
      ease: 'expoScale(10, 0.01, power2.inOut)',
    },
    0,
  )
  openTL.to(
    '.play-video',
    1,
    {
      visibility: 'visible',
      opacity: 1,
    },
    0.5,
  )

  const button = document.querySelector('.play-button')
  const backdrop = document.querySelector('.play-backdrop')
  const close = document.querySelector('.play-close')

  button.addEventListener('mouseover', () => rotateTL.play())
  button.addEventListener('mouseleave', () => rotateTL.reverse())
  button.addEventListener('click', () => openTL.play())
  backdrop.addEventListener('click', () => openTL.reverse())
  close.addEventListener('click', (e) => {
    e.stopPropagation()
    openTL.reverse()
  })
})
</script>

<style scoped>
.play-button {
  width: 152px;
  height: 152px;
  position: relative;
  cursor: pointer;
}

.play-backdrop {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #000;
  opacity: 0;
  visibility: hidden;
}

.play-close {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0;
  bottom: calc(100% + 15px);
  border: none;
  outline: none;
  background: none;
  opacity: 0;
  cursor: pointer;
}

.play-close::before,
.play-close::after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: rotate(45deg);
  background-color: #fff;
}

.play-close::after {
  transform: rotate(-45deg);
}

.play-circles {
  display: block;
  width: 100%;
  height: 100%;
}

.play-perspective {
  width: 600px;
  height: 400px;
  position: absolute;
  left: -230px;
  top: -125px;
}

.play-triangle {
  width: 600px;
  height: 400px;
  background-color: #fff;
  cursor: pointer;
}
</style>
