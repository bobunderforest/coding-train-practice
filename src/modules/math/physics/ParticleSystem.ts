import { Vector } from 'modules/math/physics/VectorMutable'
import { Particle } from './Particle'

export class ParticleSystem {
  pos: Vector
  count: number = 100
  particles: Particle[]

  constructor(pos: Vector) {
    this.pos = pos.copy()
    this.particles = []
  }

  emit() {
    this.particles.push(new Particle(this.pos))
  }

  update() {
    this.emit()
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]
      p.update()
      if (p.isDead()) {
        this.particles.splice(i, 1)
      }
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    for (const p of this.particles) {
      p.render(ctx)
    }
  }
}
