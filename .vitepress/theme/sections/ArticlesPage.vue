<script setup lang="ts">
import { data as articles, type ArticleSummary } from '../data/articles.data'
import { ref, computed } from 'vue'

// 当前页，每页显示的文章数量，总页数
const currentPage = ref(1)
const pageSize = 5
const totalPages = computed(() => Math.ceil(articles.length / pageSize))

// 计算当前页面应显示的文章
const visibleArticles = computed((): ArticleSummary[] => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize

  return articles.slice(start, end)
})

// 上一页
function previousPage() {
  if (currentPage.value > 1) currentPage.value--
}

// 下一页
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
</script>

<template>
  <div class="site-container">
    <h2 class="mb-5 text-3xl font-bold">文章</h2>
    <div class="text-center">
      <ul v-if="articles.length > 0" class="m-0 list-none p-0">
        <li v-for="article in visibleArticles" :key="article.url">
          <a
            :href="article.url"
            class="grid grid-cols-1 gap-2 py-5 text-left no-underline md:grid-cols-[8rem_1fr] md:gap-8"
          >
            <time :datetime="article.date" class="text-sm text-[var(--color-muted)]">
              {{ article.date }}
            </time>

            <div class="min-w-0">
              <h3 class="m-0 text-xl font-semibold">{{ article.title }}</h3>
              <p class="mb-0 mt-2 leading-relaxed text-[var(--color-muted)]">
                {{ article.description }}
              </p>
            </div>
          </a>
        </li>
      </ul>
      <p v-else class="text-[var(--color-muted)]">文章正在准备中……</p>
      <nav v-if="totalPages > 1" aria-label="文章分页">
        <button
          class="px-6 py-2.5 rounded-xl border-0 shadow-md text-sm transition duration-200 hover:shadow-lg hover:ring-1 hover:ring-green-700"
          type="button"
          @click="previousPage"
        >
          上一页
        </button>
        <span> 第 {{ currentPage }} / {{ totalPages }} 页 </span>
        <button
          class="px-6 py-2.5 rounded-xl border-0 shadow-md text-sm transition duration-200 hover:shadow-lg hover:ring-1 hover:ring-green-700"
          type="button"
          @click="nextPage"
        >
          下一页
        </button>
      </nav>
    </div>
  </div>
</template>
