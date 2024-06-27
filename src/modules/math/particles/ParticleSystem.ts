import { random } from 'lodash'
import type { Vector } from 'modules/math/vectors/VectorMutable'
import type { NonAbstract } from 'types/NonAbstract'
import type { Particle } from './Particle'
import type { Repeller } from './Repeller'
import type { CanvasUtil } from 'modules/canvas/canvas-util'

export class ParticleSystem<
  PCtor extends NonAbstract<typeof Particle> = NonAbstract<typeof Particle>,
> {
  canvasUtil: CanvasUtil
  pCtors: PCtor[]
  pos: Vector
  particles: Particle[]
  limit = Infinity

  constructor(canvasUtil: CanvasUtil, pos: Vector, pCtors: PCtor[]) {
    this.canvasUtil = canvasUtil
    this.pos = pos.copy()
    this.particles = []
    this.pCtors = pCtors
  }

  emit() {
    const idx = random(0, this.pCtors.length - 1)
    const ctor = this.pCtors[idx]
    this.particles.push(new ctor(this.canvasUtil, this.pos))
  }

  applyForce(f: Vector) {
    for (const p of this.particles) {
      p.applyForce(f)
    }
  }

  applyRepel(r: Repeller) {
    for (const p of this.particles) {
      const f = r.repel(p)
      if (f) p.applyForce(f)
    }
  }

  update() {
    if (this.particles.length < this.limit) {
      this.emit()
    }
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
