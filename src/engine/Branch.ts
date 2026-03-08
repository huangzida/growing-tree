import { hexToRgb } from '@bg-effects/shared'
import type { GrowingTreeEngineConfig } from '../types'

export class Branch {
  startX: number
  startY: number
  endX: number
  endY: number
  angle: number
  length: number
  thickness: number
  depth: number
  curveOffset: number
  children: Branch[] = []

  constructor(
    startX: number,
    startY: number,
    angle: number,
    length: number,
    thickness: number,
    depth: number,
    curveOffset: number = 0
  ) {
    this.startX = startX
    this.startY = startY
    this.angle = angle
    this.length = length
    this.thickness = thickness
    this.depth = depth
    this.curveOffset = curveOffset

    // Calculate end point based on angle and length
    const radians = (angle * Math.PI) / 180
    this.endX = startX + Math.cos(radians) * length
    this.endY = startY + Math.sin(radians) * length
  }

  /**
   * Render this branch and its children
   */
  render(
    ctx: CanvasRenderingContext2D,
    treeProgress: number,
    phase: 'growing' | 'swaying',
    config: GrowingTreeEngineConfig,
    time: number
  ): void {
    // Improved Timing Logic for Even Growth
    // config.growthStagger: 0 = all start together (even), 1 = purely sequential (one after another)
    // Default approx 0.5 for nice overlap
    const stagger = config.growthStagger ?? 0.5
    
    // Total duration needed to satisfy stagger for maxDepth
    // Each level starts at: depth * stagger * segmentDuration
    // Each level takes: segmentDuration
    // Last level ends at: maxDepth * stagger * segmentDuration + segmentDuration = 1.0 (normalized)
    // Therefore: segmentDuration = 1 / (maxDepth * stagger + 1)
    
    // Ensure stagger isn't 0 to avoid division by zero or instant growth of everything if we want sequential feel
    // If stagger is 0, they all start at 0.
    
    const maxDepth = config.maxDepth || 9
    const safeStagger = Math.max(0, stagger)
    const segmentDuration = 1 / (maxDepth * safeStagger + 1)
    
    const startThreshold = this.depth * safeStagger * segmentDuration
    const endThreshold = startThreshold + segmentDuration
    
    // Map treeProgress [start, end] -> [0, 1]
    const rawProgress = (treeProgress - startThreshold) / (endThreshold - startThreshold)
    const branchProgress = Math.max(0, Math.min(1, rawProgress))

    if (branchProgress <= 0) return

    // Calculate current end position (growth animation)
    let currentEndX = this.startX + (this.endX - this.startX) * branchProgress
    let currentEndY = this.startY + (this.endY - this.startY) * branchProgress

    // Apply sway effect (only in swaying phase)
    if (phase === 'swaying') {
      const swayAmount = config.swayStrength * (this.depth / config.maxDepth) * 10
      const swayPhase = time * config.swaySpeed + this.depth * 0.5
      const swayOffset = Math.sin(swayPhase) * swayAmount
      currentEndX += swayOffset
    }

    // Calculate gradient color based on depth
    let color: string
    if (config.rainbow) {
       // Rainbow Mode: Hue varies with depth and time
       const hue = (this.depth * 25 - time * 20) % 360
       color = `hsl(${hue}, 80%, 65%)`
    } else {
       const colorRatio = this.depth / config.maxDepth
       color = this.interpolateColor(config.color1, config.color2, colorRatio)
    }

    // Draw the branch
    ctx.beginPath()
    ctx.moveTo(this.startX, this.startY)
    
    // Improved curve logic using quadraticCurveTo
    if (Math.abs(this.curveOffset) > 0.1) {
       const midX = (this.startX + currentEndX) / 2
       const midY = (this.startY + currentEndY) / 2
       
       // Calculate vector and length
       const dx = currentEndX - this.startX
       const dy = currentEndY - this.startY
       const len = Math.sqrt(dx * dx + dy * dy)
       
       if (len > 0.1) {
           // Normalized perpendicular vector (-dy, dx)
           const ndx = -dy / len
           const ndy = dx / len
           
           // Control point offset by curveOffset in perpendicular direction
           const cpX = midX + ndx * this.curveOffset
           const cpY = midY + ndy * this.curveOffset
           
           ctx.quadraticCurveTo(cpX, cpY, currentEndX, currentEndY)
       } else {
           ctx.lineTo(currentEndX, currentEndY)
       }
    } else {
       ctx.lineTo(currentEndX, currentEndY)
    }

    ctx.strokeStyle = color
    ctx.lineWidth = this.thickness
    ctx.lineCap = 'round'
    ctx.stroke()

    // Recursively draw children (only when branch is 80%+ grown)
    if (branchProgress > 0.8 && this.children.length > 0) {
      this.children.forEach((child) => {
        child.render(ctx, treeProgress, phase, config, time)
      })
    }
  }

  /**
   * Interpolate between two hex colors
   */
  private interpolateColor(color1: string, color2: string, ratio: number): string {
    const rgb1 = hexToRgb(color1)
    const rgb2 = hexToRgb(color2)
    
    const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * ratio)
    const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * ratio)
    const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * ratio)
    
    return `rgb(${r},${g},${b})`
  }
}
