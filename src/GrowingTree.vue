<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { DebugShell } from '@bg-effects/debug-ui';
import { GrowingTreeEngine } from './engine';
import { meta } from './meta';
import ConfigPanel from './ui/ConfigPanel.vue';
import type { GrowingTreeProps, GrowingTreeEngineConfig } from './types';
import { defu } from 'defu';

const props = defineProps<GrowingTreeProps>();

// Internal config for debug mode
const config = ref<GrowingTreeProps>(defu(props, meta.defaultConfig) as GrowingTreeProps);
const internalLang = ref<'zh-CN' | 'en'>(config.value.lang);

watch(
  () => props,
  newProps => {
    if (!props.debug) {
      config.value = defu(newProps, meta.defaultConfig) as GrowingTreeProps;
    }
  },
  { deep: true },
);

// Canvas and engine
const canvasRef = ref<HTMLCanvasElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);
let engine: GrowingTreeEngine | null = null;
let animationFrameId: number = 0;

// Config panel ref for randomize
const configPanelRef = ref<any>(null);

const handleRandomize = () => {
  if (meta.randomize) {
    const activeTab = configPanelRef.value?.activeTab;
    const randomized = meta.randomize(config.value, activeTab);
    Object.assign(config.value, randomized);
  }
};

// Effective config (props or debug config)
const effectiveConfig = computed(() => {
  return props.debug ? config.value : props;
});

// Convert props to engine config
const getEngineConfig = (): GrowingTreeEngineConfig => {
  const canvas = canvasRef.value!;
  const container = containerRef.value!;
  const dpr = Math.min(
    window.devicePixelRatio * (effectiveConfig.value.quality ?? 1.0),
    2,
  );

  return {
    width: container.clientWidth,
    height: container.clientHeight,
    dpr,
    treeCount: effectiveConfig.value.treeCount ?? 1,
    growthSpeed: effectiveConfig.value.growthSpeed ?? 1.5,
    trunkWidth: effectiveConfig.value.trunkWidth ?? 8,
    treeHeight: effectiveConfig.value.treeHeight ?? 120,
    color1: effectiveConfig.value.color1 ?? '#8B4513',
    color2: effectiveConfig.value.color2 ?? '#90EE90',
    branchAngle: effectiveConfig.value.branchAngle ?? 30,
    lengthDecay: effectiveConfig.value.lengthDecay ?? 0.7,
    maxDepth: effectiveConfig.value.maxDepth ?? 9,
    symmetry: effectiveConfig.value.symmetry ?? 0.7,
    branchProbability: effectiveConfig.value.branchProbability ?? 0.85,
    swayStrength: effectiveConfig.value.swayStrength ?? 0.3,
    swaySpeed: effectiveConfig.value.swaySpeed ?? 1.0,
    rainbow: effectiveConfig.value.rainbow ?? false,
    curvature: effectiveConfig.value.curvature ?? 0,
    growthMode: effectiveConfig.value.growthMode ?? 'sync',
    growthStagger: effectiveConfig.value.growthStagger ?? 0.5,
  };
};

// Initialize engine
const initEngine = () => {
  if (!canvasRef.value || !containerRef.value) return;

  const engineConfig = getEngineConfig();
  engine = new GrowingTreeEngine(canvasRef.value, engineConfig);
  startAnimation();
};

// Start animation loop
const startAnimation = () => {
  const animate = (time: number) => {
    if (engine) {
      engine.render(time);
    }
    animationFrameId = requestAnimationFrame(animate);
  };
  animationFrameId = requestAnimationFrame(animate);
};

// Stop animation
const stopAnimation = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = 0;
  }
};

// Handle resize
const handleResize = () => {
  if (!engine || !containerRef.value) return;

  const dpr = Math.min(
    window.devicePixelRatio * (effectiveConfig.value.quality ?? 1.0),
    2,
  );
  engine.resize(
    containerRef.value.clientWidth,
    containerRef.value.clientHeight,
    dpr,
  );
};

// Watch config changes
watch(
  effectiveConfig,
  () => {
    if (engine) {
      engine.updateConfig(getEngineConfig());
    }
  },
  { deep: true },
);

// Lifecycle
onMounted(() => {
  initEngine();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  stopAnimation();
  if (engine) {
    engine.destroy();
    engine = null;
  }
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div
    ref="containerRef"
    :class="['relative w-full h-full overflow-hidden', className]"
  >
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" />

    <DebugShell
      v-if="debug"
      v-model:config="config"
      v-model:lang="internalLang"
      :meta="meta"
      @randomize="handleRandomize"
    >
      <template #settings>
        <ConfigPanel
          ref="configPanelRef"
          v-model:config="config"
          :lang="internalLang"
        />
      </template>
    </DebugShell>
  </div>
</template>
