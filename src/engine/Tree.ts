import { Branch } from './Branch'
import type { GrowingTreeEngineConfig } from '../types'

export class Tree {
  private rootBranch: Branch
  private x: number
  private y: number

  constructor(x: number, y: number, config: GrowingTreeEngineConfig) {
    this.x = x
    this.y = y

    // Create trunk (pointing upward, -90 degrees)
    // Use treeHeight if available, otherwise fallback or dynamic calculation
    const trunkLength = config.treeHeight || 120
    const curvature = (Math.random() - 0.5) * (config.curvature || 0)

    this.rootBranch = new Branch(
      x,
      y,
      -90, // Upward
      trunkLength,
      config.trunkWidth,
      0, // depth 0
      curvature
    )

    // Generate branches recursively
    this.generateBranches(this.rootBranch, config)
  }

  /**
   * Recursively generate child branches
   */
  private generateBranches(branch: Branch, config: GrowingTreeEngineConfig): void {
    // Stop if max depth reached
    if (branch.depth >= config.maxDepth) return

    // Random probability to skip branching, but ALWAYS branch at root to produce Main Trunk -> First Branches
    if (branch.depth > 1 && Math.random() > config.branchProbability) return

    // Calculate child branch parameters
    const newLength = branch.length * config.lengthDecay
    const newThickness = branch.thickness * 0.7

    // Calculate branch angles with symmetry control
    const baseAngle = branch.angle
    const angleOffset = config.branchAngle * (1 - (branch.depth / config.maxDepth) * 0.3)
    const randomFactor = 1 - config.symmetry

    // Left branch
    const leftAngle =
      baseAngle - angleOffset + (Math.random() - 0.5) * 30 * randomFactor

    // Right branch
    const rightAngle =
      baseAngle + angleOffset + (Math.random() - 0.5) * 30 * randomFactor

    // Calculate random curve offset
    const maxCurve = config.curvature || 0
    const leftCurve = (Math.random() - 0.5) * maxCurve
    const rightCurve = (Math.random() - 0.5) * maxCurve

    // Create child branches
    const leftBranch = new Branch(
      branch.endX,
      branch.endY,
      leftAngle,
      newLength,
      newThickness,
      branch.depth + 1,
      leftCurve
    )

    const rightBranch = new Branch(
      branch.endX,
      branch.endY,
      rightAngle,
      newLength,
      newThickness,
      branch.depth + 1,
      rightCurve
    )

    branch.children.push(leftBranch, rightBranch)

    // Recurse for each child
    this.generateBranches(leftBranch, config)
    this.generateBranches(rightBranch, config)
  }

  /**
   * Render the entire tree
   */
  render(
    ctx: CanvasRenderingContext2D,
    treeProgress: number,
    phase: 'growing' | 'swaying',
    config: GrowingTreeEngineConfig,
    time: number
  ): void {
    this.rootBranch.render(ctx, treeProgress, phase, config, time)
  }
}
