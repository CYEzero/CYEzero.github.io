<script setup lang="ts">
import { useData } from 'vitepress'
import { homeNavigation, type HomeSectionId } from '../data/navigation'

// 组件挂载时，更新当前活动部分的 ID。
const emit = defineEmits<{
  navigate: [sectionId: HomeSectionId]
}>()

// 函数 => 点击导航到指定部分。
function handleNavigate(id: HomeSectionId) {
  emit('navigate', id)
}

// 获取站点数据，用于显示站点标题。
defineProps<{
  activeSectionId: HomeSectionId | null
}>()

const { site, frontmatter } = useData()
</script>

<template>
  <header class="site-header">
    <div class="site-container flex flex-wrap items-center justify-between gap-4 py-5">
      <a href="/" class="text-xl font-bold no-underline">
        {{ site.title }}
      </a>

      <nav aria-label="主导航" class="flex items-center gap-6 flex-wrap">
        <template v-if="frontmatter.home === true">
          <button
            v-for="item in homeNavigation"
            :key="item.id"
            :class="{ 'is-active': item.id === activeSectionId }"
            :aria-current="item.id === activeSectionId ? 'location' : undefined"
            type="button"
            class="nav-item no-underline hover:underline underline-offset-4"
            @click="handleNavigate(item.id)"
          >
            {{ item.label }}
          </button>
        </template>
        <a v-else href="/" class="no-underline hover:underline underline-offset-4"> ← 返回首页 </a>

        <a
          href="https://github.com/CYEzero"
          target="_blank"
          rel="noopener noreferrer"
          class="no-underline hover:underline underline-offset-4"
        >
          GitHub ↗
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-background);
}

button {
  font: inherit;
  color: inherit;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}

.nav-item.is-active {
  color: var(--color-accent);
  text-decoration: underline;
}
</style>
