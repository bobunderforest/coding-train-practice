import { Vector } from 'modules/math/physics/VectorMutable'
import { colors } from 'modules/styles/styles'
import { random } from 'modules/math'

const PARTICLE_LIFETIME = 255

export class Particle {
  acc: Vector
  pos: Vector
  vel: Vector

  lifespan: number = PARTICLE_LIFETIME

  constructor(pos: Vector) {
    this.pos = pos.copy()
    this.acc = new Vector(0, 0.04)
    this.vel = new Vector(random(-1, 1), random(-1, 1))
  }

  isDead() {
    return this.lifespan <= 0
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.lifespan = Math.max(this.lifespan - 2, 0)
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 4, 0, 360)
    ctx.fillStyle = colors.danger
    ctx.globalAlpha = this.lifespan / PARTICLE_LIFETIME
    ctx.fill()
  }
}
