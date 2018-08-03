import * as React from 'react'
import { DemoPage } from '../Layout/DemoPage'
import { Vector } from '../Vectors/VectorMutable'
// import { random } from 'utils'
import { colors } from 'utils/styles'

const AMPLITUDE = 300
const PERIOD = 3000

interface DrawState {
  ballPos: Vector
}

const Page = DemoPage as new () => DemoPage<DrawState>

export const HarmonicMotion = () => (
  <Page
    // next={links.dragResistance}
    srcLink="HarmonicMotion/HarmonicMotion.tsx"
    canvasProps={({ drawState }) => ({
      // onMouseDown: () => (drawState.fire = true),
      // onMouseMove: e => {
      //   drawState.mouse.x = e.pageX
      //   drawState.mouse.y = e.pageY
      // },
    })}
    setup={({ width, height }) => ({
      ballPos: new Vector(0, 0),
      // mouse: new Vector(width / 2, height / 2),
    })}
    render={({ ctx, width, height, drawState, time }) => {
      const { ballPos } = drawState

      const x = AMPLITUDE * Math.sin((time / PERIOD) * (2 * Math.PI))

      ctx.translate(width / 2, height / 2)

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(x, ballPos.y)
      ctx.strokeStyle = '#ccc'
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(x, ballPos.y, 40, 0, 360)
      ctx.fillStyle = colors.brand
      ctx.fill()
    }}
  />
)
