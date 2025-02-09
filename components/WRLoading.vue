<template>
  <div class="wr-loading" flex="~ center">
    <div class="loading-container">
      <div class="cube">
        <div class="sides">
          <div class="top" />
          <div class="right" />
          <div class="bottom" />
          <div class="left" />
          <div class="front" />
          <div class="back" />
        </div>
      </div>
      <div class="loading-text">
        <span data-text="W">W</span>
        <span data-text="E">E</span>
        <span data-text="L">L</span>
        <span data-text="C">C</span>
        <span data-text="O">O</span>
        <span data-text="M">M</span>
        <span data-text="E">E</span>
        <span data-text="&ensp;"> &ensp; </span>
        <span data-text="T">T</span>
        <span data-text="O">O</span>
        <span data-text="&ensp;"> &ensp; </span>
        <span data-text="W">W</span>
        <span data-text="R">R</span>
        <span data-text="X">X</span>
        <span data-text="I">I</span>
        <span data-text="N">N</span>
        <span data-text="Y">Y</span>
        <span data-text="U">U</span>
        <span data-text="E">E</span>
        <span data-text="'">'</span>
        <span data-text="S">S</span>
        <span data-text="&ensp;"> &ensp; </span>
        <span data-text="H">H</span>
        <span data-text="O">O</span>
        <span data-text="M">M</span>
        <span data-text="E">E</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$size: 120px;

.wr-loading {
  position: fixed;
  z-index: 1000;
  inset: 0;
  background: var(--va-c-bg);

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin: 0 auto;
    width: 50%;
  }
}

@keyframes rotate {
  0% {
    transform: rotateX(-37.5deg) rotateY(45deg);
  }
  50% {
    transform: rotateX(-37.5deg) rotateY(405deg);
  }
  100% {
    transform: rotateX(-37.5deg) rotateY(405deg);
  }
}

.cube,
.cube * {
  position: absolute;
  width: $size + 1;
  height: $size + 1;
}

.sides {
  animation: rotate 3s ease infinite;
  animation-delay: 0.5s;
  transform-style: preserve-3d;
  transform: rotateX(-37.5deg) rotateY(45deg);
}

.cube .sides * {
  box-sizing: border-box;
  background-color: rgba(var(--va-c-primary-rgb), 0.6);
  border: $size / 30 solid white;
}

@mixin side($name, $rotate, $i) {
  .#{$name} {
    animation: #{$name}-animation 3s ease infinite;
    animation-delay: $i * 500ms;
    transform: #{$rotate} translateZ($size);
    animation-fill-mode: forwards;
    transform-origin: 50% 50%;
  }
  @keyframes #{$name}-animation {
    0% {
      opacity: 1;
      transform: #{$rotate} translateZ($size);
    }
    20% {
      opacity: 1;
      transform: #{$rotate} translateZ($size / 2);
    }
    70% {
      opacity: 1;
      transform: #{$rotate} translateZ($size / 2);
    }
    90% {
      opacity: 1;
      transform: #{$rotate} translateZ($size);
    }
    100% {
      opacity: 1;
      transform: #{$rotate} translateZ($size);
    }
  }
}

.cube .sides {
  @include side('top', rotateX(90deg), 0.8);
  @include side('bottom', rotateX(-90deg), 0.8);
  @include side('front', rotateY(0deg), 0);
  @include side('back', rotateY(-180deg), 0.2);
  @include side('left', rotateY(-90deg), 0.4);
  @include side('right', rotateY(90deg), 0.6);
}

.loading-text {
  margin-top: $size * 3;
  font-size: 1.5rem;
  font-weight: 800;
  font-weight: 600;
  text-align: center;

  span {
    display: inline-block;
    margin: 0 -0.05em;
    position: relative;
    color: rgba(#000, 0.2);
    animation: loading-parent 6s infinite;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: attr(data-text);
      color: #fff;
      opacity: 0;
      animation: loading-child 3s infinite;
    }
    @for $i from 1 through 26 {
      &:nth-of-type(#{$i})::after {
        animation-delay: #{$i * 0.05}s;
      }
    }
  }
}

@keyframes loading-parent {
  0%,
  35%,
  100% {
    color: rgba(#000, 0.2);
  }
  60%,
  80% {
    color: #fff;
  }
}

@keyframes loading-child {
  0% {
    opacity: 1;
  }
  25%,
  100% {
    opacity: 0;
  }
}
</style>
