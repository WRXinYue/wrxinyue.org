<script setup lang="ts">
defineProps<{
  skills: any
}>()
</script>

<template>
  <div class="skills-container">
    <div v-for="skill in skills" :key="skill.id" class="card">
      <div lang="en">
        <span class="subtitle">
          {{ skill.subtitle }}
        </span>
        <p class="skills__introduce color-white font-size-5 mt-6">
          {{ skill.title }}
        </p>

        <p class="skills__description color-[#4b4b4b] font-size-4">
          {{ skill.description }}
        </p>
      </div>

      <div lang="zh-CN">
        <span class="subtitle">
          {{ skill.subtitle_zh }}
        </span>
        <p class="skills__introduce color-white font-size-5 mt-6">
          {{ skill.title_zh }}
        </p>
        <p class="skills__description color-[#4b4b4b] font-size-4">
          {{ skill.description_zh }}
        </p>
      </div>
    </div>
  </div>
</template>
