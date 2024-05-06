<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useFrontmatter } from 'valaxy'

const fm = useFrontmatter()

const { t } = useI18n()
</script>

<template>
  <div>
    <main class="container">
      <section class="about">
        <ThemeSectionTitle text="abo" hl-text="ut" />
        <p class="text-xl text-center theme-text about-me">
          {{ t('home.about') }}
        </p>
      </section>

      <section class="skills">
        <ThemeSectionTitle text="Tech" hl-text="Stack" />

        <SkillsList :skills="fm.skills" />
      </section>

      <section class="work">
        <ThemeSectionTitle text="portfo" hl-text="lio" />

        <WorkGallery :projects="fm.projects" />
      </section>

      <section class="service">
        <ThemeSectionTitle text="servic" hl-text="es" />

        <ServicesOverview :services="fm.services" />
      </section>
    </main>

    <MyFooter text="a coding enthusiast" />
  </div>
</template>
