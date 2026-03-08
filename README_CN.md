# @bg-effects/fireworks

[English](./README.md) | [简体中文](./README_CN.md)

基于 OGL 和 Vue 构建的高性能烟花背景特效。

[在线演示](https://huangzida.github.io/fireworks/)

---

### 特性

- 🚀 **高性能**: 基于 OGL (轻量级 WebGL 库) 构建，运行流畅。
- 🎨 **高度可定制**: 提供多种形状（心形、星形、蝴蝶等）、发射模式和颜色选项。
- 🛠️ **调试模式**: 内置可视化调试面板，方便实时调整效果。
- 📦 **开箱即用**: 作为 Vue 组件，简单配置即可使用。

### 安装

```bash
pnpm add @bg-effects/fireworks ogl
```

> **注意**: `ogl` 是 peer dependency，需要手动安装。

### 使用

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

### 属性 (Props)

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `firework-count` | `number` | `30` | 烟花数量 |
| `speed` | `number` | `1.0` | 动画速度 |
| `size` | `number` | `2.0` | 烟花粒子大小 |
| `shape` | `string` | `'normal'` | 烟花形状（见下文） |
| `launch-mode` | `string` | `'random'` | 发射模式（见下文） |
| `color-mode` | `string` | `'multi'` | 颜色模式 (`'single'` 或 `'multi'`) |
| `color` | `string` | `'#ff0000'` | 当颜色模式为 `'single'` 时的颜色 |
| `debug` | `boolean` | `false` | 是否开启调试面板 |
| `lang` | `'zh-CN' \| 'en'` | `'zh-CN'` | 界面语言 |

#### 支持的形状 (`shape`)
`normal`, `circular`, `heart`, `star`, `butterfly`, `spiral`, `ring`, `doubleRing`, `atom`, `trefoil`, `clover`, `cross`, `saturn`, `hexagram`, `astroid`, `gear`, `fermat`, `folium`, `random`

#### 发射模式 (`launchMode`)
`random`, `burst`, `wave`, `tide`, `simultaneous`, `pendulum`

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发环境
pnpm dev
```

### 许可

MIT
