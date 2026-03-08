# @bg-effects/growing-tree

[English](./README.md) | [简体中文](./README_CN.md)

一款精美的 Canvas 2D 背景特效，展示了利用递归分形分支从底部生长的树木。树木伴随着平滑的动画逐步生长，并在完成后随风轻轻摇曳。

[在线演示](https://huangzida.github.io/growing-tree/)

---

### 特性

- 🌱 **渐进式生长** - 通过递归分支生成，树木从树干到树冠逐步生长
- 🎨 **渐变颜色** - 从树干到末端的平滑颜色过渡
- 🍃 **摇曳动画** - 生长完成后，模拟微风的轻微摆动效果
- 🎭 **多种预设** - 春季、夏季、秋季、冬季、樱花、抽象等主题
- ⚙️ **高度可配置** - 控制对称性、分支角度、递归深度等
- 🌲 **多树支持** - 支持 1-5 棵树，具备同步或顺序生长模式

### 安装

```bash
pnpm add @bg-effects/growing-tree
```

### 基本用法

```vue
<script setup>
import { GrowingTree } from '@bg-effects/growing-tree'
</script>

<template>
  <GrowingTree class="w-full h-screen" />
</template>
```

### 属性 (Props)

#### 基本配置

| 属性名 | 类型 | 默认值 | 说明 |
|------|------|---------|-------------|
| `treeCount` | `number` | `1` | 树木数量 (1-5) |
| `growthSpeed` | `number` | `1.5` | 生长动画速度 (0.5-3.0) |
| `trunkWidth` | `number` | `8` | 树干宽度 (像素) (3-15) |
| `color1` | `string` | `'#8B4513'` | 树干颜色 (棕色) |
| `color2` | `string` | `'#90EE90'` | 树梢颜色 (浅绿色) |

#### 形状配置

| 属性名 | 类型 | 默认值 | 说明 |
|------|------|---------|-------------|
| `branchAngle` | `number` | `30` | 分支角度 (度) (15-60) |
| `lengthDecay` | `number` | `0.7` | 每一级长度缩减系数 (0.5-0.9) |
| `maxDepth` | `number` | `9` | 最大递归深度 (5-12) |
| `symmetry` | `number` | `0.7` | 对称程度 (0=完全随机, 1=完全对称) |
| `branchProbability` | `number` | `0.85` | 分支概率 (0.5-1.0) |

#### 动画配置

| 属性名 | 类型 | 默认值 | 说明 |
|------|------|---------|-------------|
| `swayStrength` | `number` | `0.3` | 摆动幅度 (0-1) |
| `swaySpeed` | `number` | `1.0` | 摆动速度倍率 (0.5-2) |
| `growthMode` | `'sync' \| 'sequence'` | `'sync'` | 多树生长模式 |

#### 标准属性

| 属性名 | 类型 | 默认值 | 说明 |
|------|------|---------|-------------|
| `className` | `string` | `''` | 额外的 CSS 类名 |
| `debug` | `boolean` | `false` | 开启调试面板 |
| `lang` | `'zh-CN' \| 'en'` | `'zh-CN'` | 调试面板语言 |
| `quality` | `number` | `1.0` | 渲染质量 (0.5-2.0) |

### 预设示例

```vue
<template>
  <!-- 春季主题 -->
  <GrowingTree
    color1="#6B4423"
    color2="#90EE90"
    :branch-angle="35"
    :length-decay="0.72"
    :max-depth="9"
  />

  <!-- 樱花主题 -->
  <GrowingTree
    color1="#4A2511"
    color2="#FFB6C1"
    :tree-count="2"
    :max-depth="10"
  />

  <!-- 抽象主题 -->
  <GrowingTree
    color1="#FF00FF"
    color2="#00FFFF"
    :symmetry="1.0"
    :branch-probability="1.0"
  />
</template>
```

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 许可

MIT
