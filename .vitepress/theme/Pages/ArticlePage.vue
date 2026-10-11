<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <article class="site-container max-w-3xl py-12">
    <a href="/" class="text-sm hover:underline"> ← 返回首页 </a>
    <header class="mb-10 mt-8">
      <h1 class="m-0 text-3xl font-bold md:text-4xl">{{ frontmatter.title }}</h1>
      <time :datetime="frontmatter.date" class="mt-4 block text-sm text-[var(--color-muted)]">{{
        frontmatter.date
      }}</time>
      <p class="mb-0 mt-4 leading-relaxed text-[var(--color-muted)]">
        {{ frontmatter.description }}
      </p>
    </header>
    <div class="article_content prose prose-stone max-w-none"><Content /></div>
  </article>
</template>
