import { Vector } from 'modules/math/vectors/VectorMutable'
import { random } from 'modules/math'

export abstract class Particle {
  acc: Vector
  vel: Vector
  pos: Vector
  lifespan: number
  totalLifetime = 160

  constructor(pos: Vector) {
    this.pos = pos.copy()
    this.acc = new Vector(0, 0)
    this.vel = new Vector(random(-1, 1), random(-1.5, 0))
    this.lifespan = this.totalLifetime
  }

  isDead() {
    return this.lifespan <= 0
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.mult(0)
    this.lifespan = Math.max(this.lifespan - 1, 0)
  }

  applyForce(f: Vector) {
    // const divM = f.copy()
    // divM.div(this.mass)
    this.acc.add(f)
  }

  abstract render(ctx: CanvasRenderingContext2D): void
}
