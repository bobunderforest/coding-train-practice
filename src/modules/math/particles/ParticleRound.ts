import { colors } from 'modules/styles/styles'
import { Particle } from './Particle'

export class ParticleRound extends Particle {
  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 3, 0, 360)
    ctx.fillStyle = colors.danger
    ctx.globalAlpha = this.lifespan / this.totalLifetime
    ctx.fill()
  }
}
