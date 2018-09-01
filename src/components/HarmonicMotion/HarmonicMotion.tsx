import * as React from 'react'
import { DemoPage } from '../Layout/DemoPage'
import { Vector } from '../Vectors/VectorMutable'
import { colors } from 'utils/styles'
import { links } from 'utils/links'

const AMPLITUDE = 100
const PERIOD = 3000

interface DrawState {
  balls: Vector[]
}

const Page = DemoPage as new () => DemoPage<DrawState>

export const HarmonicMotion = () => (
  <Page
    next={links.pendulum}
    srcLink="HarmonicMotion/HarmonicMotion.tsx"
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
