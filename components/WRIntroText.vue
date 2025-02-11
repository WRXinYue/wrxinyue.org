<template>
  <section class="sec-p">
    <p>
      <slot />
    </p>
  </section>
</template>

<style lang="scss" scoped>
.sec-p {
  padding: 0;

  max-width: clamp(500px, 90%, 720px);
  margin: 0 auto;
  line-height: 1.1;
  font-family: 'Epilogue', sans-serif;
  font-size: clamp(20px, 4.4vw, 50px);
  text-align: center;
  user-select: none;
}
</style>
