<script setup lang="ts">
import { useData } from 'vitepress'
import About from '../sections/AboutPage.vue'
import Skills from '../sections/SkillsPage.vue'
import Articles from '../sections/ArticlesPage.vue'

const { site } = useData()
</script>

<template>
  <div class="home-page">
    <section id="home" class="home-section">
      <div class="site-container text-center">
        <h1 class="m-0 text-5xl font-bold">{{ site.title }}</h1>
        <p>青山万里，会者定离，大胆走自己的路吧！</p>
      </div>
    </section>

    <section id="about" class="home-section">
      <About />
    </section>

    <section id="skills" class="home-section">
      <Skills />
    </section>

    <section id="articles" class="home-section">
      <Articles />
    </section>
  </div>
</template>

<style scoped>
.home-page {
  height: 100%;
}

.home-section {
  min-height: 100%;
  padding-block: 3rem;
  display: flex;
  align-items: center;
}
</style>
