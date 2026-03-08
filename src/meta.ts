import { generateRandomPalette, rand } from '@bg-effects/shared'
import type { EffectMeta } from '@bg-effects/core'
import type { GrowingTreeProps } from './types'

export const meta: EffectMeta<GrowingTreeProps> = {
  id: 'growing-tree',
  name: {
    en: 'Growing Tree',
    'zh-CN': '生长树'
  },
  category: 'art',
  version: '0.0.1',

  defaultConfig: {
    debug: false,
    lang: 'zh-CN',
    // Basic
    treeCount: 1,
    growthSpeed: 1.5,
    trunkWidth: 8,
    treeHeight: 120, // Default base height
    color1: '#8B4513',
    color2: '#90EE90',
    rainbow: false,

    // Shape
    branchAngle: 30,
    curvature: 0,
    lengthDecay: 0.7,
    maxDepth: 9,
    symmetry: 0.7,
    branchProbability: 0.85,

    // Animation
    swayStrength: 0.3,
    swaySpeed: 1.0,
    growthMode: 'sync' as const,
    growthStagger: 0.5,

    // Performance
    quality: 1.0
  },

  randomize: (current, tab?) => {
    const result = { ...current }

    if (!tab) {
      // Randomize all
      const colors = generateRandomPalette(2)
      result.treeCount = Math.floor(rand(1, 4))
      result.color1 = colors[0]
      result.color2 = colors[1]
      result.rainbow = Math.random() > 0.8
      result.branchAngle = rand(20, 50)
      result.curvature = rand(0, 20)
      result.lengthDecay = rand(0.6, 0.9)
      result.maxDepth = Math.floor(rand(7, 12))
      result.symmetry = rand(0.3, 0.9)
      result.swayStrength = rand(0.2, 0.7)
      result.growthSpeed = rand(0.8, 2.5)
      return result
    }

    if (tab === 'basic') {
      const colors = generateRandomPalette(2)
      result.treeCount = Math.floor(rand(1, 4))
      result.growthSpeed = rand(0.8, 2.5)
      result.trunkWidth = Math.floor(rand(5, 12))
      result.treeHeight = Math.floor(rand(100, 180))
      result.color1 = colors[0]
      result.color2 = colors[1]
      result.rainbow = Math.random() > 0.8
      return result
    }

    if (tab === 'shape') {
      result.branchAngle = rand(20, 50)
      result.curvature = rand(0, 20)
      result.lengthDecay = rand(0.6, 0.9)
      result.maxDepth = Math.floor(rand(7, 12))
      result.symmetry = rand(0.3, 0.9)
      result.branchProbability = rand(0.7, 1.0)
      return result
    }

    if (tab === 'animation') {
      result.swayStrength = rand(0.1, 0.7)
      result.swaySpeed = rand(0.5, 2.0)
      result.growthMode = Math.random() > 0.5 ? 'sync' : 'sequence'
      return result
    }

    return result
  },

  presets: [
    {
      id: 'growing-tree_spring',
      name: { en: 'Spring', 'zh-CN': '春天' },
      config: {
        color1: '#6B4423',
        color2: '#90EE90',
        rainbow: false,
        branchAngle: 35,
        curvature: 5,
        lengthDecay: 0.72,
        maxDepth: 9,
        symmetry: 0.7,
        swayStrength: 0.4,
        growthSpeed: 1.8,
        treeCount: 1,
        trunkWidth: 8,
        treeHeight: 120,
        branchProbability: 0.85,
        swaySpeed: 1.0,
        growthMode: 'sync' as const,
        quality: 1.0
      }
    },
    {
      id: 'growing-tree_summer',
      name: { en: 'Summer', 'zh-CN': '夏天' },
      config: {
        color1: '#5C4033',
        color2: '#228B22',
        branchAngle: 28,
        lengthDecay: 0.68,
        maxDepth: 11,
        symmetry: 0.6,
        swayStrength: 0.25,
        growthSpeed: 1.5,
        treeCount: 1,
        trunkWidth: 8,
        treeHeight: 120,
        branchProbability: 0.9,
        swaySpeed: 1.0,
        growthMode: 'sync' as const,
        quality: 1.0
      }
    },
    {
      id: 'growing-tree_autumn',
      name: { en: 'Autumn', 'zh-CN': '秋天' },
      config: {
        color1: '#4A2511',
        color2: '#FF8C00',
        rainbow: false,
        branchAngle: 40,
        curvature: 15,
        lengthDecay: 0.75,
        maxDepth: 8,
        symmetry: 0.65,
        swayStrength: 0.5,
        growthSpeed: 1.2,
        treeCount: 1,
        trunkWidth: 8,
        treeHeight: 120,
        branchProbability: 0.8,
        swaySpeed: 1.2,
        growthMode: 'sync' as const,
        quality: 1.0
      }
    },
    {
      id: 'growing-tree_winter',
      name: { en: 'Winter', 'zh-CN': '冬天' },
      config: {
        color1: '#3A3A3A',
        color2: '#CCCCCC',
        rainbow: false,
        branchAngle: 45,
        curvature: 0,
        lengthDecay: 0.8,
        maxDepth: 7,
        symmetry: 0.8,
        branchProbability: 0.75,
        swayStrength: 0.6,
        growthSpeed: 1.0,
        treeCount: 1,
        trunkWidth: 7,
        treeHeight: 120,
        swaySpeed: 1.5,
        growthMode: 'sync' as const,
        quality: 1.0
      }
    },
    {
      id: 'growing-tree_sakura',
      name: { en: 'Sakura', 'zh-CN': '樱花' },
      config: {
        color1: '#4A2511',
        color2: '#FFB6C1',
        rainbow: false,
        branchAngle: 32,
        curvature: 10,
        lengthDecay: 0.7,
        maxDepth: 10,
        symmetry: 0.75,
        swayStrength: 0.35,
        growthSpeed: 1.6,
        treeCount: 2,
        trunkWidth: 7,
        treeHeight: 120,
        branchProbability: 0.85,
        swaySpeed: 0.8,
        growthMode: 'sync' as const,
        quality: 1.0
      }
    },
    {
      id: 'growing-tree_abstract',
      name: { en: 'Abstract', 'zh-CN': '抽象' },
      config: {
        color1: '#FF00FF',
        color2: '#00FFFF',
        rainbow: true,
        branchAngle: 30,
        curvature: 20,
        lengthDecay: 0.65,
        maxDepth: 9,
        symmetry: 1.0,
        branchProbability: 1.0,
        swayStrength: 0.2,
        growthSpeed: 2.0,
        treeCount: 1,
        trunkWidth: 8,
        treeHeight: 120,
        swaySpeed: 1.0,
        growthMode: 'sync' as const,
        quality: 1.0
      }
    }
  ]
}
