<script setup lang="ts">
defineProps<{
  skills: any
}>()
</script>

<template>
  <ul class="skills__list">
    <li v-for="skill in skills" :key="skill.id" class="skills__item">
      <span class="skills__num" :data-speed="skill.speed">{{ skill.id }}</span>
      <p class="color-white font-size-5">
        {{ skill.introduce }}
      </p>
      <p class="color-[#4b4b4b] font-size-4">
        {{ skill.description }}
      </p>
    </li>
  </ul>
</template>
