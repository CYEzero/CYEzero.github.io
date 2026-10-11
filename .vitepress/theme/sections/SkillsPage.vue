<script setup lang="ts">
import { skills, type SkillsId } from '../data/skills'
import { ref, computed } from 'vue'

// 找到第一个技能的 ID，如果没有技能则为 null
const activeSkillId = ref<SkillsId | null>(skills[0]?.id ?? null)

// 根据 activeSkillId 计算出当前选中的技能对象，如果没有找到则为 null
const activeSkill = computed(() => skills.find((skill) => skill.id === activeSkillId.value) ?? null)

// 函数 => 用于选择技能，更新 activeSkillId
function selectSkill(id: SkillsId) {
  activeSkillId.value = id
}
</script>

<template>
  <div class="site-container">
    <h2 class="mb-5 text-3xl font-bold">我会什么</h2>
    <div class="grid grid-cols-1 items-center gap-y-8 md:grid-cols-2">
      <div class="grid grid-cols-2 gap-4 md:pr-8">
        <button
          v-for="skill in skills"
          :key="skill.id"
          :class="{ 'ring-2 ring-green-700': skill.id === activeSkillId }"
          :aria-pressed="skill.id === activeSkillId"
          type="button"
          class="w-full min-h-32 rounded-xl border-0 bg-white p-6 text-2xl shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          @mouseenter="selectSkill(skill.id)"
          @focus="selectSkill(skill.id)"
          @click="selectSkill(skill.id)"
        >
          {{ skill.label }}
        </button>
      </div>

      <div v-if="activeSkill" class="min-h-72 min-w-0 text-left">
        <h3 class="m-0 text-3xl font-bold">
          {{ activeSkill.label }}
        </h3>

        <ul class="mt-6 flex list-none flex-wrap gap-2 p-0">
          <li
            v-for="technology in activeSkill.technologies ?? []"
            :key="technology"
            class="rounded-md bg-white px-3 py-1 text-sm"
          >
            {{ technology }}
          </li>
        </ul>

        <p class="mt-6 leading-relaxed">
          {{ activeSkill.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
