import { random } from 'lodash'
import { Vector } from 'modules/math/physics/VectorMutable'
import { NonAbstract } from 'types/NonAbstract'
import { Particle } from './Particle'

export class ParticleSystem<
  PCtor extends NonAbstract<typeof Particle> = NonAbstract<typeof Particle>,
> {
  pCtors: PCtor[]
  pos: Vector
  particles: Particle[]

  constructor(pos: Vector, pCtors: PCtor[]) {
    this.pos = pos.copy()
    this.particles = []
    this.pCtors = pCtors
  }

  emit() {
    const idx = random(0, this.pCtors.length - 1)
    const ctor = this.pCtors[idx]
    this.particles.push(new ctor(this.pos))
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
