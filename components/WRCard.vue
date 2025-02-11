<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  if (typeof window.CSS.registerProperty === 'function') {
    console.log('CSS.registerProperty supported 🎉')
    document.body.style.setProperty('--supported', 1)
    document.body.classList.add('registerProperty-supported')
  }
  else {
    console.log('CSS.registerProperty not supported ❌')
    document.body.style.setProperty('--not-supported', 1)
    document.body.classList.add('registerProperty-not-supported')
  }
})
</script>

<template>
  <div role="button" class="wr-card overflow-hidden">
    <div class="wr-card-container">
      <slot>
        <span>Hello</span>World
      </slot>
    </div>

    <div class="wr-card-overlay" />
  </div>
</template>

<style lang="scss">
@property --hue {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}
@property --rotate {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}
@property --bg-y {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}
@property --bg-x {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}
@property --glow-translate-y {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}
@property --bg-size {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}
@property --glow-opacity {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}
@property --glow-blur {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}
@property --glow-scale {
  syntax: '<number>';
  inherits: true;
  initial-value: 2;
}

@property --glow-radius {
  syntax: '<number>';
  inherits: true;
  initial-value: 2;
}

@property --white-shadow {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}

:root {
  // Pen vars
  --card-color: var(--va-c-bg);
  // --text-color: hsl(260deg 10% 55%);
  --text-color: #4b4b4b;
  --card-width: 35vw;
  --border-width: 3px;
  --bg-size: 1;

  --hue: 0;
  --hue-speed: 1;

  --rotate: 0;
  --animation-speed: 4s;

  --interaction-speed: 0.55s;
  --glow-scale: 1.5;
  --scale-factor: 1;
  --glow-blur: 6; // 6
  --glow-opacity: 1; // 0.6
  --glow-radius: 100; // 100
  --glow-rotate-unit: 1deg;
}

.wr-card {
  position: relative;
  z-index: 2;
  border-radius: var(--card-radius);
  cursor: pointer;

  &:hover {
    > .wr-card-container {
      --text-color: aliceblue;
    }

    > .wr-card-overlay {
      background: transparent;
      mix-blend-mode: darken;
      --text-color: white;
      box-shadow: 0 0 calc(var(--white-shadow) * 1vw) calc(var(--white-shadow) * 0.15vw) rgb(255 255 255 / 20%);
      animation: shadow-pulse calc(var(--animation-speed) * 2) linear infinite;
      opacity: 0.5;

      &:before {
        --bg-size: 15;
        animation-play-state: paused;
        transition: --bg-size var(--interaction-speed) ease;
      }
    }
  }

  > .wr-card-container {
    font-weight: 800;
    font-stretch: 150%;
    font-size: 18px;
    font-size: clamp(1.5vw, 1.5vmin, 32px);
    color: var(--text-color);
    transition: color 0.3s ease;
    padding: 2rem;

    span {
      color: aliceblue;
      display: inline-block;
      padding: 0.25em;
      border-radius: 4px;
      background: var(--text-color);
      --text-color: black;
      margin-right: 8px;
      font-weight: 900;
    }
  }

  > .wr-card-overlay {
    position: absolute;
    z-index: -1;
    inset: 2px;
    background: var(--card-color);
    border-radius: calc(calc(var(--card-radius) * 0.9));

    &:before {
      content: '';
      display: block;
      position: absolute;
      inset: -1px;
      border-radius: calc(calc(var(--card-radius) * 0.9));
      box-shadow: 0 0 20px black;
      mix-blend-mode: color-burn;
      background: hsl(0deg 0% 16%)
        radial-gradient(
          30% 30% at calc(var(--bg-x) * 1%) calc(var(--bg-y) * 1%),
          hsl(calc(calc(var(--hue) * var(--hue-speed)) * 1deg) 100% 90%) calc(0% * var(--bg-size)),
          hsl(calc(calc(var(--hue) * var(--hue-speed)) * 1deg) 100% 80%) calc(20% * var(--bg-size)),
          hsl(calc(calc(var(--hue) * var(--hue-speed)) * 1deg) 100% 60%) calc(40% * var(--bg-size)),
          transparent 100%
        );
      animation:
        hue-animation var(--animation-speed) linear infinite,
        rotate-bg var(--animation-speed) linear infinite;
      transition: --bg-size var(--interaction-speed) ease;
    }
  }
}

@keyframes shadow-pulse {
  0%,
  24%,
  46%,
  73%,
  96% {
    --white-shadow: 0.5;
  }
  12%,
  28%,
  41%,
  63%,
  75%,
  82%,
  98% {
    --white-shadow: 2.5;
  }
  6%,
  32%,
  57% {
    --white-shadow: 1.3;
  }
  18%,
  52%,
  88% {
    --white-shadow: 3.5;
  }
}

@keyframes rotate-bg {
  0% {
    --bg-x: 0;
    --bg-y: 0;
  }

  25% {
    --bg-x: 100;
    --bg-y: 0;
  }

  50% {
    --bg-x: 100;
    --bg-y: 100;
  }

  75% {
    --bg-x: 0;
    --bg-y: 100;
  }

  100% {
    --bg-x: 0;
    --bg-y: 0;
  }
}
@keyframes rotate {
  from {
    --rotate: -70;
    --glow-translate-y: -65;
  }

  25% {
    --glow-translate-y: -65;
  }

  50% {
    --glow-translate-y: -65;
  }

  60%,
  75% {
    --glow-translate-y: -65;
  }

  85% {
    --glow-translate-y: -65;
  }

  to {
    --rotate: calc(360 - 70);
    --glow-translate-y: -65;
  }
}
@keyframes hue-animation {
  0% {
    --hue: 0;
  }
  100% {
    --hue: 360;
  }
}
</style>
