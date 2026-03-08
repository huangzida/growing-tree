import { Tree } from './Tree'
import type { GrowingTreeEngineConfig } from '../types'
import { defu } from 'defu'
import { meta } from '../meta'

export class GrowingTreeEngine {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private trees: Tree[] = []
  private animationPhase: 'growing' | 'swaying' = 'growing'
  private globalProgress: number = 0
  private lastTime: number = 0
  private config: GrowingTreeEngineConfig

  constructor(canvas: HTMLCanvasElement, config: GrowingTreeEngineConfig) {
    this.canvas = canvas
    this.config = defu(config, meta.defaultConfig) as GrowingTreeEngineConfig

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Failed to get 2D context')
    }
    this.ctx = ctx

    this.initCanvas()
    this.initTrees()
  }

  /**
   * Initialize canvas size
   */
  private initCanvas(): void {
    this.canvas.width = this.config.width * this.config.dpr
    this.canvas.height = this.config.height * this.config.dpr
    this.canvas.style.width = `${this.config.width}px`
    this.canvas.style.height = `${this.config.height}px`
    this.ctx.scale(this.config.dpr, this.config.dpr)
  }

  /**
   * Initialize trees at bottom positions
   */
  private initTrees(): void {
    this.trees = []
    const { treeCount, width, height } = this.config

    for (let i = 0; i < treeCount; i++) {
      const x = (width / (treeCount + 1)) * (i + 1)
      const y = height * 0.9 // 90% down (bottom 10%)
      this.trees.push(new Tree(x, y, this.config))
    }
  }

  /**
   * Update configuration and reinitialize
   */
  updateConfig(config: GrowingTreeEngineConfig): void {
    this.config = config
    this.initCanvas()
    this.initTrees()
    this.reset()
  }

  /**
   * Reset animation to beginning
   */
  reset(): void {
    this.animationPhase = 'growing'
    this.globalProgress = 0
    this.lastTime = 0
  }

  /**
   * Resize canvas
   */
  resize(width: number, height: number, dpr: number): void {
    this.config.width = width
    this.config.height = height
    this.config.dpr = dpr
    this.initCanvas()
    this.initTrees()
  }

  /**
   * Calculate progress for individual tree (sequence mode)
   */
  private getTreeProgress(index: number): number {
    if (this.config.growthMode === 'sync') {
      return this.globalProgress
    } else {
      // Sequence mode: stagger tree growth
      const delay = index / this.config.treeCount
      const progress = (this.globalProgress - delay) * (1 + delay)
      return Math.max(0, Math.min(1, progress))
    }
  }

  /**
   * Main render loop
   */
  render(time: number): void {
    // Calculate delta time
    const deltaTime = this.lastTime === 0 ? 0 : time - this.lastTime
    this.lastTime = time

    // Update progress during growing phase
    if (this.animationPhase === 'growing') {
      this.globalProgress += deltaTime * this.config.growthSpeed * 0.001

      if (this.globalProgress >= 1) {
        this.animationPhase = 'swaying'
        this.globalProgress = 1
      }
    }

    // Clear canvas
    this.ctx.clearRect(0, 0, this.config.width, this.config.height)

    // Render each tree
    const timeInSeconds = time * 0.001
    this.trees.forEach((tree, index) => {
      const treeProgress = this.getTreeProgress(index)
      tree.render(this.ctx, treeProgress, this.animationPhase, this.config, timeInSeconds)
    })
  }

  /**
   * Destroy engine
   */
  destroy(): void {
    this.trees = []
  }
}
