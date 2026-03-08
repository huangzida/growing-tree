# @bg-effects/growing-tree

[English](./README.md) | [简体中文](./README_CN.md)

A beautiful Canvas 2D background effect featuring trees that grow from the bottom using recursive fractal branches. Trees progressively grow with smooth animations and sway gently in the wind after completion.

[Live Demo](https://huangzida.github.io/growing-tree/)

---

### Features

- 🌱 **Progressive Growth** - Trees grow from trunk to canopy with recursive branch generation
- 🎨 **Gradient Colors** - Smooth color transition from trunk to tips
- 🍃 **Sway Animation** - Gentle wind-like motion after growth completes
- 🎭 **Multiple Presets** - Spring, Summer, Autumn, Winter, Sakura, Abstract themes
- ⚙️ **Highly Configurable** - Control symmetry, branch angles, recursion depth, and more
- 🌲 **Multi-Tree Support** - Display 1-5 trees with sync or sequence growth modes

### Installation

```bash
pnpm add @bg-effects/growing-tree
```

### Basic Usage

```vue
<script setup>
import { GrowingTree } from '@bg-effects/growing-tree'
</script>

<template>
  <GrowingTree class="w-full h-screen" />
</template>
```

### Props

#### Basic Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `treeCount` | `number` | `1` | Number of trees (1-5) |
| `growthSpeed` | `number` | `1.5` | Growth animation speed (0.5-3.0) |
| `trunkWidth` | `number` | `8` | Trunk thickness in pixels (3-15) |
| `color1` | `string` | `'#8B4513'` | Trunk color (brown) |
| `color2` | `string` | `'#90EE90'` | Tip color (light green) |

#### Shape Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `branchAngle` | `number` | `30` | Branch angle in degrees (15-60) |
| `lengthDecay` | `number` | `0.7` | Length reduction per level (0.5-0.9) |
| `maxDepth` | `number` | `9` | Maximum recursion depth (5-12) |
| `symmetry` | `number` | `0.7` | Symmetry level (0=random, 1=symmetric) |
| `branchProbability` | `number` | `0.85` | Probability of branching (0.5-1.0) |

#### Animation Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `swayStrength` | `number` | `0.3` | Sway amplitude (0-1) |
| `swaySpeed` | `number` | `1.0` | Sway speed multiplier (0.5-2) |
| `growthMode` | `'sync' \| 'sequence'` | `'sync'` | Multi-tree growth mode |

#### Standard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `debug` | `boolean` | `false` | Enable debug panel |
| `lang` | `'zh-CN' \| 'en'` | `'zh-CN'` | Language for debug panel |
| `quality` | `number` | `1.0` | Render quality (0.5-2.0) |

### Presets

```vue
<template>
  <!-- Spring theme -->
  <GrowingTree
    color1="#6B4423"
    color2="#90EE90"
    :branch-angle="35"
    :length-decay="0.72"
    :max-depth="9"
  />

  <!-- Sakura theme -->
  <GrowingTree
    color1="#4A2511"
    color2="#FFB6C1"
    :tree-count="2"
    :max-depth="10"
  />

  <!-- Abstract theme -->
  <GrowingTree
    color1="#FF00FF"
    color2="#00FFFF"
    :symmetry="1.0"
    :branch-probability="1.0"
  />
</template>
```

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### License

MIT
