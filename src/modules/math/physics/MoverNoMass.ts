import { Vector } from '../vectors/VectorMutable'
import { colors } from 'modules/styles/styles'
import type { CanvasUtil } from 'modules/canvas/canvas-util'

/**
 * Represents physical object
 */
export class Mover {
  acc: Vector
  pos: Vector
  vel: Vector
  canvasUtil: CanvasUtil

  constructor(canvasUtil: CanvasUtil, pos: Vector) {
    this.canvasUtil = canvasUtil
    this.pos = pos
    this.acc = new Vector(0, 0)
    this.vel = new Vector(0, 0)
  }

  update() {
    // Adjust force with render performance
    this.acc.mult(this.canvasUtil.fpsAdjust(1))
    // Apply acc to velocity and velocity to position
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc = new Vector(0, 0)
  }

  bounce(x: number, y: number) {
    if (this.pos.x > x || this.pos.x < 0) this.vel.x *= -1
    if (this.pos.y > y || this.pos.y < 0) this.vel.y *= -1
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 20, 0, 360)
    ctx.fillStyle = colors.brand
    ctx.fill()
  }
}
