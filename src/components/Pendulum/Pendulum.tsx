import * as React from 'react'
import { DemoPage } from '../Layout/DemoPage'
import { Vector } from '../Vectors/VectorMutable'
import { colors } from 'utils/styles'
// import { links } from 'utils/links'

interface DrawState {
  aAcc: number
  aVel: number
  angle: number
  bob: Vector
  len: number
  origin: Vector
}

const Page = DemoPage as new () => DemoPage<DrawState>

const G = 0.005

export const Pendulum = () => (
  <Page
    // next={links.dragResistance}
    srcLink="Pendulum/Pendulum.tsx"
    setup={({ width, height }) => ({
      aAcc: 0,
      aVel: 0,
      angle: Math.PI / 4,
      bob: new Vector(width / 2, height / 2),
      len: height * 0.75,
      origin: new Vector(width / 2, 0),
    })}
    render={({ ctx, width, height, drawState, time }) => {
      drawState.angle += drawState.aVel
      drawState.aVel += drawState.aAcc
      drawState.aAcc = -G * Math.sin(drawState.angle)
      drawState.aVel *= 0.99

      const { angle, bob, len, origin } = drawState

      bob.x = origin.x + len * Math.sin(angle)
      bob.y = origin.y + len * Math.cos(angle)

      ctx.save()

      ctx.beginPath()
      ctx.moveTo(origin.x, origin.y)
      ctx.lineTo(bob.x, bob.y)

      ctx.strokeStyle = '#ccc'
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(bob.x, bob.y, 20, 0, 360)
      ctx.fillStyle = colors.brand
      ctx.fill()

      ctx.restore()
    }}
  />
)
