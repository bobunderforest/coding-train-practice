import { CanvasUtil } from 'modules/canvas/canvas-util'

type Vector = { x: number; y: number }

export class CoordinateTransformer {
  private canvasUtil: CanvasUtil
  private zoom: number
  private offsetX: number
  private offsetY: number

  constructor(canvasUtil: CanvasUtil, zoom: number) {
    this.canvasUtil = canvasUtil
    this.zoom = zoom
    this.offsetX = 0
    this.offsetY = 0
  }

  get screenWidth() {
    return this.canvasUtil.width
  }

  get screenHeight() {
    return this.canvasUtil.height
  }

  // Convert world coordinates to screen coordinates
  worldToScreen(x: number, y: number): Vector {
    return {
      x: (x - this.offsetX) * this.zoom + this.screenWidth / 2,
      y: this.screenHeight / 2 - (y - this.offsetY) * this.zoom,
    }
  }

  // Convert screen coordinates to world coordinates
  screenToWorld(x: number, y: number): Vector {
    return {
      x: (x - this.screenWidth / 2) / this.zoom + this.offsetX,
      y: (this.screenHeight / 2 - y) / this.zoom + this.offsetY,
    }
  }

  worldToScreenVector(x: number, y: number): Vector {
    return {
      x: x * this.zoom,
      y: y * this.zoom,
    }
  }
  screenToWorldVector(x: number, y: number): Vector {
    return {
      x: x / this.zoom,
      y: y / this.zoom,
    }
  }

  // Convert scalar value from world to screen
  worldToScreenScalar(value: number): number {
    return value * this.zoom
  }

  // Convert scalar value from screen to world
  screenToWorldScalar(value: number): number {
    return value / this.zoom
  }

  // Set zoom level
  setZoom(zoom: number): void {
    this.zoom = zoom
  }

  // Get zoom level
  getZoom(): number {
    return this.zoom
  }

  // Set the offset for panning
  setOffset(offset: Vector): void {
    this.offsetX = offset.x
    this.offsetY = offset.y
  }

  // Get the offset for panning
  getOffset(): Vector {
    return { x: this.offsetX, y: this.offsetY }
  }
}
