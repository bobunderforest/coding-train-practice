import { PageDemo } from 'modules/pages/PageDemo'
import { Vector } from 'modules/math/physics/VectorMutable'
import { colors } from 'modules/styles/styles'
import { links } from 'modules/appCore/links'

const AMPLITUDE = 100
const PERIOD = 3000

type DrawState = {
  balls: Vector[]
}

export const HarmonicMotion = () => (
  <PageDemo<DrawState>
    next={links.pendulum}
    srcLink="04-HarmonicMotion/HarmonicMotion.tsx"
    setup={({ width, height }) => ({
      balls: [...Array(21)].map(
        (_, i, a) => new Vector(0, (i - a.length / 2) * 50),
      ),
    })}
    render={({ ctx, width, height, drawState, time }) => {
      const { balls } = drawState

      ctx.save()
      ctx.translate(width / 2, height / 2)
      balls.forEach((ball, i) => {
        const x =
          AMPLITUDE * Math.sin((time / PERIOD) * (2 * Math.PI) + i * 100)

        ctx.beginPath()

        ctx.moveTo(0, ball.y)
        ctx.lineTo(x, ball.y)

        ctx.strokeStyle = '#ccc'
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x, ball.y, 20, 0, 360)
        ctx.fillStyle = colors.brand
        ctx.fill()
      })
      ctx.restore()
    }}
  />
)
