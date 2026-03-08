# @bg-effects/fireworks

[English](./README.md) | [简体中文](./README_CN.md)

A high-performance fireworks background effect built with OGL and Vue.

[Live Demo](https://huangzida.github.io/fireworks/)

---

### Features

- 🚀 **High Performance**: Built with OGL (a lightweight WebGL library) for smooth rendering.
- 🎨 **Highly Customizable**: Multiple shapes (heart, star, butterfly, etc.), launch modes, and color options.
- 🛠️ **Debug Mode**: Built-in visual debug panel for real-time adjustments.
- 📦 **Ready to Use**: Easy-to-use Vue component with simple configuration.

### Installation

```bash
pnpm add @bg-effects/fireworks ogl
```

> **Note**: `ogl` is a peer dependency and needs to be installed manually.

### Usage

```vue
<script setup>
import { Fireworks } from '@bg-effects/fireworks'
</script>

<template>
  <div style="width: 100vw; height: 100vh; background: #000;">
    <Fireworks 
      :firework-count="50"
      shape="heart"
      color-mode="multi"
    />
  </div>
</template>
```

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `firework-count` | `number` | `30` | Number of fireworks |
| `speed` | `number` | `1.0` | Animation speed |
| `size` | `number` | `2.0` | Particle size |
| `shape` | `string` | `'normal'` | Firework shape (see below) |
| `launch-mode` | `string` | `'random'` | Launch mode (see below) |
| `color-mode` | `string` | `'multi'` | Color mode (`'single'` or `'multi'`) |
| `color` | `string` | `'#ff0000'` | Color when color mode is `'single'` |
| `debug` | `boolean` | `false` | Enable debug panel |
| `lang` | `'zh-CN' \| 'en'` | `'zh-CN'` | UI language |

#### Supported Shapes (`shape`)
`normal`, `circular`, `heart`, `star`, `butterfly`, `spiral`, `ring`, `doubleRing`, `atom`, `trefoil`, `clover`, `cross`, `saturn`, `hexagram`, `astroid`, `gear`, `fermat`, `folium`, `random`

#### Launch Modes (`launchMode`)
`random`, `burst`, `wave`, `tide`, `simultaneous`, `pendulum`

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### License

MIT
