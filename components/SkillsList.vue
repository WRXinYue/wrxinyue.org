<script setup lang="ts">
defineProps<{
  skills: any
}>()
</script>

<template>
  <div class="skills-container">
    <WRCard v-for="skill in skills" :key="skill.id" class="card">
      <div lang="en">
        <span v-if="skill.subtitle" class="subtitle">
          {{ skill.subtitle }}
        </span>
        <p class="skills__introduce mt-6 font-size-5 color-white">
          {{ skill.title }}
        </p>

        <p class="skills__description font-size-4">
          {{ skill.description }}
        </p>
      </div>

      <div lang="zh-CN">
        <span v-if="skill.subtitle_zh" class="subtitle">
          {{ skill.subtitle_zh }}
        </span>
        <p class="skills__introduce mt-6 font-size-5 color-white">
          {{ skill.title_zh }}
        </p>
        <p class="skills__description font-size-4">
          {{ skill.description_zh }}
        </p>
      </div>
    </WRCard>
  </div>
</template>

<style lang="scss" scoped>
@use 'valaxy/client/styles/mixins/index.scss' as *;
.skills-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  width: 100%;
  height: auto;
  min-height: 30vh;
  margin-bottom: 0.5em;

  .card {
    width: calc(33.33% - 27px);
    // padding: 20px;
    // position: relative;

    @include mobile {
      width: 100%;
    }

    @include tablet {
      width: calc(50% - 27px);
    }

    .subtitle {
      font-size: 14px;
      margin: 0;
      position: absolute;
      left: 1em;
      top: 1em;
      opacity: 0.5;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 3px;
    }
  }

  .num {
    display: inline-block;
    font-size: 60px;
    color: transparent;
    -webkit-text-stroke: 1px var(--pr-color);
  }
}
</style>
