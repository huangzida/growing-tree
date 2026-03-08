export interface GrowingTreeProps {
  // Standard
  className?: string
  debug?: boolean
  lang?: 'zh-CN' | 'en'
  
  // Tab 1: Basic
  treeCount?: number
  growthSpeed?: number
  trunkWidth?: number
  color1?: string
  color2?: string
  rainbow?: boolean
  
  // Tab 2: Shape
  treeHeight?: number
  branchAngle?: number
  curvature?: number // New: 弯曲度
  lengthDecay?: number
  maxDepth?: number
  symmetry?: number
  branchProbability?: number
  
  // Tab 3: Animation
  swayStrength?: number
  swaySpeed?: number
  growthMode?: 'sync' | 'sequence'
  growthStagger?: number // New: Timing function control (0=all at once, 1=one by one)
  
  // Performance
  quality?: number
}

export interface GrowingTreeEngineConfig {
  width: number
  height: number
  dpr: number
  treeCount: number
  growthSpeed: number
  trunkWidth: number
  color1: string
  color2: string
  rainbow: boolean
  treeHeight: number
  branchAngle: number
  curvature: number
  lengthDecay: number
  maxDepth: number
  symmetry: number
  branchProbability: number
  swayStrength: number
  swaySpeed: number
  growthMode: 'sync' | 'sequence'
  growthStagger?: number
}

export interface BranchData {
  startX: number
  startY: number
  endX: number
  endY: number
  angle: number
  length: number
  thickness: number
  depth: number
  curveOffset: number // New: 存储随机弯曲方向
  children: BranchData[]
}
