<script setup lang="ts">
import { useFrontmatter } from 'valaxy'
import { useI18n } from 'vue-i18n'

const fm = useFrontmatter()

const { t } = useI18n()
</script>

<template>
  <div>
    <main class="container">
      <section class="about">
        <ThemeSectionTitle text="abo" hl-text="ut" />
        <WRIntroText />
        <WRIntroText>
          <p class="theme-text about-me text-center">
            "{{ t('home.about') }}"
          </p>
        </WRIntroText>
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

        <WRServicesOverview :services="fm.services" />
      </section>
    </main>

    <WRHeroFooter text="a coding enthusiast" />
  </div>
</template>

<style lang="scss" scoped>
section {
  padding-top: 150px;
  padding-bottom: 50px;
}

.content {
  width: 100%;
  padding: 0 70px;
}
</style>
