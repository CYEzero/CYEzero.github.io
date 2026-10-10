<script setup lang="ts">
import { useData } from 'vitepress'
import { homeNavigation, type HomeSectionId } from '../navigation'

const emit = defineEmits<{
  navigate: [sectionId: HomeSectionId]
}>()

function handleNavigate(id: HomeSectionId) {
  emit('navigate', id)
}

defineProps<{
  activeSectionId: HomeSectionId | null
}>()

const { site } = useData()
</script>

<template>
  <header class="site-header">
    <div class="site-container flex flex-wrap items-center justify-between gap-4 py-5">
      <a href="/" class="text-xl font-bold no-underline">
        {{ site.title }}
      </a>

      <nav aria-label="主导航" class="flex items-center gap-6 flex-wrap">
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
