<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { Slider, ColorPicker, ButtonGroup, Toggle, SubTabs } from '@bg-effects/shared'
import zhCN from '../locales/zh-CN.json'
import en from '../locales/en.json'
import type { GrowingTreeProps } from '../types'

const props = defineProps<{
  lang: 'zh-CN' | 'en'
}>()

const config = defineModel<GrowingTreeProps>('config', { required: true })

// Ensure new properties exist (migration for old configs)
watchEffect(() => {
  if (config.value) {
    if (config.value.treeHeight === undefined) config.value.treeHeight = 120
    if (config.value.rainbow === undefined) config.value.rainbow = false
    if (config.value.curvature === undefined) config.value.curvature = 0
    if (config.value.growthStagger === undefined) config.value.growthStagger = 0.5
  }
})

const activeTab = ref<'basic' | 'shape' | 'animation'>('basic')

const t = computed(() => (props.lang === 'zh-CN' ? zhCN : en))

const tabs = computed(() => [
  { id: 'basic' as const, label: t.value.tabs.basic },
  { id: 'shape' as const, label: t.value.tabs.shape },
  { id: 'animation' as const, label: t.value.tabs.animation }
])

const growthModeOptions = computed(() => [
  { value: 'sync', label: t.value.growthMode.sync },
  { value: 'sequence', label: t.value.growthMode.sequence }
])

const symmetryHint = computed(() => {
  if (config.value.symmetry === 1) return t.value.hints.symmetryFull
  if (config.value.symmetry === 0) return t.value.hints.symmetryRandom
  return ''
})

// Expose activeTab for randomization
defineExpose({
  activeTab
})
</script>

<template>
  <div class="flex flex-col gap-4 text-white/90">
    <SubTabs v-model="activeTab" :tabs="tabs" />
    
    <div class="flex flex-col gap-4 p-1 pointer-events-auto overflow-y-auto max-h-[400px] custom-scrollbar pr-2">
      <div v-show="activeTab === 'basic'" class="flex flex-col gap-6">
        <Slider
          v-model="config.treeCount"
          :label="t.labels.treeCount"
          :min="1"
          :max="5"
          :step="1"
        />
        <Slider
          v-model="config.growthSpeed"
          :label="t.labels.growthSpeed"
          :min="0.5"
          :max="3"
          :step="0.1"
        />
        <Slider
          v-model="config.trunkWidth"
          :label="t.labels.trunkWidth"
          :min="3"
          :max="15"
          :step="1"
        />
        <Slider
          v-model="config.treeHeight"
          :label="t.labels.treeHeight"
          :min="50"
          :max="300"
          :step="10"
        />
        <Toggle
          v-model="config.rainbow"
          :label="t.labels.rainbow"
        />
        <ColorPicker
          v-model="config.color1"
          :label="t.labels.color1"
        />
        <ColorPicker
          v-model="config.color2"
          :label="t.labels.color2"
        />
      </div>

      <div v-show="activeTab === 'shape'" class="flex flex-col gap-6">
        <Slider
          v-model="config.branchAngle"
          :label="t.labels.branchAngle"
          :min="15"
          :max="60"
          :step="1"
          suffix="°"
        />
        <Slider
          v-model="config.curvature"
          :label="t.labels.curvature"
          :min="0"
          :max="30"
          :step="1"
        />
        <Slider
          v-model="config.lengthDecay"
          :label="t.labels.lengthDecay"
          :min="0.5"
          :max="0.9"
          :step="0.05"
        />
        <Slider
          v-model="config.maxDepth"
          :label="t.labels.maxDepth"
          :min="5"
          :max="12"
          :step="1"
        />
        <Slider
            v-model="config.symmetry"
            :label="t.labels.symmetry"
            :min="0"
            :max="1"
            :step="0.1"
            :hint="symmetryHint"
        />
        <Slider
          v-model="config.branchProbability"
          :label="t.labels.branchProbability"
          :min="0.5"
          :max="1"
          :step="0.05"
        />
      </div>

      <div v-show="activeTab === 'animation'" class="flex flex-col gap-6">
        <Slider
          v-model="config.swayStrength"
          :label="t.labels.swayStrength"
          :min="0"
          :max="1"
          :step="0.1"
        />
        <Slider
          v-model="config.swaySpeed"
          :label="t.labels.swaySpeed"
          :min="0.5"
          :max="2"
          :step="0.1"
        />
        <Slider
          v-model="config.growthStagger"
          :label="t.labels.growthStagger ?? 'Growth Stagger'"
          :min="0"
          :max="1"
          :step="0.05"
        />
        <ButtonGroup
          v-model="config.growthMode"
          :label="t.labels.growthMode"
          :options="growthModeOptions"
          layout="horizontal"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
