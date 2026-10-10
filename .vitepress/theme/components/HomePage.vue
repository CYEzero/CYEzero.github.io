<script setup lang="ts">
import { useData } from 'vitepress'

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
      <div class="site-container text-center">
        <h2>个人介绍</h2>
        <p>这里稍后填写个人介绍。</p>
      </div>
    </section>

    <section id="skills" class="home-section">
      <div class="site-container text-center">
        <h2>技能</h2>
        <p>这里稍后展示技能。</p>
      </div>
    </section>

    <section id="articles" class="home-section">
      <div class="site-container text-center">
        <h2>文章</h2>
        <p>这里稍后展示最新文章摘要。</p>
      </div>
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
