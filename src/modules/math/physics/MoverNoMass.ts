import { Vector } from '../vectors/VectorImmutable'
import { colors } from 'modules/styles/styles'

/**
 * Represents physical object
 */
export class Mover {
  acc: Vector
  pos: Vector
  vel: Vector

  constructor(pos: Vector) {
    this.pos = pos
    this.acc = new Vector(0, 0)
    this.vel = new Vector(0, 0)
  }

  update() {
    // Apply acc to velocity and velocity to position
    this.vel = this.vel.add(this.acc)
    this.pos = this.pos.add(this.vel)
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
