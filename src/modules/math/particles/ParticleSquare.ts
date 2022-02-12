import { colors } from 'modules/styles/styles'
import { Particle } from './Particle'

export class ParticleSquare extends Particle {
  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    const { x, y } = this.pos
    ctx.rect(x - 3, y - 3, 6, 6)
    ctx.fillStyle = colors.focus
    ctx.globalAlpha = this.lifespan / this.totalLifetime
    ctx.fill()
  }
}
