<script setup lang="ts">
import { projects, services, skills } from '../constants/index'
</script>

<template>
  <div>
    <main class="container">
      <section class="about">
        <ThemeSectionTitle text="abo" hl-text="ut" />
        <p class="text-xl theme-text flex justify-center">
          Software Engineer, be good at Java and C#, also love developing games and visual computing
        </p>
      </section>

      <section class="skills">
        <div class="content">
          <ThemeSectionTitle text="Tech" hl-text="Stack" />

          <SkillsList :skills="skills" />
        </div>
      </section>

      <section class="work mt-150px">
        <div class="content">
          <ThemeSectionTitle text="portfo" hl-text="lio" />
        </div>

        <WorkGallery :projects="projects" />
      </section>

      <section class="service">
        <div class="content">
          <ThemeSectionTitle text="servic" hl-text="es" />

          <ServicesOverview :services="services" />
        </div>
      </section>
    </main>

    <MyFooter text="a coding enthusiast" />
  </div>
</template>
