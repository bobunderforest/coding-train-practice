import { Vector } from 'modules/math/physics/VectorMutable'
import { random } from 'modules/math'

export abstract class Particle {
  static particleLifetime = 120

  acc: Vector
  pos: Vector
  vel: Vector
  lifespan: number

  constructor(pos: Vector) {
    this.pos = pos.copy()
    this.acc = new Vector(0, 0.04)
    this.vel = new Vector(random(-1, 1), random(-1, 1))
    this.lifespan = Particle.particleLifetime
  }

  isDead() {
    return this.lifespan <= 0
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.lifespan = Math.max(this.lifespan - 1, 0)
  }

  abstract render(ctx: CanvasRenderingContext2D): void
}
