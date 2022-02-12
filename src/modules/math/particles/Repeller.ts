import { colors } from 'modules/styles/styles'
import { Vector } from '../vectors/VectorMutable'
import type { Particle } from './Particle'

export class Repeller {
  pos: Vector
  radius = 20

  constructor(pos: Vector) {
    this.pos = pos
  }

  repel(p: Particle) {
    const isCollided =
      (p.pos.x - this.pos.x) ** 2 + (p.pos.y - this.pos.y) ** 2 <=
      this.radius ** 2

    if (!isCollided) return null

    const f = p.vel.copy()
    f.mult(-1.8)
    return f

    // TODO: make real reflection angle calculation
    // const radius = this.pos.copy()
    // radius.sub(p.pos)
    // const f = p.acc.copy()
    // f.mult()
    // const normal = radius.copy()
    // const per = this.pos.
    // f.sub()
    // return f
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 360)
    ctx.fillStyle = colors.brand
    ctx.globalAlpha = 1
    ctx.fill()
  }
}
